import React, { useEffect, Fragment, useState } from "react";
import { Text, View, Button, ScrollView, Dimensions } from "react-native";
import { Colors } from "../../../../../constants/styles.js";
import _ from "lodash";
import { hairColorOptions } from "../../options/editProfile.js";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";
import axios from "axios";
import { BASE_URL } from "@env";
import LinearGradient from 'react-native-linear-gradient';
import { ListItem } from '@rneui/themed';


const { width, height } = Dimensions.get("window");

const HairColorComponentHelper = (props) => {

    const profileData = props.profileData;
    const styles = props.styles;
    const navigation = props.navigation;

    const [selectedColor, setSelectedColor] = useState({
        label: null,
        value: null
    });

    useEffect(() => {
        if (_.has(profileData, "hairColor")) {
            setSelectedColor(profileData.hairColor);
        }
    }, [])

    const handleSubmisison = () => {
        console.log("handleSubmisison clicked/ran...");

        const config = {
            uniqueId: props.userData.uniqueId,
            selectedValue: selectedColor,
            field: "hairColor"
        }

        axios.post(`${BASE_URL}/adjust/profile/data`, config).then((res) => {
            if (res.data.message === "Updated successfully!") {
                console.log("resdata", res.data);

                Toast.show({
                    type: 'success',
                    text1: `Successfully adjusted your 'hair-color settings'.`,
                    text2: `We've successfully uploaded your 'hair-color settings' properly - you new data is now live!`,
                    visibilityTime: 4250,
                    position: "bottom"
                });

                setTimeout(() => {
                    navigation.goBack();
                }, 2500);
            } else {
                console.log("errrorrrrrr", res.data);

                Toast.show({
                    type: 'error',
                    text1: `An error occurred while processing your request.`,
                    text2: `We've experienced an error while adjusting your 'hair-color settings' - please try this action again.`,
                    visibilityTime: 4250,
                    position: "bottom",
                    bottomOffset: -50
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const calculateDisabledEyeColor = () => {
        if (selectedColor.value !== null) {
            return false;
        } else {
            return true;
        }
    }
    return (
        <ScrollView horizontal={true} style={{ flexGrow: 1, flex: 1 }} contentContainerStyle={{ flexGrow: 1, flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Hair Color</Text>
                <Text style={styles.subtitle}>Select the closest color to your hair</Text>
                <View style={{ marginBottom: 17.5 }}>
                    {hairColorOptions.map((option, index) => {
                        if (option.value === "mixed") {
                            return (
                                <ListItem bottomDivider key={index} onPress={() => setSelectedColor(option)} containerStyle={selectedColor.value !== null && option.value === selectedColor.value ? { backgroundColor: "#ffdeea", minWidth: width * 0.9 } : { width: width * 0.9 }}>
                                    <LinearGradient style={{ minWidth: 32.5, minHeight: 32.5, borderRadius: 35 }} colors={[Colors.primaryColor, Colors.secondaryColor, Colors.greenColor]} />
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.breakerSection}>{option.label}</ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                            );
                        } else if (option.value === "bald") {
                            return (
                                <ListItem bottomDivider key={index} onPress={() => setSelectedColor(option)} containerStyle={selectedColor.value !== null && option.value === selectedColor.value ? { backgroundColor: "#ffdeea", minWidth: width * 0.9 } : { width: width * 0.9 }}>
                                    <View style={{ backgroundColor: option.color, minWidth: 32.5, minHeight: 32.5, borderRadius: 35, borderColor: "gray", borderWidth: 2 }} />
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.breakerSection}>{option.label}</ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                            );
                        } else {
                            return (
                                <ListItem bottomDivider key={index} onPress={() => setSelectedColor(option)} containerStyle={selectedColor.value !== null && option.value === selectedColor.value ? { backgroundColor: "#ffdeea", minWidth: width * 0.9 } : { width: width * 0.9 }}>
                                    <View style={{ backgroundColor: option.color, minWidth: 32.5, minHeight: 32.5, borderRadius: 35 }} />
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.breakerSection}>{option.label}</ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                            );
                        }
                    })}
                </View>
                <Button disabled={calculateDisabledEyeColor()} color={Colors.primaryColor} onPress={() => {
                    handleSubmisison();
                }} titleStyle={{ color: 'white' }} title={"Submit your selection"} />
            </View>
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {})(HairColorComponentHelper);