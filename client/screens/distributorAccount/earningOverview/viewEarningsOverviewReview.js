import React, { Fragment, useState } from "react";
import { SafeAreaView, View, StatusBar, Dimensions, TextInput, TouchableOpacity, FlatList, ImageBackground, Image, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../../constants/styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { BottomSheet } from "@rneui/themed";
import Dialog from "react-native-dialog";
import styles from "./viewEarningsOverviewReviewStyles.js";
import moment from "moment";
import { ListItem , Avatar } from '@rneui/themed';

const FEE_AMOUNT = 0.03;

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const previousRecievedPayments = [
    {
        id: '1',
        paymentValue: (Math.floor(Math.random() * (500 - 65 + 1) + 65)).toFixed(2),
        associatedFee: (Math.floor(Math.random() * (20 - 5 + 1) + 5)).toFixed(2),
        fullNameOfOrigin: "Johnny Doesnno",
        usernameOfOrigin: "tomdonono101",
        date: randomDate(new Date(2022, 9, 1), new Date())
    },
    {
        id: '2',
        paymentValue: (Math.floor(Math.random() * (500 - 65 + 1) + 65)).toFixed(2),
        associatedFee: (Math.floor(Math.random() * (20 - 5 + 1) + 5)).toFixed(2),
        fullNameOfOrigin: "Bonquitto Rogers",
        usernameOfOrigin: "dicno7584736",
        date: randomDate(new Date(2022, 9, 1), new Date())
    },
    {
        id: '3',
        paymentValue: (Math.floor(Math.random() * (500 - 65 + 1) + 65)).toFixed(2),
        associatedFee: (Math.floor(Math.random() * (20 - 5 + 1) + 5)).toFixed(2),
        fullNameOfOrigin: "Adam Somethilo",
        usernameOfOrigin: "tacotuesdayyall777",
        date: randomDate(new Date(2022, 9, 1), new Date())
    },
    {
        id: '4',
        paymentValue: (Math.floor(Math.random() * (500 - 65 + 1) + 65)).toFixed(2),
        associatedFee: (Math.floor(Math.random() * (20 - 5 + 1) + 5)).toFixed(2),
        fullNameOfOrigin: "Jessica Adaiiti",
        usernameOfOrigin: "jessthebest",
        date: randomDate(new Date(2022, 9, 1), new Date())
    },
    {
        id: '5',
        paymentValue: (Math.floor(Math.random() * (500 - 65 + 1) + 65)).toFixed(2),
        associatedFee: (Math.floor(Math.random() * (20 - 5 + 1) + 5)).toFixed(2),
        fullNameOfOrigin: "Saarah Bencono",
        usernameOfOrigin: "multiplativetacos101",
        date: randomDate(new Date(2022, 9, 1), new Date())
    }
]

const collectionCategoryList = [
    {
        id: '1',
        categoryImage: require('../../../assets/images/gradient-1.jpg'),
        category: 'Arts',
    },
    {
        id: '2',
        categoryImage: require('../../../assets/images/gradient-2.jpg'),
        category: '3D',
    },
    {
        id: '3',
        categoryImage: require('../../../assets/images/gradient-3.jpg'),
        category: 'Music',
    },
    {
        id: '4',
        categoryImage: require('../../../assets/images/gradient-4.jpg'),
        category: 'Landscapes',
    },
];

const { width } = Dimensions.get('window');

const RenderEarningsPaymentsOverviewDistributor = ({ navigation }) => {

    const [ state, setState ] = useState({
        showSavePopup: false,
        showCreateCollectionDialog: false,
        collectionName: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        showSavePopup,
        showCreateCollectionDialog,
        collectionName,
    } = state;

    const createCollectionDialog = () => {
        return (
            <Dialog.Container
                visible={showCreateCollectionDialog}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0 }}
                onRequestClose={() => { updateState({ showCreateCollectionDialog: false }) }}
            >
                <View style={styles.dialogContentWrapStyle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ flex: 1, ...Fonts.whiteColor18SemiBold }}>
                            Give a name to your collection
                        </Text>
                        <Icon
                            name="close"
                            color={Colors.whiteColor}
                            size={22}
                            onPress={() => updateState({ showCreateCollectionDialog: false })}
                        />
                    </View>
                    <TextInput
                        placeholder="Enter collection name"
                        placeholderTextColor={Colors.grayColor}
                        value={collectionName}
                        onChangeText={(value) => updateState({ collectionName: value })}
                        style={styles.collectionNameFieldStyle}
                        selectionColor={Colors.primaryColor}
                    />
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showCreateCollectionDialog: false })}
                        style={styles.createCollectionButtonStyle}
                    >
                        <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                            Create Collection
                        </Text>
                    </TouchableOpacity>
                </View>
            </Dialog.Container>
        );
    }

    const savePopUp = () => {
        return (
            <BottomSheet
                isVisible={showSavePopup}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => { updateState({ showSavePopup: false }) }, }}
            >
                <View style={styles.bottomSheetWrapStyle}>
                    <Text style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.whiteColor20Bold }}>
                        Save to Collections
                    </Text>
                    {collectionCategoryList.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ showSavePopup: false })}
                            key={`${index}`}
                            style={{ marginBottom: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}
                        >
                            <Image source={item.categoryImage}
                                style={{ width: 50.0, height: 50.0, borderRadius: Sizes.fixPadding - 5.0, }}
                            />
                            <Text style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.whiteColor16Medium }}>
                                {item.category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showCreateCollectionDialog: true })}
                        style={styles.createNewButtonWrapStyle}
                    >
                        <Icon
                            name="add"
                            color={Colors.whiteColor}
                            size={30}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.whiteColor20SemiBold }}>
                            Create new
                        </Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        )
    }

    const recentlyListedInfo = () => {
        const renderItem = ({ item }) => {
            const { paymentValue, associatedFee, fullNameOfOrigin, usernameOfOrigin, id, date } = item;
            return (
                <ListItem
                    style={styles.listitemContainer}
                    >
                    <Avatar rounded style={styles.minSized} source={require('../../../assets/images/icon/dollar-circled.png')} />
                    <ListItem.Content style={styles.listContentOnly}>
                        <ListItem.Title style={{ color: '#000', fontWeight: 'bold' }}>
                            {`${fullNameOfOrigin} ~ ${usernameOfOrigin}`}
                        </ListItem.Title>
                        <ListItem.Subtitle style={{ color: '#000', fontWeight: 'bold' }}>
                            {`$${paymentValue} with fee of $${associatedFee}`}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle style={{ color: Colors.primaryColor, fontWeight: 'bold' }}>
                            {`Occurred: ${moment(date).format("MM/DD/YYYY hh:mm A")}`}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <Image source={require('../../../assets/images/icon/right.png')} style={styles.rightIconed} />
                </ListItem>
            );
        }
        const renderEmptyListData = () => {
            return (
                <Fragment>
                    <View style={[styles.centeredOnly, { marginBottom: 32.5, marginTop: 12.5 }]}>
                        <Text style={{ fontSize: 22, textAlign: "center", textDecorationLine: "underline", fontWeight: "bold", color: "#000", marginBottom: 14.25 }}>You do NOT have any previous payment's from shipment's or deliveries...</Text>
                        <Image resizeMode="contain" source={require("../../../assets/images/no-payments.png")} style={styles.noContractAvailable} />
                    </View>
                </Fragment>
            );
        }
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding }}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.whiteColor20Bold, fontSize: 18.25, fontWeight: "bold", color: "#000", textDecorationLine: "underline" }}>
                    Recently Recieved Payment's
                </Text>
                <FlatList
                    data={[]} // previousRecievedPayments
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={true}
                    ListEmptyComponent={renderEmptyListData}
                />
            </View>
        )
    }

    const profileDetail = () => {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Regular, fontWeight: "bold", color: "#000" }}>
                    You're viewing your previously earned 'payments/rewards' for previously accepted shipments or loads. These payments are either 'pending' or 'cleared' & are available for withdrawl if 'cleared'.
                </Text>
                <View style={styles.hrthin} />
                <Text style={{ ...Fonts.grayColor14Regular, fontWeight: "bold", color: "#000" }}>
                    Feel free to 'click' each payment to see more specifics & data related to each payment only.
                </Text>
                {linkAndSocialMediaInfo()}
            </View>
        )
    }
    const linkAndSocialMediaInfo = () => {
        return (
            <View style={styles.linkAndSocialMediaInfoWrapStyle}>
                <TouchableOpacity onPress={() => {}} style={styles.linkWrapStyle}>
                    <Text style={{ ...Fonts.grayColor14Regular, color: "#000", textAlign: "center", marginRight: 6.25 }}>
                        View Payment Chart Data
                    </Text>
                    <Image source={require("../../../assets/images/icon/chart.png")} style={styles.chartIcon} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../../assets/images/icon/facebook.png')}
                        style={{ width: 30.0, height: 30.0, resizeMode: 'contain' }}
                    />
                    <Image
                        source={require('../../../assets/images/icon/instagram.png')}
                        style={{ width: 30.0, height: 30.0, resizeMode: 'contain' }}
                    />
                    <Image
                        source={require('../../../assets/images/icon/twitter.png')}
                        style={{ width: 30.0, height: 30.0, resizeMode: 'contain' }}
                    />
                </View>
            </View>
        )
    }

    const creatorProfileInfo = () => {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0 }}>
                <ImageBackground
                    source={require('../../../assets/images/money.jpg')}
                    style={{ width: '100%', height: 182.5 + StatusBar.currentHeight }}
                >
                    <View style={styles.followButtonStyle}>
                        <Text style={{ ...Fonts.whiteColor16SemiBold, color: "#fff" }}>
                            Initiate New Collection Request
                        </Text>
                    </View>
                    <View style={styles.backArrowWrapStyle}>
                        <Icon
                            name="chevron-left"
                            color={Colors.whiteColor}
                            size={26}
                            onPress={() => navigation.pop()}
                        />
                    </View>
                </ImageBackground>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* <StatusBar translucent={true} backgroundColor={'transparent'} /> */}
            <View style={{ flex: 1 }}>
                {creatorProfileInfo()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {profileDetail()}
                            {recentlyListedInfo()}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                />
            </View>
            {savePopUp()}
            {createCollectionDialog()}
        </SafeAreaView>
    );
};

export default RenderEarningsPaymentsOverviewDistributor;