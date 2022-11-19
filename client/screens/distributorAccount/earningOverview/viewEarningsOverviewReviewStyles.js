import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { Colors, Sizes, Fonts } from "../../../constants/styles";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    backArrowWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        backgroundColor: 'rgba(255,255,255,0.08)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 2.0 + StatusBar.currentHeight,
        marginHorizontal: Sizes.fixPadding * 2.0,
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
    noContractAvailable: {
        maxWidth: width * 0.825,
        width: width * 0.825,
        height: 150,
        maxHeight: 150
    },  
    rowOnly: {
        flexDirection: "row",
        display: "flex",
        margin: 12.25,
        marginTop: 17.25
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
    centeredOnly: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },  
    profileInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: -Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    indicatorText: {
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 17.5,
        color: "#000",
        marginLeft: 10
    },
    columnOnly: {
        display: "flex",
        flexDirection: "column"
    }, 
    rowOnly: {
        display: "flex",
        flexDirection: "row"
    }, 
    redContainerHighestTier: {
        backgroundColor: "#330000",
        borderWidth: 1.5,
        borderColor: "#000",
        width: 72.25,
        maxWidth: 72.25,
        maxHeight: 30,
        height: 30
    },
    chartIcon: {
        maxWidth: 27.25,
        width: 27.25,
        height: 27.25,
        maxHeight: 27.25
    },
    hrthin: {
        width: "100%",
        borderBottomWidth: 1.5,
        borderBottomColor: Colors.primaryColor,
        marginTop: 7.25,
        marginBottom: 7.25
    },
    minSized: {
        minHeight: 55,
        maxWidth: 55,
        maxHeight: 55,
        borderWidth: 3,
        borderColor: Colors.primaryColor,
        borderRadius: 45,
        height: 55,
        width: 55,
        minWidth: 55
    },  
    darkerBlueContainer: {
        backgroundColor: "#cc0000",
        borderWidth: 1.5,
        borderColor: "#000",
        width: 72.25,
        maxWidth: 72.25,
        maxHeight: 30,
        height: 30
    },
    darkerGreenContainer: {
        backgroundColor: "#4d0000",
        borderWidth: 1.5,
        borderColor: "#000",
        width: 72.25,
        maxWidth: 72.25,
        maxHeight: 30,
        height: 30
    },
    blueContainer: {
        backgroundColor: "#e60000",
        borderWidth: 1.5,
        borderColor: "#000",
        width: 72.25,
        maxWidth: 72.25,
        maxHeight: 30,
        height: 30
    },
    greenContainer: {
        backgroundColor: "#990000",
        borderWidth: 1.5,
        borderColor: "#000",
        width: 72.25,
        maxWidth: 72.25,
        maxHeight: 30,
        height: 30
    },
    colorCordinationWrapper: {
        display: "flex",
        flexDirection: "row"
    },
    listitemContainer: {
        borderWidth: 1.5, 
        borderColor: "#000", 
        marginBottom: 3.75, 
        marginTop: 3.75
    },
    rightIconed: {
        maxWidth: 22.25,
        width: 22.25,
        height: 22.25,
        maxHeight: 22.25
    },  
    followButtonStyle: {
        backgroundColor: Colors.primaryColor,
        position: "absolute",
        right: 12.75,
        top: 12.75,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding - 2,
        borderWidth: 1.25,
        borderColor: "#fff"
    },
    linkWrapStyle: {
        flexDirection: 'row', alignItems: 'center',
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding * 3.0,
        paddingHorizontal: Sizes.fixPadding + 7.25,
        paddingVertical: Sizes.fixPadding - 2.0,
        maxWidth: width / 1.5,
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
});

export default styles;