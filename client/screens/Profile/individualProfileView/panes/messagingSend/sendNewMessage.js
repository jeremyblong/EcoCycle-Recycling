import React, { Fragment, useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions, TextInput, ScrollView, ActivityIndicator } from "react-native";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import { Colors, Fonts, Sizes } from "../../../../../constants/styles";
import { BASE_URL } from "@env";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from "axios";
import Dialog from "react-native-dialog";
import { CometChat } from "@cometchat-pro/react-native-chat";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import styles from "./sendNewMessageStyles.js";

const { height, width } = Dimensions.get("window");

const SendPrivateMessagePaneIndividualProfile = ({ otherUser, authData, setStateOutter, sendPrivateMessageRef }) => {

    const [ state, setState ] = useState({
        activityLoading: false, 
        modalState: false,
        message: "",
        subject: ""
    });

    const sendPrivateMessage = () => {

        const { subject, message } = state;
        
        console.log("sendPrivateMessage clicked/ran...!", otherUser.uniqueId);

        const receiverID = otherUser.uniqueId;
        const messageText = message;
        const receiverType = CometChat.RECEIVER_TYPE.USER;
        const textMessage = new CometChat.TextMessage(
            receiverID,
            messageText,
            receiverType
        );

        CometChat.sendMessage(textMessage).then(messageeee => {
                console.log("Message sent successfully:", messageeee);

                axios.post(`${BASE_URL}/start/conversation/save`, {
                    other_user: otherUser.uniqueId,
                    user: authData.uniqueId,
                    message,
                    subject,
                    fullName: `${authData.firstName} ${authData.lastName}`
                }).then((res) => {
                    if (res.data.message === "Sent notification and message!") {

                        console.log(res.data);

                        setState(prevState => {
                            return {
                                ...prevState,
                                message: "",
                                subject: ""
                            }
                        })
        
                        setTimeout(() => {
                            sendPrivateMessageRef.current.close();
                        }, 1275);
                    } else {
                        console.log("Err", res.data);

                        sendPrivateMessageRef.current.close();
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }, error => {
                console.log("Message sending failed with error:", error);
            }
        );
    }
    
    const renderCommentConfirmationDialog = () => {
        return (
            <Dialog.Container visible={state.modalState}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.black18Bold, paddingBottom: Sizes.fixPadding - 5.0, fontSize: 17.25 }}>
                        Are you sure you'd like to send this private message? This is a PRIVATE message (only visible between you and the other user), please click continue if you're ready to send your message...
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
                            <Text style={{ ...Fonts.black20Regular, fontWeight: "bold", textAlign: "center", color: "#fff" }}>Cancel ~ Don't Send.</Text>
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
                                    sendPrivateMessage();
                                },  375);
                            }}
                            style={styles.logOutButtonStyle}
                        >
                            <Text style={{ ...Fonts.white20Regular, textAlign: "center", fontWeight: "bold", color: "#fff" }}>Send Message!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }
    const renderRemainingCharCountCheck = () => {
        const { message } = state;
        const minChar = 40;

        if (typeof message !== "undefined" && message.length <= 40) {
            return <Text style={styles.charLengthCheckText}>You still must enter another <Text style={{ fontWeight: "bold", textDecorationLine: "underline", color: "red" }}>{minChar - message.length}</Text> characters before sending...</Text>;
        } 
    }

    const calculateDisabledButton = () => {
        const { message, subject } = state;

        if ((typeof message !== "undefined" && message.length >= 40) && (typeof subject !== "undefined" && subject.length >= 10)) {
            return false;
        } else {
            return true;
        }
    }
    // return pane logic/JSX data...
    return (
        <Fragment>
            <View style={styles.mainWrapper}>
                {renderCommentConfirmationDialog()}
                {state.activityLoading === true ? <ActivityIndicator size="large" style={styles.activityPostingToDB} color="#fff" /> : null}
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{ paddingBottom: 225 }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.flexedTopContainer}>
                            <Text style={[styles.labelTextInput, { marginBottom: 16.25 }]}>Enter your <Text style={{ fontWeight: "bold", textDecorationLine: "underline", color: Colors.secondaryColor }}>subject</Text> to {`${otherUser.firstName} ${otherUser.lastName}`} for your message...</Text>
                            <FloatingLabelInput
                                label={`Enter a 'subject' (min 10 charecters)...`}
                                isPassword={false}
                                maxLength={50}
                                showCountdown={true}
                                hint={"Enter your 'tagline/subject'"}
                                hintTextColor={"#909090"}
                                customLabelStyles={styles.labelFloatingStyle}
                                showCountdownStyles={[styles.showCountdownStylesCustom, { paddingBottom: 0 }]}
                                containerStyles={styles.multilineContainerStyle}
                                inputStyles={styles.inputFloatingStyles}
                                rightComponent={<Image style={styles.innerIconInput} source={require("../../../../../assets/images/icon/subject.png")} />}
                                togglePassword={false}
                                value={state.subject}
                                onChangeText={value => {
                                    setState(prevState => {
                                        return {
                                            ...prevState,
                                            subject: value
                                        }
                                    })
                                }}
                            />
                            <View style={[styles.hrLineTopPortion, { marginBottom: 13.25, marginTop: 23.25 }]} />
                            <Text style={styles.labelTextInput}>Enter your message to be sent <Text style={{ fontWeight: "bold", textDecorationLine: "underline", color: Colors.secondaryColor }}>privately</Text> to {`${otherUser.firstName} ${otherUser.lastName}`} A.K.A. {otherUser.username}</Text>
                            <FloatingLabelInput
                                isPassword={false}
                                maxLength={275}
                                staticLabel={true}
                                showCountdown={true}
                                hint={"Enter your 'private message' to send to ONLY this user... (Enter BETWEEN 40-275 Characters ~ this message is only viewable between both interacting parties)"}
                                hintTextColor={"#909090"}
                                inputStyles={{ textAlignVertical: "top" }}
                                labelStyles={styles.labelMainChunkMessage}
                                containerStyles={styles.textFieldContainerStyle}
                                showCountdownStyles={styles.showCountdownStylesCustom}
                                togglePassword={false}
                                value={state.message}
                                onChangeText={(value) => {
                                    setState(prevState => {
                                        return {
                                            ...prevState,
                                            message: value
                                        }
                                    })
                                }}
                                onSubmitEditing={() => null}
                                blurOnSubmit={true}
                                multiline={true}
                                numberOfLines={10}
                            />
                            {renderRemainingCharCountCheck()}
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
                                sendPrivateMessageRef.current.close();
                            }} stretch={true}>Cancel/Close Pane...</AwesomeButtonBlue>
                            <View style={styles.hrLine} />
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </View>
        </Fragment>
    )
}

export default SendPrivateMessagePaneIndividualProfile;