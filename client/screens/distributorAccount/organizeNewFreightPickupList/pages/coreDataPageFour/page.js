import React, { Fragment, useState } from "react";
import { View, Text, TextInput, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import styles from "./pageStyles.js";
import {  connect } from "react-redux";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import DatePicker from 'react-native-modern-datepicker';
import moment from "moment";
import { Colors, Sizes } from "../../../../../constants/styles";
import axios from "axios";
import { BASE_URL, BASE_ASSET_URL } from "@env";
import Toast from 'react-native-toast-message';
import { updateFreightDetailsState } from "../../../../../redux/actions/requestFreightPickup/pickupDetails.js";
import { FlatList } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const timesSlots = [{
    label: "9:0AM.",
    value: "09:00:00"
}, {
    label: "10:00AM",
    value: "10:00:00"
}, {
    label: "11:00AM",
    value: "11:00:00"
}, {
    label: "12:00PM",
    value: "12:00:00"
}, {
    label: "1:00PM",
    value: "13:00:00"
}, {
    label: "2:00PM",
    value: "14:00:00"
}, {
    label: "3:00PM",
    value: "15:00:00"
}, {
    label: "4:00PM",
    value: "16:00:00"
}, {
    label: "5:00PM",
    value: "17:00:00"
}, {
    label: "6:00PM",
    value: "18:00:00"
}, {
    label: "7:00PM",
    value: "19:00:00"
}, {
    label: "8:00PM",
    value: "20:00:00"
}, {
    label: "9:00PM",
    value: "21:00:00"
}, {
    label: "10:00PM",
    value: "22:00:00"
}]

const PageFourDistributorAccountCreation = ({ userData, freightData, freightImages, updateMainState, updateFreightDetailsState }) => {

    const [ state, setState ] = useState({
        dateSelected: new Date(),
        dateSelectedChanged: false,
        earliestTime: null,
        latestTime: null
    });

    const { earliestTime, latestTime, dateSelected, dateSelectedChanged } = state;
    
    const handleFinalSubmission = () => {
        console.log("handleFinalSubmission clicked/ran...!");

        const config = {
            freightData, 
            userData,
            earliestTime, 
            latestTime,
            calculatedDateMain: dateSelected
        };
        // handle request...
        axios.post(`${BASE_URL}/initiate/new/label/creation`, config).then((res) => {
            if (res.data.message === "Successfully requested the freight delivery!") {
                console.log("ressssssssss.data", res.data);

                const { data } = res.data;
                
                const newData = {
                    ...freightData,
                    shippingLabel: data,
                    dateAndTime: {
                        earliestTime, 
                        latestTime, 
                        dateSelected
                    },
                    page: 6
                };
        
                updateFreightDetailsState(newData);
        
                setTimeout(() => {
                    updateMainState({ page: 6 });
                },  725);
            } else {
                console.log("Err", res.data);

                Toast.show({
                    type: 'error',
                    text1: `An error occurred while requesting your 'freight delivery'!`,
                    text2: `You're requested freight delivery could not be requested properly... Please try the action again or contact support if the problem persists!`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
            }
        }).catch((err) => {
            console.log(err);

            Toast.show({
                type: 'error',
                text1: `An error occurred while requesting your 'freight delivery'!`,
                text2: `You're requested freight delivery could not be requested properly... Please try the action again or contact support if the problem persists!`,
                visibilityTime: 4250,
                position: "bottom"
            });
        });

    }
    const calculateDisabledState = () => {
        if (latestTime !== null && dateSelected !== null && dateSelectedChanged) {
            return false;
        } else {
            return true;
        }
    }

    const handleTimeSelectionEarliest = (item) => {
        setState(prevState => {
            return {
                ...prevState,
                earliestTime: item
            }
        })
    }
    console.log*("state.earliestTime", state.earliestTime);

    const handleTimeSelectionLatest = (item) => {
        const earliest = Number(state.earliestTime.value.split(":")[0]);

        console.log("earliest", earliest);

        if (earliest < Number(item.value.split(":")[0])) {
            setState(prevState => {
                return {
                    ...prevState,
                    latestTime: item
                }
            })
            Toast.show({
                type: 'info',
                text1: `Selected your desired END-time of ${item.value}!`,
                visibilityTime: 1750,
                position: "bottom"
            });
        } else {
            Toast.show({
                type: 'error',
                text1: `Select a date AFTER ${state.earliestTime.value} to proceed...`,
                visibilityTime: 1750, 
                position: "bottom"
            });
        }
    }

    console.log("state", earliestTime, latestTime, dateSelected);
    return (
        <Fragment>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }} style={styles.outterContainer}>
                <View style={styles.container}>

                    <View style={styles.contentContainer}>
                        <DatePicker
                            minimumDate={moment(new Date()).format("YYYY-MM-DD")}
                            maximumDate={moment(new Date()).add(3, 'w').format("YYYY-MM-DD")}
                            disableDateChange={false}
                            mode={"calendar"}
                            onDateChange={(date) => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        dateSelected: date,
                                        dateSelectedChanged: true
                                    }
                                })
                                Toast.show({
                                    type: 'info',
                                    text1: `Selected your desired DATE!`,
                                    visibilityTime: 1750,
                                    position: "bottom"
                                });
                            }}
                            options={{
                                backgroundColor: '#fff',
                                textHeaderColor: Colors.secondaryColor,
                                textDefaultColor: Colors.secondaryColor,
                                selectedTextColor: '#fff',
                                textDefaultColor: Colors.darkerBlue,
                                mainColor: Colors.primaryColor,
                                textSecondaryColor: Colors.primaryColor,
                                borderColor: 'rgba(122, 146, 165, 0.1)',
                            }}
                            selected={state.dateSelected.toString()}
                        />
                    </View>
                    <View style={styles.thinerHR} />
                    <View style={styles.timeWrapper}>
                        <Text style={styles.labelCustom}>Select the <Text style={{ color: Colors.secondaryColor }}>EARLIEST</Text> pick-up time on the selected day</Text>
                        <FlatList
                            data={timesSlots}
                            keyExtractor={(item) => `${item.label}`}
                            contentContainerStyle={{ flexDirection: "row", display: "flex", paddingVertical: Sizes.fixPadding * 2.0, maxWidth: width * 0.85, flexWrap: "wrap", margin: 11.25 }}
                            renderItem={({ item, index }) => {
                                return (
                                    <Fragment key={index}>
                                        <TouchableOpacity onPress={() => handleTimeSelectionEarliest(item)} style={earliestTime !== null && item.value === earliestTime.value ? styles.selectedOutlinedBoxed : styles.outlinedBoxed}>
                                            <Text style={earliestTime !== null && item.value === earliestTime.value ? styles.selectedOutlinedBoxedText : styles.outlinedBoxedText}>{item.label}</Text>
                                        </TouchableOpacity>
                                    </Fragment>
                                );
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    {earliestTime !== null ? <Fragment>
                        <View style={styles.thinerHR} />
                    <View style={styles.timeWrapper}>
                        <Text style={styles.labelCustom}>Select the <Text style={{ color: Colors.secondaryColor }}>LATEST</Text> pick-up time on the selected day</Text>
                        {state.earliestTime !== null ? <FlatList
                            data={timesSlots}
                            keyExtractor={(item) => `${item.label}`}
                            contentContainerStyle={{ flexDirection: "row", display: "flex", paddingVertical: Sizes.fixPadding * 2.0, maxWidth: width * 0.85, flexWrap: "wrap", margin: 11.25 }}
                            renderItem={({ item, index }) => {
                                return (
                                    <Fragment key={index}>
                                        <TouchableOpacity onPress={() => handleTimeSelectionLatest(item)} style={latestTime !== null && item.value === latestTime.value ? styles.selectedOutlinedBoxed : styles.outlinedBoxed}>
                                            <Text style={latestTime !== null && item.value === latestTime.value ? styles.selectedOutlinedBoxedText : styles.outlinedBoxedText}>{item.label}</Text>
                                        </TouchableOpacity>
                                    </Fragment>
                                );
                            }}
                            showsVerticalScrollIndicator={false}
                        /> : null}
                    </View></Fragment> : null}
                    <View style={styles.footer}>
                        <View style={styles.thinerHR} />
                        <AwesomeButtonBlue disabled={calculateDisabledState()} type={"secondary"} onPress={() => handleFinalSubmission()} backgroundShadow={"black"} stretch={true}>Request Freight Shipping Label</AwesomeButtonBlue>
                        <View style={[styles.thinerHR, { marginTop: 17.25 }]} />
                        <AwesomeButtonBlue backgroundDarker={"#000"} backgroundColor={"#e60000"} style={styles.absoluteButtonBottom} type={"secondary"} onPress={() => {
                            updateMainState({ page: 1 });

                            updateFreightDetailsState({});
                        }} textColor={"#fff"} backgroundShadow={"black"} stretch={true}>Restart Process</AwesomeButtonBlue>
                    </View>
                </View>
            </ScrollView>
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    console.log("state.freightPickupData", state.freightPickupData.formData);
    return {
        location: state.location.currentLoc,
        userData: state.auth.data,
        freightData: state.freightPickupData.formData,
        freightImages: state.freightPickupData.formData.relevantImagesOfFreight
    }
}
export default connect(mapStateToProps, { updateFreightDetailsState })(PageFourDistributorAccountCreation);