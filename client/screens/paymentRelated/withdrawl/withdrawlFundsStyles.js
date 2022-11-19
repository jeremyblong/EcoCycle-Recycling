import { Fonts, Colors, Sizes } from "../../../constants/styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headerWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.greenColor
    },
    currencySelectionContainerStyle: {
        backgroundColor: "#E5E5E5",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: 12.0,
        paddingVertical: Sizes.fixPadding + 1.0,
    },
    largeText: { 
        ...Fonts.black19Bold,
        fontWeight: "bold",
        color: Colors.greenColor,
        fontSize: 67.25,
        textDecorationLine: "underline"
    },
    withdrawButtonStyle: {
        backgroundColor: Colors.greenColor,
        paddingVertical: Sizes.fixPadding - 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding - 5.0,
    },
    inputContainerWrapper: {
        minHeight: 72.5,
        height: 72.5,
        borderWidth: 1.25,
        borderColor: "lightgrey",
        borderRadius: 12.25
    }, 
    labeledStyle: {
        marginTop: 6.25,
        fontWeight: "bold"
    },
    innerIconInput: {
        maxWidth: 27.25,
        maxHeight: 27.25,
        width: 27.25,
        height: 27.25
    }
})

export default styles;