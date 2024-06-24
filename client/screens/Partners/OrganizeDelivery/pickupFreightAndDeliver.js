import React, { Fragment, useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity,  PermissionsAndroid, Platform, Image, Dimensions } from "react-native";
import styles from "./pickupFreightAndDeliverStyles.js";
import * as Progress from 'react-native-progress';
import _ from "lodash";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RBSheet from "react-native-raw-bottom-sheet";
import MapView, { Circle, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from "axios";
import { BASE_URL } from "@env";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { Colors, Sizes } from "../../../constants/styles.js";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";

const { width, height } = Dimensions.get("window");

const OrchestratePickupFreightToFacility = ({ authData }) => {
    const refSheet = useRef(null);
    const navigation = useNavigation();

    const [ state, setState ] = useState({
        ready: false,
        currentLoc: { latitude: 39.744137, longitude: -104.950050 },
        locations: [],
        markedDates: {},
        selectedLoc: null
    });

    const handleFetchDataMarkers = () => {
      const currentLoc = { latitude: state.currentLoc.latitude, longitude: state.currentLoc.longitude, latitudeDelta: 0.00875, longitudeDelta: 0.00875 };
      const config = {
        params: {
          currentLoc,
          uniqueId: authData.uniqueId
        }
      };
      // handle request...
      axios.get(`${BASE_URL}/gather/recycling/companies/nearby`, config).then((res) => {
          if (res.data.message === "Gathered relevant location points!") {

              const { results } = res.data;

              setState(prevState => ({ ...prevState, locations: results }))
          } else {
              console.log("Err", res.data);
          }
      }).catch((err) => {
          console.log(err);
      });
    } 

    useEffect(() => {
      handleFetchDataMarkers();
    }, []);

    const handleSearchWithDate = () => {
      console.log("handleSearchWithDate clicked/ran...");

      const { markedDates, selectedLoc } = state;

      const config = {
        markedDates, 
        selectedLoc
      };

      axios.post(`${BASE_URL}/initiate/shipment/recycling/facility/and/more`, config).then((res) => {
        const { message } = res.data;

        if (message === "Successfully requested shipment and processed logic!") {
            console.log("ressssssss location (current) data:", res.data);
        } else {
            console.log("err", res.data);
        }
    }).catch((err) => {
        console.log("err", err);
    })
    };

    const calculateDisabled = () => {
      if (Object.keys(state.markedDates).length !== 0 && state.selectedLoc !== null) {
        return true;
      } else {
        return false;
      }
    };

    const renderAdditional = () => {
      if (state.selectedLoc !== null) {
        return (
          <Fragment>
            <View style={styles.hr} />
            <Text>You've selected <Text style={{ color: "blue", fontWeight: "bold" }}>{state.selectedLoc.address.fullAddress}</Text> ~ the company name is <Text style={{ color: "blue", fontWeight: "bold" }}>{state.selectedLoc.facilityName}</Text></Text>
          </Fragment>
        );
      }
    }

    console.log("state.selectedLoc", state.selectedLoc);

    const renderMainContentConditional = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 42.5, flexGrow: 1 }}>
                <View style={styles.margined}>
                    <MapView
                        style={{ height: height * 0.45 }}
                        initialRegion={{
                            latitude: 39.744137,
                            longitude: -104.950050,
                            latitudeDelta: 0.10,
                            longitudeDelta: 0.10,
                        }}
                    >
                        {state.locations.map((location, index) => {
                          const markerCoords = { latitude: location.address.position.lat, longitude: location.address.position.lon, longitudeDelta: 0.01, latitudeDelta: 0.01 }
                          return (
                            <Fragment>
                              <Marker 
                                  key={location.uniqueId}
                                  coordinate={markerCoords}
                                  onCalloutPress={() => {
                                    console.log("calllout pressed.", location);

                                    setState(prevState => ({ ...prevState, selectedLoc: location }))
                                  }}
                                  title={location.facilityName}
                                  description={location.address.fullAddress}
                              />
                            </Fragment>
                          );
                        })}
                        <Marker
                            coordinate={state.currentLoc}
                            pinColor={"purple"}
                        />
                        <Circle
                            center={state.currentLoc}
                            radius={56327} // 35 miles in meters
                            strokeColor="rgba(0, 150, 136, 0.5)"
                            fillColor="rgba(0, 150, 136, 0.1)"
                        />
                    </MapView>
                    <View style={{ borderTopColor: "#000", borderTopWidth: 1.5 }} />
                    <View style={{ margin: 12.25 }}>
                        <Text>You'll need to select a dropoff point from the available locations near you <Text style={{ color: "blue", fontWeight: "bold" }}>(limited to your own current city only***)</Text>. Please choose a location within the highlighted map circle to organize your shipment.</Text>
                        {renderAdditional()}
                        <Calendar
                            initialDate={moment(new Date()).format("YYYY-MM-DD")}
                            markedDates={state.markedDates}
                            minDate={new Date()}
                            onDayPress={(value) => {
                              console.log("onDayPress", value);

                              setState(prevState => ({
                                ...prevState,
                                markedDates: {
                                  [value.dateString]: { 
                                    selected: true, 
                                    marked: true, 
                                    selectedColor: Colors.primaryColor 
                                  }
                                }
                              }));
                            }}
                            hideArrows={true}
                            hideExtraDays={true}
                            disableAllTouchEventsForInactiveDays={true}
                            disableMonthChange={false}
                            firstDay={1}
                            showWeekNumbers={true}
                            disableArrowLeft={false}
                            disableArrowRight={false}
                            disableAllTouchEventsForDisabledDays={true}
                            enableSwipeMonths={true}
                        />
                        <View style={styles.hr} />
                        <AwesomeButtonBlue textColor={"#fff"} backgroundShadow={"black"} backgroundDarker={"#000"} disabled={calculateDisabled()} backgroundColor={calculateDisabled() ? Colors.primaryColor : "grey"} onPress={() => handleSearchWithDate()} stretch={true}>Initiate Shipment</AwesomeButtonBlue>
                    </View>
                </View>
            </ScrollView>
        );
    };

    return (
        <Fragment>
            <KeyboardAwareScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{ paddingBottom: 37.25, backgroundColor: "#fff", minHeight: height }}>
                {renderMainContentConditional()}
            </KeyboardAwareScrollView>
        </Fragment>
    );
}
const mapStateToProps = (state) => {
  return {
      authData: state.auth.data
  }
}
export default connect(mapStateToProps, {  })(withNavigation(OrchestratePickupFreightToFacility));