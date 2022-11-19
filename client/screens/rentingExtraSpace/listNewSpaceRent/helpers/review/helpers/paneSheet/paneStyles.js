import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes, Fonts } from "../../../../../../../constants/styles.js";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    outterMostContainerWrapper: {
        flex: 1
    },
    placeholderText: {
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.primaryColor,
        fontSize: 32.5
    }
    // listheaderStyles: {
    //     marginBottom: 20,
    //     flex: 1
    // }
})
export default styles;