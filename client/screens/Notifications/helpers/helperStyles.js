import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../constants/styles.js";


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    modalInnerContainer: {
        flex: 1, 
        maxWidth: width * 0.925, 
        padding: 12.5,
        backgroundColor: "#fff", 
        justifyContent: "center", 
        alignContent: "center", 
        alignItems: "center"
    },
    contentContainer: {
        maxHeight: height * 0.925,
        minHeight: height * 0.925,
        height: height * 0.925,
        width: width * 0.925,
        maxWidth: width * 0.925
    },
    timeContainerStyles: {
        minWidth: 75, 
        maxWidth: 75, 
        marginTop: 20.5
    },
    timelineIconStyle: {
        maxWidth: 20,
        maxHeight: 20,
        tintColor: "#fff"
    },  
    acceptanceInput: {
        width: "100%"
    },
    toppedImageBanner: {
        maxHeight: 182.5,
        height: 182.5,
        marginBottom: 10,
        borderWidth: 3.25,
        borderColor: Colors.secondaryColor,
        width: "100%",
        minWidth: "100%"
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 12.25,
        marginBottom: 7.25,
        width: "100%"
    },
    inputIcon: {
        maxWidth: 27.5,
        maxHeight: 27.5
    },
    acceptanceInput: {},
    label: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "left",
        marginBottom: 12.5
    }
})
export default styles;