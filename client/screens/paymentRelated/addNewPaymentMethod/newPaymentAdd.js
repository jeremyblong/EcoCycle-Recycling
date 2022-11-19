
import React, { useState } from "react";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { Text, View, SafeAreaView, StatusBar, FlatList, Image, TouchableOpacity } from "react-native";
import { Fonts, Colors, Sizes } from "../../../constants/styles";
import styles from "./newPaymentAddStyles.js";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";


const AddNewPaymentMethodMain = ({ navigation }) => {

    const [ state, setState ] = useState({
        validCard: false
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const _onChange = (form) => {
        console.log("_onChange form...:", form);

        const { valid } = form;

        if (valid) {
            updateState({ validCard: true })
        }
    }

    const calculateDisabled = () => {
        if (state.validCard) {
            return false;
        } else {
            return true;
        }
    }
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ marginTop: 22.5 }} />
            <CreditCardInput onChange={_onChange} />
            <View style={styles.hr} />
            <AwesomeButtonBlue type={"secondary"} onPress={() => {}} disabled={calculateDisabled()} stretch={true}>
                <Text style={styles.innerBtnText}>Submit New Payment Method</Text>
            </AwesomeButtonBlue>
            <View style={styles.hr} />
        </SafeAreaView>
    );
};

export default AddNewPaymentMethodMain;