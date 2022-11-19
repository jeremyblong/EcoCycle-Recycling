
import React from "react";
import { View } from "react-native";
// import * as Font from "expo-font";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default class LoadingScreen extends React.Component {
    async componentDidMount() {
        // await Font.loadAsync({
        //     Montserrat_Bold: require("../assets/fonts/Montserrat-Bold.ttf"),
        //     Montserrat_Light: require("../assets/fonts/Montserrat-Light.ttf"),
        //     Montserrat_Medium: require("../assets/fonts/Montserrat-Medium.ttf"),
        //     Montserrat_Regular: require("../assets/fonts/Montserrat-Regular.ttf"),
        //     Montserrat_SemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
        // });
        this.props.navigation.navigate('Splash');
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}></View>
        )
    }
}

