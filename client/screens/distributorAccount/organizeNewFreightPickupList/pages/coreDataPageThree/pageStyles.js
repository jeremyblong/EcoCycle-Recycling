import { StyleSheet, Dimensions, Platform } from "react-native";
import { Colors, Sizes, Fonts } from "../../../../../constants/styles.js";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    hr: {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 2,
        marginTop: 12.25,
        marginBottom: 7.25,
        width: "100%"
    },
    hrBlue: {
        borderBottomColor: Colors.secondaryColor,
        borderBottomWidth: 2,
        marginTop: 12.25,
        marginBottom: 7.25,
        width: "100%"
    },
    spacerMain: {
        marginLeft: 12.25,
        marginRight: 12.25,
        backgroundColor: "#fff",
        padding: 7.25,
        borderLeftWidth: 2.5,
        borderLeftColor: "grey",
        borderRightWidth: 2.5,
        borderRightColor: "grey"
    },
    hrBlueThicker: {
        borderBottomColor: Colors.secondaryColor,
        borderBottomWidth: 3.25,
        marginTop: 12.25,
        marginBottom: 7.25,
        width: "100%"
    },
    midSizedHr: {
        borderBottomColor: Colors.primaryColor,
        borderBottomWidth: 2,
        marginTop: 12.25,
        marginBottom: 7.25,
        width: "57.25%"
    },
    centeredOnly: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    hrBlueExtended: {
        borderBottomColor: Colors.secondaryColor,
        borderBottomWidth: 2,
        marginTop: 12.25,
        marginBottom: 7.25,
        width: width * 0.965
    },
    sortableContentContainer: {
        width: "100%",
        paddingBottom: 62.5
        // maxHeight: height * 0.775
    },
    sortableContentContainerOriginalStyle: {
        width: "100%",
        // maxHeight: height * 0.775
    },
    imageWrappedContainOutterSub: {
        flexDirection: "row",
        display: "flex",
        width: width * 0.825,
        height: height * 0.2625,
        maxWidth: width * 0.825,
        maxHeight: height * 0.375,
        minWidth: width * 0.825
    },
    imageWrappedContainOutter: {
        flexDirection: "row",
        display: "flex",
        margin: 8.25,
        width: width * 0.825,
        height: height * 0.2625,
        maxWidth: width * 0.825,
        maxHeight: height * 0.375,
        minWidth: width * 0.825
    }, 
    numericalImageIcon: {
        maxWidth: 67.5,
        maxHeight: 67.5,
        height: 67.5,
        width: 67.5,
        marginLeft: 22.5,
        padding: 12.5,
        borderWidth: 2,
        borderColor: Colors.primaryColor,
        borderRadius: 12.5
    }, 
    floatRightSideWrapper: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    imageWrappedContain: {
        margin: 8.25,
        width: width * 0.55,
        height: height * 0.25,
        maxHeight: height * 0.25,
        maxWidth: width * 0.55,
        minWidth: width * 0.55,
        minHeight: height * 0.25
    }, 
    closeIconClickableTouch: {
        position: "absolute",
        left: -21.25,
        top: -21.75
    },
    closeIconImage: {
        maxWidth: 50,
        maxHeight: 50,
        height: 50,
        width: 50
    },  
    presentationText: {
        fontSize: 16.25
    },
    listedItemWrapperSelected: {
        margin: 5,
        marginBottom: 12.5,
        flex: 1
    },
    activityPostingToDB: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.535)",
        height: "100%",
        minHeight: "100%",
        zIndex: 9999999999999999
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.535)",
        height: "100%",
        zIndex: 9999999999999999
    },
    iconCustom: {
        maxWidth: 30,
        maxHeight: 30,
        minHeight: 30,
        minWidth: 30
    },
    bottomSheetStyleHidden: {
        display: "none"
    },
    bottomSheetStyle: {
        backgroundColor: 'white',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding
    },
    selectedTitle: {
        color: "#004266",
        fontWeight: "bold"
    },
    badgeLabel: {
        marginBottom: 18.5,
        textAlign: "left",
        marginLeft: 8.25,
        fontWeight: "bold",
        fontSize: 18.25
    },
    enterManualText: {
        fontSize: 20,
        margin: 12.5,
        color: Colors.secondaryColor,
        textDecorationLine: "underline"
    },  
    selectedSubtitle: {
        color: "#0074b3"
    },
    searchableInputWrapperView: {
        flex: 1,
        zIndex: 99999999999999999999
    },
    customizedBadge: {
        margin: 2.75, 
        minHeight: 40, 
        padding: 5, 
        borderWidth: 2.25, 
        borderColor: "darkgrey",
        marginBottom: 17.5
    },
    removalIconTouchable: {
        position: "absolute",
        right: 12.5,
        maxWidth: 42.5,
        maxHeight: 42.5,
        top: 22.5
    },
    removalIcon: {
        maxWidth: 42.5,
        maxHeight: 42.5
    },
    tagBadge: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 13
    },
    draggableRowWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: '#000',
        padding: 16,
        width: 110,
        // flex: 1,
        height: 150,
        marginHorizontal: 10,
        borderRadius: 4,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.2)',
                shadowOpacity: 1,
                shadowOffset: { height: 2, width: 2 },
                shadowRadius: 2
            },
            android: {
                elevation: 0,
                marginHorizontal: 30
            }
        })
    },
    addressGeneralThirdLengthStyles: {
        backgroundColor: "#fff",
        right: 0,
        ...Fonts.black16Medium,
        borderWidth: 1.5,
        borderColor: Colors.secondaryColor,
        borderRadius: 8.5,
        maxWidth: "65%",
        width: "65%",
        paddingLeft: 12.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 8.5
    },
    addressGeneralHalfInput: {
        backgroundColor: "#fff",
        right: -4.25,
        ...Fonts.black16Medium,
        borderWidth: 1.5,
        borderColor: Colors.secondaryColor,
        borderRadius: 8.5,
        maxWidth: "48.5%",
        width: "48.5%",
        paddingLeft: 12.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 8.5
    },
    addressItemStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#fff',
        borderColor: 'darkgray',
        borderWidth: 1,
        borderRadius: 5,
        zIndex: 99999999999999999999,
        flex: 1
    },
    checkboxInput: {
        flex: 1, 
        padding: 12.5
    },
    checkboxImage: {
        minWidth: 37.5,
        minHeight: 37.5,
        width: 37.5,
        height: 37.5
    },  
    checkboxRow: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    addressGeneralQuarterInputSelectWrapper: {
        backgroundColor: Colors.whiteColor,
        left: -4.25,
        minWidth: "35%",
        ...Fonts.black16Medium,
        borderRadius: 8.5,
        maxWidth: "35%",
        width: "35%",
        paddingLeft: 4.5,
        maxHeight: 51.75,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 8.5
    },
    addressGeneralHalfInputSelectWrapper: {
        backgroundColor: Colors.whiteColor,
        left: -4.25,
        minWidth: "48.5%",
        backgroundColor: "#fff",
        ...Fonts.black16Medium,
        borderWidth: 1.5,
        borderColor: Colors.secondaryColor,
        borderRadius: 8.5,
        maxWidth: "48.5%",
        width: "48.5%",
        paddingLeft: 4.5,
        maxHeight: 51.75,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 8.5
    },
    listeditemSelected: {
        borderWidth: 1.25,
        borderColor: "#00a6ff",
        borderRadius: 12.5,
        overflow: 'hidden'
    },
    listeditemSelectedPresentation: {
        borderWidth: 1.25,
        borderColor: "#00a6ff",
        borderRadius: 12.5,
        overflow: 'hidden',
        maxWidth: "100%",
        width: "100%",
        borderWidth: 1.25,
        borderColor: "grey",
        marginBottom: 7.25
    },
    listeditem: {
        borderWidth: 1.25,
        borderColor: "#999999",
        borderRadius: 12.5,
        overflow: 'hidden'
    },
    listedItemWrapper: {
        margin: 5,
        marginBottom: 12.5
    },  
    unselectedSubtitle: {
        color: "#000"
    }, 
    unselectedTitle: {
        color: "#000",
        fontWeight: "bold"
    },
    map: {
        minWidth: width, 
        minHeight: height * 0.575, 
        height: height * 0.575, 
        width
    },
    previewMapDisplay: {
        minWidth: "97.5%", 
        minHeight: height * 0.275, 
        height: height * 0.275, 
        width: "97.5%"
    },
    bottomWrapperContainer: {
        height: 75,
        minHeight: 75,
        marginTop: 17.5,
        marginBottom: 62.25
    },  
    shiftLeftWrapper: {
        left: -7.5,
        flex: 1
    },
    textFieldContainerStyle: {
        height: 55.0,
        width: 55.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1.0
    },
    rowItem: {
        flexDirection: "row",
        flex: 1
    },
    inputCounterText: {
        position: "absolute",
        right: 12.5,
        bottom: 5,
        color: "red",
        textDecorationLine: "underline",
        fontWeight: "bold"
    },  
    greyishBackingListWrapper: {
        backgroundColor: "#EDEEED",
        borderRadius: 16.25,
        borderWidth: 1.25,
        borderColor: "black",
        padding: 12.75,
        marginTop: 12.5,
        marginBottom: 12.5
    },
    labelCustom: {
        flexShrink: 1, 
        color: "#fff", 
        fontSize: 18, 
        textDecorationLine: "underline", 
        marginBottom: 5
    },
    pointersWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginTop: 2.5,
        marginBottom: 2.5
    },  
    lightbulbHelperText: {
        fontSize: 18.25,
        color: Colors.secondaryColor,
        marginLeft: 7.25,
        marginRight: 7.25,
        fontWeight: "bold", 
        textAlign: "center"
    },
    textHelperImage: {
        maxWidth: 26.5,
        maxHeight: 26.5
    },  
    textHelperImageOne: {
        maxWidth: 35,
        maxHeight: 35
    },
    multilineInput: {
        ...Fonts.black17SemiBold, 
        textAlignVertical: "top"
    },
    textFieldContainerStyle: {
        padding: 5,
        marginBottom: 32.5,
        marginTop: 12.5,
        borderRadius: Sizes.fixPadding - 5.0,
        borderWidth: 1.5,
        borderColor: "darkgrey",
        backgroundColor: Colors.whiteColor,
        elevation: 1.0
    },
    wrapperMainTopContainer: {
        flex: 1,
        left: -7.5,
        marginTop: 12.5
    },
    addPicturesButtonTouchable: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        borderRadius: Sizes.fixPadding,
        maxWidth: width * 0.825,
        minWidth: width * 0.825,
        backgroundColor: "#fff",
        shadowColor: Colors.secondaryColor,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        paddingBottom: 12.5,
        marginBottom: 17.5,
        marginTop: 17.5,
        paddingTop: 12.5,
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 8.5,
        borderWidth: 1.5,
        borderColor: "darkgrey"
    },
    centeredContent: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    cameraTouchableImage: {
        maxWidth: 42.5,
        width: 42.5,
        maxHeight: 42.5,
        height: 42.5
    },
    pictureRow: {
        flexDirection: "row",
        display: "flex"
    },
    columnizedCol: {
        flexDirection: "column",
        display: "flex"
    },
    addPhotoText: {
        textAlign: "center",
        fontSize: 22.25,
        marginTop: 5.75,
        marginLeft: 12.5,
        color: Colors.secondaryColor,
        textDecorationLine: "underline",
        fontWeight: "bold"
    },
    topChunkWrapper: {
        flexDirection: "row",
        display: "flex"
    },
    topRowData: {
        flexDirection: "row",
        display: "flex"
    },
    lowestBottomChunkWrapper: {
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        width
    },
    subbedText: {
        marginTop: 7.25,
        marginRight: 12.5
    },  
    leftIconStyle: {
        maxWidth: 26.5,
        maxHeight: 26.5,
        position: "absolute",
        top: 5
    },
    thirdColumn: {
       margin: 4.5
    },
    commonSpacesText: {
        marginLeft: 12.5,
        fontWeight: "bold",
        fontSize: 18.25
    },
    badgeHorizontalStyle: {
        padding: 3.75, 
        height: 42.5, 
        paddingRight: 10, 
        paddingLeft: 10, 
        borderWidth: 2.25, 
        borderColor: Colors.darkerBlue
    },
    thirdLengthInput: {
        width: width * 0.3,
        maxWidth: width * 0.3,
        borderRadius: Sizes.fixPadding,
        borderColor: Colors.secondaryColor,
        borderWidth: 1.25,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 7.75,
        paddingLeft: 8.25
    },  
    titledHeaderText: {
        fontWeight: "bold",
        fontSize: 18.25,
        color: "black",
        textDecorationLine: "underline"
    },
    bottomChunkWrapper: {
        flexDirection: "row",
        display: "flex"
    },
    leftIconStyleWrapper: {
        width: width * 0.1,
        maxWidth: width * 0.1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    rightMainStyle: {
        width: width * 0.9,
        maxWidth: width * 0.9,
        display: "flex",
        flexDirection: "column"
    },
    // start of the FINAL PAGE STYLES...
    containerFinalPage: {
        flex: 1,
        backgroundColor: '#EBEBEB'
    },
    formContent:{
        flexDirection: 'row',
        marginTop: 30
    },
    inputContainerFinalPage: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        height: 45,
        flexDirection: 'row',
        alignItems:'center',
        flex: 1,
        margin: 10
    },
    iconFinalPage:{
        width: 30,
        height: 30
    },
    iconFinalPageBtnSearch:{
        alignSelf: 'center'
    },
    inputs:{
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1
    },
    inputFinalPageIcon: {
        marginLeft: 15,
        justifyContent: 'center'
    },
    scrollerInnerViewWrapper: {
        flex: 1,
        height: "100%"
    },
    notificationList: {
        flexGrow: 1,
        padding: 3.75,
        height: "100%"
    },
    listitemSettings: {
        maxWidth: "100%",
        width: "100%",
        borderWidth: 1.25,
        borderColor: "grey",
        marginBottom: 12.5
    },  
    addOnlyBorderExterior: {
        flex: 1
    },
    cardFinalPage: {
        height: null,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 5,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        borderTopWidth: 90,
        marginBottom: 20,
        borderBottomLeftRadius: 12.5,
        borderBottomRightRadius: 12.5
    },
    cardContentFinalPage: {
        flexDirection: 'row',
        marginLeft: 10
    },
    showMoreOrLess: {
        fontWeight: "bold", 
        color: Colors.secondaryColor, 
        paddingBottom: 0, 
        paddingTop: 7.5,
        backgroundColor: "#fff", 
        width: "100%", 
        paddingBottom: 17.5,
        textDecorationLine: "underline",
        fontSize: 17.5
    },
    cardContentFinalPageLower: {
        marginLeft: 10,
        backgroundColor: "#fff",
        zIndex: -1,
        paddingBottom: 12.5,
        paddingTop: 12.5,
        borderTopColor: "grey",
        borderBottomColor: "grey",
        borderTopWidth: 1.25,
        borderBottomWidth: 1.25,
        marginBottom: 12.5,
        marginTop: 12.5
    },
    imageContentFinalPage: {
        marginTop: -85
    },
    imageFinalPage: {
        width: 52.5,
        height: 52.5,
        backgroundColor: "#fff",
        borderRadius: 17.5,
        borderWidth: 2.25,
        borderColor: Colors.secondaryColor
    },
    nameFinalPage: {
        fontSize: 23.25,
        fontWeight: 'bold',
        textDecorationLine: "underline",
        alignSelf: 'center'
    },
    btnColorFinalPage: {
        padding: 10,
        borderRadius: 40,
        marginHorizontal: 3,
        backgroundColor: "#eee",
        marginTop: 5
    },
    selectableLabel: {
        marginBottom: 12.75,
        textAlign: "center",
        borderRadius: 8.25,
        fontWeight: "bold",
        borderWidth: 1.25,
        borderColor: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.575)",
        padding: 9.25,
        color: "#fff",
        fontSize: 15 
    },
    parallaxCoreStyle: {
        minWidth: "100%", 
        minHeight: 412.5, 
        maxHeight: 412.5
    },
    parallaxImageStyle: {
        opacity: 0.675, 
        backgroundColor: Colors.primaryColor
    },
    selectableWrapper: {
        borderRadius: 27.5,
        padding: 4.25,
        justifyContent: "center",
        alignContent: "center",
        marginTop: 90,
        alignItems: "center"
    },
    selectablePickerWrapperStyles: {
        backgroundColor: Colors.whiteColor,
        maxWidth: "87.5%",
        width: "87.5%",
        minWidth: "87.5%",
        maxHeight: 72.5,
        height: 72.5,
        minHeight: 72.5,
        justifyContent: "center",
        borderRadius: 27.5,
        alignContent: "center",
        alignItems: "center",
        borderWidth: 2.5,
        borderColor: Colors.secondaryColor
    },
    toppedWrapperContainer: {
        marginBottom: 22.5, 
        backgroundColor: "#fff", 
        padding: 12.25, 
        margin: 4,
        borderRadius: 12.5,
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11
    },
    svgCurve: {
        position: 'absolute',
        width,
        top: -93.25,
        left: 0,
        right: 0
    },
    topTextLabeled: {
        fontWeight: "bold",
        textDecorationLine: "underline",
        fontSize: 21.5
    },
    topTextLoweredLabeled: {
        fontSize: 18.25
    },
    sliderWrapperCustom: {
        borderRadius: 22.5,
        borderWidth: 2.25,
        maxWidth: width * 0.885,
        borderColor: Colors.secondaryColor,
        marginTop: 22.5,
        marginBottom: 32.5,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11
    },
    outterInnerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 2.0
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    cancelButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
        paddingRight: 12.5,
        paddingLeft: 12.5
    },
    confirmationButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.secondaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0,
        paddingRight: 12.5,
        paddingLeft: 12.5
    },
    outterContainer: {
        margin: 12.25
    },
    mediumHR: {
        borderBottomColor: "#fff",
        borderBottomWidth: 2,
        marginTop: 12.25,
        marginBottom: 12.25,
        width: "100%"
    }
})
export default styles;