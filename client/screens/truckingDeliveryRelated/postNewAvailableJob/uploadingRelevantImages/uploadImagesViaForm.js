import React, { Fragment, useState, useRef, useMemo, useCallback, useEffect } from "react";
import styles from "./uploadingImagesViaFormStyles.js";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, Platform, ImageBackground, Animated, Easing } from "react-native";
import { Sizes, Fonts } from "../../../../constants/styles.js";
import { connect } from "react-redux";
import axios from "axios";
import { BottomSheet } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { BASE_URL, BASE_ASSET_URL } from "@env";
import Toast from 'react-native-toast-message';
import _ from "lodash";
import SortableList from 'react-native-sortable-list';
import { useNavigation } from "@react-navigation/native";
import Dialog from "react-native-dialog";
import Geolocation from '@react-native-community/geolocation';


const Row = ({ active, data, setUploadedPics, calculateProperInt, index }) => {

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
    
                            setUploadedPics(prevState => {
                                return prevState.filter((item, idxed) => idxed !== index);
                            });
    
                        }} style={styles.closeIconClickableTouch}>
                            <Image source={require("../../../../assets/images/icon/close-100.png")} style={styles.closeIconImage} />
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
}

const UploadImagesRelevantHelperImagesNewDeliveryPost = (props) => {

    const { authData, location } = props;
    // deconstruct authData from redux-store...
    const navigation = useNavigation();

    const { passedData} = props.route.params;

    const [ showBottomSheet, setBottomSheetState ] = useState(false);
    const [ pending, setPending ] = useState(false);
    const [ scrollEnabled, updateScrollEnabledState ] = useState(true);
    const [ uploaded, setUploadedPics ] = useState([]);
    const [ confirmation, setConfimationState ] = useState(false);

    const reformatAndAdd = () => {

        const pushingIntoArrPromise = new Promise((resolve, reject) => {
            
            const newArrayValues = [];

            for (let idxxxxxxxx = 0; idxxxxxxxx < uploaded.length; idxxxxxxxx++) {
                
                const element = Object.values(uploaded[idxxxxxxxx])[0];
    
                newArrayValues.push(element);
    
                if ((uploaded.length - 1) === idxxxxxxxx) {
                    resolve(newArrayValues)
                }
            }
        })

        pushingIntoArrPromise.then((passedArrayValues) => {
            // check if redux-state is active with correct required values... if not fetch current location data/coordinates...
            if (location !== null) {
                console.log("location coords", location, location.coords);

                const { latitude, longitude } = location.coords;
            
                // post the listing via API-request...
                const configuration = {
                    attachedImages: passedArrayValues,
                    postedID: authData.uniqueId,
                    passedData,
                    currentLocation: { latitude, longitude },
                    postedByName: `${authData.firstName} ${authData.lastName}`,
                    postedByUsername: authData.username
                }
                // actual request logic...
                axios.post(`${BASE_URL}/upload/available/delivery/transport/freight/listing`, configuration).then((res) => {
                    if (res.data.message === "Successfully posted the freight listing!") {

                        console.log("Successfully posted the freight listing...:", res.data);

                        Toast.show({ 
                            type: 'success',
                            text1: `We've successfully posted your new 'freight listing'!`,
                            text2: `We've successfully posted your NEW freight listing & it is now LIVE and viewable by our entire audience...!`,
                            visibilityTime: 2375,
                            position: "bottom"
                        });

                        setTimeout(() => {
                            navigation.navigate('BottomTabScreen', { index: 1 });
                        },  2375);
                    } else {

                        console.log("Error posting || attempting to post listing...:", res.data);

                        Toast.show({ 
                            type: 'error',
                            text1: `We could NOT post your freight listing!`,
                            text2: `We attempted to post your new freight listing but failed - please try the action again or contact support if the problem continues to persist...`,
                            visibilityTime: 4250,
                            position: "bottom"
                        });
                    }
                }).catch((error) => {

                    console.log("Main err...:", error);

                    Toast.show({ 
                        type: 'error',
                        text1: `We could NOT post your freight listing!`,
                        text2: `We attempted to post your new freight listing but failed - please try the action again or contact support if the problem continues to persist...`,
                        visibilityTime: 4250,
                        position: "bottom"
                    });
                })
            } else {
                // fetch appropriate location data relevant for listing req. information for map view later...
                Geolocation.getCurrentPosition(info => {
                    console.log("Gathered information correctly - geo: ", info);

                    const { latitude, longitude } = info.coords;
                    // post the listing via API-request...
                    const configuration = {
                        attachedImages: passedArrayValues,
                        postedID: authData.uniqueId,
                        passedData,
                        currentLocation: { latitude, longitude },
                        postedByName: `${authData.firstName} ${authData.lastName}`,
                        postedByUsername: authData.username
                    }
                    // actual request logic...
                    axios.post(`${BASE_URL}/upload/available/delivery/transport/freight/listing`, configuration).then((res) => {
                        if (res.data.message === "Successfully posted the freight listing!") {

                            console.log("Successfully posted the freight listing...:", res.data);

                            Toast.show({ 
                                type: 'success',
                                text1: `We've successfully posted your new 'freight listing'!`,
                                text2: `We've successfully posted your NEW freight listing & it is now LIVE and viewable by our entire audience...!`,
                                visibilityTime: 2375,
                                position: "bottom"
                            });

                            setTimeout(() => {
                                navigation.navigate('BottomTabScreen', { index: 1 });
                            },  2375);
                        } else {

                            console.log("Error posting || attempting to post listing...:", res.data);

                            Toast.show({ 
                                type: 'error',
                                text1: `We could NOT post your freight listing!`,
                                text2: `We attempted to post your new freight listing but failed - please try the action again or contact support if the problem continues to persist...`,
                                visibilityTime: 4250,
                                position: "bottom"
                            });
                        }
                    }).catch((error) => {

                        console.log("Main err...:", error);

                        Toast.show({ 
                            type: 'error',
                            text1: `We could NOT post your freight listing!`,
                            text2: `We attempted to post your new freight listing but failed - please try the action again or contact support if the problem continues to persist...`,
                            visibilityTime: 4250,
                            position: "bottom"
                        });
                    })
                });
            }
        });
    }

    const viewBottomSheet = () => {
        return (
            <BottomSheet
                isVisible={showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)', zIndex: 99 }} 
            >
                <View style={pending === true ? styles.bottomSheetStyleHidden : styles.bottomSheetStyle}>
                    <Text style={{ ...Fonts.black19Bold, textAlign: 'center', }}>
                        Select An Option
                    </Text>
                    <View style={{ height: 0.80, backgroundColor: 'gray', marginVertical: Sizes.fixPadding }}>
                    </View>
                    <TouchableOpacity onPress={() => handleCameraLaunch()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require("../../../../assets/images/icon/camera.png")} style={styles.iconCustom} />
                        <Text style={{ ...Fonts.black16Medium, marginLeft: Sizes.fixPadding }}>
                            Camera
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleImageGalleryLaunch()} style={{ flexDirection: 'row', marginVertical: Sizes.fixPadding * 2.0 }}>
                        <Image source={require("../../../../assets/images/icon/upload-64.png")} style={styles.iconCustom} />
                        <Text style={{ ...Fonts.black16Medium, marginLeft: Sizes.fixPadding }}>
                            Upload from Gallery
                        </Text>
                    </TouchableOpacity>
                    <View style={[styles.hrBlue, { marginTop: 7.25, marginBottom: 22.75 }]} />
                    <AwesomeButtonBlue style={styles.paneButtonBottom} backgroundDarker={"#868686"} backgroundColor={"#CA052A"} backgroundShadow={"black"} onPress={() => setBottomSheetState(false)} stretch={true}>Cancel/Close Pane</AwesomeButtonBlue>
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

            setPending(true);
            
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

                    setUploadedPics(prevState => {
                        return [...prevState, {
                            [Number(prevState.length)]: file
                        }]
                    })
                    setBottomSheetState(false);
                    setPending(false);

                } else {

                    console.log("Err", res.data);

                    setBottomSheetState(false);
                    setPending(false);

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

                this.setState({
                    loading: false,
                    showBottomSheet: false
                }, () => {
                    Toast.show({
                        type: 'error',
                        text1: 'Error occurred while uploading your selected file.',
                        text2: 'The attempt to upload your file failed as we encountered a random error while processing your request.',
                        visibilityTime: 4250,
                        position: "bottom"
                    });
                })
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

            setPending(true);

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

                    setUploadedPics(prevState => {
                        return [...prevState, {
                            [Number(prevState.length)]: file
                        }]
                    })
                    setBottomSheetState(false);
                    setPending(false);

                } else {
                    console.log("Err", res.data);

                    setBottomSheetState(false);
                    setPending(false);
                    
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

                setBottomSheetState(false);
                setPending(false);

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

    const confirmationDialog = () => {
        return (
            <Dialog.Container visible={confirmation}
                contentStyle={styles.dialogContainerStyleTwo}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.black18Bold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                        Are you sure you'd like to post this new 'freight availability listing'? This will activate your listing and it will now be live after posting!
                    </Text>
                    <View style={[styles.hrBlue, { marginBottom: 17.25 }]} />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setConfimationState(false)}
                            style={styles.cancelButtonStyleTwo}
                        >
                            <Text style={{ ...Fonts.black20Regular, color: "#fff" }}>No, Cancel.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                setConfimationState(false);

                                reformatAndAdd();
                            }}
                            style={styles.confirmationButtonStyleTwo}
                        >
                            <Text style={{ ...Fonts.white20Regular, color: "#fff" }}>Yes, Post Listing!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    const onReleaseRowHelper = (key, currentOrder) => {
        console.log("onReleaseRowHelper helper... (key, currentOrder):", key, currentOrder);

        updateScrollEnabledState(true);
    }
    const onActivateRow = (key) => {
        console.log("onActivateRow helper... (key):", key);

        updateScrollEnabledState(false);
    }
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
                setUploadedPics(newlyOrganizedArr);
            }
        });
    }
    
    const renderRow = useCallback(({ data, active, index }) => {
        // console.log("renderRow...:", data, active);
        return <Row uploaded={uploaded} index={index} calculateProperInt={calculateProperInt} setUploadedPics={setUploadedPics} data={data} active={active} />;
    }, []);

    const calculateProperInt = (int) => {
        switch (Number(int)) {
            case 0:
                return <Image resizeMode={"contain"} source={require("../../../../assets/images/icon/numbers/1.png")} style={styles.numericalImageIcon} />;
                break;
            case 1:
                return <Image resizeMode={"contain"} source={require("../../../../assets/images/icon/numbers/2.png")} style={styles.numericalImageIcon} />;
                break;
            case 2:
                return <Image resizeMode={"contain"} source={require("../../../../assets/images/icon/numbers/3.png")} style={styles.numericalImageIcon} />;
                break;
            case 3:
                return <Image resizeMode={"contain"} source={require("../../../../assets/images/icon/numbers/4.png")} style={styles.numericalImageIcon} />;
                break;
            case 4:
                return <Image resizeMode={"contain"} source={require("../../../../assets/images/icon/numbers/5.png")} style={styles.numericalImageIcon} />;
                break;
            case 5:
                return <Image resizeMode={"contain"} source={require("../../../../assets/images/icon/numbers/6.png")} style={styles.numericalImageIcon} />;
                break;
            case 6:
                return <Image resizeMode={"contain"} source={require("../../../../assets/images/icon/numbers/7.png")} style={styles.numericalImageIcon} />;
                break;
            case 7:
                return <Image resizeMode={"contain"} source={require("../../../../assets/images/icon/numbers/8.png")} style={styles.numericalImageIcon} />;
                break;
            case 8:
                return <Image resizeMode={"contain"} source={require("../../../../assets/images/icon/numbers/9.png")} style={styles.numericalImageIcon} />;
                break;
            default:
                break;
        }
    }

    const sortableListFooterRender = () => {

        const checkExistingUploadedPhotosDisabled = () => {
            if (typeof uploaded !== "undefined" && uploaded.length > 0) {
                return false;
            } else {
                return true;
            }
        }

        return (
            <Fragment>
                <View style={[styles.hrBlue, { left: 7.5, marginTop: 12.5, marginBottom: 12.5 }]} />
                <View style={styles.centeredContent}>
                    <TouchableOpacity onPress={() => setBottomSheetState(true)} style={styles.addPicturesButtonTouchable}>
                        <View style={styles.pictureRow}>
                            <Image source={require("../../../../assets/images/icon/list-space/camera.png")} style={styles.cameraTouchableImage} />
                            <Text style={styles.addPhotoText}>Select/Add Photo's</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.hrBlue, { left: 7.5, marginTop: 12.5, marginBottom: 32.5 }]} />
                <View style={styles.bottomWrapperContainer}>
                    <AwesomeButtonBlue style={styles.absoluteButtonBottom} disabled={checkExistingUploadedPhotosDisabled()} type={"secondary"} onPress={() => {
                        setConfimationState(true);
                    }} backgroundShadow={"black"} stretch={true}>Submit & Continue</AwesomeButtonBlue>
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
                                <Image source={require("../../../../assets/images/icon/list-space/broom.png")} style={styles.leftIconStyle} />
                            </View>
                            <View style={styles.rightMainStyle}>
                                <Text style={styles.titledHeaderText}>Fully document EACH & EVERY pallet being shipped</Text>
                                <Text style={styles.subbedText}>This is vital as some pallets vary in size and shippers usually/sometimes have other shipments from other companies that are ALSO being delivered which restricts the possible loadable load. Proper pictures help drivers/truckers be proactive & ready upon arrival!</Text>
                            </View>
                        </View>
                        <View style={[styles.hr, { left: 7.5, marginTop: 12.5, marginBottom: 12.5 }]} />
                        <View style={styles.topChunkWrapper}>
                            <View style={styles.leftIconStyleWrapper}>
                                <Image source={require("../../../../assets/images/icon/list-space/lighting.png")} style={styles.leftIconStyle} />
                            </View>
                            <View style={styles.rightMainStyle}>
                                <Text style={styles.titledHeaderText}>You CAN lump UP-TO 3 pallets PER picture/image to save some hassle</Text>
                                <Text style={styles.subbedText}>IF you have MANY items/pallets, we DO ALLOW our depot-contractors (you) to take pictures with up-to 3 pallets in EACH image. We value ALL of our user's time, work and energy which extends to BOTH freight-drivers AND our drop-off depot's (you)!</Text>
                            </View>
                        </View>
                    </Fragment>
                );
            } else {
                return (
                    <Fragment>
                        <View style={{ margin: 12.5 }}>
                            <Text style={styles.presentationText}>Your photos will appear in order from top to bottom - "drag to reorder" your images appropriately...</Text>
                            <View style={styles.centeredOnly}>
                                <View style={[styles.midSizedHr, { marginTop: 22.5, marginBottom: 27.5 }]} />
                            </View>
                        </View>
                    </Fragment>
                );
            }
        }
        return (
            <View style={styles.slightMargin}>
                <Text style={styles.titleTopText}>We will now need to <Text style={styles.underlineBoldTextBlack}>upload relevant images/photos</Text> depicting the freight or items you are having transported via our <Text style={styles.underlineBoldTextBlack}>internal freight transport service(s)</Text>.</Text>
                <Text style={styles.labelUnique}>Make sure to include relevant/vital information such as <Text style={styles.underlineBoldText}>properly</Text> capturing <Text style={styles.underlineBoldText}>each & every pallet</Text> that will be shipped. This may sound cumbersome if you have a large load or many items but this is <Text style={styles.underlineBoldText}>VITAL</Text> as our freight/transport drivers <Text style={styles.underlineBoldText}>have other shipments on the truck</Text> that also need to be considered before accepting the job, driving to your physical location amoung many other variables. <Text style={styles.underlineBoldText}>PLEASE</Text> respect your peers and take the time to <Text style={styles.underlineBoldText}>properly document your shipment items</Text> - we appreciate it!</Text>
                <View style={styles.thinishHR} />
                <View style={styles.wrapperMainTopContainer}>
                    <View style={[styles.hrBlue, { left: 7.5, marginTop: 1.25, marginBottom: 12.5 }]} />
                        <View style={styles.centeredContent}>
                            <TouchableOpacity onPress={() => setBottomSheetState(true)} style={styles.addPicturesButtonTouchable}>
                                <View style={styles.pictureRow}>
                                    <Image source={require("../../../../assets/images/icon/list-space/camera.png")} style={styles.cameraTouchableImage} />
                                    <Text style={styles.addPhotoText}>Select/Add Photo's</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    <View style={[styles.hrBlue, { left: 7.5, marginTop: 12.5, marginBottom: 22.5 }]} />
                    {renderMiddleJSXHelper()}
                </View>
            </View>
        );
    }

    console.log("uploaded uploaded uploaded:", uploaded, scrollEnabled);

    return (
        <ScrollView scrollEnabled={scrollEnabled} contentContainerStyle={styles.sortableContentContainerScroller}>
            {confirmationDialog()}
            {pending ? <ActivityIndicator size="large" style={styles.activity} color="#fff" /> : null}
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
        </ScrollView>
    );
}
const mapStateToProps = (state) => {
    if (typeof state.location.currentLoc !== "undefined" && typeof state.location.currentLoc !== "string") {
        try {
            const result = JSON.parse(JSON.parse(JSON.stringify(state.location.currentLoc)));
            return {
                authData: state.auth.data,
                location: result
            }
        } catch (err) {
            // 👇️ SyntaxError: Unexpected end of JSON input
            console.log('error', err);
            return {
                authData: state.auth.data,
                location: null
            }
        }
    } else {
        return {
            authData: state.auth.data,
            location: null
        }
    }
};
export default connect(mapStateToProps, { })(UploadImagesRelevantHelperImagesNewDeliveryPost);