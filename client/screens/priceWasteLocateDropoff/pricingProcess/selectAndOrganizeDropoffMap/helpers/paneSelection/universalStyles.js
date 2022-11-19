import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes } from "../../../../../../constants/styles.js";


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    redBackButton: {
        backgroundColor: Colors.primaryColor
    },
    thinDividerHR: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1.5,
        width: "100%",
        marginTop: 5,
        marginBottom: 5
    },
    thinDividerHRwhite: {
        borderBottomColor: "#fff",
        borderBottomWidth: 1.5,
        width: "82.5%",
        marginTop: 5,
        marginBottom: 17.5
    },
    topContainerViewPortion: {
        height: height * 0.5,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    bottomContainerViewPortion: {},
    qrHeaderText: {
        color: Colors.secondaryColor,
        fontSize: 16,
        marginTop: 17.5,
        textAlign: 'center',
        marginBottom: 17.5
    },  
    qrSubHeaderText: {
        color: "#fff",
        fontSize: 13.5,
        textAlign: 'center',
        marginBottom: 32.5
    },
    textFieldContainerStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        elevation: 1.0,
        marginTop: Sizes.fixPadding * 2.0
    },
    topContain: {
        margin: 12.5
    },
    listTitle: {
        fontSize: 15,
        marginBottom: 12.5,
        fontWeight: "bold",
        textDecorationLine: "underline",
        color: Colors.primaryColor
    },
    phoneNumberContainerStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        elevation: 1.0,
        height: 55.0,
    }
})
export default styles;