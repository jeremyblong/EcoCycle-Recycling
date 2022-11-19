import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/styles.js";


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    buttonStyleCentered: {
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        backgroundColor: "rgba(52, 52, 52, 0.255)",
        borderWidth: 3.25,
        borderColor: Colors.greenColor,
        borderRadius: 22.5
    },
    cardContainerStyle: {
        backgroundColor: "black", 
        borderWidth: 1.50, 
        borderTopColor: Colors.primaryColorBright, 
        borderBottomColor: Colors.greenColor,
        borderLeftColor: "#fff",
        borderRightColor: "#fff",
        borderRadius: 17.5
    },
    containerButtonStyle: {
        position: "relative",
        bottom: -92.5, 
        width: width * 0.7,
        paddingRight: 12.5,
        paddingLeft: 12.5,
        zIndex: 99999999999
    },
    name: {
        color: "#fff", 
        fontSize: 20
    },
    headerText: {
        fontSize: 27.5,
        textDecorationLine: "underline",
        fontWeight: "bold",
        textAlign: "left",
        marginBottom: 15,
        color: "#fff",
        marginLeft: 17.5,
        marginTop: 17.5
    },  
    videoStyle: {
        minWidth: width * 0.91, 
        minHeight: 200, 
        left: -15,
        marginBottom: 0,
        top: -32.5,
        zIndex: 1
    }
})

export default styles;