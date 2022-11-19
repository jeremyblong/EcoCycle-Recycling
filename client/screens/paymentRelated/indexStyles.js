import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes } from "../../constants/styles.js";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    avatarComment: {
        minWidth: 37.25,
        width: 37.25,
        height: 37.25,
        minHeight: 37.25
    },
    avatarCommentTwo: {
        minWidth: 50,
        width: 50,
        height: 50,
        minHeight: 50
    },
    hr: {
        width: "100%",
        minWidth: "100%",
        marginTop: 12.25,
        marginBottom: 3.25,
        borderTopWidth: 2,
        borderTopColor: "grey"
    },
    hrBottom: {
        width: "100%",
        minWidth: "100%",
        marginTop: 3.25,
        borderTopWidth: 2,
        borderTopColor: "grey"
    },
    centered: {
        justifyContent: "center",
        minHeight: 425,
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    illustration: {
        maxWidth: width * 0.85,
        width: width * 0.85,
        height: 282.5,
        maxHeight: 282.5
    }
})
export default styles;