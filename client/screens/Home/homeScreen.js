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


const { width, height } = Dimensions.get("window");


const HomeScreen = ({ userData, systemState }) => {

    const [ state, setState ] = useState({
        users: [],
        promotedUsers: []
    });

    const { promotedUsers, users } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const navigation = useNavigation();

    useEffect(() => {

        navigation.addListener('focus', () => {
            console.log("mounted");

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
                source={require('../../assets/images/ewaste-banner.jpg')}
                resizeMode="cover"
                style={{
                    height: 112.5,
                    marginTop: Sizes.fixPadding + 5.0,
                    marginHorizontal: Sizes.fixPadding + 2.25,
                    borderColor: "#fff",
                    borderWidth: 6.25,
                    borderTopWidth: 0,
                    borderRadius: 12.5,
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
                            <Text style={{ ...Fonts.black20Bold, color: "#fff", textDecorationLine: "underline", fontWeight: "bold", marginVertical: Sizes.fixPadding, padding: 2.5, marginHorizontal: Sizes.fixPadding - 5 }}>View "Boosted" Profile's</Text><Image source={require("../../assets/images/icon/right.png")} style={styles.iconRightSmallish} />
                        </View>
                        <Text style={styles.subHeaderText}>These are promoted/boosted profiles - these people are eager to meet new people and are our top users!</Text>
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
                                <Image source={require("../../assets/images/icon/star.png")} style={{ ...styles.iconed, marginTop: 6.25, marginLeft: 2.25 }} />
                                <Text style={styles.starTextNum}>({calculation})</Text>
                            </View>
                        </View>
          
                    </View>
               </View>
            </TouchableOpacity>
        );
    }

    const renderItem = ({ item, index }) => {

        const { firstName, lastName, username, profilePictures, verificationCompleted, registrationDate, reviews, totalUniqueViews } = item;
        const lastImage = (typeof profilePictures !== "undefined" && profilePictures.length > 0) ? `${BASE_ASSET_URL}/${profilePictures[profilePictures.length - 1].link}` : null;
        const calculation = calculateStarRatingNumerical(reviews);
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('MainProfileViewScreen', { user: item })}
                style={styles.labAndCheckUpContainer}
                key={index}
            >
               <View style={styles.column}>
                    <View style={styles.rowCustom}>
                        {lastImage !== null ? <Image
                            source={{ uri: lastImage }}
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
                                <Image source={require("../../assets/images/icon/star.png")} style={{ ...styles.iconed, marginTop: 6.25, marginLeft: 2.25 }} />
                                <Text style={styles.starTextNum}>({calculation})</Text>
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
        const menuQuickLinks = ["Setup A New Device (All Ranges)", "Manage Existing Devices", "Help & Support", "Shop New Device's & Additions", "Manage Account", "View Your 'Logs'"];

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
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 82.5, marginBottom: 32.5 }}>
                        <Image source={require("../../assets/images/icon/menu.png")} style={styles.iconed} />
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
                            <View style={styles.centerOnly}>
                                <View style={styles.thickerHR} />
                            </View>
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
    const renderContent = () => {
        return (
            <ParallaxScroll
                renderHeader={({ animatedValue }) => <Fragment></Fragment>}
                headerHeight={0}
                height={height}
                isHeaderFixed={false}
                parallaxHeight={145}
                fadeOutParallaxForeground={true}
                renderParallaxBackground={({ animatedValue }) => <ImageBackground imageStyle={{ resizeMode: "cover" }} style={{ minWidth: width, minHeight: 300, maxHeight: 300 }} source={require("../../assets/images/trash-8.jpg")} />}
                renderParallaxForeground={({ animatedValue }) => {
                    return (
                        <View>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Search')

                            }}>
                                <View style={styles.searchStyle}>
                                    <Image source={require("../../assets/images/icon/search.png")} style={styles.iconed} />
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
                <FlatList
                    ListHeaderComponent={() => (
                        <View>
                            {renderQuickPowerButtons()}
                            {header()}
                            {title({ title: 'Quick Navigation - Core Functionality' })}
                            {renderHorizontalScrollerLinks()}
                            {viewAllText()}
                        </View>
                    )}
                    contentContainerStyle={styles.centeredList}
                    data={promotedUsers.slice(0, 8)}
                    keyExtractor={(item) => `${item.uniqueId}`}
                    renderItem={promotedRenderItem}
                    numColumns={2}
                    horizontal={false}
                    ListEmptyComponent={renderSkelatonLoadingVertical}
                    showsVerticalScrollIndicator={false}
                />
                <View style={styles.spacer}>
                    <Text style={styles.headerText}>View our un-promoted user account's</Text>
                    <Text style={styles.subHeaderText}>These are standard user accounts that've <Text style={{ textDecorationLine: "underline", fontWeight: "bold" }}>not</Text> been promoted but they are no different from promoted accounts, the promoted just paid to be shown via priority view(s)...</Text>
                </View>
                <View style={styles.flatlistContainer}>
                    <FlatList
                        contentContainerStyle={styles.horizontalUsers}
                        data={profilePicList.slice(0, 9)}
                        keyExtractor={(item) => `${item.uniqueId}`}
                        renderItem={renderSliderImages}
                        horizontal={true}
                        ListEmptyComponent={renderSkelatonLoadingVerticalHorizontal}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <FlatList
                    contentContainerStyle={styles.centeredListTwo}
                    data={users}
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
            <StatusBar translucent={false} backgroundColor={Colors.primary} />
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