import React, { Fragment, useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import styles from "./postNewDeliveryAvailableStyles.js";
import * as Progress from 'react-native-progress';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { Colors, Sizes, Fonts } from "../../../constants/styles.js";
import RNPickerSelect from 'react-native-picker-select';
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import DatePicker from 'react-native-modern-datepicker';
import moment from "moment";
import _ from "lodash";
import Dialog from "react-native-dialog";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const { width, height } = Dimensions.get("window");

const dimensionItemOptions = [{
    label: "40-by-48 inches",
    value: "40x48",
    other: {
        length: 40,
        width: 48,
        height: 72
    }
}, {
    label: "42-by-42 inches",
    value: "42x42",
    other: {
        length: 42,
        width: 42,
        height: 72
    }
}, {
    label: "48-by-48 inches",
    value: "48x48",
    other: {
        length: 48,
        width: 48,
        height: 72
    }
}, {
    label: "48-by-40 inches",
    value: "48x40",
    other: {
        length: 48,
        width: 40,
        height: 72
    }
}, {
    label: "48-by-45 inches",
    value: "48x45",
    other: {
        length: 40,
        width: 45,
        height: 72
    }
}, {
    label: "44-by-44 inches",
    value: "44x44",
    other: {
        length: 44,
        width: 44,
        height: 72
    }
}, {
    label: "36-by-36 inches",
    value: "36x36",
    other: {
        length: 36,
        width: 36,
        height: 72
    }
}, {
    label: "48-by-36 inches",
    value: "48x36",
    other: {
        length: 48,
        width: 36,
        height: 72
    }
}, {
    label: "48-by-24 inches",
    value: "48x24",
    other: {
        length: 48,
        width: 24,
        height: 72
    }
}];
const preferredDeliveryTimespan = [{
    label: "Within the next week",
    value: "one-week",
    timespan: {
        interval: "days",
        value: 7
    },
    additionalInfo: undefined
}, {
    label: "Within the next TWO weeks",
    value: "two-weeks",
    timespan: {
        interval: "days",
        value: 14
    },
    additionalInfo: undefined
}, {
    label: "On a specific date (pick the date below)",
    value: "one-specific-date",
    timespan: {
        interval: "days",
        value: undefined
    },
    additionalInfo: undefined
}, {
    label: "Between TWO specific date's",
    value: "two-specific-dates",
    timespan: {
        interval: "days",
        value: undefined
    },
    additionalInfo: undefined
}, {
    label: "Flexible (Isn't time sensitive)",
    value: "flexible",
    timespan: {
        interval: "days",
        value: undefined
    },
    additionalInfo: undefined
}, {
    label: "I don't have a date yet...",
    value: "currently-unknown",
    timespan: {
        interval: "days",
        value: undefined
    },
    additionalInfo: undefined
}];

const PostNewDeliveryAvailableJob = ({ }) => {

    const refRelated = {
        inputOne: useRef(null),
        inputTwo: useRef(null),
        inputThree: useRef(null),
        inputFour: useRef(null),
        inputFive: useRef(null),
        inputSix: useRef(null),
        inputSeven: useRef(null),
        inputEight: useRef(null),
    }

    const navigation = useNavigation();

    const [ state, setState ] = useState({
        ready: false,
        progressNumber: 0,
        breifDescription: "",
        freightDescription: "",
        packagingDescription: "",
        averagePalletSize: null,
        totalWeight: 0,
        originZipCode: "",
        destinationZipCode: "",
        deliveryTimespan: null,
        modalVisible: false,
        originalDeliveryTimespan: null
    });

    const { deliveryTimespan, originalDeliveryTimespan, breifDescription, freightDescription, packagingDescription, averagePalletSize, destinationZipCode, originZipCode, totalWeight } = state;
        
    const handleCheckDisabledButton = () => {
        if ((typeof breifDescription !== "undefined" && breifDescription.length >= 50) && (typeof freightDescription !== "undefined" && freightDescription.length >= 50) && (typeof packagingDescription !== "undefined" && packagingDescription.length >= 50) && (averagePalletSize !== null) && (totalWeight !== 0) && (typeof originZipCode !== "undefined" && originZipCode.length === 5) && (destinationZipCode !== "undefined" && destinationZipCode.length === 5)) {
            if (deliveryTimespan !== null && typeof deliveryTimespan.value !== "undefined" && deliveryTimespan.value === "two-specific-dates") {
                if ((deliveryTimespan !== null && typeof deliveryTimespan.additionalInfo !== "undefined" && deliveryTimespan.additionalInfo !== null) && (typeof deliveryTimespan.additionalInfo.startDatePicked !== "undefined" && _.has(deliveryTimespan.additionalInfo, "startDatePicked") && _.has(deliveryTimespan.additionalInfo.startDatePicked, "formattedDate")) && (typeof deliveryTimespan.additionalInfo.endDatePicked !== "undefined" && _.has(deliveryTimespan.additionalInfo, "endDatePicked") && _.has(deliveryTimespan.additionalInfo.endDatePicked, "formattedDate"))) {
                    return false;
                } else {
                    return true;
                }
            } else if (deliveryTimespan !== null && typeof deliveryTimespan.value !== "undefined" && deliveryTimespan.value === "one-specific-date") {
                if (typeof deliveryTimespan !== "undefined" && typeof deliveryTimespan.additionalInfo !== "undefined" && deliveryTimespan.additionalInfo !== null && _.has(deliveryTimespan.additionalInfo, "formattedDate")) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    const handleSubmissionContinueNextPagePictures = () => {
        console.log("handleSubmissionContinueNextPagePictures clicked/ran...");

        const newlyFormattedTransferData = {
            description: breifDescription,
            freightDescription,
            packagingDescription,
            averagePalletSizeOfLoad: averagePalletSize, 
            destinationZipCode, 
            originZipCode, 
            totalWeightOfLoad: totalWeight,
            deliveryTimespanSpecs: deliveryTimespan
        };

        navigation.navigate("AddPhotosNewAvailableDeliveriesForm", { passedData: newlyFormattedTransferData });
    }

    const handleDateSelectionReset = () => {
        setState(prevState => {
            return {
                ...prevState,
                deliveryTimespan: preferredDeliveryTimespan[3]
            }
        })
    }

    const handleSingleDateAdditionChange = (date) => {

        const differenceInDates = Math.floor(moment.duration(moment(new Date(date)).diff(moment(new Date()))).asDays());
        const newOBJAddition = {
            formattedDate: moment(new Date(date)).format("MM/DD/YYYY"),
            unformattedDate: new Date(date),
            originalFormatDate: date
        }; 
        setState(prevState => { 
            return {
                ...prevState, 
                deliveryTimespan:  {
                    label: "On a specific date (pick the date below)",
                    value: "one-specific-date",
                    timespan: {
                        interval: "days",
                        value: differenceInDates
                    },
                    additionalInfo: newOBJAddition
                }
            }
        })
    }

    const handleStartDateRangePicking = (date) => {
        console.log("handleStartDateRangePicking clicked/ran...!", date);

        const newOBJAddition = {
            startDatePicked: {
                formattedDate: moment(new Date(date)).format("MM/DD/YYYY"),
                unformattedDate: new Date(date),
                originalFormatDate: date,
                type: "start"
            },
            endDatePicked: undefined
        }; 
        // update relevant state-date...
        setState(prevState => {
            return {
                ...prevState,
                deliveryTimespan:  {
                    label: "Between TWO specific date's",
                    value: "two-specific-dates",
                    timespan: {
                        interval: "days",
                        value: undefined
                    },
                    additionalInfo: newOBJAddition
                }
            }
        })
    }

    const confirmationDialog = () => {
        return (
            <Dialog.Container visible={state.modalVisible}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.black18Bold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                        Are you sure you'd like to 're-select' the previously selected 'start' & 'end' dates?
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        modalVisible: false
                                    }
                                })
                            }}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black20Regular, color: "#fff" }}>No, Cancel.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        modalVisible: false
                                    }
                                })
                                // handle data change..
                                handleDateSelectionReset();
                            }}
                            style={styles.confirmationButtonStyle}
                        >
                            <Text style={{ ...Fonts.white20Regular, color: "#fff" }}>Yes, Re-Select!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    const handleDateChangeSelection = (date) => {
        console.log("handleDateChangeSelection clicked/ran...!", date);

        const { deliveryTimespan } = state;

        if ((typeof deliveryTimespan !== "undefined" && deliveryTimespan !== null && typeof deliveryTimespan.value !== "undefined" && _.has(deliveryTimespan, "value") && deliveryTimespan.value === "two-specific-dates")) {

            setState(prevState => {
                // update relevant state-date...
                const startingDateSelected = prevState.deliveryTimespan.additionalInfo.startDatePicked.originalFormatDate;
                const differenceInDates = Math.floor(moment.duration(moment(new Date(date)).diff(moment(startingDateSelected))).asDays());
                // create the new to-be modified object replacing the old one...
                const newOBJAddition = {
                    startDatePicked: { 
                        formattedDate: prevState.deliveryTimespan.additionalInfo.startDatePicked.formattedDate,
                        unformattedDate: prevState.deliveryTimespan.additionalInfo.startDatePicked.unformattedDate,
                        originalFormatDate: prevState.deliveryTimespan.additionalInfo.startDatePicked.originalFormatDate,
                        type: "start"
                    },
                    endDatePicked: {
                        formattedDate: moment(date).format("MM/DD/YYYY"),
                        unformattedDate: new Date(date),
                        originalFormatDate: date,
                        type: "end"
                    }
                };
                // return the actual state changed data...
                return {
                    ...prevState,
                    deliveryTimespan:  {
                        label: "Between TWO specific date's",
                        value: "two-specific-dates",
                        timespan: {
                            interval: "days",
                            value: differenceInDates
                        },
                        additionalInfo: newOBJAddition
                    }
                }
            })
        } 
    }

    const renderPossibleAdditionalRequirements = () => {
        
        const { deliveryTimespan } = state;

        if ((typeof deliveryTimespan !== "undefined" && deliveryTimespan !== null && typeof deliveryTimespan.value !== "undefined" && _.has(deliveryTimespan, "value") && deliveryTimespan.value === "one-specific-date")) {
            return (
                <Fragment>
                    <Text style={styles.labeledTop}>Select a delivery date (the ideal 'date of delivery')</Text>
                    <DatePicker
                        onDateChange={handleSingleDateAdditionChange}
                        mode={"calendar"}
                        minimumDate={moment(new Date()).format("YYYY-MM-DD")}
                        maximumDate={moment(new Date()).add(8, 'weeks').format("YYYY-MM-DD")}
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
                        selected={_.has(deliveryTimespan.additionalInfo, "originalFormatDate") ? deliveryTimespan.additionalInfo.originalFormatDate.toString() : null}
                    />
                </Fragment>
            );
        } else if (typeof deliveryTimespan !== "undefined" && deliveryTimespan !== null && typeof deliveryTimespan.value !== "undefined" && _.has(deliveryTimespan, "value") && deliveryTimespan.value === "two-specific-dates" && _.has(deliveryTimespan, "additionalInfo")) {
            
            const renderBothCalendarsConditionally = () => {
                // typeof deliveryTimespan.additionalInfo !== "undefined" && deliveryTimespan.additionalInfo !== null
                if (!_.has(deliveryTimespan.additionalInfo, "startDatePicked") && (!_.has(deliveryTimespan.additionalInfo, "endDatePicked")) && typeof deliveryTimespan.additionalInfo === "undefined") {
                    return (
                        <Fragment>
                            <Text style={styles.labeledTop}>Select your <Text style={styles.emphisizedText}>START (the FIRST date)</Text> date for your available delivery-range</Text>
                            <DatePicker // deliveryTimespan
                                onDateChange={handleStartDateRangePicking}
                                minimumDate={moment(new Date()).format("YYYY-MM-DD")}
                                maximumDate={moment(new Date()).add(8, 'weeks').format("YYYY-MM-DD")}
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
                                selected={_.has(deliveryTimespan.additionalInfo, "startDatePicked") && _.has(deliveryTimespan.additionalInfo.startDatePicked, "originalFormatDate")  ? deliveryTimespan.additionalInfo.startDatePicked.originalFormatDate.toString() : null}
                            />
                        </Fragment>
                    );
                }
            }

            const renderFinalResultCheckData = () => {
                if ((deliveryTimespan !== null && typeof deliveryTimespan.additionalInfo !== "undefined" && deliveryTimespan.additionalInfo !== null) && (typeof deliveryTimespan.additionalInfo.startDatePicked !== "undefined" && _.has(deliveryTimespan.additionalInfo, "startDatePicked") && _.has(deliveryTimespan.additionalInfo.startDatePicked, "formattedDate")) && (typeof deliveryTimespan.additionalInfo.endDatePicked !== "undefined" && _.has(deliveryTimespan.additionalInfo, "endDatePicked") && _.has(deliveryTimespan.additionalInfo.endDatePicked, "formattedDate"))) {
                    console.log("This final check ran rendered...");
                    return (
                        <Fragment>
                            <View style={styles.rowOnly}>
                                <View style={styles.startColumn}>
                                    <Text style={styles.dateLabeled}>Selected START Date</Text>
                                    <Text style={styles.dateSubtext}>{deliveryTimespan.additionalInfo.startDatePicked.formattedDate}</Text>
                                </View>
                                <View style={styles.endColumn}>
                                    <Text style={styles.dateLabeled}>Selected END Date</Text>
                                    <Text style={styles.dateSubtext}>{deliveryTimespan.additionalInfo.endDatePicked.formattedDate}</Text>
                                </View>
                            </View>
                            <View style={styles.thinishHR} />
                            <View style={[styles.rowOnly, { top: -12.5 }]}>
                                <AwesomeButtonBlue type={"secondary"} style={styles.startRepickButton} onPress={() => {
                                    setState(prevState => {
                                        return {
                                            ...prevState,
                                            modalVisible: true
                                        }
                                    })
                                }} stretch={true}>Re-Pick/Select Start & End Dates</AwesomeButtonBlue>
                            </View>
                        </Fragment>
                    );
                }
            }

            const checkSecondRenderCheck = () => {
                if (typeof deliveryTimespan.additionalInfo !== "undefined" && typeof deliveryTimespan.additionalInfo.endDatePicked === "undefined") {
                    return (
                        <Fragment>
                            <Text style={styles.labeledTop}>Select your <Text style={styles.emphisizedText}>END (the LAST date)</Text> date for your available delivery-range</Text>
                            <DatePicker // deliveryTimespan
                                onDateChange={handleDateChangeSelection}
                                minimumDate={moment(deliveryTimespan.additionalInfo.startDatePicked.originalFormatDate).format("YYYY-MM-DD")}
                                maximumDate={moment(new Date()).add(8, 'weeks').format("YYYY-MM-DD")}
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
                                selected={_.has(deliveryTimespan.additionalInfo, "endDatePicked") && _.has(deliveryTimespan.additionalInfo.endDatePicked, "originalFormatDate") ? deliveryTimespan.additionalInfo.endDatePicked.originalFormatDate.toString() : null}
                            />
                        </Fragment>
                    );
                }
            }
            return (
                <Fragment>
                    {renderBothCalendarsConditionally()}
                    {checkSecondRenderCheck()}
                    {renderFinalResultCheckData()}
                    <View style={styles.thinishHR} />
                </Fragment>
            );
        } 
    }

    const renderMainContentConditional = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 42.5, flexGrow: 1 }}>
                <View style={styles.margined}>
                    <Text style={styles.titleTopText}>We will now need to <Text style={styles.underlineBoldTextBlack}>collect</Text> core information before posting your new 'request to have freight picked up'.</Text>
                    <Text style={styles.labelUnique}><Text style={styles.underlineBoldText}>Please</Text> be as <Text style={styles.underlineBoldText}>precise/accurate</Text> as possible with your details as our freight transporters (CDL-Drivers) use this information to appropriately guage what they <Text style={styles.underlineBoldText}>can</Text> and <Text style={styles.underlineBoldText}>can't</Text> transport along with the other load items.{"\n"}{"\n"}You could be <Text style={styles.underlineBoldText}>fined</Text> if your information is <Text style={styles.underlineBoldText}>far from accurate</Text> as this causes major problems with our transportation system(s).</Text>
                    <View style={styles.thinishHR} />
                    <Text style={styles.labeledTop}>Briefly describe what you need to move...</Text>
                    <View style={styles.textFieldsCommonStyle}>
                        <FloatingLabelInput 
                            isPassword={false}
                            hint={"*Be as descriptive as possible* - (Enter AT LEAST 50 Character's)"}
                            hintTextColor={"#909090"}
                            multiline={true}
                            staticLabel={true}
                            ref={refRelated.inputOne}
                            blurOnSubmit={true}
                            onBlur={() => refRelated.inputTwo.current.focus()}
                            customLabelStyles={styles.labelFloatingStyle}
                            showCountdownStyles={styles.showCountdownStylesCustom}
                            containerStyles={styles.multilineContainerStyle}
                            inputStyles={styles.inputFloatingStyles}
                            maxLength={225}
                            numberOfLines={4}
                            showCountdown={true}
                            rightComponent={<Image style={styles.innerIconInputMultiline} source={require("../../../assets/images/icon/description.png")} />}
                            value={breifDescription}
                            onChangeText={value => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        breifDescription: value
                                    }
                                })
                            }}
                        />
                    </View>
                    <View style={styles.thinishHR} />
                    <Text style={styles.labeledTop}>Enter a 'freight description'...</Text>
                    <View style={styles.textFieldsCommonStyle}>
                        <FloatingLabelInput 
                            isPassword={false}
                            hint={"*Enter a detailed description of your freight* - (Enter AT LEAST 50 Character's)"}
                            hintTextColor={"#909090"}
                            multiline={true}
                            staticLabel={true}
                            ref={refRelated.inputTwo}
                            blurOnSubmit={true}
                            onBlur={() => refRelated.inputThree.current.focus()}
                            customLabelStyles={styles.labelFloatingStyle}
                            numberOfLines={4}
                            showCountdownStyles={styles.showCountdownStylesCustom}
                            containerStyles={styles.multilineContainerStyle}
                            inputStyles={styles.inputFloatingStyles}
                            maxLength={225}
                            showCountdown={true}
                            rightComponent={<Image style={styles.innerIconInputMultiline} source={require("../../../assets/images/icon/freight.png")} />}
                            value={freightDescription}
                            onChangeText={value => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        freightDescription: value
                                    }
                                })
                            }}
                        />
                    </View>
                    <View style={styles.thinishHR} />
                    <Text style={styles.labeledTop}>Enter a 'packaging description'...</Text>
                    <View style={styles.textFieldsCommonStyle}>
                        <FloatingLabelInput 
                            isPassword={false}
                            hint={"*Enter a detailed packaging-description of your freight* - (Enter AT LEAST 50 Character's)"}
                            hintTextColor={"#909090"}
                            staticLabel={true}
                            customLabelStyles={styles.labelFloatingStyle}
                            ref={refRelated.inputThree}
                            blurOnSubmit={true}
                            onBlur={() => {}}
                            multiline={true}
                            numberOfLines={4}
                            showCountdownStyles={styles.showCountdownStylesCustom}
                            containerStyles={styles.multilineContainerStyle}
                            inputStyles={styles.inputFloatingStyles}
                            maxLength={225}
                            showCountdown={true}
                            rightComponent={<Image style={styles.innerIconInputMultiline} source={require("../../../assets/images/icon/packaging.png")} />}
                            value={packagingDescription}
                            onChangeText={value => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        packagingDescription: value
                                    }
                                })
                            }}
                        />
                    </View>
                    <View style={styles.thinishHR} />
                    <Text style={styles.labeledTop}>Select the closest 'pallet-size' of the pallets being transported</Text>
                    <View style={styles.inputFloatingStylesSelectable}>
                        <RNPickerSelect 
                            onValueChange={(value) => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        averagePalletSize: value
                                    }
                                })
                            }}
                            ref={refRelated.inputFour}
                            blurOnSubmit={true}
                            onBlur={() => refRelated.inputFive.current.focus()}
                            value={state.averagePalletSize}
                            items={dimensionItemOptions}
                        />
                    </View>
                    <View style={styles.thinishHR} />
                    <Text style={styles.labeledTop}>Total weight of all included item's to be transported</Text>
                    <View style={styles.textFieldsCommonStyle}>
                        <FloatingLabelInput 
                            isPassword={false}
                            hint={"*TOTAL weight of ALL included items*..."}
                            hintTextColor={"#909090"}
                            staticLabel={true}
                            customLabelStyles={styles.labelFloatingStyle}
                            multiline={false}
                            ref={refRelated.inputFive}
                            blurOnSubmit={true}
                            onBlur={() => refRelated.inputSix.current.focus()}
                            showCountdownStyles={styles.showCountdownStylesCustom}
                            containerStyles={styles.multilineContainerStyle}
                            inputStyles={styles.inputFloatingMoveStyles}
                            maxLength={10}
                            showCountdown={true}
                            value={totalWeight}
                            rightComponent={<Image style={styles.innerIconInputTop} source={require("../../../assets/images/icon/dollar-circled.png")} />}
                            keyboardType="numeric"
                            onChangeText={value => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        totalWeight: value
                                    }
                                })
                            }}
                        />
                    </View>
                    <View style={styles.thinishHR} />
                    <Text style={styles.labeledTop}>Origin ZIP code or City</Text>
                    <View style={styles.textFieldsCommonStyle}>
                        <FloatingLabelInput 
                            isPassword={false}
                            hint={"*Origin ZIP-Code*..."}
                            hintTextColor={"#909090"}
                            staticLabel={true}
                            ref={refRelated.inputSix}
                            blurOnSubmit={true}
                            onBlur={() => refRelated.inputSeven.current.focus()}
                            customLabelStyles={styles.labelFloatingStyle}
                            multiline={false}
                            showCountdownStyles={styles.showCountdownStylesCustom}
                            containerStyles={styles.multilineContainerStyle}
                            inputStyles={styles.inputFloatingMoveStyles}
                            maxLength={5}
                            showCountdown={true}
                            value={originZipCode}
                            rightComponent={<Image style={styles.innerIconInputTop} source={require("../../../assets/images/icon/timeline-1.png")} />}
                            keyboardType="numeric"
                            onChangeText={value => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        originZipCode: value
                                    }
                                })
                            }}
                        />
                    </View>
                    <View style={styles.thinishHR} />
                    <Text style={styles.labeledTop}>Destination ZIP code or City</Text>
                    <View style={styles.textFieldsCommonStyle}>
                        <FloatingLabelInput 
                            isPassword={false}
                            hint={"*Destination ZIP-Code*..."}
                            hintTextColor={"#909090"}
                            staticLabel={true}
                            ref={refRelated.inputSeven}
                            blurOnSubmit={true}
                            customLabelStyles={styles.labelFloatingStyle}
                            multiline={false}
                            showCountdownStyles={styles.showCountdownStylesCustom}
                            containerStyles={styles.multilineContainerStyle}
                            inputStyles={styles.inputFloatingMoveStyles}
                            maxLength={5}
                            showCountdown={true}
                            value={destinationZipCode}
                            rightComponent={<Image style={styles.innerIconInputTop} source={require("../../../assets/images/icon/timeline-1.png")} />}
                            keyboardType="numeric"
                            onChangeText={value => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        destinationZipCode: value
                                    }
                                })
                            }}
                        />
                    </View>
                    <View style={styles.thinishHR} />
                    <Text style={styles.labeledTop}>Select a delivery timespan/timeframe</Text>
                    <View style={styles.inputFloatingStylesSelectable}>
                        <RNPickerSelect 
                            onValueChange={(value, indexed) => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        deliveryTimespan: preferredDeliveryTimespan[indexed - 1],
                                        originalDeliveryTimespan: preferredDeliveryTimespan[indexed - 1]
                                    }
                                })
                            }}
                            value={typeof originalDeliveryTimespan !== "undefined" && _.has(originalDeliveryTimespan, "value") && typeof originalDeliveryTimespan.value !== "undefined" ? originalDeliveryTimespan.value : null}
                            items={preferredDeliveryTimespan}
                        />
                    </View>
                    <View style={styles.thinishHR} />
                    {renderPossibleAdditionalRequirements()}
                    <AwesomeButtonBlue backgroundDarker={handleCheckDisabledButton() ? "#000" : "#000"} backgroundColor={handleCheckDisabledButton() ? Colors.backColor : Colors.secondaryColor} textColor={handleCheckDisabledButton() ? "black" : "#fff"} backgroundShadow={"black"} disabled={handleCheckDisabledButton()} style={styles.buttonSearchWithCriteria} onPress={() => handleSubmissionContinueNextPagePictures()} stretch={true}>Continue To Picture Selection</AwesomeButtonBlue>
                    <View style={styles.thinishHR} />
                </View>
            </ScrollView>
        );
    }
    const { progressNumber } = state;
    return (
        <Fragment>
            <Progress.Bar progress={progressNumber} unfilledColor={"lightgrey"} borderRadius={0} height={7.5} color={"#0BDA51"} width={width} />
            {confirmationDialog()}
            <View style={styles.spacerMedium} />
            <KeyboardAwareScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{ paddingBottom: 37.25 }}>
                {renderMainContentConditional()}
            </KeyboardAwareScrollView>
        </Fragment>
    );
}

export default PostNewDeliveryAvailableJob;