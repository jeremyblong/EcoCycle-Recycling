import React, { Fragment, useState, useRef } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from "./indexStyles.js";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { BASE_URL } from "@env";
import { useNavigation } from '@react-navigation/native';
import { Avatar, ListItem } from '@rneui/themed';

const MainDisplayViewPaymentRelated = ({ authData }) => {

    const navigation = useNavigation();

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate("AddNewPaymentMethod")}>
            <ListItem style={{ zIndex: 9999, minHeight: 72.5, height: 72.5 }}>
                <ListItem.Content>
                    <ListItem.Title style={{ fontSize: 16, fontWeight: "bold", marginBottom: 3.25 }}>Add/Manage payment method(s)</ListItem.Title>
                    <ListItem.Subtitle>Add/Manage payment card(s) for future or current transactions - will be saved on file</ListItem.Subtitle>
                </ListItem.Content>
                <Avatar style={styles.avatarComment} source={require("../../assets/images/icon/card-card.png")} />
            </ListItem>
        </TouchableOpacity>
            <View style={styles.hr} />
        <TouchableOpacity onPress={() => navigation.navigate("ViewAvailableBalances")}>
            <ListItem style={{ zIndex: 9999, minHeight: 72.5, height: 72.5 }}>
                <ListItem.Content>
                    <ListItem.Title style={{ fontSize: 16, fontWeight: "bold", marginBottom: 3.25 }}>View your available balance's</ListItem.Title>
                    <ListItem.Subtitle>View your available balance(s), crypto balance & more...</ListItem.Subtitle>
                </ListItem.Content>
                <Avatar style={styles.avatarCommentTwo} source={require("../../assets/images/icon/bitcoin-flying.png")} />
            </ListItem>
        </TouchableOpacity>
            <View style={styles.hr} />
        <TouchableOpacity onPress={() => navigation.navigate("WithdrawlFundingPaymentRelated")}>
            <ListItem style={{ zIndex: 9999, minHeight: 72.5, height: 72.5 }}>
                <ListItem.Content>
                    <ListItem.Title style={{ fontSize: 16, fontWeight: "bold", marginBottom: 3.25 }}>Withdrawl your funding/fund(s)</ListItem.Title>
                    <ListItem.Subtitle>Withdrawl funds, manage your balances or withdrawl crypto-specific funding</ListItem.Subtitle>
                </ListItem.Content>
                <Avatar style={styles.avatarComment} source={require("../../assets/images/icon/payout.png")} />
            </ListItem>
        </TouchableOpacity>
            <View style={styles.hr} />
        <TouchableOpacity onPress={() => navigation.navigate("DepositFundingIntoAccount")}>
            <ListItem style={{ zIndex: 9999, minHeight: 72.5, height: 72.5 }}>
                <ListItem.Content>
                    <ListItem.Title style={{ fontSize: 16, fontWeight: "bold", marginBottom: 3.25 }}>Deposit funding/fund(s)</ListItem.Title>
                    <ListItem.Subtitle>Deposit funding/funds into your account to be used in-app</ListItem.Subtitle>
                </ListItem.Content>
                <Avatar style={styles.avatarComment} source={require("../../assets/images/icon/piggy-bank.png")} />
            </ListItem>
        </TouchableOpacity>
            <View style={styles.hr} />
        {/* <TouchableOpacity onPress={() => navigation.navigate("")}>
            <ListItem style={{ zIndex: 9999, minHeight: 72.5, height: 72.5 }}>
                <ListItem.Content>
                    <ListItem.Title style={{ fontSize: 16, fontWeight: "bold", marginBottom: 3.25 }}>View/Manage Your Portfolio</ListItem.Title>
                    <ListItem.Subtitle>Portfolio management & organization</ListItem.Subtitle>
                </ListItem.Content>
                <Avatar style={styles.avatarComment} source={require("../../assets/images/payment-illustration.png")} />
            </ListItem>
        </TouchableOpacity> */}
            {/* <View style={styles.hrBottom} /> */}
            <View style={styles.centered}>
                <Image resizeMode='contain' style={[styles.illustration, { borderRadius: 12.25 }]} source={require("../../assets/images/paying.jpg")} />
            </View>
        </ScrollView>
    );
}
const mapStateToProps = (state) => {
    return {
        authData: state.auth.data
    }
}

export default connect(mapStateToProps, {  })(withNavigation(MainDisplayViewPaymentRelated));
