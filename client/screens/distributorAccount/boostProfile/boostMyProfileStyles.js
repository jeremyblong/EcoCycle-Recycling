import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts, Sizes } from "../../../constants/styles.js";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    headerWrapStyle: {
        height: 56.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toppedBreaker: {
        marginTop: 32.5,
        marginBottom: 3.25,
        margin: 7.75,
        backgroundColor: "#fff",
        borderWidth: 1.25,
        padding: 7.25,
        borderColor: "#000"
    },
    rowItem: {
        display: "flex",
        flexDirection: "row"
    },
    labeled: {
        fontWeight: "bold",
        textAlign: "left",
        color: "#000",
        marginBottom: 11.25
    },
    fieldAndCategoryWrapStyle: {
        backgroundColor: Colors.blackColor,
        borderRadius: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Sizes.fixPadding,
        borderWidth: 1.5,
        borderColor: Colors.secondaryColor,
        width: 137.25,
    },
    benefitsWrapStyle: {
        backgroundColor: Colors.blackColor,
        borderRadius: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 5.0,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: 75.0,
        left: -10.0,
        right: -10.0,
        elevation: 0.0,
        backgroundColor: '#333333',
    },
    applyedAndSavedButtonWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Sizes.fixPadding + 5.0,
    },
    applyButtonStyle: {
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
    },
    savedButtonWrapStyle: {
        backgroundColor: Colors.blackColor,
        width: 55.0,
        height: 55.0,
        borderRadius: 27.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButtonStyle: {
        backgroundColor: '#E0E0E0',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1.0,
        marginRight: Sizes.fixPadding,
    },
    sureButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1.0,
        marginLeft: Sizes.fixPadding,
    },
    applyJobDialogWrapStyle: {
        width: width - 80.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 3.0
    },
})

export default styles;