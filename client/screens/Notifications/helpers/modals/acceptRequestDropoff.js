import React, { Fragment, useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
import Modal from "react-native-modal";
import { Colors } from '../../../../constants/styles.js';
import styles from "../helperStyles.js";
import { Input } from 'react-native-elements';
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import { BASE_URL } from "@env";
import Toast from 'react-native-toast-message';
import Timeline from 'react-native-timeline-flatlist';
import _ from "lodash";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useNavigation } from '@react-navigation/native'; 
import axios from "axios";

const { width, height } = Dimensions.get("window");


const RenderModalContent = ({ modalVisibility, changeVisibilityState, selected, userData }) => {

    const [ agreeText, setAgreeText ] = useState("");
    const [ listData, setListData ] = useState([]);
    const [ ready, setReady ] = useState(false); 
    const [ globalReady, setGlobalReady ] = useState(false); 

    const navigation = useNavigation();

    console.log("selected", selected);

    const calculateIntervalTranslation = (interval) => {
        return `${interval} min drop-off window after agreed time/date`
    }

    useEffect(() => {

        setTimeout(() => {
            if ((_.has(selected, "notification") && _.has(selected.notification, "metadata") && (typeof selected.notification.metadata.other === "object" && Object.keys(selected.notification.metadata.other).length > 0))) {

                const { other } = selected.notification.metadata;

                const newListData = [
                    { time: 'Date/Time', title: 'Drop-Off Date/Time', description: other.dateTime, lineColor: Colors.primaryColor, icon: require('../../../../assets/images/icon/timeline-2.png') },
                    { time: 'Window', title: 'Drop-Off Time-Window', lineColor: Colors.secondaryColor, description: calculateIntervalTranslation(other.interval), icon: require('../../../../assets/images/icon/timeline-3.png') },
                    { time: 'Phone \nNumber', title: `Phone # Of Contracted User`, lineColor: Colors.primaryColor, description: `${other.phoneNumberData.dialCode} ${other.phoneNumberData.phoneNumber}`, icon: require('../../../../assets/images/icon/timeline-1.png') },
                    { time: 'Additional \nInfo', title: 'Included Note(s) & Message', description: other.noteText, lineColor: Colors.secondaryColor, icon: require('../../../../assets/images/icon/timeline-4.png') }
                ];
    
                setListData(newListData);
    
                setGlobalReady(true);
            }
        },  1000);
    }, [])

    const handleAgreementSubmission = () => {
        const config = {
            selected,
            authenticatedUserData: userData
        };
        // make API request to backend...
        axios.post(`${BASE_URL}/add/contract/to/active/contracts/dropoff`, config).then((res) => {
            console.log("res.data", res.data);

            const { message, result } = res.data;

            if (message === "Successfully accepted the new proposal/request & it is now active in your 'pending queue'!") {
                
                console.log("Successfully accepted the new proposal/request & it is now active in your 'pending queue'!");

                changeVisibilityState();

                Toast.show({
                    type: 'success',
                    text1: `You've successfully accepted this drop-off contract!`,
                    text2: `You've successfully accepted the contract/drop-off request and you will now be able to view more information about the items being delivered & other misc information in your 'active queue'.`,
                    visibilityTime: 2500,
                    position: "bottom"
                });

                navigation.replace("BottomTabScreen", { index: 1 });

            } else if (message === "Request could NOT be completed or 'accepted' properly... NO action taken.") {

                console.log("Request could NOT be completed or fullfiled properly...");

                changeVisibilityState();

                Toast.show({
                    type: 'error',
                    text1: `Error occurred while processing your request...`,
                    text2: `An error has occurred and we were NOT able to properly process your desired action - please try this action again & contact support if the problem persists!`,
                    visibilityTime: 4250,
                    position: "bottom"
                });

            } else {
                console.log("No match/request found or retreieved.");

                Toast.show({
                    type: 'error',
                    text1: `Error occurred while processing your request...`,
                    text2: `An error has occurred and we were NOT able to properly process your desired action - please try this action again & contact support if the problem persists!`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
            }
        }).catch((err) => {
            
            console.log("err", err);

            Toast.show({
                type: 'error',
                text1: `Error occurred while processing your request...`,
                text2: `An error has occurred and we were NOT able to properly process your desired action - please try this action again & contact support if the problem persists!`,
                visibilityTime: 4250,
                position: "bottom"
            });
        })
    }

    const calculateDisabled = () => {
        if ((typeof agreeText !== "undefined" && agreeText.length > 0) && (agreeText.toUpperCase().trim() === "AGREE")) {
            return false;
        } else {
            return true;
        }
    }
    console.log("listData", listData, ready);
    return (
        <Fragment>
            <Modal onBackButtonPress={() => changeVisibilityState()} onBackdropPress={() => null} isVisible={modalVisibility} backdropColor={Colors.blackColor}>
                <ScrollView contentContainerStyle={styles.contentContainer} style={{ flexGrow: 1 }}>
                    <View style={styles.modalInnerContainer}>
                        <ScrollView contentContainerStyle={styles.contentContainerInner} style={{ flexGrow: 1 }}>
                            <Image source={require("../../../../assets/images/contract.png")} resizeMode={"cover"} style={styles.toppedImageBanner} />
                            <View style={styles.hr} />
                            <Text style={styles.label}>Enter your response whether you'd like to 'AGREE' to accept this notification contract request (to decline, click 'reject')</Text>
                            <Input
                                placeholder="Type 'AGREE' to accept this contract..."
                                leftIcon={<Image source={require("../../../../assets/images/icon/checked-circle.png")} style={styles.inputIcon} />}
                                style={styles.acceptanceInput}
                                value={agreeText}
                                autoCapitalize={"characters"}
                                onChangeText={value => setAgreeText(value)}
                            />
                            {globalReady === true ? <Timeline
                                innerCircle={'icon'}
                                data={listData}
                                circleSize={30}
                                extraData={listData}
                                iconStyle={styles.timelineIconStyle}
                                timeContainerStyle={styles.timeContainerStyles}
                                options={{
                                    style:{
                                        margin: 0,
                                        padding: 0,
                                        minWidth: width * 0.85,
                                        width: width * 0.85
                                    }
                                }}
                            /> : <Fragment>
                                <SkeletonPlaceholder>
                                    <View style={{ maxWidth: "97.5%", width: "97.5%", height: 82.5 }} />    
                                </SkeletonPlaceholder>
                                <View style={{ marginTop: 20 }} /><SkeletonPlaceholder>
                                    <View style={{ maxWidth: "97.5%", width: "97.5%", height: 82.5 }} />    
                                </SkeletonPlaceholder>
                                <View style={{ marginTop: 20 }} /><SkeletonPlaceholder>
                                    <View style={{ maxWidth: "97.5%", width: "97.5%", height: 82.5 }} />    
                                </SkeletonPlaceholder>
                            </Fragment>}
                        </ScrollView>
                        <View style={styles.hr} />
                        <AwesomeButtonBlue disabled={calculateDisabled()} type={"secondary"} onPress={() => handleAgreementSubmission()} backgroundShadow={"black"} width={width * 0.8}>Submit Response & Respond</AwesomeButtonBlue>
                        <View style={styles.hr} />
                        <AwesomeButtonBlue backgroundDarker={"#868686"} backgroundColor={Colors.primaryColor} onPress={() => {}} backgroundShadow={"black"} width={width * 0.8}>Reject Contract Request</AwesomeButtonBlue>
                        <View style={styles.hr} />
                    </View>
                </ScrollView>
            </Modal>
        </Fragment>
    );
}
export default RenderModalContent;