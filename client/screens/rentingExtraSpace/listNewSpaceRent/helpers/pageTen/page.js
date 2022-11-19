import React, { Fragment, useState, useRef, useMemo, useCallback, useEffect } from "react";
import stylesOne from "../pageStyles.js";
import stylesTwo from "../../startListingNewSpaceProcessStyles.js";
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

const RenderPageTenHelperData = ({ renderHeaderLogicData, storageData, authData, handleSubItemSelection }) => {

    const [ showBottomSheet, setBottomSheetState ] = useState(false);
    const [ pending, setPending ] = useState(false);
    const [ scrollEnabled, updateScrollEnabledState ] = useState(true);
    const [ uploaded, setUploadedPics ] = useState([]);

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
            handleSubItemSelection(9, 10, { uploadedRelatedImages: passedArrayValues })
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
                    <AwesomeButtonBlue style={styles.absoluteButtonBottom} disabled={checkExistingUploadedPhotosDisabled()} type={"secondary"} onPress={() => reformatAndAdd()} backgroundShadow={"black"} stretch={true}>Submit & Continue</AwesomeButtonBlue>
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
                                <Image source={require("../../../../../assets/images/icon/list-space/broom.png")} style={styles.leftIconStyle} />
                            </View>
                            <View style={styles.rightMainStyle}>
                                <Text style={styles.titledHeaderText}>Clean up the space</Text>
                                <Text style={styles.subbedText}>Before taking photos, clean the space and remove any clutter or distracting item's</Text>
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
                                <Text style={styles.titledHeaderText}>Show what it's like to move your electronics in</Text>
                                <Text style={styles.subbedText}>Try accurately capturing what it's like to move items into the physical space (driveway, gates, doors, stairs, etc...).</Text>
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
                {renderHeaderLogicData("Take some quality photos of your available space", "Photos are one of the first things a renter looks at before choosing who's the most reliable/reasonable renter assuring delivered electronics will be safe after a successful delivery - listings with 4 (four) photos are 74% more likely to be choosen/trusted by user's...")}
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

    console.log("uploaded uploaded uploaded:", uploaded);

    return (
        <ScrollView scrollEnabled={scrollEnabled} contentContainerStyle={styles.sortableContentContainer}>
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


export default RenderPageTenHelperData;