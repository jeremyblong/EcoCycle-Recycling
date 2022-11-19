import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes, Fonts } from "../constants/styles";


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    centered: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        minWidth: "20%",
        maxWidth: "20%"
    },
    centeredMultiline: {
        minWidth: "20%",
        maxWidth: "20%"
    },
    textFieldContainerStyleTags: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        elevation: 1.0,
        marginTop: Sizes.fixPadding * 2.0
    },
    addressItemStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#fff',
        borderColor: 'darkgray',
        borderWidth: 1,
        borderRadius: 5,
        zIndex: 99999999999999999999,
        flex: 1
    },
    listAddressProps: {
        nestedScrollEnabled: true,
        flex: 1
    },
    addressInput: {
        ...Fonts.black16Medium,
        borderWidth: 1.5,
        flex: 1,
        borderColor: Colors.secondaryColor,
        borderRadius: 8.5,
        paddingLeft: 12.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        backgroundColor: "#fff",
        shadowRadius: 8.30,
        elevation: 8.5
    },
    thinHrDivider: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1.75,
        marginTop: 6.75,
        marginBottom: 6.75,
        width: "100%"  
    },
    checkboxMainWrapper: {
        padding: 3.25
    },
    rightTextCheckbox: {
        fontWeight: "bold",
        color: '#006BA6',
        fontSize: 16
    },
    textBackgroundOutter: {
        marginLeft: 7.25,
        alignSelf: "flex-start"
    },
    labelCheckbox: {
        fontSize: 18.5,
        fontWeight: "bold",
        textDecorationLine: "underline",
        marginBottom: 7.25,
        backgroundColor: "#fff",
        textAlign: "left",
        paddingTop: 4.25,
        paddingBottom: 4.25,
        paddingRight: 10.75,
        paddingLeft: 10.75,
        borderRadius: 8.25,
        borderWidth: 2,
        borderColor: Colors.primaryColor,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.59,
        shadowRadius: 4.65,
        elevation: 8.25
    },
    checkboxIcon: {
        maxWidth: 37.5,
        maxHeight: 37.5,
        height: 37.5,
        width: 37.5
    },
    headerTitleMain: {
        color: "#fff",
        textDecorationLine: "underline",
        fontSize: 18.75
    },
    calloutInnerWrapperCardContainer: {
        backgroundColor: "black", 
        borderRadius: 11.5,
        borderWidth: 2.25,
        borderColor: Colors.primaryColor,
        width: width * 0.975, 
        maxWidth: width * 0.975,
        left: -15,
        marginBottom: 22.5
    },
    hrPrimaryThick: {
        borderBottomColor: Colors.primaryColor,
        borderBottomWidth: 1.75,
        marginTop: 9.75,
        marginBottom: 9.75,
        width: "100%"
    },
    columnTwoThirds: {
        maxWidth: "60%",
        width: "60%",
        display: "flex",
        flexDirection: "column",
        paddingRight: 17.5
    },
    columnOneThird: {
        maxWidth: "40%",
        width: "40%",
        display: "flex",
        flexDirection: "column",
        paddingLeft: 0
    },
    column: {
        maxWidth: "48.75%",
        width: "48.75%",
        display: "flex",
        flexDirection: "column"
    },
    likesDislikesLabel: {
        textAlign: "left",
        fontWeight: "bold",
        display: "flex",
        flexWrap: "wrap",
        fontSize: 15,
        color: Colors.secondaryColor
    },
    baselineSubText: {
        textAlign: "left",
        marginTop: 12.5,
        fontSize: 15,
        color: "#fff"
    },
    likesDislikesText: {
        textAlign: "left",
        marginTop: 12.5,
        fontSize: 15,
        color: "#fff"
    },
    calloutInnerStyle: {},
    nativeTextInner: {
        color: "#fff", 
        textDecorationLine: "underline", 
        fontWeight: "bold", 
        textAlign: "center"
    },
    hrThick: {
        borderBottomColor: Colors.blackColor,
        borderBottomWidth: 1.5,
        marginTop: 15.25,
        marginBottom: 15.25,
        width: "100%"
    },
    searchableContainerStyle: {
        maxHeight: 250, 
        flex: 1, 
        zIndex: 99999999999999999999
    },
    tagContainerStyleCustom: {
        backgroundColor: Colors.primaryColor,
        borderRadius: 4.25,
        margin: 5
    },
    tagTextCustomStyle: {
        padding: 4.25,
        fontWeight: "bold",
        padding: 2.75,
        color: "#fff"
    },
    addressSelection: {
        fontWeight: "bold",
        fontSize: 16,
        color: "blue",
        textAlign: "left",
        marginLeft: 20,
        marginBottom: 20
    },
    label: {
        marginLeft: 20,
        fontWeight: "bold",
        color: "black",
        marginTop: 12.5
    },
    pasetCircleStyle: {
        height: 90.0,
        width: 90.0,
        borderRadius: 45.0,
        backgroundColor: '#E9EBFE',
        borderColor: Colors.primary,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10.0,
    },
    activeCircleStyle: {
        height: 90.0,
        width: 90.0,
        borderRadius: 45.0,
        backgroundColor: '#E8F5E9',
        borderColor: '#8ECC90',
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10.0,
    },
    cancellCircleStyle: {
        height: 90.0,
        width: 90.0,
        borderRadius: 45.0,
        backgroundColor: '#FFEBEE',
        borderColor: '#F88C85',
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10.0,
    },
    noActiveDataContainerStyle: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dialogStyle: {
        height: 110.0,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogNoButtonStyle: {
        flex: 0.50,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50.0,
        borderRadius: 8.0,
        marginRight: 15.0,
    },
    dialogYesButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50.0,
        borderRadius: 8.0,
        marginLeft: 15.0,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    }
})
export default styles;