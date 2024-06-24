import React, { Fragment, useEffect, useRef, useState } from "react";
import styles from "./viewActiveContractListStyles.js";
import { View, Text, Image, Dimensions, TouchableOpacity, FlatList, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
import { BASE_URL, BASE_ASSET_URL } from "@env";
import axios from "axios";
import RBSheet from "react-native-raw-bottom-sheet";
import { Colors, Sizes, Fonts } from "../../../../constants/styles";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import QRCode from 'react-native-qrcode-svg';
import uuid from "react-native-uuid";

const { width, height } = Dimensions.get('screen');

const ViewingAllActiveContractDropOffList = ({ authData  }) => {
    const sheetRef = useRef(null);
    const sheetRefSecondary = useRef(null);
    const [ state, setState ] = useState({
        availableResults: [],
        selected: null,
        paneIsOpen: false,
        weight: 0,
        ready: false,
        url: null,
        passcode: ""
    });
    
    const handlePress = () => {};

    
    useEffect(() => {
        if (state.selected && state.selected.product && state.selected.product.cartData) {
            checkUrls(state.selected.product.cartData);
        }
    }, [state.selected !== null ? state.selected.product.cartData.length : null]);

    const checkUrl = async (url) => {
        try {
          const response = await fetch(url, { method: 'HEAD' });
          return response.ok;
        } catch (error) {
          return false;
        }
    };

    const checkUrls = async (cartData) => {
        const itemsWithStatus = await Promise.all(
            cartData.map(async (item) => {
                const status = await checkUrl(item["Picture URL"]);
                return { ...item, urlStatus: status };
            })
        );
        setState(prevState => ({ 
            ...prevState, 
            selected: {
                ...prevState.selected,
                product: {
                    ...prevState.selected.product,
                    cartData: itemsWithStatus
                }
            },
            ready: true
        }));
    };

    useEffect(() => {
        console.log("mounted!");
        
        const configuration = {
            params: {
                uniqueId: authData.uniqueId
            }
        }

        axios.get(`${BASE_URL}/gather/dropoffs/contracts/pending`, configuration).then((res) => {
            if (res.data.message === "Gathered data successfully!") {
                console.log("resdata", res.data);

                const { dropoffs } = res.data;

                setState(prevState => ({ ...prevState, availableResults: dropoffs }))
            } else {
                console.log("errrrrr", res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    console.log("state.availableResults", state.availableResults);

    const handleFetchAdditionalDetails = (product, item) => {
        console.log("product, item", product, item);

        const config = {
            params: {
                uniqueId: authData.uniqueId
            }
        }

        axios.get(`${BASE_URL}/gather/general/information/user`, config).then((res) => {
            if (res.data.message === "Gathered user successfully!") {
                console.log(res.data);

                const { user } = res.data;

                const configInner = {
                    uniqueId: authData.uniqueId,
                    cartData: item.cartData
                }
        
                axios.post(`${BASE_URL}/calculate/weight/via/ai`, configInner).then((res) => {
                    if (res.data.message === "Successfully processed the desired data and calculated weight!") {
                        console.log(res.data);
        
                        const { weight, totalWeightKg } = res.data;
        
                        setState(prevState => ({ ...prevState, selected: { product: item, profilePicOtherUser: _.has(user, "profilePictures") && user.profilePictures.length > 0 ? `${BASE_ASSET_URL}/${user.profilePictures[user.profilePictures.length - 1].link}` : null, userData: user}, weight: totalWeightKg, passcode: item.code  }))
        
                        checkUrls(item.cartData);

                        setTimeout(() => {
                            sheetRef.current.open();
                        }, 575)
                    } else {
                        console.log("Err", res.data);
                    }
                }).catch((err) => {
                    console.log(err);
                });

                setState(prevState => ({ ...prevState, selected: { product: item, profilePicOtherUser: _.has(user, "profilePictures") && user.profilePictures.length > 0 ? `${BASE_ASSET_URL}/${user.profilePictures[user.profilePictures.length - 1].link}` : null, userData: user } }))

                checkUrls(item.cartData);

                setTimeout(() => {
                    sheetRef.current.open();
                }, 575)
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    const splitWeightString = (weightString) => {
        const regex = /^(\d+)([a-zA-Z]+)$/;
        const match = weightString.match(regex);
        
        if (match) {
            return {
                value: parseInt(match[1], 10), // Convert the numeric part to an integer
                unit: match[2] // The unit part
            };
        } else {
            console.log("Invalid weight string format");
        }
    }

    const calculateWeight = (cartitems) => {
        const parseMeasurement = (measurement) => {
            console.log("measurement", measurement);

            if (typeof measurement !== "undefined") {
                const words = measurement.trim().split(/\s+/); // Split by one or more whitespace characters

                if (words.length === 2) {
                    if (!measurement || typeof measurement !== 'string') {
                        console.log("Invalid measurement input");
                    }
                
                    const regex = /^(\d+)(\D+)$/; // Regular expression to split numbers and non-numeric characters
                    const match = measurement.match(regex);

                    if (match) {
                        const value = parseInt(match[1], 10); // Convert numeric part to an integer
                        const unit = match[2].trim(); // Get the unit and trim any extra spaces
                
                        return {
                            value: value,
                            unit: unit
                        };
                    } else {
                        return {
                            value: 0,
                            unit: "unknown"
                        }
                    }
                } else {                
                    const value = parseInt(measurement, 10); // Convert numeric part to an integer
                    const result = splitWeightString(measurement);
                    
                    console.log("result result result result result ", result); 
                    return {
                        value: value,
                        unit: "pending"
                    };
                }
            }
        }; 
        const calculateTypeWeight = (item) => {
            if (typeof item["Weight (g)"] !== "undefined") {
                return item["Weight (g)"];
            } else if (typeof item["Weight (kg)"] !== "undefined") {
                return item["Weight (kg)"];
            } else if (typeof item["Weight (with stand)"] !== "undefined") {
                return item["Weight (with stand)"];
            } else if (item.Weight) {
                return item.Weight;
            }
        }
        return cartitems.map((item, index) => {
            const parsed = parseMeasurement(calculateTypeWeight(item));
            console.log("parsedparsedparsedparsedparsedparsed", parsed); // { value: 579, unit: 'g' }
        })
    };

    const handleInitiationDropoffTransfer = () => {
        console.log("handleInitiationDropoffTransfer clicked/ran...");

        const { passcode, weight, selected } = state;

        const configInner = {
            uniqueId: authData.uniqueId,
            cartData: selected.product.cartData,
            weight,
            cartDataID: selected.product.id,
            passcode
        }

        axios.post(`${BASE_URL}/handle/initiation/dropoff/generate`, configInner).then((res) => {
            if (res.data.message === "Successfully processed and initiated!") {
                console.log(res.data);

                const { url } = res.data;

                setState(prevState => ({ ...prevState, url }));
                
                sheetRef.current.close();
                
                setTimeout(() => {
                    sheetRefSecondary.current.open();
                }, 1075)
            } else {
                console.log("Err", res.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    const { selected } = state;

    console.log("state.selected", state.selected);
    return (
        <View style={{ padding: 12.25, backgroundColor: "#fff" }}>
            <RBSheet
                ref={sheetRefSecondary}
                onOpen={() => {}}
                dragFromTopOnly={true}
                onClose={() => {
                  
                }}
                closeOnDragDown={false}
                closeOnPressMask={true}
                height={height * 0.7250}
                openDuration={250}
                customStyles={{
                    container: {
                        paddingHorizontal: Sizes.fixPadding * 2.0,
                    },
                    draggableIcon: {
                        width: width * 0.725
                    }
                }}
            >
                <View style={{ margin: 12.25 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 18.25, marginBottom: 15, color: "darkred" }}>Show this QR Code to your dropoff-depot once you arrive.</Text>
                    <QRCode
                        value={_.has(state, "url") ? state.url : "https://www.google.com/"}
                        size={width * 0.825}
                    />
                    <View style={styles.hr} />
                    <Text style={{ fontWeight: "bold", color: "black", textAlign: "center" }}>Show this code to the recieving dropoff depot manager:</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 45, textAlign: "center", textDecorationLine: "underline", color: "red" }}>{state.passcode}</Text>
                </View>
            </RBSheet>
            <RBSheet
                ref={sheetRef}
                onOpen={() => {}}
                dragFromTopOnly={true}
                onClose={() => {
                    setState(prevState => ({ ...prevState, ready: false }));
                }}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={((height * 0.20) - 67.5) * 5}
                openDuration={250}
                customStyles={{
                    container: {
                        paddingHorizontal: Sizes.fixPadding * 2.0,
                    },
                    draggableIcon: {
                        width: width * 0.725
                    }
                }}
            >
                {selected && selected.product && selected.product.cartData && (
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }} style={{ margin: 12.25 }}>
                        <View style={styles.container}>
                            <ImageBackground source={{ uri: selected.userData.coverPhoto ? `${BASE_ASSET_URL}/${selected.userData.coverPhoto.link}` : "" }} style={styles.header}>
                                <Image style={styles.avatar} source={{ uri: selected.profilePicOtherUser }}/>
                                <View style={styles.informationContainer}>
                                    <Text style={styles.name}>{`${selected.userData.firstName} ${selected.userData.lastName}`}</Text>
                                    <Text style={styles.label}>{selected.userData.verficationCompleted ? "Verified" : "Not Verified"}</Text>
                                    <Text style={styles.label}>Registered: {moment(selected.userData.registrationDate).format("MM/DD/YYYY")}</Text>
                                    <Text style={styles.label}>Username: {selected.userData.username}</Text>
                                    <Text style={styles.label}>{selected.userData.activeRequestedShippingData ? selected.userData.activeRequestedShippingData.length : 0} active transactions</Text>
                                </View>
                            </ImageBackground>
                            
                            <View style={styles.section}>
                                <View style={styles.sectionHeader}>
                                    <Text style={[styles.sectionTitle, { color: "#000" }]}>Cart-Data & Additional Information</Text>
                                </View>
                                <Text style={{ color: "blue" }}><Text style={{ color: "#000" }}>Total Devices in load:</Text> {selected.product.cartData.length} total items with approx weight of {`${state.weight.toFixed(2)} kg.`}</Text>
                                <View style={styles.sectionBody}>
                                    <ScrollView horizontal contentContainerStyle={styles.sectionScroll}>
                                        {selected.product.cartData.map((item, index) => {
                                            return (
                                                <View style={styles.sectionCard} key={index}>
                                                    {item.urlStatus === true ? (
                                                        <Image style={styles.sectionImage} source={{ uri: item["Picture URL"] }} />
                                                    ) : (
                                                        <Image style={styles.sectionImage} source={require("../../../../assets/images/noimagefound.png")} />
                                                    )}
                                                    <View style={styles.sectionInfo}>
                                                        <Text style={styles.sectionLabel}>{item.Brand} {item.Model}</Text>
                                                        <Text style={styles.sectionLabel}>Category: {item.category}</Text>
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </ScrollView>
                                </View>
                                <View style={styles.centered}>
                                    <AwesomeButtonBlue textColor={"#fff"} backgroundShadow={"black"} backgroundDarker={"#000"} backgroundColor={Colors.primaryColor} style={styles.buttonSearchWithCriteria} onPress={() => handleInitiationDropoffTransfer()} stretch={true}>Initiate Transfer</AwesomeButtonBlue>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                )}
            </RBSheet>
            <View style={styles.wrapperMain}>
                <FlatList
                    data={state.availableResults}
                    ListEmptyComponent={() => (
                        <Fragment>
                            <Placeholder
                                Animation={Fade}
                                Left={props => (
                                    <PlaceholderMedia
                                        isRound={true}
                                        style={[styles.placeholderMediaSmaller, props.style]}
                                    />
                                )}
                            >
                                <PlaceholderLine width={80} />
                                <PlaceholderLine width={width * 0.25} />
                                <PlaceholderLine width={30} />
                            </Placeholder>
                            <Placeholder
                                Animation={Fade}
                                Left={props => (
                                    <PlaceholderMedia
                                        isRound={true}
                                        style={[styles.placeholderMediaSmaller, props.style]}
                                    />
                                )}
                            >
                                <PlaceholderLine width={80} />
                                <PlaceholderLine width={width * 0.25} />
                                <PlaceholderLine width={30} />
                            </Placeholder>
                            <View style={styles.hr} />
                            <View style={styles.centered}>
                                <Text style={styles.mainTextPlaceholder}>No results could be found ~ check back soon for newly posted listings...</Text>
                                <Image source={require("../../../../assets/images/noresultsfounddata.png")} style={styles.maxedDesignedIcon} />
                            </View>
                            <View style={[styles.hr, { marginBottom: 32.25 }]} />
                            <Placeholder
                                Animation={Fade}
                                Left={props => (
                                    <PlaceholderMedia
                                        isRound={true}
                                        style={[styles.placeholderMediaSmaller, props.style]}
                                    />
                                )}
                            >
                                <PlaceholderLine width={80} />
                                <PlaceholderLine width={width * 0.25} />
                                <PlaceholderLine width={30} />
                            </Placeholder>
                            <Placeholder
                                Animation={Fade}
                                Left={props => (
                                    <PlaceholderMedia
                                        isRound={true}
                                        style={[styles.placeholderMediaSmaller, props.style]}
                                    />
                                )}
                            >
                                <PlaceholderLine width={80} />
                                <PlaceholderLine width={width * 0.25} />
                                <PlaceholderLine width={30} />
                            </Placeholder>
                            <Placeholder
                                Animation={Fade}
                                Left={props => (
                                    <PlaceholderMedia
                                        isRound={true}
                                        style={[styles.placeholderMediaSmaller, props.style]}
                                    />
                                )}
                            >
                                <PlaceholderLine width={80} />
                                <PlaceholderLine width={width * 0.25} />
                                <PlaceholderLine width={30} />
                            </Placeholder>
                            <Placeholder
                                Animation={Fade}
                                Left={props => (
                                    <PlaceholderMedia
                                        isRound={true}
                                        style={[styles.placeholderMediaSmaller, props.style]}
                                    />
                                )}
                            >
                                <PlaceholderLine width={80} />
                                <PlaceholderLine width={width * 0.25} />
                                <PlaceholderLine width={30} />
                            </Placeholder>
                        </Fragment>
                    )}
                    renderItem={({ item }) => (
                        <View style={styles.card} onPress={handlePress}>
                            <View style={styles.cardContent}>
                                <Text style={[styles.productPrice, { color: "blue" }]}>Delivery/Drop-off date: {moment(item.dateTimeDelivery).format("MM/DD/YYYY hh:mm:ss a")}</Text>
                                <ScrollView horizontal style={styles.imagesContent}>
                                    {item.cartData.map((product, index) => (
                                        <TouchableOpacity onPress={() => {
                                            handleFetchAdditionalDetails(product, item)
                                        }} key={`${item.id}_${index}`}>
                                            <Image style={styles.productImage} source={{ uri: product["Picture URL"] }} />
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <Text style={styles.productName}>{item.noteText}</Text>
                                <Text style={styles.productPrice}>{item.intervalOfDeliveryFromDate} {item.intervalTimeMeasurement} delivery timespan</Text>
                            </View>
                            <View style={styles.cardActions}>
                                <TouchableOpacity style={styles.button} onPress={() => {}}>
                                    <Text style={styles.buttonText}>Start Delivery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => {}}>
                                    <Text style={styles.buttonText}>More Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </View>
    );
};

const mapStateToProps = (state) => ({
    currentLocation: state.location.currentLoc,
    authData: state.auth.data
});

export default connect(mapStateToProps, {})(ViewingAllActiveContractDropOffList);