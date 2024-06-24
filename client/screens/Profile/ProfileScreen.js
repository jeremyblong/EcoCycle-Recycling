import React, { Fragment, useState } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView, StatusBar, Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import Dialog from "react-native-dialog";
import { useNavigation } from "@react-navigation/native";
import { authentication } from "../../redux/actions/authentication/auth.js";
import { connect } from "react-redux";
import { withNavigation } from 'react-navigation';
import { BASE_ASSET_URL } from "@env";
import _ from "lodash";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";


const { width, height } = Dimensions.get('screen');

const ProfileScreen = ({ authentication, userData }) => {

    const navigation = useNavigation();

    const [isLogout, setIsLogout] = useState(false);

    const renderImageLoading = (image) => {
        if (image !== null) {
            return <Image source={{ uri: `${BASE_ASSET_URL}/${image}` }}
                style={{ height: 55.0, width: 55.0, borderRadius: 27.0, borderWidth: 1.75, borderColor: "#fff" }}
                resizeMode="contain"
            />;
        } else {
            return (
                <Placeholder
                    style={{ maxHeight: 55, left: 0, maxWidth: 60 }}
                    Animation={Fade}
                >
                    <PlaceholderLine width={95} height={50} />
                </Placeholder>
            );
        }
    }

    const userInfo = () => {
        const last = typeof userData.profilePictures[userData.profilePictures.length - 1] !== "undefined" && userData.profilePictures[userData.profilePictures.length - 1] !== null && typeof userData.profilePictures[userData.profilePictures.length - 1] === "object" ? userData.profilePictures[userData.profilePictures.length - 1].link : null;

        if (last !== null) {
            return (
                <View style={styles.profileInfoContainerStyle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {renderImageLoading(last)}
                        <View style={{ flexDirection: "column", display: "flex" }}>
                            <Text style={{ ...Fonts.white20Bold, marginLeft: Sizes.fixPadding, color: "#fff", fontWeight: "bold", fontSize: 20 }}>
                                {`${userData.firstName} ${userData.lastName}`}
                            </Text>
                            <Text style={{ ...Fonts.white20Bold, marginLeft: Sizes.fixPadding, color: "#fff", fontSize: 18.25 }}>
                                @{userData.username}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('EditProfile')}>
                        <Text style={{ ...Fonts.primaryColorBold, color: Colors.primaryColor, fontWeight: "bold" }}>Edit Profile</Text>
                    </TouchableOpacity>

                </View>
            )
        } else {
            return null;
        }
    }

    const divider = () => {
        return (
            <View style={{ height: 1.00, backgroundColor: Colors.lightGray }}></View>
        )
    }

    const title = ({ title }) => {
        return (
            <Text style={{
                ...Fonts.white20Bold,
                color: Colors.secondaryColor,
                fontWeight: "bold",
                fontSize: 17.25,
                marginVertical: Sizes.fixPadding + 5.0,
                marginHorizontal: Sizes.fixPadding * 2.0
            }}>
                {title}
            </Text>
        )
    }

    const infoAll = ({ icon, backColor, frontColor, title, }) => {

        return (
            <View style={styles.infoContainerStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{
                        ...styles.infoContainerCircleStyle,
                        backgroundColor: backColor,
                        borderColor: frontColor,
                    }}>
                        {icon}
                    </View>
                    <Text style={{ ...Fonts.white17Bold, marginLeft: Sizes.fixPadding }}>
                        {title}
                    </Text>
                </View>
                <Image source={require("../../assets/images/awesomearrow.png")} style={{ maxWidth: 35, maxHeight: 35 }} />
            </View>
        )

    }

    const shortDivider = () => {
        return (
            <Fragment>
                <View style={styles.centeredOnly}>
                    <View style={styles.shortDivider} />
                </View>
            </Fragment>
        )
    }

    const handleLogoutSubmission = () => {

        authentication({ authenticated: false });

        navigation.replace('SignIn');
    }
    const logOutDialog = () => {
        return (
            <Dialog.Container visible={isLogout}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.black18Bold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                        Want to logout?
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setIsLogout(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black20Regular }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                setIsLogout(false)
                               
                                handleLogoutSubmission();
                            }}
                            style={styles.logOutButtonStyle}
                        >
                            <Text style={{ ...Fonts.white20Regular, color: "#fff" }}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
                {/* <StatusBar translucent={false} backgroundColor={Colors.primary} /> */}
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 125, backgroundColor: "#000", }} style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        {typeof userData !== "undefined" && _.has(userData, "profilePictures") && userData.profilePictures.length > 0 ? userInfo() : <Text style={{ fontSize: 25, fontWeight: "bold" }}>Loading...</Text>}
                        {divider()}
                        {title({ title: 'Account Info' })}
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('EditProfile')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/icon/profile_prev_ui.png")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: 'Profile Data (Main)',

                                }
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ViewSecurityAuthenticationLogs')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/icon/logs.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: 'My Security Log(s)/History',

                                }
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ViewNotificationScreen')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/icon/noti.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: 'View Notification(s)',

                                }
                            )}
                        </TouchableOpacity>
                        {shortDivider()}
                        {title({ title: 'RECYCLING FACILITIES' })}
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('RegisterAsRecyclingFacility')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/qrcode.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: `Register as recycling facility`,

                                }
                            )}
                        </TouchableOpacity>
                        {shortDivider()}
                        {title({ title: 'Storage-Depot/Collector Related' })}
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ListNewStorageSpaceForRentDropoff')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/icon/dropoff.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: 'Post New Storage Space/Dropoff',

                                }
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('RequestANewFreightPickupDepot')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/icon/drop.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: 'Request A Freight Pick-Up',

                                }
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('BoostProfileDropoffAccount')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/icon/boost.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: 'Boost Your Profile (Drop-Off)',

                                }
                            )}
                        </TouchableOpacity>
                        {shortDivider()}
                        {title({ title: 'Distributor/Warehousing-Related' })}
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('DistributorAccountManagementCreation')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/icon/dist.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: `Distributor Account Overview`,

                                }
                            )}
                        </TouchableOpacity>
                        {/* <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ListWarehouseSpaceListing')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/icon/lease-96.png")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: `List Your Warehouse ~ Deliveries`,

                                }
                            )}
                        </TouchableOpacity> */}

                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ManageDistributorActiveLoads')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/icon/manageactiveloads.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: `Manage Active Deliveries/Loads`,

                                }
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('PreviousPaymentChartDataView')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/icon/stats.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: `Previous Earnings/Payment's`,

                                }
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('PrintQRCodeShipOff')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/qrcode.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: `Scan, Ship & Print Off QR Code`,

                                }
                            )}
                        </TouchableOpacity>
                        {shortDivider()}
                        {title({ title: 'Private Messaging/Direct Messaging' })}
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('PrivateMessagingMainView')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/icon/chat.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: 'View/Manage Private Messaging',

                                }
                            )}
                        </TouchableOpacity>
                        {shortDivider()}
                        {title({ title: `Trucking/Freight-Related Redirect's` })}
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('AvailableFreightTruckingDeliveries')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/icon/traffic.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: 'Find Available Freight Deliveries',

                                }
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('PostNewAvailableDeliveryContractForm')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/icon/fullpallet.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: 'Ship Out A Full Pallet!',

                                }
                            )}
                        </TouchableOpacity>
                        {shortDivider()}
                        {title({ title: 'Contract-Related' })}
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ActiveDropOffContractListView')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/icon/drop.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: 'ACTIVE Drop-Off Contract(s)',

                                }
                            )}
                        </TouchableOpacity>
                        {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/managecontracts.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: 'Manage Contract(s)',

                                }
                            )}
                        {shortDivider()}
                        {title({ title: 'Core Management' })}
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ManagePaymentMethodsOverview')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/paymentdata.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: 'Main Payment Overview'
                                }
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('PriceEWasteLocateDropoff')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/pricemyewaste.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: 'Price My E-Waste & Find Drop-Off',

                                }
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('CartItemsDisplayEWasteDropOffPreview')}>
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/ewasteshoppingcart.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: "View E-Waste 'Shopping Cart'"
                                }
                            )}
                        </TouchableOpacity>
                        {shortDivider()}
                        {title({ title: 'Core-Account Management' })}
                        <TouchableOpacity
                            style={{ marginTop: Sizes.fixPadding }}
                            activeOpacity={0.9}
                            onPress={() => setIsLogout(true)}
                        >
                            {infoAll(
                                {
                                    icon: <Image source={require("../../assets/images/logout.jpg")} style={styles.iconCustom} />,
                                    backColor: '#fff',
                                    frontColor: Colors.primaryColor,
                                    title: 'Logout/Sign-Out',
                                }
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {logOutDialog()}
            </SafeAreaView>
        </Fragment>
    );
}

ProfileScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

const styles = StyleSheet.create({
    profileInfoContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 1.75
    },
    centeredOnly: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    shortDivider: {
        width: "92.75%",
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
        marginTop: 6.25,
        marginBottom: 6.25
    },
    iconCustom: {
        maxWidth: 42.5,
        maxHeight: 42.5,
        borderRadius: 17.5,
        resizeMode: "cover",
        minHeight: 42.5,
        minWidth: 42.5
    },  
    infoContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding + 3.0
    },
    infoContainerCircleStyle: {
        height: 52.0, width: 52.0, borderRadius: 26.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.0
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    cancelButtonStyle: {
        flex: 0.50,
        borderWidth: 1.5, 
        borderColor: "#000",
        backgroundColor: Colors.lightGray,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    logOutButtonStyle: {
        flex: 0.50,
        borderWidth: 1.5, 
        borderColor: "#000",
        backgroundColor: Colors.secondaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    }
})

const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { authentication })(withNavigation(ProfileScreen));