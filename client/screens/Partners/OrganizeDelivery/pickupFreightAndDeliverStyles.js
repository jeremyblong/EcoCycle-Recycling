import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes, Fonts } from "../../../constants/styles.js";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    hr: {
        width: "100%",
        marginTop: 12.75,
        marginBottom: 12.75,
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey"
    }
})
export default styles;
