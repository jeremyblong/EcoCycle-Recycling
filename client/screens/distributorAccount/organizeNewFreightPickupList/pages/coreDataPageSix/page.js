import React, { Fragment, useEffect, useState } from "react";
import { View, Text, Platform, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import styles from "./pageStyles.js";
import {  connect } from "react-redux";
import { updateFreightDetailsState } from "../../../../../redux/actions/requestFreightPickup/pickupDetails.js";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import Toast from 'react-native-toast-message';
import { BottomSheet } from 'react-native-elements';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { Colors } from "../../../../../constants/styles";            
import axios from "axios";

const PageSixDistributorAccountCreation = ({ userData, freightData, updateMainState, updateFreightDetailsState }) => {

    const [ state, setState ] = useState({
        
    });

    useEffect(() => {

    }, []);

    return (
        <Fragment>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 75 }} style={styles.outterContainer}>
                
                <AwesomeButtonBlue backgroundDarker={"#000"} backgroundColor={"#e60000"} style={styles.absoluteButtonBottom} type={"secondary"} onPress={() => {
                    updateMainState({ page: 1 });

                    updateFreightDetailsState({});
                }} textColor={"#fff"} backgroundShadow={"black"} stretch={true}>Restart Process</AwesomeButtonBlue>
            </ScrollView>
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
export default connect(mapStateToProps, { updateFreightDetailsState })(PageSixDistributorAccountCreation);