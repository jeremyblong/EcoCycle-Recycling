import React, { useRef, useState, Fragment, useMemo, useEffect } from "react";
import {
    Text, View, SafeAreaView, FlatList, StatusBar, ImageBackground,
    Image, TouchableOpacity,
    Dimensions,
} from "react-native";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Fonts, Colors, Sizes } from "../../constants/styles";
import RBSheet from "react-native-raw-bottom-sheet";
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import { useNavigation } from "@react-navigation/native";
import { Card } from '@rneui/themed';
import { profilePicList, navigationalLinks } from "./helpers/mapped.js";
import styles from "./HomeScreenStyles.js";
import { BASE_ASSET_URL, BASE_URL } from "@env";
import { updateChangeSystemSettings } from "../../redux/actions/systemSettings/adjustSystemSettings.js";
import { Button } from "@rneui/base";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import axios from "axios";
import Toast from 'react-native-toast-message';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import moment from "moment";
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ userData, systemState }) => {
    const mapViewRef = useRef(null);
    const [ state, setState ] = useState({
        users: [],
        promotedUsers: [],
        statistics: [
            { category: 'Total items recycled', value: 10565 },
            { category: 'Total depots', value: 11 },
            { category: 'Total users', value: 6427 },
          
            { category: 'Total batches processed', value: 907 },
            { category: '$ paid out per deliveries', value: 1452 },
            { category: '$ Paid to depots', value: 11565 },
            { category: 'Lbs. of e-waste processed', value: 5650 },
        ],
        dropoffs: []
    });

    const { promotedUsers, users } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const navigation = useNavigation();

    useEffect(() => {

        navigation.addListener('focus', () => {
            console.log("mounted");

            Geolocation.getCurrentPosition(info => {

                const { latitude, longitude } = info.coords;

                const currentLoc = { latitude, longitude, latitudeDelta: 0.00875, longitudeDelta: 0.00875 };
    
                const config = {
                    params: {
                        currentLoc
                    }
                };
        
                axios.get(`${BASE_URL}/gather/dropoff/locations/points`, config).then((res) => {
        
                    if (res.data.message === "Gathered relevant location points!") {
        
                        console.log(res.data);
        
                        const { results } = res.data;

                        updateState({ dropoffs: results });
        
                        Toast.show({
                            type: 'success',
                            text1: `Successfully gathered the relevant drop-off locations!`,
                            text2: `We've successfully gathered the related drop-off locations which should now be displayed on the appropriate places on the map...`,
                            visibilityTime: 3250,
                            position: "bottom",
                            onHide: () => {}
                        });
                    } else {
                        console.log("Err", res.data);
        
                        Toast.show({
                            type: 'error',
                            text1: `An error occurred while fetching relevant results!`,
                            text2: `We've encountered an error while attempting to fetch the desired/relevant drop-off locations, please try to load the page again or contact support if the problem persists...`,
                            visibilityTime: 3250,
                            position: "bottom"
                        });
                    }
                }).catch((err) => {
                    console.log(err);
        
                    Toast.show({
                        type: 'error',
                        text1: `An error occurred while fetching relevant results!`,
                        text2: `We've encountered an error while attempting to fetch the desired/relevant drop-off locations, please try to load the page again or contact support if the problem persists...`,
                        visibilityTime: 3250,
                        position: "bottom"
                    });
                });
            });

            const configMainUsers = {
                params: {
                    sizeOfResults: 35
                }
            };
            
            axios.get(`${BASE_URL}/gather/specific/number/users/standard/only`, configMainUsers).then((res) => {
                if (res.data.message === "Gathered list of users!") {
    
                    console.log(res.data);
    
                    const { users } = res.data;
    
                    updateState({ users });
                } else {
                    console.log("Err", res.data);

                    Toast.show({
                        type: 'error',
                        text1: `An error occurred while attempting to fetch the desired user's...`,
                        text2: `An error has occurred while attempting to fetch the user's to be loaded on this page - please try refreshing the page or contact support if the problem persists!`,
                        visibilityTime: 4250,
                        position: "bottom"
                    });
                }
            }).catch((err) => {
                console.log(err);

                Toast.show({
                    type: 'error',
                    text1: `An error occurred while attempting to fetch the desired user's...`,
                    text2: `An error has occurred while attempting to fetch the user's to be loaded on this page - please try refreshing the page or contact support if the problem persists!`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
            })

            const configPromotedUsers = {};
            
            axios.get(`${BASE_URL}/gather/main/users/promoted/accounts/only`, configPromotedUsers).then((res) => {
                if (res.data.message === "Gathered list of users!") {
    
                    console.log(res.data);
    
                    const { users } = res.data;

                    const promises = [];

                    for (let idxxxxx = 0; idxxxxx < users.length; idxxxxx++) {
                        
                        const user = users[idxxxxx];

                        promises.push(new Promise((resolve, reject) => {
                            // update comments state
                            const config = {
                                params: {
                                    postedByID: user.uniqueId
                                }
                            };
                            axios.get(`${BASE_URL}/gather/only/profile/picture/with/id`, config).then((res) => {
                                if (res.data.message === "Submitted gathered user's picture/file!") {
        
                                    const { user } = res.data; 
            
                                    user["lastProfilePic"] = (typeof user.profilePictures !== "undefined" && user.profilePictures.length > 0) ? user.profilePictures[user.profilePictures.length - 1].link : null;
            
                                    resolve(user);
                                } else {
            
                                    user["lastProfilePic"] = null;
            
                                    resolve(user);
                                }
                            }).catch((err) => {
                                user["lastProfilePic"] = null;
            
                                resolve(user);
                            })
                        }));
                    }

                    Promise.all(promises).then((passedValues) => {
                        console.log("values", passedValues);

                        updateState({ promotedUsers: passedValues })
                    })

                } else {
                    console.log("Err", res.data);

                    Toast.show({
                        type: 'error',
                        text1: `An error occurred while attempting to fetch the desired user's...`,
                        text2: `An error has occurred while attempting to fetch the user's to be loaded on this page - please try refreshing the page or contact support if the problem persists!`,
                        visibilityTime: 4250,
                        position: "bottom"
                    });
                }
            }).catch((err) => {
                console.log(err);

                Toast.show({
                    type: 'error',
                    text1: `An error occurred while attempting to fetch the desired user's...`,
                    text2: `An error has occurred while attempting to fetch the user's to be loaded on this page - please try refreshing the page or contact support if the problem persists!`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
            })
        });
    }, []);

    useEffect(() => () => {
        console.log("unmount");
    }, []);

    const calculateStarRatingNumerical = reviews => {
        if (typeof reviews !== "undefined" && reviews.length > 0) {
            return Math.round(calculation / reviews.length);
        } else {
            return "N/A"
        }
    }
    const newlyLanched = () => {
        return (
            <ImageBackground
                source={require('../../assets/images/banner.jpg')}
                resizeMode="cover"
                style={{
                    height: 115,
                    marginTop: Sizes.fixPadding + 5.0,
                    marginHorizontal: Sizes.fixPadding + 2.25,
                    borderColor: "#fff",
                    borderWidth: 4.25,
                    borderTopWidth: 2.25,
                    // borderBottomWidth: 1.5,
                    borderRadius: 2.5,
                    shadowColor: Colors.primaryColor,
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    position: "relative",
                    bottom: -135,
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                    elevation: 6
                }}
                borderRadius={5}
            >
            </ImageBackground>
        )
    }

    const title = ({ title }) => {
        return (
            <Fragment>
                {/* <Image source={require("../../assets/images/therapy-1.png")} style={styles.absolutePosition} /> */}
                <Text style={{ ...Fonts.black20Bold, color: Colors.primaryColor, textDecorationLine: "underline", fontWeight: "bold", marginVertical: Sizes.fixPadding, padding: 2.5, marginHorizontal: Sizes.fixPadding * 2.0, color: "#fff", marginTop: 17.5 }}>
                    {title}
                </Text>
            </Fragment>
        )
    }
    const viewAllText = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ViewAll')}>
                <View style={styles.viewAllStyle}>
                    <View style={styles.columnOnly}>
                        <View style={styles.rowOnly}>
                            <Text style={{ ...Fonts.black20Bold, color: "#fff", textDecorationLine: "underline", fontWeight: "bold", marginVertical: Sizes.fixPadding, padding: 2.5, marginHorizontal: Sizes.fixPadding - 5 }}>View "Boosted" Dropoff Depot's</Text><Image source={require("../../assets/images/icon/right.png")} style={styles.iconRightSmallish} />
                        </View>
                        <Text style={styles.subHeaderText}>These are promoted/boosted dropoff depots where you can deliver your e-waste for money! These users have promoted their location to aquire more business - use these dropoffs first.</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    const promotedRenderItem = ({ item, index }) => {
        const { firstName, lastProfilePic, lastName, username, profilePictures, verificationCompleted, registrationDate, reviews, totalUniqueViews } = item;
        const calculation = calculateStarRatingNumerical(reviews);

        console.log("lastProfilePic", lastProfilePic);
        return (
            <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('MainProfileViewScreen', { user: item })}
                style={styles.labAndCheckUpContainer}
            >
               <View style={styles.column}>
                    <View style={styles.rowCustom}>
                        {lastProfilePic !== null ? <Image
                            source={{ uri: `${BASE_ASSET_URL}/${lastProfilePic}` }}
                            style={{
                                height: "100%", width: "100%", borderTopLeftRadius: Sizes.fixPadding + 5.0,
                                borderBottomLeftRadius: Sizes.fixPadding + 5.0, overflow: 'hidden'
                            }}
                            resizeMode="cover"
                        /> : <Image
                        source={require("../../assets/images/blank-profile-pic.png")}
                        style={{
                            height: "100%", width: "100%", borderTopLeftRadius: Sizes.fixPadding + 5.0,
                            borderBottomLeftRadius: Sizes.fixPadding + 5.0, overflow: 'hidden'
                        }}
                        resizeMode="cover"
                    />}
                    </View>
                    <View style={[ styles.rowCustom, styles.centerOnly ]}>
                        <View style={styles.labInformationContainer}>
                            <Text numberOfLines={3} style={{ ...Fonts.black16Bold, fontWeight: "bold", color: Colors.primaryColor, flexWrap: "nowrap" }}>
                                {`${firstName} ${lastName}`} ~ @{username}
                            </Text>
                            <Text numberOfLines={2} style={{ ...Fonts.grayBold, color: "#000", marginTop: Sizes.fixPadding - 5.0 }}>
                                Registered: <Text style={{ fontWeight: "bold" }}>{moment(registrationDate).fromNow(false)}</Text>
                            </Text>
                            <View style={{ ...styles.row, position: "absolute", bottom: 5, left: 2.5, right: 2.5 }}>
                                <View style={{ flexDirection: "column", display: "flex" }}>
                                    <Text style={styles.topLineText}>{verificationCompleted === true ? "Account Verified!" : "Not Verified."}</Text>
                                    <Text style={styles.bottomLineText}>{totalUniqueViews} Profile View's</Text>
                                </View>
                                <Image source={require("../../assets/images/icon/vibrantstar_prev_ui.png")} style={{ ...styles.iconed, marginTop: 14.5, marginLeft: 2.25, maxWidth: 25, maxHeight: 25 }} />
                                <Text style={styles.starTextNum}>({calculation})</Text>
                            </View>
                        </View>
          
                    </View>
               </View>
            </TouchableOpacity>
        );
    }

    const renderItem = ({ item, index }) => {
        const { mainCategory, subCategory, dropoffLocationData, preciseMarkerCoords, contactRequiredOrNot, spaceMeasurementsDimensionsFeet, uploadedRelatedImages } = item.mainData;
        const lastImage = `${BASE_ASSET_URL}/${uploadedRelatedImages[uploadedRelatedImages.length - 1].link}`;
        const coordsMarker = { latitude: preciseMarkerCoords.latitude, longitude: preciseMarkerCoords.longitude, latitudeDelta: 0.1, longitudeDelta: 0.1 }
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('MainProfileViewScreen', { dropoff: item })}
                style={styles.labAndCheckUpContainerTwo}
                key={index}
            >
               <View style={styles.column}>
                    <View style={styles.rowCustomOne}>
                        {lastImage !== null ? <Image
                            source={{ uri: lastImage }}
                            style={{
                                height: 125, width: "100%", borderTopLeftRadius: Sizes.fixPadding + 5.0,
                                borderBottomLeftRadius: Sizes.fixPadding + 5.0, overflow: 'hidden'
                            }}
                            resizeMode="cover"
                        /> : <Image
                        source={require("../../assets/images/blank-profile-pic.png")}
                        style={{
                            height: 125, width: "100%", borderTopLeftRadius: Sizes.fixPadding + 5.0,
                            borderBottomLeftRadius: Sizes.fixPadding + 5.0, overflow: 'hidden'
                        }}
                        resizeMode="cover"
                    />}
                    </View>
                    <View style={[ styles.rowCustom, styles.centerOnly ]}>
                        <View style={styles.labInformationContainer}>
                            <Text numberOfLines={3} style={{ ...Fonts.black16Bold, fontWeight: "bold", color: Colors.primaryColor, flexWrap: "nowrap" }}>
                                {mainCategory.name} ~ {subCategory.name}
                            </Text>
                            <Text numberOfLines={2} style={{ ...Fonts.grayBold, color: "#000", marginTop: Sizes.fixPadding - 5.0 }}>
                                Posted: <Text style={{ fontWeight: "bold" }}>{moment(item.date).fromNow(false)}</Text>
                            </Text>
                            <MapView
                                customMapStyle={{ minHeight: 125, height: 125 }}
                                region={coordsMarker}
                                ref={mapViewRef}
                                style={styles.map}
                                provider={PROVIDER_GOOGLE}
                            >
                                <Marker 
                                    key={`${mainCategory.name} ~ ${subCategory.name}`}
                                    coordinate={coordsMarker}
                                    title={"This is the depot location"}
                                    description={"This is a dropoff near your current location - click to view:"}
                                />
                            </MapView>
                            <View style={{ ...styles.row, bottom: 5, left: 2.5, right: 2.5 }}>
                                <View style={{ flexDirection: "column", display: "flex" }}>
                                    <Text style={styles.topLineText}>Space.: {spaceMeasurementsDimensionsFeet.length} x {spaceMeasurementsDimensionsFeet.width} x {spaceMeasurementsDimensionsFeet.height} (ft.)</Text>
                                    <Text style={styles.bottomLineText}>Contact Prior? {contactRequiredOrNot.name}</Text>
                                </View>
                                <Image source={require("../../assets/images/icon/vibrantstar_prev_ui.png")} style={{ ...styles.iconed, marginTop: 6.25, marginLeft: 2.25 }} />
                                <Text style={styles.starTextNum}>({typeof item.reviews !== "undefined" ? item.reviews.length : 0})</Text>
                            </View>
                        </View>
          
                    </View>
               </View>
            </TouchableOpacity>
        );
    }

    const header = () => {

        const refRBSheet = useRef();
        const [city, setSelectedItem] = useState('Wallington');
        const menuQuickLinks = ["Donate/Sell electronic waste", "Price your ewaste value", "Help & Support", "View payments & earnings", "Manage Account", "View Your 'Logs'"];

        return (
            <View style={styles.headerStyle}>
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        height={335}
                        openDuration={250}
                        customStyles={{
                            container: {
                                paddingHorizontal: Sizes.fixPadding * 2.0,
                            },
                            draggableIcon: {
                                width: width * 0.725
                            }
                        }}
                    >
                        <View>
                            <Text style={{ ...Fonts.black20Bold, alignSelf: 'center' }}>Choose A Helpful Redirect</Text>
                            {menuQuickLinks.map((item) =>
                                <TouchableOpacity
                                    key={item}
                                    onPress={() => {
                                        setSelectedItem(item)
                                        refRBSheet.current.close()
                                    }}>
                                    <Text
                                        style={{ ...Fonts.black16Regular, marginVertical: Sizes.fixPadding }}>{item}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </RBSheet>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 42.5, marginBottom: 2.5 }}>
                        <Image source={require("../../assets/images/menu_prev_ui.png")} style={{ width: 50, height: 50 }} />
                        <Text style={{ ...Fonts.black18Regular, marginLeft: 10.0, color: "white", fontWeight: "bold" }}>Quick Link(s)/Redirect(s)</Text>
                    </View>
                </TouchableOpacity>
                <Icon name="notifications" size={24} color="black" onPress={() => navigation.navigate('Notification')} />
            </View>
        )
    }

    const renderSliderImages = ({ item, index }) => {
        return (
            <Fragment key={index}>
                <Card containerStyle={styles.profileCard}>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Divider />
                    <Image source={item.image} style={{ maxWidth: 150, maxHeight: 145, height: 145 }} />
                </Card>
            </Fragment>
        );
    }
    const redirectToAppropriateView = (value) => {
        console.log("redirectToAppropriateView clicked/ran", value);

        navigation.navigate(value.navigationRouteName);
    }
    const renderSliderNavigationalLinks = ({ item, index }) => {
        return (
            <Fragment key={index}>
                <TouchableOpacity onPress={() => redirectToAppropriateView(item)}>
                    <Card containerStyle={styles.profileCardTouchable}>
                        <Card.Title style={styles.nameTitleStyle}>{item.name}</Card.Title>
                        <Card.Divider />
                        <View style={styles.centerOnly}>
                            <View style={styles.imageIconWrapper}>
                                <Image source={item.image} style={styles.innerImageIcon} />
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>
            </Fragment>
        );
    }
    const renderQuickPowerButtons = () => {

        const renderConditionallyThirdParty = () => {
            if (userData.accountType === "3rd-party-distribution-account") {
                return (
                    <Fragment>
                        <AwesomeButtonBlue type={"secondary"} onPress={() => navigation.navigate("DistributorAccountManagementCreation")} stretch={true}>
                            <Text style={styles.innerBtnText}>Distributor Management Account</Text>
                        </AwesomeButtonBlue>
                    </Fragment>
                );
            }
        }
        return (
            <Fragment>
                <View style={styles.centralBtnContainer}>
                    <View style={styles.columnFullWidth}>
                        <View style={[styles.columnOnly, { width: width * 0.975 }]}>
                            {/* <View style={styles.centerOnly}>
                                <View style={styles.thickerHR} />
                            </View> */}
                            <AwesomeButtonBlue type={"secondary"} backgroundShadow={"black"} backgroundColor={Colors.greenColor} onPress={() => navigation.navigate("MainDisplayInvitePoolingResources")} stretch={true}>
                                <Text style={[styles.innerBtnText, { color: "#fff" }]}>Invite Friend(s) To "Pool" Electronic's</Text>
                            </AwesomeButtonBlue>
                            <View style={styles.centerOnly}>
                                <View style={styles.thickerHR} />
                            </View>
                        </View>
                        {renderConditionallyThirdParty()}
                    </View>
                </View>
            </Fragment>
        );
    }
    const renderSkelatonLoadingVertical = () => {
        return (
            <Fragment>
                <View style={styles.rowOnly}>
                    <View style={[styles.halfColumn, { paddingRight: 17.25 } ]}>
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
                            <PlaceholderLine width={width * 0.25} />
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
                            <PlaceholderLine width={width * 0.25} />
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
                            <PlaceholderLine width={width * 0.25} />
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
                            <PlaceholderLine width={width * 0.25} />
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
                            <PlaceholderLine width={width * 0.25} />
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
                            <PlaceholderLine width={width * 0.25} />
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
                            <PlaceholderLine width={width * 0.25} />
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
                            <PlaceholderLine width={width * 0.25} />
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
                            <PlaceholderLine width={width * 0.25} />
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
                            <PlaceholderLine width={width * 0.25} />
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
                            <PlaceholderLine width={width * 0.25} />
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
                            <PlaceholderLine width={width * 0.25} />
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
                            <PlaceholderLine width={width * 0.25} />
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
                            <PlaceholderLine width={width * 0.25} />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>
                </View>
            </Fragment>
        );
    }
    const renderSkelatonLoadingVerticalHorizontal = () => {
        return (
            <View style={styles.rowOnly}>
                <View style={styles.columnOnly}>
                    <Placeholder
                        Animation={Fade}
                        Left={props => (
                            <PlaceholderMedia
                              isRound={true}
                              style={[styles.placeholderMedia, props.style]}
                            />
                        )}
                    />
                </View>
                <View style={styles.columnOnly}>
                    <Placeholder
                        Animation={Fade}
                        Left={props => (
                            <PlaceholderMedia
                              isRound={true}
                              style={[styles.placeholderMedia, props.style]}
                            />
                        )}
                    />
                </View>
                <View style={styles.columnOnly}>
                    <Placeholder
                        Animation={Fade}
                        Left={props => (
                            <PlaceholderMedia
                              isRound={true}
                              style={[styles.placeholderMedia, props.style]}
                            />
                        )}
                    />
                </View>
                <View style={styles.columnOnly}>
                    <Placeholder
                        Animation={Fade}
                        Left={props => (
                            <PlaceholderMedia
                              isRound={true}
                              style={[styles.placeholderMedia, props.style]}
                            />
                        )}
                    />
                </View>
                <View style={styles.columnOnly}>
                    <Placeholder
                        Animation={Fade}
                        Left={props => (
                            <PlaceholderMedia
                              isRound={true}
                              style={[styles.placeholderMedia, props.style]}
                            />
                        )}
                    />
                </View>
                <View style={styles.columnOnly}>
                    <Placeholder
                        Animation={Fade}
                        Left={props => (
                            <PlaceholderMedia
                              isRound={true}
                              style={[styles.placeholderMedia, props.style]}
                            />
                        )}
                    />
                </View>
                <View style={styles.columnOnly}>
                    <Placeholder
                        Animation={Fade}
                        Left={props => (
                            <PlaceholderMedia
                              isRound={true}
                              style={[styles.placeholderMedia, props.style]}
                            />
                        )}
                    />
                </View>
                <View style={styles.columnOnly}>
                    <Placeholder
                        Animation={Fade}
                        Left={props => (
                            <PlaceholderMedia
                              isRound={true}
                              style={[styles.placeholderMedia, props.style]}
                            />
                        )}
                    />
                </View>
            </View>
        );
    }

    const renderHorizontalScrollerLinks = () => {
        return (
            <Fragment>
                <View style={styles.flatlistContainer}>
                    <FlatList
                        contentContainerStyle={styles.horizontalListCustom}
                        data={navigationalLinks}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderSliderNavigationalLinks}
                        horizontal={true}
                        ListEmptyComponent={renderSkelatonLoadingVerticalHorizontal}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </Fragment>
        );
    }
    const renderStatItem = ({ item }) => (
        <View style={styles.statItem}>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statsCategory}>{item.category}</Text>
        </View>
    );

    const renderContent = () => {
        return (
            <ParallaxScroll
                renderHeader={({ animatedValue }) => <Fragment></Fragment>}
                headerHeight={0}
                height={height}
                isHeaderFixed={false}
                parallaxHeight={145}
                fadeOutParallaxForeground={true}
                renderParallaxBackground={({ animatedValue }) => <ImageBackground imageStyle={{ resizeMode: "cover" }} style={{ minWidth: width, minHeight: 300, maxHeight: 300 }} source={require("../../assets/images/ewaste10.jpg")} />}
                renderParallaxForeground={({ animatedValue }) => {
                    return (
                        <View>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Search')

                            }}>
                                <View style={styles.searchStyle}>
                                    <Image source={require("../../assets/images/icon/mag_prev_ui.png")} style={styles.iconed} />
                                    <Text style={{ ...Fonts.gray17Regular, marginLeft: Sizes.fixPadding }}>Search for a specific user?</Text>
                                </View>
                            </TouchableOpacity>
                            {newlyLanched()}
                        </View>
                    );
                }}
                parallaxBackgroundScrollSpeed={3}
                parallaxForegroundScrollSpeed={1.05}
            >
                <View style={styles.centeredList}>
                    {renderQuickPowerButtons()}
                    {header()}
                    {title({ title: 'Quick Navigation - Core Functionality' })}
                    {renderHorizontalScrollerLinks()}
                    {viewAllText()}
                    <FlatList
                        data={state.dropoffs}
                        keyExtractor={(item) => `${item.uniqueId}`}
                        renderItem={renderItem}
                        horizontal={true}
                        ListEmptyComponent={renderSkelatonLoadingVertical}
                    />
                </View>
                <View style={styles.spacer}>
                    <Text style={styles.headerText}>Electronic Waste Recycling Statistics</Text>
                    <Text style={styles.subHeaderText}>This report provides an overview of the electronic waste (e-waste) recycling efforts by EcyCycle Recycling. It includes statistics on the volume of e-waste collected, the percentage successfully recycled, and the types of devices processed.</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.statsCard}>
                        <Text style={styles.statsTitle}>Overall Stats</Text>
                        <FlatList
                            data={state.statistics}
                            renderItem={renderStatItem}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                        />
                    </View>
                </View>
                <View style={styles.spacer}>
                    <Text style={styles.headerText}>View our "drop-off" locations/depots</Text>
                    <Text style={styles.subHeaderText}>These are our <Text style={{ textDecorationLine: "underline", fontWeight: "bold" }}>drop-off depots/points</Text> where you can deliver/drop-off your e-waste (electronic waste)</Text>
                </View>
                <FlatList
                    contentContainerStyle={styles.centeredListTwo}
                    data={state.dropoffs}
                    keyExtractor={(item) => `${item.uniqueId}`}
                    renderItem={renderItem}
                    ListEmptyComponent={renderSkelatonLoadingVertical}
                    numColumns={2}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                />
            </ParallaxScroll>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
            {/* <StatusBar translucent={false} backgroundColor={"#fff"} /> */}
            {renderContent()}
        </SafeAreaView>
    );
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data,
        systemState: state.systemSettings.systemCurrentState
    }
}

HomeScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default connect(mapStateToProps, { updateChangeSystemSettings })(HomeScreen);