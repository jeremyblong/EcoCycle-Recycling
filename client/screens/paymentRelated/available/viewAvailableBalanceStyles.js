import { Fonts, Colors, Sizes } from "../../../constants/styles";
import { StyleSheet, Dimensions } from "react-native";


const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    depositeAndWithdrawnInfoWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: 'white',
        paddingTop: Sizes.fixPadding - 5.0,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
    mainPrice: { 
        ...Fonts.black19Bold, 
        fontWeight: "bold", 
        fontSize: 45, 
        color: Colors.greenColor, 
        textDecorationLine: "underline" 
    },
    maxedIcon: { 
        width: 60, 
        height: 60, 
        maxHeight: 60, 
        maxWidth: 60 
    },
    depositeAndWithdrawnInfoStyle: {
        backgroundColor: '#F3F5FF',
        borderWidth: 1,
        borderColor: "#000",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center'
    },
    depositeAndWithdrawnButtonContainerStyle: {
        backgroundColor: Colors.primaryColor, 
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: 0.0,
        left: 0,
        right: 0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
    },
    transactionIconContainerStyle: {
        height: 45.0,
        width: 45.0,
        borderRadius: 22.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    dialogUniqueIdContainerStyle: {
        backgroundColor: '#EEEEEE',
        paddingVertical: Sizes.fixPadding,
        width: '100%',
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        marginTop: Sizes.fixPadding + 5.0,
    }
})

export default styles;