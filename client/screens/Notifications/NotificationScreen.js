import React, { Component, Fragment } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList, 
    ScrollView
} from 'react-native';
import styles from './NotificationScreenStyles.js';
import { connect } from 'react-redux';
import axios from "axios";
import moment from 'moment';
import _ from 'lodash';
import { Colors, Fonts, Sizes } from "../../constants/styles.js";
import Dialog from "react-native-dialog";
import Modal from 'react-native-modal';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Button } from "@rneui/base";
import { BASE_URL, BASE_ASSET_URL } from "@env";
import uuid from "react-native-uuid";
import RenderModalContent from "./helpers/modals/acceptRequestDropoff.js";

class NotificationScreen extends Component {
constructor(props) {
    super(props);

        this.state = {
            notifications: [],
            modalVisible: false,
            isVisible: false,
            notification: null,
            ready: false,
            selected: null,
            alreadySelected: false,
            modalVisibility: false
        }
}
    componentDidMount() {

        const { uniqueId, accountType } = this.props.userData;

        const config = {
            params: {
                id: uniqueId,
                accountTypeAuthenticated: accountType
            }
        };

        axios.get(`${BASE_URL}/gather/notifications`, config).then((res) => {

            if (res.data.message === "Gathered notifications!") {

                console.log(res.data);

                const { notifications } = res.data;

                this.setState({
                    notifications,
                    ready: true
                }, () => {
                    if (typeof notifications !== "undefined" && notifications.length > 0) {
                        this.flatListRef.scrollToIndex({ animated: true, index: notifications.length - 1 });
                    } 
                })
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    changeVisibilityState = () => {
        this.setState((prevState) => ({
            modalVisibility: !prevState.modalVisibility
        }));
    }
    onSwipeLeft = (gestureState) => {

        console.log("gestureState", gestureState);

        this.setState({
            modalVisible: true
        })
    }
    renderProfileImagePic = (notification) => {

        console.log("notification", notification);

        const picture = notification.latestProfilePic;

        return <Image source={{ uri: `${BASE_ASSET_URL}/${picture}` }} style={styles.avatar} />;
    }
    clickedNotification = (notification) => {

        console.log("notification", notification);

        const { link } = notification.notification;

        switch (link) {
            case "dropoff-request":
                this.setState({
                    selected: notification,
                    notification,
                    alreadySelected: true
                }, () => {
                    this.changeVisibilityState();
                })
                break;
            default: 
                return null;
                break;
        }

        // axios.post(`${BASE_URL}/mark/notification/read`, {
        //     notification,
        //     id: this.props.unique_id
        // }).then((res) => {
        //     if (res.data.message === "Marked!") {
        //         console.log(res.data);

        //         const { notifications } = res.data;

        //         this.setState({
        //             notifications
        //         }, () => {
        //             if (notification.link === "job") {
        //                 // this.props.props.navigation.push("");
        //             } else if (notification.link === "friend-request") {
        //                 // this.props.props.navigation.push("");
        //             } else {

        //             }
        //         })
        //     } else {
        //         console.log("err", res.data);
        //     }
        // }).catch((err) => {
        //     console.log(err);
        // })
    }
    deleteNotification = () => {

        const { notification } = this.state;

        console.log("notification", notification);

        // axios.post(`${BASE_URL}/delete/notification`, {
        //     id: this.props.unique_id,
        //     notification
        // }).then((res) => {
        //     if (res.data.message === "Deleted Notification!") {
        //         console.log(res.data);

        //         const { notifications } = res.data;

        //         this.setState({
        //             notifications
        //         })
        //     } else {
        //         console.log("Err", res.data);
        //     }
        // }).catch((err) => {
        //     console.log(err);
        // })
    }

    renderEmptyListComponentData = () => {
        return (
            <Fragment>
                <ScrollView style={styles.background}>
                    <Image resizeMode={"contain"} source={require("../../assets/images/bell.jpg")} style={[styles.myImage, { marginTop: 0, borderRadius: 1 }]} />
                    <View style={{ marginTop: 20 }} />
                    <View style={styles.marginLarge}>
                        <Text style={styles.headText}>Oh no! You don't have any new or pending notifications, interact with the community and get the ball rolling...!</Text>
                        <View style={{ marginTop: 30 }} />
                        <TouchableOpacity style={styles.previousReturnButton}><Button onPress={() => this.props.navigation.goBack()} title={"Back To Previous Page..."} style={{ width: "100%" }} color={Colors.secondaryColor} /></TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 5 }} />
                </ScrollView>
            </Fragment>
        );
    }
    renderFlatList = () => {
        const { notifications } = this.state;

        return (
            <FlatList
                ref={(ref) => { this.flatListRef = ref; }}
                inverted={(typeof notifications !== "undefined" && notifications.length > 0) ? true : false}
                style={styles.root}
                data={notifications}
                extraData={this.state}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={styles.separator}/>
                    )
                }}
                ListEmptyComponent={this.renderEmptyListComponentData}
                keyExtractor={(item) => {
                    const generatedID = uuid.v4();

                    return item !== null && typeof item !== "undefined" ? item.uniqueId : generatedID;
                }}
                onScrollToIndexFailed={info => {

                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    
                    wait.then(() => {
                        if (typeof notifications !== "undefined" && notifications.length > 0) {
                            this.flatListRef.scrollToIndex({ animated: true, index: notifications.length - 1 });
                        }
                    });
                }}
                renderItem={({ item }) => {
                    console.log("item rendered result...:", item.notification);
                    // return JSX data after checking if notification was properly fetched with data
                    if (item.user !== null && typeof item.user !== "undefined") {
                        if (item.notification) {
                            // deconstruct core fetched users data related to notification being fetched.. (restricted data ONLY).
                            const { firstName, lastName, username, profilePictures, registrationDate, registrationDateString, reviews, totalUniqueViews } = item.user;

                            const lastImage = (typeof profilePictures !== "undefined" && profilePictures.length > 0) ? { uri: `${BASE_ASSET_URL}/${profilePictures[profilePictures.length - 1].link}` } : require("../../assets/images/blank-profile-pic.png");
                            // return notification data/jsx
                            return (
                                <View style={styles.notificationContainerWrapper}>
                                    
                                    <Text style={{ ...Fonts.black14Bold, marginLeft: 15, color: Colors.primaryColor }}>{item.notification.title}</Text>
                                    <View style={styles.hr} />
                                    <Text style={{ ...Fonts.black14Bold, marginLeft: 15 }}>{item.notification.description}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.doctorImageContainerStyle}>
                                            <Image
                                                source={lastImage}
                                                resizeMode="cover"
                                                style={{
                                                    height: 125, width: 125, borderRadius: 75.0, left: -15, top: -15,
                                                    overflow: 'hidden'
                                                }}
                                            />
                                        </View>

                                        <View style={{ paddingTop: 15 }}>
                                            <Text style={{ ...Fonts.black16Bold }}>{firstName} {lastName}</Text>
                                            <Text style={{ ...Fonts.gray17Regular, marginTop: Sizes.fixPadding - 7.0, color: "darkblue" }}>{username}</Text>
                                            <Text style={{ ...Fonts.primaryColor16Regular, marginTop: Sizes.fixPadding - 7.0, marginBottom: 12.5 }}>
                                                Registered since {moment(registrationDate).format("MM/DD/YY")}{'\n'}(MM/DD/YY)
                                            </Text>
                                            <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap', alignItems: 'flex-start', marginTop: Sizes.fixPadding - 7.0 }}>
                                                <View style={styles.columnized}>
                                                    <Image
                                                        source={require("../../assets/images/mag.png")}
                                                        resizeMode={"contain"}
                                                        style={{
                                                            height: 35, width: 35, borderRadius: 25.0,
                                                            overflow: 'hidden'
                                                        }}
                                                    />
                                                    <Text style={{ ...Fonts.black16Regular, textAlign: "center", marginTop: 8.25 }}>
                                                        {Number(totalUniqueViews)} Profile View(s)
                                                    </Text>
                                                </View>
                                                <View style={styles.columnized}>
                                                    <Image
                                                        source={require("../../assets/images/starvibrant_prev_ui.png")}
                                                        resizeMode={"contain"}
                                                        style={{
                                                            height: 35, width: 35, borderRadius: 25.0,
                                                            overflow: 'hidden'
                                                        }}
                                                    />
                                                    <Text style={{ ...Fonts.black16Regular, textAlign: "center", marginTop: 8.25 }}>
                                                        {typeof reviews !== "undefined" && reviews.length > 0 ? reviews.length : 0} Review(s)
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.bookContainerStyle}>
                                        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => null}>
                                            <View style={styles.bookVideoConsultButtonStyle}>
                                                <Text style={{ ...Fonts.orangeColorBold, color: "#fff" }}>View User's Profile</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.clickedNotification(item)}>
                                            <View style={styles.bookAppointmentButtonStyle}>
                                                <Text style={{ ...Fonts.primaryColorBold }}>View More Detail(s)</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.dividerStyle}>
                                    </View>
                                </View>
                            );
                        } else {

                        }
                    } else {
                        return null;
                    }
                }}
            />
        );
    }
    render() {
        const { ready, alreadySelected, selected, modalVisibility } = this.state;

        return (
            <View style={styles.blackBackground}>
                {alreadySelected === true ? <RenderModalContent modalVisibility={modalVisibility} userData={this.props.userData} changeVisibilityState={this.changeVisibilityState} selected={selected} /> : null}
                {/* Status/Header bar goes here if applicable... */}
                <Modal isVisible={this.state.isVisible}>
                    <View style={styles.customModalBody}>
                        <Text style={styles.hintText}>HINT: Swipe LEFT on a notification to delete it from your notification list/feed. This will however permenantly delete the notification.</Text>
                        <Image source={require("../../assets/images/icon/swipe-right-64.png")} style={styles.swipeIcon} />
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                isVisible: false
                            })
                        }} style={styles.closeTouch}>
                            <Image source={require("../../assets/images/icon/close-160.png")} style={styles.closeIcon} />
                        </TouchableOpacity>
                    </View>
                </Modal>
                <View>
                    <Dialog.Container visible={this.state.modalVisible}>
                    <Dialog.Title>Are you sure you'd like to delete this notification?</Dialog.Title>
                    <Dialog.Description>
                        Do you want to delete this notification? This action cannot be un-done.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            modalVisible: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            modalVisible: false
                        }, () => {
                            this.deleteNotification();
                        })
                    }} label="DELETE" />
                    </Dialog.Container>
                </View>
                {ready === true ? this.renderFlatList() : <Fragment>
                <SkeletonPlaceholder>
                    <View style={{ width: "100%", height: 125 }} />    
                </SkeletonPlaceholder>
                <View style={{ marginTop: 20 }} /><SkeletonPlaceholder>
                    <View style={{ width: "100%", height: 125 }} />    
                </SkeletonPlaceholder>
                <View style={{ marginTop: 20 }} /><SkeletonPlaceholder>
                    <View style={{ width: "100%", height: 125 }} />    
                </SkeletonPlaceholder>
                <View style={{ marginTop: 20 }} /><SkeletonPlaceholder>
                    <View style={{ width: "100%", height: 125 }} />    
                </SkeletonPlaceholder>
                <View style={{ marginTop: 20 }} /><SkeletonPlaceholder>
                    <View style={{ width: "100%", height: 125 }} />    
                </SkeletonPlaceholder>
                <View style={{ marginTop: 20 }} /></Fragment>}
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {  })(NotificationScreen);