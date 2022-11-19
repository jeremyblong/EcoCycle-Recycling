import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    midText: {
        color: "red", 
        paddingTop: 10,
        fontWeight: "bold", 
        textAlign: "center", 
        fontSize: 20
    }
});

export default styles;