import { Fonts, Colors, Sizes } from "../../../constants/styles";
import { StyleSheet, Dimensions } from "react-native";


const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    hr: {
        marginTop: 10,
        marginBottom: 10,
        width: "100%",
        minWidth: "100%",
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey"
    }
})

export default styles;