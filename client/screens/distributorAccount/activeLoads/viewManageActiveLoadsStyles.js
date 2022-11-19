import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes } from "../../../constants/styles";


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    placeholderMediaSmaller: {
        backgroundColor: Colors.secondaryColor, width: 52.5, height: 52.5
    },
    placeholderMedia: {
        backgroundColor: Colors.secondaryColor, width: 82.5, height: 82.5
    },
    halfColumn: {
        flexDirection: "column",
        maxWidth: "48.5%",
        width: "48.5%",
        display: "flex"
    },
    columnOnly: {
        flexDirection: "column",
        paddingRight: 13.25,
        display: "flex"
    },
    rowOnly: {
        flexDirection: "row",
        display: "flex",
        margin: 14.25
    },
    noContractAvailable: {
        maxWidth: width * 0.925,
        width: width * 0.925,
        height: 275,
        maxHeight: 275
    }
})
export default styles;