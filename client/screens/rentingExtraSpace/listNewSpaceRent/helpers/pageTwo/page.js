import React, { Fragment } from "react";
import {
    View
} from "react-native";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import { ListItem, Avatar } from '@rneui/themed';
import styles from "../pageStyles.js";
import _ from "lodash";
import uuid from 'react-native-uuid';

const typeListOptions = [
    {
        name: 'Climate Controlled',
        image: require("../../../../../assets/images/icon/list-space/temperature-controlled.png"),
        subtitle: 'Temperature regulated and protected from outside conditions (such as humidity and rain)',
        id: uuid.v4()
    },
    {
        name: 'Private Entrance',
        image: require("../../../../../assets/images/icon/list-space/private-entrance.png"),
        subtitle: "Accessible through a sperate entrance. Renters don't have to walk through someone's home to access the space",
        id: uuid.v4()
    },
    {
        name: 'Private Space',
        image: require("../../../../../assets/images/icon/list-space/private-1.png"),
        subtitle: 'Not shared with other renters',
        id: uuid.v4()
    },
    {
        name: 'Locked/Secure Area',
        image: require("../../../../../assets/images/icon/list-space/locked.png"),
        subtitle: 'Protected by a system, key or access code to enter',
        id: uuid.v4()
    },
    {
        name: 'Pet Free',
        image: require("../../../../../assets/images/icon/list-space/animals-restricted.png"),
        subtitle: 'Free from any pets or animals (animals can be present but are properly secured: Crate, closed room far away, backyard, etc...)',
        id: uuid.v4()
    },
    {
        name: 'Security Camera Monitored',
        image: require("../../../../../assets/images/icon/list-space/security-system.png"),
        subtitle: 'Monitored by security camera(s) through a legitmate system with emergency response capability',
        id: uuid.v4()
    },
    {
        name: 'No Stairs',
        image: require("../../../../../assets/images/icon/list-space/staircase.png"),
        subtitle: 'Accessibe without the use of stairs or climbing',
        id: uuid.v4()
    },
];

const renderItemType = (setPageTwoSelectedArr, prevState, item, index) => {

    if (prevState.filter(el => el.id === item.id).length > 0) {
        return (
            <View style={styles.listedItemWrapperSelected} key={index}>
                <ListItem style={styles.listeditemSelected} button={true} onPress={() => {
                    setPageTwoSelectedArr((previousDataState) => {
                        return previousDataState.filter(specific => specific.id !== item.id);
                    });
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
                    setPageTwoSelectedArr((previousDataState) => {
                        return [...previousDataState, _.omit(item, 'image')]
                    });
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
const renderFooterButtonComponentPageTwo = (handleSubItemSelection, pageTwoSelectedArr) => {

    const calculateDisabled = () => {
        if (typeof pageTwoSelectedArr !== "undefined" && pageTwoSelectedArr.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    return (
        <Fragment>
            <View style={styles.hr} />
            <AwesomeButtonBlue disabled={calculateDisabled()} type={"secondary"} onPress={() => handleSubItemSelection(1, 2, { environmentalConditions: pageTwoSelectedArr })} backgroundShadow={"black"} stretch={true}>Submit & Continue</AwesomeButtonBlue>
            <View style={styles.hr} />
        </Fragment>
    );
}

export default {
    typeListOptions,
    renderItemType,
    renderFooterButtonComponentPageTwo
}