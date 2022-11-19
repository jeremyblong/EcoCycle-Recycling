import React, { Fragment, useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import styles from "./pageStyles.js";
import helpers from "./helpers/options.js";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import _ from "lodash";
import RNPickerSelect from 'react-native-picker-select';
import { connect } from "react-redux";
import Toast from 'react-native-toast-message';
import Geolocation from '@react-native-community/geolocation';
import axios from "axios";
import uuid from 'react-native-uuid';
import { Avatar, ListItem } from '@rneui/themed';
import { BASE_URL, TOMTOM_API_KEY } from "@env";
import Autocomplete from "react-native-autocomplete-input";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from 'react-native-modal';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import customMapStyle from "../../../../../component/JSONStyles/mapStyle.js";
import { updateFreightDetailsState } from "../../../../../redux/actions/requestFreightPickup/pickupDetails.js";
import { useNavigation } from "@react-navigation/native";

const { stateOptionsSelection } = helpers;

const { width, height } = Dimensions.get("window");

const PageOneDistributorAccountCreation = ({ updateFreightDetailsState, freightData, updateMainState, props }) => {

    const navigation = useNavigation();

    const firstInput = useRef(null);
    const secondInput = useRef(null);
    const thirdInput = useRef(null);
    const fourthInput = useRef(null);
    const fifthInput = useRef(null);
    const sixthInput = useRef(null);
    const mapReference = useRef(null);

    const [ state, setState ] = useState({
        searchingQuery: "",
        hide: true,
        addyResults: [],
        addressLineOneStreetNumOnly: "",
        addressLineOneStreetNameOnly: "",
        addressLineTwo: "",
        state: null,
        city: "",
        zipCode: "",
        selected: null,
        currentView: false,
        inputsAreActive: false,
        isKeyboardVisible: true,
        confirmationModalVisible: false,
        confirmationDetails: null
    })

    const { 
        addyResults,
        selected,
        confirmationDetails 
    } = state;

    const handleGeoCalculationAndSubmit = () => {

        const zipCode = renderValue(state.zipCode, "zipCode") 
        const regionState = renderValue(state.state, "state") 
        const city = renderValue(state.city, "city") 
        const addressLineOneStreetNameOnly = renderValue(state.addressLineOneStreetNameOnly, "addressLineOneStreetNameOnly") 
        const addressLineOneStreetNumOnly = renderValue(state.addressLineOneStreetNumOnly, "addressLineOneStreetNumOnly")

        axios.get(`https://api.tomtom.com/search/2/structuredGeocode.json?key=${TOMTOM_API_KEY}&countryCode=US&streetNumber=${encodeURIComponent(addressLineOneStreetNumOnly)}&streetName=${encodeURIComponent(addressLineOneStreetNameOnly)}&municipality=${encodeURIComponent(city)}&municipalitySubdivision=${encodeURIComponent(regionState)}&postalCode=${encodeURIComponent(zipCode)}`).then(async (res) => {
            if (res.data) {
                const { results } = res.data;

                console.log("results", results[0].position);

                const { lat, lon } = results[0].position;

                setState(prevState => {
                    return {
                        ...prevState,
                        confirmationDetails: ({ latitude: lat, longitude: lon, latitudeDelta: 0.00875, longitudeDelta: 0.00875 }),
                        confirmationModalVisible: true
                    }
                })
            } else {
                console.log("Err", res.data);

                Toast.show({
                    type: 'error',
                    text1: `We could NOT process your desired request!`,
                    text2: `We could not find an appropriate GEO-location based on the address you've provided - please try again or contact support if the problem persists...`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
            }

        }).catch((err) => {

            console.log(err);

            Toast.show({
                type: 'error',
                text1: `We could NOT process your desired request!`,
                text2: `We could not find an appropriate GEO-location based on the address you've provided - please try again or contact support if the problem persists...`,
                visibilityTime: 4250,
                position: "bottom"
            });
        })
    }

    const handleSearchRelevantAddress = (value) => {
        if (typeof location !== "undefined" && typeof location !== "string") {
            console.log("location already exists and is NOT a string OR undefined...");

            if ((typeof location === "object")) {

                console.log("inner internal check for running logic.");
            
                const { longitude, latitude } = location.coords;
    
                axios.get(`https://api.tomtom.com/search/2/search/${encodeURIComponent(value)}.json?key=${TOMTOM_API_KEY}&language=en-US&limit=10&lat=${latitude}&lon=${longitude}&radius=25000`).then(async (res) => {
                    
                    if (res.data) {

                        const { results } = res.data;
    
                        console.log("results", results);
    
                        const matches = await results.map((data) => {
                            return {
                                id: uuid.v4(),
                                name: data.address.freeformAddress,
                                otherData: data
                            }
                        })
    
                        if (matches) {
                            setState(prevState => {
                                return {
                                    ...prevState,
                                    addyResults: matches,
                                    isKeyboardVisible: false,
                                    searchingQuery: value,
                                    addressLineOneStreetNumOnly: "",
                                    addressLineOneStreetNameOnly: "",
                                    addressLineTwo: "",
                                    state: null,
                                    city: "",
                                    zipCode: ""
                                }
                            })
                        }
                    } else {
                        console.log("Err", res.data);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                Toast.show({
                    type: 'error',
                    text1: `We do NOT have access to your current location - please enable.`,
                    text2: `Please enable your location settings as we cannot properly locate your position which is required for this request.`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
            }
        } else {
            console.log("other chunk ran - fetch current location THEN process rest of request...");

            Geolocation.getCurrentPosition(info => {

                console.log("Gathered information correctly - geo: ", info);

                const locationObj = { latitude: info.coords.latitude, longitude: info.coords.longitude, latitudeDelta: 5, longitudeDelta: 5 };

                // now start fetching relevant addresses and/or location information...
                const { longitude, latitude } = locationObj;
    
                axios.get(`https://api.tomtom.com/search/2/search/${encodeURIComponent(value)}.json?key=${TOMTOM_API_KEY}&language=en-US&limit=10&lat=${latitude}&lon=${longitude}&radius=25000`).then(async (res) => {

                    if (res.data) {

                        const { results } = res.data;
    
                        console.log("results", results);
    
                        const matches = await results.map((data) => {
                            return {
                                id: uuid.v4(),
                                name: data.address.freeformAddress,
                                otherData: data
                            }
                        })

                        if (matches) {

                            setState(prevState => {
                                return {
                                    ...prevState,
                                    addyResults: matches,
                                    isKeyboardVisible: false,
                                    searchingQuery: value,
                                    addressLineOneStreetNumOnly: "",
                                    addressLineOneStreetNameOnly: "",
                                    addressLineTwo: "",
                                    state: null,
                                    city: "",
                                    zipCode: ""
                                }
                            })
                        }
                    } else {
                        console.log("Err", res.data);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            });
        }
    }
    const calculateWhetherInputsComplete = () => {
        if (((typeof state.addressLineOneStreetNumOnly !== "undefined" && state.addressLineOneStreetNumOnly.length > 0) && (typeof state.addressLineOneStreetNameOnly !== "undefined" && state.addressLineOneStreetNameOnly.length > 0) && (typeof state.city !== "undefined" && state.city.length > 0) && (typeof state.zipCode !== "undefined" && state.zipCode.length > 0)) || (selected !== null)) {
            return false;
        } else {
            return true;
        }
    }

    const renderValue = (variable, type) => {

        const { otherData } = selected || {
            otherData: {
                addressLineOneStreetNumOnly: "",
                addressLineOneStreetNameOnly: "",
                addressLineTwo: "",
                state: null,
                city: "",
                zipCode: ""
            }
        };

        
        switch (type) {
            case "addressLineOneStreetNumOnly":
                if (selected === null) {
                    console.log("this one ran.")
                    return variable;
                } else {
                    console.log("other one ran.", otherData)
                    if (typeof variable !== "undefined" && variable.length > 0) {
                        return variable;
                    } else {
                        return otherData.address.streetNumber;
                    }
                }
                break;
            case "addressLineOneStreetNameOnly":
                if (selected === null) {
                    console.log("this one ran.")
                    return variable;
                } else {
                    console.log("other one ran.", otherData)
                    if (typeof variable !== "undefined" && variable.length > 0) {
                        return variable;
                    } else {
                        return otherData.address.streetName;
                    }
                }
                break;
            case "addressLineTwo":
                return variable;
                break;
            case "city":
                if (selected === null) {
                    console.log("this one ran.")
                    return variable;
                } else {
                    console.log("other one ran.", otherData)
                    if (typeof variable !== "undefined" && variable.length > 0) {
                        return variable;
                    } else {
                        return otherData.address.countrySecondarySubdivision;
                    }
                }
                break;
            case "state":
                return variable;
                break;
            case "zipCode":
                if (selected === null) {
                    console.log("this one ran.")
                    return variable;
                } else {
                    console.log("other one ran.", otherData)
                    if (typeof variable !== "undefined" && variable.length > 0) {
                        return variable;
                    } else {
                        return otherData.address.extendedPostalCode;
                    }
                }
                break;
            default:
                break;
        }
    }

    const handleFinalSubmissionChoice = () => {
        console.log("handleFinalSubmissionChoice clicked/ran...", state.confirmationDetails);

        const zipCode = renderValue(state.zipCode, "zipCode") 
        const regionState = renderValue(state.state, "state") 
        const city = renderValue(state.city, "city") 
        const addressLineOneStreetNameOnly = renderValue(state.addressLineOneStreetNameOnly, "addressLineOneStreetNameOnly") 
        const addressLineOneStreetNumOnly = renderValue(state.addressLineOneStreetNumOnly, "addressLineOneStreetNumOnly")
        const aptSuiteRoomNumber = renderValue(state.addressLineTwo, "addressLineTwo")

        const newData = {
            ...freightData,
            addressRawData: {
                zipCode,
                regionState,
                city,
                addressLineOneStreetNameOnly,
                addressLineOneStreetNumOnly,
                aptSuiteRoomNumber
            },
            exactLocation: state.confirmationDetails,
            page: 3
        };

        updateFreightDetailsState(newData);

        updateMainState({ page: 3 });
    }

    const renderConfirmationModal = () => {
        const { confirmationDetails } = state;

        const onMarkerMainDragged = (region) => {
            console.log("onMarkerMainDragged region: ", region);

            const { latitude, longitude } = region.nativeEvent.coordinate;

            const currentLoc = { latitude, longitude, latitudeDelta: 0.00875, longitudeDelta: 0.00875 };

            setState(prevState => {
                return {
                    ...prevState,
                    confirmationDetails: currentLoc
                }
            })
            mapReference.current.fitToCoordinates();
        }

        if (confirmationDetails !== null) {
            return (
                <Fragment>
                    <Modal isVisible={state.confirmationModalVisible}>
                        <View style={styles.customModalBody}>
                            <MapView 
                                ref={mapReference}
                                showsTraffic={true}
                                rotateEnabled={false}
                                customMapStyle={customMapStyle}
                                region={confirmationDetails}
                                style={styles.map}
                                moveOnMarkerPress={false}
                                provider={PROVIDER_GOOGLE}
                                >
                                <Marker 
                                    key={"213742734827834927349827348"}
                                    onDragEnd={onMarkerMainDragged}
                                    draggable={true}
                                    coordinate={confirmationDetails}
                                    title={"This is your current 'selected' location"}
                                    description={"Move the PIN to the appropriate location"}
                                />
                            </MapView>
                            <View style={styles.hr} />
                            <AwesomeButtonBlue backgroundDarker={"#000"} backgroundColor={"#e60000"} style={styles.absoluteButtonBottom} type={"secondary"} onPress={() => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        confirmationModalVisible: false,
                                        confirmationDetails: null,
                                        confirmationDetails: null
                                    }
                                })
                            }} textColor={"#fff"} backgroundShadow={"black"} stretch={true}>Cancel/Close Pane</AwesomeButtonBlue>
                            <View style={styles.hr} />
                            <AwesomeButtonBlue type={"secondary"} onPress={() => handleFinalSubmissionChoice()} backgroundShadow={"black"} stretch={true}>Confirm & Continue!</AwesomeButtonBlue>
                        </View>
                    </Modal>
                </Fragment>
            );
        } 
    }
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          console.log(state.searchingQuery);

          handleSearchRelevantAddress(state.searchingQuery);
          // Send Axios request here
        }, 1250)
    
        return () => clearTimeout(delayDebounceFn)
    }, [state.searchingQuery])

    return (
        <Fragment>
            {renderConfirmationModal()}
            <KeyboardAwareScrollView  extraHeight={125} enableAutomaticScroll={true} extraScrollHeight={125} enableOnAndroid={true} keyboardShouldPersistTaps='always' contentContainerStyle={{ paddingBottom: 52.5, flexGrow: 1 }}>   
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, flex: 1 }} style={styles.outterContainer}>
                    <Text style={styles.alternativeTextRed}>Use this field to 'autocomplete' search for your company's address</Text>
                    <View style={styles.searchContainerWrapper}>
                        <Autocomplete
                            data={addyResults}
                            value={state.searchingQuery}
                            hideResults={state.isKeyboardVisible}
                            placeholder={"Search for your address..."}
                            placeholderTextColor={"grey"}
                            listContainerStyle={{ height: addyResults.length * 65 }}
                            onChangeText={(text) => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        searchingQuery: text
                                    }
                                })
                            }}
                            flatListProps={{
                                keyExtractor: (_, idx) => idx,
                                renderItem: ({ item, index }) => {
                                    console.log("item.otherData.position", item);
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            setState(prevState => {
                                                const calculatedIndex = stateOptionsSelection.findIndex(iterated => iterated.value === item.otherData.address.countrySubdivision)
                                                return {
                                                    ...prevState,
                                                    selected: item,
                                                    isKeyboardVisible: true,
                                                    state: stateOptionsSelection[calculatedIndex].value,
                                                    addressLineOneStreetNumOnly: item.otherData.address.streetNumber,
                                                    addressLineOneStreetNameOnly: item.otherData.address.streetName,
                                                    city: item.otherData.address.municipality,
                                                    zipCode: item.otherData.address.postalCode
                                                }
                                            })
                                        }} key={index}>
                                            <ListItem style={{ zIndex: 999999999999999999999999999999999999999999999999999999999999, minHeight: 65, height: 65 }}>
                                                <ListItem.Content>
                                                    <ListItem.Title style={{ fontSize: 14 }}>{item.name}</ListItem.Title>
                                                    <ListItem.Subtitle>{`${item.otherData.address.countrySecondarySubdivision} ${item.otherData.address.countrySubdivision} ${item.otherData.address.countryCodeISO3}`}</ListItem.Subtitle>
                                                </ListItem.Content>
                                                <Avatar style={styles.avatarComment} source={require("../../../../../assets/images/icon/right-arrow-custom.png")} />
                                            </ListItem>
                                        </TouchableOpacity>
                                    );
                                },
                            }}
                        />
                    </View>
                    <View style={styles.thinerHR} />
                    <Text style={styles.alternativeText}>Please make sure your manually-entered address is correct</Text>
                    <View style={styles.inputFormRow}>
                        <View style={styles.addressGeneralQuarterInputSelectWrapper}>
                            <TextInput
                                autoFocus={false}
                                placeholder="Street Number"
                                style={styles.addressGeneralInput} 
                                placeholderTextColor={"#b3b3b3"} 
                                value={state.addressLineOneStreetNumOnly}
                                onSubmitEditing={() => {
                                    setTimeout(() => { secondInput.current.focus() }, 375); 
                                }}
                                onFocus={() => setState(prevState => {
                                    return {
                                        ...prevState,
                                        addressLineOneStreetNumOnly: "",
                                        selected: null
                                    }
                                })}
                                ref={firstInput}
                                blurOnSubmit={true}
                                keyboardType={"numerical"}
                                onChangeText={(value) => setState(prevState => {
                                    return {
                                        ...prevState,
                                        addressLineOneStreetNumOnly: value
                                    }
                                })}
                            />
                        </View>
                        <TextInput
                            autoFocus={false}
                            placeholder="Street Name"
                            style={styles.addressGeneralThirdLengthStyles} 
                            placeholderTextColor={"#b3b3b3"}
                            value={state.addressLineOneStreetNameOnly}
                            onSubmitEditing={() => {
                                setTimeout(() => { thirdInput.current.focus() }, 375); 
                            }}
                            onFocus={() => setState(prevState => {
                                return {
                                    ...prevState,
                                    addressLineOneStreetNameOnly: "",
                                    selected: null
                                }
                            })}
                            ref={secondInput}
                            blurOnSubmit={true}
                            onChangeText={(value) => setState(prevState => {
                                return {
                                    ...prevState,
                                    addressLineOneStreetNameOnly: value
                                }
                            })}
                        />
                    </View>
                    <View style={styles.formSpacer} />
                    <TextInput
                        autoFocus={false}
                        placeholder="Apt, Suite, Etc... (Optional)"
                        style={styles.addressGeneralInput} 
                        placeholderTextColor={"#b3b3b3"}
                        value={state.addressLineTwo}
                        onSubmitEditing={() => {
                            setTimeout(() => { fourthInput.current.focus(); }, 375); 
                        }}
                        onFocus={() => setState(prevState => {
                            return {
                                ...prevState,
                                addressLineTwo: "",
                                selected: null
                            }
                        })}
                        ref={thirdInput}
                        blurOnSubmit={true}
                        onChangeText={(value) => setState(prevState => {
                            return {
                                ...prevState,
                                addressLineTwo: value
                            }
                        })}
                    />
                    <View style={styles.formSpacer} />
                    <TextInput
                        autoFocus={false}
                        placeholder="City/Municipality"
                        style={styles.addressGeneralInput} 
                        placeholderTextColor={"#b3b3b3"}
                        value={state.city}
                        onSubmitEditing={() => {}}
                        onFocus={() => setState(prevState => {
                            return {
                                ...prevState,
                                addressGeneralInput: "",
                                selected: null
                            }
                        })}
                        ref={fourthInput}
                        blurOnSubmit={true}
                        onChangeText={(value) => setState(prevState => {
                            return {
                                ...prevState,
                                city: value
                            }
                        })}
                    />
                    <View style={styles.formSpacer} />
                    <View style={styles.inputFormRow}>
                        <View style={styles.addressGeneralHalfInputSelectWrapper}>
                            <RNPickerSelect
                                onValueChange={(value, index) => setState(prevState => {
                                    return {
                                        ...prevState,
                                        state: value
                                    }
                                })}
                                onFocus={() => setState(prevState => {
                                    return {
                                        ...prevState,
                                        state: "",
                                        selected: null
                                    }
                                })}
                                placeholder={{ label: "State", value: "State" }}
                                placeholderTextColor={"#b3b3b3"}
                                onSubmitEditing={() => {
                                    setTimeout(() => {  }, 375); // sixthInput.current.focus();
                                }}
                                ref={fifthInput}
                                blurOnSubmit={true}
                                value={state.state}
                                style={styles.addressGeneralHalfInputSelect} 
                                items={stateOptionsSelection}
                            />
                        </View>
                        <TextInput
                            autoFocus={false}
                            placeholder="Zip/Area-Code"
                            style={styles.addressGeneralHalfInput} 
                            placeholderTextColor={"#b3b3b3"}
                            value={state.zipCode}
                            onFocus={() => setState(prevState => {
                                return {
                                    ...prevState,
                                    inputsAreActive: true,
                                    selected: null
                                }
                            })}
                            onSubmitEditing={() => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        inputsAreActive: false
                                    }
                                })
                            }}
                            ref={sixthInput}
                            blurOnSubmit={true}
                            onChangeText={(value) => setState(prevState => {
                                return {
                                    ...prevState,
                                    zipCode: value // proceedingButtonDisabledCheck() goes below!
                                }
                            })}
                        />
                    </View>
                    <View style={[styles.formSpacer, { marginBottom: 22.5, marginTop: 17.25 }]} />
                    <AwesomeButtonBlue disabled={calculateWhetherInputsComplete()} type={"secondary"} onPress={() => handleFinalSubmissionChoice()} backgroundShadow={"black"} stretch={true}>Submit & Continue</AwesomeButtonBlue>
                    <AwesomeButtonBlue backgroundDarker={"#000"} backgroundColor={"#e60000"} style={{ marginTop: 22.5 }} type={"secondary"} onPress={() => {
                        updateMainState({ page: 1 });

                        updateFreightDetailsState({});
                    }} textColor={"#fff"} backgroundShadow={"black"} stretch={true}>Restart Process</AwesomeButtonBlue>
                </ScrollView>
            </KeyboardAwareScrollView>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        location: state.location.currentLoc,
        userData: state.auth.data,
        freightData: state.freightPickupData.formData
    }
}
export default connect(mapStateToProps, { updateFreightDetailsState })(PageOneDistributorAccountCreation);