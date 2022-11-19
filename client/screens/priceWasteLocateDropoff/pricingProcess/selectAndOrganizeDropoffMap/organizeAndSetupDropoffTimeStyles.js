import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes } from "../../../../constants/styles.js";


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    map: {
        height: height * 0.85,
        minHeight: height * 0.85,
        width,
        maxHeight: height * 0.85
    },
    buttonStyleBottom: {
        height: height * 0.075
    },
    calloutDescription: {}, 
    calloutTitle: {},
    topCalloutText: {
        fontSize: 18.5,
        marginBottom: 27.5,
        textAlign: "center",
        fontWeight: "bold",
        textDecorationLine: "underline",
        color: "#fff"
    },
    centeredCircleIcon: {
        width: 75,
        height: 75,
        minWidth: 75,
        minHeight: 75,
        zIndex: 9999999999,
        resizeMode: "contain",
        position: "absolute",
        left: (width * 0.50) - 55,
        borderRadius: 50,
        bottom: -52.5
    },
    badgeContainer: {
        paddingLeft: 6.25,
        minHeight: 50,
        height: 50,
        paddingRight: 6.25,
        marginTop: 7.75,
        paddingTop: 3.25,
        paddingBottom: 3.25,
        backgroundColor: Colors.backColor,
        borderWidth: 1.5,
        borderColor: Colors.blackColor
    },
    textBadge: {
        color: "#000",
        textAlign: "center"
    },
    rowed: {
        display: "flex",
        flexDirection: "row"
    },
    centeredCircleIconWrapper: {
        height: 125,
        minHeight: 125,
        width: 125,
        minWidth: 125,
        position: "absolute",
        left: (width * 0.50) - 55,
        bottom: -52.5,
        zIndex: 9999999999
    },
    bufferView: {
        minHeight: 32.5,
        height: 32.5
    },
    thinHRBlue: {
        borderBottomColor: Colors.secondaryColor,
        borderBottomWidth: 1.25,
        marginTop: 7.25,
        marginBottom: 4.25,
        width: "75%"
    },
    calloutButtonStyle: {
        borderRadius: 12.5, 
        height: 42.5, 
        marginTop: 5,
        marginBottom: 3.5
    },
    oneThirdText: {
        textAlign: "center",
        fontSize: 15,
        color: Colors.blackColor,
        fontWeight: "bold"
    },
    oneThirdView: {
        maxWidth: "32.5%",
        minWidth: "32.5%",
        width: "32.5%",
        alignContent: 'center',
        justifyContent: 'center', 
        alignItems: 'center'
    },  
    absolutePositionTopContain: {
        position: 'absolute', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    centered: {
        alignContent: 'center',
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 57.5
    },
    centeredTop: {
        position: "absolute"
    },
    topCalloutContainer: {
        minHeight: 100,
        height: 100,
        zIndex: 9999999999,
        backgroundColor: Colors.blackColor,
        width: width * 0.925,
        minWidth: width * 0.925,
        borderTopLeftRadius: 27.5,
        borderTopRightRadius: 27.5,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }, 
    bottomCalloutContainer: {
        minHeight: 262.5,
        height: 262.5,
        backgroundColor: Colors.backColor,
        width: width * 0.925,
        minWidth: width * 0.925
    }
})
export default styles;