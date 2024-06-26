import React, { Fragment, useEffect, useState } from "react";
import { Text, Image, View, Dimensions, ScrollView } from "react-native";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import styles from "./viewManageActiveLoadsStyles.js";
import moment from "moment";
import { connect } from "react-redux";
import { BASE_URL } from "@env";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const ManageDistributorActiveLoads = ({ userData }) => {

    const [ state, setState ] = useState({
        availableResults: []
    });

    const updateState = (newData) => {
        setState(prevState => {
            return {
                ...prevState, 
                ...newData
            }
        })
    } 

    useEffect(() => {
        
    }, []);

    const { availableResults } = state;

    console.log("availableResults", availableResults);
    
    const renderContentMain = () => {
        if (typeof availableResults !== "undefined" && availableResults.length > 0) {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                    
                </SafeAreaView>
            );
        } else {
            return (
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ padding: 11.25, backgroundColor: "#fff" }}>
                    <View style={styles.rowOnly}>
                        <View style={[styles.halfColumn, { paddingRight: 17.25 } ]}>
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
                        </View>
                        <View style={styles.halfColumn}>
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
                        </View>
                    </View>
                    <View style={[styles.centeredOnly, { marginBottom: 32.5, marginTop: 12.5 }]}>
                        <Text style={{ fontSize: 22, textAlign: "center", textDecorationLine: "underline", fontWeight: "bold", color: "#000", marginBottom: 14.25 }}>You do NOT have any active 'contracts/loads' requiring shipment processing or shipping...</Text>
                        <Image source={require("../../../assets/images/no-contracts.jpg")} style={styles.noContractAvailable} />
                    </View>
                    <View style={styles.rowOnly}>
                        <View style={[styles.halfColumn, { paddingRight: 17.25 } ]}>
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
                        </View>
                        <View style={styles.halfColumn}>
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
                        </View>
                    </View>
                </ScrollView>
            );
        }
    }
    return renderContentMain();
}

const mapStateToProps = (state) => ({
    currentLocation: state.location.currentLoc,
    userData: state.auth.data
});

export default connect(mapStateToProps, {})(ManageDistributorActiveLoads)