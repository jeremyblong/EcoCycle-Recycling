import React, { useState, useEffect, Fragment } from 'react';
import styles from "./individualItemSelectionPageStyles.js";
import axios from "axios";
import { BASE_URL } from "@env";
import { ImageBackground, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Fonts, Sizes } from "../../../../constants/styles.js";
import _ from "lodash";
import { useNavigation } from '@react-navigation/native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { saveItemToEWasteCart } from "../../../../redux/actions/ewasteCart/cartLogic.js";
import { connect } from "react-redux";
import Dialog from "react-native-dialog";
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';
import handleSwitchRenderFunction from "./helpers/helperFunctions.js";

const IndividualPageInformationSelectionPage = ({ saveItemToEWasteCart, route, cartData }) => {

    const navigation = useNavigation();

    const [ individual, setIndividual ] = useState(null);
    const [ ready, setReady ] = useState(false);
    const [ confirmationBox, setConfirmationBox ] = useState(false);
    const [ type, setType ] = useState("");
    const [ alreadyAddedConfirmation, setConfirmationAlreadyAddedState ] = useState(false);

    const { item, category } = route.params;

    useEffect(() => {
        handleInitialFetch(null);
    }, []);

    const handleInitialFetch = async () => {
        
        const configuration = {
            params: {
                item,
                category
            }
        }

        const response = await axios.get(`${BASE_URL}/fetch/device/type/individual`, configuration);

        if (response.data.message === "Successfully fetched individual product!") {

            const { result, type } = response.data;

            setIndividual(result);
            // set selected 'product type'
            setType(type);
            // set ready state to display appropriate information
            setReady(true);
        } else {
            console.log("Could NOT find appropriate data from API request.");

            Toast.show({
                type: 'error',
                text1: `Could NOT fetch your item/product...`,
                text2: `We could NOT fetch your item/product properly... Try reloading this page or go back & select another product from the list.`,
                visibilityTime: 4250,
                position: "bottom"
            });
        };
    }

    const getFromCourseInfo = ({ iconName, availability }) => {
        return (
            <View style={styles.getFromCourseInfoContainerStyle}>
                <Image source={require("../../../../assets/images/icon/incident.png")} style={styles.customIconed} />
                <Text style={{ ...Fonts.black17Bold, marginLeft: Sizes.fixPadding * 2.0 }}>
                    {availability}
                </Text>
            </View>
        )
    }
    const handleNormalItemAdditionConfirmed = () => {

        addItemToDropOffCartSelection(individual);

        setConfirmationAlreadyAddedState(false);

        Toast.show({
            type: 'success',
            text1: `Successfully added product to cart!`,
            text2: `You've successfully added this item/product to your list of future items to be exchanged, we will now 'redirect' you to the next page in the process...`,
            visibilityTime: 4250,
            position: "bottom"
        });

        setTimeout(() => {
            navigation.navigate('DropOffInformationDialogMap');
        }, 1250);
    }

    const renderConfirmationModalProductAlreadyExists = () => {
        return (
            <Dialog.Container visible={alreadyAddedConfirmation}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.black18Bold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                        Are you sure you'd like to add this item to your cart? It's apparently already been added but feel free to add it again if you have multiple(s)
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setConfirmationAlreadyAddedState(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black20Regular, color: "#fff" }}>Cancel.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => handleNormalItemAdditionConfirmed()}
                            style={styles.confirmationButtonStyle}
                        >
                            <Text style={{ ...Fonts.white20Regular, color: "#fff" }}>Add To Cart!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    const addToCartDataConfirmationDialog = () => {
        return (
            <Dialog.Container visible={confirmationBox}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.black18Bold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                        Are you sure you'd like to add this item to your cart?
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setConfirmationBox(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black20Regular, color: "#fff" }}>Cancel.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => addItemToDropOffCartSelection(individual)}
                            style={styles.confirmationButtonStyle}
                        >
                            <Text style={{ ...Fonts.white20Regular, color: "#fff" }}>Add To Cart!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    const title = ({ title }) => {
        return (ready === true && individual !== null) ? <Text style={{ ...Fonts.indigoColor18Bold }}>{title}</Text> : null;
    }

    const divider = () => {
        return (
            <View style={{
                backgroundColor: '#E1E1E1',
                height: 2.0,
                marginVertical: Sizes.fixPadding + 5.0
            }}>
            </View>
        )
    }

    const coreInformationData = () => {

        if (ready === true && individual !== null) {

            const FiveStarRatingTotal = Number(individual["5 Stars"]);
            const FourStarRatingTotal = Number(individual["4 Stars"]);
            const ThreeStarRatingTotal = Number(individual["3 Stars"]);
            const TwoStarRatingTotal = Number(individual["2 Stars"]);
            const OneStarRatingTotal = Number(individual["1 Stars"]);

            const compoundedRating = Math.floor(((FiveStarRatingTotal * 5) + (FourStarRatingTotal * 4) + (ThreeStarRatingTotal * 3) + (TwoStarRatingTotal * 2) + (OneStarRatingTotal * 1)) / 5);

            return handleSwitchRenderFunction(compoundedRating, individual, type);
        } else {
            return (
                <View style={{ margin: 15 }}>
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 112.5, height: 112.5, borderRadius: 42.5 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 112.5, height: 112.5, borderRadius: 42.5 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 112.5, height: 112.5, borderRadius: 42.5 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 112.5, height: 112.5, borderRadius: 42.5 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 112.5, height: 112.5, borderRadius: 42.5 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                </View>
            );
        }
    }

    const calculateDeviceTypeReturn = (type) => {
        switch (type) {
            case 'mobiles':
                return "Smartphone(s)";
                break;
            case 'tablets':
                return "Tablet(s)";
                break;
            case 'wearables':
                return "Smartwatch/Wearable(s)";
                break;
            case 'laptops':
                return "Laptop(s)";
                break;
            case 'televisions':
                return "Television(s)";
                break;
            case "gamingconsoles":
                return "Gaming Console(s)";
                break;
            case "cameras":
                return "Camera(s)";
                break;
            default: 
                return "Unknown/Unavailable";
        }
    };

    const addItemToDropOffCartSelection = (selected) => {

        const newItemData = {
            ...selected,
            dateAdded: new Date(),
            uniqueId: uuid.v4(),
            category: type
        }
        if (typeof cartData === "undefined" || (typeof cartData !== "undefined" && cartData.length === 0)) {

            saveItemToEWasteCart([newItemData]);

            setConfirmationBox(false);

            Toast.show({
                type: 'success',
                text1: `Successfully added product to cart!`,
                text2: `You've successfully added this item/product to your list of future items to be exchanged, proceed to 'Drop-off location' selection page to proceed with the next steps...!`,
                visibilityTime: 4250,
                position: "bottom"
            });
        } else {
            saveItemToEWasteCart([...cartData, newItemData]);

            setConfirmationBox(false);

            Toast.show({
                type: 'success',
                text1: `Successfully added product to cart!`,
                text2: `You've successfully added this item/product to your list of future items to be exchanged, proceed to 'Drop-off location' selection page to proceed with the next steps...!`,
                visibilityTime: 4250,
                position: "bottom"
            });
        }
    };

    const handleItemAdditionAndRedirect = () => {

        console.log("cartData", individual);

        if (typeof cartData === "undefined" || (typeof cartData !== "undefined" && cartData.length === 0)) {

            addItemToDropOffCartSelection(individual);
    
            Toast.show({
                type: 'success',
                text1: `Successfully added product to cart!`,
                text2: `You've successfully added this item/product to your list of future items to be exchanged, we will now 'redirect' you to the next page in the process...`,
                visibilityTime: 4250,
                position: "bottom"
            });

            setTimeout(() => {
                navigation.navigate('DropOffInformationDialogMap');
            }, 1250);

        } else {
            const filteredMatch = cartData.filter(product => product.Model.toLowerCase() === individual.Model.toLowerCase()).length === 0;

            if (filteredMatch) {
    
                addItemToDropOffCartSelection(individual);
    
                Toast.show({
                    type: 'success',
                    text1: `Successfully added product to cart!`,
                    text2: `You've successfully added this item/product to your list of future items to be exchanged, we will now 'redirect' you to the next page in the process...`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
    
                setTimeout(() => {
                    navigation.navigate('DropOffInformationDialogMap');
                }, 1250);
            } else {
                setConfirmationAlreadyAddedState(true);
            }
        }
    }

    const calculateTradeInPriceApprox = () => {
        switch (type) {
            case "mobiles": 
                return (2.00 * 0.325).toFixed(2);
                break;
            case "tablets": 
                return (2.75 * 0.325).toFixed(2);
                break;
            case "gamingconsoles": 
                return (1.75 * 0.325).toFixed(2);
                break;
            case "cameras": 
                return (1.35 * 0.325).toFixed(2);
                break;
            case "laptops": 
                return (2.50 * 0.325).toFixed(2);
                break;
            case "televisions": 
                return (3.75 * 0.325).toFixed(2);
                break;
            case "wearables": 
                return (1.00 * 0.325).toFixed(2);
                break;
            default: 
                return "Unknown/Unavailable";
                break;
        }
    }

    const courseInfo = () => {

        if (ready === true && individual !== null) {

            const { Category } = individual;
            
            return (
                <ImageBackground source={{ uri: individual["Picture URL"] }} imageStyle={styles.imageBackImageStyle} style={styles.imagebacked}>
                    <View style={styles.innerTintedContainer}>
                        <Text style={{ ...Fonts.white16SemiBold }}>{`${calculateDeviceTypeReturn(category)}`}</Text>
                        <Text style={{ ...Fonts.white20SemiBold, marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding }}>
                            {`${_.has(individual, "Brand") ? individual.Brand : "No Data Available."} ~ ${_.has(individual, "Model") ? individual.Model : "No Data Available."}`}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ ...Fonts.white16SemiBold }}>
                                    4.75
                                </Text>
                                <Image source={require("../../../../assets/images/icon/vibrantstar_prev_ui.png")} style={styles.customIconed} />
                                <Text style={{ ...Fonts.white16SemiBold }}>
                                    (11 Reviews)
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setConfirmationBox(true)}
                            style={styles.takeTheCourseContainerStyle}>
                            <Text style={{ ...Fonts.white17Bold }}>Select This Product & "Add To Cart"</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => handleItemAdditionAndRedirect()}
                            style={styles.watchTrailerContainerStyle}>
                            <Text style={{ ...Fonts.black17Bold }}>Add & Proceed To "Drop-off" Selection</Text>
                        </TouchableOpacity>
                        <Text style={styles.estimatedTradeText}>
                            Estimated Trade-In Price: ${calculateTradeInPriceApprox()}
                        </Text>
                    </View>
                </ImageBackground>
            )
        } else {
            return (
                <View style={{ margin: 15 }}>
                    <SkeletonPlaceholder>
                        <View style={{ width: "90%", height: 42.5, borderRadius: 42.5 }} />
                        <View style={{ width: "100%", height: 20, borderRadius: 5, marginTop: 10 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "70%", height: 42.5, borderRadius: 42.5 }} />
                        <View style={{ width: "50%", height: 20, borderRadius: 5, marginTop: 10 }} />
                        <View style={{ width: "80%", height: 20, borderRadius: 5, marginTop: 5 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "60%", height: 42.5, borderRadius: 42.5 }} />
                        <View style={{ width: "100%", height: 20, borderRadius: 5, marginTop: 10 }} />
                        <View style={{ width: "40%", height: 20, borderRadius: 5, marginTop: 5 }} />
                        <View style={{ width: "70%", height: 20, borderRadius: 5, marginTop: 5 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "50%", height: 42.5, borderRadius: 42.5 }} />
                        <View style={{ width: "90%", height: 20, borderRadius: 5, marginTop: 10 }} />
                        <View style={{ width: "60%", height: 20, borderRadius: 5, marginTop: 5 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "80%", height: 42.5, borderRadius: 42.5 }} />
                        <View style={{ width: "30%", height: 20, borderRadius: 5, marginTop: 10 }} />
                        <View style={{ width: "100%", height: 20, borderRadius: 5, marginTop: 5 }} />
                    </SkeletonPlaceholder>
                    <SkeletonPlaceholder>
                        <View style={{ width: "90%", height: 42.5, borderRadius: 42.5 }} />
                        <View style={{ width: "100%", height: 20, borderRadius: 5, marginTop: 10 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "70%", height: 42.5, borderRadius: 42.5 }} />
                        <View style={{ width: "50%", height: 20, borderRadius: 5, marginTop: 10 }} />
                        <View style={{ width: "80%", height: 20, borderRadius: 5, marginTop: 5 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "60%", height: 42.5, borderRadius: 42.5 }} />
                        <View style={{ width: "100%", height: 20, borderRadius: 5, marginTop: 10 }} />
                        <View style={{ width: "40%", height: 20, borderRadius: 5, marginTop: 5 }} />
                        <View style={{ width: "70%", height: 20, borderRadius: 5, marginTop: 5 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "50%", height: 42.5, borderRadius: 42.5 }} />
                        <View style={{ width: "90%", height: 20, borderRadius: 5, marginTop: 10 }} />
                        <View style={{ width: "60%", height: 20, borderRadius: 5, marginTop: 5 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "80%", height: 42.5, borderRadius: 42.5 }} />
                        <View style={{ width: "30%", height: 20, borderRadius: 5, marginTop: 10 }} />
                        <View style={{ width: "100%", height: 20, borderRadius: 5, marginTop: 5 }} />
                    </SkeletonPlaceholder>
                </View>
            );
        }
    }

    const renderVariousCourseInfo = () => {
        if (ready === true && individual !== null) {
            return (
                <Fragment>
                    {getFromCourseInfo({
                        iconName: "menu",
                        availability: `${calculateDeviceTypeReturn(category)}`
                    })}
                    {getFromCourseInfo({
                        iconName: 'star-border',
                        availability: _.has(individual, "Product") && _.has(individual.Product, "Brand") ? individual.Product.Brand : "No Data Available."
                    })}
                    {getFromCourseInfo({
                        iconName: "check",
                        availability: _.has(individual, "Product") && _.has(individual.Product, "Model") && _.has(individual.Product, "Version") ? `${individual.Product.Model}/${individual.Product.Version}` : "No Data Available."
                    })}
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 75, height: 75, borderRadius: 42.5 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 75, height: 75, borderRadius: 42.5 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 75, height: 75, borderRadius: 42.5 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 7.5 }} />
                </Fragment>
            );
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                {courseInfo()}
                {renderConfirmationModalProductAlreadyExists()}
                {addToCartDataConfirmationDialog()}
                <View style={(ready === true && individual !== null) ? styles.innerCustomContainerLoaded : styles.innerCustomContainer}>
                    {coreInformationData()}
                    {divider()}
                    {title({ title: 'Main Device Specifications' })}
                    {renderVariousCourseInfo()}
                    {divider()}
                </View>
            </ScrollView>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        cartData: state.cartData.cartData
    }
};

export default connect(mapStateToProps, { saveItemToEWasteCart })(IndividualPageInformationSelectionPage);