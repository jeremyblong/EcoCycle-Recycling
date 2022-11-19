import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes, Fonts } from "../../../constants/styles";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    imageBacked: {
        width,
        height,
        minHeight: height,
        minWidth: width
    }
})
export default styles;