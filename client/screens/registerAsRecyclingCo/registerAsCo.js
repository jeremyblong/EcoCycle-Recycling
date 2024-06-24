import React, { Fragment, useState, useEffect, useRef, useCallback, useMemo } from "react";
import { View, Text, Dimensions, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image, Animated, ImageBackground, Easing } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Autocomplete from "react-native-autocomplete-input";
import { Avatar, ListItem } from '@rneui/themed';
import Toast from 'react-native-toast-message';
import Geolocation from '@react-native-community/geolocation';
import { connect } from "react-redux";
import axios from "axios";
import _, { debounce } from "lodash";
import uuid from 'react-native-uuid';
import stylesOne from "./registerAsCoStyles.js";
import stylesTwo from "./stylesTwo.js";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Colors, Sizes, Fonts } from "../../constants/styles.js";
import { BASE_URL, BASE_ASSET_URL, TOMTOM_API_KEY } from "@env";
import SortableList from 'react-native-sortable-list';
import { BottomSheet } from 'react-native-elements';
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get('screen');

const styles = { ...stylesOne, ...stylesTwo };

const Row = ({ active, setState, data, calculateProperInt, index }) => {

    const activeAnim = useRef(new Animated.Value(0));
    
    useEffect(() => {
        Animated.timing(activeAnim.current, {
            duration: 300,
            easing: Easing.bounce,
            toValue: Number(active),
            useNativeDriver: true,
        }).start();
    }, [active]);

    const associatedStyles = useMemo(() => ({
        ...Platform.select({
            ios: {
                transform: [
                    {
                        scale: activeAnim.current.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.1],
                        }),
                    },
                ],
                shadowRadius: activeAnim.current.interpolate({
                    inputRange: [0, 1],
                    outputRange: [2, 10],
                }),
            },
            android: {
                transform: [
                    {
                        scale: activeAnim.current.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.07],
                        }),
                    },
                ],
                elevation: activeAnim.current.interpolate({
                    inputRange: [0, 1],
                    outputRange: [2, 6],
                }),
            },
        }),
    }), [], );

    if (Object.keys(data).length > 0) {
        const objBreakdown = data[Object.keys(data)];
        return (
            <Animated.View style={[styles.imageWrappedContainOutter, associatedStyles]}>
                <View style={styles.imageWrappedContainOutterSub}>
                    <ImageBackground resizeMode={'cover'} imageStyle={{ borderRadius: 22.5, width: "100%", height: "100%" }} source={{ uri: `${BASE_ASSET_URL}/${objBreakdown.link}` }} style={styles.imageWrappedContain}>
                        <TouchableOpacity onPress={() => {
                            // const handleNewState = uploaded.splice(index, 1);
                            setState(prevState => ({
                                ...prevState,
                                uploaded: prevState.uploaded.filter((item, idxed) => idxed !== index)
                            }))
    
                        }} style={styles.closeIconClickableTouch}>
                            <Image source={require("../../assets/images/icon/close-100.png")} style={styles.closeIconImage} />
                        </TouchableOpacity>
                    </ImageBackground>
                    <View style={styles.floatRightSideWrapper}>
                        {calculateProperInt(index)}
                    </View>
                </View>
            </Animated.View>
        );
    } else {
        return null;
    }
};

const RegisterAsRecyclingCompany = ({ authData }) => {
    const mapRef = useRef(null);
    const firstTextInput = useRef(null);
    const contactPersonInput = useRef(null);
    const contactPhoneNumberInput = useRef(null);
    const dropOffInstructionsInput = useRef(null);
    const [ state, setState ] = useState({
        addressResults: [],
        isKeyboardVisible: true,
        contactPersonName: "",
        contactPhoneNumber: "",
        searchingQuery: "",
        uploaded: [],
        pending: false,
        inputsAreActive: false,
        isSubmitting: false,
        selected: null,
        facilityType: null,
        showBottomSheet: false,
        dropOffInstructions: "",
        hoursOfOperation: {
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: ''
        }
    })

    const { uploaded, pending } = state;

    const handleInputChange = (day, value) => {
        setState(prevState => ({
            ...prevState,
            hoursOfOperation: {
                ...prevState.hoursOfOperation,
                [day]: value
            }
        }));
    };
    
    const viewBottomSheet = () => {
        return (
            <BottomSheet
                isVisible={state.showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)', zIndex: 99 }} 
            >
                <View style={pending === true ? styles.bottomSheetStyleHidden : styles.bottomSheetStyle}>
                    <Text style={{ ...Fonts.black19Bold, textAlign: 'center', }}>
                        Select An Option
                    </Text>
                    <View style={{ height: 0.80, backgroundColor: 'gray', marginVertical: Sizes.fixPadding }}>
                    </View>
                    <TouchableOpacity onPress={() => handleCameraLaunch()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require("../../assets/images/icon/camera.png")} style={styles.iconCustom} />
                        <Text style={{ ...Fonts.black16Medium, marginLeft: Sizes.fixPadding }}>
                            Camera
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleImageGalleryLaunch()} style={{ flexDirection: 'row', marginVertical: Sizes.fixPadding * 2.0 }}>
                        <Image source={require("../../assets/images/icon/upload-64.png")} style={styles.iconCustom} />
                        <Text style={{ ...Fonts.black16Medium, marginLeft: Sizes.fixPadding }}>
                            Upload from Gallery
                        </Text>
                    </TouchableOpacity>
                    <View style={[styles.hrBlue, { marginTop: 7.25, marginBottom: 22.75 }]} />
                    <AwesomeButtonBlue style={styles.paneButtonBottom} backgroundDarker={"#868686"} backgroundColor={"#CA052A"} backgroundShadow={"black"} onPress={() => {
                          setState(prevState => ({
                            ...prevState,
                            showBottomSheet: false
                        }))
    
                    }} stretch={true}>Cancel/Close Pane</AwesomeButtonBlue>
                </View>
            </BottomSheet>
        )
    }

    const handleCameraLaunch = async () => {
        const options = {
            includeBase64: true,
            saveToPhotos: true,
            mediaType: "photo",
            selectionLimit: 1
        };

        const result = await launchCamera(options);

        if (!_.has(result, "didCancel")) {

            setState(prevState => ({
                ...prevState,
                pending: true
            }))
            
            const asset = result.assets[0];

            const config = {
                base64: asset.base64,
                contentType: asset.type,
                filename: asset.fileName,
                uniqueId: authData.uniqueId
            }

            axios.post(`${BASE_URL}/upload/misc/file/wo/saving`, config).then((res) => {
                if (res.data.message === "Uploaded successfully!") {

                    console.log(res.data);

                    const { file } = res.data; // uploaded

                    setState(prevState => ({
                        ...prevState,
                        pending: false,
                        showBottomSheet: false,
                        uploaded: [...prevState.uploaded, {
                            [Number(prevState.length)]: file
                        }]
                    }))
                } else {
                    console.log("Err", res.data);

                    setState(prevState => ({
                        ...prevState,
                        loading: false,
                        pending: false,
                        showBottomSheet: false
                    }))

                    Toast.show({
                        type: 'error',
                        text1: 'Error occurred while uploading your selected file.',
                        text2: 'The attempt to upload your file failed as we encountered a random error while processing your request.',
                        visibilityTime: 4250,
                        position: "bottom"
                    });
                }
            }).catch((err) => {
                console.log(err);

                setState(prevState => ({
                    ...prevState,
                    loading: false,
                    showBottomSheet: false
                }))

                Toast.show({
                    type: 'error',
                    text1: 'Error occurred while uploading your selected file.',
                    text2: 'The attempt to upload your file failed as we encountered a random error while processing your request.',
                    visibilityTime: 4250,
                    position: "bottom"
                });
            })
        }
    }

    const handleImageGalleryLaunch = async () => {
        const options = {
            includeBase64: true,
            saveToPhotos: true,
            mediaType: "photo",
            selectionLimit: 1,
            quality: 1
        };

        const result = await launchImageLibrary(options);

        if (!_.has(result, "didCancel")) {

            setState(prevState => ({
                ...prevState,
                pending: true
            }))


            const asset = result.assets[0];

            const config = {
                base64: asset.base64,
                contentType: asset.type,
                filename: asset.fileName,
                uniqueId: authData.uniqueId
            }

            axios.post(`${BASE_URL}/upload/misc/file/wo/saving`, config).then((res) => {
                if (res.data.message === "Uploaded successfully!") {

                    console.log(res.data);

                    const { file } = res.data; // uploaded

                    setState(prevState => ({
                        ...prevState,
                        pending: false,
                        showBottomSheet: false,
                        uploaded: [...prevState.uploaded, {
                            [Number(prevState.length)]: file
                        }]
                    }));
                } else {
                    console.log("Err", res.data);

                    setState(prevState => ({
                        ...prevState,
                        pending: false,
                        showBottomSheet: false
                    }))
                    
                    Toast.show({
                        type: 'error',
                        text1: 'Error occurred while uploading your selected file.',
                        text2: 'The attempt to upload your file failed as we encountered a random error while processing your request.',
                        visibilityTime: 4250,
                        position: "bottom"
                    });
                }
            }).catch((err) => {
                console.log(err);

                setState(prevState => ({
                    ...prevState,
                    pending: false,
                    showBottomSheet: false
                }))

                Toast.show({
                    type: 'error',
                    text1: 'Error occurred while uploading your selected file.',
                    text2: 'The attempt to upload your file failed as we encountered a random error while processing your request.',
                    visibilityTime: 4250,
                    position: "bottom"
                });
            })
        }
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
                                    searchingQuery: value
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
                                    addressResults: matches,
                                    isKeyboardVisible: false,
                                    searchingQuery: value
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
    };
    
    const onChangeOrderHelper = (nextOrder) => {

        const newlyOrganizedArr = []; // findIndex

        nextOrder.forEach((order, idx, array) => {
            // find the appropriate index
            const matchingIndex = uploaded.findIndex(iteration => Object.keys(iteration)[0] === order);
            // create new item to push
            const newItemAddition = uploaded[matchingIndex];
            // push into array/arr...
            newlyOrganizedArr.push(newItemAddition);
            // check if end
            if (idx === (array.length - 1)) {
                setState(prevState => ({
                    ...prevState,
                    uploaded: newlyOrganizedArr
                }))
            }
        });
    }
    
    const renderRow = useCallback(({ data, active, index }) => {
        // console.log("renderRow...:", data, active);
        return <Row uploaded={uploaded} index={index} setState={setState} calculateProperInt={calculateProperInt} data={data} active={active} />;
    }, []);

    const calculateProperInt = (int) => {
        switch (Number(int)) {
            case 0:
                return <Image resizeMode={"contain"} source={require("../../assets/images/icon/numbers/1.png")} style={styles.numericalImageIcon} />;
                break;
            case 1:
                return <Image resizeMode={"contain"} source={require("../../assets/images/icon/numbers/2.png")} style={styles.numericalImageIcon} />;
                break;
            case 2:
                return <Image resizeMode={"contain"} source={require("../../assets/images/icon/numbers/3.png")} style={styles.numericalImageIcon} />;
                break;
            case 3:
                return <Image resizeMode={"contain"} source={require("../../assets/images/icon/numbers/4.png")} style={styles.numericalImageIcon} />;
                break;
            case 4:
                return <Image resizeMode={"contain"} source={require("../../assets/images/icon/numbers/5.png")} style={styles.numericalImageIcon} />;
                break;
            case 5:
                return <Image resizeMode={"contain"} source={require("../../assets/images/icon/numbers/6.png")} style={styles.numericalImageIcon} />;
                break;
            case 6:
                return <Image resizeMode={"contain"} source={require("../../assets/images/icon/numbers/7.png")} style={styles.numericalImageIcon} />;
                break;
            case 7:
                return <Image resizeMode={"contain"} source={require("../../assets/images/icon/numbers/8.png")} style={styles.numericalImageIcon} />;
                break;
            case 8:
                return <Image resizeMode={"contain"} source={require("../../assets/images/icon/numbers/9.png")} style={styles.numericalImageIcon} />;
                break;
            default:
                break;
        }
    }

    const onReleaseRowHelper = (key, currentOrder) => {
        console.log("onReleaseRowHelper helper... (key, currentOrder):", key, currentOrder);

        setState(prevState => {
            return {
                ...prevState,
                scrollEnabled: true
            }
        })
    };

    const onActivateRow = (key) => {
        console.log("onActivateRow helper... (key):", key);
        
        setState(prevState => {
            return {
                ...prevState,
                scrollEnabled: false
            }
        })
    };

    const handleFinalSubmission = useCallback(debounce(() => {
        if (state.isSubmitting) return; // Prevent multiple submissions

        setState(prevState => ({ ...prevState, isSubmitting: true }));

        console.log("handleFinalSubmission clicked/ran....");

        const {
            facilityName,
            contactPersonName,
            contactPhoneNumber,
            uploaded,
            selected,
            facilityType,
            dropOffInstructions,
            hoursOfOperation
        } = state;

        const config = {
            facilityName,
            contactPersonName,
            contactPhoneNumber,
            uploaded,
            selected,
            facilityType,
            dropOffInstructions,
            hoursOfOperation,
            uniqueId: authData.uniqueId,
            name: `${authData.firstName} ${authData.lastName}`
        };

        axios.post(`${BASE_URL}/save/recycling/dropoff/facility`, config).then((res) => {
            const { message } = res.data;

            if (message === "Successfully saved dropoff facility data!") {

                console.log("Successfully saved dropoff facility data!", res.data);

                setState(prevState => ({ ...prevState, isSubmitting: false }));
            } else {
                console.log("err", res.data);

                setState(prevState => ({ ...prevState, isSubmitting: false }));
            }
        }).catch((err) => {
            console.log("err", err);

            setState(prevState => ({ ...prevState, isSubmitting: false }));
        })
    }, 300), [state, authData, state.isSubmitting]);

    const sortableListFooterRender = () => {

        const checkExistingUploadedPhotosDisabled = () => {
            const {
                facilityName,
                contactPersonName,
                contactPhoneNumber,
                uploaded,
                selected,
                facilityType,
                dropOffInstructions 
            } = state;

            const {
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday
            } = state.hoursOfOperation;

            if (typeof uploaded !== "undefined" && uploaded.length > 0 && (typeof monday !== "undefined" && monday.length > 0 && typeof tuesday !== "undefined" && tuesday.length > 0 && typeof wednesday !== "undefined" && wednesday.length > 0 && typeof thursday !== "undefined" && thursday.length > 0 && typeof friday !== "undefined" && friday.length > 0 && typeof saturday !== "undefined" && saturday.length > 0 && typeof sunday !== "undefined" && sunday.length > 0) && (selected !== null) && (typeof contactPhoneNumber !== "undefined" && contactPhoneNumber.length > 0) && (typeof contactPersonName !== "undefined" && contactPersonName.length > 0) && (typeof facilityType !== null) && (typeof dropOffInstructions !== "undefined" && dropOffInstructions.length > 0) && (typeof facilityName !== "undefined" && facilityName.length > 0)) {
                return false;
            } else {
                return true;
            }
        }

        return (
            <Fragment>
                <View style={[styles.hrBlue, { left: 7.5, marginTop: 12.5, marginBottom: 12.5 }]} />
                <View style={styles.centeredContent}>
                    <TouchableOpacity onPress={() => {
                            setState(prevState => ({
                                ...prevState,
                                showBottomSheet: true
                            })
                        )}} style={styles.addPicturesButtonTouchable}>
                        <View style={styles.pictureRow}>
                            <Image source={require("../../assets/images/icon/list-space/camera.png")} style={styles.cameraTouchableImage} />
                            <Text style={styles.addPhotoText}>Select/Add Photo's</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.hrBlue, { left: 7.5, marginTop: 12.5, marginBottom: 32.5 }]} />
                <View style={styles.bottomWrapperContainer}>
                    <AwesomeButtonBlue style={styles.absoluteButtonBottom} disabled={checkExistingUploadedPhotosDisabled()} type={"secondary"} onPress={handleFinalSubmission} backgroundShadow={"black"} stretch={true}>Submit & Continue</AwesomeButtonBlue>
                    <View style={[styles.hrBlue, { left: 7.5, marginTop: 12.5, marginBottom: 10 }]} />
                    <AwesomeButtonBlue backgroundDarker={"#000"} backgroundColor={"#e60000"} style={styles.absoluteButtonBottom} type={"secondary"} onPress={() => {
                        // updateMainState({ page: 1 });

                        // updateFreightDetailsState({});
                    }} textColor={"#fff"} backgroundShadow={"black"} stretch={true}>Restart Process</AwesomeButtonBlue>
                </View>
            </Fragment>
        );
    }
    const sortableListHeaderRender = () => {

        const renderMiddleJSXHelper = () => {
            if (typeof uploaded !== "undefined" && uploaded.length === 0) {
                return (
                    <Fragment>
                        <View style={styles.topChunkWrapper}>
                            <View style={styles.leftIconStyleWrapper}>
                                <Image source={require("../../assets/images/icon/brown-crate.png")} style={styles.leftIconStyle} />
                            </View>
                            <View style={styles.rightMainStyle}>
                                <Text style={styles.titledHeaderText}>Upload Certification</Text>
                                <Text style={styles.subbedText}>Upload a clear and accurate copy of your e-waste recycling facility's certification. Ensure the document is legible and up-to-date.</Text>
                            </View>
                        </View>
                        <View style={[styles.hr, { left: 7.5, marginTop: 12.5, marginBottom: 12.5 }]} />
                        <View style={styles.topChunkWrapper}>
                            <View style={styles.leftIconStyleWrapper}>
                                <Image source={require("../../assets/images/icon/list-space/lighting.png")} style={styles.leftIconStyle} />
                            </View>
                            <View style={styles.rightMainStyle}>
                                <Text style={styles.titledHeaderText}>Ensure Readability</Text>
                                <Text style={styles.subbedText}>Make sure the certification document is clear and readable. Use a scanner or a high-quality camera to capture the document.</Text>
                            </View>
                        </View>
                        <View style={[styles.hr, { left: 7.5, marginTop: 12.5, marginBottom: 12.5 }]} />
                        <View style={styles.topChunkWrapper}>
                            <View style={styles.leftIconStyleWrapper}>
                                <Image source={require("../../assets/images/icon/list-space/box.png")} style={styles.leftIconStyle} />
                            </View>
                            <View style={styles.rightMainStyle}>
                                <Text style={styles.titledHeaderText}>Verify Certification Details</Text>
                                <Text style={styles.subbedText}>Double-check that all certification details are correct and match the information of your recycling facility. This includes the name, address, and certification number.</Text>
                            </View>
                        </View>
                    </Fragment>
                );
            } else {
                return (
                    <Fragment>
                        <View style={{ margin: 12.5 }}>
                            <Text style={styles.presentationText}>Your documentation photos will NOT be shown publically - these are for our own records only.</Text>
                            <View style={styles.centeredOnly}>
                                <View style={[styles.midSizedHr, { marginTop: 22.5, marginBottom: 27.5 }]} />
                            </View>
                        </View>
                    </Fragment>
                );
            }
        }
        return (
            <Fragment>
                <View style={styles.wrapperMainTopContainer}>
                    <View style={[styles.hrBlue, { left: 7.5, marginTop: 1.25, marginBottom: 12.5 }]} />
                        <View style={styles.centeredContent}>
                            <TouchableOpacity onPress={() => {
                                setState(prevState => ({
                                    ...prevState,
                                    showBottomSheet: true
                                }))
                            }} style={styles.addPicturesButtonTouchable}>
                                <View style={styles.pictureRow}>
                                    <Image source={require("../../assets/images/icon/list-space/camera.png")} style={styles.cameraTouchableImage} />
                                    <Text style={styles.addPhotoText}>Select/Add Photo's</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    <View style={[styles.hrBlue, { left: 7.5, marginTop: 12.5, marginBottom: 22.5 }]} />
                    {renderMiddleJSXHelper()}
                </View>
            </Fragment>
        );
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          console.log(state.searchingQuery);

          handleSearchRelevantAddress(state.searchingQuery);
          // Send Axios request here
        }, 1250)
    
        return () => clearTimeout(delayDebounceFn)
    }, [state.searchingQuery])

    console.log("STATE.selected", state.selected);
    
    const { inputsAreActive } = state;

    return (
        <ScrollView style={{ height, backgroundColor: "#fff" }}>
            <Spinner
                visible={state.isSubmitting}
                textContent={'Loading/Processing request...'}
                textStyle={styles.spinnerTextStyle}
            />
            <KeyboardAwareScrollView keyboardShouldPersistTaps='always' contentContainerStyle={inputsAreActive === true ? { paddingBottom: 262.5 } : { paddingBottom: 0 }}>
                <View style={{ padding: 12.25, backgroundColor: "#fff" }}>
                    <Text style={{ marginBottom: 12.25, fontWeight: "bold" }}>Select your facility location where we should send shipments:</Text>
                    <Autocomplete
                        data={state.addressResults}
                        value={state.searchingQuery}
                        hideResults={state.isKeyboardVisible}
                        placeholder={"Search for your address..."}
                        placeholderTextColor={"grey"}
                        listContainerStyle={{ height: state.addressResults.length * 65 }}
                        // inputContainerStyle={{ borderBottomWidth: 1, borderBottomColor: "grey" }}
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
                                            return {
                                                ...prevState,
                                                selected: item,
                                                addressResults: [],
                                                isKeyboardVisible: false
                                            }
                                        })

                                        mapRef.current.animateToRegion({
                                            latitude: item.otherData.position.lat,
                                            longitude: item.otherData.position.lon,
                                            latitudeDelta: 0.10,
                                            longitudeDelta: 0.10,
                                        }, 1000);
                                    }} key={index}>
                                        <ListItem style={{ zIndex: 99999999999999, minHeight: 65, height: 65 }}>
                                            <ListItem.Content>
                                                <ListItem.Title style={{ fontSize: 14 }}>{item.name}</ListItem.Title>
                                                <ListItem.Subtitle>{`${item.otherData.address.countrySecondarySubdivision} ${item.otherData.address.countrySubdivision} ${item.otherData.address.countryCodeISO3}`}</ListItem.Subtitle>
                                            </ListItem.Content>
                                            <Avatar style={styles.avatarComment} source={require("../../assets/images/icon/right-arrow-custom.png")} />
                                        </ListItem>
                                    </TouchableOpacity>
                                );
                            },
                        }}
                    />
                    <MapView
                        style={{minHeight: height * 0.325, height: height * 0.325, marginTop: 12.5 }}
                        initialRegion={state.selected !== null ? {
                            latitude: state.selected.otherData.position.lat,
                            longitude: state.selected.otherData.position.lon,
                            latitudeDelta: 0.10,
                            longitudeDelta: 0.10,
                        } : {
                            latitude: 39.744137,
                            longitude: -104.950050,
                            latitudeDelta: 0.10,
                            longitudeDelta: 0.10,
                        }}
                        ref={mapRef}
                    >
                        <Marker
                            coordinate={state.selected !== null ? {
                                latitude: state.selected.otherData.position.lat,
                                longitude: state.selected.otherData.position.lon
                            } : {
                                latitude: 39.744137,
                                longitude: -104.950050
                            }}
                            pinColor={"blue"}
                            draggable
                            onDragEnd={(e) => {
                                console.log("e.nativeEvent.coordinate", e.nativeEvent.coordinate);

                                const { latitude, longitude } = e.nativeEvent.coordinate;

                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        selected: {
                                            otherData: {
                                                position: {
                                                    lat: latitude, 
                                                    lon: longitude
                                                }
                                            }
                                        },
                                        addressResults: [],
                                        isKeyboardVisible: false
                                    }
                                })
                            }}
                        />
                    </MapView>
                    <Text style={styles.labelCustom}>Enter your <Text style={{ color: Colors.secondaryColor }}>Company/Facility</Text> name</Text>
                    <View style={styles.textFieldContainerStyle}>
                        <TextInput  
                            value={state.facilityName}
                            placeholder="Enter the name of your company/facility:"
                            ref={firstTextInput}
                            onSubmitEditing={() => {
                                setState(prevState => ({
                                    ...prevState,
                                    inputsAreActive: false
                                }))
                                contactPersonInput.current.focus()
                            }}
                            onFocus={() => {
                                setState(prevState => ({
                                    ...prevState,
                                    inputsAreActive: true
                                }))
                            }}
                            style={{ fontWeight: "bold" }}
                            onChangeText={(value) => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        facilityName: value
                                    }
                                })
                            }}
                        />
                    </View>
                    <Text style={styles.labelCustom}>Enter the <Text style={{ color: Colors.secondaryColor }}>Contact Person</Text> name</Text>
                    <View style={styles.textFieldContainerStyle}>
                        <TextInput  
                            value={state.contactPersonName}
                            placeholder="Enter the name of the contact person:"
                            ref={contactPersonInput}
                            onSubmitEditing={() => {
                                setState(prevState => ({
                                    ...prevState,
                                    inputsAreActive: false
                                }))
                                contactPhoneNumberInput.current.focus()
                            }}
                            onFocus={() => {
                                setState(prevState => ({
                                    ...prevState,
                                    inputsAreActive: true
                                }))
                            }}
                            style={{ fontWeight: "bold" }}
                            onChangeText={(value) => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        contactPersonName: value
                                    }
                                })
                            }}
                        />
                        </View>
                        <Text style={styles.labelCustom}>Enter the <Text style={{ color: Colors.secondaryColor }}>Contact</Text> phone number</Text>
                        <View style={styles.textFieldContainerStyle}>
                            <TextInput  
                                value={state.contactPhoneNumber}
                                placeholder="Enter the contact phone number:"
                                ref={contactPhoneNumberInput}
                                onSubmitEditing={() => {
                                    setState(prevState => ({
                                        ...prevState,
                                        inputsAreActive: false
                                    }))
                                }}
                                onFocus={() => {
                                    setState(prevState => ({
                                        ...prevState,
                                        inputsAreActive: true
                                    }))
                                }}
                                style={{ fontWeight: "bold" }}
                                onChangeText={(value) => {
                                    setState(prevState => {
                                        return {
                                            ...prevState,
                                            contactPhoneNumber: value
                                        }
                                    })
                                }}
                                keyboardType="phone-pad"
                            />
                        </View>
                        <Text style={styles.labelCustom}>Select the <Text style={{ color: Colors.secondaryColor }}>Type of Facility</Text></Text>
                        <View style={styles.pickerContainerStyle}>
                            <RNPickerSelect
                                onValueChange={(value) =>  setState(prevState => ({
                                    ...prevState,
                                    facilityType: false
                                }))}
                                items={[
                                    { label: 'Recycling Center', value: 'recycling_center' },
                                    { label: 'Collection Point', value: 'collection_point' },
                                    { label: 'Processing Facility', value: 'processing_facility' },
                                    { label: 'E-Waste Depot', value: 'e_waste_depot' },
                                    { label: 'E-Waste Recycler', value: 'e_waste_recycler' },
                                    { label: 'Electronics Recycling Plant', value: 'electronics_recycling_plant' },
                                    { label: 'Refurbishment Center', value: 'refurbishment_center' },
                                    { label: 'Data Destruction Facility', value: 'data_destruction_facility' },
                                    { label: 'Mobile Device Recycling', value: 'mobile_device_recycling' },
                                    { label: 'Battery Recycling Facility', value: 'battery_recycling_facility' },
                                    { label: 'IT Asset Disposition (ITAD) Service', value: 'itad_service' },
                                    { label: 'Hazardous Waste Recycler', value: 'hazardous_waste_recycler' },
                                    { label: 'Metal Recovery Facility', value: 'metal_recovery_facility' },
                                    { label: 'Printer and Toner Recycling', value: 'printer_toner_recycling' },
                                    { label: 'Telecom Equipment Recycler', value: 'telecom_equipment_recycler' },
                                    { label: 'Consumer Electronics Recycler', value: 'consumer_electronics_recycler' },
                                    { label: 'Appliance Recycler', value: 'appliance_recycler' }
                                ]}
                                placeholder={{
                                    label: 'Select type of facility...',
                                    value: null,
                                    color: '#9EA0A4',
                                }}
                                value={state.facilityType}
                                style={pickerSelectStyles}
                            />
                        </View>
                        <Text style={styles.labelCustom}>Enter your <Text style={{ color: Colors.secondaryColor }}>hours of operations</Text>:</Text>
                        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                            <View key={day} style={styles.textFieldContainerStyle}>
                                <Text style={styles.dayLabel}>{day.charAt(0).toUpperCase() + day.slice(1)}:</Text>
                                <TextInput
                                    value={state[day]}
                                    placeholder="e.g. 9:00 AM - 5:00 PM"
                                    style={styles.textInput}
                                    onChangeText={(value) => handleInputChange(day, value)}
                                />
                            </View>
                        ))}
                        <Text style={styles.labelCustom}>
                            Enter the <Text style={{ color: Colors.secondaryColor }}>Drop-off</Text> instructions
                        </Text>
                        <View style={[styles.textFieldContainerStyle, { height: 175, minHeight: 175, maxHeight: 175, textAlignVertical: "top" }]}>
                            <TextInput
                                value={state.dropOffInstructions}
                                placeholder="Enter the drop-off instructions:"
                                ref={dropOffInstructionsInput}
                                onSubmitEditing={() => {
                                    setState(prevState => ({
                                        ...prevState,
                                        inputsAreActive: false
                                    }));
                                }}
                                onFocus={() => {
                                    setState(prevState => ({
                                        ...prevState,
                                        inputsAreActive: true
                                    }));
                                }}
                                style={{ fontWeight: "bold", textAlignVertical: "top" }}
                                onChangeText={(value) => {
                                    setState(prevState => ({
                                        ...prevState,
                                        dropOffInstructions: value
                                    }));
                                }}
                                multiline={true}
                                numberOfLines={10}
                            />
                        </View>
                        <SortableList 
                            style={styles.sortableContentContainerOriginalStyle}
                            contentContainerStyle={styles.sortableContentContainer}
                            data={uploaded}
                            scrollEnabled={false}
                            rowActivationTime={1250}
                            extra
                            renderRow={renderRow}
                            renderFooter={sortableListFooterRender}
                            renderHeader={sortableListHeaderRender}
                            onChangeOrder={onChangeOrderHelper}
                            onReleaseRow={onReleaseRowHelper}
                            onActivateRow={onActivateRow}
                        />
                        {viewBottomSheet()}
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

const mapStateToProps = (state) => {
    return {
        location: state.location.currentLoc,
        userData: state.auth.data,
        authData: state.auth.data
    }
};

export default connect(mapStateToProps, {})(RegisterAsRecyclingCompany);