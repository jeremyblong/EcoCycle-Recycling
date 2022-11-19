import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes } from "../../../../constants/styles.js";


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    mainScrollviewContainer: {
        backgroundColor: "#fff"
    },
    centeredBothWays: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }, 
    resultsNotFoundImage: {
        maxWidth: width * 0.935,
        maxHeight: height * 0.5
    },
    noResultText: {
        marginTop: 22.5,
        textAlign: "center",
        textDecorationLine: "underline",
        fontWeight: "bold",
        fontSize: 15.5,
        color: "#000"
    },
    toppedContainerTextWrapper: {
        maxHeight: 82.5,
        width: "100%"
    },
    inputWrapper: {
        margin: 15
    },
    container:{
        flex:1,
        marginTop:20,
    },
    list: {
        paddingHorizontal: 10,
    },
    listContainer:{
        alignItems:'center'
    },
    separator: {
        marginTop: 10,
    },
    card:{
        marginVertical: 8,
        backgroundColor:"white",
        flexBasis: '45%',
        marginHorizontal: 10,
        borderWidth: 1.25,
        borderColor: Colors.secondaryColor,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10
    },
    label: {
        marginLeft: 12.5,
        fontWeight: "bold",
        marginBottom: -7.5,
        marginTop: 12.5,
        color: "#000"
    },
    thinerHR: {
        marginTop: 6.5
    },
    innerIconInput: {
        width: 37.5,
        height: 37.5,
        maxHeight: 37.5,
        maxWidth: 37.5
    },
    cardContent: {
        paddingVertical: 17,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    cardImage:{
        height: 175,
        maxHeight: 175,
        resizeMode: 'contain',
        maxWidth: 150,
        width: 150,
        minWidth: 150,
        minHeight: 125
    },
    imageContainer:{
        shadowColor: "#000",
        backgroundColor: "black",
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        maxHeight: 175,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
    
        elevation: 9,
    },
    title:{
        fontSize:18,
        flex:1,
        color:"#778899"
    },
    count:{
        fontSize:18,
        flex:1,
        color:"#B0C4DE"
    }
})
export default styles;