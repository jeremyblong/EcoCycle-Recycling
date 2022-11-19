import React, { Fragment, useState, useEffect } from "react";
import { View, Text, Platform, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import styles from "./pageStyles.js";
import {  connect } from "react-redux";
import { updateFreightDetailsState } from "../../../../../redux/actions/requestFreightPickup/pickupDetails.js";
import { WebView } from 'react-native-webview';
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import Toast from 'react-native-toast-message';
import { BottomSheet } from 'react-native-elements';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { Colors, Sizes, Fonts } from "../../../../../constants/styles";            
import axios from "axios";
import { BASE_URL } from "@env";
import { useNavigation } from "@react-navigation/native";

const PageFiveDistributorAccountCreation = ({ userData, freightData, freightImages, updateMainState, updateFreightDetailsState }) => {

    const navigation = useNavigation()

    const [ state, setState ] = useState({
        selectedPrinter: null,
        bottomSheetOpen: false,
        emailText: ""
    });

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    // useEffect(() => {
    //     updateMainState({ page: 5 });
    // }, [])

    const openEmailAndSend = () => {
        console.log("openEmailAndSend clicked/ran...");

        const link = freightData.shippingLabel.label_download.png;

        const config = {
            link,
            uniqueId: userData.uniqueId,
            freightData
        }

        axios.post(`${BASE_URL}/send/email/shipping/label/link`, config).then((res) => {
            if (res.data.message === "Sent successfully!") {
                console.log(res.data);

                setState(prevState => {
                    return {
                        ...prevState,
                        bottomSheetOpen: false
                    }
                })

                updateMainState({ page: 1 });

                updateFreightDetailsState({});

                Toast.show({
                    type: 'success',
                    text1: `Successfully sent email!`,
                    text2: `We've successfully sent the email, check your inbox and print the label to be given to the shipment reciever/pickup..`,
                    visibilityTime: 4250,
                    position: "bottom",
                    onHide: () => {

                        navigation.navigate('BottomTabScreen', { screen: "Home" })
                    }
                });
            } else {
                console.log("Err", res.data);

                Toast.show({
                    type: 'error',
                    text1: `An error occurred while attempting to email your shipping label!`,
                    text2: `We could'nt email your shipping label to be printed - please try this action again or contact support if the problem persists...`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
            }
        }).catch((err) => {
            console.log(err);

            Toast.show({
                type: 'error',
                text1: `An error occurred while attempting to email your shipping label!`,
                text2: `We could'nt email your shipping label to be printed - please try this action again or contact support if the problem persists...`,
                visibilityTime: 4250,
                position: "bottom"
            });
        })
    }

    const calculateDisabledState = () => {
        if (null) {
            return false;
        } else {
            return true;
        }
    }
    const calculateWhetherValidEmail = () => {
        if (validateEmail(state.emailText)) {
            return false;
        } else {
            return true;
        }
    }
    const viewBottomSheet = () => {
        return (
            <BottomSheet
                isVisible={state.bottomSheetOpen}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)', zIndex: 99 }} 
            >
                <View style={styles.bottomSheetStyle}>
                    <Text style={{ ...Fonts.black19Bold, textAlign: 'center', textDecorationLine: "underline", fontWeight: "bold" }}>
                        Enter your email to send the doc to be printed to...
                    </Text>
                    <View style={{ height: 0.80, backgroundColor: 'gray', marginVertical: Sizes.fixPadding }}>
                    </View>
                    <FloatingLabelInput
                        placeholder={"blongjeremy@gmail.com..."}
                        placeholderTextColor={"grey"}
                        isPassword={false}
                        value={state.emailText}
                        maxLength={45}
                        labelStyles={styles.labeledStyle}
                        containerStyles={styles.inputContainerWrapper}
                        label={"Enter your email to receive this label"}
                        staticLabel={true}
                        showCountdown={true}
                        onBlur={() => {}}
                        rightComponent={<TouchableOpacity onPress={() => {}}><Image style={styles.innerIconInput} source={require("../../../../../assets/images/icon/email-circled-color.png")} /></TouchableOpacity>}
                        togglePassword={false}
                        onChangeText={value => {
                            setState(prevState => {
                                return {
                                    ...prevState,
                                    emailText: value
                                }
                            })
                        }}
                    />
                    <AwesomeButtonBlue style={[styles.paneButtonBottom, { marginTop: 15 }]} type={"secondary"} disabled={calculateWhetherValidEmail()} onPress={() => openEmailAndSend()} stretch={true}>Send/Request Email Message</AwesomeButtonBlue>
                    <View style={[styles.hrBlue, { marginTop: 7.25, marginBottom: 7.75 }]} />
                    <AwesomeButtonBlue style={styles.paneButtonBottom} backgroundDarker={"#868686"} backgroundColor={"#CA052A"} backgroundShadow={"black"} onPress={() => setState(prevState => {
                        return {
                            ...prevState,
                            bottomSheetOpen: false
                        }
                    })} stretch={true}>Cancel/Close Pane</AwesomeButtonBlue>
                </View>
            </BottomSheet>
        )
    }
    const handleFinalSubmission = () => {
        console.log("handleFinalSubmission clicked/ran...");

    }
    return (
        <Fragment>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 112.75 }} style={styles.outterContainer}>
                {viewBottomSheet()}
                <View style={{ margin: 12.25 }}>
                    <Text style={styles.mainText}>This is your shipping label!</Text>
                    <Text style={styles.subbedText}>You will need to include/attach this to your shipment upon pick-up so the driver knows where to deliver it. Please make sure the driver gets this document or your account will be fined/terminated due to incurred loses..</Text>
                </View>
                <View style={styles.hr} />
                <WebView originWhitelist={["*"]} style={styles.webviewStyle} source={{ uri: freightData.shippingLabel.label_download.png }} />
                <View style={styles.hr} />
                <Fragment>
                    <AwesomeButtonBlue type={"primary"} onPress={() => setState(prevState => {
                        return {
                            ...prevState,
                            bottomSheetOpen: true
                        }
                    })} backgroundShadow={"black"} stretch={true}>Email (To Be Printed/Attached To Container)</AwesomeButtonBlue>
                    <View style={styles.hr} />
                </Fragment>
                <AwesomeButtonBlue disabled={calculateDisabledState()} type={"secondary"} onPress={() => handleFinalSubmission()} backgroundShadow={"black"} stretch={true}>Continue & Proceed</AwesomeButtonBlue>
                <View style={styles.hr} />
                <AwesomeButtonBlue backgroundDarker={"#000"} backgroundColor={"#e60000"} style={styles.absoluteButtonBottom} type={"secondary"} onPress={() => {
                    updateMainState({ page: 1 });

                    updateFreightDetailsState({});
                }} textColor={"#fff"} backgroundShadow={"black"} stretch={true}>Restart Process</AwesomeButtonBlue>
                <View style={styles.hr} />
            </ScrollView>
        </Fragment>
    );
};
const mapStateToProps = (state) => {
    return {
        location: state.location.currentLoc,
        userData: state.auth.data,
        freightData: state.freightPickupData.formData,
        freightImages: state.freightPickupData.formData.relevantImagesOfFreight
    }
}
export default connect(mapStateToProps, { updateFreightDetailsState })(PageFiveDistributorAccountCreation);