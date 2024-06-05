import React, { Fragment } from "react";
import { View, Dimensions } from "react-native";
import { Text as NativeText, Card, Icon } from '@rneui/themed';
import styles from "./calloutHelperStyles.js";
import moment from "moment";
import _ from "lodash";

const { width, height } = Dimensions.get("window");

const CustomCalloutRenderPopupViewMapHelperAvailableDeliveries = (props) => {

    const { mainData, date, dateString, id, comments, likes, dislikes, postedByID, postedByName, postedByUsername, newlyConstructedCoordsRandomizedNearby
    } = props;

    const { description, freightDescription, packagingDescription, deliveryTimespanSpecs, averagePalletSizeOfLoad, destinationZipCode, originZipCode, totalWeightOfLoad, attachedImages } = mainData;

    const calculateAppropriateText = (value) => {
        console.log("log", value.value);
        switch (value.value) {
            case "two-weeks":
                return "Within 2 weeks.";
            case "one-week":
                return "Within 1 week.";
            case "one-specific-date":
                return "On a specific date.";
            case "two-specific-dates":
                return "Between two dates.";
            case "flexible":
                return "Flexible delivery.";
            case "currently-unknown":
                return "Date unknown (contact user).";
            default:
                return "";
        }
    }

    const renderConditional = () => {
        if (_.has(mainData.deliveryTimespanSpecs.additionalInfo, "startDatePicked")) {
                const { startDatePicked, endDatePicked } = mainData.deliveryTimespanSpecs.additionalInfo;
                return (
                    <Fragment>
                        <View style={{ flexDirection: "row", display: "flex" }}>
                            <View style={styles.column}>
                                <NativeText style={styles.likesDislikesLabel}>Pickup Date</NativeText>
                                <NativeText style={styles.baselineSubText}>{moment(startDatePicked.unformattedDate).format("MM/DD/YYYY")}</NativeText>
                            </View>
                            <View style={styles.column}>
                                <NativeText style={styles.likesDislikesLabel}>Dropoff Date</NativeText>
                                <NativeText style={styles.baselineSubText}>{moment(endDatePicked.unformattedDate).format("MM/DD/YYYY")}</NativeText>
                            </View>
                        </View>
                    </Fragment>
                );
        } else {
            return (
                <Fragment>
                    <View style={{ flexDirection: "row", display: "flex" }}>
                        <View style={styles.column}>
                            <NativeText style={styles.likesDislikesLabel}>Pickup Date</NativeText>
                            <NativeText style={styles.baselineSubText}>{moment(mainData.deliveryTimespanSpecs.additionalInfo.unformattedDate).format("MM/DD/YYYY")}</NativeText>
                        </View>
                    </View>
                </Fragment>
            );
        }
    }
    return (
        <Fragment>
            <Card containerStyle={styles.calloutInnerWrapperCardContainer} style={styles.calloutInnerStyle} wrapperStyle={styles.calloutInnerStyle}>
                <Card.Title style={styles.headerTitleMain}>{`Posted by ${postedByUsername}`}</Card.Title>
                <Card.Divider />
                <View style={{ flexDirection: "row", display: "flex" }}>
                    <View style={styles.column}>
                        <NativeText style={styles.likesDislikesLabel}>Like(s) / {"\n"}Dislike(s)</NativeText>
                        <NativeText style={styles.likesDislikesText}>{likes}/{dislikes}</NativeText>
                    </View>
                    <View style={styles.column}>
                        <NativeText style={styles.likesDislikesLabel}>Origin/Destination Zip-Code</NativeText>
                        <NativeText style={styles.baselineSubText}>{`${originZipCode} / ${destinationZipCode}`}</NativeText>
                    </View>
                </View>
                <View style={styles.hrThick} />
                <View style={{ flexDirection: "row", display: "flex" }}>
                    <View style={styles.column}>
                        <NativeText style={styles.likesDislikesLabel}>Average Pallet Load-Size</NativeText>
                        <NativeText style={styles.baselineSubText}>{averagePalletSizeOfLoad}</NativeText>
                    </View>
                    <View style={styles.column}>
                        <NativeText style={styles.likesDislikesLabel}>Delivery Timeline-Type</NativeText>
                        <NativeText style={styles.baselineSubText}>{calculateAppropriateText(deliveryTimespanSpecs)}</NativeText>
                    </View>
                </View>
                <View style={styles.hrThick} />
                {renderConditional()}
                <View style={styles.hrThick} />
                <View style={{ flexDirection: "row", display: "flex" }}>
                    <View style={styles.columnFullWidth}>
                        <NativeText style={styles.likesDislikesLabel}>Description</NativeText>
                        <NativeText style={styles.baselineSubText}>{description.slice(0, 100)}{typeof description !== "undefined" && description.length >= 100 ? "..." : ""}</NativeText>
                    </View>
                </View>
            </Card>
        </Fragment>
    );
}
export default CustomCalloutRenderPopupViewMapHelperAvailableDeliveries;