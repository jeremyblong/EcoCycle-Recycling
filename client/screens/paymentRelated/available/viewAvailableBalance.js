import React, { useState } from "react";
import { Text, View, SafeAreaView, StatusBar, FlatList, Image, TouchableOpacity } from "react-native";
import { Fonts, Colors, Sizes } from "../../../constants/styles";
import styles from "./viewAvailableBalanceStyles.js";

const transactionList = [
    {
        id: '1',
        isSuccess: true,
        isDeposite: true,
        title: 'USD Deposit',
        dateAndTime: 'May 10,2021 9:02:21 PM',
        amount: '5,000',
    },
    {
        id: '2',
        isSuccess: true,
        isDeposite: false,
        title: 'USD Deposit',
        dateAndTime: 'May 2,2021 2:25:25 PM',
        amount: '1,000',
    },
    {
        id: '3',
        isSuccess: false,
        title: 'USD Deposit',
        dateAndTime: 'April 6,2021 10:35:23 AM',
        amount: '10,000',
    },
    {
        id: '4',
        isSuccess: false,
        title: 'USD Deposit',
        dateAndTime: 'April 6,2021 10:29:59 AM',
        amount: '10,000',
    },
];

const ViewAvailableBalances = ({ navigation }) => {

    const [ state, setState ] = useState({
        showModal: false,
        isSuccess: null,
        dateAndTime: '',
        amount: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        showModal,
        isSuccess,
        dateAndTime,
        amount
    } = state;


    const depositeAndWithdrawnButton = () => {
        return (
            <View>
                <View style={styles.depositeAndWithdrawnButtonContainerStyle}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('DepositFundingIntoAccount')}
                    >
                        <Text style={{ ...Fonts.white17Bold }}>
                            DEPOSIT
                        </Text>
                    </TouchableOpacity>
                    <View style={{ height: 30.0, width: 2.0, backgroundColor: "rgba(255,255,255,0.22)" }}>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('WithdrawlFundingPaymentRelated')}
                    >
                        <Text style={{ ...Fonts.white17Bold }}>
                            WITHDRAW
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const totalBalanceInfo = () => {
        return (
            <View style={{ alignItems: 'center', backgroundColor: 'white', paddingVertical: Sizes.fixPadding + 5.0 }}>
                <Text style={{ ...Fonts.black17SemiBold, fontWeight: "bold", color: "#000", fontSize: 22.5, textDecorationLine: "underline" }}>USD ($)</Text>
                <Text style={{ ...Fonts.gray13Medium, marginVertical: Sizes.fixPadding, fontWeight: "bold", color: "#000", fontSize: 22.5 }}>Available Balance</Text>
                <Text style={styles.mainPrice}>$152</Text>
                {/* <Image source={require("../../../assets/images/icon/close.png")} style={styles.maxedIcon} /> */}
            </View>
        )
    }

    const transactions = () => {
        const renderItem = ({ item }) => (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        updateState({ showModal: true })
                        updateState({ isSuccess: item.isSuccess })
                        updateState({ dateAndTime: item.dateAndTime })
                        updateState({ amount: item.amount })
                    }}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{
                            ...styles.transactionIconContainerStyle,
                            backgroundColor: item.isSuccess == true ? Colors.greenColor : Colors.redColor,
                        }}>
                            {item.isSuccess == true ?
                                item.isDeposite ?
                                    <Image source={require("../../../assets/images/icon/red-down-right.png")} style={styles.maxedIcon} /> :
                                    <Image source={require("../../../assets/images/icon/upload-arrow.png")} style={styles.maxedIcon} />
                                :
                                <Image source={require("../../../assets/images/icon/upload-arrow.png")} style={styles.maxedIcon} />
                            }
                        </View>
                        <View style={{ marginHorizontal: Sizes.fixPadding }}>
                            <Text style={{ ...Fonts.black16Medium }}>
                                {item.title}
                            </Text>
                            <Text style={{ ...Fonts.gray13Medium, marginTop: Sizes.fixPadding - 5.0 }}>
                                {item.dateAndTime}
                            </Text>
                        </View>
                    </View>
                    <Text style={{ ...Fonts.black16Bold }}>${item.amount}</Text>
                </TouchableOpacity>
                <View style={{
                    backgroundColor: 'gray', marginVertical: Sizes.fixPadding * 2.0,
                    height: 0.60,
                }}></View>
            </View>
        )

        return (
            <FlatList
                data={transactionList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
            />
        )
    }


    const depositeAndWithdrawnInfo = () => {
        return (
            <View style={{ ...styles.depositeAndWithdrawnInfoWrapStyle }}>
                <View style={styles.depositeAndWithdrawnInfoStyle}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.gray13Medium }}>Total Deposit</Text>
                        <Text style={{ ...Fonts.black17SemiBold, marginTop: Sizes.fixPadding - 5.0 }}>
                            $3,12,125
                        </Text>
                    </View>
                    <View style={{ height: 35.0, width: 0.60, backgroundColor: 'gray' }}></View>
                    <View>
                        <Text style={{ ...Fonts.gray13Medium }}>Total Deposit</Text>
                        <Text style={{ ...Fonts.black17SemiBold, marginTop: Sizes.fixPadding - 5.0 }}>
                            $3,12,125
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                <View style={{ elevation: 3.0, borderBottomColor: 'gray' }}>
                    {totalBalanceInfo()}
                    {depositeAndWithdrawnInfo()}
                </View>
                {transactions()}
            </View>
            {depositeAndWithdrawnButton()}

        </SafeAreaView>
    );
};

export default ViewAvailableBalances;