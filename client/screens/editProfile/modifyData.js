import React, { Fragment, useEffect, useState } from "react";
import { Text, StyleSheet, View, Dimensions, Button, Image, TextInput, ScrollView, TouchableOpacity } from "react-native"; 
import { Colors, Fonts, Sizes } from "../../constants/styles.js";
import DatePicker from 'react-native-date-picker';
import moment from "moment";
import { connect } from "react-redux";
import { BASE_URL } from "@env";
import LocationHelperComponent from "./helpers/functionsHelpers/location/locationComponent.js";
import Toast from "react-native-toast-message";
import axios from "axios";
import { collegeOptions, eyeColorOptions } from "./helpers/options/editProfile.js";
import { useNavigation } from "@react-navigation/native";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import _ from "lodash";
import HeightHelperComponent from "./helpers/functionsHelpers/height/heightComponent.js";
import GenderAndIntentHelper from "./helpers/functionsHelpers/GenderIntent/genderAndIntent.js";
import { Badge } from '@rneui/themed';
import EyeColorSelectionHelperComponent from "./helpers/functionsHelpers/eyeColor/selectEyeColor.js";
import HairColorComponentHelper from "./helpers/functionsHelpers/hairColor/updateHair.js";
import BodyTypeHelperComponent from "./helpers/functionsHelpers/bodyType/bodyTypeHelper.js";
import Dialog from "react-native-dialog";
   
const { width, height } = Dimensions.get("window");

const ModifyDataProfileHelper = (props) => {

    const [ profileData, setProfileData ] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [open, setOpen] = useState(false);
    const [occupation, setOccupation] = useState("");
    const [ confirmationBox, setConfirmationBox ] = useState(false);

    console.log("profileData", profileData);

    useEffect(() => {
        const configuration = {
            params: {
                uniqueId: props.userData.uniqueId
            }
        }

        axios.get(`${BASE_URL}/gather/general/information/user`, configuration).then((res) => {
            if (res.data.message === "Gathered user successfully!") {
                console.log("resdata", res.data);

                const { user } = res.data;

                setProfileData(user.profileData);
            } else {
                console.log("errrrrr", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const parameter = props.route.params.label;
    
    const navigation = useNavigation();

    const handleBirthDateSubmission = () => {
        console.log("handleBirthDateSubmission clicked/ran.");

        if (selectedDate !== null) {

            const config = {
                uniqueId: props.userData.uniqueId,
                selectedDate
            }
            
            axios.post(`${BASE_URL}/adjust/birthdate/once/profile/data`, config).then((res) => {
                if (res.data.message === "Succesfully submitted/updated birthdate data!") {
                    console.log("resdata", res.data);

                    setConfirmationBox(false);

                    Toast.show({
                        type: 'success',
                        text1: `Successfully adjusted your 'birthdate settings'.`,
                        text2: `We've successfully uploaded your 'birthdate settings' properly - you new data is now live!`,
                        visibilityTime: 4250,
                        position: "bottom"
                    });

                    setTimeout(() => {
                        navigation.goBack();
                    }, 2500);
                } else if (res.data.message === "Already submitted/attempted TOO MANY birthdate changes! No action will be taken...") {

                    setConfirmationBox(false);

                    Toast.show({
                        type: 'error',
                        text1: `You've ALREADY modified your birthdate TOO many times!`,
                        text2: res.data.message,
                        visibilityTime: 4250,
                        position: "bottom"
                    });
                } else {
                    console.log("errrorrrrrr", res.data);

                    setConfirmationBox(false);

                    Toast.show({
                        type: 'error',
                        text1: `An error occurred while processing your request.`,
                        text2: `We've experienced an error while adjusting your 'birthdate settings' - please try this action again.`,
                        visibilityTime: 4250,
                        position: "bottom"
                    });
                }
            }).catch((err) => {

                setConfirmationBox(false);

                console.log(err);
            })
        } else {
            Toast.show({
                type: 'error',
                text1: `You must select a birthdate before proceeding...`,
                text2: `Please select a 'birthdate' before submitting your new information! Please try this action again.`,
                visibilityTime: 4250,
                position: "bottom"
            });
        }
    }

    const renderConfirmationDialogBirthdateChange = () => {
        return (
            <Dialog.Container visible={confirmationBox}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.black18Bold, paddingBottom: Sizes.fixPadding - 5.0, fontSize: 17.25 }}>
                        Are you sure you're READY to CHANGE your birthdate on file? This will be permanant and you'll ONLY be able to change it TWICE total...
                    </Text>
                    <View style={styles.modalHrLine} />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                setConfirmationBox(false);
                            }}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black20Regular, fontWeight: "bold", textAlign: "center", color: "#fff" }}>Cancel ~ Don't Modify.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                setConfirmationBox(false);
                                
                                handleBirthDateSubmission();
                            }}
                            style={styles.confirmationButtonStyle}
                        >
                            <Text style={{ ...Fonts.white20Regular, textAlign: "center", fontWeight: "bold", color: "#fff" }}>Yes, Update Birthdate!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    if (profileData !== null) {

        switch (parameter) {
            case "Age":
                const starterDate = new Date();
                return (
                    <Fragment>
                        {renderConfirmationDialogBirthdateChange()}
                        <View style={styles.container}>
                            <Text style={styles.title}>Birthdate</Text>
                            <Text style={styles.subtext}>Birthdate can ONLY be changed ONCE</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12.5, marginBottom: 12.5 }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                                <View>
                                    <Text style={{ width: 150, textAlign: 'center', color: Colors.primaryColor }}>Select your birthdate</Text>
                                </View>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button color={Colors.primaryColor} onPress={() => {
                                    setOpen(true);
                                }} titleStyle={{ color: 'white' }} title={selectedDate === null ? "Select your birthdate date" : "You've selected a birthdate!"} />
                            </View>
                            <DatePicker
                                modal
                                open={open}
                                mode={"date"}
                                minimumDate={new Date("1960-01-01")}
                                maximumDate={new Date("2004-01-01")}
                                date={selectedDate !== null ? selectedDate : starterDate}
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setSelectedDate(date)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12.5, marginBottom: 12.5 }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                                <View>
                                    <Text style={{ width: 150, textAlign: 'center', color: Colors.primaryColor }}>Your selected date...</Text>
                                </View>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                            </View>
                            <Text style={styles.selectedDate}>{selectedDate !== null ? moment(selectedDate).format("MM/DD/YYYY") + " (MM/DD/YYYY)" : "You have NOT selected a date yet."}</Text>
                            <View style={{ marginTop: 12.5, marginBottom: 15 }} />
                            <Button color={Colors.secondaryColor} onPress={() => {
                                setConfirmationBox(true);
                            }} titleStyle={{ color: 'white' }} title={"Save new birthdate (MAX - 1 change)"} />
                        </View>
                    </Fragment>
                );
                break;
            case "Location":
                return (
                    <Fragment>
                        <LocationHelperComponent styles={styles} profileData={profileData} navigation={navigation} props={props} />
                    </Fragment>
                );
                break;
            case "Height": // in calculate in CM (centimeters)                
                return (
                    <Fragment>
                        <HeightHelperComponent styles={styles} props={props} profileData={profileData} navigation={navigation} />
                    </Fragment>
                );
                break;
            case "Occupation":
                const handleSubmisison = () => {
                    console.log("handleSubmisison clicked/ran...");

                    const config = {
                        uniqueId: props.userData.uniqueId,
                        occupation
                    }

                    axios.post(`${BASE_URL}/adjust/occupation/profile/data`, config).then((res) => {
                        if (res.data.message === "Updated successfully!") {
                            console.log("resdata", res.data);

                            Toast.show({
                                type: 'success',
                                text1: `Successfully adjusted your 'occupation settings'.`,
                                text2: `We've successfully uploaded your 'occupation settings' properly - you new data is now live!`,
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
                                text2: `We've experienced an error while adjusting your 'occupation settings' - please try this action again.`,
                                visibilityTime: 4250,
                                position: "bottom"
                            });
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
                return (
                    <ScrollView contentContainerStyle={styles.contentContainerScroll} style={{ flexGrow: 1, flex: 1 }}>
                        <View style={styles.container}>
                            <Text style={styles.title}>Occupation/Work-Specialty</Text>
                            <Text style={styles.subtext}>Enter your <Text style={{ color: "blue", fontWeight: "bold" }}>current occupation</Text> if you're employed</Text>

                            <View style={styles.spacerContainer}>
                                <Text style={styles.labelText}>Occupation</Text>
                                <TextInput
                                    placeholder={_.has(profileData, "occupation") ? profileData.occupation : "Enter your *current* occupation..."}
                                    placeholderTextColor={Colors.blackColor}
                                    style={styles.textInputCustom}
                                    secureTextEntry={false}
                                    value={occupation}
                                    onChangeText={(value) => {
                                        setOccupation(value);
                                    }}
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button disabled={(typeof occupation !== "undefined" && occupation.length >= 6) ? false : true} color={Colors.primaryColor} onPress={() => {
                                    handleSubmisison();
                                }} titleStyle={{ color: 'white' }} title={"Submit & update occupation"} />
                            </View>
                        </View>
                    </ScrollView>
                );
                break;
            case "Gender & Intent":
                return <GenderAndIntentHelper styles={styles} profileData={profileData} navigation={navigation} props={props} />
                break;
            case "Education":

                const handleSubmisisonEducation = (collegeOption) => {
                    const config = {
                        uniqueId: props.userData.uniqueId,
                        collegeOption
                    }

                    axios.post(`${BASE_URL}/adjust/education/profile/data`, config).then((res) => {
                        if (res.data.message === "Updated successfully!") {
                            console.log("resdata", res.data);

                            Toast.show({
                                type: 'success',
                                text1: `Successfully adjusted your 'education settings'.`,
                                text2: `We've successfully uploaded your 'education settings' properly - you new data is now live!`,
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
                                text2: `We've experienced an error while adjusting your 'education settings' - please try this action again.`,
                                visibilityTime: 4250,
                                position: "bottom"
                            });
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }

                return (
                    <Fragment>
                        <View style={styles.container}>
                            <Text style={styles.title}>Education</Text>
                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                {collegeOptions.map((option, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => handleSubmisisonEducation(option)}>
                                            <Badge
                                                badgeStyle={profileData.collegeEducationData.value === option.value ? styles.selectedBadge : styles.badgeCollege}
                                                value={option.label}
                                            />
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    </Fragment>
                );
                break;
            case "Eye Color":
                return <EyeColorSelectionHelperComponent styles={styles} profileData={profileData} navigation={navigation} props={props} />;
                break;
            case "Hair Color":
                return <HairColorComponentHelper styles={styles} profileData={profileData} navigation={navigation} props={props} />;
                break; 
            case "Body Type":
                return <BodyTypeHelperComponent styles={styles} profileData={profileData} navigation={navigation} props={props} />;
                break; 
            default:
                break;
        }
    } else {
        return (
            <Fragment>
                <View style={{ margin: 12.5 }}>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                </View>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 17.5
    },
    colorText: {
        fontWeight: "bold", 
        color: "#fff", 
        paddingTop: 5.5, 
        paddingBottom: 5.5, 
        paddingLeft: 22.5, 
        paddingRight: 22.5
    },
    subtitle: {
        marginTop: 5.5,
        marginBottom: 22.5
    },
    selectedBadge: {
        backgroundColor: Colors.blackColor,
        margin: 2.25,
        minHeight: 32.5,
        paddingRight: 10,
        paddingLeft: 10,
        marginTop: 17.5,
        borderWidth: 1.25,
        borderColor: "black"
    },
    badgeCollege: {
        backgroundColor: Colors.primaryColor, 
        margin: 2.25, 
        minHeight: 32.5, 
        paddingRight: 10, 
        paddingLeft: 10, 
        marginTop: 17.5,
        borderWidth: 1.25,
        borderColor: "black"
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    slider: {
        width: width * 0.7
    },  
    cancelButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    confirmationButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.secondaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    textInputCustom: {
        ...Fonts.black16Medium,
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        margin: 5,
        backgroundColor: "#fff",
        marginTop: 12.5,
        paddingLeft: 10,
        shadowColor: "#000",
        borderRadius: 15,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7
    },
    contentContainerScroll: {
        flexGrow: 1, 
        flex: 1
    },
    countryText: {
        color: Colors.primaryColor,
        fontWeight: "bold"
    },
    pickerContainer: {
        borderWidth: 1,
        marginTop: 12.5,
        borderColor: Colors.primaryColor,
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        margin: 5,
        backgroundColor: "#fff",
        marginTop: 12.5,
        paddingLeft: 10,
        shadowColor: "#000",
        borderRadius: 15,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7
    },
    stepStyleCustom: {
        backgroundColor: Colors.primaryColor,
        height: 5
    },
    slider: {
        width: width * 0.9,
        marginTop: 32.5,
        height: 50,
        marginBottom: 22.5
    },
    labelText: {
        fontSize: 18
    },
    buttonContainer: {
        marginTop: 17.5
    },
    spacerContainer: {
        marginTop: 5,
        marginBottom: 17.5
    },  
    containerPane: {
        marginTop: 32.5,
        flex: 1
    },
    yearText: {
        fontWeight: "bold", 
        color: "darkblue", 
        textDecorationLine: "underline"
    },
    buttonStyledCustomDisabled: {
        minWidth: width * 0.825,
        marginBottom: 22.5,
        backgroundColor: Colors.backColor,
        borderColor: Colors.primaryColor,
        borderWidth: 3
    },
    modalHrLine: {
        borderBottomColor: Colors.secondaryColor,
        borderBottomWidth: 3,
        marginTop: 8.25,
        marginBottom: 8.25,
        width: "100%"
    },
    buttonStyledCustom: {
        minWidth: width * 0.825,
        marginBottom: 22.5,
        backgroundColor: Colors.primaryColor
    },
    centeredList: {
        paddingBottom: 50,
        flexGrow: 1,
        minHeight: height,
        height,
        flex: 1
    },
    pencil: {
        maxWidth: 22.5,
        maxHeight: 22.5,
        minWidth: 22.5,
        minHeight: 22.5
    },
    hr: {
        width: "100%",
        borderBottom: 1.5,
        borderBottomColor: "black",
        marginTop: 12.5,
        marginBottom: 12.5
    },
    subtext: {
        marginTop: 7.5
    },
    centeredHeaderText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "black"
    },
    listitemSettingsBoxed: {
        maxWidth: width - 30,
        minHeight: 50,
        width
    },
    headerText: {
        color: Colors.primaryColor,
        fontWeight: "bold"
    },
    title: {
        fontSize: 22,
        fontWeight: "bold"
    }
})

const mapStateToProps = (state) => {
    return {
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { })(ModifyDataProfileHelper);