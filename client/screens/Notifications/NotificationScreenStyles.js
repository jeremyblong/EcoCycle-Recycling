import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes, Fonts } from "../../constants/styles.js";


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    myImage: {
        maxWidth: width,
        maxHeight: 350
    },
    background: {
        backgroundColor: "#fff"
    },
    touchableText: {
        textAlign: "center"
    },
    notificationContainerWrapper: {
        justifyContent: 'center', 
        marginTop: 15.0,
        backgroundColor: "#fff",
        margin: 5,
        paddingTop: 12.5,
        paddingBottom: 12.5,
        borderWidth: 1.75,
        borderColor: Colors.primaryColor
    },
    headText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 19.5,
        marginBottom: 6.25
    },
    marginLarge: {
        margin: 17.5
    },
    previousReturnButton: {
        shadowColor: "black",
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10
    },
    columnized: {
        maxWidth: "38.25%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        width: "38.25%"
    },  
    doctorImageContainerStyle: {
        height: 110.0,
        width: 110.0,
        borderRadius: 75.0,
        backgroundColor: 'white',
        borderColor: '#B3BCFC',
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 3.0,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: Sizes.fixPadding,
        elevation: 20.0,
        overflow: 'hidden',
    },
    bookContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: 15
    },
    bookVideoConsultButtonStyle: {
        width: width / 2 - 30,
        borderColor: Colors.primary,
        borderWidth: 1.0,
        backgroundColor: '#D81159',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
    },
    bookAppointmentButtonStyle: {
        width: width / 2 - 30,
        borderColor: Colors.primary,
        borderWidth: 1.0,
        backgroundColor: '#E3E6FE',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
    },
    dividerStyle: {
        backgroundColor: Colors.lightGray,
        height: 0.80,
        marginTop: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    }
})
export default styles;