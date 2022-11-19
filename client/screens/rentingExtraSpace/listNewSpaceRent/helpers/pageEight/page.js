import React, { Fragment, useState } from "react";
import stylesOne from "../pageStyles.js";
import stylesTwo from "../../startListingNewSpaceProcessStyles.js";
import {
    View,
    Text,
    Image,
    TextInput,
    FlatList,
    TouchableOpacity
} from "react-native";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import uuid from "react-native-uuid";
import { ListItem, Avatar } from '@rneui/themed';

const styles = { ...stylesOne, ...stylesTwo };

const contactOptions = [
    {
        name: 'Yes, Contact is required prior',
        image: require("../../../../../assets/images/icon/list-space/yes.png"),
        subtitle: 'Renters should contact me each time prior to delivering (applicable to both drivers & self-deliveries)',
        id: uuid.v4()
    },
    {
        name: 'No, Contact is NOT required prior',
        image: require("../../../../../assets/images/icon/list-space/no.png"),
        subtitle: "Renters can come WITHOUT an appointment prior to delivering (applicable to both drivers & self-deliveries)",
        id: uuid.v4()
    }
];

const RenderPageEightHelperData = ({ renderHeaderLogicData, storageData, handleSubItemSelection }) => {

    const [ selected, setSelected ] = useState(null);
    
    const renderItem = ({ item, index }) => {
        if (selected !== null && (selected.id === item.id)) {
            return (
                <View style={styles.listedItemWrapperSelected} key={index}>
                    <ListItem style={styles.listeditemSelected} button={true} onPress={() => {
                        setSelected(null);
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
                        setSelected(item);
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

    const renderComponentFooterHelper = (handleSubItemSelection, selected) => {
        return (
            <Fragment>
                <View style={styles.bottomWrapperContainer}>
                    <AwesomeButtonBlue style={styles.absoluteButtonBottom} disabled={calculateDisabledButtonConditional()} type={"secondary"} onPress={() => handleSubItemSelection(7, 8, { contactRequiredOrNot: selected })} backgroundShadow={"black"} stretch={true}>Submit & Continue</AwesomeButtonBlue>
                </View>
            </Fragment>
        );
    }

    const keyExtractor = (item, index) => index.toString();

    const calculateDisabledButtonConditional = () => {
        return selected !== null ? false : true;
    }

    return (
        <View style={{ flex: 1 }}>
           <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponentStyle={styles.listheaderStyles}
                ListHeaderComponent={() => renderHeaderLogicData("Help renters understand when you're available", "Please elaborate and tell us when your 'ideal' meeting hours are if you're not using some sort of automated system...")}
                keyExtractor={keyExtractor}
                data={contactOptions}
                ListFooterComponent={() => renderComponentFooterHelper(handleSubItemSelection, selected)}
                renderItem={renderItem}
            />
        </View>
    );
}


export default RenderPageEightHelperData;