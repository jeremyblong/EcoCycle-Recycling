import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes } from "../../../constants/styles.js";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    centered: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    innerIconInputMultiline: {
        maxWidth: 30,
        maxHeight: 30,
        height: 30,
        width: 30,
        marginRight: 7.75,
        marginTop: 10.25
    },
    innerIconInputTop: {
        maxWidth: 30,
        maxHeight: 30,
        height: 30,
        width: 30,
        bottom: 11.75,
        marginRight: 7.75
    },
    margined: {
        margin: 7.25,
        marginTop: 20
    },
    inputFloatingMoveStyles: {
        paddingLeft: 7.75,
        textAlignVertical: "top",
        paddingTop: 0,
        top: -7.75
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
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
    underlineBoldText: {
        textDecorationLine: "underline",
        fontWeight: "bold",
        color: Colors.darkerBlue
    },
    underlineBoldTextBlack: {
        textDecorationLine: "underline",
        fontWeight: "bold",
        color: "#000"
    },
    labelUnique: {
        fontSize: 15,
        color: "#000",
        marginBottom: 5,
        marginLeft: 7
    },
    titleTopText: {
        fontSize: 21.25,
        color: Colors.primaryColor,
        marginBottom: 22.5,
        marginTop: 12.5,
        fontWeight: "bold"
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
    buttonSearchWithCriteria: {
        marginTop: 20,
        borderColor: "#000",
        borderWidth: 1.25,
        borderRadius: 5.5,
        marginBottom: 16.75
    },
    rowOnly: {
        flexDirection: "row",
        display: "flex"
    },  
    startRepickButton: {
        marginTop: 23.25
    },
    dateLabeled: {
        textDecorationLine: "underline",
        fontWeight: "bold",
        color: Colors.primaryColor,
        fontSize: 17.25,
        paddingBottom: 13.25,
        paddingTop: 8.75
    }, 
    dateSubtext: {
        textDecorationLine: "underline",
        fontWeight: "bold",
        color: "#000",
        fontSize: 15
    },
    startColumn: {
        flexDirection: "column",
        maxWidth: "50%",
        width: "50%",
        display: "flex"
    },
    endColumn: {
        flexDirection: "column",
        maxWidth: "50%",
        width: "50%",
        display: "flex"
    },
    emphisizedText: {
        textDecorationLine: "underline",
        fontWeight: "bold",
        fontSize: 17.25,
        color: Colors.primaryColor
    },
    inputFloatingStyles: {
        paddingLeft: 7.75,
        textAlignVertical: "top",
        paddingTop: 14.25,
        maxWidth: "88.25%"
    },
    inputFloatingStylesSelectable: {
        minHeight: 62.5,
        borderWidth: 1.5,
        borderRadius: 11.5,
        borderColor: Colors.secondaryColor,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.76,
        shadowRadius: 6.68,
        elevation: 11
    },
    labelFloatingStyle: {
        maxHeight: 0
    },
    thinishHR: {
        borderBottomColor: Colors.blackColor,
        borderBottomWidth: 1.25,
        marginTop: 14.25,
        marginBottom: 7.25,
        width: "100%"
    },
    inputFloatingContainerStyle: {
        minHeight: 82.5,
        borderWidth: 1,
        borderRadius: 11.5,
        borderColor: Colors.secondaryColor,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.76,
        shadowRadius: 6.68,
        elevation: 11
    },
    multilineContainerStyle: {
        minHeight: 82.5,
        borderWidth: 1,
        borderRadius: 11.5,
        borderColor: Colors.secondaryColor,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.76,
        shadowRadius: 6.68,
        elevation: 11
    },
    showCountdownStylesCustom: {
        color: "red",
        fontWeight: "bold",
        textDecorationLine: "underline",
        fontSize: 12.25
    },
    changeProfileContainerStyle: {
        flexDirection: 'row',
        backgroundColor: Colors.orangeColor,
        paddingVertical: Sizes.fixPadding - 5.0,
        width: 130.0,
        borderRadius: Sizes.fixPadding * 2.0,
        borderColor: Colors.whiteColor,
        borderWidth: 2.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    labeledTop: {
        fontWeight: "bold",
        textDecorationLine: "underline",
        paddingBottom: 12.5,
        color: "#666699",
        fontSize: 16
    },
    customLabelStyles: {
        fontWeight: "bold",
        textDecorationLine: "underline",
        paddingTop: 12.25
    },
    customLabelStylesSelectable: {
        fontWeight: "bold",
        textDecorationLine: "underline",
        paddingTop: 8.75,
        color: "#666699",
        paddingLeft: 18.75,
        paddingRight: 18.75
    },
    saveButtonContainerStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding + 5.0
    },
    textFieldsCommonStyle: {},
    bottomSheetStyle: {
        backgroundColor: 'white',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding
    },
    headerWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor
    }
});

export default styles;