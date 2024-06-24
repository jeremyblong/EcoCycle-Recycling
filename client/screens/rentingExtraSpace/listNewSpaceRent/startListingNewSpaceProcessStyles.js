import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes, Fonts } from "../../../constants/styles.js";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    centered: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    listedItemWrapper: {
        margin: 5,
        marginBottom: 12.5
    },  
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 12.25,
        marginBottom: 7.25,
        width: "100%"
    },
    enterManualText: {
        fontSize: 20,
        margin: 12.5,
        color: Colors.secondaryColor,
        textDecorationLine: "underline"
    },  
    inputFormRow: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }, 
    formSpacer: {
        minHeight: 12.5,
        height: 12.5
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
    imageBackgroundCustom: {
        minWidth: width,
        height,
        minHeight: height,
        backgroundColor: "black"
    },
    label: {
        // fontWeight: "bold",
        color: "#000",
        fontSize: 18,
        marginBottom: 5,
        marginLeft: 7
    },
    alternativeText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 17.5,
        margin: 12.5
    },  
    titleTopText: {
        fontSize: 25,
        color: "#000",
        marginBottom: 22.5,
        marginTop: 12.5,
        fontWeight: "bold"
    },
    avatarSublist: {
        maxWidth: 22.5,
        maxHeight: 22.5
    },
    listeditemSelected: {
        borderWidth: 1.25,
        borderColor: "#00a6ff",
        borderRadius: 12.5,
        overflow: 'hidden'
    },
    listeditem: {
        borderWidth: 1.25,
        borderColor: "#999999",
        borderRadius: 12.5,
        overflow: 'hidden'
    },
    listFooterPositioningBottom: {
        height: height * 0.825,
        minHeight: height * 0.825
    },
    bottomWrapperPerButton: {
        margin: 6.25,
        // borderTopColor: "#000",
        // borderTopWidth: 3,
        position: "absolute",
        bottom: 7.25, 
        left: 5, 
        right: 5,
        paddingTop: 7.5
    },
    wrapperMain: {
        // backgroundColor: Colors.whiteColor,
        height,
        padding: 7.5,
        paddingBottom: 27.5,
        width
    },
    borderedTopContainer: {
        borderTopColor: Colors.primaryColor,
        borderTopWidth: 1.5,
        marginTop: 3.75,
        paddingTop: 12.5
    },
    listheaderStyles: {
        marginBottom: 20,
        flex: 1
    },
    listedItemWrapperSelected: {
        margin: 5,
        marginBottom: 12.5
    },
    selectedTitle: {
        color: "#004266",
        fontWeight: "bold"
    },
    selectedSubtitle: {
        color: "#0074b3"
    },
    headerText: {
        fontSize: 42,
        fontWeight: "bold",
        textDecorationLine: "underline",
        textAlign: "center"
    },
    listItemSelector: {
        minWidth: "100%"
    },
    unselectedSubtitle: {
        color: "#000"
    }, 
    centerButtonContent: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    buttonedIcon: {
        maxWidth: 37.5,
        maxHeight: 37.5
    },
    unselectedTitle: {
        color: "#000",
        fontWeight: "bold"
    },
    buttonAddy: {
        marginTop: 22.5
    },  
    awesomeButtonText: {
        fontWeight: "bold",
        fontSize: 16.5,
        color: "darkblue",
        marginLeft: 12.5
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
        alignContent: "center",
        height: 62.5,
        borderRadius: 8.0,
        marginRight: 6.25
    },
    modalHrLine: {
        borderBottomColor: Colors.secondaryColor,
        borderBottomWidth: 3,
        marginTop: 8.25,
        marginBottom: 8.25,
        width: "100%"
    },
    modalTitleText: {
        ...Fonts.black18Bold, 
        paddingBottom: Sizes.fixPadding - 5.0,
        textAlign: "left",
        fontWeight: "bold", 
        fontSize: 19.25
    },
    dialogYesButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center",
        height: 62.5,
        borderRadius: 8.0,
        marginLeft: 6.25
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