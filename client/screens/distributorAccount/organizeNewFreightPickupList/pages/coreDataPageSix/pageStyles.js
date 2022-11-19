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
    outterContainer: {
        margin: 11.25
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
})
export default styles;