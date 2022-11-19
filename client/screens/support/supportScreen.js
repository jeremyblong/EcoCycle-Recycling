import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, TextInput, StyleSheet, TouchableOpacity, BackHandler, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { TransitionPresets } from 'react-navigation-stack';

class SupportScreen extends Component {
    state = {
        name: '',
        nameFieldColor: '#CBCBCC',
        email: '',
        emailFieldColor: '#CBCBCC',
        description: '',
        descriptionFieldColor: '#CBCBCC',
    }

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
                    <ScrollView>
                        {this.nameTextField()}
                        {this.emailTextField()}
                        {this.descriptionTextField()}
                        {this.submitButton()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.goBack()}
                style={styles.submitButtonContainerStyle}>
                <Text style={{ ...Fonts.white16SemiBold }}>Submit</Text>
            </TouchableOpacity>
        )
    }

    descriptionTextField() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 2.0 }}>
                <TextInput
                    style={{
                        borderColor: this.state.descriptionFieldColor,
                        ...styles.textFieldContainerStyle,
                    }}
                    value={this.state.description}
                    onChangeText={(text) => this.setState({ description: text })}
                    placeholder="Write here"
                    onFocus={() => this.setState({ descriptionFieldColor: Colors.primaryColor })}
                    onBlur={() => this.setState({ descriptionFieldColor: '#CBCBCC' })}
                    multiline
                    numberOfLines={5}
                />
            </View>
        )
    }

    emailTextField() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 2.0 }}>
                <TextInput
                    style={{
                        borderColor: this.state.emailFieldColor,
                        ...styles.textFieldContainerStyle,
                    }}
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                    placeholder="Email address"
                    onFocus={() => this.setState({ emailFieldColor: Colors.primaryColor })}
                    onBlur={() => this.setState({ emailFieldColor: '#CBCBCC' })}
                />
            </View>
        )
    }

    nameTextField() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 2.0 }}>
                <TextInput
                    style={{
                        borderColor: this.state.nameFieldColor,
                        ...styles.textFieldContainerStyle,
                    }}
                    value={this.state.name}
                    onChangeText={(text) => this.setState({ name: text })}
                    placeholder="Name"
                    onFocus={() => this.setState({ nameFieldColor: Colors.primaryColor })}
                    onBlur={() => this.setState({ nameFieldColor: '#CBCBCC' })}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textFieldContainerStyle: {
        borderWidth: 1.8,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingLeft: Sizes.fixPadding + 5.0,
        ...Fonts.black16Medium
    },
    submitButtonContainerStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding * 3.0
    }
})

SupportScreen.navigationOptions = {
    headerTitleStyle: { ...Fonts.white17SemiBold, marginLeft: -Sizes.fixPadding * 2.0, },
    headerStyle: {
        backgroundColor: Colors.primaryColor,
    },
    headerTintColor: 'white',
    ...TransitionPresets.SlideFromRightIOS,
}

export default withNavigation(SupportScreen);