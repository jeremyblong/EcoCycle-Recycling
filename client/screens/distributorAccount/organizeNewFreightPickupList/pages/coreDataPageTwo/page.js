import React, { Fragment, useState, useRef } from "react";
import { View, Text, TextInput, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import styles from "./pageStyles.js";
import { updateFreightDetailsState } from "../../../../../redux/actions/requestFreightPickup/pickupDetails.js";
import { connect } from "react-redux";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const { width, height } = Dimensions.get("window");

const PageTwoRequestNewFreightHelper = ({ updateFreightDetailsState, masterState, masterSetState, updateMainState, freightData }) => {

    const [ state, setState ] = useState({
        minEstLoadWeight: "",
        maxEstLoadWeight: "",
        loadLocationDescription: "",
        palletGeneralLocation: "",
        descriptionOfCommodity: ""
    });

    const handleFinalSubmissionChoice = () => {
        console.log("handleFinalSubmissionChoice clicked/ran...", state.confirmationDetails);

        const { 
            minEstLoadWeight,
            maxEstLoadWeight,
            loadLocationDescription,
            palletGeneralLocation,
            descriptionOfCommodity
        } = state;

        const loadInfo = {
            minEstLoadWeight,
            maxEstLoadWeight,
            loadLocationDescription,
            palletGeneralLocation,
            descriptionOfCommodity
        };

        const newData = {
            ...freightData,
            loadInfo,
            page: 4
        };

        updateFreightDetailsState(newData);

        updateMainState({ page: 4 });
    }

    const calculateDisabledButton = () => {
        const { 
            minEstLoadWeight,
            maxEstLoadWeight,
            loadLocationDescription,
            palletGeneralLocation,
            descriptionOfCommodity
        } = state;

        if ((typeof minEstLoadWeight !== "undefined" && minEstLoadWeight.length >= 3) && (typeof maxEstLoadWeight !== "undefined" && maxEstLoadWeight.length >= 3) && (typeof loadLocationDescription !== "undefined" && loadLocationDescription.length >= 125) && (typeof palletGeneralLocation !== "undefined" && palletGeneralLocation.length >= 125) && (typeof descriptionOfCommodity !== "undefined" && descriptionOfCommodity.length >= 75)) {
            return false;
        } else {    
            return true;
        }
    }
    return (
        <Fragment>
            <KeyboardAwareScrollView extraHeight={125} enableAutomaticScroll={true} extraScrollHeight={125} enableOnAndroid={true} keyboardShouldPersistTaps='always' contentContainerStyle={{ paddingBottom: 52.5, flexGrow: 1 }}>
                <View style={styles.outterContainer}>
                    <FloatingLabelInput
                        label={`Minimum estimated load-weight (lbs.)...`}
                        isPassword={false}
                        staticLabel={true}
                        maxLength={10}
                        keyboardType="numeric"
                        showCountdown={true}
                        hint={"Enter a weight in lbs."}
                        hintTextColor={"#909090"}
                        labelStyles={styles.labelFloatingStyle}
                        showCountdownStyles={[styles.showCountdownStylesCustom, { paddingBottom: 0 }]}
                        containerStyles={styles.multilineContainerStyle}
                        inputStyles={styles.inputFloatingStyles}
                        rightComponent={<Image style={styles.innerIconInput} source={require("../../../../../assets/images/icon/weight.png")} />}
                        togglePassword={false}
                        value={state.minEstLoadWeight}
                        onChangeText={value => {
                            setState(prevState => {
                                return {
                                    ...prevState,
                                    minEstLoadWeight: value
                                }
                            })
                        }}
                    />
                    <View style={styles.mediumHR} />
                    <FloatingLabelInput
                        label={`Maximum estimated load-weight (lbs.)...`}
                        isPassword={false}
                        staticLabel={true}
                        maxLength={10}
                        keyboardType="numeric"
                        showCountdown={true}
                        hint={"Enter a weight in lbs."}
                        hintTextColor={"#909090"}
                        labelStyles={styles.labelFloatingStyle}
                        showCountdownStyles={[styles.showCountdownStylesCustom, { paddingBottom: 0 }]}
                        containerStyles={styles.multilineContainerStyle}
                        inputStyles={styles.inputFloatingStyles}
                        rightComponent={<Image style={styles.innerIconInput} source={require("../../../../../assets/images/icon/weight.png")} />}
                        togglePassword={false}
                        value={state.maxEstLoadWeight}
                        onChangeText={value => {
                            setState(prevState => {
                                return {
                                    ...prevState,
                                    maxEstLoadWeight: value
                                }
                            })
                        }}
                    />
                    <View style={styles.mediumHR} />
                    <FloatingLabelInput
                        label={`Where is the pallet'd 'container' located?`}
                        isPassword={false}
                        staticLabel={true}
                        maxLength={275}
                        multiline={true}
                        numberOfLines={4}
                        showCountdown={true}
                        hint={"(125 Min Char...) ~ Ex. Backyard on driveway, front-yard, etc..."}
                        hintTextColor={"#909090"}
                        labelStyles={styles.labelFloatingStyle}
                        showCountdownStyles={[styles.showCountdownStylesCustom, { paddingBottom: 0 }]}
                        containerStyles={styles.multilineContainerStyle}
                        inputStyles={styles.inputFloatingStylesMultiline}
                        rightComponent={<Image style={styles.innerIconInputMultiOne} source={require("../../../../../assets/images/icon/marker-2.png")} />}
                        togglePassword={false}
                        value={state.palletGeneralLocation}
                        onChangeText={value => {
                            setState(prevState => {
                                return {
                                    ...prevState,
                                    palletGeneralLocation: value
                                }
                            })
                        }}
                    />
                    <View style={styles.mediumHR} />
                    <FloatingLabelInput
                        label={`Description of load/shipment (Details of pallet)`}
                        isPassword={false}
                        staticLabel={true}
                        maxLength={275}
                        multiline={true}
                        numberOfLines={6}
                        showCountdown={true}
                        hint={"(75 Min Char.) ~ Ex. The shipment is approx. 48in x 48in on a pallet with sides on all four (4) sides of the pallet creating a box essentially. Height is approx 32in MAX. Grey/Tan siding and a brown pallet."}
                        hintTextColor={"#909090"}
                        labelStyles={styles.labelFloatingStyle}
                        showCountdownStyles={[styles.showCountdownStylesCustom, { paddingBottom: 0 }]}
                        containerStyles={styles.multilineContainerStyle}
                        inputStyles={styles.inputFloatingStylesMultiline}
                        rightComponent={<Image style={styles.innerIconInputMultiOne} source={require("../../../../../assets/images/icon/marker-2.png")} />}
                        togglePassword={false}
                        value={state.descriptionOfCommodity}
                        onChangeText={value => {
                            setState(prevState => {
                                return {
                                    ...prevState,
                                    descriptionOfCommodity: value
                                }
                            })
                        }}
                    />
                    <View style={styles.mediumHR} />
                    <FloatingLabelInput
                        label={`Accurately elaborate the pickup instruction's...`}
                        isPassword={false}
                        staticLabel={true}
                        maxLength={425}
                        multiline={true}
                        numberOfLines={7}
                        showCountdown={true}
                        hint={"(125 Min Char...) ~ The pallet/load is in the driveway near the shed towards the back of the yard. You should call me upon arrival (888-888-8888) to ensure I know you've arrived so I can guide you to the shipment & assist in the delivery or loading of the truck! It is in the backyard which requires access - please call upon arriving..."}
                        hintTextColor={"#909090"}
                        labelStyles={styles.labelFloatingStyle}
                        showCountdownStyles={[styles.showCountdownStylesCustom, { paddingBottom: 0 }]}
                        containerStyles={styles.multilineContainerStyle}
                        inputStyles={styles.inputFloatingStylesMultiline}
                        rightComponent={<Image style={styles.innerIconInputMulti} source={require("../../../../../assets/images/icon/desc.png")} />}
                        togglePassword={false}
                        value={state.loadLocationDescription}
                        onChangeText={value => {
                            setState(prevState => {
                                return {
                                    ...prevState,
                                    loadLocationDescription: value
                                }
                            })
                        }}
                    />
                    <View style={styles.mediumHR} />
                    <AwesomeButtonBlue disabled={calculateDisabledButton()} type={"secondary"} onPress={() => handleFinalSubmissionChoice()} backgroundShadow={"black"} stretch={true}>Confirm & Continue!</AwesomeButtonBlue>
                    <View style={styles.mediumHR} />
                    <AwesomeButtonBlue backgroundDarker={"#000"} backgroundColor={"#e60000"} style={styles.absoluteButtonBottom} type={"secondary"} onPress={() => {
                        updateMainState({ page: 1 });

                        updateFreightDetailsState({});
                    }} textColor={"#fff"} backgroundShadow={"black"} stretch={true}>Restart Process</AwesomeButtonBlue>
                </View>
            </KeyboardAwareScrollView>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        location: state.location.currentLoc,
        userData: state.auth.data,
        freightData: state.freightPickupData.formData
    }
}
export default connect(mapStateToProps, { updateFreightDetailsState })(PageTwoRequestNewFreightHelper);