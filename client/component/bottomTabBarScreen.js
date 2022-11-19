import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import HomeScreen from "../screens/Home/homeScreen.js";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RenderMapViewTransportViewElectronicWaste from "../screens/dropoffDeliveries/mainDropoffDeliveriesView.js";
import NearbyBreakinAlertOccurances from "../screens/nearbyAlerts/nearbyBreakinAlertOccurances.js";
// import ChatScreen from "../screens/Chat/ChatScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { Colors, Sizes } from "../constants/styles.js";
import { useNavigation } from "@react-navigation/native";
import WaitingToHaveDeliveryAcceptedHelper from "../screens/dropoffDeliveries/waitToBeFulfilled/waitingForOrderConfirmation.js";


const Tab = createBottomTabNavigator();

const MyCustomTabs = (props) => {
    const navigation = useNavigation();

    const calculateProperRoute = () => {
        console.log("HERE IT IS!", props.props.route.params.redirectTabTwo);

        if ((props.props.route.params.redirectTabTwo === true) || (props.props.route.params.redirectTabTwo === false)) {
            return "Nearby";
        } else {
            return "Home";
        }
    }
    return (
        <Tab.Navigator
            initialRouteName={calculateProperRoute(props)}
            tabBarOptions={{
                activeTintColor: '#fff',
                inactiveTintColor: 'lightgray',
                activeBackgroundColor: Colors.secondaryColor,
                inactiveBackgroundColor: '#000',
                showLabel: false,
                style: {
                    height: 70.0, 
                    elevation: 0.0, 
                    borderTopWidth: 0, 
                    backgroundColor: 'black', 
                    position: "absolute", 
                    borderTopColor: "white",
                    borderTopWidth: 2.5, 
                }
            }}
            screenOptions={{
                showLabel: false,
                tabBarStyle: { height: 70, borderTopColor: Colors.secondaryColor, borderTopWidth: 2.25, },
                headerShown: false,
                activeTintColor: '#6979F8'
            }}
        >
            <Tab.Screen
                name="AvailableDropoffContractsPending"
                component={WaitingToHaveDeliveryAcceptedHelper}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ tintColor, focused }) => (
                        focused ?
                            <TouchableOpacity style={styles.circleStyle}>
                                <Image source={require("../assets/images/icon/contract.png")} style={styles.activeIconCustom} />
                            </TouchableOpacity>
                            : <Image source={require("../assets/images/icon/contract.png")} style={styles.iconCustom} />
                    )
                }}
            />
            <Tab.Screen
                name="Feed"
                component={RenderMapViewTransportViewElectronicWaste}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ tintColor, focused }) => (
                        focused ?
                            <TouchableOpacity style={styles.circleStyle}>
                                <Image source={require("../assets/images/icon/car.png")} style={styles.activeIconCustom} />
                            </TouchableOpacity>
                            : <Image source={require("../assets/images/icon/car.png")} style={styles.iconCustom} />
                    )
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ tintColor }) => (
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 30, // space from bottombar
                                height: 75,
                                width: 75,
                                borderRadius: 75,
                                backgroundColor: '#5a95ff',
                                borderColor: "#fff",
                                borderWidth: 4,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={require("../assets/images/icon/home.png")}
                                style={{
                                    width: 40,
                                    height: 40,
                                    tintColor: '#f1f6f9',
                                    alignContent: 'center',
                                }}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Nearby"
                listeners={{
                    tabPress: e => {
                        // Prevent default action
                        e.preventDefault();

                        navigation.navigate('BottomTabScreen', { redirectTabTwo: false, screen: "Nearby" })
                    },
                }}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ tintColor, focused }) => (
                        focused ?
                            <TouchableOpacity style={styles.circleStyle}>
                                <Image source={require("../assets/images/icon/social-location.png")} style={styles.activeIconCustom} />
                            </TouchableOpacity>
                            : <Image source={require("../assets/images/icon/social-location.png")} style={styles.iconCustom} />
                    ),
                }}
            >
                {() => <NearbyBreakinAlertOccurances props={props} />}
            </Tab.Screen>
             <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    header: () => null,
                    tabBarLabel: () => null,
                    tabBarIcon: ({ tintColor, focused }) => (
                        focused ?
                            <TouchableOpacity style={styles.circleStyle}>
                                <Image source={require("../assets/images/icon/settings-gradient.png")} style={styles.activeIconCustom} />
                            </TouchableOpacity>
                            : <Image source={require("../assets/images/icon/settings-gradient.png")} style={styles.iconCustom} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

class BottomTabBarScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        BackHandler.exitApp();
        return true;
    };

    currentIndex = this.props.route.params.index;

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyCustomTabs props={this.props} />
            </View>
        )
    }

    bottomTabBarItem({ index, selectedIcon, blurIcon }) {
        return (
            <TouchableOpacity activeOpacity={0.9}
                onPress={() =>
                    this.props.navigation.push('BottomTabScreen', {
                        index: index,
                    })
                }
            >
                <Image
                    source={
                        this.currentIndex == index ?
                            selectedIcon :
                            blurIcon
                    }
                    resizeMode="contain"
                    style={{ height: 25.0, width: 25.0 }}
                />
            </TouchableOpacity>
        )
    }
}

BottomTabBarScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(BottomTabBarScreen);

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 65.0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30.0,
    },
    activeIconCustom: {
        minWidth: 50,
        minHeight: 50,
        borderRadius: 5,
        maxWidth: 50,
        maxHeight: 50,
        tintColor: "#fff"
    },
    iconCustom: {
        minWidth: 50,
        minHeight: 50,
        borderRadius: 5,
        maxWidth: 50,
        maxHeight: 50
    }, 
    animatedView: {
        alignSelf: 'center',
        backgroundColor: "black",
        position: "absolute",
        bottom: -80,
        borderRadius: Sizes.fixPadding * 2.0,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0
    },
})



