import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, BackHandler } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from "react-native";
import { TransitionPresets } from 'react-navigation-stack';

export default class WrongScreen extends Component {

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
            <SafeAreaView style={styles.pageStyle}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <Text style={{ ...Fonts.black19SemiBold, marginTop: Sizes.fixPadding + 5.0 }}>
                    Oops.. Something Went Wrong!
                </Text>
                <View style={styles.wrongIconContainerStyle}>
                    <Icon name="close-sharp" size={50} color="white" />
                </View>
                <View>
                    <Text style={{
                        ...Fonts.gray15Medium,
                        textAlign: 'center',
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        marginBottom: Sizes.fixPadding * 2.0
                    }}>
                        You order of buy 2.0658 Bitcoin (Btc) at price of $37,568 has cancelled unfortunately.Try again.
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.okButtonStyle}
                        onPress={() => this.props.navigation.navigate('BottomTabScreen', { index: 1 })}
                    >
                        <Text style={{ ...Fonts.white16Medium }}>Okay!</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    okButtonStyle: {
        backgroundColor: Colors.darkerBlue,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 2.0
    },
    wrongIconContainerStyle: {
        height: 150.0,
        width: 150.0,
        borderRadius: 75.0,
        alignItems: 'center',
        backgroundColor: Colors.darkerBlue,
        borderColor: '#F6AAAC',
        borderWidth: 15.0,
        justifyContent: 'center'
    },
    pageStyle: {
        flex: 1,
        backgroundColor: Colors.backColor,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

WrongScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.RevealFromBottomAndroid,
    }
}