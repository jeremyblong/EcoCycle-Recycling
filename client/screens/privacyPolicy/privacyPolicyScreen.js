import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { TransitionPresets } from 'react-navigation-stack';

class PrivacyPolicyScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View>
                    {privacyPolicyInfo()}
                    {termsOfUseInfo()}
                </View>
            </SafeAreaView>
        )
    }
}

function termsOfUseInfo() {
    return (
        <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 2.0 }}>
            <Text style={{ ...Fonts.black17SemiBold }}>Terms of Use</Text>
            {dummyText()}
        </View>
    )
}

function dummyText() {
    return (
        <Text style={{ ...Fonts.black15Medium, marginTop: Sizes.fixPadding }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book
        </Text>
    )
}

function privacyPolicyInfo() {
    return (
        <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 2.0 }}>
            <Text style={{ ...Fonts.black17SemiBold }}>Privacy Policy</Text>
            {dummyText()}
        </View>
    )
}

PrivacyPolicyScreen.navigationOptions = {
    title: 'Privacy Policy',
    headerTitleStyle: { ...Fonts.white17SemiBold, marginLeft: -Sizes.fixPadding * 2.0, },
    headerStyle: {
        backgroundColor: Colors.primaryColor,
    },
    headerTintColor: 'white',
    ...TransitionPresets.SlideFromRightIOS,
}

export default withNavigation(PrivacyPolicyScreen);