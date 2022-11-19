import React, { Component, Fragment, createRef } from "react";
import { Text, View, SafeAreaView, ScrollView, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, BackHandler, Dimensions, ActivityIndicator, ImageBackground } from "react-native";
import { withNavigation } from "react-navigation";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import SvgComponentAuth from "./helpers/signinScreen/logoSvg.js";
import { launchImageLibrary } from 'react-native-image-picker';
import axios from "axios";
import { BASE_URL, BASE_ASSET_URL } from "@env";
import _ from "lodash";
import Toast from 'react-native-toast-message';
import IntlPhoneInput from 'react-native-intl-phone-input';
import { authentication } from "../../redux/actions/authentication/auth.js";
import { connect } from "react-redux";
import RNPickerSelect from 'react-native-picker-select';
import { getUniqueId, getManufacturer, getBrand, getBuildNumber, getBundleId, getCarrier, getDeviceId, getDeviceType, getDeviceName, getIpAddress, getMacAddress, getModel, getReadableVersion,getSystemVersion, getSystemName, getUserAgent, isTablet } from 'react-native-device-info';
import { CometChat } from '@cometchat-pro/react-native-chat';


const { width, height } = Dimensions.get("window"); 
//
const optionsAccountType = [
    {
        label: "Transporter/Transportation Account",
        value: "transport-account"
    },
    {
        label: "3rd Party Distribution Account",
        value: "3rd-party-distribution-account"
    },
    {
        label: "Collection Agent (Gathering E-Waste)",
        value: "collection-agent-account"
    },
    {
        label: "Storage/Drop-Off Agent",
        value: "storage-dropoff-agent-account"
    }
]

class RegisterScreen extends Component {
constructor (props) {
    super(props);

    this.state = {
        file: null,
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirm: "",
        phoneNumber: "",
        loading: false,
        accountType: null,
        referralCode: ""
    }

    this.secondInput = createRef(null);
    this.thirdInput = createRef(null);
    this.fourthInput = createRef(null);
    this.fifthInput = createRef(null);
    this.sixthInput = createRef(null);
    this.seventhInput = createRef(null);
    this.eighthInput = createRef(null);
}

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    confirmPasswordTextField = () => {
        return (
            <View style={styles.textFieldContainerStyle}>
                <TextInput
                    placeholder="Confirm Password (Min. 9 Charectors)"
                    placeholderTextColor={Colors.blackColor}
                    style={{ ...Fonts.black16Medium }}
                    secureTextEntry={true} 
                    value={this.state.confirm}
                    ref={this.sixthInput}
                    onChangeText={(value) => {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                confirm: value
                            }
                        })
                    }}
                />
            </View>
        )
    }
    
    passwordTextField = () => {
        return (
            <View style={styles.textFieldContainerStyle}>
                <TextInput
                    placeholder="Password (Min. 9 Charectors)"
                    placeholderTextColor={Colors.blackColor}
                    style={{ ...Fonts.black16Medium }}
                    secureTextEntry={true} 
                    value={this.state.password}
                    onSubmitEditing={() => this.sixthInput.current.focus()}
                    blurOnSubmit={true}
                    ref={this.fifthInput}
                    onChangeText={(value) => {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                password: value
                            }
                        })
                    }}
                />
            </View>
        )
    }
    
    emailTextField = () => {
        return (
            <View style={styles.textFieldContainerStyle}>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={Colors.blackColor}
                    style={{ ...Fonts.black16Medium }} 
                    value={this.state.email}
                    ref={this.fourthInput}
                    onSubmitEditing={() => this.fifthInput.current.focus()}
                    blurOnSubmit={true}
                    onChangeText={(value) => {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                email: value
                            }
                        })
                    }}
                />
            </View>
        )
    }
    
    userNameTextField = () => {
        return (
            <View style={styles.textFieldContainerStyle}>
                <TextInput
                    placeholder="Username"
                    placeholderTextColor={Colors.blackColor}
                    style={{ ...Fonts.black16Medium }} 
                    value={this.state.username}
                    onSubmitEditing={() => this.secondInput.current.focus()}
                    blurOnSubmit={true}
                    onChangeText={(value) => {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                username: value
                            }
                        })
                    }}
                />
            </View>
        )
    }
    firstNameTextField = () => {
        return (
            <View style={styles.textFieldContainerStyle}>
                <TextInput
                    placeholder="First Name"
                    placeholderTextColor={Colors.blackColor}
                    style={{ ...Fonts.black16Medium }} 
                    value={this.state.firstName}
                    ref={this.secondInput}
                    onSubmitEditing={() => this.thirdInput.current.focus()}
                    blurOnSubmit={true}
                    onChangeText={(value) => {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                firstName: value
                            }
                        })
                    }}
                />
            </View>
        )
    }
    lastNameTextField = () => {
        return (
            <View style={styles.textFieldContainerStyle}>
                <TextInput
                    placeholder="Last Name"
                    placeholderTextColor={Colors.blackColor}
                    style={{ ...Fonts.black16Medium }} 
                    ref={this.thirdInput}
                    onSubmitEditing={() => this.fourthInput.current.focus()}
                    blurOnSubmit={true}
                    value={this.state.lastName}
                    onChangeText={(value) => {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                lastName: value
                            }
                        })
                    }}
                />
            </View>
        )
    }
    
    registerText = () => {
        return (
            <Text style={{ ...Fonts.gray16Bold, alignSelf: 'center', marginTop: Sizes.fixPadding + 5.0, color: "#fff", fontWeight: "bold" }}>
                Register your account
            </Text>
        )
    }
    
    logo = () => {
        return (
            <SvgComponentAuth />
        )
    }

    handleBackButton = () => {
        this.props.navigation.goBack();
        return true;
    };

    handleImageSelection = async () => {

        const result = await launchImageLibrary({
            mediaType: "photo",
            quality: 1,
            includeBase64: true,
            selectionLimit: 1
        });

        if (!_.has(result, "didCancel")) {

            this.setState({
                loading: true
            })
            const asset = result.assets[0];

            const config = {
                base64: asset.base64,
                contentType: asset.type,
                filename: asset.fileName
            }

            axios.post(`${BASE_URL}/upload/misc/file/wo/saving`, config).then((res) => {
                if (res.data.message === "Uploaded successfully!") {
                    console.log(res.data);

                    const { file } = res.data;

                    this.setState({
                        file,
                        loading: false
                    })
                } else {
                    console.log("Err", res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    handleDeviceInformationFetch = () => {

        const brand = getBrand(); 
        const buildNumber = getBuildNumber();
        const bundleID = getBundleId();
        const deviceID = getDeviceId();
        const deviceType = getDeviceType();
        const deviceModel = getModel();
        const readableVersion = getReadableVersion();
        const systemVersion = getSystemVersion(); 
        const systemName = getSystemName();
        const tabletOrNot = isTablet();

        const promises = [];

        promises.push(getUniqueId().then(value => {
            return {
                label: "deviceUniqueId",
                value
            }
        }));
        promises.push(getManufacturer().then(value => {
            return {
                label: "manufacturer",
                value
            }
        }));
        promises.push(getCarrier().then(value => {
            return {
                label: "carrier",
                value
            }
        }));
        promises.push(getDeviceName().then(value => {
            return {
                label: "deviceName",
                value
            }
        }));
        promises.push(getIpAddress().then(value => {
            return {
                label: "ipAddress",
                value
            }
        }));
        promises.push(getMacAddress().then(value => {
            return {
                label: "macAddress",
                value
            }
        }));
        promises.push(getUserAgent().then(value => {
            return {
                label: "userAgent",
                value
            }
        }));

        return Promise.all(promises).then((deviceValues) => {
            const newOBJFormatted = {};
            // iterate over available values...
            for (let idxxxx = 0; idxxxx < deviceValues.length; idxxxx++) {
                const element = deviceValues[idxxxx];
                
                newOBJFormatted[element.label] = element.value;
                // check for last iteration + return...
                if ((deviceValues.length - 1) === idxxxx) {
                    // contruct the returnable object!
                    const valuesToReturn = {
                        brand,
                        buildNumber,
                        bundleID,
                        deviceID, 
                        deviceType,
                        deviceModel, 
                        readableVersion, 
                        systemVersion,
                        systemName,
                        tabletOrNot,
                        ...newOBJFormatted
                    };
                    // return final value(s)...
                    return valuesToReturn;
                }
            }
        });
    }

    handleFinalSubmission = async () => {

        const { confirm, password } = this.state;

        const deviceInfo = await this.handleDeviceInformationFetch();

        if (confirm.trim() === password.trim()) {
            const { firstName, lastName, email, username, password, confirm, file, phoneNumber, accountType, referralCode } = this.state;

            const data = {
                firstName, 
                lastName, 
                email, 
                username, 
                password, 
                confirm, 
                file,
                phoneNumber, 
                accountType,
                referralCode,
                deviceInfo
            }
    
            axios.post(`${BASE_URL}/register/new/user`, data).then((res) => {
                if (res.data.message === "Successfully registered!") {
                    console.log(res.data);

                    this.props.authentication({ ...res.data.user, authenticated: false });

                    const authKey = 'b108b20893e34ab1fbdb012f210aa1d99f1f2ff4';
                    const uid = res.data.user.uniqueId;

                    CometChat.login(uid, authKey).then((user) => {
                        console.log('Login Successful:', { user });

                        this.props.navigation.navigate('OTP');

                    }, (error) => {
                        console.log('Login failed with exception:', { error });
                    });
                } else if (res.data.message === "Code did NOT match any records, process has been cancelled - please enter a valid 'referral' code to proceed & sign-up!") {
                    
                    const { message } = res.data;

                    Toast.show({
                        type: 'error',
                        text1: `No records found with the code you've provided - enter a valid 'referral' code.`,
                        text2: message,
                        visibilityTime: 4250,
                        position: "bottom"
                    });
                } else if (res.data.message === "Could NOT find relevant 'inviting user account' - cancelling process as this attempt has failed.") {

                    Toast.show({
                        type: 'error',
                        text1: "Could NOT find relevant 'inviting user account' - cancelling process as this attempt has failed.",
                        text2: `We couldn't locate the account of the user that invited you so we are cancelling the process - please try this action again or contact support if the problem persists.`,
                        visibilityTime: 4250,
                        position: "bottom"
                    });
                } else {
                    console.log("Err", res.data);

                    const { message } = res.data;

                    Toast.show({
                        type: 'error',
                        text1: `An error occurred while attempting to register...`,
                        text2: message,
                        visibilityTime: 4250,
                        position: "bottom"
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            Toast.show({
                type: 'error',
                text1: `Password's MUST match!`,
                text2: `Your password & confirmation password must match, however they do not currently match...`,
                visibilityTime: 4250,
                position: "bottom"
            });
        }
    }

    calculateReadiness = () => {
        const { firstName, lastName, email, username, password, confirm, file, phoneNumber, accountType } = this.state;

        if ((typeof phoneNumber !== "undefined" && phoneNumber.isVerified === true) && (typeof firstName !== "undefined" && firstName.length > 0) && (typeof lastName !== "undefined" && lastName.length > 0) && (typeof email !== "undefined" && email.length > 0) && (typeof username !== "undefined" && username.length > 0) && (typeof password !== "undefined" && password.length >= 9) && (typeof confirm !== "undefined" && confirm.length >= 9) && file !== null && accountType !== null) {
            return false;
        } else {
            return true;
        }
    }

    renderProfilePictureSelection = () => {
        const { file } = this.state;
        return (
            <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 12.5 }}>
                <TouchableOpacity onPress={() => this.handleImageSelection()}>
                    {file !== null ? <Image source={{ uri: `${BASE_ASSET_URL}/${file.link}` }} style={styles.selectableIcon} /> : <Image source={require("../../assets/images/user.png")} style={styles.selectableIcon} />}
                </TouchableOpacity>
            </View>
        );
    }

    phoneNumberTextField = () => {
        return (
            <IntlPhoneInput
                value={this.state.phoneNumber}
                onChangeText={(phoneNumber) => {
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            phoneNumber
                        }
                    })
                }}
                defaultCountry="US"
                placeholder="Phone Number"
                containerStyle={styles.phoneNumberContainerStyle}
                dialCodeTextStyle={{ ...Fonts.black16Medium }}
                phoneInputStyle={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, ...Fonts.black16Medium }}
            />
        )
    }

    continueButton = () => {
        return (
            <Fragment>
                {this.state.loading === true ? <ActivityIndicator size="large" style={styles.activity} color="#fff" /> : null}
                <TouchableOpacity
                    disabled={this.calculateReadiness()}
                    activeOpacity={0.9}
                    onPress={() => this.handleFinalSubmission()}
                    style={!this.calculateReadiness() ? styles.continueButtonStyle : styles.disabledContinueButtonStyle}>
                    <Text style={!this.calculateReadiness() ? { ...Fonts.white16SemiBold } : { ...Fonts.white16SemiBold, color: "black" }}>Continue</Text>
                </TouchableOpacity>
            </Fragment>
        )
    }
    renderAccountType = () => {
        return (
            <Fragment>
                <View style={styles.textFieldContainerStyle}>
                    <RNPickerSelect 
                        onValueChange={(value) => {
                            this.setState({
                                accountType: value
                            })
                        }}
                        items={optionsAccountType}
                    />
                </View>
            </Fragment>
        );
    }
    renderReferralCode = () => {
        return (
            <View style={styles.textFieldContainerStyle}>
                <TextInput
                    placeholder="Referral Code (Case-Sensitive)"
                    placeholderTextColor={Colors.blackColor}
                    style={{ ...Fonts.black16Medium }} 
                    value={this.state.referralCode}
                    onChangeText={(value) => {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                referralCode: value
                            }
                        })
                    }}
                />
            </View>
        )
    }
    render() {
        console.log("this.state", this.state);
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor, height }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <ImageBackground source={require("../../assets/images/tinted-ewaste.jpeg")} style={styles.linearGradient}>
                    <ScrollView contentContainerStyle={styles.contentContainer} style={{ flexGrow: 1 }}>
                        <Icon name="arrow-left" size={25} color="black"
                            style={{ position: 'absolute', left: 15.0, top: 20.0 }}
                        />
                        {this.logo()}
                        {this.registerText()}
                        {this.userNameTextField()}
                        {this.firstNameTextField()}
                        {this.lastNameTextField()}
                        {this.emailTextField()}
                        {this.passwordTextField()}
                        {this.confirmPasswordTextField()}
                        {this.phoneNumberTextField()}
                        {this.renderAccountType()}
                        {this.renderReferralCode()}
                        {this.renderProfilePictureSelection()}
                        {this.continueButton()}
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    textFieldContainerStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        elevation: 1.0,
        marginTop: Sizes.fixPadding * 2.0
    },
    linearGradient: {
        width,
        height
    },  
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: "rgba(0, 0, 0, 0.535)",
        zIndex: 99999999999999999999999
    },
    disabledContinueButtonStyle: {
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.0
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.0
    },
    contentContainer: {
        justifyContent: 'center',
        flexGrow: 1,
        paddingBottom: 62.5,
        paddingTop: 25
    },
    selectableIcon: {
        maxWidth: 132.5,
        maxHeight: 132.5,
        minHeight: 132.5,
        minWidth: 132.5,
        borderRadius: 100
    },
    phoneNumberContainerStyle: {
        backgroundColor: Colors.whiteColor,
        marginTop: 22.5,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        elevation: 1.0,
        height: 55.0,
    }
})

RegisterScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default connect(null, { authentication })(withNavigation(RegisterScreen));