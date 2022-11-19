import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes } from "../../../constants/styles.js";


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    topBanner: {
        height,
        flex: 1
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        textDecorationLine: "underline"
    },
    textFieldContainerStyle: {
        marginHorizontal: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        elevation: 1.0,
        marginTop: Sizes.fixPadding * 2.0
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    slider: {
        width: width * 0.7
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
    label: {
        marginLeft: 12.5,
        fontWeight: "bold",
        marginBottom: -7.5,
        marginTop: 12.5
    },
    margin15: {
        margin: 15,
        flex: 1
    },
    thinHR: {
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
        marginTop: 15,
        marginBottom: 17.5
    },
    mainContainerUnscroll: {
        backgroundColor: Colors.backColor,
        minHeight: 450,
        maxHeight: 450,
        borderTopRightRadius: 17.5,
        borderTopLeftRadius: 17.5,
        position: "absolute",
        bottom: 0,
        flex: 1,
        left: 12.5,
        right: 12.5
    },
    innerScrollview: {
        flexGrow: 1,
        flex: 1
    }
})
export default styles;