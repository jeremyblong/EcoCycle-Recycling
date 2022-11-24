import React, { Fragment, useState, useRef, useEffect } from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from "./mainDropoffDeliveriesViewStyles.js";
import customMapStyle from "../../component/JSONStyles/mapStyle.js";
import RBSheet from "react-native-raw-bottom-sheet";
import PaneSheetSelectTransportType from "./helpers/sheetPanes/mainMapPane/pane.js";      
import { Colors, Sizes, Fonts } from "../../constants/styles.js"; 
import axios from "axios";
import { BASE_URL } from "@env";
import Geolocation from '@react-native-community/geolocation';
import { connect } from "react-redux";
import Toast from 'react-native-toast-message';
import MapViewDirections from 'react-native-maps-directions';
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import PaneSheetDetailsHelper from "./helpers/sheetPanes/detailsPaneSheet/pane.js";
import Dialog from "react-native-dialog";
import { useNavigation } from "@react-navigation/native";
import { io } from "socket.io-client";


const socket = io(BASE_URL, { transports: ["websocket"] });

const { width, height } = Dimensions.get("window");

const GOOGLE_MAPS_APIKEY = "API_KEY_HERE";
const COST_PER_MILE = 2.15;

const deafultLocation = { latitude: 45.516869, longitude: -122.682838, latitudeDelta: 0.0325, longitudeDelta: 0.0325 };

const RenderMapViewTransportViewElectronicWaste = ({ storageData, authData }) => {

    const navigation = useNavigation();

    const sheetRef = useRef(null);
    const mapViewRef = useRef(null);
    const detailsSheetRef = useRef(null);
    const markersRef = useRef([]);

    const [ state, setState ] = useState({
        region: { latitude: 45.516869, longitude: -122.682838, latitudeDelta: 0.0325, longitudeDelta: 0.0325 },
        markerMovableCoords: deafultLocation,
        sleeping: false,
        currentlySelected: undefined,
        closable: false,
        paneIsOpen: false,
        selectedInterval: null, //
        locationsNearby: [],
        calloutRelated: {},
        sleepState: false,
        origin: undefined,
        lineset: false,
        destination: undefined,
        detailsClosable: false,
        distanceAndDuration: undefined,
        dialogVisibility: false
    });

    const { region, dialogVisibility, paneIsOpen, distanceAndDuration, closable, selectedInterval, locationsNearby, currentlySelected, origin, destination, markerMovableCoords, detailsClosable } = state;

    const sleepState = (milliseconds) => {

        setState(prevState => {
            return {
                ...prevState,
                sleepingState: true
            }
        })

        return new Promise(resolve => resolve(setTimeout(true, milliseconds)));
    }
    useEffect(() => {
        sheetRef.current.open();

        Geolocation.getCurrentPosition(info => {

            const { latitude, longitude } = info.coords;

            console.log("latitude, longitude", latitude, longitude);

            setState(prevState => {
                return {
                    ...prevState,
                    origin: [latitude, longitude],
                    lineset: true
                }
            })
        
            const currentLoc = { latitude, longitude, latitudeDelta: 0.00875, longitudeDelta: 0.00875 };

            const config = {
                params: {
                    currentLoc
                }
            };

            axios.get(`${BASE_URL}/gather/dropoff/locations/points`, config).then((res) => {
                if (res.data.message === "Gathered relevant location points!") {
                    console.log(res.data);
    
                    const { results } = res.data;

                    setState(prevState => {
                        return {
                            ...prevState,
                            locationsNearby: results
                        }
                    })
    
                    Toast.show({
                        type: 'success',
                        text1: `Successfully gathered the relevant drop-off locations!`,
                        text2: `We've successfully gathered the related drop-off locations which should now be displayed on the appropriate places on the map...`,
                        visibilityTime: 3250,
                        position: "bottom",
                        onHide: () => {}
                    });
                } else {
                    console.log("Err", res.data);
    
                    Toast.show({
                        type: 'error',
                        text1: `An error occurred while fetching relevant results!`,
                        text2: `We've encountered an error while attempting to fetch the desired/relevant drop-off locations, please try to load the page again or contact support if the problem persists...`,
                        visibilityTime: 3250,
                        position: "bottom"
                    });
                }
            }).catch((err) => {
                console.log(err);
    
                Toast.show({
                    type: 'error',
                    text1: `An error occurred while fetching relevant results!`,
                    text2: `We've encountered an error while attempting to fetch the desired/relevant drop-off locations, please try to load the page again or contact support if the problem persists...`,
                    visibilityTime: 3250,
                    position: "bottom"
                });
            })
        });
    }, []);

    const onRegionChangeEnded = (region) => {
        setState(prevState => {
            return {
                ...prevState,
                region
            }
        })
    }   

    const onMarkerMainDragged = (region) => {

        const { latitude, longitude } = region.nativeEvent.coordinate;

        const currentLoc = { latitude, longitude, latitudeDelta: 0.00875, longitudeDelta: 0.00875 };

        if (typeof currentlySelected !== "undefined") {

            const longitudeDestination = currentlySelected.newlyConstructedCoordsRandomizedNearby.coordinates[0];
            const latitudeDestination = currentlySelected.newlyConstructedCoordsRandomizedNearby.coordinates[1];

            setState(prevState => {
                return {
                    ...prevState,
                    markerMovableCoords: currentLoc,
                    origin: [latitude, longitude],
                    destination: [latitudeDestination, longitudeDestination],
                    lineset: true
                }
            });
    
            sleepState(2250).then((identifierID) => {
                // clear previously set interval
                clearTimeout(identifierID);
        
                const config = {
                    params: {
                        currentLoc
                    }
                };
                // handle request...
                axios.get(`${BASE_URL}/gather/dropoff/locations/points`, config).then((res) => {
                    if (res.data.message === "Gathered relevant location points!") {
        
                        const { results } = res.data;

                        setState(prevState => {
                            return {
                                ...prevState,
                                locationsNearby: results,
                                sleepingState: false
                            }
                        })
        
                    } else {
                        console.log("Err", res.data);
    
                        setState(prevState => {
                            return {
                                ...prevState,
                                sleepingState: false
                            }
                        })
                    }
                }).catch((err) => {
                    console.log(err);
    
                    setState(prevState => {
                        return {
                            ...prevState,
                            sleepingState: false
                        }
                    })
                });
            });
        } else {
            
        }
    }  

    const handlePaneOpenOrClose = () => {
        if (!paneIsOpen) {
            sheetRef.current.open();
        } else {
            sheetRef.current.close();
        }
    }

    console.log("mapViewRef", mapViewRef);

    const renderLinesetDataDirections = () => {
        if (typeof origin !== "undefined" && typeof destination !== "undefined") {
            return (
                <Fragment>
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        // waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): undefined}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={8}
                        strokeColor={"hotpink"}
                        optimizeWaypoints={true}
                        onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={result => {
                            console.log(`Distance: ${result.distance} km`);
                            console.log(`Duration: ${result.duration} min.`);

                            setState(prevState => {
                                return {
                                    ...prevState,
                                    distanceAndDuration: {
                                        distance: result.distance,
                                        duration: result.duration
                                    }
                                }
                            })

                            mapViewRef.current.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: (width * 0.1475),
                                    bottom: (height * 0.1475),
                                    left: (width * 0.1475),
                                    top: (height * 0.1475),
                                },
                                animated: false
                            });
                        }}
                        onError={(error) => console.log("Errrrrrrrrrrrrrrr MapViewDirections:", error)}
                    />
                </Fragment>
            );
        } else {
            return null;
        }
    } 
    const selectThisItem = () => {
        console.log("selectThisItem clicked/ran...");

        const config = {
            authData,
            currentlySelected,
            selectedInterval,
            distanceAndDuration,
            calculateValuePerMile
        }

        new Promise((resolve, reject) => {
            axios.post(`${BASE_URL}/post/new/request/available/collection/item`, config).then((res) => {
                if (res.data.message === "Successfully added item to queue!") {

                    const { listing } = res.data;

                    resolve(listing);
                } else {
                    resolve(null);
                }
            }).catch((err) => {
                console.log("err with request...: ", err);

                resolve(null);
            })
        }).then((listing) => {
            if (listing !== null) {

                socket.emit("new-available-electronic-delivery", listing);
                
                setState(prevState => {
                    return {
                        ...prevState,
                        selectedInterval: null
                    }
                })

                detailsSheetRef.current.close();

                Toast.show({
                    type: 'success',
                    text1: `We've SUCCESSFULLY posted your request, you will now be re-directed!`,
                    text2: `We've successfully posted/sent your request - we will now re-direct you where we'll wait to locate a driver to pickup your electronics for delivery!`,
                    visibilityTime: 2750,
                    position: "bottom",
                    onHide: () => navigation.replace("DrivingSelectingPendingView", { selected: currentlySelected })
                });
            } else {
                
                Toast.show({
                    type: 'error',
                    text1: `We encountered an error while attempting to post your request!`,
                    text2: `We've encountered an error while trying to process your request, please try the action again or contact support if the problem persists...`,
                    visibilityTime: 2750,
                    position: "bottom"
                });
            }
        })
    }

    useEffect( () => () => {
        
        console.log("unmount");

        setState({
            region: { latitude: 45.516869, longitude: -122.682838, latitudeDelta: 0.0325, longitudeDelta: 0.0325 },
            markerMovableCoords: deafultLocation,
            sleeping: false,
            currentlySelected: undefined,
            closable: false,
            paneIsOpen: false,
            selectedInterval: null, //
            locationsNearby: [],
            calloutRelated: {},
            sleepState: false,
            origin: undefined,
            lineset: false,
            destination: undefined,
            detailsClosable: false,
            distanceAndDuration: undefined
        });

        sheetRef.current.close();
    }, []);

    console.log("distanceAndDuration", distanceAndDuration);

    const calculateValuePerMile = (miles) => {
        return (COST_PER_MILE * miles).toFixed(2);
    }

    const renderNextAction = () => {
        if (selectedInterval !== null) {

            const renderSelectedOrNot = () => {
                if (typeof currentlySelected !== "undefined" && (JSON.stringify(markerMovableCoords) !== JSON.stringify(deafultLocation))) {
                    return (
                        <Fragment>
                            <View style={styles.backgroundRoundedSimple}>
                                <Text style={styles.selectedDataText}>You've Selected <Text style={styles.emphisizedText}>{selectedInterval.label}</Text></Text>
                                <View style={styles.margined}>
                                    <AwesomeButtonBlue type={"secondary"} style={styles.buttonSearchWithCriteria} onPress={() => {
                                        detailsSheetRef.current.open();
                                    }} stretch={true}>View Drop-Off Info/Data...</AwesomeButtonBlue>
                                </View>
                                {typeof distanceAndDuration !== "undefined" ? <View style={styles.columnOnly}><Text style={styles.selectedDataTextBottom}>This location is approx. <Text style={styles.emphisizedTextRed}>{`${distanceAndDuration.distance.toFixed(2)} mile's`}</Text> at about <Text style={styles.emphisizedText}>{`${distanceAndDuration.duration.toFixed(2)} min's`} transit</Text> at <Text style={styles.greenCashText}>{`$${(calculateValuePerMile(distanceAndDuration.distance))} (USD) total`}</Text>...</Text></View> : null}
                            </View>
                        </Fragment>
                    );
                } else {
                    return (
                        <Fragment>
                            <View style={styles.backgroundRoundedSimpleDefaulted}>
                                <Text style={styles.selectedDataText}>You've Selected <Text style={styles.emphisizedText}>{selectedInterval.label}</Text>, please move the main-marker to see appropriate route's...</Text>
                                {typeof distanceAndDuration !== "undefined" ? <View style={styles.columnOnly}><Text style={styles.selectedDataTextBottom}>This location is approx. <Text style={styles.emphisizedTextRed}>{`${distanceAndDuration.distance.toFixed(2)} mile's`}</Text> at about <Text style={styles.emphisizedText}>{`${distanceAndDuration.duration.toFixed(2)} min's`} transit</Text>...</Text></View> : null}
                            </View>
                        </Fragment>
                    );
                }
            }
            return (
                <Fragment>
                    {renderSelectedOrNot()}
                </Fragment>
            );
        }
    }
    const renderModalConfirmationContinuation = () => {
        return (
            <Dialog.Container visible={dialogVisibility}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={styles.modalTitleText}>
                        Are you sure you'd like to select this dropoff "dropoff depot" to have your electronics delivered to? {"\n"}{"\n"}This WILL INITIATE a request for a driver to come to your house and pickup said electronics immediately upon acceptance {"(typically <= 5min)"}
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
                            onPress={() => setState(prevState => {
                                return {
                                    ...prevState,
                                    dialogVisibility: false
                                }
                            })}
                            style={styles.cancelButtonStyle}
                        > 
                            <Text style={{ ...Fonts.black20Regular, color: "#fff", textAlign: "center", fontWeight: "bold" }}>Abandon Request...</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {

                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        dialogVisibility: false
                                    }
                                })

                                selectThisItem();
                            }}
                            style={styles.dialogYesButtonStyle}
                        >
                            <Text style={{ ...Fonts.white20Regular, color: "#fff", textAlign: "center", fontWeight: "bold" }}>Start Delivery!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    return (
        <Fragment>
            {renderModalConfirmationContinuation()}
            <RBSheet
                ref={sheetRef}
                onOpen={() => {
                    setState(prevState => {
                        return {
                            ...prevState,
                            paneIsOpen: true
                        }
                    });
                }}
                onClose={() => {
                    setState(prevState => {
                        return {
                            ...prevState,
                            paneIsOpen: false
                        }
                    });
                }}
                closeOnDragDown={closable}
                closeOnPressMask={closable}
                height={!closable ? ((height * 0.20) - 75) * 5 : ((height * 0.20) - 67.5) * 5}
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
                <PaneSheetSelectTransportType selectedInterval={selectedInterval} sheetRef={sheetRef} updateParentState={setState} />
            </RBSheet>
            <RBSheet
                ref={detailsSheetRef}
                onClose={() => {
                    setState(prevState => {
                        return {
                            ...prevState,
                            currentlySelected: undefined
                        }
                    });
                }}
                closeOnDragDown={detailsClosable}
                closeOnPressMask={detailsClosable}
                height={height * 0.8425}
                openDuration={250}
                customStyles={{
                    container: {
                        paddingHorizontal: Sizes.fixPadding * 0.625
                    },
                    draggableIcon: {
                        width: width * 0.725
                    }
                }}
            >
                <PaneSheetDetailsHelper authData={authData} currentlySelected={currentlySelected} detailsSheetRef={detailsSheetRef} updateParentState={setState} />
            </RBSheet>
            {renderNextAction()}
            <TouchableOpacity onPress={() => handlePaneOpenOrClose()} style={styles.bottomRightAlignedTouchable}>
                {!paneIsOpen ? <Image source={require("../../assets/images/icon/open-sign.png")} style={styles.bottomRightAlignedTouchableImage} /> : <Image source={require("../../assets/images/icon/close-sign.png")} style={styles.bottomRightAlignedTouchableImage} />}
            </TouchableOpacity>
            <MapView
                showsTraffic={true}
                rotateEnabled={false}
                customMapStyle={customMapStyle}
                onRegionChangeComplete={onRegionChangeEnded}
                region={region}
                ref={mapViewRef}
                style={styles.map}
                moveOnMarkerPress={false}
                provider={PROVIDER_GOOGLE}
            >
                {renderLinesetDataDirections()}
                <Marker 
                    key={"abc123u2i34923jrlakdjfadfjk"}
                    onDragEnd={onMarkerMainDragged}
                    draggable={true}
                    coordinate={markerMovableCoords}
                    title={"This is your current location"}
                    description={"Move the map to reveal new \nout-of-bounds reports/incidents..."}
                />
                {typeof locationsNearby !== "undefined" && locationsNearby.length > 0 ? locationsNearby.map((location) => {
                    // deconstruct variables...
                    const { newlyConstructedCoordsRandomizedNearby, postedByUsername, postedByName, likes, dislikes } = location;
                    const longitude = newlyConstructedCoordsRandomizedNearby.coordinates[0];
                    const latitude = newlyConstructedCoordsRandomizedNearby.coordinates[1];
                    // return JSX data...
                    return (
                        <Marker
                            key={location.id}
                            coordinate={{ latitude, longitude, latitudeDelta: 0.00875, longitudeDelta: 0.00875 }}
                            onPress={(e) => {
                                console.log("selected.........");
                                
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        currentlySelected: location
                                    }
                                })
                            }}
                            description={`${postedByUsername} \n${likes}/${dislikes} ~ likes/dislikes`}
                            title={`Posted by ${postedByName}`}
                        >
                            <Image
                                source={require("../../assets/images/icon/marker-callout.png")}
                                style={{ width: 37.5, height: 42.5, maxWidth: 37.5, maxHeight: 47.5, minHeight: 47.5 }}
                                resizeMode={"contain"}
                            />
                        </Marker>
                    );
                }) : null}
            </MapView>
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        storageData: state.storage.data,
        authData: state.auth.data
    }
}
export default connect(mapStateToProps, { })(RenderMapViewTransportViewElectronicWaste);
