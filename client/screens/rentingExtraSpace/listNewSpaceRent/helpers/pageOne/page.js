import React, { Fragment } from "react";
import {
    View,
    Text,
    FlatList
} from "react-native";
import Collapsible from 'react-native-collapsible';
import { ListItem, Avatar } from '@rneui/themed';
import styles from "../../startListingNewSpaceProcessStyles.js";
import _ from "lodash";
import uuid from 'react-native-uuid';

const list = [
    {
        name: 'Indoor',
        image: require("../../../../../assets/images/icon/list-space/interior.png"),
        subtitle: 'Garage, warehouse, bedroom, etc.',
        id: uuid.v4()
    },
    {
        name: 'Outdoor',
        image: require("../../../../../assets/images/icon/list-space/outdoor.png"),
        subtitle: 'Driveway, carport, parking gargage, etc.',
        id: uuid.v4()
    }
];

const sublist = [
    {
        name: 'Garage',
        image: require("../../../../../assets/images/icon/list-space/garage.png"),
        id: uuid.v4(),
        subtitle: "No subtitle has been provided."
    },
    {
        name: 'Parking Garage',
        image: require("../../../../../assets/images/icon/list-space/outdoor.png"),
        id: uuid.v4(),
        subtitle: "No subtitle has been provided."
    },
    {
        name: 'Warehouse',
        image: require("../../../../../assets/images/icon/list-space/warehouse.png"),
        id: uuid.v4(),
        subtitle: "No subtitle has been provided."
    },
    {
        name: 'Self Storage Unit',
        image: require("../../../../../assets/images/icon/list-space/storage.png"),
        id: uuid.v4(),
        subtitle: "No subtitle has been provided."
    },
    {
        name: 'Shipping Container',
        image: require("../../../../../assets/images/icon/list-space/container.png"),
        id: uuid.v4(),
        subtitle: "No subtitle has been provided."
    },
    {
        name: 'Shed/Barn (Accessible if in back-yard)',
        image: require("../../../../../assets/images/icon/list-space/shed.png"),
        id: uuid.v4(),
        subtitle: "No subtitle has been provided."
    },
    {
        name: 'Front Driveway (On the driveway)',
        image: require("../../../../../assets/images/icon/list-space/closet.png"),
        id: uuid.v4(),
        subtitle: "No subtitle has been provided."
    },
    {
        name: 'Rear-Driveway (Accessible from front)',
        image: require("../../../../../assets/images/icon/list-space/basement.png"),
        id: uuid.v4(),
        subtitle: "No subtitle has been provided."
    },
    {
        name: 'Front Lawn (Concealed & Locked/Protected)',
        image: require("../../../../../assets/images/icon/list-space/bedroom.png"),
        id: uuid.v4(),
        subtitle: "No subtitle has been provided."
    },
    {
        name: 'Back Lawn (Concealed & Locked/Protected)',
        image: require("../../../../../assets/images/icon/list-space/attic.png"),
        id: uuid.v4(),
        subtitle: "No subtitle has been provided."
    },
    {
        name: 'Other/No-Match',
        image: require("../../../../../assets/images/icon/list-space/question.png"),
        id: uuid.v4(),
        subtitle: "If none of the other options describe your space..."
    }
];

const renderItem = (setIsCollapsed, setSelected, selected, item, index, setProgressNumber, totalNumPages) => {

    console.log("0.05 / totalNumPages check...:", (0.05 / totalNumPages) * 10);

    if (selected !== null && (item.id === selected.id)) {
        return (
            <View style={styles.listedItemWrapperSelected} key={index}>
                <ListItem style={styles.listeditemSelected} button={true} onPress={() => {
                    setIsCollapsed(false);
                    setSelected(item);

                    if (setProgressNumber !== null) {
                        setProgressNumber((0.05 / totalNumPages) * 10)
                    }
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
                    setIsCollapsed(false);
                    setSelected(item);
                    
                    if (setProgressNumber !== null) {
                        setProgressNumber((0.05 / totalNumPages) * 10)
                    }
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

const renderItemSublist = (item, index, handleSubItemSelection, newData) => {
    return (
        <View style={styles.listedItemWrapper} key={index}>
            <ListItem style={styles.listeditem} button={true} onPress={() => handleSubItemSelection(0, 1, newData)}> 
                <Avatar height={25} width={25} source={item.image} />
                <ListItem.Content>
                    <ListItem.Title style={styles.unselectedTitle}>{item.name}</ListItem.Title>
                    {_.has(item, "subtitle") && item.subtitle !== "No subtitle has been provided." ? <ListItem.Subtitle style={styles.unselectedSubtitle}>{item.subtitle}</ListItem.Subtitle> : null}
                </ListItem.Content>
            </ListItem>
        </View>
    );
}

const renderHeaderLogicData = (str1, str2) => {
    return (
        <Fragment>
            <Text style={styles.titleTopText}>{str1}</Text>
            <View style={{ padding: 6.75, backgroundColor: "rgba(255, 255, 255, 0.675)", justifyContent: "center", alignContent: "center", alignItems: "center", borderWidth: 1.5, borderColor: "#000" }}>
                <Text style={styles.label}>{str2}</Text>
            </View>
        </Fragment>
    );
}

const renderComponentFooterHelper = (isCollapsed, keyExtractor, handleSubItemSelection, dataChunk) => {
    return (
        <View style={styles.borderedTopContainer}>
            <Collapsible collapsed={isCollapsed}>
                <FlatList
                    keyExtractor={keyExtractor}
                    data={sublist}
                    renderItem={({ item, index }) => renderItemSublist(item, index, handleSubItemSelection, { mainCategory: _.omit(dataChunk, 'image'), subCategory: _.omit(item, 'image') })}
                />
            </Collapsible>
        </View>
    );
}

export default {
    renderComponentFooterHelper, 
    renderHeaderLogicData, 
    renderItem,
    list
}