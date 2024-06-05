import React, { Fragment, Component, createRef } from "react";
import { Text, View, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
import styles from "./paneStyles.js";
import { Card } from "react-native-elements";
import { SliderBox } from "react-native-image-slider-box";
import { Colors } from "../../../../../constants/styles.js";
import Stars from "react-native-stars";
import ViewMoreText from 'react-native-view-more-text';
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import Toast from 'react-native-toast-message';
import DatePicker from 'react-native-modern-datepicker';
import _ from "lodash";
import moment from "moment";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

const { width, height } = Dimensions.get("window");

class PaneMapDisplayFiltrationResultsHelper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inViewPort: 0,
            currentIndexFocussed: 0,
            list: []
        }
        this.flatListReference = createRef(null);
    }

    handleHeartReaction = () => {
        console.log("handleHeartReaction clicked/ran...!");
    }

    renderListHeaderOnly = () => {
        const { scrollEnabled, updateState } = this.props;
        return (
            <TouchableOpacity onPress={() => {
                updateState(prevState => {
                    return {
                        ...prevState,
                        scrollEnabled: !prevState.scrollEnabled
                    }
                })
            }} style={styles.topHeaderSpacer}>
                <Text style={!scrollEnabled ? [styles.dragMeText, { color: Colors.greenColor }] : [styles.dragMeText, { color: "red" }]}>{!scrollEnabled ? "Activate Scroll-Ability..." : "Disable Scroll-Ability..."}</Text>
            </TouchableOpacity>
        );
    }

    // renderButtonsPerNavigation = () => {
    //     const { state, updateState } = this.props;

    //     const scrollToAppropriateIndex = (focussedNum, type) => {
            
    //         console.log("focussedNum...:", focussedNum);

    //         if (isNaN(focussedNum)) {
    //             if (type === "increment") {
    //                 updateState(prevState => {
    //                     return {
    //                         ...prevState,
    //                         currentIndexFocussed: 0
    //                     }
    //                 })

    //                 this.flatListReference.current.scrollToIndex({
    //                     index: focussedNum + 1
    //                 });
    //             }
    //             if (type === "decrement") {
    //                 Toast.show({
    //                     type: 'info',
    //                     text1: `FIRST ITEM, Can NOT decrement any further!`,
    //                     text2: `You're already at the top (first) item therefore we cannot scroll any further in this direction, please navigate/click in the opposite direction to see more results...`,
    //                     visibilityTime: 4250,
    //                     position: "bottom"
    //                 });
    //             }
    //         } else {
    //             if (focussedNum !== 0) {
    //                 if (type === "increment") {
    //                     updateState(prevState => {
    //                         return {
    //                             ...prevState,
    //                             currentIndexFocussed: prevState.currentIndexFocussed + 1
    //                         }
    //                     })
    
    //                     this.flatListReference.current.scrollToIndex({
    //                         index: focussedNum + 1
    //                     });
    //                 }
    //                 if (type === "decrement") {
    //                     updateState(prevState => {
    //                         return {
    //                             ...prevState,
    //                             currentIndexFocussed: prevState.currentIndexFocussed - 1
    //                         }
    //                     })
    
    //                     this.flatListReference.current.scrollToIndex({
    //                         index: focussedNum - 1
    //                     });
    //                 }
    //             } else {
    //                 if (type === "increment") {
    //                     updateState(prevState => {
    //                         return {
    //                             ...prevState,
    //                             currentIndexFocussed: 1
    //                         }
    //                     })
    
    //                     this.flatListReference.current.scrollToIndex({
    //                         index: focussedNum + 1
    //                     });
    //                 } else {
    //                     Toast.show({
    //                         type: 'info',
    //                         text1: `FIRST ITEM, Can NOT decrement any further!`,
    //                         text2: `You're already at the top (first) item therefore we cannot scroll any further in this direction, please navigate/click in the opposite direction to see more results...`,
    //                         visibilityTime: 4250,
    //                         position: "bottom"
    //                     });
    //                 }
    //             }
    //         }
    //     }
    //     return (
    //         <Fragment>
    //             <TouchableOpacity onPress={() => scrollToAppropriateIndex(state.currentIndexFocussed, "decrement")} style={styles.leftTouchableBottom}>
    //                 <Image source={require("../../../../../assets/images/icon/up-arrow-main.png")} style={styles.topLeftImageArrow} />
    //             </TouchableOpacity>
    //             <TouchableOpacity onPress={() => scrollToAppropriateIndex(state.currentIndexFocussed, "increment")} style={styles.rightTouchableBottom}>
    //                 <Image source={require("../../../../../assets/images/icon/down-arrow-main.png")} style={styles.topRightImageArrow} />
    //             </TouchableOpacity>
    //         </Fragment>
    //     );
    // }

    renderViewMore = (onPress) => {
        return (
            <Text style={styles.showMoreOrLess} onPress={onPress}>View more</Text>
        )
    }

    renderViewLess = (onPress) => {
        return (
            <Text style={styles.showMoreOrLessClose} onPress={onPress}>View less</Text>
        )
    }

    handleRedirectIndividualPage = (listing) => {

        const { sheetRef, navigation } = this.props;
        
        sheetRef.current.hide();

        setTimeout(() => {
            navigation.navigate("IndividualFreightAvailableListingView", { listing });
        }, 1250);
    } 

    calculateStartOrStartAndEnd = (deliveryTimespanSpecs) => {
        if (deliveryTimespanSpecs.value === "one-specific-date") {
            return (
                <View style={{ marginLeft: 17.25, marginRight: 17.25, marginBottom: 25 }}>
                    <Text style={styles.labeledTop}>Must receive/pick-up the desired freight shipment/load BEFORE or ON this date...</Text>
                    <DatePicker
                        disableDateChange={true}
                        minimumDate={moment(new Date(deliveryTimespanSpecs.additionalInfo.originalFormatDate)).format("YYYY-MM-DD")}
                        maximumDate={moment(new Date(deliveryTimespanSpecs.additionalInfo.originalFormatDate)).format("YYYY-MM-DD")}
                        mode={"calendar"}
                        options={{
                            backgroundColor: '#fff',
                            textHeaderColor: Colors.secondaryColor,
                            textDefaultColor: Colors.secondaryColor,
                            selectedTextColor: '#fff',
                            textDefaultColor: Colors.darkerBlue,
                            mainColor: Colors.primaryColor,
                            textSecondaryColor: Colors.primaryColor,
                            borderColor: 'rgba(122, 146, 165, 0.1)',
                        }}
                        selected={_.has(deliveryTimespanSpecs.additionalInfo, "originalFormatDate") ? deliveryTimespanSpecs.additionalInfo.originalFormatDate.toString() : null}
                    />
                </View>
            );
        } else if (deliveryTimespanSpecs.value === "two-specific-dates") {
            return (
                <View style={{ marginLeft: 17.25, marginRight: 17.25, marginBottom: 25 }}>
                    <Text style={styles.labeledTop}>Must receive/pick-up the desired freight shipment/load BEFORE or ON this date...</Text>
                    <DatePicker
                        mode={"calendar"}
                        minimumDate={moment(new Date(deliveryTimespanSpecs.additionalInfo.startDatePicked.originalFormatDate)).format("YYYY-MM-DD")}
                        maximumDate={moment(new Date(deliveryTimespanSpecs.additionalInfo.startDatePicked.originalFormatDate)).format("YYYY-MM-DD")}
                        disableDateChange={true}
                        options={{
                            backgroundColor: '#fff',
                            textHeaderColor: Colors.secondaryColor,
                            textDefaultColor: Colors.secondaryColor,
                            selectedTextColor: '#fff',
                            textDefaultColor: Colors.darkerBlue,
                            mainColor: Colors.primaryColor,
                            textSecondaryColor: Colors.primaryColor,
                            borderColor: 'rgba(122, 146, 165, 0.1)',
                        }}
                        selected={_.has(deliveryTimespanSpecs.additionalInfo, "startDatePicked") ? deliveryTimespanSpecs.additionalInfo.startDatePicked.originalFormatDate.toString() : null}
                    />
                    <View style={styles.veryThinHR} />
                    <Text style={styles.labeledTop}>Must receive/pick-up the desired freight shipment/load BEFORE or ON this date...</Text>
                    <DatePicker
                        mode={"calendar"}
                        minimumDate={moment(new Date(deliveryTimespanSpecs.additionalInfo.endDatePicked.originalFormatDate)).format("YYYY-MM-DD")}
                        maximumDate={moment(new Date(deliveryTimespanSpecs.additionalInfo.endDatePicked.originalFormatDate)).format("YYYY-MM-DD")}
                        disableDateChange={true}
                        options={{
                            backgroundColor: '#fff',
                            textHeaderColor: Colors.secondaryColor,
                            textDefaultColor: Colors.secondaryColor,
                            selectedTextColor: '#fff',
                            textDefaultColor: Colors.darkerBlue,
                            mainColor: Colors.primaryColor,
                            textSecondaryColor: Colors.primaryColor,
                            borderColor: 'rgba(122, 146, 165, 0.1)',
                        }}
                        selected={_.has(deliveryTimespanSpecs.additionalInfo, "endDatePicked") ? deliveryTimespanSpecs.additionalInfo.endDatePicked.originalFormatDate.toString() : null}
                    />
                </View>
            );
        } else {
            return null;
        }  
    }

    renderListItem = ({ item }) => {      
        console.log("item", item);

        const { mainData, reformattedImages, date, dateString, id, comments, likes, dislikes, postedByID, postedByName, postedByUsername, newlyConstructedCoordsRandomizedNearby
        } = item || {};
    
        const { description, freightDescription, packagingDescription, deliveryTimespanSpecs, averagePalletSizeOfLoad, destinationZipCode, originZipCode, totalWeightOfLoad } = mainData;

        const { navigation, state } = this.props;

        const palletSplitFirst = averagePalletSizeOfLoad.split("x")[0];
        const palletSplitSecond = averagePalletSizeOfLoad.split("x")[0];

        const randomSalePrice = Math.floor(Math.random() * (11750 - 1250 + 1) + 1250);
        const reviews = Math.floor(Math.random() * (5 - 1 + 1) + 1);

        return (
            <Fragment key={id}>
                <Card containerStyle={styles.commentInitial}>
                    <View>
                        <SliderBox  
                            images={reformattedImages} 
                            dotColor={Colors.primaryColor}
                            inactiveDotColor={Colors.backColor}    
                            sliderBoxHeight={235}    
                            autoplay={false}
                            parentWidth={width * 0.8}
                            circleLoop={true}
                            resizeMethod={'resize'}
                            resizeMode={'cover'}
                            dotStyle={{
                                width: 17.5,
                                height: 17.5,
                                borderRadius: 17.5,
                                padding: 0,
                                margin: 0
                            }}    
                            imageLoadingColor={Colors.greenColor}                      
                        />
                        <View style={styles.topLeftCornerWrapper}>
                            <Text style={styles.topTextLeft}>${parseFloat(randomSalePrice).toFixed(2)} Upon Delivery</Text>
                        </View>
                        <TouchableOpacity onPress={this.handleHeartReaction} style={styles.topRightCornerWrapper}>
                            <Image source={require("../../../../../assets/images/icon/heart-100.png")} style={styles.topRightImage} />
                        </TouchableOpacity>
                    </View>
                    <Card.Divider style={{ marginTop: 17.25 }} />
                    <View style={[styles.rowOnly, { paddingBottom: 15 }]}>
                        <Text style={styles.freightStartEndText}>Start: {originZipCode} - </Text>
                        <Image source={require("../../../../../assets/images/icon/semi-truck-moving.png")} style={styles.semiTruckImageSlightlyLonger} />
                        <Text style={styles.freightStartEndText}> - End: {destinationZipCode}</Text>
                    </View> 
                    <View style={styles.rowOnly}>
                        <View style={styles.leftAlignStars}>
                            <Stars 
                                display={reviews}
                                spacing={1.25}
                                count={5}
                                starSize={22.25}
                                fullStar={require('../../../../../assets/images/icon/star.png')}
                                emptyStar={require('../../../../../assets/images/icon/empty-star-dotted.png')}
                            />
                        </View>
                    </View>
                    <Card.Divider />
                    <View style={[styles.rowOnly, { paddingTop: 7.75, paddingBottom: 3.75 }]}>
                        <View style={styles.halfedColumn}>
                            <Text style={styles.subbedTextLabel}>Posted By:</Text>
                            <Text style={styles.subbedTextResponse}>{postedByName}</Text>
                        </View>
                        <View style={styles.halfedColumn}>
                            <Text style={styles.subbedTextLabel}>Poster Username:</Text>
                            <Text style={styles.subbedTextResponse}>{postedByUsername}</Text>
                        </View>
                    </View>
                    <View style={[styles.rowOnly, { paddingBottom: 3.75, paddingTop: 3.75 }]}>
                        {this.calculateStartOrStartAndEnd(deliveryTimespanSpecs)}
                    </View>
                    <View style={styles.veryThinHR} />
                    <View style={[styles.rowOnly, { paddingBottom: 3.75, paddingTop: 3.75 }]}>
                        <View style={styles.halfedColumn}>
                            <Text style={styles.subbedTextLabel}>Insurance Incl.:</Text>
                            <Text style={styles.subbedTextResponse}>{"Yes! Included..."}</Text>
                        </View>
                        <View style={styles.halfedColumn}>
                            <Text style={styles.subbedTextLabel}>Insured Up-To:</Text>
                            <Text style={styles.subbedTextResponse}>${"Still needs to be updated..."}</Text>
                        </View>
                    </View>
                    <View style={styles.veryThinHR} />
                    <View style={[styles.rowOnly, { paddingBottom: 13.75, paddingTop: 3.75 }]}>
                        <View style={styles.halfedColumn}>
                            <Text style={styles.subbedTextLabel}>Average Pallet Size:</Text>
                            <Text style={styles.subbedTextResponse}>{palletSplitFirst}" x {palletSplitSecond}" x {"Up-to 72 (MAX)"}" (L ~ W ~ H)</Text>
                        </View>
                        <View style={styles.halfedColumn}>
                            <Text style={styles.subbedTextLabel}>Load-Weight:</Text>
                            <Text style={styles.subbedTextResponse}>{totalWeightOfLoad} - {"lbs."}</Text>
                        </View>
                    </View>
                    <Card.Divider />
                    <ViewMoreText
                        numberOfLines={4}
                        renderViewMore={this.renderViewMore}
                        renderViewLess={this.renderViewLess}
                        textStyle={{ textAlign: 'left' }}
                    >
                        <Text style={{ marginBottom: 10, color: "#000", fontWeight: "bold" }}>{description}</Text>
                    </ViewMoreText>
                    <Card.Divider />
                    <AwesomeButtonBlue type={"secondary"} onPress={() => this.handleRedirectIndividualPage(item)} backgroundShadow={"black"} stretch={true}>View Listing/Post</AwesomeButtonBlue>
                </Card>
            </Fragment>
        );
    }

    renderSkeletonEmptyList = () => {
        return (
            <Fragment>
                <Placeholder
                    Animation={Fade}
                    Left={PlaceholderMedia}
                >
                    <PlaceholderLine width={80} />
                    <PlaceholderLine width={width * 0.25} />
                    <PlaceholderLine width={30} />
                </Placeholder>
                <Placeholder
                    Animation={Fade}
                    Left={PlaceholderMedia}
                >
                    <PlaceholderLine width={80} />
                    <PlaceholderLine width={width * 0.25} />
                    <PlaceholderLine width={30} />
                </Placeholder>
                <Placeholder
                    Animation={Fade}
                    Left={PlaceholderMedia}
                >
                    <PlaceholderLine width={80} />
                    <PlaceholderLine width={width * 0.25} />
                    <PlaceholderLine width={30} />
                </Placeholder>
                <Placeholder
                    Animation={Fade}
                    Left={PlaceholderMedia}
                >
                    <PlaceholderLine width={80} />
                    <PlaceholderLine width={width * 0.25} />
                    <PlaceholderLine width={30} />
                </Placeholder>
                <Placeholder
                    Animation={Fade}
                    Left={PlaceholderMedia}
                >
                    <PlaceholderLine width={80} />
                    <PlaceholderLine width={width * 0.25} />
                    <PlaceholderLine width={30} />
                </Placeholder>
                <Placeholder
                    Animation={Fade}
                    Left={PlaceholderMedia}
                >
                    <PlaceholderLine width={80} />
                    <PlaceholderLine width={width * 0.25} />
                    <PlaceholderLine width={30} />
                </Placeholder>
                <Placeholder
                    Animation={Fade}
                    Left={PlaceholderMedia}
                >
                    <PlaceholderLine width={80} />
                    <PlaceholderLine width={width * 0.25} />
                    <PlaceholderLine width={30} />
                </Placeholder>
                <Placeholder
                    Animation={Fade}
                    Left={PlaceholderMedia}
                >
                    <PlaceholderLine width={80} />
                    <PlaceholderLine width={width * 0.25} />
                    <PlaceholderLine width={30} />
                </Placeholder>
                <Placeholder
                    Animation={Fade}
                    Left={PlaceholderMedia}
                >
                    <PlaceholderLine width={80} />
                    <PlaceholderLine width={width * 0.25} />
                    <PlaceholderLine width={30} />
                </Placeholder>
                <Placeholder
                    Animation={Fade}
                    Left={PlaceholderMedia}
                >
                    <PlaceholderLine width={80} />
                    <PlaceholderLine width={width * 0.25} />
                    <PlaceholderLine width={30} />
                </Placeholder>
                <Placeholder
                    Animation={Fade}
                    Left={PlaceholderMedia}
                >
                    <PlaceholderLine width={80} />
                    <PlaceholderLine width={width * 0.25} />
                    <PlaceholderLine width={30} />
                </Placeholder>
            </Fragment>
        );
    }

    renderMainContent = () => {

        const { currentlyAtBottom, updateState, allCuts, sheetRef } = this.props;

        const {
            fourthCut 
        } = allCuts;
        // check if currently at very bottom...
        if (currentlyAtBottom === true) {
            return (
                <Fragment>
                    <AwesomeButtonBlue style={styles.absoluteButtonBottom} type={"secondary"} onPress={() => {
                        sheetRef.current.show(fourthCut);
                        updateState(prevState => {
                            return {
                                ...prevState,
                                currentlyAtBottom: false
                            }
                        });
                    }} backgroundShadow={"black"} stretch={true}>Re-Open Pane (Full-View)</AwesomeButtonBlue>
                </Fragment>
            );
        } else {
            const { scrollEnabled, locationsNearby } = this.props;
            return (
                <Fragment>
                    <FlatList
                        contentContainerStyle={{ paddingTop: 23.25 }}
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
                        ref={this.flatListReference}
                        scrollEnabled={scrollEnabled}
                        ListHeaderComponentStyle={styles.listheaderStyles}
                        ListHeaderComponent={this.renderListHeaderOnly}
                        ListEmptyComponent={this.renderSkeletonEmptyList}
                        ListFooterComponent={() => (
                            <Fragment>
                                <View style={{ marginBottom: 225 }} />
                            </Fragment> 
                        )}
                        keyExtractor={(item) => `${item.id}`}
                        data={locationsNearby}
                        renderItem={this.renderListItem}
                    />
                </Fragment>
            );
        }
    }

    render () {
        // const { currentlyAtBottom } = this.props;
        // return main data/chunk JSX/html...
        return (
            <Fragment>
                <View style={styles.slightPaddingWrapper}>
                    {this.renderMainContent()}
                    {/* {!currentlyAtBottom ? this.renderButtonsPerNavigation() : null} */}
                </View>
            </Fragment>
        );
    }
};

export default PaneMapDisplayFiltrationResultsHelper;