import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes, Fonts } from "../../../../../constants/styles";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    hr: {
        width: "100%",
        marginTop: 12.75,
        marginBottom: 12.75,
        borderBottomWidth: 2,
        borderBottomColor: "grey"
    },
    hrBlue: {
        width: "100%",
        marginTop: 12.75,
        marginBottom: 12.75,
        borderBottomWidth: 2,
        borderBottomColor: Colors.secondaryColor
    },
    mainText: {
        fontSize: 22.25,
        fontWeight: "bold",
        color: Colors.primaryColor,
        textDecorationLine: "underline"
    },
    subbedText: {
        marginTop: 12.25,
        fontSize: 16,
        color: "#000"
    },
    webviewStyle: {
        marginBottom: 12.5,
        width: "100%",
        maxWidth: "100%",
        maxHeight: height * 0.8575,
        height: height * 0.8575,
    },
    labeledStyle: {
        marginTop: 6.25
    },
    inputContainerWrapper: {
        minHeight: 67.25,
        height: 67.25,
        borderRadius: 12.5,
        borderWidth: 1.25,
        borderColor: "#000"
    },
    bottomSheetStyle: {
        backgroundColor: 'white',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding
    },
    innerIconInput: {
        width: 22.75,
        height: 22.75,
        maxHeight: 22.75,
        maxWidth: 22.75
    },
    outterContainer: {
        marginLeft: 12.25,
        marginRight: 12.25,
        backgroundColor: "#fff",
        minHeight: height * 0.8875,
        height: "100%"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1
    },
    timeWrapper: {
        flex: 1
    },
    footer: {
        height: 100,
        margin: 12.25
    },
    labelCustom: {
        fontWeight: "bold",
        textAlign: "center",
        marginLeft: 32.5,
        marginRight: 32.5,
        fontSize: 20.75,
        textDecorationLine: "underline"
    }
})
export default styles;