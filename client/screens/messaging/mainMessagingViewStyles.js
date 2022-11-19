import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/styles.js";


const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    headerProfilePic: {
        maxWidth: 50, 
        minWidth: 50,
        minHeight: 50,
        borderRadius: 120,
        maxHeight: 50,
        marginRight: 10
    },
    outterContainer: {
        flex: 1,
        height,
        width
    }, 
    scrollerCustom: {
        height: "100%",
        width
    },  
    whiteText: {
        color: "white"
    },
    tabviewContainer: {
        width,
        height: "100%",
        flex: 1  
    },
    headerText: {
        fontSize: 17.5,
        padding: 5,
        fontWeight: "bold"
    },
    rbContainer: {
        width,
        flex: 1,
        height: "100%"
    },
    absoluteBottom: {
        height: 48,
        maxWidth: width,
        backgroundColor: "black"
    },
    title: {
        fontSize: 30,
        width: 100,
        marginLeft: 0,
        color: "#ffffff"
    },
    goldText: {
        color: "#ffffff",
        fontWeight: "bold"
    },
    textRightSmall: {
        textAlign: "right",
        color: "blue",
        width: width * 0.30,
        paddingRight: 10
    },
    greyButton: {
        backgroundColor: "#303030",
        width: "50%",
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center"
    },
    tabbedButton: {
        width: width * 0.46775,
        minWidth: width * 0.46775,
        borderWidth: 1.25,
        borderRadius: 6,
        borderColor: "#000"
    },
    columnLeft: {
        width: width * 0.20
    },
    topHeader: {
        borderBottomColor: "transparent",
        backgroundColor: "#303030",
        height: 60
    },
    topTextSmaller: {
        width: width * 0.775,
        maxWidth: width * 0.775,
        minWidth: width * 0.775
    },
    formatTextRightAgo: {
        position: "absolute",
        right: 13.25,
        bottom: 4.25,
        color: Colors.primaryColor
    },
    searchbarContainerStyle: {
        minHeight: 77.25,
        height: 77.25
    },
    smallerIcon: {
        maxWidth: 35,
        maxHeight: 35
    },
    topTextSmall: {
        fontWeight: "bold",
        color: "#000"
    },
    circleMenu: {
        maxWidth: 65,
        maxHeight: 65,
        zIndex: 9999
    },
    bottomRightCorner: {
        position: "absolute",
        bottom: 75,
        right: 20,
        zIndex: 9999
    },
    horizontalScroll: {
        height: 125
    },
    containerStyle: {
        paddingBottom: 25
    },
    rightColumn: {
        width: width * 0.80
    },
    container: {
        width,
        height: "100%",
        backgroundColor: "white",
        flex: 1
    },
    margin: {
        margin: 12
    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#f0f0f0",
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center"
    },
    circleTwo: {
        width: 60,
        minWidth: 60,
        minHeight: 60,
        height: 60,
        margin: 10,
        borderRadius: 30,
        backgroundColor: "#f0f0f0",
        alignItems: 'center',
        alignContent: "center"
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center"
    }
})

export default styles;