import React, { Fragment, useState, useRef } from 'react';
import { Text, View, Image, ScrollView, ImageBackground, TextInput, TouchableOpacity, Animated } from "react-native";
import styles from "./viewMainInviteDisplayStyles.js";
import { Colors, Sizes, Fonts } from "../../../constants/styles.js";
import { Switch } from 'react-native-switch';
import IntlPhoneInput from 'react-native-intl-phone-input';
import { Button } from "@rneui/base";
import Dialog from "react-native-dialog";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import axios from "axios";
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import { BASE_URL } from "@env";
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';


const MainDisplayInvitationComponent = ({ authData }) => {

    const navigation = useNavigation();

    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const phoneNumberRef = useRef(null);


    const [ data, setData ] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        percentage: 0
    });

    const [ confirmationBox, setConfirmationBox ] = useState(false);
    const [ selected, setSelected ] = useState(true);

    const handleSubmissionConfirmed = () => {
        if (selected === true) {
            // PHONE-NUMBER SELECTED FORMAT

            const config = {
                data,
                id: authData.uniqueId,
                signedInName: `${authData.firstName} ${authData.lastName}`
            }
    
            axios.post(`${BASE_URL}/send/invite/pooling/resources/phone`, config).then((res) => {
                if (res.data.message === "Successfully sent invite!") {
                    console.log(res.data);
    
                    setConfirmationBox(false);
    
                    setTimeout(() => {
                        navigation.navigate('BottomTabScreen', { index: 1 });
                    }, 750);
                } else {
                    console.log("Err", res.data);
    
                    Toast.show({
                        type: 'error',
                        text1: `An error occurred while attempting to send invite...`,
                        text2: `An error has occurred while attempting to send invite to the desired user, please wait a moment & try this action again.`,
                        visibilityTime: 4250,
                        position: "bottom"
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            // EMAIL SELECTED FORMAT

            const config = {
                data,
                id: authData.uniqueId,
                signedInName: `${authData.firstName} ${authData.lastName}`
            }
    
            axios.post(`${BASE_URL}/send/invite/pooling/resources/email`, config).then((res) => {
                if (res.data.message === "Successfully sent invite!") {
                    console.log(res.data);
    
                    setConfirmationBox(false);
    
                    setTimeout(() => {
                        navigation.navigate('BottomTabScreen', { index: 1 });
                    }, 750);
                } else {
                    console.log("Err", res.data);
    
                    Toast.show({
                        type: 'error',
                        text1: `An error occurred while attempting to send invite...`,
                        text2: `An error has occurred while attempting to send invite to the desired user, please wait a moment & try this action again.`,
                        visibilityTime: 4250,
                        position: "bottom"
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const confirmationDialog = () => {
        return (
            <Dialog.Container visible={confirmationBox}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.black18Bold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                        Proceed to send this invitation?
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setConfirmationBox(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black20Regular, color: "#fff" }}>No, Cancel.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => handleSubmissionConfirmed()}
                            style={styles.confirmationButtonStyle}
                        >
                            <Text style={{ ...Fonts.white20Regular, color: "#fff" }}>Yes, Send!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    const renderSpecificInputs = () => {
        if (selected === true) {
            return (
                <Fragment>
                    <IntlPhoneInput
                        value={data.phoneNumber.phoneNumber}
                        onChangeText={(phoneNumber) => {
                            setData(prevState => {
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
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <TextInput
                        placeholder="Enter recipient email address"
                        placeholderTextColor={Colors.blackColor}
                        style={{ ...Fonts.black16Medium }}
                        onSubmitEditing={() => nameRef.current.focus()}
                        blurOnSubmit={true}
                        secureTextEntry={false} 
                        value={data.email}
                        ref={emailRef}
                        onChangeText={(value) => setData(prevState => {
                            return {
                                ...prevState,
                                email: value
                            }
                        })}
                    />
                </Fragment>
            );
        }
    }
    const calculateReadiness = () => {
        const { phoneNumber, name, percentage, email } = data;

        const validateEmail = (email) => {
            return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        };

        if (((typeof phoneNumber.unmaskedPhoneNumber !== 'undefined' && phoneNumber.unmaskedPhoneNumber.length >= 10) || (validateEmail(email))) && (typeof name !== 'undefined' && name.length > 0) && (typeof percentage !== "undefined" && percentage !== 0)) {
            return false;
        } else {
            return true;
        }
    }
    const renderSwitchChange = (val) => {
        if (val === true) { // and/or phone input selected**
            setSelected(val);
            setData(prevState => {
                return {
                    ...prevState,
                    email: ""
                }
            })
        } else {
            setSelected(val);
            setData(prevState => {
                return {
                    ...prevState,
                    phoneNumber: ""
                }
            })
        }
    }

    return (
        <Fragment>
            <ImageBackground imageStyle={{ resizeMode: "cover" }} style={styles.topBanner} source={require("../../../assets/images/trash-11.jpg")}>
                <View style={styles.mainContainerUnscroll}>
                    <ScrollView showsVerticalScrollIndicator={false} horizontal={false} style={styles.innerScrollview} contentContainerStyle={{ paddingBottom: 32.5 }}>
                            <View style={styles.margin15}>
                                <Text style={styles.headerText}>Invite a friend to collect e-waste & pool resources/revenue</Text>
                                <View style={{ marginTop: 12.5 }} />
                                <Text style={styles.label}>Enter the desired recipient's email</Text>
                                <View style={styles.textFieldContainerStyle}>
                                    <Switch
                                        value={selected}
                                        onValueChange={(val) => renderSwitchChange(val)}
                                        disabled={false}
                                        activeText={'Text/Phone'}
                                        inActiveText={'Email'}
                                        circleSize={30}
                                        barHeight={25}
                                        circleBorderWidth={3}
                                        backgroundActive={"#000"}
                                        backgroundInactive={'gray'}
                                        circleActiveColor={Colors.secondaryColor}
                                        circleInActiveColor={Colors.orangeColor}
                                        changeValueImmediately={true}
                                        innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
                                        outerCircleStyle={{}}
                                        renderActiveText={true}
                                        renderInActiveText={true}
                                        switchLeftPx={2}
                                        switchRightPx={2}
                                        switchWidthMultiplier={3.5}
                                        switchBorderRadius={30}
                                    />
                                    <View style={styles.thinHR} />
                                    {renderSpecificInputs()}
                                </View>
                                <Text style={styles.label}>Enter the desired recipient's full name</Text>
                                <View style={styles.textFieldContainerStyle}>
                                    <TextInput
                                        placeholder="Enter recipient name (full / first + last)"
                                        placeholderTextColor={Colors.blackColor}
                                        style={{ ...Fonts.black16Medium }}
                                        secureTextEntry={false} 
                                        onSubmitEditing={() => null}
                                        blurOnSubmit={true}
                                        value={data.name}
                                        ref={nameRef}
                                        onChangeText={(value) => setData(prevState => {
                                            return {
                                                ...prevState,
                                                name: value
                                            }
                                        })}
                                    />
                                </View>
                                <Text style={styles.label}>What percentage (<Text style={{ fontWeight: "bold", color: Colors.primaryColor }}>{data.percentage !== 0 ? data.percentage : ""}</Text>% of earnings - pooling resources split appropriately) would you like to share with this user?</Text>
                                <View style={styles.textFieldContainerStyle}>
                                    <Slider
                                        style={styles.slider}
                                        progress={useSharedValue(data.percentage)}
                                        minimumValue={useSharedValue(0)}
                                        maximumValue={useSharedValue(20)}
                                        // step={10}
                                        markWidth={3}
                                        marksStyle={styles.stepStyleCustom}
                                        renderThumb={() => <Image source={require("../../../assets/images/icon/marker-2.png")} style={{ minWidth: 32.5, minHeight: 27.5, height: 27.5, width: 32.5 }} />}
                                        onSlidingComplete={(val) => {
                                            console.log("val progress...:", val);
                                            
                                            setData(prevState => {
                                                return {
                                                    ...prevState,
                                                    percentage: Math.floor(Number(val))
                                                }
                                            })
                                        }}
                                    />
                                </View>
                                <Button disabled={calculateReadiness()} onPress={() => setConfirmationBox(true)} title={"Send Invitation Message"} buttonStyle={{ borderRadius: 12.5, height: 55, marginTop: 22.5 }} style={{ width: "100%" }} color={Colors.secondaryColor} />
                            </View>
                    </ScrollView>
                    {confirmationDialog()}
                </View>
            </ImageBackground>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        authData: state.auth.data
    }
}

export default connect(mapStateToProps, {  })(withNavigation(MainDisplayInvitationComponent));
