import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes, Fonts } from "../../constants/styles.js";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    centered: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    listheaderStyles: {},
    middleText: {
        fontWeight: "bold",
        textDecorationLine: "underline",
        fontSize: 23.25,
        color: "#000",
        textAlign: "center"
    },
    highestTiered: {
        position: "relative",
        zIndex: 9999999999999999999999999999,
    },
    centeredTopPortion: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 27.25,
        zIndex: 9999999999999999,
        left: 0,
        right: 0
    },
    rowItem: {
        flexDirection: "row",
        display: "flex"
    },
    toppedText: {
        fontSize: 19.25,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000"
    },
    underlinedBoldText: {
        fontWeight: "bold",
        textDecorationLine: "underline",
        color: Colors.primaryColor
    },
    bottomedText: {
        fontSize: 17.25,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000"
    },
    columned: {
        flexDirection: "column",
        display: "flex",
        padding: 3.5,
        height: 63.5,
        minHeight: 63.5
    },
    listTopContainer: {
        flex: 1,
        zIndex: 1,
        maxHeight: 150
    },
    columnedBottom: {
        flexDirection: "column",
        display: "flex",
        padding: 3.5,
        height: 130,
        minHeight: 130,
        marginBottom: 13.75
    },
    halfColumnOnly: {
        width: "50%",
        maxWidth: "50%",
        display: "flex"
    },
    fullColumnOnly: {
        width: "100%",
        maxWidth: "100%",
        display: "flex"
    },
    labelTextFarBottom: {
        fontWeight: "bold", 
        fontSize: 15,
        textDecorationLine: "underline",
        textAlign: "left"
    },
    labelText: {
        fontWeight: "bold", 
        fontSize: 15,
        textDecorationLine: "underline",
        textAlign: "left",
        bottom: 5.25
    },
    renderedItemHR: {
        borderBottomColor: Colors.primaryColor,
        borderBottomWidth: 2.25,
        marginTop: 25,
        marginBottom: 12.75,
        width: "100%"  
    },
    bulletItem: {
        flexShrink: 1, 
        color: Colors.secondaryColor,
        fontSize: 14,
        textAlign: "left",
        fontWeight: "bold",
        position: "absolute",
        bottom: 5.75,
        left: 4
    },
    middleChunkTextWrapper: {
        backgroundColor: "#fff",
        maxWidth: width * 0.825,
        borderRadius: 32.5,
        padding: 10.25,
        borderWidth: 3,
        borderColor: Colors.primaryColor,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 1,
        shadowRadius: 16.00,
        elevation: 14.25
    }
})
export default styles;