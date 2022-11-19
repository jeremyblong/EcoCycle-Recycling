import React, { Fragment, useState } from "react";
import { Image, Dimensions } from "react-native"
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import CustomCalloutRenderPopupViewMapHelper from "./helpers/customCalloutHelper.js";
import customMapStyle from "../../../component/JSONStyles/mapStyle.js";
import _ from "lodash";
import styles from "./MapViewStyles.js";
import axios from "axios";
import { BASE_URL } from "@env";

const { width, height } = Dimensions.get("window");

const RenderMapViewNearbyUsers = ({ setLocationsNearby, handleRedirectToucableCardClicked, locationsNearby }) => {

    const [region, setRegion] = useState({ latitude: 45.516869, longitude: -122.682838, latitudeDelta: 0.0325, longitudeDelta: 0.0325 });
    const [ sleeping, setSleepingState ] = useState(false);
    const [ calloutRelated, setMarkerCalloutRelated ] = useState({});
    const [ currentSelectedIndex, setCurrentlySelectedIndex ] = useState(undefined);

    const sleepState = (milliseconds) => {
        
        setSleepingState(true);

        return new Promise(resolve => resolve(setTimeout(true, milliseconds)));
    }

    const onRegionChangeEnded = (region) => {
        if (calloutRelated[currentSelectedIndex]) {
            console.log("callout is already open... do nothing");
        } else {
            setRegion(region);

            console.log("START sleeeeeeeeep...");
            
            if (sleeping === false) {
    
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
                    axios.get(`${BASE_URL}/gather/dropoff/locations/points`, config).then((res) => {
                        if (res.data.message === "Gathered relevant location points!") {
            
                            const { results } = res.data;
    
                            const createMarkerRefsPromise = new Promise((resolve, reject) => {
                                const newlyConstructedReformatted = {}; // markerCalloutRelated
    
                                for (let idxxxxx = 0; idxxxxx < results.length; idxxxxx++) {
                                    const iterated = results[idxxxxx];
                                    
                                    newlyConstructedReformatted[idxxxxx] = false;
    
                                    if ((results.length - 1) === idxxxxx) {
                                        resolve(newlyConstructedReformatted);
                                    }
                                }
                            });
    
                            createMarkerRefsPromise.then((passedValues) => {
                                console.log("passedValues...:", passedValues);
    
                                setLocationsNearby(results);
                                setMarkerCalloutRelated(passedValues);
                                setSleepingState(false);
                            });
            
                        } else {
                            console.log("Err", res.data);
        
                            setSleepingState(false);
                        }
                    }).catch((err) => {
                        console.log(err);
        
                        setSleepingState(false);
                    });
                });
            };
            console.log("STOP sleeeeeeeeep!!!");
        }
    }   

    return (
        <Fragment>
            <MapView
                showsTraffic={true}
                rotateEnabled={false}
                customMapStyle={customMapStyle}
                onRegionChangeComplete={onRegionChangeEnded}
                region={region}
                style={styles.map}
                moveOnMarkerPress={false}
                provider={PROVIDER_GOOGLE}
            >
                <Marker 
                    key={1327473457234}
                    coordinate={region}
                    title={"This is your current location"}
                    description={"Move the map to reveal new \nout-of-bounds reports/incidents..."}
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
                                calloutVisible={calloutRelated[index]}
                                onCalloutVisibleChange={visible => {
                                    console.log("visible", visible)

                                    setCurrentlySelectedIndex(index);
                                }}
                            >
                                <Image
                                    source={require("../../../assets/images/icon/marker-callout.png")}
                                    style={{ width: 37.5, height: 42.5, maxWidth: 37.5, maxHeight: 47.5, minHeight: 47.5 }}
                                    resizeMode={"contain"}
                                />
                                <Callout tooltip={true} onPress={() => handleRedirectToucableCardClicked(location)} style={styles.calloutMain}>
                                    <CustomCalloutRenderPopupViewMapHelper {...location} />
                                </Callout>
                            </Marker>
                        </Fragment>
                    );
                }) : null}
            </MapView>
        </Fragment>
    );
}
export default RenderMapViewNearbyUsers;