import React, { Fragment } from "react";
import { View, FlatList, ScrollView } from "react-native";
import RenderThirdPageHelperContent from "../../../../helpers/pageThree/page.js";
import RenderPageFiveHelperData from "../../../../helpers/pageFive/page.js";
import RenderPageSixHelperData from "../../../../helpers/pageSix/page.js";
import RenderPageSevenHelperData from "../../../../helpers/pageSeven/page.js";
import RenderPageEightHelperData from "../../../../helpers/pageEight/page.js";
import RenderPageNineHelperData from "../../../../helpers/pageNine/page.js";
import RenderPageTenHelperData from "../../../../helpers/pageTen/page.js";
import styles from "./paneStyles.js";
import helpersOne from "../../../../helpers/pageOne/page.js";
import helpersTwo from "../../../../helpers/pageTwo/page.js";
import helpersThree from "../../../../helpers/pageFour/page.js";
import { saveUpdatePreviousLocationDetailsDropoff } from "../../../../../../../redux/actions/storageDropoffRelated/storageRelatedUpdates.js";
import { connect } from "react-redux";

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


const SheetPaneModificationPaneHelper = ({ sheetRefModifications, storageData, authData, setCurrentEditingPage, pageToEdit, valuesToDeconstruct, saveUpdatePreviousLocationDetailsDropoff, totalNumPages }) => {

    const {
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
    } = valuesToDeconstruct;

    const handleSubItemSelection = (indexed, page, dataObj) => {

        console.log("replacement handleSubItemSelection func/helper to avoid page-redirects...");

        saveUpdatePreviousLocationDetailsDropoff({
            ...storageData,
            ...dataObj
        }); //  reference...: { mainCategory: "something" }

        setTimeout(() => {
            sheetRefModifications.current.close();

            setCurrentEditingPage(null);
        },  425);
    }

    const keyExtractor = (item, index) => index.toString();
    // rendering main data logic..
    const renderMainContent = () => {
        if (pageToEdit !== null) {
            switch (pageToEdit) {
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
                                renderItem={({ item, index }) => renderItem(setIsCollapsed, setSelected, selected, item, index, null, totalNumPages)}
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
                    return <RenderThirdPageHelperContent renderHeaderLogicData={renderHeaderLogicData} setCurrentViewState={setCurrentViewState} setManualAddressEntry={setManualAddressEntry} handleSubItemSelection={handleSubItemSelection} currentView={currentView} manualAddressEntry={manualAddressEntry} />
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
                default:
                    return null;
                    break;
            }
        } else {
            return null;
        }
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 27.5 }} style={styles.outterMostContainerWrapper}>
            {renderMainContent()}
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        storageData: state.storage.data,
        authData: state.auth.data
    }
}
export default connect(mapStateToProps, { saveUpdatePreviousLocationDetailsDropoff })(SheetPaneModificationPaneHelper);