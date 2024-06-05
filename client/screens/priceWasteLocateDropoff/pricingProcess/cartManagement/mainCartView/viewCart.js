import React, { Fragment } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList
  } from 'react-native';
import styles from "./viewCartStyles.js";
import { connect } from 'react-redux';
import moment from 'moment';
import uuid from "react-native-uuid";
import { saveItemToEWasteCart } from "../../../../../redux/actions/ewasteCart/cartLogic.js";
import { Button } from "@rneui/base";
import { Colors } from "../../../../../constants/styles.js";
import { useNavigation } from '@react-navigation/native';
import _ from "lodash";

const ViewManageCartOfEWasteDisposalItemsPending = ({ cartData, saveItemToEWasteCart }) => {

    const navigation = useNavigation();

    const calculateDeviceTypeReturn = (type) => {
        switch (type) {
            case 'mobiles':
                return "Smartphone(s)";
                break;
            case 'tablets':
                return "Tablet(s)";
                break;
            case 'wearables':
                return "Smartwatch/Wearable(s)";
                break;
            case 'laptops':
                return "Laptop(s)";
                break;
            case 'televisions':
                return "Television(s)";
                break;
            case "gamingconsoles":
                return "Gaming Console(s)";
                break;
            case "cameras":
                return "Camera(s)";
                break;
            default: 
                return "Unknown/Unavailable";
        }
    };

    const renderItem = ({ item, index }) => {        
        return (
            <TouchableOpacity key={item.uniqueId} style={styles.container}>
                <TouchableOpacity onPress={() => saveItemToEWasteCart(cartData.filter((data) => item.uniqueId !== data.uniqueId))} style={styles.smallCloseIcon}>
                    <Image source={require("../../../../../assets/images/icon/close-100.png")} style={styles.smallCloseIcon}/>
                </TouchableOpacity>
                <Image source={{ uri: typeof item["Picture URL"] !== "undefined" ? item["Picture URL"] : "https://identification-blockchain.s3.us-west-2.amazonaws.com/no-image.jpg" }} style={styles.avatar}/>
                <View style={styles.content}>
                    <View style={styles.mainContent}>
                        <View style={styles.text}>
                            <Text style={styles.name}>{`${item.Brand} - ${item.Model}${_.has(item, "Model Name") ? "/" : _.has(item, "Processor") ? "/" : ""}${_.has(item, "Model Name") ? item["Model Name"] : _.has(item, "Processor") ? item.Processor : ""}`}</Text>
                            <Text>{calculateDeviceTypeReturn(item.category)} {"\n"}Spec(s): {`${_.has(item, "Processor") ? item.Processor : "Unavailable"} w/${_.has(item, "RAM") ? item.RAM : "Unavailable"} ~ ${_.has(item, "Operating System") ? item["Operating System"] : _.has(item, "Operating system") ? item["Operating system"] : "Unavailable"}`}</Text>
                        </View>
                        <View style={styles.thinnerHR} />
                        <Text style={styles.timeAgo}>Added Approx. {moment(item.dateAdded).fromNow()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    } 

    const renderEmptyListComponent = () => {
        return (
            <View style={{ margin: 12.5 }}>
                <Text style={styles.noDataHeaderText}>You haven't added any 'e-waste' items to your drop-off/disposal wishlist - please add some items to populate this data in order to proceed to get paid for your old electronic products & find a drop-off location/point...</Text>
                <View style={styles.hrMid} />
                <View style={styles.justFlexOnly}>
                    <View style={styles.emptyListView}>
                        <Image source={require("../../../../../assets/images/dropoff_prev_ui.png")} style={styles.largeIllustration}/>
                    </View>
                </View>
            </View>
        );
    }
    const renderHeaderButton = () => {
        return (
            <View style={styles.topContainerView}>
                <Button onPress={() => navigation.navigate('DropOffInformationDialogMap')} title={"Continue To 'Drop-Off Selection(s) Page'"} buttonStyle={styles.buttonStyleBottom} style={{ width: "100%" }} color={Colors.secondaryColor} />
            </View>
        );
    };

    return (
        <Fragment>
            <View style={styles.backingContainerView}>
                <FlatList
                    style={styles.root}
                    data={cartData}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={styles.separator}/>
                        )
                    }}
                    keyExtractor={(item) => {
                        return uuid.v4()
                    }}
                    ListHeaderComponent={renderHeaderButton()}
                    ListEmptyComponent={renderEmptyListComponent()}
                    renderItem={renderItem}
                />
            </View>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        cartData: state.cartData.cartData
    }
};

export default connect(mapStateToProps, { saveItemToEWasteCart })(ViewManageCartOfEWasteDisposalItemsPending);