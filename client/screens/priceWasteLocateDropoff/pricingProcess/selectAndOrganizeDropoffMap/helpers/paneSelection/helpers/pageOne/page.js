import React, { Component } from 'react';
import Animated, { EasingNode } from 'react-native-reanimated';
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Button } from "@rneui/base";
import { Colors } from "../../../../../../../../constants/styles.js";
import styles from "../../universalStyles.js";


class CustomFadeComponentHelper extends Component {
constructor(props) {
    super(props);

    this.state = {
        fadeAnim: new Animated.Value(0)
    }
}

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 1750,
                easing: EasingNode.exp
            }
        ).start();
    }

    fadeOutToNextScreenComponent = (addOrSub) => {
        if (this.props.page === 2 && addOrSub !== "sub") {
            // allow closing of pane
            this.props.setAllowModificationPane(true);
            // close modal and display location points...
            this.props.sheetRef.current.close();
            // search for nearby dropoff locations/points
            this.props.handleNearbyLocationDropoffPointSearch();
        } else {
            if (addOrSub === "add") {
                setTimeout(() => {
                    this.props.proceedToNextPage("add");
        
                    Animated.timing(this.state.fadeAnim, {
                        toValue: 1,
                        duration: 750,
                        easing: EasingNode.exp
                    }).start();
                }, 1250);
                
                this.setState({ 
                    fadeAnim: new Animated.Value(1) 
                }, () => {
                    Animated.timing(this.state.fadeAnim, {
                        toValue: 0,
                        duration: 750,
                        easing: EasingNode.exp
                    }).start();
                });
            } else {
                setTimeout(() => {
                    this.props.proceedToNextPage("sub");
        
                    Animated.timing(this.state.fadeAnim, {
                        toValue: 1,
                        duration: 750,
                        easing: EasingNode.exp
                    }).start();
                }, 1250);
                
                this.setState({ 
                    fadeAnim: new Animated.Value(1) 
                }, () => {
                    Animated.timing(this.state.fadeAnim, {
                        toValue: 0,
                        duration: 750,
                        easing: EasingNode.exp
                    }).start();
                });
            }     
        }
    }

    render () {
        let { fadeAnim } = this.state;

        return (
            <View style = {{ backgroundColor: '#000', flex: 1 }}>
                <Animated.ScrollView contentContainerStyle={{ paddingBottom: 22.5 }} style={{ ...this.props.style, opacity: fadeAnim }} >
                    {this.props.children}
                    <View style = {{ backgroundColor: '#000000', height: 50, width: 50 }} />
                </Animated.ScrollView>
                <View style={{ marginTop: 12.5 }} />
                <View style={{ flex: 1 }} />
                <View style={{ margin: 12.5 }}>
                    <Button disabled={this.props.calculateDisabled(this.props.page)} onPress={() => this.fadeOutToNextScreenComponent("add")} title={this.props.page === 2 ? "Continue To Drop-Off Point Selection" : "Proceed To Next Portion/Page"} style={{ width: "100%" }} color={Colors.secondaryColor} />
                    <View style={styles.thinDividerHR} />
                    {this.props.page !== 1 ? <Button onPress={() => this.fadeOutToNextScreenComponent("sub")} title={"Revert Back To Previous Portion/Page"} style={{ width: "100%" }} buttonStyle={styles.redBackButton} color={Colors.greenColor} /> : null}
                </View>
            </View>
        );
    }
}
export default CustomFadeComponentHelper;