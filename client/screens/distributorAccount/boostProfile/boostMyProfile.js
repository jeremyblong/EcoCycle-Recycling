import React, { Fragment, useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text, View, ScrollView, Dimensions, TouchableOpacity, FlatList, Image } from "react-native";
import { Colors, Fonts, Sizes } from "../../../constants/styles.js";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Snackbar } from "react-native-paper";
import Dialog from "react-native-dialog";
import styles from "./boostMyProfileStyles.js";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import { BASE_URL, BASE_ASSET_URL } from "@env";
import { connect } from "react-redux";
import axios from "axios";
import disc from '@jsamr/counter-style/presets/disc';
import MarkedList from '@jsamr/react-native-li';
import Toast from 'react-native-toast-message';
                    
const { width } = Dimensions.get('screen');

const boostOptions = [
    {
        id: '1',
        fieldOrCategory: '1 Day Boost!',
        hours: 24,
        cost: 100
    },
    {
        id: '2',
        fieldOrCategory: '2 Day Boost!',
        hours: 48,
        cost: 200
    },
    {
        id: '1',
        fieldOrCategory: '3 Day Boost!',
        hours: 72,
        cost: 500
    },
    {
        id: '2',
        fieldOrCategory: '4 Day Boost!',
        hours: 96,
        cost: 750
    },
    {
        id: '1',
        fieldOrCategory: '5 Day Boost!',
        hours: 120,
        cost: 1000
    }
];

const bulletedOptions = [{
    value: "Be seen more often than other dropoff location's",
    label: "Be seen more often than other dropoff location's"
}, {
    value: "Earn MORE MONEY through dropoff's with old electronics",
    label: "Earn MORE MONEY through dropoff's with old electronics"
}, {
    value: "Fill your palleted-container sooner for a quicker payout!",
    label: "Fill your palleted-container sooner for a quicker payout!"
}, {
    value: "Build your repor or successful dropoff 'count' faster so other user's feel more trusted with your listing..",
    label: "Build your repor or successful dropoff 'count' faster so other user's feel more trusted with your listing.."
}, {
    value: "Boost your listing at an appropriate time for maxiumum exposure, be strategic with your boost!",
    label: "Boost your listing at an appropriate time for maxiumum exposure, be strategic with your boost!"
}]

const BoostAccountDropoffDepotProfile = ({ authData }) => {

    const navigation = useNavigation();

    const [ state, setState ] = useState({
        showSnackBar: false,
        isSavedJob: false,
        showApplyJobDialog: false,
        selected: null,
        isApply: false,
        user: null,
        profilePictureLast: null
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        showSnackBar,
        isSavedJob,
        showApplyJobDialog,
        isApply,
        user
    } = state;

    useEffect(() => {
        const config = {
            params: {
                uniqueId: authData.uniqueId
            }
        }

        axios.get(`${BASE_URL}/gather/general/information/user`, config).then((res) => {
            if (res.data.message === "Gathered user successfully!") {
                console.log(res.data);

                const { user } = res.data;

                updateState({
                    profilePictureLast: _.has(user, "profilePictures") && user.profilePictures.length > 0 ? `${BASE_ASSET_URL}/${user.profilePictures[user.profilePictures.length - 1].link}` : null,
                    user
                });

            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const handleBoostSubmission = () => {
        console.log("handleBoostSubmission clicked/ran...");

        const { selected } = state;

        const config = {
            uniqueId: authData.uniqueId,
            selected,
            user
        }

        axios.post(`${BASE_URL}/boost/profile/dropoff/account/type`, config).then((res) => {
            if (res.data.message === "Successfully boosted account!") {
                console.log(res.data);
                
                Toast.show({
                    type: 'success',
                    text1: `Successfully 'BOOSTED' your profile!`,
                    text2: `You've successfully boosted your profile - your profile will now be shown in priority for the next ${selected.hours} hours...`,
                    visibilityTime: 3250,
                    position: "bottom",
                    onHide: () => {
                        navigation.navigate('BottomTabScreen', { screen: "Home" })
                    }
                });
            } else {
                console.log("Err", res.data);

                Toast.show({
                    type: 'error',
                    text1: `An error occurred while attempting to boost your profile!`,
                    text2: `An error occurred - please try this again again or contact support if the problem persists.`,
                    visibilityTime: 3250,
                    position: "bottom"
                });
            }
        }).catch((err) => {
            console.log(err);

            Toast.show({
                type: 'error',
                text1: `An error occurred while attempting to boost your profile!`,
                text2: `An error occurred - please try this again again or contact support if the problem persists.`,
                visibilityTime: 3250,
                position: "bottom"
            });
        })
    }

    const applyJobDialog = () => {
        return (
            <Dialog.Container
                visible={showApplyJobDialog}
                contentStyle={styles.applyJobDialogWrapStyle}
                headerStyle={{ margin: 0.0 }}
            >
                <Text style={{
                    ...Fonts.blackColor18SemiBold,
                    paddingTop: Sizes.fixPadding - 5.0,
                    paddingBottom: Sizes.fixPadding + 5.0
                }}>
                    Are you sure you'd like to 'boost' your account? You have 1 limited boost(s) PER MONTH so please use them wisely
                </Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: Sizes.fixPadding,
                }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showApplyJobDialog: false })}
                        style={styles.cancelButtonStyle}>
                        <Text style={{ ...Fonts.blackColor14SemiBold }}>
                            CANCEL
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            updateState({
                                showApplyJobDialog: false,
                                isApply: true
                            })

                            handleBoostSubmission();
                        }}
                        style={styles.sureButtonStyle}>
                        <Text style={{ ...Fonts.whiteColor14SemiBold, color: "#fff" }}>
                            YES, BOOST!
                        </Text>
                    </TouchableOpacity>
                </View>
            </Dialog.Container>
        )
    }

    const applyAndSavedButton = () => {
        return (
            <View style={styles.applyedAndSavedButtonWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        if (state.selected !== null) {
                            if (!isApply) {
                                updateState({ showApplyJobDialog: true })
                            } 
                        } else {
                            Toast.show({
                                type: 'error',
                                text1: `You MUST select a specific 'boost interval' first!`,
                                text2: `You must first select a boost-interval from the black buttons before attempting to 'boost' your account - try this action again after you've selected an appropriate option..`,
                                visibilityTime: 3250,
                                position: "bottom"
                            });
                        }
                    }}
                    style={{
                        backgroundColor: isApply ? Colors.grayColor : Colors.secondaryColor,
                        ...styles.applyButtonStyle
                    }}>
                    <Text style={{ ...Fonts.whiteColor14SemiBold, color: "#fff", fontWeight: "bold" }}>
                        Boost My Account/Profile!
                    </Text>
                </TouchableOpacity>
                <View style={styles.savedButtonWrapStyle}>
                    <Image
                        source={require('../../../assets/images/rocket_prev_ui.png')}
                        style={{ width: 60, height: 60 }}
                    />
                </View>
            </View>
        )
    }

    const fieldAndCategoryInfo = () => {

        const renderItem = ({ item }) => (
            <TouchableOpacity onPress={() => setState(prevState => {
                return {
                    ...prevState,
                    selected: item
                }
            })} style={styles.fieldAndCategoryWrapStyle}>
                <Text numberOfLines={4} style={{ ...Fonts.whiteColor14SemiBold, color: "#fff" }}>
                    <Text style={{ fontWeight: "bold", color: Colors.secondaryColor, textDecorationLine: "underline" }}>{item.fieldOrCategory}</Text>{"\n"}{`Costs: ${item.cost} coin's`}
                </Text>
            </TouchableOpacity>
        )

        return (
            <View>
                <Text style={{ margin: Sizes.fixPadding + 5.0, ...Fonts.blackColor18SemiBold,  fontWeight: "bold", color: "#000" }}>
                    Boost Option's
                </Text>
                <View style={{
                    backgroundColor: Colors.whiteColor,
                    paddingVertical: Sizes.fixPadding * 2.0,
                }}>
                    <FlatList
                        data={boostOptions}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingLeft: Sizes.fixPadding + 5.0,
                            paddingRight: Sizes.fixPadding - 5.0
                        }}
                    />
                </View>
            </View>
        )
    }

    const jobDescriptionInfo = () => {
        return (
            <View>
                <Text style={{ margin: Sizes.fixPadding + 5.0, ...Fonts.blackColor18SemiBold, fontWeight: "bold", color: "#000" }}>
                    What is a 'profile boost'?
                </Text>
                <View style={{ padding: Sizes.fixPadding + 5.0, backgroundColor: Colors.whiteColor }}>
                    <Text style={{ textAlign: 'justify', ...Fonts.grayColor16Regular }}>
                        Profile boost's allow your profile to be seen by MORE people leading to <Text style={{ fontWeight: "bold", color: Colors.secondaryColor }}>MORE electronic waste dropoffs & more earned income/revenue</Text>. Every time you ship-off a pallet you'll earn money <Text style={{ fontWeight: "bold", color: Colors.primaryColor }}>(cryptocurrency to be converted to USD-$ dollars)</Text> so it's in your best interest to monitize & promote your account for more drop's, this will help you do that properly...
                    </Text>
                </View>
            </View>
        )
    }
    const renderProfilePicture = () => {
        const { profilePictureLast } = state;

        if (profilePictureLast !== null) {
            return <Image
                source={{ uri: profilePictureLast }}
                style={{ height: 60, width: 60, borderRadius: 65 }}
                resizeMode="contain"
            />;
        } else {
            return <Image
                source={require('../../../assets/images/blank-profile-pic.png')}
                style={{ height: 60, width: 60, borderRadius: 65 }}
                resizeMode="contain"
            />;
        }
    }
    const jobDetail = () => {
        return (
            <View style={{
                backgroundColor: Colors.whiteColor,
                padding: Sizes.fixPadding + 5.0,
                flexDirection: 'row',
            }}>
                {renderProfilePicture()}
                {user !== null ? <View style={{ marginLeft: Sizes.fixPadding, }}>
                    <Text style={{ ...Fonts.blackColor18SemiBold, maxWidth: width * 0.725 }}>
                        We're about to BOOST YOUR PROFILE (If you choose to do so)!
                    </Text>
                    <Text style={{
                        maxWidth: width - 120,
                        fontWeight: "bold",
                        ...Fonts.primaryColor14Regular
                    }}>
                        {`${user.firstName} ${user.lastName} ~ @${user.username}`}
                    </Text>
                </View> : null}
            </View>
        )
    }
    const calulateBoostAdvantages = () => {
        return (
            <Fragment>
                <View style={styles.toppedBreaker}>
                    <Text style={styles.labeled}>Here are some tips/pointers or advantages of using 'boosts' to when or how to use them...</Text>
                    <MarkedList counterRenderer={disc}>
                        {bulletedOptions.map((item) => (
                            <View key={item.id} style={styles.rowItem}>
                                <Text style={styles.innerText}>{item.label}</Text>
                            </View>
                        ))}
                    </MarkedList>
                </View>
            </Fragment>
        );
    }

    const header = () => {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.whiteColor20Regular, color: "#000" }}>
                    Promote/'Boost' Your Dropoff Account
                </Text>
                <Image
                    source={require('../../../assets/images/rocket2_prev_ui.png')}
                    style={{ position: 'absolute', left: 12.0, width: 42.5, height: 42.5 }}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            {/* <StatusBar backgroundColor={Colors.primaryColor} /> */}
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: Sizes.fixPadding * 12.0
                    }}
                >
                    {jobDetail()}
                    {jobDescriptionInfo()}
                    {fieldAndCategoryInfo()}
                    {calulateBoostAdvantages()}
                </ScrollView>
                {applyAndSavedButton()}
                {applyJobDialog()}
            </View>
            <Snackbar
                visible={showSnackBar}
                onDismiss={() => updateState({ showSnackBar: false })}
                style={styles.snackBarStyle}
            >
                {
                    isSavedJob ?
                        'Added to Saved Jobs' :
                        'Removed from Saved Jobs'
                }
            </Snackbar>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => {
    return {
        authData: state.auth.data
    }
}

export default connect(mapStateToProps, {  })(BoostAccountDropoffDepotProfile);