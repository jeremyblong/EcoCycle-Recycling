import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { Colors, Sizes, Fonts } from "../../../constants/styles.js";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    backArrowWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        backgroundColor: 'rgba(255,255,255,0.08)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        position: "absolute",
        top: 12.25,
        left: 12.25
    },
    profileInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: -Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonHalfed: {
        width: width * 0.45  
    },
    maxedImage: {
        maxWidth: 25,
        maxHeight: 25,
        width: 25,
        tintColor: "#fff",
        marginLeft: 10,
        height: 25
    },
    subLabeled: {
        color: "#000",
        marginBottom: 16.25
    },
    listitem: {
        minHeight: 50, 
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "grey",
        padding: 10
    },
    hr: {
        width: "100%",
        marginTop: 11.25,
        marginBottom: 11.25,
        minWidth: "100%",
        borderBottomWidth: 2,
        borderBottomColor: "grey"
    },
    positionTopRightCorner: {
        position: "absolute",
        right: 11.25,
        top: -5
    },
    iconSmall: {
        maxWidth: 25,
        maxHeight: 25,
        width: 25,
        height: 25
    },  
    iconMedium: {
        maxWidth: 42.5,
        maxHeight: 42.5,
        width: 42.5,
        height: 42.5
    },  
    followButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding - 5.0,
    },
    linkWrapStyle: {
        flexDirection: 'row', alignItems: 'center',
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding * 3.0,
        paddingHorizontal: Sizes.fixPadding + 10.0,
        paddingVertical: Sizes.fixPadding - 2.0,
        maxWidth: width / 1.8,
    },
    otherInfoWrapStyle: {
        marginTop: Sizes.fixPadding * 3.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        paddingHorizontal: Sizes.fixPadding + 8.0,
    },
    linkAndSocialMediaInfoWrapStyle: {
        marginTop: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    favoriteAndShareIconContainStyle: {
        backgroundColor: 'rgba(255,255,255,0.07)',
        width: 30.0,
        height: 30.0,
        borderRadius: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    favoriteAndShareIconWrapStyle: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeLeftAndFavoriteShareIconWrapStyle: {
        marginHorizontal: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    auctionImageStyle: {
        height: 200.0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderTopRightRadius: Sizes.fixPadding - 5.0,
    },
    auctionDetailWrapStyle: {
        marginTop: Sizes.fixPadding - 18.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    timeLeftWrapStyle: {
        alignSelf: 'flex-start',
        marginTop: Sizes.fixPadding,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 7.0,
    },
    bottomSheetWrapStyle: {
        paddingHorizontal: 20.0,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingBottom: Sizes.fixPadding * 2.0,
        borderTopLeftRadius: Sizes.fixPadding * 3.0,
        borderTopRightRadius: Sizes.fixPadding * 3.0,
        backgroundColor: Colors.bodyBackColor
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        width: width - 40,
        padding: 0.0,
    },
    collectionNameFieldStyle: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        ...Fonts.grayColor12Regular,
        marginTop: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding * 3.0,
    },
    createCollectionButtonStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogContentWrapStyle: {
        paddingTop: Sizes.fixPadding + 5.0,
        paddingBottom: Sizes.fixPadding * 3.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.bodyBackColor,
    },
    createNewButtonWrapStyle: {
        backgroundColor: Colors.primaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding,
    },
    innerRowWrapper: {
        backgroundColor: "#fff",
        borderRadius: 75,
        padding: 4.25
    },
    greenTextTwo: {
        color: Colors.greenColor,
        fontWeight: "bold",
        fontSize: 21.25,
        marginBottom: 4.25
    },
    centeredRowWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        paddingTop: 10
    },
    redTextTwo: {
        color: "red",
        fontWeight: "bold",
        fontSize: 21.25,
        marginBottom: 4.25
    },
    greenText: {
        color: Colors.greenColor,
        fontWeight: "bold"
    },
    placeholderMediaSmaller: {
        backgroundColor: Colors.secondaryColor, width: 52.5, height: 52.5
    },
    placeholderMediaRow: {
        backgroundColor: "#000"
    },
    placeholderMedia: {
        backgroundColor: Colors.secondaryColor, width: 82.5, height: 82.5
    },
    rowOnly: {
        flexDirection: "row",
        display: "flex",
        margin: 12.25,
        marginTop: 17.25
    },
    labeled: {
        marginBottom: Sizes.fixPadding + 5.0, 
        ...Fonts.whiteColor20Bold, 
        fontWeight: "bold", 
        fontSize: 17.25, 
        textDecorationLine: "underline" 
    },
    borderedMapWrapper: {
        borderWidth: 1.35,
        borderColor: "grey",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        marginBottom: 100
    },
    thirdContainer: {
        maxWidth: "33%",
        width: "33%"
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
});

export default styles;