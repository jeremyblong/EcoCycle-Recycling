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
        marginTop: Sizes.fixPadding * 2.0 + StatusBar.currentHeight,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    profileInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: -Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    followButtonStyle: {
        backgroundColor: Colors.secondaryColor,
        position: 'absolute',
        right: 7.5,
        top: 17.5,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding - 5.0,
    },
    imageBacked: {
        width: '100%', 
        height: 200.0 + StatusBar.currentHeight,
        backgroundColor: "#000"
    },
    profileImage: {
        width: 80.0, 
        height: 80.0, 
        minWidth: 80.0, 
        resizeMode: "cover",
        minHeight: 80.0, 
        borderRadius: 40.0, 
        top: -32.5
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
        borderColor: Colors.secondaryColor,
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
        borderColor: Colors.secondaryColor,
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
        backgroundColor: Colors.secondaryColor,
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
        backgroundColor: Colors.secondaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding,
    },
});

export default styles;