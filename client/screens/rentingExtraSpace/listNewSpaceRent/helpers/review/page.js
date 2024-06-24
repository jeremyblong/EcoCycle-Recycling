import React, { Fragment, useState, useEffect, useRef } from "react";
import stylesOne from "../pageStyles.js";
import stylesTwo from "../../startListingNewSpaceProcessStyles.js";
import {
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
  } from 'react-native';
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import { Colors, Sizes, Fonts } from "../../../../../constants/styles.js";
import RNPickerSelect from 'react-native-picker-select';
import WavyHeaderTopperHelper from "./helpers/wavySvgHeaderHelper.js";
import { ListItem, Avatar } from "@rneui/themed";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import customMapStyle from "../../../../../component/JSONStyles/mapStyle.js";
import ViewMoreText from 'react-native-view-more-text';
import { SliderBox } from "react-native-image-slider-box";
import { BASE_ASSET_URL, BASE_URL } from "@env";
import Toast from 'react-native-toast-message';
import axios from "axios";
import Dialog from "react-native-dialog";
import RBSheet from "react-native-raw-bottom-sheet";
import SheetPaneModificationPaneHelper from "./helpers/paneSheet/pane.js";
import { useNavigation } from "@react-navigation/native";
import { saveUpdatePreviousLocationDetailsDropoff } from "../../../../../redux/actions/storageDropoffRelated/storageRelatedUpdates.js";
import { connect } from "react-redux";
import _ from "lodash";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const { width, height } = Dimensions.get("window");  

const typeListOptions = [
    {
        name: 'Climate Controlled',
        image: require("../../../../../assets/images/icon/list-space/temperature-controlled.png"),
        subtitle: 'Temperature regulated and protected from outside conditions (such as humidity and rain)'
    },
    {
        name: 'Private Entrance',
        image: require("../../../../../assets/images/icon/list-space/private-entrance.png"),
        subtitle: "Accessible through a sperate entrance. Renters don't have to walk through someone's home to access the space"
    },
    {
        name: 'Private Space',
        image: require("../../../../../assets/images/icon/list-space/private-1.png"),
        subtitle: 'Not shared with other renters'
    },
    {
        name: 'Locked/Secure Area',
        image: require("../../../../../assets/images/icon/list-space/locked.png"),
        subtitle: 'Protected by a system, key or access code to enter'
    },
    {
        name: 'Pet Free',
        image: require("../../../../../assets/images/icon/list-space/animals-restricted.png"),
        subtitle: 'Free from any pets or animals (animals can be present but are properly secured: Crate, closed room far away, backyard, etc...)'
    },
    {
        name: 'Security Camera Monitored',
        image: require("../../../../../assets/images/icon/list-space/security-system.png"),
        subtitle: 'Monitored by security camera(s) through a legitmate system with emergency response capability'
    },
    {
        name: 'No Stairs',
        image: require("../../../../../assets/images/icon/list-space/staircase.png"),
        subtitle: 'Accessibe without the use of stairs or climbing'
    },
];

const styles = { ...stylesOne, ...stylesTwo };

const selectableItems = [
    { label: 'Type Of Space (2 Part)', value: 0 },
    { label: 'Features Of Your Space', value: 1 },
    { label: 'Address Selection/Detail(s)', value: 2 },
    { label: "Residential Or Commercial", value: 3 },
    { label: "Exact Geo/Pin Location", value: 4 },
    { label: "Detailed Description", value: 5 },
    { label: "Size Specifications", value: 6 },
    { label: "Availability Or Contact-Rule's", value: 7 },
    { label: "Welcome Message/Text", value: 8 },
    { label: "Photo's Of Space (Images)", value: 9 }
];

const RenderFinalReviewPostPage = ({ renderHeaderLogicData, storageData, saveUpdatePreviousLocationDetailsDropoff, authData, pageToEdit, setCurrentEditingPage, totalNumPages, valuesToDeconstruct }) => {

    const sheetRefModifications = useRef(null);

    const navigation = useNavigation();

    const { dropoffLocationData, environmentBuildingType, environmentalConditions, mainCategory, preciseMarkerCoords, spaceMeasurementsDimensionsFeet, subCategory, uploadedRelatedImages, welcomeMessage, contactRequiredOrNot, description } = storageData;

    console.log("uploadedRelatedImages", uploadedRelatedImages);

    const [ uploadedSelectedImages, setUploadedSelectedImagesState ] = useState([]);
    const [ confirmationBox, setConfirmationBox ] = useState(false);
    const [ pendingState, setPendingState ] = useState(false);

    useEffect(() => {

        if (typeof uploadedRelatedImages !== "undefined" && uploadedRelatedImages.length > 0) {

            const reformedArr = [];

            for (let idxxxxx = 0; idxxxxx < uploadedRelatedImages.length; idxxxxx++) {
                const imageObj = Object.values(uploadedRelatedImages[idxxxxx])[0];
    
                reformedArr.push(`${BASE_ASSET_URL}/${imageObj.link}`);
    
                if ((uploadedRelatedImages.length - 1) === idxxxxx) {
                    setUploadedSelectedImagesState(reformedArr);
                }
            } 
        }
    }, [])

    const handleFinalSubmisison = () => {
        console.log("handleFinalSubmisison clicked/ran...");

        const intervalHelperFunction = () => {
            setPendingState(false);
        }

        const timeoutID = setTimeout(intervalHelperFunction, 8750);

        const config = {
            storageData,
            signedinUserID: authData.uniqueId,
            postedByName: `${authData.firstName} ${authData.lastName}`,
            postedByUsername: authData.username
        };

        axios.post(`${BASE_URL}/post/new/available/space/dropoffs/ewaste`, config).then((res) => {
            if (res.data.message === "Submitted & posted successfully!") {
                console.log(res.data);

                clearTimeout(timeoutID);

                Toast.show({
                    type: 'success',
                    text1: `Successfully POSTED your available space!`,
                    text2: `We've successfully posted your available space for people to dropoff electronic e-waste, your listing is now LIVE!`,
                    visibilityTime: 2750,
                    position: "bottom",
                    onHide: () => {
                        // close activity indicator
                        setPendingState(false);
                        // navigate after successful request to DB
                        navigation.replace('BottomTabScreen', { index: 1 });
                        
                        setTimeout(() => {
                            saveUpdatePreviousLocationDetailsDropoff({});
                        },  750);
                    }
                });
            } else {
                clearTimeout(timeoutID);
                // close activity indicator
                setPendingState(false);

                Toast.show({
                    type: 'error',
                    text1: `An error occurred while attempting to submit your space!`,
                    text2: `We've encountered an error while attempting to submit your new space for drop-off's, please try this action again or contact support if the problem persists...`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
            }
        }).catch((err) => {
            clearTimeout(timeoutID);
            // close activity indicator
            setPendingState(false);

            Toast.show({
                type: 'error',
                text1: `An error occurred while attempting to submit your space!`,
                text2: `We've encountered an error while attempting to submit your new space for drop-off's, please try this action again or contact support if the problem persists...`,
                visibilityTime: 4250,
                position: "bottom"
            });
        })
    }

    const renderFooterHelper = () => {
        return (
            <Fragment>
                <View style={styles.bottomWrapperContainer}>
                    <AwesomeButtonBlue style={styles.absoluteButtonBottom} type={"secondary"} onPress={() => setConfirmationBox(true)} backgroundShadow={"black"} stretch={true}>Submit & POST!</AwesomeButtonBlue>
                </View>
            </Fragment>
        );
    }
    const renderParallaxForegroundHelper = (tagName) => {
        return (
            <Fragment>
                <View style={styles.selectableWrapper}>
                    <Text style={styles.selectableLabel}>If you'd like to make a change/edit, select the page you'd like to re-direct to...</Text>
                    <View style={styles.selectablePickerWrapperStyles}>
                        <RNPickerSelect
                            placeholderTextColor={"black"}
                            onValueChange={handlePageRedirectModification}
                            placeholder={{ label: "Select a page to edit/modify (redirect)..." }}
                            items={selectableItems}
                        />
                    </View>
                </View>
            </Fragment>
        );
    }

    const renderHeaderHelper = () => {
        return (
            <Fragment>
                <View style={[styles.hrBlueThicker, { marginBottom: 22.5, marginTop: 12.5 }]} />
                <View style={styles.toppedWrapperContainer}>
                    {renderHeaderLogicData("Time to review your data & post your space for drop-offs!", "We will now need to make sure your information is correct and then post your storage space for our user's to start organizing electronic drop-offs immediately...")}
                </View>
                <View style={[styles.hrBlueThicker, { marginBottom: 27.5, marginTop: 10 }]} />
            </Fragment>
        );
    }

    const handlePageRedirectModification = (selectedValue) => {
        // check to make sure its working - log for validation/check
        console.log("handlePageRedirectModification clicked/ran.", selectedValue);
        // set the page to modify...
        setCurrentEditingPage(selectedValue);
        // delay the opening of the sheet helper pane
        setTimeout(() => {
            sheetRefModifications.current.open();
        }, 625);
    }

    const calculateApproriateImageRender = (currentValue) => {
        const { name, value } = currentValue;

        const matchingIteration = typeListOptions.findIndex(item => (item.name === name && item.value === value));

        return <Avatar source={typeListOptions[matchingIteration].image} />;
    }
    const confirmationDialog = () => {
        return (
            <Dialog.Container visible={confirmationBox}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.black18Bold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                        Are you happy with the data & ready to post your new storage listing?!
                    </Text>
                    <View style={styles.outterInnerWrapper}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setConfirmationBox(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black20Regular, color: "#fff" }}>No, Cancel.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {

                                setConfirmationBox(false);

                                setTimeout(() => {
                                    setPendingState(true);
                                    
                                    handleFinalSubmisison();
                                },  375);
                            }}
                            style={styles.confirmationButtonStyle}
                        >
                            <Text style={{ ...Fonts.white20Regular, color: "#fff" }}>Yes, Post!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    const renderViewMore = (onPress) => {
        return (
            <Text style={styles.showMoreOrLess} onPress={onPress}>View more</Text>
        )
    }
    const renderViewLess = (onPress) => {
        return (
            <Text style={styles.showMoreOrLess} onPress={onPress}>View less</Text>
        )
    }
    const renderContentBasedOnAvailableData = () => {
        if (!_.isEmpty(storageData) && typeof mainCategory.name !== "undefined" && mainCategory.name !== null) {
            return (
                <Fragment>
                    <View style={{ flex: 1 }}>
                        <ScrollView 
                            style={styles.notificationList}
                            ListHeaderComponent={renderHeaderHelper}
                            contentContainerStyle={{ flexGrow: 1 }}
                        >
                            <View style={styles.scrollerInnerViewWrapper}>
                                <View style={[styles.hrBlueThicker, { marginTop: 17.5, marginBottom: 22.5 }]} />
                                {renderFooterHelper()}
                                <View style={[styles.hrBlueThicker, { marginTop: 12.5, marginBottom: 12.5 }]} />
                                <View style={styles.addOnlyBorderExterior}>
                                    <View style={[styles.cardFinalPage, { borderColor: Colors.secondaryColor }]}>
                                        <WavyHeaderTopperHelper dString={"M0,160L6.9,176C13.7,192,27,224,41,229.3C54.9,235,69,213,82,213.3C96,213,110,235,123,234.7C137.1,235,151,213,165,186.7C178.3,160,192,128,206,112C219.4,96,233,96,247,122.7C260.6,149,274,203,288,202.7C301.7,203,315,149,329,144C342.9,139,357,181,370,181.3C384,181,398,139,411,144C425.1,149,439,203,453,218.7C466.3,235,480,213,494,197.3C507.4,181,521,171,535,181.3C548.6,192,562,224,576,245.3C589.7,267,603,277,617,256C630.9,235,645,181,658,154.7C672,128,686,128,699,117.3C713.1,107,727,85,741,101.3C754.3,117,768,171,782,160C795.4,149,809,75,823,48C836.6,21,850,43,864,80C877.7,117,891,171,905,165.3C918.9,160,933,96,946,69.3C960,43,974,53,987,80C1001.1,107,1015,149,1029,165.3C1042.3,181,1056,171,1070,186.7C1083.4,203,1097,245,1111,224C1124.6,203,1138,117,1152,122.7C1165.7,128,1179,224,1193,224C1206.9,224,1221,128,1234,96C1248,64,1262,96,1275,128C1289.1,160,1303,192,1317,192C1330.3,192,1344,160,1358,170.7C1371.4,181,1385,235,1399,245.3C1412.6,256,1426,224,1433,208L1440,192L1440,0L1433.1,0C1426.3,0,1413,0,1399,0C1385.1,0,1371,0,1358,0C1344,0,1330,0,1317,0C1302.9,0,1289,0,1275,0C1261.7,0,1248,0,1234,0C1220.6,0,1207,0,1193,0C1179.4,0,1166,0,1152,0C1138.3,0,1125,0,1111,0C1097.1,0,1083,0,1070,0C1056,0,1042,0,1029,0C1014.9,0,1001,0,987,0C973.7,0,960,0,946,0C932.6,0,919,0,905,0C891.4,0,878,0,864,0C850.3,0,837,0,823,0C809.1,0,795,0,782,0C768,0,754,0,741,0C726.9,0,713,0,699,0C685.7,0,672,0,658,0C644.6,0,631,0,617,0C603.4,0,590,0,576,0C562.3,0,549,0,535,0C521.1,0,507,0,494,0C480,0,466,0,453,0C438.9,0,425,0,411,0C397.7,0,384,0,370,0C356.6,0,343,0,329,0C315.4,0,302,0,288,0C274.3,0,261,0,247,0C233.1,0,219,0,206,0C192,0,178,0,165,0C150.9,0,137,0,123,0C109.7,0,96,0,82,0C68.6,0,55,0,41,0C27.4,0,14,0,7,0L0,0Z"} customStyles={styles.svgCurve} />
                                        <View style={styles.cardContentFinalPage}>
                                            <Image style={[styles.imageFinalPage, styles.imageContentFinalPage]} source={require("../../../../../assets/images/icon/numbers/1.png")}/>
                                            <Text style={styles.nameFinalPage}>{selectableItems[0].label}</Text>
                                        </View>
                                        <View style={styles.cardContentFinalPageLower}> 
                                            <View style={styles.columnizedCol}>
                                                <Text style={styles.topTextLabeled}>{mainCategory.name}</Text>
                                                <Text style={styles.topTextLoweredLabeled}>{mainCategory.subtitle}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.hrBlueThicker, { marginTop: 4.5, marginBottom: 4.5 }]} />
                                <View style={styles.addOnlyBorderExterior}>
                                    <View style={[styles.cardFinalPage, { borderColor: Colors.blackColor }]}>
                                        <WavyHeaderTopperHelper dString={"M0,96L7.3,80C14.5,64,29,32,44,32C58.2,32,73,64,87,69.3C101.8,75,116,53,131,53.3C145.5,53,160,75,175,74.7C189.1,75,204,53,218,37.3C232.7,21,247,11,262,48C276.4,85,291,171,305,208C320,245,335,235,349,208C363.6,181,378,139,393,122.7C407.3,107,422,117,436,154.7C450.9,192,465,256,480,240C494.5,224,509,128,524,96C538.2,64,553,96,567,112C581.8,128,596,128,611,149.3C625.5,171,640,213,655,208C669.1,203,684,149,698,128C712.7,107,727,117,742,112C756.4,107,771,85,785,101.3C800,117,815,171,829,170.7C843.6,171,858,117,873,96C887.3,75,902,85,916,80C930.9,75,945,53,960,48C974.5,43,989,53,1004,101.3C1018.2,149,1033,235,1047,277.3C1061.8,320,1076,320,1091,293.3C1105.5,267,1120,213,1135,202.7C1149.1,192,1164,224,1178,224C1192.7,224,1207,192,1222,154.7C1236.4,117,1251,75,1265,101.3C1280,128,1295,224,1309,261.3C1323.6,299,1338,277,1353,256C1367.3,235,1382,213,1396,202.7C1410.9,192,1425,192,1433,192L1440,192L1440,0L1432.7,0C1425.5,0,1411,0,1396,0C1381.8,0,1367,0,1353,0C1338.2,0,1324,0,1309,0C1294.5,0,1280,0,1265,0C1250.9,0,1236,0,1222,0C1207.3,0,1193,0,1178,0C1163.6,0,1149,0,1135,0C1120,0,1105,0,1091,0C1076.4,0,1062,0,1047,0C1032.7,0,1018,0,1004,0C989.1,0,975,0,960,0C945.5,0,931,0,916,0C901.8,0,887,0,873,0C858.2,0,844,0,829,0C814.5,0,800,0,785,0C770.9,0,756,0,742,0C727.3,0,713,0,698,0C683.6,0,669,0,655,0C640,0,625,0,611,0C596.4,0,582,0,567,0C552.7,0,538,0,524,0C509.1,0,495,0,480,0C465.5,0,451,0,436,0C421.8,0,407,0,393,0C378.2,0,364,0,349,0C334.5,0,320,0,305,0C290.9,0,276,0,262,0C247.3,0,233,0,218,0C203.6,0,189,0,175,0C160,0,145,0,131,0C116.4,0,102,0,87,0C72.7,0,58,0,44,0C29.1,0,15,0,7,0L0,0Z"} customStyles={styles.svgCurve} />
                                        <View style={styles.cardContentFinalPage}>
                                            <Image style={[styles.imageFinalPage, styles.imageContentFinalPage]} source={require("../../../../../assets/images/icon/numbers/2.png")}/>
                                            <Text style={styles.nameFinalPage}>{selectableItems[1].label}</Text>
                                        </View>
                                        <View style={styles.cardContentFinalPageLower}>
                                            <View style={styles.columnizedCol}>
                                                {environmentalConditions.map((condition, index) => {
                                                    return (
                                                        <Fragment key={index}>                    
                                                            <ListItem style={styles.listeditemSelectedPresentation}>
                                                                {calculateApproriateImageRender(condition)}
                                                                <ListItem.Content>
                                                                    <ListItem.Title style={styles.breakerSection}>{condition.name}</ListItem.Title>
                                                                    <ListItem.Subtitle>{condition.subtitle}</ListItem.Subtitle>
                                                                </ListItem.Content>
                                                            </ListItem>
                                                        </Fragment>
                                                    );
                                                })}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.hrBlueThicker, { marginTop: 4.5, marginBottom: 4.5 }]} />
                                <View style={styles.addOnlyBorderExterior}>
                                    <View style={[styles.cardFinalPage, { borderColor: Colors.greenColor }]}>
                                        <WavyHeaderTopperHelper dString={"M0,160L6.9,154.7C13.7,149,27,139,41,138.7C54.9,139,69,149,82,170.7C96,192,110,224,123,234.7C137.1,245,151,235,165,240C178.3,245,192,267,206,234.7C219.4,203,233,117,247,80C260.6,43,274,53,288,74.7C301.7,96,315,128,329,165.3C342.9,203,357,245,370,250.7C384,256,398,224,411,224C425.1,224,439,256,453,261.3C466.3,267,480,245,494,240C507.4,235,521,245,535,250.7C548.6,256,562,256,576,261.3C589.7,267,603,277,617,245.3C630.9,213,645,139,658,133.3C672,128,686,192,699,202.7C713.1,213,727,171,741,165.3C754.3,160,768,192,782,208C795.4,224,809,224,823,202.7C836.6,181,850,139,864,106.7C877.7,75,891,53,905,80C918.9,107,933,181,946,176C960,171,974,85,987,48C1001.1,11,1015,21,1029,64C1042.3,107,1056,181,1070,218.7C1083.4,256,1097,256,1111,245.3C1124.6,235,1138,213,1152,208C1165.7,203,1179,213,1193,186.7C1206.9,160,1221,96,1234,85.3C1248,75,1262,117,1275,117.3C1289.1,117,1303,75,1317,85.3C1330.3,96,1344,160,1358,202.7C1371.4,245,1385,267,1399,250.7C1412.6,235,1426,181,1433,154.7L1440,128L1440,0L1433.1,0C1426.3,0,1413,0,1399,0C1385.1,0,1371,0,1358,0C1344,0,1330,0,1317,0C1302.9,0,1289,0,1275,0C1261.7,0,1248,0,1234,0C1220.6,0,1207,0,1193,0C1179.4,0,1166,0,1152,0C1138.3,0,1125,0,1111,0C1097.1,0,1083,0,1070,0C1056,0,1042,0,1029,0C1014.9,0,1001,0,987,0C973.7,0,960,0,946,0C932.6,0,919,0,905,0C891.4,0,878,0,864,0C850.3,0,837,0,823,0C809.1,0,795,0,782,0C768,0,754,0,741,0C726.9,0,713,0,699,0C685.7,0,672,0,658,0C644.6,0,631,0,617,0C603.4,0,590,0,576,0C562.3,0,549,0,535,0C521.1,0,507,0,494,0C480,0,466,0,453,0C438.9,0,425,0,411,0C397.7,0,384,0,370,0C356.6,0,343,0,329,0C315.4,0,302,0,288,0C274.3,0,261,0,247,0C233.1,0,219,0,206,0C192,0,178,0,165,0C150.9,0,137,0,123,0C109.7,0,96,0,82,0C68.6,0,55,0,41,0C27.4,0,14,0,7,0L0,0Z"} customStyles={styles.svgCurve} />
                                        <View style={styles.cardContentFinalPage}>
                                            <Image style={[styles.imageFinalPage, styles.imageContentFinalPage]} source={require("../../../../../assets/images/icon/numbers/3.png")}/>
                                            <Text style={[styles.nameFinalPage, { left: -(width * 0.069) }]}>{selectableItems[2].label}</Text>
                                        </View>
                                        <View style={styles.cardContentFinalPageLower}>
                                            <View style={styles.columnizedCol}>
                                                <MapView
                                                    rotateEnabled={false}
                                                    zoomControlEnabled={false}
                                                    zoomEnabled={false}
                                                    scrollEnabled={false}
                                                    pitchEnabled={false}
                                                    customMapStyle={customMapStyle}
                                                    region={dropoffLocationData}
                                                    style={styles.previewMapDisplay}
                                                    provider={PROVIDER_GOOGLE}
                                                >
                                                    <Marker
                                                        draggable={false}
                                                        coordinate={dropoffLocationData}
                                                        position={dropoffLocationData}
                                                        pinColor={Colors.secondaryColor}
                                                    />   
                                                </MapView>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.hrBlueThicker, { marginTop: 4.5, marginBottom: 4.5 }]} />
                                <View style={styles.addOnlyBorderExterior}>
                                    <View style={[styles.cardFinalPage, { borderColor: Colors.darkerBlue }]}>
                                        <WavyHeaderTopperHelper dString={"M0,128L6.9,128C13.7,128,27,128,41,154.7C54.9,181,69,235,82,240C96,245,110,203,123,181.3C137.1,160,151,160,165,138.7C178.3,117,192,75,206,96C219.4,117,233,203,247,234.7C260.6,267,274,245,288,250.7C301.7,256,315,288,329,266.7C342.9,245,357,171,370,154.7C384,139,398,181,411,165.3C425.1,149,439,75,453,42.7C466.3,11,480,21,494,69.3C507.4,117,521,203,535,208C548.6,213,562,139,576,112C589.7,85,603,107,617,101.3C630.9,96,645,64,658,48C672,32,686,32,699,32C713.1,32,727,32,741,37.3C754.3,43,768,53,782,90.7C795.4,128,809,192,823,192C836.6,192,850,128,864,96C877.7,64,891,64,905,74.7C918.9,85,933,107,946,138.7C960,171,974,213,987,213.3C1001.1,213,1015,171,1029,149.3C1042.3,128,1056,128,1070,117.3C1083.4,107,1097,85,1111,90.7C1124.6,96,1138,128,1152,128C1165.7,128,1179,96,1193,112C1206.9,128,1221,192,1234,224C1248,256,1262,256,1275,213.3C1289.1,171,1303,85,1317,80C1330.3,75,1344,149,1358,197.3C1371.4,245,1385,267,1399,277.3C1412.6,288,1426,288,1433,288L1440,288L1440,0L1433.1,0C1426.3,0,1413,0,1399,0C1385.1,0,1371,0,1358,0C1344,0,1330,0,1317,0C1302.9,0,1289,0,1275,0C1261.7,0,1248,0,1234,0C1220.6,0,1207,0,1193,0C1179.4,0,1166,0,1152,0C1138.3,0,1125,0,1111,0C1097.1,0,1083,0,1070,0C1056,0,1042,0,1029,0C1014.9,0,1001,0,987,0C973.7,0,960,0,946,0C932.6,0,919,0,905,0C891.4,0,878,0,864,0C850.3,0,837,0,823,0C809.1,0,795,0,782,0C768,0,754,0,741,0C726.9,0,713,0,699,0C685.7,0,672,0,658,0C644.6,0,631,0,617,0C603.4,0,590,0,576,0C562.3,0,549,0,535,0C521.1,0,507,0,494,0C480,0,466,0,453,0C438.9,0,425,0,411,0C397.7,0,384,0,370,0C356.6,0,343,0,329,0C315.4,0,302,0,288,0C274.3,0,261,0,247,0C233.1,0,219,0,206,0C192,0,178,0,165,0C150.9,0,137,0,123,0C109.7,0,96,0,82,0C68.6,0,55,0,41,0C27.4,0,14,0,7,0L0,0Z"} customStyles={styles.svgCurve} />
                                        <View style={styles.cardContentFinalPage}>
                                            <Image style={[styles.imageFinalPage, styles.imageContentFinalPage]} source={require("../../../../../assets/images/icon/numbers/4.png")}/>
                                            <Text style={[styles.nameFinalPage, { left: -(width * 0.069) }]}>{selectableItems[3].label}</Text>
                                        </View>
                                        <View style={styles.cardContentFinalPageLower}> 
                                            <View style={styles.columnizedCol}>
                                                <Text style={styles.topTextLabeled}>{environmentBuildingType.name}</Text>
                                                <Text style={styles.topTextLoweredLabeled}>{environmentBuildingType.subtitle}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.hrBlueThicker, { marginTop: 4.5, marginBottom: 4.5 }]} />
                                <View style={styles.addOnlyBorderExterior}>
                                    <View style={[styles.cardFinalPage, { borderColor: Colors.whiteColor }]}>
                                        <WavyHeaderTopperHelper dString={"M0,32L6.9,53.3C13.7,75,27,117,41,112C54.9,107,69,53,82,64C96,75,110,149,123,197.3C137.1,245,151,267,165,272C178.3,277,192,267,206,245.3C219.4,224,233,192,247,160C260.6,128,274,96,288,74.7C301.7,53,315,43,329,64C342.9,85,357,139,370,165.3C384,192,398,192,411,186.7C425.1,181,439,171,453,181.3C466.3,192,480,224,494,234.7C507.4,245,521,235,535,213.3C548.6,192,562,160,576,138.7C589.7,117,603,107,617,122.7C630.9,139,645,181,658,186.7C672,192,686,160,699,154.7C713.1,149,727,171,741,165.3C754.3,160,768,128,782,112C795.4,96,809,96,823,80C836.6,64,850,32,864,26.7C877.7,21,891,43,905,85.3C918.9,128,933,192,946,224C960,256,974,256,987,266.7C1001.1,277,1015,299,1029,272C1042.3,245,1056,171,1070,160C1083.4,149,1097,203,1111,192C1124.6,181,1138,107,1152,74.7C1165.7,43,1179,53,1193,48C1206.9,43,1221,21,1234,48C1248,75,1262,149,1275,154.7C1289.1,160,1303,96,1317,80C1330.3,64,1344,96,1358,138.7C1371.4,181,1385,235,1399,256C1412.6,277,1426,267,1433,261.3L1440,256L1440,0L1433.1,0C1426.3,0,1413,0,1399,0C1385.1,0,1371,0,1358,0C1344,0,1330,0,1317,0C1302.9,0,1289,0,1275,0C1261.7,0,1248,0,1234,0C1220.6,0,1207,0,1193,0C1179.4,0,1166,0,1152,0C1138.3,0,1125,0,1111,0C1097.1,0,1083,0,1070,0C1056,0,1042,0,1029,0C1014.9,0,1001,0,987,0C973.7,0,960,0,946,0C932.6,0,919,0,905,0C891.4,0,878,0,864,0C850.3,0,837,0,823,0C809.1,0,795,0,782,0C768,0,754,0,741,0C726.9,0,713,0,699,0C685.7,0,672,0,658,0C644.6,0,631,0,617,0C603.4,0,590,0,576,0C562.3,0,549,0,535,0C521.1,0,507,0,494,0C480,0,466,0,453,0C438.9,0,425,0,411,0C397.7,0,384,0,370,0C356.6,0,343,0,329,0C315.4,0,302,0,288,0C274.3,0,261,0,247,0C233.1,0,219,0,206,0C192,0,178,0,165,0C150.9,0,137,0,123,0C109.7,0,96,0,82,0C68.6,0,55,0,41,0C27.4,0,14,0,7,0L0,0Z"} customStyles={styles.svgCurve} />
                                        <View style={styles.cardContentFinalPage}>
                                            <Image style={[styles.imageFinalPage, styles.imageContentFinalPage]} source={require("../../../../../assets/images/icon/numbers/5.png")}/>
                                            <Text style={[styles.nameFinalPage, { left: -(width * 0.069) }]}>{selectableItems[4].label}</Text>
                                        </View>
                                        <View style={styles.cardContentFinalPageLower}> 
                                            <View style={styles.columnizedCol}>
                                                <MapView
                                                    rotateEnabled={false}
                                                    zoomControlEnabled={false}
                                                    zoomEnabled={false}
                                                    scrollEnabled={false}
                                                    pitchEnabled={false}
                                                    customMapStyle={customMapStyle}
                                                    region={preciseMarkerCoords}
                                                    style={styles.previewMapDisplay}
                                                    provider={PROVIDER_GOOGLE}
                                                >
                                                    <Marker
                                                        draggable={false}
                                                        coordinate={preciseMarkerCoords}
                                                        position={preciseMarkerCoords}
                                                        pinColor={Colors.secondaryColor}
                                                    />   
                                                </MapView>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.hrBlueThicker, { marginTop: 4.5, marginBottom: 4.5 }]} />
                                <View style={styles.addOnlyBorderExterior}>
                                    <View style={[styles.cardFinalPage, { borderColor: Colors.primaryColorBright }]}>
                                        <WavyHeaderTopperHelper dString={"M0,128L6.9,128C13.7,128,27,128,41,154.7C54.9,181,69,235,82,240C96,245,110,203,123,181.3C137.1,160,151,160,165,138.7C178.3,117,192,75,206,96C219.4,117,233,203,247,234.7C260.6,267,274,245,288,250.7C301.7,256,315,288,329,266.7C342.9,245,357,171,370,154.7C384,139,398,181,411,165.3C425.1,149,439,75,453,42.7C466.3,11,480,21,494,69.3C507.4,117,521,203,535,208C548.6,213,562,139,576,112C589.7,85,603,107,617,101.3C630.9,96,645,64,658,48C672,32,686,32,699,32C713.1,32,727,32,741,37.3C754.3,43,768,53,782,90.7C795.4,128,809,192,823,192C836.6,192,850,128,864,96C877.7,64,891,64,905,74.7C918.9,85,933,107,946,138.7C960,171,974,213,987,213.3C1001.1,213,1015,171,1029,149.3C1042.3,128,1056,128,1070,117.3C1083.4,107,1097,85,1111,90.7C1124.6,96,1138,128,1152,128C1165.7,128,1179,96,1193,112C1206.9,128,1221,192,1234,224C1248,256,1262,256,1275,213.3C1289.1,171,1303,85,1317,80C1330.3,75,1344,149,1358,197.3C1371.4,245,1385,267,1399,277.3C1412.6,288,1426,288,1433,288L1440,288L1440,0L1433.1,0C1426.3,0,1413,0,1399,0C1385.1,0,1371,0,1358,0C1344,0,1330,0,1317,0C1302.9,0,1289,0,1275,0C1261.7,0,1248,0,1234,0C1220.6,0,1207,0,1193,0C1179.4,0,1166,0,1152,0C1138.3,0,1125,0,1111,0C1097.1,0,1083,0,1070,0C1056,0,1042,0,1029,0C1014.9,0,1001,0,987,0C973.7,0,960,0,946,0C932.6,0,919,0,905,0C891.4,0,878,0,864,0C850.3,0,837,0,823,0C809.1,0,795,0,782,0C768,0,754,0,741,0C726.9,0,713,0,699,0C685.7,0,672,0,658,0C644.6,0,631,0,617,0C603.4,0,590,0,576,0C562.3,0,549,0,535,0C521.1,0,507,0,494,0C480,0,466,0,453,0C438.9,0,425,0,411,0C397.7,0,384,0,370,0C356.6,0,343,0,329,0C315.4,0,302,0,288,0C274.3,0,261,0,247,0C233.1,0,219,0,206,0C192,0,178,0,165,0C150.9,0,137,0,123,0C109.7,0,96,0,82,0C68.6,0,55,0,41,0C27.4,0,14,0,7,0L0,0Z"} customStyles={styles.svgCurve} />
                                        <View style={styles.cardContentFinalPage}>
                                            <Image style={[styles.imageFinalPage, styles.imageContentFinalPage]} source={require("../../../../../assets/images/icon/numbers/6.png")}/>
                                            <Text style={[styles.nameFinalPage, { left: -(width * 0.069) }]}>{selectableItems[5].label}</Text>
                                        </View>
                                        <View style={styles.cardContentFinalPageLower}> 
                                            <View style={styles.columnizedCol}>
                                                <ViewMoreText
                                                    numberOfLines={3}
                                                    renderViewMore={renderViewMore}
                                                    renderViewLess={renderViewLess}
                                                    textStyle={styles.topTextLoweredLabeled}
                                                >
                                                    <Text>{description}</Text>
                                                </ViewMoreText>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.hrBlueThicker, { marginTop: 4.5, marginBottom: 4.5 }]} />
                                <View style={styles.addOnlyBorderExterior}>
                                    <View style={[styles.cardFinalPage, { borderColor: Colors.greenColor }]}>
                                        <WavyHeaderTopperHelper dString={"M0,288L6.9,282.7C13.7,277,27,267,41,229.3C54.9,192,69,128,82,101.3C96,75,110,85,123,96C137.1,107,151,117,165,117.3C178.3,117,192,107,206,101.3C219.4,96,233,96,247,117.3C260.6,139,274,181,288,208C301.7,235,315,245,329,218.7C342.9,192,357,128,370,112C384,96,398,128,411,160C425.1,192,439,224,453,197.3C466.3,171,480,85,494,74.7C507.4,64,521,128,535,149.3C548.6,171,562,149,576,122.7C589.7,96,603,64,617,69.3C630.9,75,645,117,658,122.7C672,128,686,96,699,74.7C713.1,53,727,43,741,48C754.3,53,768,75,782,101.3C795.4,128,809,160,823,149.3C836.6,139,850,85,864,74.7C877.7,64,891,96,905,138.7C918.9,181,933,235,946,256C960,277,974,267,987,245.3C1001.1,224,1015,192,1029,181.3C1042.3,171,1056,181,1070,202.7C1083.4,224,1097,256,1111,234.7C1124.6,213,1138,139,1152,101.3C1165.7,64,1179,64,1193,85.3C1206.9,107,1221,149,1234,170.7C1248,192,1262,192,1275,170.7C1289.1,149,1303,107,1317,80C1330.3,53,1344,43,1358,80C1371.4,117,1385,203,1399,250.7C1412.6,299,1426,309,1433,314.7L1440,320L1440,0L1433.1,0C1426.3,0,1413,0,1399,0C1385.1,0,1371,0,1358,0C1344,0,1330,0,1317,0C1302.9,0,1289,0,1275,0C1261.7,0,1248,0,1234,0C1220.6,0,1207,0,1193,0C1179.4,0,1166,0,1152,0C1138.3,0,1125,0,1111,0C1097.1,0,1083,0,1070,0C1056,0,1042,0,1029,0C1014.9,0,1001,0,987,0C973.7,0,960,0,946,0C932.6,0,919,0,905,0C891.4,0,878,0,864,0C850.3,0,837,0,823,0C809.1,0,795,0,782,0C768,0,754,0,741,0C726.9,0,713,0,699,0C685.7,0,672,0,658,0C644.6,0,631,0,617,0C603.4,0,590,0,576,0C562.3,0,549,0,535,0C521.1,0,507,0,494,0C480,0,466,0,453,0C438.9,0,425,0,411,0C397.7,0,384,0,370,0C356.6,0,343,0,329,0C315.4,0,302,0,288,0C274.3,0,261,0,247,0C233.1,0,219,0,206,0C192,0,178,0,165,0C150.9,0,137,0,123,0C109.7,0,96,0,82,0C68.6,0,55,0,41,0C27.4,0,14,0,7,0L0,0Z"} customStyles={styles.svgCurve} />
                                        <View style={styles.cardContentFinalPage}>
                                            <Image style={[styles.imageFinalPage, styles.imageContentFinalPage]} source={require("../../../../../assets/images/icon/numbers/7.png")}/>
                                            <Text style={[styles.nameFinalPage, { left: -(width * 0.069) }]}>{selectableItems[6].label}</Text>
                                        </View>
                                        <View style={styles.cardContentFinalPageLower}> 
                                            <View style={styles.columnizedCol}>
                                                <Text style={styles.topTextLabeled}>L-W-H (Length x Width x Height)</Text>
                                                <Text style={[styles.topTextLoweredLabeled, { marginBottom: 4.25 }]}>{spaceMeasurementsDimensionsFeet.length}</Text>
                                                <Text style={[styles.topTextLoweredLabeled, { marginBottom: 4.25 }]}>{spaceMeasurementsDimensionsFeet.width}</Text>
                                                <Text style={[styles.topTextLoweredLabeled, { marginBottom: 4.25 }]}>{spaceMeasurementsDimensionsFeet.height}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.hrBlueThicker, { marginTop: 4.5, marginBottom: 4.5 }]} />
                                <View style={styles.addOnlyBorderExterior}>
                                    <View style={[styles.cardFinalPage, { borderColor: Colors.whiteColor }]}>
                                        <WavyHeaderTopperHelper dString={"M0,192L6.9,202.7C13.7,213,27,235,41,218.7C54.9,203,69,149,82,160C96,171,110,245,123,250.7C137.1,256,151,192,165,170.7C178.3,149,192,171,206,149.3C219.4,128,233,64,247,48C260.6,32,274,64,288,90.7C301.7,117,315,139,329,176C342.9,213,357,267,370,261.3C384,256,398,192,411,144C425.1,96,439,64,453,48C466.3,32,480,32,494,37.3C507.4,43,521,53,535,48C548.6,43,562,21,576,32C589.7,43,603,85,617,90.7C630.9,96,645,64,658,53.3C672,43,686,53,699,74.7C713.1,96,727,128,741,133.3C754.3,139,768,117,782,138.7C795.4,160,809,224,823,245.3C836.6,267,850,245,864,213.3C877.7,181,891,139,905,133.3C918.9,128,933,160,946,176C960,192,974,192,987,181.3C1001.1,171,1015,149,1029,160C1042.3,171,1056,213,1070,234.7C1083.4,256,1097,256,1111,224C1124.6,192,1138,128,1152,117.3C1165.7,107,1179,149,1193,181.3C1206.9,213,1221,235,1234,208C1248,181,1262,107,1275,96C1289.1,85,1303,139,1317,186.7C1330.3,235,1344,277,1358,256C1371.4,235,1385,149,1399,144C1412.6,139,1426,213,1433,250.7L1440,288L1440,0L1433.1,0C1426.3,0,1413,0,1399,0C1385.1,0,1371,0,1358,0C1344,0,1330,0,1317,0C1302.9,0,1289,0,1275,0C1261.7,0,1248,0,1234,0C1220.6,0,1207,0,1193,0C1179.4,0,1166,0,1152,0C1138.3,0,1125,0,1111,0C1097.1,0,1083,0,1070,0C1056,0,1042,0,1029,0C1014.9,0,1001,0,987,0C973.7,0,960,0,946,0C932.6,0,919,0,905,0C891.4,0,878,0,864,0C850.3,0,837,0,823,0C809.1,0,795,0,782,0C768,0,754,0,741,0C726.9,0,713,0,699,0C685.7,0,672,0,658,0C644.6,0,631,0,617,0C603.4,0,590,0,576,0C562.3,0,549,0,535,0C521.1,0,507,0,494,0C480,0,466,0,453,0C438.9,0,425,0,411,0C397.7,0,384,0,370,0C356.6,0,343,0,329,0C315.4,0,302,0,288,0C274.3,0,261,0,247,0C233.1,0,219,0,206,0C192,0,178,0,165,0C150.9,0,137,0,123,0C109.7,0,96,0,82,0C68.6,0,55,0,41,0C27.4,0,14,0,7,0L0,0Z"} customStyles={styles.svgCurve} />
                                        <View style={styles.cardContentFinalPage}>
                                            <Image style={[styles.imageFinalPage, styles.imageContentFinalPage]} source={require("../../../../../assets/images/icon/numbers/8.png")}/>
                                            <Text style={[styles.nameFinalPage, { left: -(width * 0.069) }]}>{selectableItems[7].label}</Text>
                                        </View>
                                        <View style={styles.cardContentFinalPageLower}>
                                            <View style={styles.columnizedCol}>
                                                <View style={styles.cardContentFinalPageLower}> 
                                                    <View style={styles.columnizedCol}>
                                                        <Text style={styles.topTextLabeled}>{contactRequiredOrNot.name}</Text>
                                                        <Text style={styles.topTextLoweredLabeled}>{contactRequiredOrNot.subtitle}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.hrBlueThicker, { marginTop: 4.5, marginBottom: 4.5 }]} />
                                <View style={styles.addOnlyBorderExterior}>
                                    <View style={[styles.cardFinalPage, { borderColor: Colors.blackColor }]}>
                                        <WavyHeaderTopperHelper dString={"M0,224L6.9,208C13.7,192,27,160,41,138.7C54.9,117,69,107,82,96C96,85,110,75,123,106.7C137.1,139,151,213,165,208C178.3,203,192,117,206,80C219.4,43,233,53,247,85.3C260.6,117,274,171,288,197.3C301.7,224,315,224,329,218.7C342.9,213,357,203,370,218.7C384,235,398,277,411,298.7C425.1,320,439,320,453,293.3C466.3,267,480,213,494,197.3C507.4,181,521,203,535,192C548.6,181,562,139,576,117.3C589.7,96,603,96,617,112C630.9,128,645,160,658,165.3C672,171,686,149,699,149.3C713.1,149,727,171,741,192C754.3,213,768,235,782,208C795.4,181,809,107,823,117.3C836.6,128,850,224,864,261.3C877.7,299,891,277,905,240C918.9,203,933,149,946,117.3C960,85,974,75,987,64C1001.1,53,1015,43,1029,53.3C1042.3,64,1056,96,1070,101.3C1083.4,107,1097,85,1111,80C1124.6,75,1138,85,1152,101.3C1165.7,117,1179,139,1193,149.3C1206.9,160,1221,160,1234,149.3C1248,139,1262,117,1275,106.7C1289.1,96,1303,96,1317,96C1330.3,96,1344,96,1358,96C1371.4,96,1385,96,1399,90.7C1412.6,85,1426,75,1433,69.3L1440,64L1440,0L1433.1,0C1426.3,0,1413,0,1399,0C1385.1,0,1371,0,1358,0C1344,0,1330,0,1317,0C1302.9,0,1289,0,1275,0C1261.7,0,1248,0,1234,0C1220.6,0,1207,0,1193,0C1179.4,0,1166,0,1152,0C1138.3,0,1125,0,1111,0C1097.1,0,1083,0,1070,0C1056,0,1042,0,1029,0C1014.9,0,1001,0,987,0C973.7,0,960,0,946,0C932.6,0,919,0,905,0C891.4,0,878,0,864,0C850.3,0,837,0,823,0C809.1,0,795,0,782,0C768,0,754,0,741,0C726.9,0,713,0,699,0C685.7,0,672,0,658,0C644.6,0,631,0,617,0C603.4,0,590,0,576,0C562.3,0,549,0,535,0C521.1,0,507,0,494,0C480,0,466,0,453,0C438.9,0,425,0,411,0C397.7,0,384,0,370,0C356.6,0,343,0,329,0C315.4,0,302,0,288,0C274.3,0,261,0,247,0C233.1,0,219,0,206,0C192,0,178,0,165,0C150.9,0,137,0,123,0C109.7,0,96,0,82,0C68.6,0,55,0,41,0C27.4,0,14,0,7,0L0,0Z"} customStyles={styles.svgCurve} />
                                        <View style={styles.cardContentFinalPage}>
                                            <Image style={[styles.imageFinalPage, styles.imageContentFinalPage]} source={require("../../../../../assets/images/icon/numbers/9.png")}/>
                                            <Text style={[styles.nameFinalPage, { left: -(width * 0.069) }]}>{selectableItems[8].label}</Text>
                                        </View>
                                        <View style={styles.cardContentFinalPageLower}> 
                                            <View style={styles.columnizedCol}>
                                                <ViewMoreText
                                                    numberOfLines={3}
                                                    renderViewMore={renderViewMore}
                                                    renderViewLess={renderViewLess}
                                                    textStyle={styles.topTextLoweredLabeled}
                                                >
                                                    <Text>{welcomeMessage}</Text>
                                                </ViewMoreText>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.hrBlueThicker, { marginTop: 4.5, marginBottom: 4.5 }]} />
                                <View style={styles.addOnlyBorderExterior}>
                                    <View style={[styles.cardFinalPage, { borderColor: Colors.backColor }]}>
                                        <WavyHeaderTopperHelper dString={"M0,32L6.9,53.3C13.7,75,27,117,41,138.7C54.9,160,69,160,82,144C96,128,110,96,123,122.7C137.1,149,151,235,165,277.3C178.3,320,192,320,206,282.7C219.4,245,233,171,247,165.3C260.6,160,274,224,288,250.7C301.7,277,315,267,329,229.3C342.9,192,357,128,370,96C384,64,398,64,411,69.3C425.1,75,439,85,453,96C466.3,107,480,117,494,122.7C507.4,128,521,128,535,117.3C548.6,107,562,85,576,106.7C589.7,128,603,192,617,192C630.9,192,645,128,658,122.7C672,117,686,171,699,192C713.1,213,727,203,741,208C754.3,213,768,235,782,218.7C795.4,203,809,149,823,133.3C836.6,117,850,139,864,133.3C877.7,128,891,96,905,85.3C918.9,75,933,85,946,106.7C960,128,974,160,987,149.3C1001.1,139,1015,85,1029,58.7C1042.3,32,1056,32,1070,64C1083.4,96,1097,160,1111,181.3C1124.6,203,1138,181,1152,176C1165.7,171,1179,181,1193,186.7C1206.9,192,1221,192,1234,170.7C1248,149,1262,107,1275,117.3C1289.1,128,1303,192,1317,202.7C1330.3,213,1344,171,1358,149.3C1371.4,128,1385,128,1399,149.3C1412.6,171,1426,213,1433,234.7L1440,256L1440,0L1433.1,0C1426.3,0,1413,0,1399,0C1385.1,0,1371,0,1358,0C1344,0,1330,0,1317,0C1302.9,0,1289,0,1275,0C1261.7,0,1248,0,1234,0C1220.6,0,1207,0,1193,0C1179.4,0,1166,0,1152,0C1138.3,0,1125,0,1111,0C1097.1,0,1083,0,1070,0C1056,0,1042,0,1029,0C1014.9,0,1001,0,987,0C973.7,0,960,0,946,0C932.6,0,919,0,905,0C891.4,0,878,0,864,0C850.3,0,837,0,823,0C809.1,0,795,0,782,0C768,0,754,0,741,0C726.9,0,713,0,699,0C685.7,0,672,0,658,0C644.6,0,631,0,617,0C603.4,0,590,0,576,0C562.3,0,549,0,535,0C521.1,0,507,0,494,0C480,0,466,0,453,0C438.9,0,425,0,411,0C397.7,0,384,0,370,0C356.6,0,343,0,329,0C315.4,0,302,0,288,0C274.3,0,261,0,247,0C233.1,0,219,0,206,0C192,0,178,0,165,0C150.9,0,137,0,123,0C109.7,0,96,0,82,0C68.6,0,55,0,41,0C27.4,0,14,0,7,0L0,0Z"} customStyles={styles.svgCurve} />
                                        <View style={styles.cardContentFinalPage}>
                                            <Image style={[styles.imageFinalPage, styles.imageContentFinalPage]} source={require("../../../../../assets/images/icon/numbers/10.png")}/>
                                            <Text style={[styles.nameFinalPage, { left: -(width * 0.069) }]}>{selectableItems[9].label}</Text>
                                        </View>
                                        <View style={styles.cardContentFinalPageLower}> 
                                            <View style={styles.columnizedCol}>
                                                <View style={styles.sliderWrapperCustom}>
                                                    <SliderBox 
                                                        images={uploadedSelectedImages} 
                                                        dotColor={Colors.primaryColor}
                                                        inactiveDotColor={Colors.backColor}    
                                                        sliderBoxHeight={275}    
                                                        autoplay={true}
                                                        parentWidth={width * 0.885}
                                                        circleLoop={true}
                                                        resizeMethod={'resize'}
                                                        resizeMode={'contain'}
                                                        dotStyle={{
                                                            width: 22.5,
                                                            height: 22.5,
                                                            borderRadius: 17.5,
                                                            marginHorizontal: 10,
                                                            padding: 0,
                                                            margin: 0
                                                        }}    
                                                        imageLoadingColor={Colors.greenColor}                      
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.hrBlueThicker, { marginTop: 4.5, marginBottom: 17.5 }]} />
                                {renderFooterHelper()}
                            </View>
                        </ScrollView>
                    </View>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <View style={{ marginTop: 32.5 }} />
                        <SkeletonPlaceholder>
                            <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 7.5 }} />
                        <SkeletonPlaceholder>
                            <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 7.5 }} />
                        <SkeletonPlaceholder>
                            <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 7.5 }} />
                        <SkeletonPlaceholder>
                            <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                        </SkeletonPlaceholder>
                    <View style={{ marginBottom: 32.5 }} />
                </Fragment>
            );
        }
    }
    return (
        <View style={styles.containerFinalPage}>
            {confirmationDialog()}
            <RBSheet
                ref={sheetRefModifications}
                height={height}
                openDuration={250}
                closeOnDragDown={false}
                closeOnPressMask={false}
                closeOnPressBack={true}
                customStyles={{
                    container: {
                        borderTopColor: Colors.secondaryColor,
                        borderTopWidth: 7.25,
                        backgroundColor: Colors.whiteColor,
                        padding: 7.5,
                        width
                    }
                }}
                >
                <SheetPaneModificationPaneHelper totalNumPages={totalNumPages} sheetRefModifications={sheetRefModifications} valuesToDeconstruct={valuesToDeconstruct} setCurrentEditingPage={setCurrentEditingPage} pageToEdit={pageToEdit} storageData={storageData} authData={authData} />
                <View style={[styles.hrBlueThicker, { marginTop: 0, marginBottom: 14.25 }]} />
                <AwesomeButtonBlue backgroundDarker={"#000"} backgroundColor={"#e60000"} style={styles.absoluteButtonBottom} type={"secondary"} onPress={() => sheetRefModifications.current.close()} textColor={"#fff"} backgroundShadow={"black"} stretch={true}>Cancel/Close Pane</AwesomeButtonBlue>
                <View style={[styles.hrBlueThicker, { marginTop: 14.25, marginBottom: 7.5 }]} />
            </RBSheet>
            <ParallaxScroll
                headerHeight={0}
                style={{ flex: 1, flexGrow: 1 }}
                width={"100%"}
                isHeaderFixed={false}
                parallaxHeight={212.5}
                renderParallaxBackground={() => <ImageBackground imageStyle={styles.parallaxImageStyle} style={styles.parallaxCoreStyle} source={require("../../../../../assets/images/space-2.jpg")} />}
                renderParallaxForeground={renderParallaxForegroundHelper}
                parallaxBackgroundScrollSpeed={3}
                parallaxForegroundScrollSpeed={1.25}
            >
                {pendingState === true ? <ActivityIndicator size="large" style={styles.activityPostingToDB} color="#fff" /> : null}
                {renderContentBasedOnAvailableData()}
            </ParallaxScroll>
        </View>
    );
}
export default connect(null, { saveUpdatePreviousLocationDetailsDropoff })(RenderFinalReviewPostPage);