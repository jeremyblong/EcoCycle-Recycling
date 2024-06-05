import React, { Fragment, useEffect, useRef, useState } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, ImageBackground } from "react-native";
import { Colors, Fonts } from "../constants/styles";
import { CircleFade } from 'react-native-animated-spinkit';
import { connect } from "react-redux";
import _ from "lodash";
import { withNavigation } from "react-navigation";
import { useRoute } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import axios from "axios";
import { BASE_URL } from "@env";
// import Video from 'react-native-video';

const SplashScreen = (props) => {

    const route = useRoute();

    // const [ showVideo, setVideoState ] = useState(true);

    // const videoLoadingRef = useRef(null);

    console.log("route", route);

    const getFCMToken = async () => {
        const fcmToken = await messaging().getToken();
        
        if (fcmToken) {
            console.log("Your Firebase Token is:", fcmToken);
            
            axios.post(`${BASE_URL}/save/firebase/token`, {
                token: fcmToken,
                unique_id: props.authData.uniqueId
            }).then((res) => {
                if (res.data.message === "Saved firebase token!") {
                    console.log(res.data);
                } else {
                    console.log("err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log("Failed", "No token received");
        }
    }

    useEffect(() => {

        getFCMToken();

        if (_.has(props.authData, "authenticated") && props.authData.authenticated === true) {
            props.navigation.navigate('BottomTabScreen', { index: 1 });
        } else {
            // if (route.name !== "OTP" && route.name !== "Register" && route.name !== "SecurePin" && route.name === "Splash") {
            //     props.navigation.navigate('SignIn');
            // } 
            props.navigation.navigate('SignIn');
        }
    }, []);

    // const onBuffer = (value) => {
    //     console.log("onBuffer ran...", value);
    // }
    // const videoError = (value) => {
    //     console.log("videoError ran...", value);

    //     setVideoState(false);
    // }
    // const renderConditionalView = () => {
    //     if (showVideo === false) {
    //         return (
    //             <Fragment>
    //                 <Video source={require("../assets/videos/loading.mp4")}
    //                     ref={videoLoadingRef}        
    //                     onBuffer={onBuffer}  
    //                     onError={videoError}
    //                     style={styles.backgroundVideo} 
    //                     resizeMode={"cover"}
    //                 />
    //             </Fragment>
    //         );
    //     } else {
    //         return (
    //             <Fragment>
    //                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 22.5 }}>
    //                     <Text style={{ color: "#000", fontSize: 39.25, fontWeight: "bold", textAlign: "center", lineHeight: 62.5 }}>
    //                         <Text style={{ color: "#fff", fontWeight: "bold", textDecorationLine: "underline", textAlign: "center" }}>ElectraCycle {"\n"}E-Waste Recovery</Text> {"\n"}Paying <Text style={{ color: "#fff", textDecorationLine: "underline", fontWeight: "bold" }}>CASH</Text> for used{"\n"}electronics <Text style={{ color: "#fff", textDecorationLine: "underline", fontWeight: "bold" }}>(working or not)</Text>
    //                     </Text>
    //                     <CircleFade size={70} color={Colors.whiteColor}
    //                         style={{ position: 'absolute', bottom: 50.0 }}
    //                     />
    //                 </View>
    //             </Fragment>
    //         );
    //     }
    // }
    return (
        <ImageBackground source={require("../assets/images/icon/splash.jpg")} style={{ flex: 1 }}>
            {/* <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />    */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 22.5 }}>
                <Text style={{ color: "#000", fontSize: 39.25, fontWeight: "bold", textAlign: "center", lineHeight: 62.5, position: "absolute", top: 10 }}>
                    <Text style={{ color: "#fff", fontWeight: "bold", textDecorationLine: "underline", textAlign: "center" }}>ElectraCycle {"\n"}E-Waste Recovery</Text>
                </Text>
                <CircleFade size={70} color={Colors.whiteColor}
                    style={{ position: 'absolute', bottom: 50.0 }}
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      transform : [{ rotate : '90deg' }]
    }
});

SplashScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}
const mapStateToProps = (state) => {
    return {
        authData: state.auth.data
    }
}
export default connect(mapStateToProps, {  })(withNavigation(SplashScreen));