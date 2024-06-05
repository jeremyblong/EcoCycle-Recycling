import React, { Fragment, useState, useRef, useCallback } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    FlatList
} from "react-native";
import { debounce } from 'lodash';
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import { Badge, ListItem } from '@rneui/themed';
import stylesOne from "../pageStyles.js";
import stylesTwo from "../../startListingNewSpaceProcessStyles.js";
import _ from "lodash";
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'react-native-check-box';
import { TOMTOM_API_KEY, BASE_URL } from "@env";
import SearchableDropdown from 'react-native-searchable-dropdown';
import { connect } from "react-redux";
import Toast from 'react-native-toast-message';
import Geolocation from '@react-native-community/geolocation';
import axios from "axios";
import uuid from 'react-native-uuid';
import { Colors, Sizes } from "../../../../../constants/styles.js";
import RBSheet from "react-native-raw-bottom-sheet";
import Autocomplete from "react-native-autocomplete-input";

const styles = { ...stylesOne, ...stylesTwo };

const stateOptionsSelection = [
    {
        label: "Alabama",
        value: "AL"
    },
    {
        label: "Alaska",
        value: "AK"
    },
    {
        label: "American Samoa",
        value: "AS"
    },
    {
        label: "Arizona",
        value: "AZ"
    },
    {
        label: "Arkansas",
        value: "AR"
    },
    {
        label: "California",
        value: "CA"
    },
    {
        label: "Colorado",
        value: "CO"
    },
    {
        label: "Connecticut",
        value: "CT"
    },
    {
        label: "Delaware",
        value: "DE"
    },
    {
        label: "District Of Columbia",
        value: "DC"
    },
    {
        label: "Federated States Of Micronesia",
        value: "FM"
    },
    {
        label: "Florida",
        value: "FL"
    },
    {
        label: "Georgia",
        value: "GA"
    },
    {
        label: "Guam",
        value: "GU"
    },
    {
        label: "Hawaii",
        value: "HI"
    },
    {
        label: "Idaho",
        value: "ID"
    },
    {
        label: "Illinois",
        value: "IL"
    },
    {
        label: "Indiana",
        value: "IN"
    },
    {
        label: "Iowa",
        value: "IA"
    },
    {
        label: "Kansas",
        value: "KS"
    },
    {
        label: "Kentucky",
        value: "KY"
    },
    {
        label: "Louisiana",
        value: "LA"
    },
    {
        label: "Maine",
        value: "ME"
    },
    {
        label: "Marshall Islands",
        value: "MH"
    },
    {
        label: "Maryland",
        value: "MD"
    },
    {
        label: "Massachusetts",
        value: "MA"
    },
    {
        label: "Michigan",
        value: "MI"
    },
    {
        label: "Minnesota",
        value: "MN"
    },
    {
        label: "Mississippi",
        value: "MS"
    },
    {
        label: "Missouri",
        value: "MO"
    },
    {
        label: "Montana",
        value: "MT"
    },
    {
        label: "Nebraska",
        value: "NE"
    },
    {
        label: "Nevada",
        value: "NV"
    },
    {
        label: "New Hampshire",
        value: "NH"
    },
    {
        label: "New Jersey",
        value: "NJ"
    },
    {
        label: "New Mexico",
        value: "NM"
    },
    {
        label: "New York",
        value: "NY"
    },
    {
        label: "North Carolina",
        value: "NC"
    },
    {
        label: "North Dakota",
        value: "ND"
    },
    {
        label: "Northern Mariana Islands",
        value: "MP"
    },
    {
        label: "Ohio",
        value: "OH"
    },
    {
        label: "Oklahoma",
        value: "OK"
    },
    {
        label: "Oregon",
        value: "OR"
    },
    {
        label: "Palau",
        value: "PW"
    },
    {
        label: "Pennsylvania",
        value: "PA"
    },
    {
        label: "Puerto Rico",
        value: "PR"
    },
    {
        label: "Rhode Island",
        value: "RI"
    },
    {
        label: "South Carolina",
        value: "SC"
    },
    {
        label: "South Dakota",
        value: "SD"
    },
    {
        label: "Tennessee",
        value: "TN"
    },
    {
        label: "Texas",
        value: "TX"
    },
    {
        label: "Utah",
        value: "UT"
    },
    {
        label: "Vermont",
        value: "VT"
    },
    {
        label: "Virgin Islands",
        value: "VI"
    },
    {
        label: "Virginia",
        value: "VA"
    },
    {
        label: "Washington",
        value: "WA"
    },
    {
        label: "West Virginia",
        value: "WV"
    },
    {
        label: "Wisconsin",
        value: "WI"
    },
    {
        label: "Wyoming",
        value: "WY"
    }
]

const { width, height } = Dimensions.get("window");

const RenderThirdPageHelperContent = ({ userData, location, renderHeaderLogicData, setCurrentViewState, setManualAddressEntry, handleSubItemSelection, currentView, manualAddressEntry }) => {
    const [ searchingValue, setSearchingValue ] = useState("");
    const [ inputsAreActive, setActiveInputState ] = useState(false);
    const [ isChecked, setCheckedState ] = useState(false);
    const [ selected, setSelected ] = useState(null);
    const [ searchableItems, setSearchableItemsState ] = useState([]);
    const [ selectionResults, setSelectionResults ] = useState([]);
    const [ paneSelection, setPaneSelection ] = useState(null);

    const firstInput = useRef(null);
    const secondInput = useRef(null);
    const thirdInput = useRef(null);
    const fourthInput = useRef(null);
    const fifthInput = useRef(null);
    const sixthInput = useRef(null);
    const searchableDropdownInput = useRef(null);
    const refRBSheetSelection = useRef(null);

    const calculateMapDisabled = () => {
        return isChecked === false ? true : false;
    }

    const calculateMapDisabledDoubledCheck = () => {
        if (currentView === true) { // isChecked, currentView, selected ------ (DEAFULT VALUE'S) -------- false, true, null
            if (isChecked === true && selected === null) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    const checkboxLogicRenderHelper = () => {
        return (
            <Fragment>
                <View style={[styles.hr, { marginTop: 17.5 }]} />
                <View style={styles.checkboxRow}>
                    <CheckBox
                        style={styles.checkboxInput}
                        onClick={() => {
                            setCheckedState(prevState => !prevState);
                        }}
                        checkedImage={<Image source={require('../../../../../assets/images/icon/checked.png')} style={styles.checkboxImage} />}
                        unCheckedImage={<Image source={require('../../../../../assets/images/icon/unchecked.png')} style={styles.checkboxImage} />}
                        isChecked={isChecked}
                        rightTextStyle={{ fontWeight: "bold", color: "#000" }}
                        rightText={"I acknowledge that I have permission to rent out this space and understand that if not, I may be held financially and legally responsible for any damage, loss or fees incurred."}
                    />
                </View>
                <View style={[styles.hr, { marginTop: 12.5, marginBottom: 32.5 }]} /> 
            </Fragment>
        );
    }

    const checkConditionalOrSwap = () => {
        const revertBackDefaultStateClear = () => {
            // clear previously entered data entries...
            setManualAddressEntry({
                addressLineOneStreetNumOnly, 
                addressLineOneStreetNameOnly: "",
                addressLineTwo: "",
                state: null,
                city: "",
                zipCode: ""
            })
            // swap view state
            setCurrentViewState(prevState => !prevState)
        }
        currentView === true ? revertBackDefaultStateClear() : setCurrentViewState(prevState => !prevState);
    }

    const proceedingButtonDisabledCheck = () => {

        const { 
            addressLineOneStreetNumOnly, 
            addressLineOneStreetNameOnly,
            addressLineTwo,
            state,
            city,
            zipCode 
        } = manualAddressEntry;
        

        if (currentView === false) {
            if ((typeof addressLineOneStreetNumOnly !== "undefined" && addressLineOneStreetNumOnly.length > 0) && (typeof addressLineOneStreetNameOnly !== "undefined" && addressLineOneStreetNameOnly.length > 0) && (typeof addressLineTwo !== "undefined" && addressLineTwo.length > 0) && (typeof city !== "undefined" && city.length > 0) && (typeof zipCode !== "undefined" && zipCode.length > 0) && state !== null && isChecked === true) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    const handleDBUpdateLocationOnly = (location, uniqueId) => {

        console.log("handleDBUpdateLocationOnly running/ran...!", uniqueId, location);

        const config = {
            location,
            userID: uniqueId
        };

        axios.post(`${BASE_URL}/update/partially/randomize/user/public/location`, config).then((res) => {
            
            const { updated, message } = res.data;

            if (updated === true && message === "Successfully updated user's current approx location!") {

                console.log("ressssssss location (current) data:", res.data);
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log("err", err);
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
    
                        console.log("matches", matches);
                        
                        if (matches) {
                            // searchableDropdownInput.current.blur();

                            setSearchableItemsState(matches);
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

                handleDBUpdateLocationOnly(locationObj, userData.uniqueId);

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
                            console.log("matches", matches);
                            // searchableDropdownInput.current.blur();

                            setSearchableItemsState(matches);
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

    const handleGeoCalculationAndSubmit = () => {

        const { 
            addressLineOneStreetNumOnly, 
            addressLineOneStreetNameOnly,
            state,
            city,
            zipCode 
        } = manualAddressEntry;

        axios.get(`https://api.tomtom.com/search/2/structuredGeocode.json?key=${TOMTOM_API_KEY}&countryCode=US&streetNumber=${encodeURIComponent(addressLineOneStreetNumOnly)}&streetName=${encodeURIComponent(addressLineOneStreetNameOnly)}&municipality=${encodeURIComponent(city)}&postalCode=${encodeURIComponent(zipCode)}`).then(async (res) => {
            if (res.data) {
                const { results } = res.data;

                console.log("results", results, "------------------", res.data);

                setSelectionResults(results);

                refRBSheetSelection.current.open();

                // handleSubItemSelection(2, 3, { coreStorageAddressInfo: manualAddressEntry })
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

    const debouncedSearch = useCallback(
        debounce((value) => handleSearchRelevantAddress(value), 2000),
        []
    );

    const switchBetweenAddressViews = () => {
        
        if (currentView === true) {

            const renderConditionalSearchable = () => {
                if (selected === null) {
                    console.log("searchableItems", searchableItems);
                    return (
                        <Fragment>
                            <Autocomplete
                                data={searchableItems}
                                placeholder="Street Address (Manual Entry...)"
                                placeholderTextColor={"#b3b3b3"}
                                value={searchingValue}
                                onChangeText={(text) => {
                                    debouncedSearch(text);
                                    
                                    setSearchingValue(text);
                                }}
                                flatListProps={{
                                    keyExtractor: (_, idx) => idx.toString(),
                                    renderItem: ({ item, index }) => {
                                        return (
                                            <TouchableOpacity 
                                                key={index}
                                                onPress={() => {
                                                    console.log("itemmmmmmmmmmmmmmmmmmmmmmmm", item)
                                                    setSelected(item);
    
                                                    setSearchingValue("");
                                                }} 
                                                style={{ backgroundColor: "#fff" }}
                                            >
                                                <Text>{item.name}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                }}
                            />
                            {/* <SearchableDropdown
                                placeholder="Street Address (Manual Entry...)"
                                placeholderTextColor={"#b3b3b3"}
                                selectedItems={selected}
                                onTextChange={(value) => debouncedSearch(value)}
                                containerStyle={{ padding: 5 }}
                                blurOnSubmit={true}
                                // onBlur={() => searchableDropdownInput.current.blur()}
                                onItemSelect={(item) => setSelected(item)}
                                // defaultIndex={2}
                                onRemoveItem={(item, index) => setSelected(null)}
                                setSort={(item, searchedText) => {
                                    console.log("item, searchedText", item, searchedText);
                                }}
                                itemStyle={styles.addressItemStyle}
                                itemTextStyle={{ color: '#222' }}
                                itemsContainerStyle={{ maxHeight: 250, flex: 1, zIndex: 99999999999999999999 }}
                                items={searchableItems}
                                resetValue={false}
                                textInputProps={{
                                    flex: 1,
                                    style: styles.addressInput,
                                    ref: searchableDropdownInput
                                }} 
                                listProps={styles.listAddressProps}
                            /> */}
                        </Fragment>
                    );
                } else {

                    const handleConfirmationOfLocationManually = () => {

                        const { lat, lon } = selected.otherData.position;

                        const locationObj = { latitude: lat, longitude: lon, latitudeDelta: 5, longitudeDelta: 5 };

                        handleSubItemSelection(2, 3, { dropoffLocationData: locationObj });
                    }
                    return (
                        <Fragment>
                            <Text style={styles.badgeLabel}>You've selected the following address as your selected location/address</Text>
                            <Badge
                                badgeStyle={styles.customizedBadge}
                                textStyle={styles.tagBadge}
                                value={selected.name}
                                size={"large"}
                                color={Colors.secondaryColor}
                                // status={this.calculateColor()}
                                containerStyle={{ color: "white", fontWeight: "bold" }}
                            />
                            <TouchableOpacity onPress={() => setSelected(null)} style={styles.removalIconTouchable}>
                                <Image source={require('../../../../../assets/images/icon/close-100.png')} style={styles.removalIcon} />
                            </TouchableOpacity>
                            <View style={[styles.hr, { marginBottom: 22.5 }]} />
                            <AwesomeButtonBlue disabled={calculateMapDisabled()} onPress={() => handleConfirmationOfLocationManually()} backgroundColor={calculateMapDisabled() === true ? "#d3d3d3" : "#17B411"} textColor={calculateMapDisabled() === true ? "black" : "white"} backgroundShadow={"black"} stretch={true}>Submit Selected Location Data</AwesomeButtonBlue>
                        </Fragment>
                    );
                }
            }
            return (
                <Fragment>
                    <Text style={styles.alternativeText}>Alternatively, you can search for your address...</Text>
                    <View style={styles.searchableInputWrapperView}>
                        {renderConditionalSearchable()}
                    </View>
                    <View style={[styles.hr, { marginTop: 27.5 }]} />
                    <TouchableOpacity onPress={() => setCurrentViewState(prevState => !prevState)}>
                        <Text style={styles.enterManualText}>Manually enter address</Text>
                    </TouchableOpacity>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <Text style={styles.alternativeText}>Please make sure your manually-entered address is correct</Text>
                    <View style={styles.inputFormRow}>
                        <View style={styles.addressGeneralQuarterInputSelectWrapper}>
                            <TextInput
                                autoFocus={true}
                                placeholder="Street Number"
                                style={styles.addressGeneralInput} 
                                placeholderTextColor={"#b3b3b3"} 
                                value={manualAddressEntry.addressLineOneStreetNumOnly}
                                onSubmitEditing={() => {
                                    setActiveInputState(false);
                                    
                                    setTimeout(() => { secondInput.current.focus() }, 375); 
                                }}
                                onFocus={() => setActiveInputState(true)}
                                ref={firstInput}
                                blurOnSubmit={true}
                                keyboardType={"numerical"}
                                onChangeText={(value) => setManualAddressEntry(prevState => {
                                    return {
                                        ...prevState,
                                        addressLineOneStreetNumOnly: value
                                    }
                                })}
                            />
                        </View>
                        <TextInput
                            autoFocus={true}
                            placeholder="Street Name"
                            style={styles.addressGeneralThirdLengthStyles} 
                            placeholderTextColor={"#b3b3b3"}
                            value={manualAddressEntry.addressLineOneStreetNameOnly}
                            onSubmitEditing={() => {
                                setActiveInputState(false);

                                setTimeout(() => { thirdInput.current.focus() }, 375); 
                            }}
                            onFocus={() => setActiveInputState(true)}
                            ref={secondInput}
                            blurOnSubmit={true}
                            onChangeText={(value) => setManualAddressEntry(prevState => {
                                return {
                                    ...prevState,
                                    addressLineOneStreetNameOnly: value
                                }
                            })}
                        />
                    </View>
                    <View style={styles.formSpacer} />
                    <TextInput
                        autoFocus={true}
                        placeholder="Apt, Suite, Etc... (Optional)"
                        style={styles.addressGeneralInput} 
                        placeholderTextColor={"#b3b3b3"}
                        value={manualAddressEntry.addressLineTwo}
                        onSubmitEditing={() => {
                            setActiveInputState(false);

                            setTimeout(() => { fourthInput.current.focus(); }, 375); 
                        }}
                        onFocus={() => setActiveInputState(true)}
                        ref={thirdInput}
                        blurOnSubmit={true}
                        onChangeText={(value) => setManualAddressEntry(prevState => {
                            return {
                                ...prevState,
                                addressLineTwo: value
                            }
                        })}
                    />
                    <View style={styles.formSpacer} />
                    <TextInput
                        autoFocus={true}
                        placeholder="City/Municipality"
                        style={styles.addressGeneralInput} 
                        placeholderTextColor={"#b3b3b3"}
                        value={manualAddressEntry.city}
                        onFocus={() => setActiveInputState(true)}
                        onSubmitEditing={() => {
                            setActiveInputState(false);
                        }}
                        ref={fourthInput}
                        blurOnSubmit={true}
                        onChangeText={(value) => setManualAddressEntry(prevState => {
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
                                onValueChange={(value, index) => setManualAddressEntry(prevState => {
                                    return {
                                        ...prevState,
                                        state: value
                                    }
                                })}
                                onFocus={() => setActiveInputState(true)}
                                placeholder={{ label: "State", value: "State" }}
                                placeholderTextColor={"#b3b3b3"}
                                onSubmitEditing={() => {
                                    setActiveInputState(false);

                                    setTimeout(() => { sixthInput.current.focus(); }, 375);
                                }}
                                ref={fifthInput}
                                blurOnSubmit={true}
                                value={manualAddressEntry.state}
                                style={styles.addressGeneralHalfInputSelect} 
                                items={stateOptionsSelection}
                            />
                        </View>
                        <TextInput
                            autoFocus={true}
                            placeholder="Zip/Area-Code"
                            style={styles.addressGeneralHalfInput} 
                            placeholderTextColor={"#b3b3b3"}
                            value={manualAddressEntry.zipCode}
                            onFocus={() => setActiveInputState(true)}
                            onSubmitEditing={() => {
                                setActiveInputState(false);
                            }}
                            ref={sixthInput}
                            blurOnSubmit={true}
                            onChangeText={(value) => setManualAddressEntry(prevState => {
                                return {
                                    ...prevState,
                                    zipCode: value
                                }
                            })}
                        />
                    </View>
                    <View style={[styles.hr, { marginTop: 27.5 }]} />
                    <TouchableOpacity onPress={() => checkConditionalOrSwap()}>
                        <Text style={styles.enterManualText}>Search for my address (Assisted Search - Revert To Previous View...)</Text>
                    </TouchableOpacity>
                    {checkboxLogicRenderHelper()}
                    <AwesomeButtonBlue disabled={proceedingButtonDisabledCheck()} type={"secondary"} onPress={() => handleGeoCalculationAndSubmit()} backgroundShadow={"black"} stretch={true}>Submit & Continue</AwesomeButtonBlue>
                </Fragment>
            );
        }
    }

    const gatherCurrentLocationData = () => {

        Geolocation.getCurrentPosition((info) => {

            const locationObj = { latitude: info.coords.latitude, longitude: info.coords.longitude, latitudeDelta: 5, longitudeDelta: 5 };

            handleSubItemSelection(2, 3, { dropoffLocationData: locationObj });
        });
    }

    const keyExtractor = (item, index) => index.toString();

    const renderPaneListHeader = () => {
        return (
            <Fragment>
                <Text style={styles.titleTopText}>Choose the most relevant match...</Text>
                <Text style={styles.label}>Please select the match that coorelates to your address which will then calculate the geo-coordinates of said address allowing you to continue posting your listing/space for rent!</Text>
                <View style={[styles.hr, { marginTop: 22.5, marginBottom: 32.5 }]} />
            </Fragment>
        );
    }

    const renderListItem = (item, index) => {

        const { freeformAddress, streetName, streetNumber } = item.address;

        const handleItemPressSelection = (item) => {
            // process request logic/data below..

            setPaneSelection(item);

            const { lat, lon } = item.position;

            const locationObj = { latitude: lat, longitude: lon, latitudeDelta: 5, longitudeDelta: 5 };

            refRBSheetSelection.current.close();

            setTimeout(() => { handleSubItemSelection(2, 3, { dropoffLocationData: locationObj }); }, 425);
        }

        return (
            <View style={styles.listedItemWrapperSelected} key={index}>
                <ListItem style={styles.listeditemSelected} button={true} onPress={() => handleItemPressSelection(item)}>
                    <ListItem.Content>
                        <ListItem.Title style={styles.selectedTitle}>{freeformAddress}</ListItem.Title>
                        <ListItem.Subtitle style={styles.selectedSubtitle}>{`Located on ${streetName} at ${streetNumber}`}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        );
    }
    
    return (
        <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false} style={{ flexGrow: 1 }} contentContainerStyle={{ paddingBottom: 42.5, flexGrow: 1, minHeight: 925 }}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps='always' contentContainerStyle={inputsAreActive === true ? { paddingBottom: 150 } : { paddingBottom: 0 }}>
                {renderHeaderLogicData("What's the address of your space?", "We'll only give your address to electronic dropoff requests after you approve their reservation.")}
                <AwesomeButtonBlue style={styles.buttonAddy} disabled={calculateMapDisabledDoubledCheck()} type={"secondary"} onPress={() => gatherCurrentLocationData()} backgroundShadow={"black"} stretch={true}><View style={styles.centerButtonContent}>
                    <Image source={require("../../../../../assets/images/icon/list-space/crosshair-1.png")} style={styles.buttonedIcon} />
                    <Text style={styles.awesomeButtonText}>Use Current Position</Text>
                </View></AwesomeButtonBlue>
                {currentView === true ? checkboxLogicRenderHelper() : <View style={[styles.hr, { marginTop: 27.5 }]} />}
                {switchBetweenAddressViews()}
            </KeyboardAwareScrollView>
            <RBSheet
                ref={refRBSheetSelection}
                closeOnDragDown={false}
                closeOnPressMask={true}
                dragFromTopOnly={true}
                height={height}
                closeDuration={35}
                openDuration={35}
                customStyles={{
                    container: {
                        paddingHorizontal: Sizes.fixPadding * 2.0,
                    },
                    draggableIcon: {
                        width: width * 0.725
                    }
                }}
            >
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponentStyle={styles.listheaderStyles}
                    ListHeaderComponent={() => renderPaneListHeader()}
                    keyExtractor={keyExtractor}
                    data={selectionResults}
                    renderItem={({ item, index }) => renderListItem(item, index)}
                />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
                    <View style={styles.container}>

                    </View>
                </ScrollView>
            </RBSheet>
        </ScrollView>
    );
}
const mapStateToProps = (state) => {
    return {
        location: state.location.currentLoc,
        userData: state.auth.data
    }
}

export default connect(mapStateToProps, { })(RenderThirdPageHelperContent);