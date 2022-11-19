import React, { Fragment, useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions, TextInput, ScrollView, ActivityIndicator } from "react-native";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import styles from "./commentReplyFreightListingHelperStyles.js";
import { Colors, Fonts, Sizes } from "../../../../../constants/styles";
import moment from "moment";
import { BASE_ASSET_URL, BASE_URL } from "@env";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from "axios";
import Dialog from "react-native-dialog";
import Toast from 'react-native-toast-message';


const { height, width } = Dimensions.get("window");

const RBSheetReplyToCommentFreightListingHelper = ({ listing, authData, currentlySelected, setStateOutter, refSheetCommentReply }) => {

    const [ state, setState ] = useState({
        activityLoading: false, 
        modalState: false,
        commentText: ""
    });

    const renderCommentConfirmationDialog = () => {
        return (
            <Dialog.Container visible={state.modalState}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.black18Bold, paddingBottom: Sizes.fixPadding - 5.0, fontSize: 17.25 }}>
                        Are you ready to post your sub-comment? Please click "Post My Sub-Comment" if you're ready to submit your comment or cancel to continue with your edit(s)...
                    </Text>
                    <View style={styles.modalHrLine} />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        modalState: false
                                    }
                                })
                            }}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black20Regular, fontWeight: "bold", textAlign: "center", color: "#fff" }}>Cancel ~ Don't Post.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        modalState: false,
                                        activityLoading: true
                                    }
                                })
                                setTimeout(() => {
                                    handleCommentReplySubSubmission();
                                },  375);
                            }}
                            style={styles.logOutButtonStyle}
                        >
                            <Text style={{ ...Fonts.white20Regular, textAlign: "center", fontWeight: "bold", color: "#fff" }}>Post My Sub-Comment!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    const handleCommentReplySubSubmission = () => {
        console.log("handleCommentReplySubSubmission clicked/ran...");

        const { uniqueId, firstName, lastName, username } = authData;

        const config = {
            uniqueId,
            commenterFullName: `${firstName} ${lastName}`,
            commenterUsername: username,
            commentText: state.commentText,
            listingID: listing.id,
            commentID: currentlySelected.id
        };

        axios.post(`${BASE_URL}/post/new/subcomment/comment/dropoff/listing/available/freight/listing`, config).then((res) => {
            if (res.data.message === "Submitted & posted subcomment successfully!") {

                console.log("Success sub-comment posting --- : ", res.data);

                const { comments } = res.data;
                
                setStateOutter(prevState => {
                    return {
                        ...prevState,
                        comments
                    }
                });
                setState(prevState => {
                    return {
                        ...prevState,
                        commentText: "",
                        activityLoading: false
                    }
                });

                refSheetCommentReply.current.close();

                setTimeout(() => {
                    Toast.show({
                        type: 'success',
                        text1: `Successfully POSTED your sub-comment!`,
                        text2: `We've successfully posted your new sub-comment and it is now live/active & viewable by other user's...`,
                        visibilityTime: 2750,
                        position: "bottom"
                    });
                }, 425);

            } else {

                setState(prevState => {
                    return {
                        ...prevState,
                        activityLoading: false
                    }
                });

                console.log("Inner-err request...:", err);

                Toast.show({
                    type: 'error',
                    text1: `An error occurred while attempting post your sub-comment!`,
                    text2: `We've encountered an error while attempting to post your new sub-comment, please try this action again or contact support if the problem persists...`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
            }
        }).catch((err) => {

            console.log("subcomment post err:", err);

            setState(prevState => {
                return {
                    ...prevState,
                    activityLoading: false
                }
            });

            Toast.show({
                type: 'error',
                text1: `An error occurred while attempting post your sub-comment!`,
                text2: `We've encountered an error while attempting to post your new sub-comment, please try this action again or contact support if the problem persists...`,
                visibilityTime: 4250,
                position: "bottom"
            });
        });
    }

    const calculateDisabledButton = () => {
        const { commentText } = state;

        if (typeof commentText !== "undefined" && commentText.length >= 25) {
            return false;
        } else {
            return true;
        }
    }
    return (
        <Fragment>
            <View style={styles.mainWrapper}>
                {renderCommentConfirmationDialog()}
                {state.activityLoading === true ? <ActivityIndicator size="large" style={styles.activityPostingToDB} color="#fff" /> : null}
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{ paddingBottom: 225 }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.flexedTopContainer}>
                            <View style={styles.outterMostWrapperComment}>
                                <View style={styles.containerFlatList}>
                                    <TouchableOpacity onPress={() => {}}>
                                        {typeof currentlySelected.lastProfilePic !== "undefined" && currentlySelected.lastProfilePic !== null ? <Image style={styles.image} source={{ uri: `${BASE_ASSET_URL}/${currentlySelected.lastProfilePic.link}` }}/> : <Image style={styles.image} source={require("../../../../../assets/images/icon/user-default.png")}/>}
                                    </TouchableOpacity>
                                    <View style={styles.contentFlatList}>
                                        <View style={styles.contentHeader}>
                                        <Text style={styles.name}>{currentlySelected.commenterFullName}</Text>
                                        <Text style={styles.time}>Posted {moment(currentlySelected.posted).fromNow()}</Text>
                                        </View>
                                        <Text rkType='primary3 mediumLine'>{currentlySelected.commentText.slice(0, 150)}</Text>
                                    </View>
                                </View> 
                            </View>
                            <View style={styles.hrLineTopPortion} />
                            <Text style={styles.labelTextInput}>Enter your sub-comment reply</Text>
                            <View style={styles.textFieldContainerStyle}>
                                <TextInput
                                    maxLength={125}
                                    style={{ ...Fonts.black16Medium, textAlignVertical: "top" }}
                                    value={state.commentText}
                                    placeholder={`Enter a 'sub-comment' reply to the original poster's comment...: \n\n\n${typeof currentlySelected.commentText !== "undefined" && currentlySelected.commentText.length > 0 ? currentlySelected.commentText : "No Comment Selected Currently."}`}
                                    onChangeText={(value) => {
                                        setState(prevState => {
                                            return {
                                                ...prevState,
                                                commentText: value
                                            }
                                        })
                                    }}
                                    onSubmitEditing={() => null}
                                    blurOnSubmit={true}
                                    multiline={true}
                                    numberOfLines={10}
                                />
                            </View>
                            <View style={styles.hrLine} />
                            <AwesomeButtonBlue textColor={calculateDisabledButton() ? "grey" : "#000"} type={"secondary"} disabled={calculateDisabledButton()} onPress={() => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        modalState: true
                                    }
                                })
                            }} stretch={true}>Submit Comment Reply</AwesomeButtonBlue>
                            <View style={styles.hrLine} />
                            <AwesomeButtonBlue textColor={"#fff"} backgroundShadow={"black"} backgroundDarker={"#000"} backgroundColor={Colors.primaryColor} onPress={() => {
                                refSheetCommentReply.current.close();
                            }} stretch={true}>Cancel/Close Pane...</AwesomeButtonBlue>
                            <View style={styles.hrLine} />
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </View>
        </Fragment>
    )
}

export default RBSheetReplyToCommentFreightListingHelper;