import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from "react-native";
import lowerLatin from '@jsamr/counter-style/presets/lowerLatin';
import MarkedList from '@jsamr/react-native-li';
import uuid from "react-native-uuid";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import styles from "./sendInviteToUserPaneStyles.js";
import { Colors } from "../../../../constants/styles.js";
import { Button } from "@rneui/base";
import axios from "axios";
import { BASE_URL } from "@env";
import Toast from 'react-native-toast-message';
import { saveItemToEWasteCart } from "../../../../redux/actions/ewasteCart/cartLogic.js";
import { connect } from "react-redux";

const SelectAndSendInvitationSheetPane = (props) => {

    const [ listItems, setListItems ] = useState([]);
    const [ responseItems, setResonseData ] = useState(null);
    
    const { user } = props.props.route.params;

    const { formData } = props.props;

    console.log("formData", formData);

    const { saveItemToEWasteCart } = props;

    useEffect(() => {
        const data = [{
            id: uuid.v4(),
            text: `${user.firstName} ${user.lastName}`,
            label: "Name (Full)"
        }, {
            id: uuid.v4(),
            text: user.username,
            label: "Username"
        }, {
            id: uuid.v4(),
            text: user.verficationCompleted === true ? "Verified" : "NOT Verified.",
            label: "Account Verification Status"
        }, {
            id: uuid.v4(),
            text: `${user.totalUniqueViews} total profile view's`,
            label: "Profile View's"
        }, {
            id: uuid.v4(),
            text: typeof user.reviews !== "undefined" && user.reviews.length > 0 ? `${user.reviews.length} total review's` : `0 total review's`,
            label: "Total Review's"
        }];

        setListItems(data);
        setResonseData(formData);
    }, []);

    const handleNotificationInvitationLogic = () => {

        const { authenticatedUserData } = props;

        const config = {
            formData,
            userData: user,
            authenticatedUserData
        };

        axios.post(`${BASE_URL}/send/invite/notification/drop/off/organization`, config).then((res) => {
            if (res.data.message === "Successfully executed logic & sent notification!") {
                
                console.log("success : ", res.data);

                saveItemToEWasteCart([]);

                props.sheetRef.current.close();

                setTimeout(() => {
                    Toast.show({
                        type: 'success',
                        text1: `Successfully sent request/notification to the desired user - we have notified them!`,
                        text2: `You've successfully sent a notification to the desired user & they've received a new alert to respond to your inquiry within the next 24 hours, we will alert you when they respond with a decision!`,
                        visibilityTime: 4250,
                        position: "bottom"
                    });
                }, 500);
            } else {
                console.log("err", res.data);

                props.sheetRef.current.close();

                setTimeout(() => {
                    Toast.show({
                        type: 'error',
                        text1: `An error has occurred while attempting to notify the desired user, please try this action again.`,
                        text2: `We've encountered an error while attempting to send the desired user a notification/request however an unknown error occurred cancelling the attempt - please try this action again or contact support if the problem persists!`,
                        visibilityTime: 4250,
                        position: "bottom"
                    });
                }, 500);
            }
        }).catch((err) => {
            console.log("err", err);

            props.sheetRef.current.close();

            setTimeout(() => {
                Toast.show({
                    type: 'error',
                    text1: `An error has occurred while attempting to notify the desired user, please try this action again.`,
                    text2: `We've encountered an error while attempting to send the desired user a notification/request however an unknown error occurred cancelling the attempt - please try this action again or contact support if the problem persists!`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
            }, 500);
        });
    };

    const calculateInterval = interval => {
        switch (interval) {
            case 15:
                return "15 Minute(s)";
                break;
            case 30:
                return "30 Minute(s)";
                break;
            case 45:
                return "45 Minute(s)";
                break;
            case 60:
                return "60 Minute(s)";
                break;
            case 75:
                return "1 Hr. 15 Minute(s)";
                break;
            case 90:
                return "1 Hr. 30 Minute(s)";
                break;
            default: 
                return "N/A ~ Unknown."
                break;
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 52.5, flexGrow: 1 }}>
                <View style={styles.centered}>
                    <Button onPress={() => props.sheetRef.current.close()} title={"Close/Exit Pane View"} buttonStyle={styles.calloutButtonStyle} style={{ width: "100%" }} color={Colors.primaryColor} />
                </View>
                <Text style={[styles.submittingText, { marginLeft: 22.5 }]}>Collection user's core information</Text>
                <MarkedList counterRenderer={lowerLatin}>
                    {typeof listItems !== "undefined" && listItems.length > 0 ? listItems.map((item) => (
                        <View style={styles.columned} key={item.id}>
                            <View style={styles.rowItem}>
                                <Text style={styles.labelCustom}>{item.label}</Text>
                            </View>
                            <View style={styles.rowItem}>
                                <Text style={styles.bulletItem}>{'\u2022'} {item.text}</Text>
                            </View>
                        </View>
                    )) : <Fragment>
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
                    </Fragment>}
                    <View style={styles.blueThinHr} />
                    {formData !== null ? <View style={[styles.columnedOutter, { marginTop: 12.5 }]}>
                        <Text style={styles.submittingText}>Previously entered data to be submitted to user</Text>
                        <View style={styles.columnedLower}>
                            <View style={styles.rowItemTwo}>
                                <Text style={styles.labelCustom}>Desired Date/Time</Text>
                            </View>
                            <View style={styles.rowItemTwo}>
                                <Text style={styles.bulletItem}>{'\u2022'} {formData.dateTime}</Text>
                            </View>
                        </View>
                        <View style={styles.columnedLower}>
                            <View style={styles.rowItemTwoLarger}>
                                <Text style={styles.labelCustom}>Time Window/Slot (total timespan)</Text>
                            </View>
                            <View style={styles.rowItemTwo}>
                                <Text style={styles.bulletItem}>{'\u2022'} {calculateInterval(formData.interval)}</Text>
                            </View>
                        </View>
                        <View style={styles.columnedLower}>
                            <View style={styles.rowItemTwo}>
                                <Text style={styles.labelCustom}>Phone Number</Text>
                            </View>
                            <View style={styles.rowItemTwo}>
                                <Text style={styles.bulletItem}>{'\u2022'} {` (${formData.phoneNumberData.dialCode}) ~ ${formData.phoneNumberData.phoneNumber}`}</Text>
                            </View>
                        </View>
                    </View> : <Fragment>
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
                    </Fragment>}
                    <View style={styles.whiteThinHr} />
                    <Button onPress={() => handleNotificationInvitationLogic()} title={"Send Request & Notification"} buttonStyle={styles.calloutButtonStyle} style={{ width: "100%" }} color={Colors.greenColor} />
                    <View style={styles.whiteThinHr} />
                </MarkedList>
            </ScrollView>
        </View>
    );
}
export default connect(null, { saveItemToEWasteCart })(SelectAndSendInvitationSheetPane);