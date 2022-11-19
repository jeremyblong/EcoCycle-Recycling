import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes, Fonts } from "../../../../../constants/styles";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    thinerHR: {
        width: "100%",
        marginTop: 12.75,
        marginBottom: 12.75,
        borderBottomWidth: 2,
        borderBottomColor: "grey"
    },
    outterContainer: {
        margin: 11.25
    },
    inputFormRow: {
        display: "flex",
        flexDirection: "row"
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 12.25,
        marginBottom: 7.25,
        width: "100%"
    },
    containerInputStyles: {
        backgroundColor: "#fff",
        height: 72.5,
        minHeight: 72.5,
        borderWidth: 2,
        borderRadius: 4.5,
        borderColor: "#000"
    },
    containerInputStylesSearchable: {
        backgroundColor: "#fff",
        borderWidth: 2,
        borderRadius: 4.5,
        borderColor: Colors.primaryColor
    },
    innerIconInput: {
        maxWidth: 22.25,
        maxHeight: 22.25,
        height: 22.25,
        width: 22.25
    },  
    labelStyles: {
        marginTop: 6.25,
        fontWeight: "bold",
        textAlign: "left"
    },
    badgeLabel: {
        marginBottom: 18.5,
        textAlign: "left",
        marginLeft: 8.25,
        fontWeight: "bold",
        fontSize: 18.25
    },
    removalIconTouchable: {
        position: "absolute",
        right: 12.5,
        maxWidth: 42.5,
        maxHeight: 42.5,
        top: 22.5
    },
    removalIcon: {
        maxWidth: 42.5,
        maxHeight: 42.5
    },
    searchableInputWrapperView: {
        flex: 1,
        zIndex: 99999999999999999999
    },
    customModalBody: {
        margin: 3.25,
        padding: 11.25,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#000"
    },
    map: {
        minWidth: width * 0.825,
        maxWidth: width * 0.825,
        width: width * 0.825,
        height: height * 0.725,
        minHeight: height * 0.725,
        maxHeight: height * 0.725
    },
    addressItemStyle: {
        padding: 10,
        marginTop: 2,
        height: 42.5,
        minHeight: 42.5,
        backgroundColor: '#fff',
        borderColor: 'darkgray',
        borderWidth: 1,
        borderRadius: 5,
        zIndex: 99999999999999999999,
        flex: 1
    },
    customizedBadge: {
        margin: 2.75, 
        minHeight: 40, 
        padding: 5, 
        borderWidth: 2.25, 
        borderColor: "darkgrey",
        marginBottom: 17.5
    },
    tagBadge: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 13
    },
    addressGeneralQuarterInputSelectWrapper: {
        backgroundColor: Colors.whiteColor,
        left: -4.25,
        minWidth: "35%",
        ...Fonts.black16Medium,
        borderRadius: 8.5,
        maxWidth: "35%",
        width: "35%",
        paddingLeft: 4.5,
        maxHeight: 51.75,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 8.5
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
    alternativeText: {
        color: "#000",
        backgroundColor: "#fff",
        borderRadius: 12.5,
        fontWeight: "bold",
        padding: 8.25,
        borderColor: Colors.secondaryColor,
        borderWidth: 2,
        fontSize: 16.25,
        marginBottom: 14.25
    }, 
    alternativeTextRed: {
        color: "#000",
        backgroundColor: "#fff",
        borderRadius: 12.5,
        fontWeight: "bold",
        padding: 8.25,
        borderColor: Colors.primaryColor,
        borderWidth: 2,
        fontSize: 16.25,
        marginBottom: 14.25
    },  
    formSpacer: {
        width: "100%",
        marginTop: 12.75,
        marginBottom: 12.75,
        borderBottomWidth: 2,
        borderBottomColor: "grey"
    },
    addressGeneralHalfInput: {
        backgroundColor: "#fff",
        right: -4.25,
        ...Fonts.black16Medium,
        borderWidth: 1.5,
        borderColor: Colors.secondaryColor,
        borderRadius: 8.5,
        maxWidth: "49.375%",
        width: "49.375%",
        paddingLeft: 12.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 8.5
    },
    addressGeneralInput: {
        backgroundColor: "#fff",
        ...Fonts.black16Medium,
        borderWidth: 1.5,
        borderColor: Colors.secondaryColor,
        borderRadius: 8.5,
        paddingLeft: 12.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 8.5
    },
    addressGeneralThirdLengthStyles: {
        backgroundColor: "#fff",
        right: 0,
        ...Fonts.black16Medium,
        borderWidth: 1.5,
        borderColor: Colors.secondaryColor,
        borderRadius: 8.5,
        maxWidth: "65%",
        width: "65%",
        paddingLeft: 12.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 8.5
    },
    addressGeneralHalfInputSelectWrapper: {
        backgroundColor: Colors.whiteColor,
        left: 0,
        minWidth: "49.375%",
        backgroundColor: "#fff",
        ...Fonts.black16Medium,
        borderWidth: 1.5,
        borderColor: Colors.secondaryColor,
        borderRadius: 8.5,
        maxWidth: "49.375%",
        width: "49.375%",
        paddingLeft: 4.5,
        maxHeight: 51.75,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 8.5
    },
    enterManualText: {
        fontSize: 20,
        margin: 12.5,
        color: Colors.secondaryColor,
        textDecorationLine: "underline"
    }, 
})
export default styles;