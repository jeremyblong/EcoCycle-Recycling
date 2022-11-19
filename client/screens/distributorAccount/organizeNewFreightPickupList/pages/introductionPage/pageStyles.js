import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes, Fonts } from "../../../../../constants/styles";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    toppedBreaker: {
        marginTop: 32.5,
        marginBottom: 22.5,
        margin: 7.75,
        backgroundColor: "#fff",
        borderWidth: 1.25,
        padding: 7.25,
        borderColor: "#000"
    },
    rowItem: {
        display: "flex",
        flexDirection: "row"
    },
    labeled: {
        fontWeight: "bold",
        textAlign: "left",
        color: "#000",
        marginBottom: 11.25
    },
    centeredMainContent: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }, 
    absoluteButtonBottom: {
        marginTop: 22.5
    },
    checkboxInput: {
        padding: 12.5
    },
    checkboxImage: {
        minWidth: 37.5,
        minHeight: 37.5,
        width: 37.5,
        height: 37.5
    },  
    whiteBacking: {
        marginBottom: 22.5,
        margin: 6.425,
        backgroundColor: "#fff",
        borderWidth: 1.25,
        padding: 7.25,
        borderColor: "#000"
    },
    topspacer: {
        marginTop: 22.5
    },
    innerText: {
        fontWeight: "bold",
        color: Colors.primaryColor
    },
    labeledSubbed: {
        marginTop: 11.25,
        color: "#000"
    },
    centered: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    topHr: {
        borderBottomWidth: 2,
        borderBottomColor: "#fff",
        marginTop: 32.25,
        marginBottom: 0,
        width: "82.5%"
    },
    hr: {
        borderBottomWidth: 2,
        borderBottomColor: "#fff",
        marginTop: 8.25,
        marginBottom: 22.25,
        width: "82.5%"
    },
    checkboxHR: {
        borderBottomWidth: 1.25,
        borderBottomColor: "#000",
        marginTop: 6.25,
        marginBottom: 6.25,
        width: "100%"
    }
})
export default styles;