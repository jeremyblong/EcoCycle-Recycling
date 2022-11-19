import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes } from "../../../../../constants/styles";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    centered: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    flexBottomContainer: {
        flex: 1
    }, 
    flexedTopContainer: {
        flex: 1
    },
    mainWrapper: {
        flex: 1
    },
    innerIconInput: {
        width: 25.5,
        height: 25.5,
        maxHeight: 25.5,
        maxWidth: 25.5
    },
    showCountdownStylesCustom: {
        color: "red",
        fontWeight: "bold",
        textDecorationLine: "underline",
        fontSize: 12.25,
        paddingBottom: 4.75
    },
    time: {
        fontSize: 11,
        color: "#808080",
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    modalHrLine: {
        borderBottomColor: Colors.blackColor,
        borderBottomWidth: 2.25,
        marginTop: 7.75,
        marginBottom: 7.75,
        width: "100%"
    },
    cancelButtonStyle: {
        flex: 0.425,
        backgroundColor: "#D2042D",
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    logOutButtonStyle: {
        flex: 0.575,
        backgroundColor: Colors.secondaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    activityPostingToDB: {
        position: 'absolute',
        left: -23.5,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.535)",
        height: "100%",
        minWidth: width + 25,
        width: width + 25,
        minHeight: "100%",
        zIndex: 9999999999999999
    },
    name: {
        fontSize: 16,
        fontWeight: "bold"
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    labelTextInput: {
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 20,
        marginTop: 17.5
    },
    hrLine: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2.75,
        marginTop: 22.25,
        marginBottom: 22.25,
        width: "100%"
    },
    hrLineTopPortion: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2.75,
        marginTop: 27.25,
        marginBottom: 3.25,
        width: "100%"
    },
    charLengthCheckText: {
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 20,
        marginTop: 17.5
    },
    labelMainChunkMessage: {},
    textFieldContainerStyle: {
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        paddingHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        elevation: 13.5,
        marginTop: Sizes.fixPadding * 2.0,
        borderWidth: 0.75,
        borderColor: Colors.secondaryColor
    },
    outterMostWrapperComment: {
        borderWidth: 1.5, 
        borderColor: Colors.secondaryColor,
        marginTop: 32.5
    },
    containerFlatList: {
        paddingRight: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
        height: 165
    },
    contentFlatList: {
        marginLeft: 16,
        flex: 1,
    }
});

export default styles;