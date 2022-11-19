import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes } from "../../../../../constants/styles.js";


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#FFFFFF"
    },
    smallCloseIcon: {
        maxWidth: 35,
        maxHeight: 35,
        minWidth: 35,
        minHeight: 35,
        position: "relative",
        top: -7.5,
        left: -7.5,
        zIndex: 999
    },
    topContainerView: {},
    thinnerHR: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1.5,
        marginTop: 3.75,
        marginBottom: 3.75
    },
    noDataHeaderText: {
        fontSize: 23.5,
        fontWeight: "bold",
        marginTop: 32.5,
        textAlign: "center",
        color: Colors.darkerBlue
    },
    hrMid: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1.5,
        width: "100%",
        marginTop: 27.5
    },
    justFlexOnly: {
        flex: 1
    },
    backingContainerView: {
        backgroundColor: "#FFFFFF",
        height: "100%"
    },
    emptyListView: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    }, 
    largeIllustration: {
        width: width + 50,
        height: 325,
        flex: 1,
        marginTop: 50,
        resizeMode: "contain"
    },
    container: {
        padding: 16,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: "#FFFFFF",
        alignItems: 'flex-start'
    },
    avatar: {
        width: 62.5,
        height: 62.5,
        left: -42.5,
        zIndex: 0,
        resizeMode: "contain",
        borderRadius: 12.5
    },
    text: {
        marginBottom: 5,
        flexDirection: 'row',
        flexWrap:'wrap'
    },
    content: {
        flex: 1,
        marginLeft: 0,
        left: -12.5,
        marginRight: 0
    },
    mainContent: {
        marginRight: 2.5
    },
    img: {
        height: 50,
        width: 50,
        margin: 0
    },
    attachment: {
        position: 'absolute',
        right: 0,
        height: 50,
        width: 50
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    timeAgo:{
        fontSize:12,
        color: Colors.primaryColorBright
    },
    name:{
        fontSize:16,
        color:"#1E90FF"
    }
});

export default styles;