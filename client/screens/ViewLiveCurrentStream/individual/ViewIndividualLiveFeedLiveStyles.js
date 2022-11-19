import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../constants/styles.js";


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    controlsContainer: {
        flex: 1,
        height: height * 0.35,
        maxHeight: height * 0.35,
        backgroundColor: "black"
    },
    topContainer: {
        flex: 1,
        height: height * 0.65,
        maxHeight: height * 0.65
    },
    controllerIcon: {
        maxWidth: 90,
        maxHeight: 90,
        width: 90,
        height: 90
    },  
    columnContainer: {
        maxWidth: "50%",
        width: "50%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },  
    spacerVideoBottom: {
        height: "5%",
        backgroundColor: "black"
    },
    backgroundVideo: {
        width,
        height: "95%",
        borderBottomColor: Colors.greenColor,
        borderBottomWidth: 5
    },
    topRightIcon: {
        maxWidth: 87.5,
        maxHeight: 62.5,
        height: 62.5,
        width: 87.5,
        position: "absolute",
        right: 12.5,
        top: 0
    },  
    bottomLeftIcon: {
        maxWidth: 62.5,
        maxHeight: 50,
        height: 50,
        width: 62.5,
        position: "absolute",
        left: 12.5,
        bottom: 12.5
    },
    bottomRightIcon: {
        maxWidth: 50,
        maxHeight: 50,
        height: 50,
        width: 50,
        position: "absolute",
        right: 12.5,
        bottom: 12.5
    },
    centeredRow: {
        flexDirection: "row",
        height: "33.333333%",
        width,
        maxHeight: "33.333333%",
        minHeight: "33.333333%",
        flex: 1
    },
    row: {
        flexDirection: "row",
        height: "33.333333%",
        minHeight: "33.333333%",
        width,
        maxHeight: "33.333333%",
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    outterContainer: {
        flex: 1
    }
})

export default styles;