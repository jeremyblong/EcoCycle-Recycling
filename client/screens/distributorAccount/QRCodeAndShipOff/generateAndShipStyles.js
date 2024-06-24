import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes, Fonts } from "../../../constants/styles";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    topRightCover: {
        position: "absolute",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        left: 17.25,
        top: 17.25,
        minWidth: 82.5,
        width: 82.5
    }, 
    centeredTop: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    centeredOnly: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    centeredAdjusted: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    textFieldContainerStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: "#DDD",
        paddingVertical: Sizes.fixPadding + 3.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        marginTop: 40,
        width: "100%",
        marginBottom: 40,
        borderRadius: Sizes.fixPadding,
        elevation: 1.0,
        marginTop: Sizes.fixPadding * 2.0
    },
    labelCustom: {
        flexShrink: 1, 
        color: "darkblue", 
        fontSize: 18, 
        textDecorationLine: "underline", 
        marginBottom: 5
    },
    subbedText: {
        color: "#fff",
        textAlign: "left",
        backgroundColor: "#000",
        marginTop: 5.75,
        fontSize: 14.25
    },
    centered: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 12.25,
        marginBottom: 7.25,
        width: "100%"
    },
    lineChartParaContainer:  {
        backgroundColor: "#000",
        top: -32.5,
        borderTopColor: Colors.primaryColor,
        borderBottomWidth: 3.5,
        borderBottomColor: Colors.primaryColor,
        borderTopWidth: 3.5,
        paddingTop: 27.25,
        paddingBottom: 5.25,
        width: "100%",
        minHeight: height * 0.515
    }, 
    lineChartText: {
        fontWeight: "bold",
        color: "#fff",
        textDecorationLine: "underline",
        fontSize: 17.25,
        marginBottom: 7.25
    },
    rightIconOnly: {
        maxWidth: 50,
        maxHeight: 42.5,
        height: 42.5,
        width: 50,
        tintColor: "#fff"
    },
    profileInfoContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 1.75
    },
    arrowWrapper: {
        borderBottomWidth: 1.25,
        borderBottomColor: "#000", 
        borderRadius: 9.25,
        borderColor: "#000",
        maxHeight: 32.5,
        minHeight: 32.5,
        width: 42.5,
        height: 32.5,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    centeredAdjustedPara: {
        justifyContent: "center",
        alignContent: "center",
        margin: 5.75,
        alignItems: "center",
        position: "absolute",
        top: -50
    }, 
    topDescText: {
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: 24.25,
        top: 67.25,
        color: "#fff",
        fontSize: 23.25,
        backgroundColor: "#000",
        padding: 8.25,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#fff"
    },
    shortDivider: {
        width: "92.75%",
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryColor,
        marginTop: 6.25,
        marginBottom: 15
    },
    centerText: {
        marginBottom: 50,
        color: "#000"
    },  
    textBold: {
        fontWeight: "bold",
        textDecorationLine: "underline"
    },  
    iconCustom: {
        maxWidth: 42.5,
        maxHeight: 42.5,
        borderRadius: 17.5,
        tintColor: "#fff",
        minHeight: 42.5,
        minWidth: 42.5
    },  
    infoContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding + 3.0
    },
    infoContainerCircleStyle: {
        height: 52.0, width: 52.0, borderRadius: 26.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.0
    },
    video: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#fff"
    },
    thumbnail: {
        width: '35%',
        aspectRatio: 16 / 9,
        borderRadius: 5,
    },
    details: {
        padding: 10,
        width: '65%',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#fff"
    },
    channel: {
        color: '#999',
        fontSize: 14,
        marginTop: 5,
    },
    viewCount: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    
    views: {
        color: '#999',
        fontSize: 14,
    },
    duration: {
        color: '#999',
        fontSize: 14,
        marginLeft: 10,
    },
    videoTwo: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    thumbnailTwo: {
        width: '35%',
        aspectRatio: 16 / 9,
        borderRadius: 5,
    },
    subbexTextcustom: {
        fontWeight: "bold",
        fontSize: 15.25,
        marginTop: 10,
        marginBottom: 10
    },  
    detailsTwo: {
        padding: 10,
        width: '65%',
    },
    titleTwo: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    channelTwo: {
        color: '#999',
        fontSize: 14,
        marginTop: 5,
    },
    viewCountTwo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    
    viewsTwo: {
        color: '#999',
        fontSize: 14,
    },
    durationTwo: {
        color: '#999',
        fontSize: 14,
        marginLeft: 10,
    }
})
export default styles;