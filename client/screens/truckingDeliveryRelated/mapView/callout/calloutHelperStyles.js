import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../../constants/styles";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    centered: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    headerTitleMain: {
        color: "#000",
        textDecorationLine: "underline",
        fontSize: 18.75
    },
    calloutInnerWrapperCardContainer: {
        backgroundColor: "#fff", 
        borderRadius: 11.5,
        borderWidth: 2.25,
        borderColor: Colors.primaryColor,
        width: width * 0.7875, 
        maxWidth: width * 0.7875,
        minHeight: height * 0.625,
        marginBottom: 22.5
    },
    columnFullWidth: {
        maxWidth: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    column: {
        maxWidth: "48.75%",
        width: "48.75%",
        display: "flex",
        flexDirection: "column"
    },
    likesDislikesLabel: {
        textAlign: "left",
        fontWeight: "bold",
        display: "flex",
        flexWrap: "wrap",
        fontSize: 15,
        color: Colors.secondaryColor
    },
    hrThick: {
        borderBottomColor: Colors.primaryColor,
        borderBottomWidth: 1.25,
        marginTop: 9.75,
        marginBottom: 9.75,
        width: "100%"
    },
    baselineSubText: {
        textAlign: "left",
        marginTop: 12.5,
        fontSize: 15,
        color: "#000"
    },
    likesDislikesText: {
        textAlign: "left",
        marginTop: 12.5,
        fontSize: 15,
        color: "#000"
    },
    calloutInnerStyle: {},
    nativeTextInner: {
        color: "#000", 
        textDecorationLine: "underline", 
        fontWeight: "bold", 
        textAlign: "center"
    }
})
export default styles;