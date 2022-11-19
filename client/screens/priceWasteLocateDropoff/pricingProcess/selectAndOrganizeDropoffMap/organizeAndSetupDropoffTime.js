import React, { Fragment, useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, Image } from "react-native";
import MapView, { Marker, Callout } from 'react-native-maps';
import { connect } from "react-redux";
import customMapStyle from "../../../../component/JSONStyles/mapStyle.js";
import styles from "./organizeAndSetupDropoffTimeStyles.js";
import _ from "lodash";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Geolocation from '@react-native-community/geolocation';
import { Button } from "@rneui/base";
import { useNavigation } from '@react-navigation/native';
import { Colors } from "../../../../constants/styles.js";
import RBSheet from "react-native-raw-bottom-sheet";
import SheetPaneContentDropOffHelper from "./helpers/paneSelection/pane.js";
import SheetPaneQRCodeDataHelper from "./helpers/paneSelection/displayQRCodeData.js";
import { BASE_URL, BASE_ASSET_URL } from "@env";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { Badge } from 'react-native-elements';
import moment from "moment";

const { height } = Dimensions.get("window");


const OrganizeAndSetupDropoffTimeViaMap = ({ location, userData }) => {

    const navigation = useNavigation();

    const [ allowModificationPane, setAllowModificationPane ] = useState(false);
    const [ allowModificationPaneQRCode, setAllowModificationPaneQRCode ] = useState(false);
    const [ nearbyUsers, setNearbyUsers ] = useState([]);

    const sheetRef = useRef(null);
    const sheetRefQRCode = useRef(null);
    
    const [ readyData, setReadyData ] = useState({
        fetched: false,
        ready: false
    });
    const [ currentLocation, setCurrentLocation ] = useState({ latitude: null, longitude: null, latitudeDelta: null, longitudeDelta: null });

    console.log("nearbyUsers state...:", nearbyUsers);

    useEffect(() => {

        setTimeout(() => {
            if (typeof location.coords === 'undefined') {

                Geolocation.getCurrentPosition(info => {
                    console.log("Gathered information correctly - geo: ", info);

                    setCurrentLocation({ latitude: info.coords.latitude, longitude: info.coords.longitude, latitudeDelta: 5, longitudeDelta: 5 });
                });

                setReadyData({
                    fetched: true,
                    ready: true
                });

                sheetRef.current.open();

            } else {

                const { longitude, latitude } = location.coords;

                setCurrentLocation({ latitude: latitude, longitude: longitude, latitudeDelta: 5, longitudeDelta: 5 });

                setReadyData({
                    fetched: false,
                    ready: true
                });

                sheetRef.current.open();
            }
        }, 500);
    }, []);

    const handleNearbyLocationDropoffPointSearch = () => {

        console.log("handleNearbyLocationDropoffPointSearch clicked/ran...", userData);

        const config = {
            params: {
                uniqueId: userData.uniqueId
            }
        };

        axios.get(`${BASE_URL}/gather/nearby/dropoff/locations/points`, config).then((res) => {
            if (res.data.message === "Successfully executed logic!") {

                console.log("ressssssss data:", res.data);

                const { results } = res.data;

                setNearbyUsers(results);
            } else {
                console.log("err", res.data);

                Toast.show({
                    type: 'error',
                    text1: `An error occurred while executing API request.`,
                    text2: `An error occurred while attempting to fetch 'nearby users' in your approx. location/region - please contact support if the problem persists!`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
            }
        }).catch((err) => {
            console.log("err", err);

            Toast.show({
                type: 'error',
                text1: `An error occurred while executing API request.`,
                text2: `An error occurred while attempting to fetch 'nearby users' in your approx. location/region - please contact support if the problem persists!`,
                visibilityTime: 4250,
                position: "bottom"
            });
        })
    }

    if (readyData.ready === true) {
        return (
            <Fragment>
                <View>
                    <RBSheet
                        ref={sheetRef}
                        height={height * 0.875}
                        openDuration={250}
                        closeOnDragDown={allowModificationPane}
                        closeOnPressMask={allowModificationPane}
                        closeOnPressBack={false}
                        customStyles={{
                            container: {
                                backgroundColor: "#000",
                                borderTopColor: "#fff",
                                borderTopWidth: 1.5
                            }
                        }}
                        >
                        <SheetPaneContentDropOffHelper handleNearbyLocationDropoffPointSearch={handleNearbyLocationDropoffPointSearch} currentLocation={currentLocation} setAllowModificationPane={setAllowModificationPane} sheetRef={sheetRef} />
                    </RBSheet>
                    <RBSheet
                        ref={sheetRefQRCode}
                        height={height * 0.875}
                        openDuration={250}
                        closeOnDragDown={allowModificationPaneQRCode}
                        closeOnPressMask={allowModificationPaneQRCode}
                        closeOnPressBack={false}
                        customStyles={{
                            container: {
                                backgroundColor: "#000",
                                borderTopColor: "#fff",
                                borderTopWidth: 1.5
                            }
                        }}
                        >
                        <SheetPaneQRCodeDataHelper sheetRef={sheetRefQRCode} />
                    </RBSheet>
                    {readyData.ready === true ? <MapView
                        customMapStyle={customMapStyle}
                        onRegionChangeComplete={(region) => setCurrentLocation(region)}
                        region={currentLocation}
                        style={styles.map}
                    >
                        <Marker
                            key={1}
                            coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude, latitudeDelta: 5, longitudeDelta: 5 }}
                            title={"Your Current Approx. Location"}
                            description={"This is the approx. location of your estimated current location..."}
                        />
                        {nearbyUsers.map((user, index) => {
                            const { firstName, lastName, username, profilePictures, verificationCompleted, registrationDate, reviews, totalUniqueViews, currentApproxLocation } = user;
                            return (
                                <Fragment key={index}>
                                    <Marker 
                                        image={require("../../../../assets/images/icon/depot.png")}
                                        coordinate={{
                                            latitude: currentApproxLocation.geo.coordinates[0],
                                            longitude: currentApproxLocation.geo.coordinates[1]
                                        }}
                                        title={`${firstName} ${lastName} ~ ${username}`}
                                    >
                                        <Callout onPress={() => navigation.navigate("InitiateDropOffRequestSendNotification", { user  })} tooltip={true}>
                                            <View style={styles.topCalloutContainer}>
                                                <Text style={styles.topCalloutText}>{`${firstName} ${lastName} ~ ${username}`}</Text>
                                                    <Text style={styles.centeredCircleIconWrapper}><Image resizeMode='cover' source={{ uri: typeof profilePictures !== "undefined" && profilePictures.length > 0 ? `${BASE_ASSET_URL}/${profilePictures[profilePictures.length - 1].link}` : `${BASE_ASSET_URL}/no-image.jpg` }} style={styles.centeredCircleIcon} /></Text>
                                            </View>
                                            <View style={styles.bottomCalloutContainer}>
                                                <View style={styles.centered}>
                                                    <View style={styles.rowed}>
                                                        <View style={styles.oneThirdView}>
                                                            <Text style={styles.oneThirdText}>Account Verified?</Text>
                                                            <Badge
                                                                badgeStyle={styles.badgeContainer}
                                                                textStyle={styles.textBadge}
                                                                value={verificationCompleted === true ? "Verified!" : "Not Verified."}
                                                            />
                                                        </View>
                                                        <View style={styles.oneThirdView}>
                                                            <Text style={styles.oneThirdText}>Registered Since</Text>
                                                            <Badge
                                                                badgeStyle={styles.badgeContainer}
                                                                textStyle={styles.textBadge}
                                                                value={moment(registrationDate).fromNow()}
                                                            />
                                                        </View>
                                                        <View style={styles.oneThirdView}>
                                                            <Text style={styles.oneThirdText}>Review's/Profile View's</Text>
                                                            <Badge
                                                                badgeStyle={styles.badgeContainer}
                                                                textStyle={styles.textBadge}
                                                                value={`${typeof reviews !== "undefined" && reviews.length > 0 ? reviews.length : 0} ~ ${totalUniqueViews} reviews/views`}
                                                            />
                                                        </View>
                                                    </View>
                                                    <View style={styles.thinHRBlue} />
                                                    <Button title={"Select & Orchestrate Drop-Off"} buttonStyle={styles.calloutButtonStyle} style={{ width: "100%", marginBottom: 7.5 }} color={Colors.secondaryColor} />
                                                    <View style={styles.thinHRBlue} />
                                                </View>
                                            </View>
                                        </Callout>
                                    </Marker>
                                </Fragment>
                            );
                        })}
                    </MapView> : <Fragment>
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
                        <SkeletonPlaceholder>
                            <View style={{ width: "100%", minHeight: 75, height: 75, borderRadius: 42.5 }} />
                        </SkeletonPlaceholder>
                        <View style={{ marginTop: 7.5 }} />
                        <SkeletonPlaceholder>
                            <View style={{ width: "100%", minHeight: 75, height: 75, borderRadius: 42.5 }} />
                        </SkeletonPlaceholder>
                    </Fragment>}
                    <Button onPress={() => sheetRef.current.open()} title={"Open/Populate Selected QR Item Data"} buttonStyle={styles.buttonStyleBottom} style={{ width: "100%" }} color={Colors.secondaryColor} />
                </View>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <SkeletonPlaceholder>
                    <View style={{ width: "100%", minHeight: 92.5, height: 92.5, borderRadius: 42.5 }} />
                </SkeletonPlaceholder>
                <View style={{ marginTop: 7.5 }} />
                <SkeletonPlaceholder>
                    <View style={{ width: "100%", minHeight: 92.5, height: 92.5, borderRadius: 42.5 }} />
                </SkeletonPlaceholder>
                <View style={{ marginTop: 7.5 }} />
                <SkeletonPlaceholder>
                    <View style={{ width: "100%", minHeight: 92.5, height: 92.5, borderRadius: 42.5 }} />
                </SkeletonPlaceholder>
                <View style={{ marginTop: 7.5 }} />
                <SkeletonPlaceholder>
                    <View style={{ width: "100%", minHeight: 92.5, height: 92.5, borderRadius: 42.5 }} />
                </SkeletonPlaceholder>
                <View style={{ marginTop: 7.5 }} />
                <SkeletonPlaceholder>
                    <View style={{ width: "100%", minHeight: 92.5, height: 92.5, borderRadius: 42.5 }} />
                </SkeletonPlaceholder>
                <View style={{ marginTop: 7.5 }} />
                <SkeletonPlaceholder>
                    <View style={{ width: "100%", minHeight: 92.5, height: 92.5, borderRadius: 42.5 }} />
                </SkeletonPlaceholder>
                <View style={{ marginTop: 7.5 }} />
                <SkeletonPlaceholder>
                    <View style={{ width: "100%", minHeight: 92.5, height: 92.5, borderRadius: 42.5 }} />
                </SkeletonPlaceholder>
                <View style={{ marginTop: 7.5 }} />
                <SkeletonPlaceholder>
                    <View style={{ width: "100%", minHeight: 92.5, height: 92.5, borderRadius: 42.5 }} />
                </SkeletonPlaceholder>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.location.currentLoc,
        hasLocation: _.has(state, "location") && _.has(state.location, "currentLoc") ? true : false,
        userData: state.auth.data
    }
}


export default connect(mapStateToProps, {  })(OrganizeAndSetupDropoffTimeViaMap);