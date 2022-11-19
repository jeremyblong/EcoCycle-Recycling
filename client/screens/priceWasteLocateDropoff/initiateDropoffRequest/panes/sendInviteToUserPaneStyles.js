import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes, Fonts } from "../../../../constants/styles.js";


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    rowItem: {
        flexDirection: "row",
        flex: 1
    },
    rowItemTwo: {
        flexDirection: "row",
        flex: 1,
        width,
        maxWidth: width * 0.85
    },
    columned: {
        flexDirection: "column",
        flex: 1,
        height: 55
    },
    columnedLower: {
        flexDirection: "column",
        flex: 1,
        maxHeight: 67.5
    },
    columnedOutter: {
        flexDirection: "column",
        flex: 1,
        height: 282.5
    },
    bulletItem: {
        flexShrink: 1, 
        color: Colors.secondaryColor
    },
    labelCustom: {
        flexShrink: 1, 
        color: "#fff", 
        fontSize: 18, 
        textDecorationLine: "underline", 
        marginBottom: 5
    },
    blueThinHr: {
        borderBottomColor: Colors.secondaryColor,
        borderBottomWidth: 1.5,
        width: "85%",
        marginTop: 3.75,
        marginBottom: 3.75
    },
    submittingText: {
        fontSize: 20,
        maxWidth: width * 0.865,
        marginBottom: 22.5,
        textDecorationLine: "underline",
        color: Colors.greenColor,
        textAlign: "left"
    },
    whiteThinHr: {
        borderBottomColor: "#fff",
        borderBottomWidth: 1.5,
        width: "85%",
        marginTop: 3.75,
        marginBottom: 3.75
    },
    calloutButtonStyle: {
        width: width * 0.85,
        marginTop: 7.25
    },
    centered: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginBottom: 25,
        marginTop: 12.5
    }
});

export default styles;