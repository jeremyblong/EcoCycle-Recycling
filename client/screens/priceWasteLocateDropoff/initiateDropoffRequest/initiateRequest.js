import React, { Component, Fragment } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, Dimensions, TextInput, TouchableOpacity, FlatList, ImageBackground, Image, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../../constants/styles.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TransitionPresets } from "react-navigation-stack";
import { BottomSheet } from "react-native-elements";
import Dialog from "react-native-dialog";
import styles from "./initiateRequestStyles.js";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { BASE_ASSET_URL } from "@env";
import moment from "moment";
import { Button } from "@rneui/base";
import RBSheet from "react-native-raw-bottom-sheet";
import SelectAndSendInvitationSheetPane from "./panes/sendInviteToUserPane.js";
import { connect } from "react-redux";

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

const { width, height } = Dimensions.get('window');

class InitiateDropOffRequest extends Component {
constructor(props) {
    super(props);

    this.state = {
        showSavePopup: false,
        showCreateCollectionDialog: false,
        collectionName: null,
        user: null
    }

    this.sheetRef = React.createRef(null);
}

    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));

        const { user } = this.props.route.params;

        this.setState({
            user
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };
    renderMainContent = () => {

        const { user } = this.state;

        if (user !== null) {
            return (
                <Fragment>
                    <View style={{ flex: 1 }}>
                        {this.creatorProfileInfo()}
                        <FlatList
                            ListHeaderComponent={
                                <Fragment>
                                    {this.profileDetail()}
                                </Fragment>
                            }
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    {this.savePopUp()}
                    {this.createCollectionDialog()}
                    <RBSheet
                        ref={this.sheetRef}
                        height={height * 0.875}
                        openDuration={250}
                        closeOnDragDown={false}
                        closeOnPressMask={false}
                        closeOnPressBack={false}
                        customStyles={{
                            container: {
                                backgroundColor: "#000",
                                borderTopColor: "#fff",
                                borderTopWidth: 1.5
                            }
                        }}
                        >
                        <SelectAndSendInvitationSheetPane formData={this.props.formData} authenticatedUserData={this.props.authenticatedUserData} sheetRef={this.sheetRef} props={this.props} />
                    </RBSheet>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <View style={{ minHeight: 32.5, height: 32.5 }} />
                        <SkeletonPlaceholder>
                            <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 7.5 }} />
                        <SkeletonPlaceholder>
                            <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 7.5 }} />
                        <SkeletonPlaceholder>
                            <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 7.5 }} />
                        <SkeletonPlaceholder>
                            <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 7.5 }} />
                        <SkeletonPlaceholder>
                            <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                        </SkeletonPlaceholder>
                    <View style={{ minHeight: 32.5, height: 32.5 }} />
                </Fragment>
            );
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar translucent={true} backgroundColor={'transparent'} />
                {this.renderMainContent()}
            </SafeAreaView>
        )
    }

    createCollectionDialog = () => {
        return (
            <Dialog.Container
                visible={this.state.showCreateCollectionDialog}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0 }}
                onRequestClose={() => { this.setState({ showCreateCollectionDialog: false }) }}
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
                            onPress={() => this.setState({ showCreateCollectionDialog: false })}
                        />
                    </View>
                    <TextInput
                        placeholder="Enter collection name"
                        placeholderTextColor={Colors.grayColor}
                        value={this.state.collectionName}
                        onChangeText={(value) => this.setState({ collectionName: value })}
                        style={styles.collectionNameFieldStyle}
                        selectionColor={Colors.secondaryColor}
                    />
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.setState({ showCreateCollectionDialog: false })}
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

    savePopUp = () => {
        return (
            <BottomSheet
                isVisible={this.state.showSavePopup}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => { this.setState({ showSavePopup: false }) }, }}
            >
                <View style={styles.bottomSheetWrapStyle}>
                    <Text style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.whiteColor20Bold }}>
                        Save to Collections
                    </Text>
                    {collectionCategoryList.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ showSavePopup: false })}
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
                        onPress={() => this.setState({ showCreateCollectionDialog: true })}
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

    profileDetail = () => {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    This user is a "drop-off collection agent" account. This user collects e-waste electronics and orchestrates "meets" for various platform user's to drop-off old electronics to be collected & transported to our central processing location. Organize a drop-off time and/or place (if applicable) to deliver whatever electronics you'd like to turn-in, in exchange for cryptocurrencies (equity) and/or an immediate payout however we recommend delaying immediate payouts in exchange for a larger payout upon processing your electronics!
                </Text>
                {this.linkAndSocialMediaInfo()}
                {this.profileOtherInfo()}
            </View>
        )
    }

    profileOtherInfo = () => {
        const { registrationDate, totalUniqueViews } = this.state.user;
        return (
            <View style={styles.otherInfoWrapStyle}>
                <View style={{ alignItems: 'center', maxWidth: "47.5%" }}>
                    <Text style={{ ...Fonts.whiteColor16SemiBold, textAlign: "center" }}>
                        Registered {moment(registrationDate).fromNow()}...
                    </Text>
                </View>
                <View style={{ alignItems: 'center', maxWidth: "47.5%" }}>
                    <Text style={{ ...Fonts.whiteColor16SemiBold, textAlign: "center" }}>
                        {totalUniqueViews} Current Profile View(s)
                    </Text>
                </View>
            </View>
        )
    }

    linkAndSocialMediaInfo = () => {
        return (
            <View style={styles.linkAndSocialMediaInfoWrapStyle}>
                <Button onPress={() => this.sheetRef.current.open()} title={"Select & Organize Drop-Off"} buttonStyle={styles.calloutButtonStyle} style={{ width: "100%" }} color={Colors.primaryColor} />
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

    creatorProfileInfo = () => {

        const { profilePictures, firstName, lastName, username } = this.state.user;

        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0 }}>
                <ImageBackground
                    source={require('../../../assets/images/blurred-gradient.png')}
                    style={styles.imageBacked}
                >
                    <View style={styles.backArrowWrapStyle}>
                        <Icon
                            name="chevron-left"
                            color={Colors.whiteColor}
                            size={26}
                            onPress={() => this.props.navigation.pop()}
                        />
                    </View>
                </ImageBackground>
                <View style={styles.profileInfoWrapStyle}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={typeof profilePictures !== "undefined" && profilePictures.length > 0 ? { uri: `${BASE_ASSET_URL}/${profilePictures[profilePictures.length - 1].link}` } : require('../../../assets/images/user.png')}
                            style={styles.profileImage}
                        />
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, marginTop: 27.5 }}>
                            <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                                {`${firstName} ${lastName}`}
                            </Text>
                            <Text style={{ lineHeight: 16.0, ...Fonts.whiteColor14Regular }}>
                                @{`${username}`}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.followButtonStyle}>
                        <Text style={{ ...Fonts.whiteColor16SemiBold, color: "#fff" }}>
                            View Profile
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
};

InitiateDropOffRequest.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}
const mapStateToProps = (state) => {
    return {
        formData: state.cartData.formData,
        authenticatedUserData: state.auth.data
    }
}
export default connect(mapStateToProps, {})(withNavigation(InitiateDropOffRequest));