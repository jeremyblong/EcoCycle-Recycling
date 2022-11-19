import React, { Fragment, useState } from "react";
import stylesOne from "../pageStyles.js";
import stylesTwo from "../../startListingNewSpaceProcessStyles.js";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput
} from "react-native";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import Collapsible from 'react-native-collapsible';
import disc from '@jsamr/counter-style/presets/disc';
import MarkedList from '@jsamr/react-native-li';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const styles = { ...stylesOne, ...stylesTwo };

const requiredCountLength = 45;

const RenderPageNineHelperData = ({ renderHeaderLogicData, storageData, handleSubItemSelection }) => {

    const [ isCollapsed, setIsCollapsedState ] = useState(true);
    const [ welcomeMessage, setWelcomeMessage ] = useState("");
    const [ inputsAreActive, setActiveInputState ] = useState(false);

    const calculateDisabledButtonConditional = () => {
        return (typeof welcomeMessage !== "undefined" && welcomeMessage.length >= 45) ? false : true;
    }
    return (
        <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps='always' contentContainerStyle={inputsAreActive === true ? { paddingBottom: 262.5 } : { paddingBottom: 0 }}>
                {renderHeaderLogicData("Please include a 'welcome' message with breif/descriptive instructions", "Please describe any relevant details for driver's delivering electronic waste such as 'leave on porch on left side' or 'the house with the bright-red exterior paint' or 'call upon arriving & go through the white-picker gate/fence' OR any other important notes/details you'd like to include...")}
                <TouchableOpacity onPress={() => setIsCollapsedState(prevState => !prevState)} style={styles.pointersWrapper}>
                    <Image source={require("../../../../../assets/images/icon/lightbulb.png")} style={styles.textHelperImageOne} />
                    <Text style={styles.lightbulbHelperText}>See example(s)</Text>
                    <Image source={require("../../../../../assets/images/icon/up-arrow-2.png")} style={styles.textHelperImage} />
                </TouchableOpacity>
                <Collapsible collapsed={isCollapsed}>
                    <View style={styles.greyishBackingListWrapper}>
                        <MarkedList counterRenderer={disc}>
                            <View style={styles.rowItem}>
                                <Text style={styles.bulletItem}>"Thanks for booking me! The main-gate entry code is 12345, so come over whenever you'd like as the process to the storage room is completely automated!"</Text>
                            </View>
                            <View style={styles.rowItem}>
                                <Text style={styles.bulletItem}>"Thanks for choosing to use my storage space! I'll need to unlock the gate upon your arrival, so please let me know a ballpark timeframe when you'd like to make your drop-off/delivery."</Text>
                            </View>
                            <View style={styles.rowItem}>
                                <Text style={styles.bulletItem}>"Make sure you park in the unassigned parking area/region under the large oak trees to avoid any ticketing (per city codes - they routinely patrol my street) or complaints from the neighbors"</Text>
                            </View>
                            <View style={styles.rowItem}>
                                <Text style={styles.bulletItem}>"I approved your request, but I work and can only accept deliveries/drop-off's outside of my standard work hours that're typically from 10-7am."</Text>
                            </View>
                        </MarkedList>
                    </View>
                </Collapsible>
                <View style={styles.textFieldContainerStyle}>
                    <TextInput
                        value={welcomeMessage}
                        numberOfLines={10}
                        multiline={true}
                        placeholderTextColor={"darkgray"}
                        onSubmitEditing={() => setActiveInputState(false)}
                        onFocus={() => setActiveInputState(true)}
                        placeholder={"Automatic welcome message (sent after 'accepting' a drop-off/delivery)..."}
                        style={styles.multilineInput}
                        onChangeText={(value) => setWelcomeMessage(value)}
                    />
                    {(typeof welcomeMessage !== "undefined" && welcomeMessage.length <= 45) ? <Text style={styles.inputCounterText}>{requiredCountLength - welcomeMessage.length} req. char left (150 char's are recommended) ...</Text> : null}
                </View>
                <View style={styles.bottomWrapperContainer}>
                    <AwesomeButtonBlue style={styles.absoluteButtonBottom} disabled={calculateDisabledButtonConditional()} type={"secondary"} onPress={() => handleSubItemSelection(8, 9, { welcomeMessage })} backgroundShadow={"black"} stretch={true}>Submit & Continue</AwesomeButtonBlue>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}


export default RenderPageNineHelperData;