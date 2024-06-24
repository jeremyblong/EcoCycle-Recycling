import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes } from "../../constants/styles.js";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    textFieldContainerStyle: {
        height: 55.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        marginTop: 20,
        paddingLeft: 10,
        elevation: 1.0
    },
    labelCustom: {
        fontWeight: "bold",
        marginTop: 10,
        fontSize: 15.75,
        textDecorationLine: "underline"
    },
    spinnerTextStyle: {
        color: '#FFF',
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    dayLabel: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    textFieldContainerStyle: {
        height: 55.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        marginTop: 20,
        paddingLeft: 10,
        elevation: 1.0
    },
    bottomSheetStyle: {
        backgroundColor: 'white',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding
    },
    iconCustom: {
        maxWidth: 42.5,
        maxHeight: 42.5,
        borderRadius: 17.5,
        minHeight: 42.5,
        minWidth: 42.5
    },  
    bottomSheetStyleHidden: {
        display: "none"
    },
})

export default styles;