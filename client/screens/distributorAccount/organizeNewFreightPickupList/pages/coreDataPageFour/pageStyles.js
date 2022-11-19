import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes, Fonts } from "../../../../../constants/styles";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    thinerHR: {
        width: "100%",
        marginTop: 12.75,
        marginBottom: 12.75,
        borderBottomWidth: 2,
        borderBottomColor: "grey"
    },
    outlinedBoxed: {
        borderWidth: 1.5,
        margin: 3.25,
        borderRadius: 4.75,
        borderColor: "lightgrey",
        padding: 4.25
    },
    selectedOutlinedBoxed: {
        borderWidth: 1.5,
        margin: 3.25,
        borderRadius: 4.75,
        borderColor: Colors.secondaryColor,
        padding: 4.25
    },
    outlinedBoxedText: {
        color: "darkgrey",
        fontSize: 20,
        paddingRight: 5.25,
        paddingLeft: 5.25,
        fontWeight: "bold",
        textAlign: "center"
    },
    selectedOutlinedBoxedText: {
        color: "#000",
        fontSize: 20,
        paddingRight: 5.25,
        paddingLeft: 5.25,
        fontWeight: "bold",
        textAlign: "center"
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