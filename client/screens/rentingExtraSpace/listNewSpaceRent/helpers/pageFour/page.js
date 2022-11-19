import React, { Fragment } from "react";
import {
    View
} from "react-native";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import { ListItem, Avatar } from '@rneui/themed';
import _ from "lodash";
import uuid from 'react-native-uuid';
import stylesOne from "../pageStyles.js";
import stylesTwo from "../../startListingNewSpaceProcessStyles.js";

const styles = { ...stylesOne, ...stylesTwo };

const kindOfSpaceOptions = [
    {
        name: 'Residential',
        image: require("../../../../../assets/images/icon/list-space/temperature-controlled.png"),
        subtitle: 'Home or personal property.',
        id: uuid.v4()
    },
    {
        name: 'Commercial or business property',
        image: require("../../../../../assets/images/icon/list-space/private-entrance.png"),
        subtitle: "Place of business or retail space.",
        id: uuid.v4()
    }
];

const renderItemEnviormentalSelection = (setEnviormentType, environmentType, item, index) => {
    if (environmentType !== null && (environmentType.id === item.id)) {
        return (
            <View style={styles.listedItemWrapperSelected} key={index}>
                <ListItem style={styles.listeditemSelected} button={true} onPress={() => {
                    setEnviormentType(null);
                }}>
                    <Avatar source={item.image} />
                    <ListItem.Content>
                        <ListItem.Title style={styles.selectedTitle}>{item.name}</ListItem.Title>
                        <ListItem.Subtitle style={styles.selectedSubtitle}>{item.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        );
    } else {
        return (
            <View style={styles.listedItemWrapper} key={index}>
                <ListItem style={styles.listeditem} button={true} onPress={() => {
                    setEnviormentType(item);
                }}>
                    <Avatar source={item.image} />
                    <ListItem.Content>
                        <ListItem.Title style={styles.unselectedTitle}>{item.name}</ListItem.Title>
                        <ListItem.Subtitle style={styles.unselectedSubtitle}>{item.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        );
    }
}
const renderFooterButtonComponentPageThree = (handleSubItemSelection, environmentType) => {

    const calculatePendingSelection = () => {
        return environmentType !== null ? false : true;
    }
    return (
        <Fragment>
            <View style={styles.hr} />
            <AwesomeButtonBlue style={styles.absoluteButtonBottom} disabled={calculatePendingSelection()} type={"secondary"} onPress={() => handleSubItemSelection(3, 4, { environmentBuildingType: environmentType })} backgroundShadow={"black"} stretch={true}>Submit & Continue</AwesomeButtonBlue>
            <View style={styles.hr} />
        </Fragment>
    );
}

export default {
    renderItemEnviormentalSelection,
    renderFooterButtonComponentPageThree,
    kindOfSpaceOptions
}