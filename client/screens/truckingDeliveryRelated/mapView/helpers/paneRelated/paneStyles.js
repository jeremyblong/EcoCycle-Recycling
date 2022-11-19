import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes } from "../../../../../constants/styles.js";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    centered: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    slightPaddingWrapper: {
        padding: 7.25
    },
    topTextLeft: {
        fontWeight: "bold",
        textAlign: "center",
        color: "#000",
        padding: 7.25,
        textDecorationLine: "underline"
    }, 
    freightStartEndText: {
        fontWeight: "bold",
        // textDecorationLine: "underline"
    },
    innerIconInput: {
        width: 37.5,
        height: 37.5,
        maxHeight: 37.5,
        maxWidth: 37.5
    },
    rowOnly: {
        flexDirection: "row",
        display: "flex"
    },
    subbedTextLabel: {
        fontWeight: "bold",
        textDecorationLine: "underline",
        color: Colors.primaryColor,
        fontSize: 16.25
    }, 
    subbedTextResponse: {
        color: "#000",
        fontSize: 14.25
    },
    topLeftCornerWrapper: {
        position: "absolute",
        left: 7.25,
        top: 7.25,
        backgroundColor: "#fff",
        borderRadius: 7.25,
        borderWidth: 2.25,
        borderColor: Colors.primaryColor
    },
    veryThinHR: {
        borderBottomColor: Colors.secondaryColor,
        borderBottomWidth: 1.75,
        marginTop: 5.25,
        marginBottom: 5.25,
        width: "100%"
    },
    halfedColumn: {
        display: "flex",
        flexDirection: "column",
        width: "50%",
        maxWidth: "50%",
        justifyContent: "flex-start"
    },
    topRightCornerWrapper: {
        position: "absolute",
        right: 3.75,
        top: 3.75
    },
    showMoreOrLess: {
        fontWeight: "bold",
        color: Colors.secondaryColor,
        paddingTop: 7.25,
        textDecorationLine: "underline",
        fontSize: 17.5
    },
    showMoreOrLessClose: {
        fontWeight: "bold",
        color: Colors.primaryColor,
        paddingTop: 7.25,
        textDecorationLine: "underline",
        fontSize: 17.5
    },
    leftAlignStars: {
        paddingTop: 0,
        paddingBottom: 13.25
    },
    dragMeText: {
        textDecorationLine: "underline",
        fontWeight: "bold",
        color: Colors.secondaryColor,
        fontSize: 17.25,
        textAlign: "center",
        top: -12.50
    },
    farRightAbsolute: {
        position: "absolute",
        right: 7.25,
        top: 0
    },  
    topRightImageArrow: {
        maxWidth: 53.25,
        maxHeight: 53.25,
        height: 53.25,
        width: 53.25,
        position: "absolute",
        right: 0,
        top: 0,
    },
    topHeaderSpacer: {},
    leftTouchableBottom: {
        maxWidth: 53.25,
        zIndex: 9999999999999999999999999999999999999999999999999999999999999999,
        maxHeight: 53.25,
        height: 53.25,
        width: 53.25,
        position: "absolute",
        left: 0,
        top: 0,
    },
    rightTouchableBottom: {
        maxWidth: 53.25,
        zIndex: 9999999999999999999999999999999999999999999999999999999999999999,
        maxHeight: 53.25,
        height: 53.25,
        width: 53.25,
        position: "absolute",
        right: 0,
        top: 0,
    },
    topLeftImageArrow: {
        maxWidth: 53.25,
        maxHeight: 53.25,
        height: 53.25,
        width: 53.25,
        position: "absolute",
        left: 0,
        top: 0
    },
    topRightImage: {
        maxWidth: 46.75,
        maxHeight: 46.75,
        height: 46.75,
        width: 46.75
    },
    semiTruckImageSlightlyLonger: {
        maxWidth: 32.5,
        maxHeight: 27,
        height: 27,
        width: 32.5,
        marginTop: -5
    },
    imageBacked: {
        minWidth: "100%",
        width: "100%",
        height: 225,
        minHeight: 225
    }
});

export default styles;