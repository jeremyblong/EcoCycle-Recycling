import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes, Fonts } from "../../../../../constants/styles";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    outterContainer: {
        margin: 12.25
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
    inputFloatingStylesMultiline: {
        paddingLeft: 7.75,
        textAlignVertical: "top",
        color: "#000",
        paddingTop: 27.25,
        maxWidth: "88.25%"
    },
    mediumHR: {
        borderBottomColor: "#fff",
        borderBottomWidth: 2,
        marginTop: 12.25,
        marginBottom: 12.25,
        width: "100%"
    },
    innerIconInputMulti: {
        width: 22.75,
        height: 22.75,
        maxHeight: 22.75,
        maxWidth: 22.75,
        marginTop: 27.25
    },
    innerIconInputMultiOne: {
        width: 22.75,
        height: 22.75,
        maxHeight: 22.75,
        maxWidth: 22.75,
        marginTop: 18.25
    },
    innerIconInput: {
        width: 22.75,
        height: 22.75,
        maxHeight: 22.75,
        maxWidth: 22.75
    },
    labelFloatingStyle: {
        paddingTop: 8
    },
    inputFloatingStyles: {
        paddingLeft: 7.75,
        textAlignVertical: "top",
        color: "#000",
        paddingTop: 14.25,
        maxWidth: "88.25%"
    },
    showCountdownStylesCustom: {
        color: "red",
        fontWeight: "bold",
        textDecorationLine: "underline",
        fontSize: 12.25
    }
})
export default styles;