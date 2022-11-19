import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes, Fonts } from "../../../../constants/styles.js";


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    learnFromImageBlurContainerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.30)',
        height: 190.0, width: 190.0,
        borderRadius: Sizes.fixPadding * 2.0,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding
    },
    labelStars: {
        textAlign: "center",
        fontWeight: "bold", 
        marginTop: 22.5,
        fontSize: 17.5,
        marginBottom: 15,
        textDecorationLine: "underline"
    },
    estimatedTradeText: {
        ...Fonts.white20Bold, 
        position: "absolute", 
        textAlign: "center",
        fontWeight: "bold",
        bottom: 25, 
        color: Colors.whiteColor, 
        fontSize: 18
    },
    columnHeader: {
        fontSize: 17.5,
        textAlign: 'center',
        fontWeight: 'bold',
        textDecorationLine: "underline",
        marginTop: 12.5
    },
    centeredCompletely: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    commonRow: {
        display: "flex",
        flexDirection: "row"
    },
    commonColumn: {
        display: "flex",
        flexDirection: "column",
        width: width * 0.50
    },
    labeled: {
        fontSize: 17.5,
        fontWeight: "bold",
        textDecorationLine: "underline",
        color: Colors.primaryColor,
        marginBottom: 0,
        marginTop: 12.5
    },
    innerTintedContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.30)',
        minHeight: 425,
        height: 425,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 18.25,
        borderBottomRightRadius: 18.25
    },
    getFromCourseInfoContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding + 5.0
    },
    imageBackImageStyle: {
        borderBottomLeftRadius: 42.5,
        borderBottomRightRadius: 42.5,
        resizeMode: "contain"
    },
    imagebacked: {
        minHeight: 425,
        height: 425,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    customIconed: {
        width: 32.5,
        height: 32.5,
        maxHeight: 32.5,
        maxWidth: 32.5
    },
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },
    innerCustomContainerLoaded: {
        paddingHorizontal: Sizes.fixPadding
    },
    innerCustomContainer: {
        marginTop: -30
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    takeTheCourseContainerStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 2.0,
        alignItems: 'center', justifyContent: 'center', 
        width: width - 40,
        borderRadius: Sizes.fixPadding - 5.0,
        marginLeft: 12.5,
        marginRight: 12.5,
        marginTop: Sizes.fixPadding + 3.0,
        marginBottom: Sizes.fixPadding
    },
    cancelButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    confirmationButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.secondaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    watchTrailerContainerStyle: {
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12.5,
        marginRight: 12.5,
        width: width - 40,
        borderRadius: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding - 5.0,
    }
})
export default styles;