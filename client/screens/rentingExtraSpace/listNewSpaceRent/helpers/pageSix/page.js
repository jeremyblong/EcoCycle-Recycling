import React, { Fragment, useState } from "react";
import stylesOne from "../pageStyles.js";
import stylesTwo from "../../startListingNewSpaceProcessStyles.js";
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Image
} from "react-native";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import Collapsible from 'react-native-collapsible';
import disc from '@jsamr/counter-style/presets/disc';
import MarkedList from '@jsamr/react-native-li';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const styles = { ...stylesOne, ...stylesTwo };

const requiredCountLength = 45;

const RenderPageSixHelperData = ({ renderHeaderLogicData, storageData, handleSubItemSelection }) => {

    const [ description, setDescriptionValue ] = useState("");
    const [ isCollapsed, setIsCollapsedState ] = useState(true);
    const [ inputsAreActive, setActiveInputState ] = useState(false);

    const calculatingDisabledState = () => {
        return (typeof description !== "undefined" && description.length >= 45) ? false : true;
    }

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps='always' contentContainerStyle={inputsAreActive === true ? { paddingBottom: 262.5 } : { paddingBottom: 0 }}>
                {renderHeaderLogicData("How would you describe your space?", "Summarizing your space well helps others/people understand determine how much can be delivered as well as giving a better general idea for context on future drop-off's...")}
                <View style={styles.mainContainer}>
                    <TouchableOpacity onPress={() => setIsCollapsedState(prevState => !prevState)} style={styles.pointersWrapper}>
                        <Image source={require("../../../../../assets/images/icon/lightbulb.png")} style={styles.textHelperImageOne} />
                        <Text style={styles.lightbulbHelperText}>Tips for a great description</Text>
                        <Image source={require("../../../../../assets/images/icon/up-arrow-2.png")} style={styles.textHelperImage} />
                    </TouchableOpacity>
                    <Collapsible collapsed={isCollapsed}>
                        <View style={styles.greyishBackingListWrapper}>
                            <MarkedList counterRenderer={disc}>
                                <View style={styles.rowItem}>
                                    <Text style={styles.bulletItem}>What constraints should the renter know about? (Narrow doors, sharp turns, etc...)</Text>
                                </View>
                                <View style={styles.rowItem}>
                                    <Text style={styles.bulletItem}>What items would fit well in this space? ("Perfect for larger electronic e-waste such as desktop computers, server towers, etc...")</Text>
                                </View>
                                <View style={styles.rowItem}>
                                    <Text style={styles.bulletItem}>Is there anything safe, great or memorable about the area where you live?</Text>
                                </View>
                            </MarkedList>
                        </View>
                    </Collapsible>
                    <View style={styles.textFieldContainerStyle}>
                        <TextInput
                            value={description}
                            numberOfLines={10}
                            multiline={true}
                            placeholderTextColor={"darkgray"}
                            onSubmitEditing={() => setActiveInputState(false)}
                            onFocus={() => setActiveInputState(true)}
                            blurOnSubmit={true}
                            placeholder={"Accurately/Descriptively explain your space..."}
                            style={styles.multilineInput}
                            onChangeText={(value) => setDescriptionValue(value)}
                        />
                        {(typeof description !== "undefined" && description.length <= 45) ? <Text style={styles.inputCounterText}>{requiredCountLength - description.length} req. char left (150 char's are recommended) ...</Text> : null}
                    </View>
                </View>
                <View style={styles.bottomWrapperContainer}>
                    <AwesomeButtonBlue style={styles.absoluteButtonBottom} disabled={calculatingDisabledState()} type={"secondary"} onPress={() => handleSubItemSelection(5, 6, { description })} backgroundShadow={"black"} stretch={true}>Submit & Continue</AwesomeButtonBlue>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}


export default RenderPageSixHelperData;