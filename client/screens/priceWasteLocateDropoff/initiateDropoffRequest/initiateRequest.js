import React, { Component, Fragment, useState } from "react";
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
import { Rating, AirbnbRating } from 'react-native-ratings';

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

const STAR_IMAGE = require('../../../assets/images/icon/vibrantstar_prev_ui.png')

const { width, height } = Dimensions.get('window');

const ReviewsProfileScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [appointments, setAppointments] = useState([
        {
            "id": 1,
            "title": "Review for Drop-off 1",
            "name": "Jake Handolf",
            "date": "2023-05-18",
            "feedback": "Easy drop-off process and friendly staff.",
            "attendees": [
                { "id": 1, "remoteImage": "https://bootdey.com/img/Content/avatar/avatar1.png" },
                { "id": 2, "remoteImage": "https://bootdey.com/img/Content/avatar/avatar2.png" },
                { "id": 3, "remoteImage": "https://bootdey.com/img/Content/avatar/avatar8.png" },
                { "id": 4, "remoteImage": "https://bootdey.com/img/Content/avatar/avatar1.png" },
                { "id": 5, "remoteImage": "https://bootdey.com/img/Content/avatar/avatar3.png" },
                { "id": 6, "remoteImage": "https://bootdey.com/img/Content/avatar/avatar5.png" }
            ],
            "description": "The dropoff process was incredibly smooth and hassle-free. The staff were friendly and guided me through each step with ease. I was in and out in no time!",
            "backgroundColor": "#ffdcb2",
            "rating": 4.5,
            "titleColor": "#ff8c00"
        },
        {
            "id": 2,
            "name": "Tom Hingletoff",
            "title": "Review for Drop-off 2",
            "date": "2023-05-19",
            "feedback": "Quick and efficient service.",
            "attendees": [
                { "id": 7, "remoteImage": "https://bootdey.com/img/Content/avatar/avatar2.png" },
                { "id": 8, "remoteImage": "https://bootdey.com/img/Content/avatar/avatar4.png" },
                { "id": 9, "remoteImage": "https://bootdey.com/img/Content/avatar/avatar6.png" }
            ],
            "backgroundColor": "#bfdfdf",
            "description": "I had a fantastic experience with the dropoff process. The location was convenient, and the staff were very helpful. The whole process was quick and efficient",
            "rating": 3.25,
            "titleColor": "#008080"
        },
        {
            "id": 3,
            "name": "bethany Watkins",
            "title": "Review for Drop-off 3",
            "date": "2023-05-19",
            "feedback": "Convenient location and helpful staff.",
            "attendees": [
                { "id": 10, "remoteImage": "https://bootdey.com/img/Content/avatar/avatar2.png" },
                { "id": 11, "remoteImage": "https://bootdey.com/img/Content/avatar/avatar4.png" },
                { "id": 12, "remoteImage": "https://bootdey.com/img/Content/avatar/avatar1.png" },
                { "id": 13, "remoteImage": "https://bootdey.com/img/Content/avatar/avatar3.png" },
                { "id": 14, "remoteImage": "https://bootdey.com/img/Content/avatar/avatar5.png" }
            ],
            "backgroundColor": "#e2caf8",
            "description": "Dropping off my e-waste was a breeze. The staff were welcoming and made sure everything went smoothly. I appreciate the easy and fast service!",
            "rating": 5,
            "titleColor": "#8a2be2"
        },
        {
            "id": 4,
            "name": "Whomella Tommula",
            "title": "Review for Drop-off 4",
            "date": "2023-05-19",
            "feedback": "Smooth process from drop-off to pick-up.",
            "attendees": [
                { "id": 15, "remoteImage": "https://bootdey.com/img/Content/avatar/avatar2.png" },
                { "id": 16, "remoteImage": "https://bootdey.com/img/Content/avatar/avatar4.png" },
                { "id": 17, "remoteImage": "https://bootdey.com/img/Content/avatar/avatar6.png" }
            ],
            "backgroundColor": "#d8e4fa",
            "description": "The dropoff experience was seamless and straightforward. The friendly staff assisted me promptly, making the entire process quick and painless. Highly recommended!",
            "rating": 4.77,
            "titleColor": "#6495ed"
        }
    ]);
  
    const renderAppointmentCard = ({ item }) => (
        <View style={[styles.card, { backgroundColor: item.backgroundColor }]}>
            <Text style={[styles.cardTitle, { color: item.titleColor }]}>{item.title}</Text>
            <View style={styles.cardDates}>
                <Text style={styles.cardDate}>{item.description}</Text>
                <Text style={styles.cardDate}> - {item.endDate}</Text>
            </View>
            <View style={styles.cardContent}>
                <View style={{ flexDirection: "row", display: "flex" }}>
                    <Rating
                        type='custom'
                        ratingImage={STAR_IMAGE}
                        ratingColor='#3498db'
                        showRating={true}
                        rating={Math.round(item.rating)}
                        ratingCount={5}
                        defaultRating={item.rating}
                        ratingBackgroundColor='#c8c7c8'
                        imageSize={42.25}
                        isDisabled={true}
                        onFinishRating={() => {}}
                        style={{ marginBottom: 16.255 }}
                    />
                </View>
                <View style={styles.attendeesContainer}>
                    <Text style={[styles.cardTitle, { color: item.titleColor, marginRight: 22.25 }]}>Likes:</Text>
                    {item.attendees.map((attendee) => (
                        <Image key={attendee.id} source={{ uri: attendee.remoteImage }} style={styles.attendeeImage} />
                    ))}
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.buttonText}>{item.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.buttonText}>{moment(item.date).fromNow(false)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.buttonText}>{item.rating}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
  
    const searchFilter = (item) => {
      const query = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(query);
    };
  
    return (
        <View style={styles.container}>
            <Text style={[styles.title, { marginTop: 12.5 }]}>Reviews & Feedback</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList 
                contentContainerStyle={styles.listContainer}
                data={appointments.filter(searchFilter)}
                renderItem={renderAppointmentCard}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

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
                {/* <StatusBar translucent={true} backgroundColor={'transparent'} /> */}
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
                {this.renderReviews()}
            </View>
        )
    }

    renderReviews = () => {
        return <ReviewsProfileScreen />
    };
    
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
                    source={require('../../../assets/images/backing.jpg')}
                    style={styles.imageBacked}
                >
                    <TouchableOpacity onPress={() => {}} style={styles.backArrowWrapStyle}>
                        <Image
                            source={require('../../../assets/images/icon/coloredicon.png')}
                            style={{ width: 60, height: 60 }}
                        />
                    </TouchableOpacity>
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