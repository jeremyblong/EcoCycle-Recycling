import React, { Fragment, useState, useRef } from "react";
import stylesOne from "../pageStyles.js";
import stylesTwo from "../../startListingNewSpaceProcessStyles.js";
import {
    View,
    Text,
    Image,
    TextInput,
    FlatList,
    TouchableOpacity
} from "react-native";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import { Badge } from '@rneui/themed';

const styles = { ...stylesOne, ...stylesTwo };

const horizontalSuggestions = ["One car, 20' x 10'", "Two car(s), 20' x 20'", "10' x 10'", "20' x 12'", "20' x 15'", "20' x 18'", "18' x 10'", "20' x 11'", "15' x 10'", "6' x 8'"];

const RenderPageSevenHelperData = ({ renderHeaderLogicData, storageData, handleSubItemSelection }) => {

    const lengthInputRef = useRef(null);
    const widthInputRef = useRef(null);
    const heightInputRef = useRef(null);

    const [ measurements, setMeasurements ] = useState({
        length: "",
        width: "",
        height: ""
    })

    const calculateDisabledButtonConditional = () => {
        const { length, width } = measurements;

        return (typeof length !== "undefined" && length.length > 0 && typeof width !== "undefined" && width.length > 0) ? false : true;
    }

    const renderHorizontalItem = ({ item, index }) => {

        const updateMeasurementsAssociated = (item) => {
            switch (item) {
                case "One car, 20' x 10'":
                    setMeasurements({
                        length: "20",
                        width: "10",
                        height: "N/A"
                    })
                    break;
                case "Two car(s), 20' x 20'":
                    setMeasurements({
                        length: "20",
                        width: "20",
                        height: "N/A"
                    })
                    break;
                case "10' x 10'":
                    setMeasurements({
                        length: "10",
                        width: "10",
                        height: "N/A"
                    })
                    break;
                case "20' x 12'":
                    setMeasurements({
                        length: "20",
                        width: "12",
                        height: "N/A"
                    })
                    break;
                case "20' x 15'":
                    setMeasurements({
                        length: "20",
                        width: "15",
                        height: "N/A"
                    })
                    break;
                case "20' x 18'":
                    setMeasurements({
                        length: "20",
                        width: "18",
                        height: "N/A"
                    })
                    break;
                case "18' x 10'":
                    setMeasurements({
                        length: "18",
                        width: "10",
                        height: "N/A"
                    })
                    break;
                case "20' x 11'":
                    setMeasurements({
                        length: "20",
                        width: "11",
                        height: "N/A"
                    })
                    break;
                case "15' x 10'":
                    setMeasurements({
                        length: "15",
                        width: "10",
                        height: "N/A"
                    })
                    break;
                case "6' x 8'":
                    setMeasurements({
                        length: "6",
                        width: "8",
                        height: "N/A"
                    })
                    break;
                default:
                    setMeasurements({
                        length: "N/A",
                        width: "N/A",
                        height: "N/A"
                    })
                    break;
            }
        }

        return (
            <Fragment>
                <TouchableOpacity onPress={() => updateMeasurementsAssociated(item)} style={styles.badgeButtonCustom}>
                    <Badge
                        status="secondary"
                        value={item}
                        key={index}
                        badgeStyle={styles.badgeHorizontalStyle}
                        textStyle={{ color: "#fff", fontWeight: "bold", fontSize: 16.5 }}
                        containerStyle={{ margin: 4.25 }}
                    />
                </TouchableOpacity>
            </Fragment>
        );
    }
    return (
        <View style={{ flex: 1 }}>
            {renderHeaderLogicData("How large is your space?", "Accurate measurements help renters know if they can fit their items in your space. Here are a few things to consider/remember:")}
            <View style={styles.wrapperMainTopContainer}>
                <View style={styles.topChunkWrapper}>
                    <View style={styles.leftIconStyleWrapper}>
                        <Image source={require("../../../../../assets/images/icon/checkmark-circled-green.png")} style={styles.leftIconStyle} />
                    </View>
                    <View style={styles.rightMainStyle}>
                        <Text style={styles.titledHeaderText}>Accurate Measurement(s)</Text>
                        <Text style={styles.subbedText}>If you list a 10' x 10' space, renters need to be able to use all 10' x 10'. If you can't visit or access your property right now, you can give it your best guess/estimate - just make sure you come back to update it later to it's actual/appropriate measurements so it's accurate.</Text>
                    </View>
                </View>
                <View style={[styles.hr, { left: 7.5, marginTop: 12.5, marginBottom: 12.5 }]} />
                <View style={styles.bottomChunkWrapper}>
                    <View style={styles.leftIconStyleWrapper}>
                        <Image source={require("../../../../../assets/images/icon/measure-tape.png")} style={styles.leftIconStyle} />
                    </View>
                    <View style={styles.rightMainStyle}>
                        <Text style={styles.titledHeaderText}>Different ways to measure</Text>
                        <Text style={styles.subbedText}>Use a tape measure if you can (ideal tool/way), or if you're in a pinch you can just ballpark the general measurements and come back to confirm your estimates or make adjustments if needed.</Text>
                    </View>
                </View>
                <View style={[styles.hr, { left: 7.5, marginTop: 12.5, marginBottom: 12.5 }]} />
                <View style={styles.lowestBottomChunkWrapper}>
                    <View style={styles.thirdColumn}>
                        <TextInput
                            value={measurements.length}
                            placeholderTextColor={"darkgray"}
                            blurOnSubmit={true}
                            ref={lengthInputRef}
                            onSubmitEditing={() => widthInputRef.current.focus()}
                            placeholder={"Length (ft)"}
                            keyboardType={"numeric"}
                            style={styles.thirdLengthInput}
                            onChangeText={(value) => setMeasurements(prevState => {
                                return {
                                    ...prevState,
                                    length: value
                                }
                            })}
                        />
                    </View>
                    <View style={styles.thirdColumn}>
                        <TextInput
                            value={measurements.width}
                            placeholderTextColor={"darkgray"}
                            blurOnSubmit={true}
                            ref={widthInputRef}
                            onSubmitEditing={() => heightInputRef.current.focus()}
                            placeholder={"Width (ft)"}
                            keyboardType={"numeric"}
                            style={styles.thirdLengthInput}
                            onChangeText={(value) => setMeasurements(prevState => {
                                return {
                                    ...prevState,
                                    width: value
                                }
                            })}
                        />
                    </View>
                    <View style={styles.thirdColumn}>
                        <TextInput
                            value={measurements.height}
                            placeholderTextColor={"darkgray"}
                            blurOnSubmit={true}
                            ref={heightInputRef}
                            placeholder={"Height (ft)"}
                            keyboardType={"numeric"}
                            style={styles.thirdLengthInput}
                            onChangeText={(value) => setMeasurements(prevState => {
                                return {
                                    ...prevState,
                                    height: value
                                }
                            })}
                        />
                    </View>
                </View>
                <View style={[styles.hr, { left: 7.5, marginTop: 17.5, marginBottom: 12.5 }]} />
                <Text style={styles.commonSpacesText}>Common garage size(s)</Text>
                <FlatList
                    contentContainerStyle={styles.contentContainerHorizontal}
                    data={horizontalSuggestions}
                    showsHorizontalScrollIndicator={false}
                    style={{ flexGrow: 1, flex: 1 }}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderHorizontalItem}
                    horizontal={true}
                />
            </View>
            <View style={styles.bottomWrapperContainer}>
                <AwesomeButtonBlue style={styles.absoluteButtonBottom} disabled={calculateDisabledButtonConditional()} type={"secondary"} onPress={() => handleSubItemSelection(6, 7, { spaceMeasurementsDimensionsFeet: measurements })} backgroundShadow={"black"} stretch={true}>Submit & Continue</AwesomeButtonBlue>
            </View>
        </View>
    );
}


export default RenderPageSevenHelperData;