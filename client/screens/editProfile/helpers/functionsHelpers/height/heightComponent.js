import React, { Fragment, useState, useEffect } from "react";
import { Text, View, Button, Image } from "react-native";
import { Slider } from 'react-native-awesome-slider';
import { Colors } from "../../../../../constants/styles.js";
import _ from "lodash";
import { useSharedValue } from 'react-native-reanimated';
import Toast from "react-native-toast-message";
import { connect } from "react-redux";
import axios from "axios";
import { BASE_URL } from "@env";


const HeightHelperComponent = (props) => {
    console.log("props HeightHelperComponent", props);

    const [heightSize, setHeight] = useState(useSharedValue(0));
    const [setGuessedValue, setGuessedValueState] = useState(0);
    const second = useSharedValue(0);
    const third = useSharedValue(213);

    const profileData = props.profileData;
    const styles = props.styles;
    const navigation = props.navigation;

    const cmToInFt = (cm, inches = Math.round(cm / 2.54)) => {
        return {
            feet: Math.floor(inches / 12),
            inches: inches % 12
        }
    }

    
    const submitNewHeight = () => {
        console.log("submitNewHeight clicked/ran...");

        const newHeightDetails = {
            height: `${cmToInFt(setGuessedValue).feet}'${cmToInFt(setGuessedValue).inches}"`,
            CMHeight: setGuessedValue
        }

        const config = {
            uniqueId: props.userData.uniqueId,
            selectedValue: newHeightDetails,
            field: "heightProfileData"
        }

        axios.post(`${BASE_URL}/adjust/profile/data`, config).then((res) => {
            if (res.data.message === "Updated successfully!") {
                console.log("resdata", res.data);

                Toast.show({
                    type: 'success',
                    text1: `Successfully adjusted your 'height settings'.`,
                    text2: `We've successfully uploaded your 'height settings' properly - you new data is now live!`,
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
                    text2: `We've experienced an error while adjusting your 'height settings' - please try this action again.`,
                    visibilityTime: 4250,
                    position: "bottom",
                    bottomOffset: -50
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        if (_.has(profileData, "heightProfileData")) {
            setGuessedValueState(profileData.heightProfileData.CMHeight);
        }
    }, [])

    return (
        <Fragment>
            <View style={styles.container}>
                <Text style={styles.title}>Height (Approx.)</Text>
                <Text style={styles.subtext}>Drag the bar to adjust your height <Text style={{ color: "blue", fontWeight: "bold" }}>(in CM - approx 30cm === 1FT and/or 12in.)</Text></Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12.5, marginBottom: 12.5 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    <View>
                        <Text style={{ width: 200, textAlign: 'center', color: Colors.primaryColor }}>*Drag* to adjust height/settings</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                </View>
                <Slider
                    style={styles.slider}
                    progress={_.has(profileData, "heightProfileData") ? useSharedValue(profileData.heightProfileData.CMHeight) : heightSize}
                    minimumValue={second}
                    maximumValue={third}
                    step={30}
                    markWidth={6}
                    marksStyle={styles.stepStyleCustom}
                    renderThumb={() => <Image source={require("../../../../../assets/images/ogIcons/drag-circle.png")} style={{ minWidth: 27.5, minHeight: 27.5, height: 27.5, width: 27.5 }} />}
                    onSlidingComplete={setGuessedValueState}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12.5, marginBottom: 12.5 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    <View>
                        <Text style={{ width: 200, textAlign: 'center', color: Colors.primaryColor }}>Your selected height is <Text style={{ color: "blue", fontWeight: "bold" }}>{cmToInFt(setGuessedValue).feet}' {cmToInFt(setGuessedValue).inches}"</Text></Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button disabled={setGuessedValue !== 0 ? false : true} color={Colors.primaryColor} onPress={submitNewHeight} titleStyle={{ color: 'white' }} title={setGuessedValue !== 0 ? "Submit your NEW height measurement!" : "Select a NEW HEIGHT measurement first..."} />
                </View>
            </View>
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, {})(HeightHelperComponent);