import React, { Fragment, useState, useEffect } from "react";
import {
    View,
    FlatList,
    Dimensions,
    Text,
    TouchableOpacity,
    ScrollView,
    ImageBackground
} from "react-native";
import styles from "./startListingNewSpaceProcessStyles.js";
import _ from "lodash";
import { saveUpdatePreviousLocationDetailsDropoff } from "../../../redux/actions/storageDropoffRelated/storageRelatedUpdates.js";
import { connect } from "react-redux";
import helpersOne from "./helpers/pageOne/page.js";
import helpersTwo from "./helpers/pageTwo/page.js";
import helpersThree from "./helpers/pageFour/page.js";
import RenderThirdPageHelperContent from "./helpers/pageThree/page.js";
import * as Progress from 'react-native-progress';
import RenderPageFiveHelperData from "./helpers/pageFive/page.js";
import RenderPageSixHelperData from "./helpers/pageSix/page.js";
import RenderPageSevenHelperData from "./helpers/pageSeven/page.js";
import RenderPageEightHelperData from "./helpers/pageEight/page.js";
import RenderPageNineHelperData from "./helpers/pageNine/page.js";
import RenderPageTenHelperData from "./helpers/pageTen/page.js";
import RenderFinalReviewPostPage from "./helpers/review/page.js";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import Dialog from "react-native-dialog";
import { Fonts, Sizes } from "../../../constants/styles";

const {
    renderComponentFooterHelper, 
    renderHeaderLogicData, 
    renderItem,
    list
} = helpersOne;

const {
    typeListOptions,
    renderItemType,
    renderFooterButtonComponentPageTwo
} = helpersTwo;


const {
    renderItemEnviormentalSelection,
    renderFooterButtonComponentPageThree,
    kindOfSpaceOptions
} = helpersThree;

const { width, height } = Dimensions.get("window");

const totalNumPages = 10;

const ListNewPropertyFreeSpaceProcess = ({ storageData, saveUpdatePreviousLocationDetailsDropoff, authData }) => {

    const [ selected, setSelected ] = useState(null);
    const [ environmentType, setEnviormentType ] = useState(null);
    const [ isCollapsed, setIsCollapsed ] = useState(true);
    const [ modalVisibility, setModalVisibility ] = useState(false);
    const [ activePage, setPage ] = useState(0);
    const [ progressNumber, setProgressNumber ] = useState(0);
    const [ pageTwoSelectedArr, setPageTwoSelectedArr ] = useState([]);
    const [ manualAddressEntry, setManualAddressEntry ] = useState({
        addressLineOneStreetNumOnly: "",
        addressLineOneStreetNameOnly: "",
        addressLineTwo: "",
        state: null,
        city: "",
        zipCode: ""
    });
    const [ currentView, setCurrentViewState ] = useState(true);
    const [ pageToEdit, setCurrentEditingPage ] = useState(null);
    const [ ready, setReady ] = useState(false);

    useEffect(() => {
        // update to current page...
        setPage(typeof storageData !== "undefined" && _.has(storageData, "page") ? storageData.page : 0);
        // ready to display appropriate data...
        setReady(true);
    }, [storageData]);

    const keyExtractor = (item, index) => index.toString();

    const handleSubItemSelection = (indexed, page, dataObj) => {

        const percentage =  Number(`0.${indexed}`);

        saveUpdatePreviousLocationDetailsDropoff({
            ...storageData,
            ...dataObj,
            page
        });
        setPage(page);

        setProgressNumber((percentage / totalNumPages) * 10);
        
    }

    const renderMainContent = () => {
        if (ready === true) {
            // live content is ready to be shown/displayed...
            const valuesToDeconstruct = {
                pageTwoSelectedArr,
                setPageTwoSelectedArr,
                manualAddressEntry, 
                setManualAddressEntry,
                currentView, 
                setCurrentViewState,
                setEnviormentType, 
                environmentType,
                selected, 
                setSelected,
                isCollapsed, 
                setIsCollapsed
            }
    
            switch (activePage) {
                case 0:
                    return (
                        <Fragment>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                ListHeaderComponentStyle={styles.listheaderStyles}
                                ListHeaderComponent={() => renderHeaderLogicData("Where do you have free space?", "Is your space indoor or outdoor(s)?")}
                                keyExtractor={keyExtractor}
                                data={list}
                                ListFooterComponent={() => renderComponentFooterHelper(isCollapsed, keyExtractor, handleSubItemSelection, selected)}
                                renderItem={({ item, index }) => renderItem(setIsCollapsed, setSelected, selected, item, index, setProgressNumber, totalNumPages)}
                            />
                        </Fragment>
                    );
                    break;
                case 1:
                    return (
                        <Fragment>
                            <FlatList
                                ListHeaderComponentStyle={styles.listheaderStyles}
                                ListHeaderComponent={() => renderHeaderLogicData("Which of these features does your available space have?", "Select all of the features that apply to your space...")}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={keyExtractor}
                                data={typeListOptions}
                                ListFooterComponent={() => renderFooterButtonComponentPageTwo(handleSubItemSelection, pageTwoSelectedArr)}
                                renderItem={({ item, index }) => renderItemType(setPageTwoSelectedArr, pageTwoSelectedArr, item, index)}
                            />
                        </Fragment>
                    );
                    break;
                case 2:
                    return <RenderThirdPageHelperContent setProgressNumber={setProgressNumber} renderHeaderLogicData={renderHeaderLogicData} setCurrentViewState={setCurrentViewState} setManualAddressEntry={setManualAddressEntry} handleSubItemSelection={handleSubItemSelection} currentView={currentView} manualAddressEntry={manualAddressEntry} />
                    break;
                case 3:
                    return (
                        <View style={{}}>
                            <FlatList
                                ListHeaderComponentStyle={styles.listheaderStyles}
                                ListHeaderComponent={() => renderHeaderLogicData("What kind of space is this?", "Select whether the space is a residential space or business/commerical space")}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={keyExtractor}
                                data={kindOfSpaceOptions}
                                style={{  }}
                                contentContainerStyle={{ flexGrow: 1 }}
                                ListFooterComponent={() => renderFooterButtonComponentPageThree(handleSubItemSelection, environmentType)}
                                ListFooterComponentStyle={styles.listFooterPositioningBottom}
                                renderItem={({ item, index }) => renderItemEnviormentalSelection(setEnviormentType, environmentType, item, index)}
                            />
                        </View>
                    );
                    break;
                case 4:
                    return <RenderPageFiveHelperData handleSubItemSelection={handleSubItemSelection} storageData={storageData} renderHeaderLogicData={renderHeaderLogicData} />;
                    break;
                case 5:
                    return <RenderPageSixHelperData handleSubItemSelection={handleSubItemSelection} storageData={storageData} renderHeaderLogicData={renderHeaderLogicData} />;
                    break;
                case 6:
                    return <RenderPageSevenHelperData handleSubItemSelection={handleSubItemSelection} storageData={storageData} renderHeaderLogicData={renderHeaderLogicData} />;
                    break;
                case 7:
                    return <RenderPageEightHelperData handleSubItemSelection={handleSubItemSelection} storageData={storageData} renderHeaderLogicData={renderHeaderLogicData} />;
                    break;
                case 8:
                    return <RenderPageNineHelperData handleSubItemSelection={handleSubItemSelection} storageData={storageData} renderHeaderLogicData={renderHeaderLogicData} />;
                    break;
                case 9:
                    return <RenderPageTenHelperData authData={authData} handleSubItemSelection={handleSubItemSelection} storageData={storageData} renderHeaderLogicData={renderHeaderLogicData} />;
                    break;
                case 10:
                    return <RenderFinalReviewPostPage totalNumPages={totalNumPages} valuesToDeconstruct={valuesToDeconstruct} setCurrentEditingPage={setCurrentEditingPage} pageToEdit={pageToEdit} setPage={setPage} authData={authData} storageData={storageData} renderHeaderLogicData={renderHeaderLogicData} />;
                    break;
                default:
                    break;
            }
        } else {
            return (
                <Fragment>
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                    </SkeletonPlaceholder>
                </Fragment>
            );
        }
    }
    const restartInformationalProcess = () => {

        saveUpdatePreviousLocationDetailsDropoff({
            page: 0
        });
    }
    const calculatePageRenderImage = (page) => {
        switch (page) {
            case 0:
                return require("../../../assets/images/design-1.png");
                break;
            case 1:
                return require("../../../assets/images/design-2.png");
                break;
            case 2:
                return require("../../../assets/images/design-3.png");
                break;
            case 3:
                return require("../../../assets/images/design-4.png");
                break;
            case 4:
                return require("../../../assets/images/design-5.png");
                break;
            case 5:
                return require("../../../assets/images/design-6.png");
                break;
            case 6:
                return require("../../../assets/images/design-7.png");
                break;
            case 7:
                return require("../../../assets/images/design-8.png");
                break;
            case 8:
                return require("../../../assets/images/design-9.png");
                break;
            case 9:
                return require("../../../assets/images/design-5.png");
                break;
            case 10:
                return require("../../../assets/images/design-6.png");
                break;
            default:
                break;
        }
    }
    const conditionallyRenderWithScroller = () => {
        if (typeof storageData !== "undefined" && storageData.page === 10) {
            return renderMainContent();
        } else {
            return (
                <ImageBackground style={styles.imageBackgroundCustom} imageStyle={{ opacity: 0.3125 }} source={calculatePageRenderImage(activePage)}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 140 }} style={styles.wrapperMain}>
                        {renderMainContent()}
                    </ScrollView>
                </ImageBackground>
            );
        }
    }
    const renderModalConfirmationRestarting = () => {
        return (
            <Dialog.Container visible={modalVisibility}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={styles.modalTitleText}>
                        Are you sure you'd like to completely restart this form process? {"\n"}{"\n"}You'll be reverted back to the first page/portion...
                    </Text>
                    <View style={styles.modalHrLine} />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setModalVisibility(false)}
                            style={styles.dialogNoButtonStyle}
                        > 
                            <Text style={{ ...Fonts.black20Regular, color: "#000", textAlign: "center", fontWeight: "bold" }}>Abandon Cancellation...</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                setModalVisibility(false)
                                // restart process - call helper function..
                                restartInformationalProcess()
                            }}
                            style={styles.dialogYesButtonStyle}
                        >
                            <Text style={{ ...Fonts.white20Regular, color: "#fff", textAlign: "center", fontWeight: "bold" }}>Restart Entire Process!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }
    return (
        <Fragment>
            <Progress.Bar progress={progressNumber} unfilledColor={"lightgrey"} borderRadius={0} height={7.5} color={"#0BDA51"} width={width} />
            {conditionallyRenderWithScroller()}
            {renderModalConfirmationRestarting()}
            <View style={styles.bottomWrapperPerButton}>
                <AwesomeButtonBlue backgroundDarker={"#000"} backgroundColor={"#990000"} style={styles.absoluteButtonBottom} onPress={() => setModalVisibility(true)} textColor={"#fff"} backgroundShadow={"black"} stretch={true}>Restart Detail(s) Process</AwesomeButtonBlue>
            </View>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        storageData: state.storage.data,
        authData: state.auth.data
    }
}
export default connect(mapStateToProps, { saveUpdatePreviousLocationDetailsDropoff })(ListNewPropertyFreeSpaceProcess);