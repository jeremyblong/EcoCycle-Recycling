import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, StatusBar, TouchableOpacity, Image, ScrollView } from "react-native";
import { Fonts, Colors, Sizes } from "../../../constants/styles";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import styles from "./depositPaymentStyles.js";           
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "@env";
import { connect } from "react-redux";
import _ from "lodash";

const DepositPaymentHelper = ({ authData }) => {

    const navigation = useNavigation();

    const [state, setState] = useState({
        amount: '',
        user: null
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { amount } = state;
    
    useEffect(() => {
        const config = {
            params: {
                uniqueId: authData.uniqueId
            }
        }

        axios.get(`${BASE_URL}/gather/general/information/user`, config).then((res) => {
            if (res.data.message === "Gathered user successfully!") {
                console.log(res.data);

                const { user } = res.data;

                setState(prevState => ({ ...prevState, user }));
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const header = () => {
        return (
            <View style={styles.headerWrapStyle}>
            
                <Text style={{ ...Fonts.white17SemiBold, marginLeft: Sizes.fixPadding + 5.0, }}>
                    DEPOSIT FUNDS - FUND YOUR ACCOUNT!
                </Text>
            </View>
        )
    }

    const amountTextField = () => {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}>
                <FloatingLabelInput
                    hint={"34.95..."}
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
                    rightComponent={<TouchableOpacity onPress={() => {}}><Image style={styles.innerIconInput} source={require("../../../assets/images/bag_prev_ui.png")} /></TouchableOpacity>}
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

    const handleDeposit = () => {
        const config = {
            uniqueId: authData.uniqueId,
            amount: state.amount, 
            currency: "usd"
        };

        axios.post(`${BASE_URL}/attach/deposit/funds/into/account`, config).then((res) => {

            const { message } = res.data;

            if (message === "Successfully processed request!") {
                console.log("ressssssss location (current) data:", res.data);

                navigation.goBack()
            } else {
                console.log("err", res.data);
            }
        }).catch((err) => {
            console.log("err", err);
        });
    };

    const depositButton = () => {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => handleDeposit()}
                style={styles.withdrawButtonStyle}>
                <Text style={{ ...Fonts.white16Medium }}>
                    DEPOSIT DESIRED AMOUNT
                </Text>
            </TouchableOpacity>
        )
    }

    const processingTimeInfo = () => {
        return (
            <Text style={{ ...Fonts.black16Medium, alignSelf: 'center', marginTop: 15, textAlign: "center", fontWeight: "bold" }}>
                Processing time varies but is usually immediate
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
                <Text style={styles.largeText}>${(typeof state.user !== "undefined" && _.has(state.user, "accountBalance") ? state.user.accountBalance : 0).toFixed(2)}</Text>
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
            {/* <StatusBar translucent={false} backgroundColor={Colors.primaryColor} /> */}
            {header()}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                {currentBalanceInfo()}
                {amountTextField()}
                {amountSelection()}
                {minMaxLimitInfo()}
                {depositButton()}
                {processingTimeInfo()}
            </ScrollView>
        </SafeAreaView>
    );
}
const mapStateToProps = (state) => {
    return {
        authData: state.auth.data
    }
}
export default connect(mapStateToProps, {  })(DepositPaymentHelper)