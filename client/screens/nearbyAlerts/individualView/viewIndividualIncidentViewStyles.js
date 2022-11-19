import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../constants/styles.js";


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    map: {
        height: 275,
        minHeight: 275,
        width,
        maxHeight: 275
    },
    commentHeader: {
        fontSize: 24, 
        color: "#fff", 
        textDecorationLine: "underline"
    },
    commentInitial: {
        backgroundColor: "black", 
        borderRadius: 17.5, 
        borderColor: Colors.primaryColor, 
        borderWidth: 1.75, 
        margin: 0,
        marginTop: 12.5
    },
    commentReply: {
        backgroundColor: "black",
        borderRadius: 17.5,
        borderColor: Colors.primaryColor,
        borderWidth: 1.75,
        marginLeft: 67.5,
        margin: 0,
        marginTop: 12.5
    },
    replyDirector: {
        resizeMode: "cover",
        maxWidth: 32.5,
        maxHeight: 175,
        tintColor: "#fff",
        position: "absolute",
        left: -70,
        top: -50
    },  
    avatarComment: {
        minHeight: 50,
        top: -12.5,
        minWidth: 50
    },
    replyText: {
        color: "#fff",
        textAlign: "left",
        marginLeft: 15
    },
    likeHandIcon: {
        maxHeight: 27.5,
        maxWidth: 27.5
    },
    positionRightBottom: {
        position: "absolute",
        flexDirection: "row",
        right: 7.5,
        bottom: -2.5
    },
    commentTitle: {
        color: "#fff"
    },
    dividerList: {
        borderTopColor: Colors.primaryColor,
        borderTopWidth: 2.25
    },
    commentText: {
        color: "#fff"
    },
    commentSubtitle: {
        color: "#fff"
    },
    headerText: {
        color: "#fff"
    },
    timelineIcon: {
        maxWidth: 40,
        maxHeight: 40,
        minWidth: 40,
        minHeight: 40,
        backgroundColor: "black"
    },
    addressWrapper: {
        position: "absolute",
        top: 12.5,
        right: 15
    },
    addressText: {
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: "black",
        borderRadius: 7.5,
        borderColor: Colors.primaryColorBright,
        borderWidth: 2,
        padding: 4.25
    },
    label: {
        color: Colors.primaryColorBright,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8.25,
        textDecorationLine: "underline",
        marginTop: 8.25
    },
    mainContainer: {
        borderBottomColor: Colors.greenColor,
        borderBottomWidth: 5,
        borderTopColor: Colors.greenColor,
        borderTopWidth: 5,
        flex: 1,
        height
    },
    thumbIcon: {
        maxWidth: 50,
        maxHeight: 50
    }
})

export default styles;