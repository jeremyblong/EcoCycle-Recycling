import React, { Fragment, useState, useRef, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import customMapStyle from "../../../../../component/JSONStyles/mapStyle.js";
import stylesOne from "../pageStyles.js";
import stylesTwo from "../../startListingNewSpaceProcessStyles.js";
import {
    View,
    Text,
    Image
} from "react-native";
import { Colors } from "../../../../../constants/styles.js";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";


const styles = { ...stylesOne, ...stylesTwo };

const RenderPageFiveHelperData = ({ renderHeaderLogicData, storageData, handleSubItemSelection }) => {

    const mapReference = useRef(null);

    const [ region, setRegion ] = useState({ latitude: 45.516869, longitude: -122.682838, latitudeDelta: 0.00425, longitudeDelta: 0.00425 });
    const [ markerRegion, setMarkerRegion ] = useState({ latitude: 45.516869, longitude: -122.682838, latitudeDelta: 0.00425, longitudeDelta: 0.00425 });
    const [ movedMarkerPrecise, setMovedMarkerState ] = useState(false);

    useEffect(() => {
        const { latitude, longitude } = storageData.dropoffLocationData;

        // update per previously selected data in earlier pages/screens...
        setRegion({ latitude, longitude, latitudeDelta: 0.00425, longitudeDelta: 0.00425 });
        setMarkerRegion({ latitude, longitude, latitudeDelta: 0.00425, longitudeDelta: 0.00425 });
    }, [])

    const handleMarkerDragEndLogic = (e) => {

        const { latitude, longitude } = e.nativeEvent.coordinate;

        console.log('dragEnd', latitude, longitude);

        setMarkerRegion({ latitude, longitude, latitudeDelta: 0.00425, longitudeDelta: 0.00425 });

        setMovedMarkerState(true);
    }

    const calculatePendingSelection = () => {

        return movedMarkerPrecise === true ? false : true;
    }
    return (
        <View style={{ flex: 1 }}>
            {renderHeaderLogicData("Edit the map pin depicting your stoage point's exact location", "Please be as percise as possible so our delivery driver's can properly find the location...")}
            <View style={{ marginTop: 22.5 }} />
            <View style={styles.shiftLeftWrapper}>
                <MapView
                    showsTraffic={true}
                    rotateEnabled={false}
                    zoomControlEnabled={true}
                    customMapStyle={customMapStyle}
                    onRegionChangeComplete={(region) => setRegion(region)}
                    region={region}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                >
                    <Marker
                        ref={mapReference}
                        draggable={true}
                        onDragEnd={(e) => handleMarkerDragEndLogic(e)}
                        coordinate={markerRegion}
                        position={markerRegion}
                        pinColor={Colors.secondaryColor}
                        onDragStart={(val1, val2) => console.log("onDragStart...:", val1, val2)}
                    />   
                </MapView>
            </View>
            <View style={styles.bottomWrapperContainer}>
                <AwesomeButtonBlue style={styles.absoluteButtonBottom} disabled={calculatePendingSelection()} type={"secondary"} onPress={() => handleSubItemSelection(4, 5, { preciseMarkerCoords: markerRegion })} backgroundShadow={"black"} stretch={true}>Submit & Continue</AwesomeButtonBlue>
            </View>
        </View>
    );
}


export default RenderPageFiveHelperData;