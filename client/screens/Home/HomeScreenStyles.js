import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes } from "../../constants/styles";


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    column: {
        flexDirection: "column",
        display: "flex"
    },
    centeredBothWaysButton: {
        zIndex: 9999999,
        width: width * 0.875,
        borderWidth: 1.25,
        borderColor: "white",
        marginTop: 4.25
    },
    innerBtnText: {
        fontWeight: "bold",
        color: "#000",
        fontSize: 16.75
    },
    innerBtnTextWhite: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 16.75
    },
    profileCardTouchable: {
        maxWidth: 182.5,
        height: 237.25,
        width: 182.5,
        backgroundColor: "black",
        borderRadius: 11.25,
        borderRadius: 32.5,
        borderColor: Colors.greenColor,
        borderWidth: 1.85,
        borderBottomColor: Colors.secondaryColor,
        borderBottomWidth: 3,
        borderTopColor: Colors.secondaryColor,
        borderTopWidth: 3
    },
    nameTitleStyle: {
        color: "#fff",
        textAlign: "center"
    },
    thickerHR: {
        borderBottomColor: "#fff",
        width: "70%",
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 2
    },
    columnFullWidth: {
        display: "flex", 
        flexDirection: "column",
        width: width * 0.9575
    },
    imageIconWrapper: {
        maxWidth: 100,
        maxHeight: 100,
        height: 100,
        width: 100,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        borderRadius: 10.25,
        borderColor: Colors.greenColor,
        borderWidth: 3,
        borderBottomColor: Colors.greenColor,
        borderBottomWidth: 3,
        borderTopColor: Colors.greenColor,
        borderTopWidth: 3
    },
    innerImageIcon: {
        maxWidth: 80,
        maxHeight: 80,
        height: 80,
        width: 80,
        paddingBottom: 12.25
    },
    backgroundVideoWrapper: {},
    backgroundVideo: {
        minHeight: 200,
        height: 200,
        minWidth: "100%",
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        borderWidth: 1.325,
        borderColor: Colors.greenColor,
        zIndex: 1
    },
    centralBtnContainer: {
        flexDirection: "row",
        flex: 1,
        margin: 15,
        marginTop: 90,
        zIndex: 9999999,
        justifyContent: 'center',
        alignContent: "center",
        alignItems: "center"
    },
    buttonCircledActive: {
        minWidth: "30%",
        maxWidth: "30%",
        margin: 5,
        justifyContent: 'center',
        alignContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 225,
        shadowColor: "#fff",
        backgroundColor: Colors.primaryColor,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 25,
        elevation: 17.5
    },
    buttonCircled: {
        minWidth: "30%",
        maxWidth: "30%",
        margin: 5,
        justifyContent: 'center',
        alignContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 225,
        shadowColor: "#fff",
        backgroundColor: "black",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 25,
        elevation: 17.5
    },
    buttonCircledText: {
        color: "#fff",
        padding: 42.5,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        width: 175
    },
    subHeaderText: {
        color: Colors.whiteColor
    },
    flatlistContainer: {
        paddingBottom: 37.5,
        backgroundColor: "black"
    },
    spacer: {
        padding: 20,
        backgroundColor: "black"
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 18.5,
        textDecorationLine: "underline",
        color: Colors.whiteColor
    },
    profileCard: {
        marginTop: 15,
        maxHeight: 225,
        height: 225,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderColor: Colors.secondaryColor,
        borderWidth: 1
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -37.5,
        marginHorizontal: 20.0
    },
    row: {
        flexDirection: "row"
    },
    rowCustom: {
        flexDirection: "row",
        height: "50%",
        maxWidth: width * 0.475,
        padding: 2.5,
        maxHeight: "50%"
    },
    horizontalUsers: {
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "black",
        minWidth: width,
        height: 250
    },
    centeredListTwo: {
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "black",
        paddingBottom: 125
    },
    centeredList: {
        justifyContent: "center",
        alignContent: "center",
        paddingBottom: 12.5,
        backgroundColor: "black"
    },
    searchStyle: {
        height: 60.0,
        backgroundColor: 'white',
        borderWidth: 1.0,
        borderColor: Colors.lightGray,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 3.0,
        flexDirection: 'row',
        paddingLeft: Sizes.fixPadding + 10.0,
        marginTop: 20.0,
        marginHorizontal: 20.0
    },
    bottomLineText: {
        color: "grey",
    },
    topLineText: {
        color: "#000",
        fontWeight: "bold"
    },
    starTextNum: {
        color: "#DA9100",
        fontWeight: "bold",
        marginTop: 18.75,
        textDecorationLine: "underline"
    },
    placeholderMediaSmaller: {
        backgroundColor: Colors.secondaryColor, width: 52.5, height: 52.5
    },
    placeholderMedia: {
        backgroundColor: Colors.secondaryColor, width: 82.5, height: 82.5
    },
    halfColumn: {
        flexDirection: "column",
        maxWidth: "48.5%",
        width: "48.5%",
        display: "flex"
    },
    columnOnly: {
        flexDirection: "column",
        paddingRight: 13.25,
        display: "flex"
    },
    rowOnly: {
        flexDirection: "row",
        display: "flex",
        margin: 7.25
    },
    iconRightSmallish: {
        maxWidth: 32.5,
        maxHeight: 32.5,
        height: 32.5,
        width: 32.5,
        marginTop: 11.75
    },
    imageRedoneOutter: {
        backgroundColor: Colors.backColor,
        padding: 14.25,
        borderRadius: 32.5,
        borderColor: Colors.greenColor,
        borderWidth: 1.85,
        borderBottomColor: Colors.secondaryColor,
        borderBottomWidth: 3,
        borderTopColor: Colors.secondaryColor,
        borderTopWidth: 3
    },
    imageRedone: {
        height: 60,
        width: 60
    },
    imageStyleCustom: {
        resizeMode: 'stretch',
        position: "absolute",
        borderWidth: 4.25,
        borderColor: "black",
        top: 110,
        backgroundColor: "white",
        opacity: 0.175
    },
    viewAllStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
    },
    absolutePosition: {
        position: "absolute",
        maxWidth: width * 0.825,
        maxHeight: 400,
        right: -22.5,
        zIndex: -1,
        top: 115,
        borderRadius: 0
    },
    callNowButtonStyle: {
        width: 80.0,
        height: 40.0,
        borderColor: Colors.primary,
        borderRadius: Sizes.fixPadding,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 10.0,
    },
    centerOnly: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    labAndCheckUpContainer: {
        flexDirection: 'row',
        height: 300,
        width: width * 0.475,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding + 5.0,
        backgroundColor: 'white',
        borderColor: Colors.lightGray,
        borderWidth: 1.0,
        margin: 4.5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 4.0,
        marginBottom: 20.0,
        overflow: 'hidden',
    },
    labInformationContainer: {
        width: "100%",
        height: "100%",
        padding: 5
    },
    specialistInfoContainer: {
        height: 212.5,
        width: 200.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        padding: 14.25,
        borderColor: Colors.secondaryColor,
        borderWidth: 1.85,
        borderBottomColor: Colors.greenColor,
        borderBottomWidth: 3,
        borderTopColor: Colors.greenColor,
        borderTopWidth: 3,
        marginHorizontal: 10.0,
        marginVertical: 10.0,
        borderRadius: 15,
        shadowColor: "#fff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5.0,
    },
    iconed: {
        maxWidth: 37.5,
        maxHeight: 37.5
    },
    centered: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }
})
export default styles;