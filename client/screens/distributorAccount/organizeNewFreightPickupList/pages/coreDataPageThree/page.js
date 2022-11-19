import React, { Fragment, useState, useRef, useMemo, useCallback, useEffect } from "react";
import stylesOne from "./pageStyles.js";
import stylesTwo from "./pageStylesTwo.js";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import { Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, Platform, ImageBackground, SafeAreaView, Animated, Easing } from "react-native";
import { Colors, Sizes, Fonts } from "../../../../../constants/styles.js";
import { connect } from "react-redux";
import axios from "axios";
import { BottomSheet } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { BASE_URL, BASE_ASSET_URL } from "@env";
import Toast from 'react-native-toast-message';
import _ from "lodash";
import SortableList from 'react-native-sortable-list';
import { updateFreightDetailsState } from "../../../../../redux/actions/requestFreightPickup/pickupDetails.js";


const styles = { ...stylesOne, ...stylesTwo };

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
                            <Image source={require("../../../../../assets/images/icon/close-100.png")} style={styles.closeIconImage} />
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

const PageThreeRequestNewFreightHelper = ({ updateMainState, freightData, authData, updateFreightDetailsState }) => {

    const [ showBottomSheet, setBottomSheetState ] = useState(false);
    const [ pending, setPending ] = useState(false);
    const [ scrollEnabled, updateScrollEnabledState ] = useState(true);
    const [ uploaded, setUploadedPics ] = useState([]);

    const renderHeaderLogicData = (str1, str2) => {
        return (
            <Fragment>
                <Text style={styles.titleTopText}>{str1}</Text>
                <Text style={styles.label}>{str2}</Text>
            </Fragment>
        );
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
                        <Image source={require("../../../../../assets/images/icon/camera.png")} style={styles.iconCustom} />
                        <Text style={{ ...Fonts.black16Medium, marginLeft: Sizes.fixPadding }}>
                            Camera
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleImageGalleryLaunch()} style={{ flexDirection: 'row', marginVertical: Sizes.fixPadding * 2.0 }}>
                        <Image source={require("../../../../../assets/images/icon/upload-64.png")} style={styles.iconCustom} />
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
                return <Image resizeMode={"contain"} source={require("../../../../../assets/images/icon/numbers/1.png")} style={styles.numericalImageIcon} />;
                break;
            case 1:
                return <Image resizeMode={"contain"} source={require("../../../../../assets/images/icon/numbers/2.png")} style={styles.numericalImageIcon} />;
                break;
            case 2:
                return <Image resizeMode={"contain"} source={require("../../../../../assets/images/icon/numbers/3.png")} style={styles.numericalImageIcon} />;
                break;
            case 3:
                return <Image resizeMode={"contain"} source={require("../../../../../assets/images/icon/numbers/4.png")} style={styles.numericalImageIcon} />;
                break;
            case 4:
                return <Image resizeMode={"contain"} source={require("../../../../../assets/images/icon/numbers/5.png")} style={styles.numericalImageIcon} />;
                break;
            case 5:
                return <Image resizeMode={"contain"} source={require("../../../../../assets/images/icon/numbers/6.png")} style={styles.numericalImageIcon} />;
                break;
            case 6:
                return <Image resizeMode={"contain"} source={require("../../../../../assets/images/icon/numbers/7.png")} style={styles.numericalImageIcon} />;
                break;
            case 7:
                return <Image resizeMode={"contain"} source={require("../../../../../assets/images/icon/numbers/8.png")} style={styles.numericalImageIcon} />;
                break;
            case 8:
                return <Image resizeMode={"contain"} source={require("../../../../../assets/images/icon/numbers/9.png")} style={styles.numericalImageIcon} />;
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
                            <Image source={require("../../../../../assets/images/icon/list-space/camera.png")} style={styles.cameraTouchableImage} />
                            <Text style={styles.addPhotoText}>Select/Add Photo's</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.hrBlue, { left: 7.5, marginTop: 12.5, marginBottom: 32.5 }]} />
                <View style={styles.bottomWrapperContainer}>
                    <AwesomeButtonBlue style={styles.absoluteButtonBottom} disabled={checkExistingUploadedPhotosDisabled()} type={"secondary"} onPress={() => handleFinalSubmissionChoice()} backgroundShadow={"black"} stretch={true}>Submit & Continue</AwesomeButtonBlue>
                    <View style={[styles.hrBlue, { left: 7.5, marginTop: 12.5, marginBottom: 10 }]} />
                    <AwesomeButtonBlue backgroundDarker={"#000"} backgroundColor={"#e60000"} style={styles.absoluteButtonBottom} type={"secondary"} onPress={() => {
                        updateMainState({ page: 1 });

                        updateFreightDetailsState({});
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
                                <Image source={require("../../../../../assets/images/icon/brown-crate.png")} style={styles.leftIconStyle} />
                            </View>
                            <View style={styles.rightMainStyle}>
                                <Text style={styles.titledHeaderText}>Accurately show the location</Text>
                                <Text style={styles.subbedText}>Accurately depict or show the palleted-tub's location area on your property</Text>
                            </View>
                        </View>
                        <View style={[styles.hr, { left: 7.5, marginTop: 12.5, marginBottom: 12.5 }]} />
                        <View style={styles.topChunkWrapper}>
                            <View style={styles.leftIconStyleWrapper}>
                                <Image source={require("../../../../../assets/images/icon/list-space/lighting.png")} style={styles.leftIconStyle} />
                            </View>
                            <View style={styles.rightMainStyle}>
                                <Text style={styles.titledHeaderText}>Size and lighting</Text>
                                <Text style={styles.subbedText}>Landscape (wide) photos are better than portrait (tall) photos. Do everything you can to make the space as bright as possible for better quality images/pictures.</Text>
                            </View>
                        </View>
                        <View style={[styles.hr, { left: 7.5, marginTop: 12.5, marginBottom: 12.5 }]} />
                        <View style={styles.topChunkWrapper}>
                            <View style={styles.leftIconStyleWrapper}>
                                <Image source={require("../../../../../assets/images/icon/list-space/box.png")} style={styles.leftIconStyle} />
                            </View>
                            <View style={styles.rightMainStyle}>
                                <Text style={styles.titledHeaderText}>Show key entry points for the delivery/pick-up driver</Text>
                                <Text style={styles.subbedText}>Try to note or capture any key details such as the gate entrance, the large tree where the bin/pallet is located, the door to knock on upon arriving, etc...</Text>
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
            <Fragment>
                {renderHeaderLogicData("Take some quality photo's of the load/shipment...", "Please take directional photo's accurately depicting where the load is, how to access it, the route to the load upon arrival & any other relevant/important details")}
                <View style={styles.wrapperMainTopContainer}>
                    <View style={[styles.hrBlue, { left: 7.5, marginTop: 1.25, marginBottom: 12.5 }]} />
                        <View style={styles.centeredContent}>
                            <TouchableOpacity onPress={() => setBottomSheetState(true)} style={styles.addPicturesButtonTouchable}>
                                <View style={styles.pictureRow}>
                                    <Image source={require("../../../../../assets/images/icon/list-space/camera.png")} style={styles.cameraTouchableImage} />
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

    const handleFinalSubmissionChoice = () => {
        console.log("handleFinalSubmissionChoice clicked/ran...");

        const newData = {
            ...freightData,
            relevantImagesOfFreight: uploaded,
            page: 5
        };

        updateFreightDetailsState(newData);

        setTimeout(() => {
            updateMainState({ page: 5 });
        },  725);
    }

    console.log("uploaded uploaded uploaded:", uploaded);

    return (
        <ScrollView scrollEnabled={scrollEnabled} contentContainerStyle={styles.sortableContentContainer}>
            {pending ? <ActivityIndicator size="large" style={styles.activity} color="#fff" /> : null}
            <View style={styles.spacerMain}>
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
            </View>
            {viewBottomSheet()}
        </ScrollView>
    );
}


const mapStateToProps = (state) => {
    return {
        location: state.location.currentLoc,
        freightData: state.freightPickupData.formData,
        authData: state.auth.data
    }
}
export default connect(mapStateToProps, { updateFreightDetailsState })(PageThreeRequestNewFreightHelper);