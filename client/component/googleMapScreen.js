import React from "react";
import MapView, { Marker } from "react-native-maps";

const GoogleMap = ({ latitude, longitude, height, pinColor }) => {
    
    console.log("latitude, longitude", latitude, longitude);
    return (
        <MapView
            style={{ height: height }}
            initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.10,
                longitudeDelta: 0.10,
            }}
        >
            <Marker
                coordinate={{ latitude, longitude }}
                pinColor={pinColor}
            />
        </MapView>
    )
}

export default GoogleMap;