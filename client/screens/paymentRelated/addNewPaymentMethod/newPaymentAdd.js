
import React, { useState } from "react";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { Text, View, SafeAreaView, StatusBar, FlatList, Image, TouchableOpacity } from "react-native";
import { Fonts, Colors, Sizes } from "../../../constants/styles";
import styles from "./newPaymentAddStyles.js";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import Toast from 'react-native-toast-message';
import axios from "axios";
import { BASE_URL } from "@env";          
import { connect } from "react-redux";
import _ from "lodash";
import { CardField, useStripe } from '@stripe/stripe-react-native';


const AddNewPaymentMethodMain = ({ navigation, authData }) => {
    const { confirmPayment, createPaymentMethod } = useStripe();

    const [ state, setState ] = useState({
        validCard: false,
        cardInfo: null
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const _onChange = (form) => {
        console.log("_onChange form...:", form);

        // const { valid, values } = form;

        const { validCVC, validExpiryDate, validNumber } = state;

        if (validCVC !== "Incomplete" && validExpiryDate !== "Incomplete" && validNumber !== "Incomplete") {
            updateState({ validCard: true, cardInfo: form })
        } else {
            updateState({ validCard: false, cardInfo: form })
        }
    }

    console.log("cardInfo", state.cardInfo);

    const calculateDisabled = () => {
        if (state.validCard) {
            return false;
        } else {
            return true;
        }
    }

    const handleSubmitCard = async () => {
        console.log("handleSubmitCard clicked/ran...");

        if (state.cardInfo === null) {
            Toast.show({
                type: 'error',
                text1: `You must enter all the card details before processing.`,
                visibilityTime: 3250,
                position: "bottom",
                onHide: () => {}
            });
            return;
        }
    
        const { error, paymentMethod } = await createPaymentMethod({
            type: 'Card',
            card: state.cardInfo,
            paymentMethodType: "Card"
        });
    
        console.log("paymentMethod", paymentMethod);
        console.log("error", error);
        
        if (error) {
            Toast.show({
                type: 'error',
                text1: `Error: ${error.message}`,
                visibilityTime: 3250,
                position: "bottom",
                onHide: () => {}
            });
        } else {
            // Send paymentMethod.id to your backend
            const configuration = {
                uniqueId: authData.uniqueId,
                paymentMethodId: paymentMethod.id
            };
        
            axios.post(`${BASE_URL}/save/card/details`, configuration).then((res) => {
                if (res.data.message === "Successfully saved card details!") {
                    console.log("Successfully gathered...", res.data);
            
                    Toast.show({
                        type: 'success',
                        text1: `Successfully saved/updated your card data!`,
                        text2: `We've successfully saved and updated your payment related settings/data...`,
                        visibilityTime: 2375,
                        position: "bottom",
                        onHide: () => {
                            navigation.goBack();
                        }
                    });
                } else if (res.data.message === "This card is not eligible for Instant Payouts. Try a debit card from a supported bank.") {
                    Toast.show({
                        type: 'error',
                        text1: `This card is not supported for payouts!`,
                        text2: "We cannot use this card for payouts - please use another card instead.",
                        visibilityTime: 3500,
                        position: "bottom"
                    });
                } else if (res.data.message === "This does NOT appear to be a debit card - payouts can ONLY be used on debit cards...") {
                    Toast.show({
                        type: 'error',
                        text1: "ONLY debit cards are allowed for payouts!",
                        text2: res.data.message,
                        visibilityTime: 3500,
                        position: "bottom"
                    });
                } else {
                    console.log("Err", res.data);
            
                    Toast.show({
                        type: 'error',
                        text1: `Error attempting to update your card data...`,
                        text2: `An error occurred while attempting to update your card data, please try this action again or contact support if the problem persists...`,
                        visibilityTime: 2375,
                        position: "bottom"
                    });
                }
            }).catch((err) => {
                console.log(err.message);
        
                Toast.show({
                    type: 'error',
                    text1: `Error attempting to update your card data...`,
                    text2: `An error occurred while attempting to update your card data, please try this action again or contact support if the problem persists...`,
                    visibilityTime: 2375,
                    position: "bottom"
                });
            })
        }
    }

    const renderCards = () => {
        if (state.cardInfo !== null) {
            if (state.cardInfo.brand === "MasterCard") {
                return <Image source={require("../../../assets/images/mastercard.png")} style={styles.cardImage} />;
            } else if (state.cardInfo.brand === "AmericanExpress") {
                return <Image source={require("../../../assets/images/american.png")} style={styles.cardImage} />;
            } else if (state.cardInfo.brand === "Discover") {
                return <Image source={require("../../../assets/images/discover.png")} style={styles.cardImage} />;
            } else if (state.cardInfo.brand === "Visa") {
                return <Image source={require("../../../assets/images/visa.png")} style={styles.cardImage} />;
            } else {
                return <Image source={require("../../../assets/images/blank.jpg")} style={[styles.cardImage, { minHeight: 275, marginTop: 0 }]} />;
            }
        } else {
            return <Image source={require("../../../assets/images/visa.png")} style={styles.cardImage} />;
        }
    }
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            {/* <StatusBar translucent={false} backgroundColor={Colors.primaryColor} /> */}
            {renderCards()}
            <View style={{ marginTop: 22.5 }} />
            <CardField
                postalCodeEnabled={true}
                placeholders={{
                    number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                }}
                style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                    console.log('cardDetails', cardDetails);

                    _onChange(cardDetails);
                }}
                onFocus={(focusedField) => {
                    console.log('focusField', focusedField);
                }}
            />
            {/* <CreditCardInput onChange={_onChange} /> */}
            <View style={[styles.hr, { marginTop: 20 }]} />
            <View style={{ margin: 12.25 }}>
                <AwesomeButtonBlue type={"secondary"} onPress={() => handleSubmitCard()} disabled={calculateDisabled()} stretch={true}>
                    <Text style={styles.innerBtnText}>Submit New Payment Method</Text>
                </AwesomeButtonBlue>
            </View>
            <View style={styles.hr} />
        </SafeAreaView>
    );
};
const mapStateToProps = (state) => {
    return {
        authData: _.has(state.auth, "data") && state.auth.data !== "undefined" ? state.auth.data : null
    }
}
export default connect(mapStateToProps, { })(AddNewPaymentMethodMain);