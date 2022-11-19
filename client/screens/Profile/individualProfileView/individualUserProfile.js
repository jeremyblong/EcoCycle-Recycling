import React, { useState, Fragment, useEffect, useRef } from "react";
import { SafeAreaView, View, StatusBar, TextInput, TouchableOpacity, FlatList, ScrollView, RefreshControl, ImageBackground, Image, Text, Dimensions } from "react-native";
import { Colors, Sizes, Fonts } from "../../../constants/styles.js";
import { BottomSheet } from "@rneui/themed";
import Dialog from "react-native-dialog";
import styles from "./individualUserProfileStyles.js";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { BASE_ASSET_URL, BASE_URL } from "@env";
import Toast from 'react-native-toast-message';
import SendPrivateMessagePaneIndividualProfile from "./panes/messagingSend/sendNewMessage.js";
import { connect } from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import moment from "moment";
import _ from "lodash";
import GoogleMap from "../../../component/googleMapScreen.js";
import { Calendar } from "react-native-calendars";
import SoundPlayer from 'react-native-sound-player'

const { width, height } = Dimensions.get("window");

const collectionCategoryList = [
    {
        id: '1',
        categoryImage: require('../../../assets/images/gradient-3.jpg'),
        category: 'Arts',
    },
    {
        id: '2',
        categoryImage: require('../../../assets/images/gradient-4.jpg'),
        category: '3D',
    },
    {
        id: '3',
        categoryImage: require('../../../assets/images/gradient-5.jpg'),
        category: 'Music',
    },
    {
        id: '4',
        categoryImage: require('../../../assets/images/gradient-6.jpg'),
        category: 'Landscapes',
    },
];

const MainProfileScreenHelper = (props) => {

    const navigation = useNavigation();
    const sendPrivateMessageRef = useRef(null);

    const { authData } = props;

    console.log("userrrrrrrr", props.route.params.user);

    const [state, setState] = useState({
        showSavePopup: false,
        showCreateCollectionDialog: false,
        collectionName: null,
        currentUser: null,
        refreshing: false,
        loaded: false,
        playingAudio: false,
        userLocation: null
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        showSavePopup,
        showCreateCollectionDialog,
        collectionName, 
        refreshing,
        currentUser,
        loaded,
        playingAudio
    } = state;

    const onStartPlay = async () => {
        console.log('onStartPlay');

        updateState({ playingAudio: true });
        
        if (!playingAudio) {
            SoundPlayer.playUrl(`${BASE_ASSET_URL}/${currentUser.profileData.profileAudioTrack.file.link}`)
        } else {
            // stop player
            SoundPlayer.stop();

            updateState({ playingAudio: false });
        }
    };

    const _handleRefresh = () => {
        console.log("_handleRefresh refreshing...!");

        updateState({ refreshing: true, loaded: false });

        const config = {
            params: {
                uniqueId: props.route.params.user.uniqueId
            }
        };

        axios.get(`${BASE_URL}/gather/general/information/user`, config).then((res) => {
            if (res.data.message === "Gathered user successfully!") {

                console.log("Succcccccccesssss: ", res.data);

                const { user } = res.data; 

                updateState({
                    currentUser: user,
                    refreshing: false,
                    loaded: true,
                    userLocation: { latitude: user.currentApproxLocation.geo.coordinates[0], longitude: user.currentApproxLocation.geo.coordinates[1] }
                });
            } else {
                console.log("Else ran upon axios request...:", res.data);

                Toast.show({
                    type: 'error',
                    text1: `Error occurred while fetching the desired user!`,
                    text2: `An error has occurred while attempting to fetch the related/desired user-data, please try reloading the page by pulling the screen down...`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
                updateState({ refreshing: false, loaded: true });
            }
        }).catch((err) => {
            console.log("Errrrrrrrrrrrrrr", err);

            Toast.show({
                type: 'error',
                text1: `Error occurred while fetching the desired user!`,
                text2: `An error has occurred while attempting to fetch the related/desired user-data, please try reloading the page by pulling the screen down...`,
                visibilityTime: 4250,
                position: "bottom"
            });

            updateState({ refreshing: false, loaded: true });
        });
    }
    console.log("playingAudio state..:", playingAudio);

    useEffect(() => {

        const _onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
            console.log('finished playing', success);

            updateState({ playingAudio: false });
        })
        
        const config = {
            params: {
                uniqueId: props.route.params.user.uniqueId
            }
        };

        axios.get(`${BASE_URL}/gather/general/information/user`, config).then((res) => {
            if (res.data.message === "Gathered user successfully!") {

                console.log("Succcccccccesssss: ", res.data);

                const { user } = res.data; 

                updateState({
                    currentUser: user,
                    loaded: true,
                    userLocation: { latitude: user.currentApproxLocation.geo.coordinates[0], longitude: user.currentApproxLocation.geo.coordinates[1] }
                });
            } else {
                console.log("Else ran upon axios request...:", res.data);

                Toast.show({
                    type: 'error',
                    text1: `Error occurred while fetching the desired user!`,
                    text2: `An error has occurred while attempting to fetch the related/desired user-data, please try reloading the page by pulling the screen down...`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
            }
        }).catch((err) => {

            Toast.show({
                type: 'error',
                text1: `Error occurred while fetching the desired user!`,
                text2: `An error has occurred while attempting to fetch the related/desired user-data, please try reloading the page by pulling the screen down...`,
                visibilityTime: 4250,
                position: "bottom"
            });

            console.log("Errrrrrrrrrrrrrr", err);
        });
    }, []);

    const createCollectionDialog = () => {
        return (
            <Dialog.Container
                visible={showCreateCollectionDialog}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0 }}
                onRequestClose={() => { updateState({ showCreateCollectionDialog: false }) }}
            >
                <View style={styles.dialogContentWrapStyle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ flex: 1, ...Fonts.whiteColor18SemiBold }}>
                            Give a name to your collection
                        </Text>
                        <TouchableOpacity onPress={() => updateState({ showCreateCollectionDialog: false })} style={styles.iconSmallWrapper}>
                            <Image source={require("../../../assets/images/icon/close-64.png")} style={styles.iconSmall} />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        placeholder="Enter collection name"
                        placeholderTextColor={Colors.grayColor}
                        value={collectionName}
                        onChangeText={(value) => updateState({ collectionName: value })}
                        style={styles.collectionNameFieldStyle}
                        selectionColor={Colors.primaryColor}
                    />
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showCreateCollectionDialog: false })}
                        style={styles.createCollectionButtonStyle}
                    >
                        <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                            Create Collection
                        </Text>
                    </TouchableOpacity>
                </View>
            </Dialog.Container>
        );
    }

    const savePopUp = () => {
        return (
            <BottomSheet
                isVisible={showSavePopup}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => { updateState({ showSavePopup: false }) }, }}
            >
                <View style={styles.bottomSheetWrapStyle}>
                    <Text style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.whiteColor20Bold }}>
                        Save to Collections
                    </Text>
                    {collectionCategoryList.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ showSavePopup: false })}
                            key={`${index}`}
                            style={{ marginBottom: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}
                        >
                            <Image source={item.categoryImage}
                                style={{ width: 50.0, height: 50.0, borderRadius: Sizes.fixPadding - 5.0, }}
                            />
                            <Text style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.whiteColor16Medium }}>
                                {item.category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showCreateCollectionDialog: true })}
                        style={styles.createNewButtonWrapStyle}
                    >
                        <TouchableOpacity onPress={() => updateState({ showCreateCollectionDialog: false })} style={styles.iconMediumWrapper}>
                            <Image source={require("../../../assets/images/icon/add-64.png")} style={styles.iconMedium} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.whiteColor20SemiBold }}>
                            Create new
                        </Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        )
    }

    const renderMapRandomizedLoc = () => {
        if (state.userLocation !== null) {
            const { latitude, longitude } = state.userLocation;
            return (
                <View style={{ marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, bottom: -75 }}>
                    <Text style={styles.labeled}>
                        User's Approx. Location (***Approx***)
                    </Text>
                    <View style={styles.borderedMapWrapper}>
                        <GoogleMap latitude={latitude} longitude={longitude} height={225} pinColor={Colors.primaryColor} />
                    </View>
                </View>
            )
        }
    }

    const renderBirthdateDataHelper = () => {
        if (state.currentUser !== null && _.has(currentUser, "birthdateData")) {
            console.log("moment(currentUser.birthdateData.birthdateRaw).forma", moment(currentUser.birthdateData.birthdateRaw).format("YYYY-MM-DD").toString());
            return (
                <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                    <Text style={styles.labeled}>
                        User's Birthdate
                    </Text>
                    <View style={styles.borderedMapWrapper}>
                        <Calendar
                            initialDate={moment(currentUser.birthdateData.birthdateRaw).format("YYYY-MM-DD")}
                            markedDates={{
                                [moment(currentUser.birthdateData.birthdateRaw).format("YYYY-MM-DD")]: { selected: true, marked: true, selectedColor: Colors.primaryColor }
                            }}
                            hideArrows={true}
                            hideExtraDays={true}
                            disableAllTouchEventsForInactiveDays={true}
                            disableMonthChange={true}
                            firstDay={1}
                            showWeekNumbers={true}
                            disableArrowLeft={true}
                            disableArrowRight={true}
                            disableAllTouchEventsForDisabledDays={true}
                            enableSwipeMonths={true}
                        />
                    </View>
                </View>
            )
        }
    }

    const profileDetail = () => {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Ullamcorper non sit pharetra diam eget.
                </Text>
                {linkAndSocialMediaInfo()}
                {profileOtherInfo()}
            </View>
        )
    }

    const profileOtherInfo = () => {
        return (
            <View style={styles.otherInfoWrapStyle}>
                <View style={styles.thirdContainer}>
                    <Text style={{ ...Fonts.whiteColor16SemiBold, textAlign: "center", fontWeight: "bold", textDecorationLine: "underline" }}>
                        {currentUser.totalUniqueViews} Profile View(s)
                    </Text>
                </View>
                <View style={styles.thirdContainer}>
                    <Text style={{ ...Fonts.grayColor12Regular, textAlign: "center", fontWeight: "bold", textDecorationLine: "underline" }}>
                        {currentUser.verficationCompleted ? "Verified!" : "Not Verified Yet!"}
                    </Text>
                </View>
                <View style={styles.thirdContainer}>
                    <Text style={{ ...Fonts.whiteColor16SemiBold, textAlign: "center", fontWeight: "bold", textDecorationLine: "underline" }}>
                        {currentUser.reviews.length} Total Review(s)
                    </Text>
                </View>
            </View>
        )
    }

    const linkAndSocialMediaInfo = () => {
        return (
            <View style={styles.linkAndSocialMediaInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../../assets/images/icon/facebook.png')}
                        style={{ width: 30.0, height: 30.0, resizeMode: 'contain' }}
                    />
                    <Image
                        source={require('../../../assets/images/icon/instagram.png')}
                        style={{ width: 30.0, height: 30.0, resizeMode: 'contain' }}
                    />
                    <Image
                        source={require('../../../assets/images/icon/twitter.png')}
                        style={{ width: 30.0, height: 30.0, resizeMode: 'contain' }}
                    />
                </View>
            </View>
        )
    }

    const creatorProfileInfo = () => {

        const calculatePictureRenderProfile = () => {
            const profilePictures = currentUser.profilePictures;

            if (typeof profilePictures !== "undefined" && profilePictures.length > 0) {
                return <Image
                source={{ uri: `${BASE_ASSET_URL}/${profilePictures[profilePictures.length - 1].link}` }}
                style={{ width: 80.0, height: 80.0, borderRadius: 40.0, top: -30 }}
            />;
            } else {
                return <Image
                    source={require("../../../assets/images/blank-profile-pic.png")}
                    style={{ width: 80.0, height: 80.0, borderRadius: 40.0, top: -30 }}
                />;
            }
        }
        return (
            <View style={{ marginBottom: Sizes.fixPadding }}>
                <ImageBackground
                    source={_.has(currentUser, "coverPhoto") ? { uri: `${BASE_ASSET_URL}/${currentUser.coverPhoto.link}` } : require('../../../assets/images/design-3.png')}
                    style={{ width: '100%', height: 200.0 + StatusBar.currentHeight }}
                >
                    <View style={styles.backArrowWrapStyle}>
                        <TouchableOpacity onPress={() => sendPrivateMessageRef.current.open()} style={styles.iconMediumWrapper}>
                            <Image source={require("../../../assets/images/icon/chat-2.png")} style={styles.iconMedium} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.positionTopRightCorner}>
                        <View
                            activeOpacity={0.9}
                            onPress={() => {}}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center", paddingBottom: 7.25 }}
                        >
                            <TouchableOpacity style={styles.centeredRowWrapper} onPress={() => {}}>
                                <View style={styles.innerRowWrapper}>
                                    <Text style={styles.greenTextTwo}>({0})</Text>
                                </View>
                                <Image
                                    source={require('../../../assets/images/icon/thumbs_up.png')}
                                    style={{ width: 57.5, height: 57.5 }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.centeredRowWrapper} onPress={() => {}}>
                                <Image
                                    source={require('../../../assets/images/icon/thumbs_down.png')}
                                    style={{ width: 57.5, height: 57.5 }}
                                />
                                <View style={styles.innerRowWrapper}>
                                    <Text style={styles.redTextTwo}>({0})</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.profileInfoWrapStyle}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        {calculatePictureRenderProfile()}
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                            <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                                {`${currentUser.firstName} ${currentUser.lastName}`}
                            </Text>
                            <Text style={{ lineHeight: 16.0, ...Fonts.whiteColor14Regular }}>
                                @{currentUser.username}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {}} style={styles.followButtonStyle}>
                        <Text style={{ ...Fonts.whiteColor16SemiBold, color: "#fff" }}>
                            Follow!
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderCoreDataOther = () => {

        return (
            <View style={{ margin: 17.25 }}>
                <View style={styles.hr} />
                <Text style={styles.labeled}>
                    Requested Freight Pickup's
                </Text>
                <Text style={styles.activeRequestedShippingData}>{_.has(state.currentUser, "activeRequestedShippingData") ? `${state.currentUser.activeRequestedShippingData.length} current 'requested shipments'...` : "No Current Requested Shipment's"}</Text>
                <View style={styles.hr} />
                {_.has(currentUser, "profileData") && _.has(currentUser.profileData, "profileAudioTrack") ? <Fragment>
                    <Text style={styles.labeled}>
                        Profile Audio Clip (More About This User)
                    </Text>
                    <Text style={styles.subLabeled}>Answering this question...: <Text style={{ color: Colors.secondaryColor, fontWeight: "bold", textDecorationLine: "underline" }}>{currentUser.profileData.profileAudioTrack.selection.value}</Text></Text>
                    <AwesomeButtonBlue width={width * 0.475} type={"secondary"} backgroundShadow={"black"} backgroundColor={Colors.primaryColor} onPress={() => onStartPlay()}>
                        <Text style={[styles.innerBtnText, { color: "#fff" }]}>{!playingAudio ? "Play Audio-Clip!" : "Stop Audio-Clip.."}</Text>
                        <Image source={require('../../../assets/images/icon/audio-sound.png')} style={styles.maxedImage} />
                    </AwesomeButtonBlue>
                </Fragment> : null}
                <View style={[styles.hr, { marginTop: 17.25 }]} />
            </View>
        );
    }

    const renderMainContentConditionally = () => {
        if (loaded === true) {
            return (
                <Fragment>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={_handleRefresh}
                        />
                    }>
                        {creatorProfileInfo()}
                        {profileDetail()}
                        {renderMapRandomizedLoc()}
                        {renderBirthdateDataHelper()}
                        {renderCoreDataOther()}
                    </ScrollView>
                    {savePopUp()}
                    {createCollectionDialog()}
                </Fragment>
            );
        } else {
            return (
                <View style={styles.rowOnly}>
                    <View style={styles.halfColumn}>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>
                    <View style={styles.halfColumn}>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                        <Placeholder
                            Animation={Fade}
                            Left={props => (
                                <PlaceholderMedia
                                    isRound={true}
                                    style={[styles.placeholderMediaSmaller, props.style]}
                                />
                            )}
                        >
                            <PlaceholderLine width={80} />
                            <PlaceholderLine width={width * 0.25} style={[styles.placeholderMediaRow, props.style]} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>
                </View>
            );
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <RBSheet
                ref={sendPrivateMessageRef}
                height={height}
                openDuration={250}
                closeOnDragDown={true}
                customStyles={{
                    container: {
                        paddingHorizontal: Sizes.fixPadding * 2.0,
                    },
                    draggableIcon: {
                        width: width * 0.725
                    }
                }}
            >
                {currentUser !== null ? <SendPrivateMessagePaneIndividualProfile otherUser={currentUser} authData={authData} setStateOutter={setState} sendPrivateMessageRef={sendPrivateMessageRef} /> : null}
            </RBSheet>
            {renderMainContentConditionally()}
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return {
        authData: state.auth.data
    }
}

export default connect(mapStateToProps, {})(MainProfileScreenHelper);
