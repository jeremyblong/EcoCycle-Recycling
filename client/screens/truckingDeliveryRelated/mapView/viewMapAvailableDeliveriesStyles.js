import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes, Fonts } from "../../../constants/styles.js";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    centered: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    map: {
        height: height * 0.90,
        minHeight: height * 0.90,
        width,
        maxHeight: height * 0.90
    },
    slidingPanelStyles: {
        backgroundColor: "#fff",
        zIndex: 999999999999999999999999
    },
    inputStyles: {}, 
    containerStyles: {},
    floatingInputWrapper: {
        height: 72.5,
        minHeight: 72.5
    },
    innerIconInput: {
        width: 45,
        height: 45,
        maxHeight: 45,
        maxWidth: 45
    }
});

export default styles;