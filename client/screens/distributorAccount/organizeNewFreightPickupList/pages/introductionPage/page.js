import React, { Fragment, useState } from "react";
import { ScrollView, Dimensions, View, Image, Text } from "react-native";
import styles from "./pageStyles.js";
import CheckBox from "react-native-check-box";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import _ from "lodash";
import { connect } from "react-redux";
import disc from '@jsamr/counter-style/presets/disc';
import MarkedList from '@jsamr/react-native-li';
import { updateFreightDetailsState } from "../../../../../redux/actions/requestFreightPickup/pickupDetails.js";


const { width, height } = Dimensions.get("window");

const bulletedOptions = [{
    id: 1,
    label: `List your ORIGIN address information`
}, {
    id: 2,
    label: `List your DESTINATION address information`
}, {
    id: 3,
    label: `Pick-up & delivery date(s)`
}, {
    id: 4,
    label: `Description, details, weight & other core shipment information`
}];

const IntroductionToFreightShippingActivation = ({ updateMainState, updateFreightDetailsState, freightData }) => {

    const [ state, setState ] = useState({
        isChecked: false
    })

    const handleSubmission = () => {
        console.log("handleSubmission clicked/ran...");

        updateFreightDetailsState({ agreedToTerms: true, page: 2 });

        updateMainState({ page: 2 });
    }
    const handleCheckboxCheck = () => !state.isChecked ? true : false;

    return (
        <Fragment>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 122.25 }} style={styles.outterContainer}>
                <View style={styles.topspacer} />
                <AwesomeButtonBlue disabled={handleCheckboxCheck()} type={"secondary"} onPress={() => handleSubmission()} backgroundShadow={"black"} stretch={true}>Submit & Continue</AwesomeButtonBlue>
                <View style={styles.centered}>
                    <View style={styles.topHr} />
                </View>
                <View style={styles.toppedBreaker}>
                    <Text style={styles.labeled}>Please review the following bullet-points to see the overall 'requesting freight pickup' processes...</Text>
                    <MarkedList counterRenderer={disc}>
                        {bulletedOptions.map((item) => (
                            <View key={item.id} style={styles.rowItem}>
                                <Text style={styles.innerText}>{item.label}</Text>
                            </View>
                        ))}
                    </MarkedList>
                    <Text style={styles.labeledSubbed}>You must complete each step to request the freight 'pickup shipment' - once organizing a shipment, you CAN cancel the pickup or RESCHEDULE BUT you will be charged a surchage-fee for wasted time/resources if not cancelled within the reasonable alloted timeframe.</Text>
                </View>
                <View style={styles.centered}>
                    <View style={styles.hr} />
                </View>
                <View style={styles.centeredMainContent}>
                    <View style={styles.whiteBacking}>
                        <Text style={styles.labeled}>Please click the 'continue/proceed' button when you have a full 'pallet/bucket' of electronic waste - payments are variables & can fluctuate (sometimes more, sometimes less) but these are done by calculating various values or conditions to give you the fairest appraisal possible!</Text>
                        <View style={styles.centered}>
                            <View style={styles.checkboxHR} />
                        </View>
                        <View style={styles.checkboxRow}>
                            <CheckBox
                                style={styles.checkboxInput}
                                onClick={() => {
                                    setState(prevState => {
                                        return {
                                            ...prevState,
                                            isChecked: !prevState.isChecked
                                        }
                                    })
                                }}
                                checkedImage={<Image source={require('../../../../../assets/images/icon/checked.png')} style={styles.checkboxImage} />}
                                unCheckedImage={<Image source={require('../../../../../assets/images/icon/unchecked.png')} style={styles.checkboxImage} />}
                                isChecked={state.isChecked}
                                rightText={"I acknowledge & agree to the 'Terms & Conditions' upon the creation of listing regarding shipping freight & properly processing, shipping & delivering all electronics in their recieved condition - any negligence is open to an account termination"}
                            />
                        </View>
                        <View style={styles.centered}>
                            <View style={styles.checkboxHR} />
                        </View>
                    </View>
                </View>
                <View style={styles.centered}>
                    <View style={styles.hr} />
                </View>
                <AwesomeButtonBlue disabled={handleCheckboxCheck()} type={"secondary"} onPress={() => handleSubmission()} backgroundShadow={"black"} stretch={true}>Submit & Continue</AwesomeButtonBlue>
                <AwesomeButtonBlue backgroundDarker={"#000"} backgroundColor={"#e60000"} style={styles.absoluteButtonBottom} type={"secondary"} onPress={() => {
                    updateMainState({ page: 1 });

                    updateFreightDetailsState({});
                }} textColor={"#fff"} backgroundShadow={"black"} stretch={true}>Restart Process</AwesomeButtonBlue>
            </ScrollView>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        location: state.location.currentLoc,
        userData: state.auth.data,
        freightData: state.freightPickupData
    }
}
export default connect(mapStateToProps, { updateFreightDetailsState })(IntroductionToFreightShippingActivation);