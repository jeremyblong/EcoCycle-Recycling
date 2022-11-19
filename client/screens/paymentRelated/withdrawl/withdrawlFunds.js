import React, { useState } from "react";
import { SafeAreaView, Text, View, StatusBar, TouchableOpacity, Image, ScrollView } from "react-native";
import { Fonts, Colors, Sizes } from "../../../constants/styles";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import styles from "./withdrawlFundsStyles.js";           
import { useNavigation } from "@react-navigation/native";

const WithdrawlPaymentFunding = (props) => {

    const navigation = useNavigation();

    const [state, setState] = useState({
        amount: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { amount } = state;

    const header = () => {
        return (
            <View style={styles.headerWrapStyle}>
            
                <Text style={{ ...Fonts.white17SemiBold, marginLeft: Sizes.fixPadding + 5.0, }}>
                    WITHDRAWL FUNDS/FUNDING FROM ACCOUNT
                </Text>
            </View>
        )
    }

    const amountTextField = () => {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}>
                <FloatingLabelInput
                    hint={"99.49..."}
                    hintTextColor={Colors.secondaryColor}
                    keyboardType={'phone-pad'}
                    isPassword={false}
                    value={amount}
                    maxLength={15}
                    labelStyles={styles.labeledStyle}
                    containerStyles={styles.inputContainerWrapper}
                    label={"Enter a dollar value amount ($$$)"}
                    staticLabel={true}
                    onBlur={() => {}}
                    rightComponent={<TouchableOpacity onPress={() => {}}><Image style={styles.innerIconInput} source={require("../../../assets/images/icon/coin-average.png")} /></TouchableOpacity>}
                    togglePassword={false}
                    onChangeText={(value) => updateState({ amount: value })}
                />
            </View>
        )
    }

    const amountSelection = () => {
        return (
            <View
                style={{
                    paddingHorizontal: Sizes.fixPadding * 4.0,
                    paddingTop: Sizes.fixPadding + 5.0,
                    paddingBottom: Sizes.fixPadding,
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}>
                    {currencySelection({ value: 10 })}
                    {currencySelection({ value: 25 })}
                    {currencySelection({ value: 50 })}
                    {currencySelection({ value: 100 })}
                    {currencySelection({ value: 250 })}
                </View>
            </View>
        )
    }

    const currencySelection = ({ value }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    updateState({
                        amount: value.toString()
                    })
                }}
                style={styles.currencySelectionContainerStyle}
            >
                <Text style={{ ...Fonts.black15Medium }}>${value}</Text>
            </TouchableOpacity>
        )
    }

    const withdrawButton = () => {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.goBack()}
                style={styles.withdrawButtonStyle}>
                <Text style={{ ...Fonts.white16Medium }}>
                    WITHDRAW DESIRED AMOUNT
                </Text>
            </TouchableOpacity>
        )
    }

    const processingTimeInfo = () => {
        return (
            <Text style={{ ...Fonts.black16Medium, alignSelf: 'center', marginTop: 15, fontWeight: "bold" }}>
                Processing time up to 2 days for a full withdrawl
            </Text>
        )
    }

    const minMaxLimitInfo = () => {
        return (
            <Text style={{ ...Fonts.black15Medium, alignSelf: 'center', marginTop: 15, color: Colors.secondaryColor, fontWeight: "bold" }}>
                Min $10, Max $3,000
            </Text>
        )
    }

    const currentBalanceInfo = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.largeText}>${(Math.floor(Math.random() * (100000 - 1) + 100) / 100).toFixed(2)}</Text>
                <Text style={{
                    ...Fonts.black13Medium,
                    marginBottom: Sizes.fixPadding * 3.0,
                    marginTop: Sizes.fixPadding - 5.0
                }}>Current Balance</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            {header()}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                {currentBalanceInfo()}
                {amountTextField()}
                {amountSelection()}
                {minMaxLimitInfo()}
                {withdrawButton()}
                {processingTimeInfo()}
            </ScrollView>
        </SafeAreaView>
    );
}

export default WithdrawlPaymentFunding;