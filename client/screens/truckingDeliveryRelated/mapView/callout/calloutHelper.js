import React, { Fragment } from "react";
import { View, Dimensions } from "react-native";
import { Text as NativeText, Card, Icon } from '@rneui/themed';
import styles from "./calloutHelperStyles.js";

const CustomCalloutRenderPopupViewMapHelperAvailableDeliveries = (props) => {

    const { mainData, date, dateString, id, comments, likes, dislikes, postedByID, postedByName, postedByUsername, newlyConstructedCoordsRandomizedNearby
    } = props;

    const { description, freightDescription, packagingDescription, deliveryTimespanSpecs, averagePalletSizeOfLoad, destinationZipCode, originZipCode, totalWeightOfLoad, attachedImages } = mainData;

    const calculateAppropriateText = (value) => {
        switch (value) {
            case "two-weeks":
                return "Must be delivered WITHIN TWO (2) WEEKS."
                break;
            case "one-week":
                return "Must be delivered WITHIN ONE (1) WEEKS."
                break;
            case "one-specific-date":
                return "On a SPECIFIC date (see actual listing data for details)"
                break;
            case "two-specific-dates":
                return "BETWEEN TWO specific dates (see actual listing data for details)"
                break;
            case "flexible":
                return "Flexible - No set-in-stone date of delivery."
                break;
            case "currently-unknown":
                return "Currently unknown - Will be posted at a later date (contact the user)"
                break;
            default:
                break;
        }
    }

    return (
        <Fragment>
            <Card containerStyle={styles.calloutInnerWrapperCardContainer} style={styles.calloutInnerStyle} wrapperStyle={styles.calloutInnerStyle}>
                <Card.Title style={styles.headerTitleMain}>{`${postedByName} a.k.a. ${postedByUsername}`}</Card.Title>
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