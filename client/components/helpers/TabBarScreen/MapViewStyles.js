import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    map: {
        minWidth: width, 
        minHeight: height * 0.75, 
        height: height * 0.75, 
        width
    },
    customMapStyle: {
        backgroundColor: "black"
    },
    calloutMain: {
        backgroundColor: "black"
    }
});

export default styles;

