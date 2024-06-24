import { StyleSheet, Dimensions } from "react-native";
import { Colors, Sizes } from "../../../../constants/styles.js";


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    card: {
        shadowColor: '#B0C4DE',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    cardContent: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
    },
    productImage: {
        width: 100,
        height: 100,
        margin: 10,
    },
    productName: {
        fontSize: 15,
        // fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        color: '#888'
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    button: {
        backgroundColor: '#eee',
        padding: 10,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        width: "48.75%",
        borderRadius: 5,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
    },
    avatarImageTouchable: {},
    largerPriceText: {
        fontSize: 22.5,
        paddingRight: 7.25,
        textAlign: "right",
        fontWeight: "bold",
        color: Colors.greenColor
    },
    threeQuarterCol: {
        flexDirection: "column",
        display: "flex",
        maxWidth: "85%",
        minWidth: "85%", 
        width: "85%"
    },
    hr: {
        marginTop: 12.25,
        marginBottom: 12.25,
        width: "100%",
        minWidth: "100%",
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1.25
    },
    placeholderMediaSmaller: {
        backgroundColor: Colors.secondaryColor, width: 52.5, height: 52.5
    },
    placeholderMedia: {
        backgroundColor: Colors.secondaryColor, width: 82.5, height: 82.5
    },
    centered: {
        justifyContent: 'center',
        alignItems: "center",
        alignContent: "center"
    },
    mainTextPlaceholder: {
        fontWeight: "bold",
        fontSize: 24.25,
        marginBottom: 13.25,
        textAlign: "center"
    },
    maxedDesignedIcon: {
        maxWidth: width,
        maxHeight: 265,
        height: 265,
        width: width
    },
    blackUnderlinedText: {
        fontWeight: "bold",
        color: "#000",
        textDecorationLine: "none"
    },
    secondRowHeaderText: {
        fontSize: 17.25,
        marginTop: 12,
        paddingLeft: 7.25,
        textAlign: "left",
        fontWeight: "bold",
        color: "#000"
    },
    smallerRowContainer: {
        flexDirection: "row",
        display: "flex",
        maxWidth: "100%",
        width: "100%",
        minWidth: "100%",
        textAlign: "left"
    },
    nameText: {
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 14.75,
        color: "grey",
        marginTop: 8.25
    },
    rightTextAlongImage: {
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 16,
        marginTop: 3,
        marginLeft: 5.25
    },
    smallerRowContainerLonger: {
        flexDirection: "row",
        display: "flex",
        maxWidth: "100%",
        textAlign: "left",
        width: "100%",
        minWidth: "100%"
    },
    rowOnlyMaxed: {
        flexDirection: "row",
        marginTop: 14.25,
        display: "flex",
        minWidth: "100%",
        width: "100%"
    },
    rowOnly: {
        flexDirection: "row",
        display: "flex",
    },
    boxedContainer: {
        borderWidth: 1.25,
        marginTop: 15.25,
        borderColor: Colors.secondaryColor,
        backgroundColor: "#fff",
        padding: 12.25,
        borderRadius: 6.25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.66,
        shadowRadius: 6.68,
        elevation: 11
    },
    superSmallIconImage: {
        maxWidth: 26.25,
        maxHeight: 26.25,
        height: 26.25,
        width: 26.25
    },
    avatarListItem: {
        maxWidth: 45,
        maxHeight: 45,
        height: 45,
        width: 45,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: Colors.secondaryColor
    },
    oneQuarterCol: {
        flexDirection: "column",
        display: "flex",
        maxWidth: "15%",
        width: "15%",
        minWidth: "15%"
    },
    oneThirdColumn: {
        flexDirection: "column",
        display: "flex",
        maxWidth: "37.5%",
        width: "37.5%",
        minWidth: "37.5%"
    },
    twoThirdColumn: {
        flexDirection: "column",
        display: "flex",
        maxWidth: "62.5%",
        width: "62.5%",
        minWidth: "62.5%"
    },
    header:{
        backgroundColor:'rgba(0, 0, 0, 0.65)',
        height:250,
        flexDirection:'row',
        alignItems:'center',
        borderRadius: 25,
        paddingTop: 20,
        borderWidth: 2.5,
        borderColor: Colors.primaryColor,
        paddingHorizontal:16,
    },
    avatar:{
        width:150,
        height:150,
        borderRadius:4,
    },
    informationContainer:{
        width:150,
        height:150,
        marginLeft:20,
    },
    name:{
        fontSize:17,
        fontWeight:'bold',
        color:'#ffffff'
    },
    label:{
        fontSize:12,
        color:'#ffffff',
        marginTop:10,
    },
    section:{
        paddingHorizontal:16,
        marginVertical:5,
    },
    sectionHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10,
    },
    sectionTitle:{
        fontSize:18,
    },
    seeAllButton:{
        backgroundColor:'#A9A9A9',
        padding:5,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4,
    },
    seeAllButtonText:{
        color:'#eee'
    },
    sectionBody:{
        marginTop:10,
    },
    sectionScroll:{
        paddingBottom:20,
    },
    sectionCard: {
        width:200,
        minHeight:200,
        backgroundColor:'#fff',
        shadowColor: '#B0C4DE',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 6,
    },
    sectionImage: {
        width: '100%',
        maxWidth: "100%",
        maxHeight: 200,
        height: 200,
        aspectRatio: 1,
    },
    sectionInfo: {
        padding:10,
    },
    sectionLabel: {
        fontSize: 12,
        marginBottom: 2,
    }
})
export default styles;

