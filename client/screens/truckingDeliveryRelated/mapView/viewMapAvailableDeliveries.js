import React, { Fragment, useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions, Keyboard } from "react-native";
import styles from "./viewMapAvailableDeliveriesStyles.js";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import customMapStyle from "../../../component/JSONStyles/mapStyle.js";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import SlidingUpPanel from 'rn-sliding-up-panel'; 
import PaneMapDisplayFiltrationResultsHelper from "./helpers/paneRelated/pane.js";        
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL, BASE_ASSET_URL, TOMTOM_API_KEY } from "@env";
import CustomCalloutRenderPopupViewMapHelperAvailableDeliveries from "./callout/calloutHelper.js";
import _ from "lodash";
import Toast from 'react-native-toast-message';


const { height } = Dimensions.get("window");

const firstCut = height * 0.215;
const secondCut = height * 0.3825;
const thirdCut = height * 0.6000;
const fourthCut = height * 0.775;
const fifthCut = height * 0.9875;

const allCuts = {
    firstCut,
    secondCut,
    thirdCut, 
    fourthCut,
    fifthCut
}

const ViewMapAvailableDeliveriesContracts = (props) => {

    const navigation = useNavigation();

    const sheetRef = useRef(null);
    const searchingZipCodeRef = useRef(null);

    const [ state, setState ] = useState({
        searchValue: "",
        region: { latitude: 45.516869, longitude: -122.682838, latitudeDelta: 0.0325, longitudeDelta: 0.0325 },
        currentDragValue: null,
        currentlyAtBottom: false,
        scrollEnabled: false,
        sleeping: false,
        locationsNearby: [],
        markerCalloutRelated: {},
        currentSelectedIndex: undefined,
        focussed: false
    });

    const { locationsNearby, sleeping, searchValue, focussed } = state;

    useEffect(() => {
        sheetRef.current.show(secondCut);
    }, [])

    const sleepState = (milliseconds) => {
        
        setState(prevState => {
            return {
                ...prevState,
                sleeping: true
            }
        })

        return new Promise(resolve => resolve(setTimeout(true, milliseconds)));
    }

    const onRegionChangeEnded = (region) => {
        if (state.markerCalloutRelated[state.currentSelectedIndex]) {
            console.log("callout is already open... do nothing");

        } else {
            setState(prevState => {
                return {
                    ...prevState,
                    region
                }
            })
            console.log("START sleeeeeeeeep...");
            
            if (sleeping === false) {
                console.log("sleeping === false... run");
    
                sleepState(2250).then((identifierID) => {
                    // clear previously set interval
                    clearTimeout(identifierID);
                    
                    const { latitude, longitude } = region;
                        
                    const currentLoc = { latitude, longitude, latitudeDelta: 0.00875, longitudeDelta: 0.00875 };
            
                    const config = {
                        params: {
                            currentLoc
                        }
                    };
                    // handle request...
                    axios.get(`${BASE_URL}/gather/dropoff/locations/points/transport/freight`, config).then((res) => {
                        if (res.data.message === "Gathered relevant location points!") {
            
                            console.log(res.data);
            
                            const { results } = res.data;

                            const createMarkerRefsPromise = new Promise((resolve, reject) => {
                                const newlyConstructedReformatted = {}; // markerCalloutRelated
                                const newResultsArr = [];

                                for (let idxxxxx = 0; idxxxxx < results.length; idxxxxx++) {
                                    const iterated = results[idxxxxx];

                                    console.log("iterated", iterated);

                                    iterated.reformattedImages = [];
                                    
                                    newlyConstructedReformatted[idxxxxx] = false;

                                    const { attachedImages } = iterated.mainData;

                                    console.log("attachedImages", attachedImages);

                                    if (typeof attachedImages !== "undefined" && attachedImages.length > 0) {
                                        for (let index = 0; index < attachedImages.length; index++) {
                                            const defaultImage = attachedImages[index];
                                            
                                            iterated.reformattedImages.push(`${BASE_ASSET_URL}/${defaultImage.link}`);
                                        }
                                    }
                                    // push newely modified obj back into new array to map
                                    newResultsArr.push(iterated);
                                    // check if last item in array... then stop!
                                    if ((results.length - 1) === idxxxxx) {
                                        resolve({
                                            newlyConstructedReformatted,
                                            newResultsArr
                                        });
                                    }
                                }
                            });

                            createMarkerRefsPromise.then((passedValues) => {
                                console.log("passedValues...:", passedValues);

                                const {
                                    newlyConstructedReformatted,
                                    newResultsArr
                                } = passedValues;

                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        sleeping: false,
                                        locationsNearby: newResultsArr,
                                        markerCalloutRelated: newlyConstructedReformatted
                                    }
                                })
                            });
                        } else {
                            console.log("Err", res.data);
        
                            setState(prevState => {
                                return {
                                    ...prevState,
                                    sleeping: false
                                }
                            })
                        }
                    }).catch((err) => {
                        console.log(err);
        
                        setState(prevState => {
                            return {
                                ...prevState,
                                sleeping: false
                            }
                        })
                    });
                });;
            };
            console.log("STOP sleeeeeeeeep!!!");
        }
    }   

    const handleNewDataSearch = (zipcode) => {
        axios.get(`https://api.tomtom.com/search/2/structuredGeocode.json?key=${TOMTOM_API_KEY}&countryCode=US&postalCode=${encodeURIComponent(Number(zipcode))}`).then((res) => {
            if (res.data) {
                const { results } = res.data;

                const { lat, lon } = results[0].position;

                const region = { latitude: lat, longitude: lon, latitudeDelta: 0.0525, longitudeDelta: 0.0525 };

                setState(prevState => {
                    return {
                        ...prevState,
                        region,
                        searchValue: "",
                        focussed: false
                    }
                });

                Keyboard.dismiss();
            } 
        }).catch((err) => {
            console.log(err);

            setState(prevState => {
                return {
                    ...prevState,
                    focussed: false
                }
            });

            Toast.show({
                type: 'error',
                text1: `We could NOT process your desired request!`,
                text2: `We could not find an appropriate GEO-location based on the zip-code you've provided - please search again or contact support if the problem persists...`,
                visibilityTime: 4250,
                position: "bottom"
            });
        })
    }
    const handlePaneDraggingEnd = (value, gestureState) => {
        console.log("onDragEnd started/initiated...!", value, gestureState);

        const absSmallest = (arr) => {
            if (!arr || arr.length === 0 ) return 0;
            let res = undefined; 
            for (let i = 0; i < arr.length; i++) {
                if (res === undefined || Math.abs(arr[i]) <= Math.abs(res)) {
                    res = Math.abs(arr[i]) === Math.abs(res) ? Math.max(res, arr[i] ) : res = arr[i];
                }
            }
            return res
        };
        const currentDragValue = Number(value).toFixed(0);

        const diffFirst = currentDragValue - firstCut;
        const diffSecond = currentDragValue - secondCut;
        const diffThird = currentDragValue - thirdCut;
        const diffFourth = currentDragValue - fourthCut;
        const diffFifth = currentDragValue - fifthCut;

        const gatheredValuesAll = [diffFirst, diffSecond, diffThird, diffFourth, diffFifth];
        const resultToMatch = [firstCut, secondCut, thirdCut, fourthCut, fifthCut];

        const matchingResult = absSmallest(gatheredValuesAll);
        const indexedMatch = gatheredValuesAll.findIndex(item => item === matchingResult);

        sheetRef.current.show(resultToMatch[indexedMatch]);
                    
        setState(prevState => {
            return {
                ...prevState,
                currentDragValue
            }
        })
    }
    const handleDragStartCheckChange = (value, gestureState) => {
        console.log("onDragStart started/initiated...!", value, gestureState);
    };
    
    const handleBottomReached = () => {
        console.log("Bottom of pane/sheet reached...!");

        setState(prevState => {
            return {
                ...prevState,
                currentlyAtBottom: true
            }
        })
    }
    const handleRedirectToucableCardClicked = (listing) => {
        console.log("onPress clicked/ran...", listing);

        navigation.navigate("IndividualFreightAvailableListingView", { listing });
    }
    console.log("state.scrollEnabled IS enabled...:", !state.scrollEnabled);
    // return MAIN-data...
    return (
        <Fragment>
            <View style={styles.floatingInputWrapper}>
                <FloatingLabelInput
                    label={`Search a new location (*zipcode*)...`}
                    isPassword={false}
                    focusable={true}
                    isFocused={focussed}
                    ref={searchingZipCodeRef}
                    maxLength={60}
                    onFocus={() => setState(prevState => {
                        return {
                            ...prevState,
                            focussed: true
                        }
                    })}
                    showCountdown={true}
                    rightComponent={<TouchableOpacity onPress={() => handleNewDataSearch(searchValue)}><Image style={styles.innerIconInput} source={require("../../../assets/images/icon/search.png")} /></TouchableOpacity>}
                    togglePassword={false}
                    containerStyles={styles.containerStyles}
                    inputStyles={styles.inputStyles}
                    value={state.searchValue}
                    onChangeText={searchValue => {
                        setState(prevState => {
                            return {
                                ...prevState,
                                searchValue
                            }
                        })
                    }}
                />
            </View>
            <MapView
                showsTraffic={true}
                rotateEnabled={false}
                customMapStyle={customMapStyle}
                onRegionChangeComplete={onRegionChangeEnded}
                region={state.region}
                moveOnMarkerPress={false}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
            >
                <Marker 
                    key={1234}
                    coordinate={state.region}
                    title={"This is your current location"}
                    description={"Moving the map will update the 'pins/markers' that're currently visible..."}
                />
                {typeof locationsNearby !== "undefined" && locationsNearby.length > 0 ? locationsNearby.map((location, index) => {

                    const { newlyConstructedCoordsRandomizedNearby, postedByUsername, postedByName, likes, dislikes } = location;
                    const longitude = newlyConstructedCoordsRandomizedNearby.coordinates[0];
                    const latitude = newlyConstructedCoordsRandomizedNearby.coordinates[1];
                    return (
                        <Fragment>
                            <Marker
                                key={index}
                                coordinate={{ latitude, longitude, latitudeDelta: 0.00875, longitudeDelta: 0.00875 }}
                                title={`Posted by ${postedByName}`}
                                description={`${postedByUsername} \n${likes}/${dislikes} ~ likes/dislikes`}
                                calloutVisible={state.markerCalloutRelated[index]}
                                onCalloutVisibleChange={visible => {
                                    console.log("visible", visible)

                                    setState(prevState => {
                                        return {
                                            ...prevState,
                                            currentSelectedIndex: index
                                        }
                                    })
                                }}
                            >
                                <Image
                                    source={require("../../../assets/images/icon/marker-callout.png")}
                                    style={{ width: 37.5, height: 42.5, maxWidth: 37.5, maxHeight: 47.5, minHeight: 47.5 }}
                                    resizeMode={"contain"}
                                />
                                <Callout tooltip={true} onPress={() => handleRedirectToucableCardClicked(location)} style={styles.calloutMain}>
                                    <CustomCalloutRenderPopupViewMapHelperAvailableDeliveries {...location} />
                                </Callout>
                            </Marker>
                        </Fragment>
                    );
                }) : null}
            </MapView>
            <SlidingUpPanel 
                onBackButtonPress={() => sheetRef.hide()} 
                allowDragging={!state.scrollEnabled} 
                allowMomentum={false} 
                containerStyle={styles.slidingPanelStyles} 
                height={height} 
                snappingPoints={[firstCut, secondCut, thirdCut, fourthCut, fifthCut]} 
                ref={sheetRef}
                draggableRange={{
                    top: fifthCut,
                    bottom: firstCut * 0.5
                }}
                onMomentumDragStart={(value, gestureState) => console.log("onMomentumDragStart started/initiated...!", value, gestureState)}
                onMomentumDragEnd={(value, gestureState) => console.log("onMomentumDragEnd started/initiated...!", value, gestureState)}
                onBottomReached={handleBottomReached}
                onDragStart={handleDragStartCheckChange}
                onDragEnd={handlePaneDraggingEnd}
            >
                <PaneMapDisplayFiltrationResultsHelper locationsNearby={locationsNearby} state={state} navigation={navigation} scrollEnabled={state.scrollEnabled} allCuts={allCuts} updateState={setState} currentlyAtBottom={state.currentlyAtBottom} sheetRef={sheetRef} />
            </SlidingUpPanel>
        </Fragment>
    );
}

export default ViewMapAvailableDeliveriesContracts;