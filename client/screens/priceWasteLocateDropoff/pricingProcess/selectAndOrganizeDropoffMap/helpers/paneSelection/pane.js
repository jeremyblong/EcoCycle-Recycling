import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, Dimensions, TextInput } from "react-native";
import { Button } from "@rneui/base";
import { Colors, Fonts, Sizes } from "../../../../../../constants/styles.js";
import CustomFadeComponentHelper from "./helpers/pageOne/page.js";
import DatePicker from 'react-native-modern-datepicker';
import moment from "moment";
import styles from "./universalStyles.js";
import MarkedList from '@jsamr/react-native-li';
import lowerLatin from '@jsamr/counter-style/presets/lowerLatin';
import RNPickerSelect from 'react-native-picker-select';
import IntlPhoneInput from 'react-native-intl-phone-input';
import { useNavigation } from '@react-navigation/native';
import { saveDropOffCartData } from "../../../../../../redux/actions/ewasteCart/cartLogic.js";
import { connect } from "react-redux";
import _ from "lodash";

const { height } = Dimensions.get("window");

const listItems = ["Your unique account identifier/ID", "Your email (encrypted so you can be contacted but not legible/viewable or manipulatable)", "Your username will be transmitted", "Your 'account type' will be transmitted", "Your registration date will be transmitted", "Your profile picture(s) will be transmitted"];

const intervalOptions = [
    { label: "15 Minute Drop-Off Window Interval", value: 15, intervalMeasure: "minutes" },
    { label: "30 Minute Drop-Off Window Interval", value: 30, intervalMeasure: "minutes" },
    { label: "45 Minute Drop-Off Window Interval", value: 45, intervalMeasure: "minutes" },
    { label: "60 Minute Drop-Off Window Interval", value: 60, intervalMeasure: "minutes" },
    { label: "75 Minute Drop-Off Window Interval", value: 75, intervalMeasure: "minutes" },
    { label: "90 Minute Drop-Off Window Interval", value: 90, intervalMeasure: "minutes" }
];

const initialFormData = {
    dateTime: null,
    phoneNumberData: null,
    interval: null,
    noteText: ""
}

const SheetPaneContentDropOffHelper = ({ sheetRef, setAllowModificationPane, saveDropOffCartData, formData, currentLocation, handleNearbyLocationDropoffPointSearch }) => {

    const navigation = useNavigation();

    const [ page, setPage ] = useState(1);
    const [ typingText, setTypingText ] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log(typingText);
            
            modifyNoteTextData("noteText", typingText);
        }, 2250);
    
        return () => clearTimeout(delayDebounceFn)
    }, [typingText]);

    const modifyNoteTextData = (key, value) => {
        if (!_.has(formData, key) || formData[key] !== value) {
            saveDropOffCartData({ [key]: value });
        } 
    }

    const modifyDateData = (key, value) => {
        if (key === "noteText") {
            setTypingText(value);
        } else {
            if (!_.has(formData, key) || formData[key] !== value) {
                saveDropOffCartData({ [key]: value });
            } 
        }
    }

    const renderPageOneContent = () => {
        return (
            <View style={{ backgroundColor: "#000", height: "100%" }}>
                <DatePicker
                    onSelectedChange={(date) => modifyDateData("dateTime", date)}
                    minimumDate={moment(new Date()).format("YYYY-MM-DD")}
                    maximumDate={moment(new Date()).add(3, 'weeks').format("YYYY-MM-DD")}
                    options={{
                        backgroundColor: '#090C08',
                        textHeaderColor: Colors.secondaryColor,
                        textDefaultColor: Colors.secondaryColor,
                        selectedTextColor: '#fff',
                        mainColor: Colors.primaryColor,
                        textSecondaryColor: Colors.primaryColor,
                        borderColor: 'rgba(122, 146, 165, 0.1)',
                    }}
                    selected={typeof formData !== "undefined" && Object.keys(formData).length > 0 && _.has(formData, "dateTime") ? formData.dateTime : initialFormData.dateTime}
                />
            </View>
        );
    }
    const renderPageTwoContent = () => {
        return (
            <Fragment>
                <View style={styles.topContain}>
                    <Text style={styles.listTitle}>The following data points will be forwarded to your drop-off contractor (ONLY this specified information)</Text>
                    <MarkedList counterRenderer={lowerLatin}>
                        {listItems.map((item, index) => (
                            <Text key={index} style={{ flexShrink: 1, color: "#fff" }}>{'\u2022'} {item}</Text>
                        ))}
                    </MarkedList>
                </View>
                <IntlPhoneInput
                    onChangeText={(phoneNumber) => modifyDateData("phoneNumberData", phoneNumber)}
                    defaultCountry="US"
                    placeholder="Phone Number"
                    containerStyle={styles.phoneNumberContainerStyle}
                    dialCodeTextStyle={{ ...Fonts.black16Medium }}
                    phoneInputStyle={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, ...Fonts.black16Medium }}
                />
                <View style={styles.textFieldContainerStyle}>
                    <RNPickerSelect
                        onValueChange={(value) => modifyDateData("interval", value)}
                        items={intervalOptions}
                        value={_.has(formData, "interval") ? formData.interval : initialFormData.interval}
                    />
                </View>
                <View style={styles.textFieldContainerStyle}>
                    <TextInput
                        style={{ ...Fonts.black16Medium, textAlignVertical: "top" }}
                        value={typeof typingText !== "undefined" && typingText.length > 0 ? typingText : initialFormData.noteText}
                        placeholder={"Enter a note to your drop-off contractor... (50 Charactors MINIMUM) Feel free to include various important notes and/or instructions you'd like to relay to this user."}
                        onChangeText={(value) => modifyDateData("noteText", value)}
                        onSubmitEditing={() => null}
                        blurOnSubmit={true}
                        multiline={true}
                        numberOfLines={8}
                        ref={(reference) => reference}
                    />
                </View>
            </Fragment>
        );
    }
    const proceedToNextPage = (str) => {
        if (str === "add") {
            setPage(prevState => prevState + 1);
        } else {
            setPage(prevState => prevState - 1);
        }
    }
    const renderVariousScreens = (currentPage) => {
        switch (currentPage) {
            case 1:
                return renderPageOneContent();
                break;
            case 2:
                return renderPageTwoContent();
                break;
            default: 
                return null;
        }
    }
    const calculateDisabledButtonOne = () => {
        if (typeof formData !== "undefined" && formData.dateTime !== null && _.has(formData, "dateTime")) {
            return false;
        } else {
            return true;
        }
    }
    const calculateDisabledButtonTwo = () => {

        const { interval, noteText, phoneNumberData } = formData;
        
        if ((_.has(formData, "noteText") && typeof noteText !== "undefined" && noteText.length >= 50) && (interval !== null && _.has(formData, "interval")) && (phoneNumberData !== null && _.has(formData, "phoneNumberData") && phoneNumberData.unmaskedPhoneNumber.length >= 10)) {
            return false;
        } else {
            return true;
        };
    }
    const renderVariousDisablingCalculations = (currentPage) => {
        switch (currentPage) {
            case 1:
                return calculateDisabledButtonOne();
                break;
            case 2:
                return calculateDisabledButtonTwo();
                break;
            default: 
                return true;
                break;
        }
    }
    const handleRevert = () => {
        sheetRef.current.close();

        setTimeout(() => {
            navigation.goBack();

            saveDropOffCartData({});
        }, 250);
    }
    return (
        <Fragment>
            <Button onPress={() => handleRevert()} title={"Exit (slide-up pane) & Revert To Previous Page"} style={{ width: "100%" }} color={Colors.primaryColor} />
            <CustomFadeComponentHelper handleNearbyLocationDropoffPointSearch={handleNearbyLocationDropoffPointSearch} saveDropOffCartData={saveDropOffCartData} setAllowModificationPane={setAllowModificationPane} sheetRef={sheetRef} style={{ height: height * 0.670 }} calculateDisabled={renderVariousDisablingCalculations} page={page} proceedToNextPage={proceedToNextPage} children={renderVariousScreens(page)} />
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        formData: state.cartData.formData,
        userData: state.auth.data
    }
}
export default connect(mapStateToProps, { saveDropOffCartData })(SheetPaneContentDropOffHelper);