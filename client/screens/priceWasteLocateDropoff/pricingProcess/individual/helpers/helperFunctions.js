import React, { Fragment } from "react";
import { Text, View } from "react-native";
import Stars from "react-native-stars";
import styles from "../individualItemSelectionPageStyles.js";
import { Fonts, Sizes } from "../../../../../constants/styles.js";
import _ from "lodash";

const handleSwitchRenderFunction = (compoundedRating, individual, type) => {
    // handle each use-case..
    switch (type) {
        case "televisions":
            
            return (
                <Fragment>
                    <View>
                        <Text style={styles.labelStars}>Rating/Reviews (Calculated ~ 1-5)</Text>
                        <View style={[styles.commonRow, { justifyContent: "center", alignContent: "center", alignItems: "center" }]}>
                            <Stars
                                display={compoundedRating}
                                spacing={10}
                                count={5}
                                starSize={50}
                                fullStar={require('../../../../../assets/images/icon/vibrantstar_prev_ui.png')}
                                emptyStar={require('../../../../../assets/images/icon/empty-star-dotted.png')}
                            />
                        </View>
                        <View style={styles.commonRow}>
                            <View style={[styles.commonColumn, { paddingRight: 12.5 }]}>
                                <View style={styles.centeredCompletely}>
                                    <Text style={styles.columnHeader}>Product {'\n'}Information</Text>
                                </View>
                                <Text style={styles.labeled}>Product Name</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Product Name") ? individual["Product Name"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Brand</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Brand") ? individual.Brand : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Model</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Model") ? individual.Model : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Model Name</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Model Name") ? individual["Model Name"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Display Size</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Display Size") ? individual["Display Size"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Screen Type</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Screen Type") ? individual["Screen Type"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Weight (w/o Stand)</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Weight (without stand)") ? individual["Weight (without stand)"] : "No Data Available."}
                                </Text>
                            </View>
                            <View style={[styles.commonColumn, { paddingRight: 12.5 }]}>
                                <View style={styles.centeredCompletely}>
                                    <Text style={styles.columnHeader}>Internal Specifications</Text>
                                </View>
                                <Text style={styles.labeled}>Resolution Standard</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Resolution Standard") ? individual["Resolution Standard"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>No. of USB Port(s)</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "No of USB Port") ? individual["No of USB Port"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>No. of HDMI Port(s)</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "No of HDMI Port") ? individual["No of HDMI Port"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Color(s)/Smart-TV?</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "Color") ? individual.Color : "Unavailable"} ~ ${_.has(individual, "Smart TV") ? individual["Smart TV"] : "Unavailable"}`}
                                </Text>
                                <Text style={styles.labeled}>Resolution (pixels)</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Resolution (pixels)") ? individual["Resolution (pixels)"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Sound Technology</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Sound Technology") ? individual["Sound Technology"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Operating System (OS)</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Operating System") ? individual["Operating System"] : "No Data Available."}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Fragment>
            );
            break;
        case "gamingconsoles":
            
            return (
                <Fragment>
                    <View>
                        <Text style={styles.labelStars}>Rating/Reviews (Calculated ~ 1-5)</Text>
                        <View style={[styles.commonRow, { justifyContent: "center", alignContent: "center", alignItems: "center" }]}>
                            <Stars
                                display={compoundedRating}
                                spacing={10}
                                count={5}
                                starSize={50}
                                fullStar={require('../../../../../assets/images/icon/vibrantstar_prev_ui.png')}
                                emptyStar={require('../../../../../assets/images/icon/empty-star-dotted.png')}
                            />
                        </View>
                        <View style={styles.commonRow}>
                            <View style={[styles.commonColumn, { paddingRight: 12.5 }]}>
                                <View style={styles.centeredCompletely}>
                                    <Text style={styles.columnHeader}>Product {'\n'}Information</Text>
                                </View>
                                <Text style={styles.labeled}>Product Name</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Product Name") ? individual["Product Name"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Model</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Model") ? individual.Model : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Brand</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Brand") ? individual.Brand : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Launched</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Launched") ? individual.Launched : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Console Family</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Console Family") ? individual["Console Family"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Console Type</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Console Type") ? individual["Console Type"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>USB</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "USB") ? individual.USB : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>AV Digital Output</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "AV Digital Output") ? individual["AV Digital Output"] : "No Data Available."}
                                </Text>
                            </View>
                            <View style={[styles.commonColumn, { paddingRight: 12.5 }]}>
                                <View style={styles.centeredCompletely}>
                                    <Text style={styles.columnHeader}>Internal Specifications</Text>
                                </View>
                                <Text style={styles.labeled}>Input Method</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Input method") ? individual["Input method"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Hard Disk</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Hard Disk") ? individual["Hard Disk"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>RAM (Random Access Memory)</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "RAM") ? individual.RAM : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Processor</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Processor") ? individual["Processor"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Graphics</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Graphics") ? individual.Graphics : "No Data Available."}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Fragment>
            );
            break;
        case "mobiles":

            return (
                <Fragment>
                    <View>
                        <Text style={styles.labelStars}>Rating/Reviews (Calculated ~ 1-5)</Text>
                        <View style={[styles.commonRow, { justifyContent: "center", alignContent: "center", alignItems: "center" }]}>
                            <Stars
                                display={compoundedRating}
                                spacing={10}
                                count={5}
                                starSize={50}
                                fullStar={require('../../../../../assets/images/icon/vibrantstar_prev_ui.png')}
                                emptyStar={require('../../../../../assets/images/icon/empty-star-dotted.png')}
                            />
                        </View>
                        <View style={styles.commonRow}>
                            <View style={[styles.commonColumn, { paddingRight: 12.5 }]}>
                                <View style={styles.centeredCompletely}>
                                    <Text style={styles.columnHeader}>Product {'\n'}Information</Text>
                                </View>
                                <Text style={styles.labeled}>Brand</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Brand") ? individual.Brand : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Model (Specific's)</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Model") ? individual.Model : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Launched</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Launched") ? individual.Launched : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Resolution</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Resolution") ? individual.Resolution : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Colours</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Colours") ? individual.Colours : "No Data Available."}
                                </Text>
                            </View>
                            <View style={[styles.commonColumn, { paddingRight: 12.5 }]}>
                                <View style={styles.centeredCompletely}>
                                    <Text style={styles.columnHeader}>Internal Specifications</Text>
                                </View>
                                <Text style={styles.labeled}>Processor</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Processor") ? individual.Processor : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>RAM</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "RAM") ? individual.RAM : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Bluetooth/NFC (enabled)</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Bluetooth") ? `${individual.Bluetooth}/${individual.NFC}` : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Camera(s) ~ Rear/Front</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "Rear camera") ? individual["Rear camera"] : "Unavailable"} ~ ${_.has(individual, "Front camera") ? individual["Front camera"] : "Unavailable"}`}
                                </Text>
                                <Text style={styles.labeled}>Screen Size (Inches)</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Screen size (inches)") ? individual["Screen size (inches)"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Operating System (OS)</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Operating system") ? individual["Operating system"] : "No Data Available."}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Fragment>
            );
            break;
        case "wearables":
            return (
                <Fragment>
                    <View>
                        <Text style={styles.labelStars}>Rating/Reviews (Calculated ~ 1-5)</Text>
                        <View style={[styles.commonRow, { justifyContent: "center", alignContent: "center", alignItems: "center" }]}>
                            <Stars
                                display={compoundedRating}
                                spacing={10}
                                count={5}
                                starSize={50}
                                fullStar={require('../../../../../assets/images/icon/vibrantstar_prev_ui.png')}
                                emptyStar={require('../../../../../assets/images/icon/empty-star-dotted.png')}
                            />
                        </View>
                        <View style={styles.commonRow}>
                            <View style={[styles.commonColumn, { paddingRight: 12.5 }]}>
                                <View style={styles.centeredCompletely}>
                                    <Text style={styles.columnHeader}>Product {'\n'}Information</Text>
                                </View>
                                <Text style={styles.labeled}>Brand</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Brand") ? individual.Brand : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Model (Specific's)</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Model") ? individual.Model : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Launched</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Launched") ? individual.Launched : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Dial Shape</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Dial Shape") ? individual["Dial Shape"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Touchscreen/Water-Resistant?</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "Touchscreen") ? individual.Touchscreen : "Unavailable"} ~ ${_.has(individual, "Water Resistant") ? individual["Water Resistant"] : "Unavailable"}`}
                                </Text>
                                <Text style={styles.labeled}>Charger Type</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Charger Type") ? individual["Charger Type"] : "No Data Available."}
                                </Text>
                            </View>
                            <View style={[styles.commonColumn, { paddingRight: 12.5 }]}>
                                <View style={styles.centeredCompletely}>
                                    <Text style={styles.columnHeader}>Internal Specifications</Text>
                                </View>
                                <Text style={styles.labeled}>Compatible Device</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Compatible Device") ? individual["Compatible Device"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Processor Name</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Processor Name") ? individual["Processor Name"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>RAM/Internal-Memory</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "RAM") ? individual.RAM : "Unavailable"} ~ ${_.has(individual, "Internal Memory") ? individual["Internal Memory"] : "Unavailable"}`}
                                </Text>
                                <Text style={styles.labeled}>Notification</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Notification") ? individual.Notification : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Battery Type/Life</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "Battery Type") ? individual["Battery Type"] : "Unavailable"} ~ ${_.has(individual, "Battery Life") ? individual["Battery Life"] : "Unavailable"}`}
                                </Text>
                                <Text style={styles.labeled}>Call Function?</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Call Function") ? individual["Call Function"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Bluetooth/Version</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "Bluetooth") ? individual.Bluetooth : "Unavailable"} ~ ${_.has(individual, "Bluetooth Version") ? individual["Bluetooth Version"] : "Unavailable"}`}
                                </Text>
                                <Text style={styles.labeled}>Wi-Fi/GPS?</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "Wi-Fi") ? individual["Wi-Fi"] : "Unavailable"} ~ ${_.has(individual, "GPS") ? individual.GPS : "Unavailable"}`}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Fragment>
            );
            break;
        case "cameras":
            return (
                <Fragment>
                    <View>
                        <Text style={styles.labelStars}>Rating/Reviews (Calculated ~ 1-5)</Text>
                        <View style={[styles.commonRow, { justifyContent: "center", alignContent: "center", alignItems: "center" }]}>
                            <Stars
                                display={compoundedRating}
                                spacing={10}
                                count={5}
                                starSize={50}
                                fullStar={require('../../../../../assets/images/icon/vibrantstar_prev_ui.png')}
                                emptyStar={require('../../../../../assets/images/icon/empty-star-dotted.png')}
                            />
                        </View>
                        <View style={styles.commonRow}>
                            <View style={[styles.commonColumn, { paddingRight: 12.5 }]}>
                                <View style={styles.centeredCompletely}>
                                    <Text style={styles.columnHeader}>Product {'\n'}Information</Text>
                                </View>
                                <Text style={styles.labeled}>Brand</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Brand") ? individual["Brand"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Model/Model-Name</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "Model") ? individual.Model : "Unavailable"} ~ ${_.has(individual, "Model Name") ? individual["Model Name"] : "Unavailable"}`}
                                </Text>
                                <Text style={styles.labeled}>Series</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Series") ? individual.Series : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>SLR Variant</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "SLR Variant") ? individual["SLR Variant"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Camera Type/Display-Size</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "Type") ? individual.Type : "Unavailable"} ~ ${_.has(individual, "Display Size") ? individual["Display Size"] : "Unavailable"}`}
                                </Text>
                                <Text style={styles.labeled}>Tripod Socket</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Tripod Socket") ? individual["Tripod Socket"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Dimensions (W x H x D)</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Dimensions(WxHxD)") ? individual["Dimensions(WxHxD)"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Face-Detection/Wide-Angle?</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "Face Detection") ? individual["Face Detection"] : "Unavailable"} ~ ${_.has(individual, "Wide Angle") ? individual["Wide Angle"] : "Unavailable"}`}
                                </Text>
                            </View>
                            <View style={[styles.commonColumn, { paddingRight: 12.5 }]}>
                                <View style={styles.centeredCompletely}>
                                    <Text style={styles.columnHeader}>Internal Specifications</Text>
                                </View>
                                <Text style={styles.labeled}>Effective Pixels</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Effective Pixels") ? individual["Effective Pixels"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Lens Attachment</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Lens Attachment") ? individual["Lens Attachment"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Temperature/ISO-Rating</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "Temperature") ? individual.Temperature : "Unavailable"} ~ ${_.has(individual, "ISO Rating") ? individual["ISO Rating"] : "Unavailable"}`}
                                </Text>
                                <Text style={styles.labeled}>Manual-Focus/Dust-Reduction?</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "Manual Focus") ? individual["Manual Focus"] : "Unavailable"} ~ ${_.has(individual, "Dust Reduction") ? individual["Dust Reduction"] : "Unavailable"}`}
                                </Text>
                                <Text style={styles.labeled}>Shutter Type</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Shutter Type") ? individual["Shutter Type"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Gross Pixel</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Gross Pixel") ? individual["Gross Pixel"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Card Type</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Card Type") ? individual["Card Type"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Microphone</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Microphone") ? individual.Microphone : "No Data Available."}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Fragment>
            );
            break;
        case "laptops":
            return (
                <Fragment>
                    <View>
                        <Text style={styles.labelStars}>Rating/Reviews (Calculated ~ 1-5)</Text>
                        <View style={[styles.commonRow, { justifyContent: "center", alignContent: "center", alignItems: "center" }]}>
                            <Stars
                                display={compoundedRating}
                                spacing={10}
                                count={5}
                                starSize={50}
                                fullStar={require('../../../../../assets/images/icon/vibrantstar_prev_ui.png')}
                                emptyStar={require('../../../../../assets/images/icon/empty-star-dotted.png')}
                            />
                        </View>
                        <View style={styles.commonRow}>
                            <View style={[styles.commonColumn, { paddingRight: 12.5 }]}>
                                <View style={styles.centeredCompletely}>
                                    <Text style={styles.columnHeader}>Product {'\n'}Information</Text>
                                </View>
                                <Text style={styles.labeled}>Brand</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Brand") ? individual.Brand : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Model (Specific's)</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Model") ? individual.Model : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Model Number</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Model Number") ? individual["Model Number"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Dimensions (mm)</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Dimensions (mm)") ? individual["Dimensions (mm)"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Screen Size</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Size") ? individual.Size : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Resolution</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Resolution") ? individual.Resolution : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Touch Screen?</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Touch Screen") ? individual["Touch Screen"] : "No Data Available."}
                                </Text>
                            </View>
                            <View style={[styles.commonColumn, { paddingRight: 12.5 }]}>
                                <View style={styles.centeredCompletely}>
                                    <Text style={styles.columnHeader}>Internal Specifications</Text>
                                </View>
                                <Text style={styles.labeled}>Processor</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Processor") ? individual.Processor : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Graphics Processor</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Graphics Processor") ? individual["Graphics Processor"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Dedicated Graphics</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Dedicated Graphics") ? individual["Dedicated Graphics"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>RAM</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "RAM") ? individual.RAM : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Base Clock Speed</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Base Clock Speed") ? individual["Base Clock Speed"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Hard-Disk/SSD?</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "Hard disk") ? individual["Hard disk"] : "Unavailable"} ~ ${_.has(individual, "SSD") ? individual.SSD : "Unavailable"}`}
                                </Text>
                                <Text style={styles.labeled}>Wi-Fi Standards Supported</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Wi-Fi standards supported") ? individual["Wi-Fi standards supported"] : "No Data Available."}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Fragment>
            );
            break;
        case "tablets":
            return (
                <Fragment>
                    <View>
                        <Text style={styles.labelStars}>Rating/Reviews (Calculated ~ 1-5)</Text>
                        <View style={[styles.commonRow, { justifyContent: "center", alignContent: "center", alignItems: "center" }]}>
                            <Stars
                                display={compoundedRating}
                                spacing={10}
                                count={5}
                                starSize={50}
                                fullStar={require('../../../../../assets/images/icon/vibrantstar_prev_ui.png')}
                                emptyStar={require('../../../../../assets/images/icon/empty-star-dotted.png')}
                            />
                        </View>
                        <View style={styles.commonRow}>
                            <View style={[styles.commonColumn, { paddingRight: 12.5 }]}>
                                <View style={styles.centeredCompletely}>
                                    <Text style={styles.columnHeader}>Product {'\n'}Information</Text>
                                </View>
                                <Text style={styles.labeled}>Brand</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Brand") ? individual.Brand : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Model (Specific's)</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Model") ? individual.Model : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Launched</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Launched") ? individual.Launched : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Dimensions (mm)</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Dimensions (mm)") ? individual["Dimensions (mm)"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Battery-Capacity(mAh)/Removable?</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "Battery capacity (mAh)") ? individual["Battery capacity (mAh)"] : "Unavailable"} ~ ${_.has(individual, "Removable battery") ? individual["Removable battery"] : "Unavailable"}`}
                                </Text>
                                <Text style={styles.labeled}>Colours</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Colours") ? individual.Colours : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Screen size (inches)/Touch-Screen?</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "Screen size (inches)") ? individual["Screen size (inches)"] : "Unavailable"} ~ ${_.has(individual, "Touchscreen") ? individual.Touchscreen : "Unavailable"}`}
                                </Text>
                                <Text style={styles.labeled}>Wi-Fi/Bluetooth?</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "Wi-Fi") ? individual["Wi-Fi"] : "Unavailable"} ~ ${_.has(individual, "Bluetooth") ? individual.Bluetooth : "Unavailable"}`}
                                </Text>
                                <Text style={styles.labeled}>NFC/GPS?</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "NFC") ? individual.NFC : "Unavailable"} ~ ${_.has(individual, "GPS") ? individual.GPS : "Unavailable"}`}
                                </Text>
                            </View>
                            <View style={[styles.commonColumn, { paddingRight: 12.5 }]}>
                                <View style={styles.centeredCompletely}>
                                    <Text style={styles.columnHeader}>Internal Specifications</Text>
                                </View>
                                <Text style={styles.labeled}>Processor</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Processor") ? individual.Processor : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Processor Make</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Processor make") ? individual["Processor make"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Resolution</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Resolution") ? individual.Resolution : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>RAM/Internal-Storage</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "RAM") ? individual.RAM : "Unavailable"} ~ ${_.has(individual, "Internal storage") ? individual["Internal storage"] : "Unavailable"}`}
                                </Text>
                                <Text style={styles.labeled}>Rear/Front Camera Spec(s)</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {`${_.has(individual, "Rear camera") ? individual["Rear camera"] : "Unavailable"} ~ ${_.has(individual, "Front camera") ? individual["Front camera"] : "Unavailable"}`}
                                </Text>
                                <Text style={styles.labeled}>Operating System (OS)</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Operating system") ? individual["Operating system"] : "No Data Available."}
                                </Text>
                                <Text style={styles.labeled}>Skin</Text>
                                <Text style={{ ...Fonts.indigoColor18Bold, marginTop: Sizes.fixPadding }}>
                                    {_.has(individual, "Skin") ? individual.Skin : "No Data Available."}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Fragment>
            );
            break;
        default: 
            return null;
            break;
    }
}

export default handleSwitchRenderFunction;