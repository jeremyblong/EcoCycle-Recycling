import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes } from "../../constants/styles.js"; 


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    map: {
        minWidth: width, 
        minHeight: height * 0.8725, 
        height: height * 0.8725, 
        width,
        zIndex: 999999
    },
    customMapStyle: {
        backgroundColor: "black"
    },
    calloutMain: {
        backgroundColor: "black"
    },
    conditionalHR: {
        borderBottomColor: "#fff",
        borderBottomWidth: 1.75,
        marginTop: 32.25,
        marginBottom: 62.5,
        width: "100%"
    },
    modalHrLine: {
        borderBottomColor: Colors.blackColor,
        borderBottomWidth: 2.25,
        marginTop: 7.75,
        marginBottom: 7.75,
        width: "100%"
    },
    margined: {
        zIndex: 99999999999999999999999999999999999999999999999999,
        position: 'absolute', 
        top: 10, 
        left: 0, 
        right: 0, 
        bottom: 20, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    backgroundRoundedSimpleDefaulted: {
        backgroundColor: "black",
        marginLeft: 17.5,
        marginRight: 17.5,
        maxHeight: 82.25,
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 12.25,
        zIndex: 9999999999999999999999999999999999999999,
        justifyContent: 'center', 
        alignItems: 'center',
        borderWidth: 2,
        borderColor: "#fff"
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        zIndex: 99999999999999999999999999999999999999999999999999999999999999999999999999,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    cancelButtonStyle: {
        flex: 0.50,
        backgroundColor: "#D2042D",
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    dialogYesButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.secondaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    backgroundRoundedSimple: {
        backgroundColor: "black",
        marginLeft: 17.5,
        marginRight: 17.5,
        marginTop: 10.5,
        height: 155,
        borderRadius: 12.25,
        zIndex: 9999999999999999999999999999999999999999,
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderWidth: 2,
        borderColor: "#fff"
    },
    greenCashText: {
        color: Colors.greenColor,
        fontWeight: "bold",
        textDecorationLine: "underline"
    }, 
    emphisizedTextRed: {
        color: Colors.primaryColor,
        fontWeight: "bold",
        textDecorationLine: "underline"
    }, 
    emphisizedText: {
        color: Colors.secondaryColor,
        fontWeight: "bold",
        textDecorationLine: "underline"
    }, 
    columnOnly: {
        display: "flex",
        flexDirection: "column",
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    selectedDataTextBottom: {
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        zIndex: 9999999999999999999999999999999999999999,
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 7, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    selectedDataText: {
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        zIndex: 9999999999999999999999999999999999999999,
        position: 'absolute', 
        top: 12.25, 
        left: 0, 
        right: 0, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    bottomRightAlignedTouchable: {
        position: "absolute",
        bottom: 22.25,
        right: 22.25,
        zIndex: 999999999999999999999999999999,
        width: 60,
        height: 52.25
    },
    bottomRightAlignedTouchableImage: {
        maxWidth: 60, 
        width: 60,
        tintColor: "#fff",
        maxHeight: 45,
        zIndex: 999999999999999999999999999999,
        height: 45
    }
});

export default styles;
