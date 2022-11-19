import React, { useState, useEffect, useRef, Fragment } from "react";
import { Text, View, Image, useWindowDimensions, ScrollView, Animated, Dimensions, TouchableOpacity } from "react-native";
import { TabView, TabBar } from 'react-native-tab-view';
import { Fonts, Colors } from "../constants/styles";
import RenderMapViewNearbyUsers from "./helpers/TabBarScreen/MapView.js";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from "react-redux";
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from "./TabBarScreenStyles.js";
import CheckBox from "react-native-check-box";
import Svg, { Path } from 'react-native-svg';
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import axios from "axios";
import Toast from 'react-native-toast-message';
import Geolocation from '@react-native-community/geolocation';
import { BASE_URL } from "@env";
import _ from "lodash";
import { Text as NativeText, Card, Icon } from '@rneui/themed';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

const SearchableDropoffLocationsHelper = ({ handleRedirectToucableCardClicked, locationsNearby, selectedFilteredOptions, setSelectedFilterOptions }) => {

    const searchableDropdownInput = useRef(null);

    const [ animatePress, setAnimatePress ] = useState(new Animated.Value(0));
    const [ currentView, setCurrentView ] = useState("default");
    const [ selected, setSelected ] = useState(null);

    useEffect(() => {
        Animated.loop(Animated.timing(animatePress, { toValue: 1, duration: 1000, useNativeDriver: true })).start();  
    }, []);

    const calculateFilterType = (filtered) => {

        const { mainCategory, subCategory, environmentalConditions, environmentBuildingType, spaceMeasurementsDimensionsFeet, contactRequiredOrNot } = filtered.mainData;

        const firstCheck = selectedFilteredOptions.filter((item) => item === mainCategory.name);
        const secondCheck = selectedFilteredOptions.filter((item) => item === subCategory.name);
        const thirdCheck = selectedFilteredOptions.filter((item) => environmentalConditions.some(elementttt => elementttt.name === item));
        const fourthCheck = selectedFilteredOptions.filter((item) => item === environmentBuildingType.name);
        const fifthCheck = selectedFilteredOptions.filter((item) => item === `${spaceMeasurementsDimensionsFeet.length}' ${spaceMeasurementsDimensionsFeet.width}'`);
        const sixthCheck = selectedFilteredOptions.filter((item) => item === contactRequiredOrNot.name);

        const returningOperations = ( 
            firstCheck.includes(mainCategory.name) || 
            secondCheck.includes(subCategory.name) || 
            thirdCheck.some(iterationItem => selectedFilteredOptions.includes(iterationItem)) || 
            fourthCheck.includes(environmentBuildingType.name) || 
            fifthCheck.includes(`${spaceMeasurementsDimensionsFeet.length}' ${spaceMeasurementsDimensionsFeet.width}'`) || // 20' x 12'
            sixthCheck.includes(contactRequiredOrNot.name)
        );
        // return selected value(s)...
        return returningOperations;
    }

    const calculateChecked = (value) => {

        const relevantMatchIndex = selectedFilteredOptions.findIndex(item => item === value);
        
        if (relevantMatchIndex !== -1) {
            return true;
        } else {
            return false;
        }
    }
    
    const handleSearchWithCriteria = () => {

        setCurrentView(prevState => {
            return prevState === "default" ? "swapped" : "default";
        })
    }
    const renderExistentOrNot = () => {
        if (typeof selectedFilteredOptions !== "undefined" && selectedFilteredOptions.length > 0) {
            return (
                <View style={{ paddingBottom: 27.5 }}>
                    {locationsNearby.filter((locationOBJ) => calculateFilterType(locationOBJ)).map((element, indxxxxxx) => {
                        const { mainData, date, dateString, id, alreadyCompletedDeliveries, comments, likes, dislikes, postedByName, postedByUsername
                        } = element;
                        const { mainCategory, subCategory, environmentBuildingType, contactRequiredOrNot, description } = mainData;
                        return (
                            <TouchableOpacity delayPressIn={100} onPress={() => handleRedirectToucableCardClicked(element)} key={indxxxxxx}>
                                <Card containerStyle={styles.calloutInnerWrapperCardContainer} style={styles.calloutInnerStyle} wrapperStyle={styles.calloutInnerStyle}>
                                    <Card.Title style={styles.headerTitleMain}>{`${postedByName} a.k.a. ${postedByUsername}`}</Card.Title>
                                    <Card.Divider />
                                    <View style={{ flexDirection: "row", display: "flex" }}>
                                        <View style={styles.column}>
                                            <NativeText style={styles.likesDislikesLabel}>Like(s) / {"\n"}Dislike(s)</NativeText>
                                            <NativeText style={styles.likesDislikesText}>{likes}/{dislikes}</NativeText>
                                        </View>
                                        <View style={styles.column}>
                                            <NativeText style={styles.likesDislikesLabel}>Contact Required Prior?</NativeText>
                                            <NativeText style={styles.baselineSubText}>{contactRequiredOrNot.name === "No, Contact is NOT required prior" ? "Not Required..." : "Required!"}</NativeText>
                                        </View>
                                    </View>
                                    <View style={styles.hrPrimaryThick} />
                                    <View style={{ flexDirection: "row", display: "flex" }}>
                                        <View style={styles.column}>
                                            <NativeText style={styles.likesDislikesLabel}>Main Category</NativeText>
                                            <NativeText style={styles.baselineSubText}>{mainCategory.name}</NativeText>
                                        </View>
                                        <View style={styles.column}>
                                            <NativeText style={styles.likesDislikesLabel}>Sub-Category</NativeText>
                                            <NativeText style={styles.baselineSubText}>{subCategory.name}</NativeText>
                                        </View>
                                    </View>
                                    <View style={styles.hrPrimaryThick} />
                                    <View style={{ flexDirection: "row", display: "flex" }}>
                                        <View style={styles.columnTwoThirds}>
                                            <NativeText style={styles.likesDislikesLabel}>Description</NativeText>
                                            <NativeText style={styles.baselineSubText}>{description.slice(0, 100)}{typeof description !== "undefined" && description.length >= 100 ? "..." : ""}</NativeText>
                                        </View>
                                        <View style={styles.columnOneThird}>
                                            <NativeText style={styles.likesDislikesLabel}>Previously Completed</NativeText>
                                            <NativeText style={styles.baselineSubText}>{alreadyCompletedDeliveries} Deliveries</NativeText>
                                            <NativeText style={[styles.likesDislikesLabel, { marginTop: 4.425 }]}>Location Building-Type</NativeText>
                                            <NativeText style={styles.baselineSubText}>{environmentBuildingType.name === "Commercial or business property" ? "Commerical Property" : "Residential Property"}</NativeText>
                                        </View>
                                    </View>
                                    <View style={styles.hrPrimaryThick} />
                                </Card>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            );
        } else {
            return (
                <Fragment>
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 12.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 12.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 12.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 12.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                    </SkeletonPlaceholder>
                    <View style={{ marginTop: 12.5 }} />
                    <SkeletonPlaceholder>
                        <View style={{ width: "100%", minHeight: 125, height: 125, borderRadius: 35 }} />
                    </SkeletonPlaceholder>
                </Fragment>
            );
        }
    }

    const renderMainContentData = () => {
        if (currentView === "default") {
            return (
                <Fragment>
                   <SearchableDropdown
                        placeholder="Search for specific term(s)..."
                        placeholderTextColor={"#b3b3b3"}
                        selectedItems={selected}
                        onTextChange={(value) => console.log("val searched...:", value)}
                        containerStyle={{ padding: 5 }}
                        blurOnSubmit={true}
                        onBlur={() => {}}
                        onItemSelect={(item) => {}}
                        defaultIndex={2}
                        onRemoveItem={(item, index) => {}}
                        setSort={(item, searchedText) => console.log("item, searchedText", item, searchedText)}
                        itemStyle={styles.addressItemStyle}
                        itemTextStyle={{ color: '#222' }}
                        itemsContainerStyle={styles.searchableContainerStyle}
                        items={[]}
                        resetValue={false}
                        textInputProps={
                            {
                                flex: 1,
                                style: styles.addressInput,
                                ref: searchableDropdownInput
                            }
                        } 
                        listProps={styles.listAddressProps}
                    />
                    <View style={styles.hrThick} />
                    <AwesomeButtonBlue textColor={"#fff"} backgroundShadow={"black"} backgroundDarker={"#000"} backgroundColor={Colors.primaryColor} style={styles.buttonSearchWithCriteria} onPress={() => handleSearchWithCriteria()} stretch={true}>Search W/Selected Criteria</AwesomeButtonBlue>
                    <View style={styles.hrThick} />
                    <View>
                        <View style={styles.textBackgroundOutter}>
                            <Text style={styles.labelCheckbox}>Category Selection</Text>
                        </View>
                    </View>
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("Indoor")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "Indoor");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "Indoor"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("Indoor")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Indoor Enviroment/Storage"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("Outdoor")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "Outdoor");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "Outdoor"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("Outdoor")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Outdoor Enviroment/Storage"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <View style={styles.hrThick} />
                    <View>
                        <View style={styles.textBackgroundOutter}>
                            <Text style={styles.labelCheckbox}>Sub-Category Selection</Text>
                        </View>
                    </View>
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("Garage")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "Garage");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "Garage"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("Garage")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Garage Sub-Category Storage Type"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("Parking Garage")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "Parking Garage");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "Parking Garage"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("Parking Garage")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Parking Garage Sub-Category Storage Type"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("Warehouse")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "Warehouse");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "Warehouse"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("Warehouse")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Warehouse Sub-Category Storage Type"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("Self Storage Unit")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "Self Storage Unit");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "Self Storage Unit"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("Self Storage Unit")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Self Storage Unit Sub-Category Storage Type"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("Shipping Container")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "Shipping Container");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "Shipping Container"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("Shipping Container")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Shipping Container Sub-Category Storage Type"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("Shed/Barn")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "Shed/Barn");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "Shed/Barn"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("Shed/Barn")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Shed/Barn Sub-Category Storage Type"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("Closet (Large)")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "Closet (Large)");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "Closet (Large)"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("Closet (Large)")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Closet (Large) Sub-Category Storage Type"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("Basement")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "Basement");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "Basement"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("Basement")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Basement Sub-Category Storage Type"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("Bedroom")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "Bedroom");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "Bedroom"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("Bedroom")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Bedroom Sub-Category Storage Type"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("Attic")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "Attic");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "Attic"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("Attic")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Attic Sub-Category Storage Type"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("Other/No-Match")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "Other/No-Match");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "Other/No-Match"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("Other/No-Match")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Other/No-Match Sub-Category Storage Type"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <View style={styles.hrThick} />
                    <View>
                        <View style={styles.textBackgroundOutter}>
                            <Text style={styles.labelCheckbox}>Environment Selection</Text>
                        </View>
                    </View>
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes('Climate Controlled')) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== 'Climate Controlled');
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, 'Climate Controlled']
                                });
                            }
                        }}
                        isChecked={calculateChecked('Climate Controlled')}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Climate Controlled Environment"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes('Private Entrance')) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== 'Private Entrance');
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, 'Private Entrance']
                                });
                            }
                        }}
                        isChecked={calculateChecked('Private Entrance')}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Private Entrance Environment"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes('Private Space')) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== 'Private Space');
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, 'Private Space']
                                });
                            }
                        }}
                        isChecked={calculateChecked('Private Space')}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Private Space Environment"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes('Locked/Secure Area')) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== 'Locked/Secure Area');
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, 'Locked/Secure Area']
                                });
                            }
                        }}
                        isChecked={calculateChecked('Locked/Secure Area')}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Locked/Secure Area Environment"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes('Pet Free')) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== 'Pet Free');
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, 'Pet Free']
                                });
                            }
                        }}
                        isChecked={calculateChecked('Pet Free')}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Pet Free Environment"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes('Security Camera Monitored')) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== 'Security Camera Monitored');
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, 'Security Camera Monitored']
                                });
                            }
                        }}
                        isChecked={calculateChecked('Security Camera Monitored')}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Security Camera Monitored Environment"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes('No Stairs')) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== 'No Stairs');
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, 'No Stairs']
                                });
                            }
                        }}
                        isChecked={calculateChecked('No Stairs')}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"No Stairs Environment"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <View style={styles.hrThick} />
                    <View>
                        <View style={styles.textBackgroundOutter}>
                            <Text style={styles.labelCheckbox}>Commercial Or Residential</Text>
                        </View>
                    </View>
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes('Residential')) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== 'Residential');
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, 'Residential']
                                });
                            }
                        }}
                        isChecked={calculateChecked('Residential')}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Residential Building"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes('Commercial or business property')) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== 'Commercial or business property');
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, 'Commercial or business property']
                                });
                            }
                        }}
                        isChecked={calculateChecked('Commercial or business property')}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Commercial/Business Property"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <View style={styles.hrThick} />
                    <View>
                        <View style={styles.textBackgroundOutter}>
                            <Text style={styles.labelCheckbox}>Generalized Space Size/Limit(s)</Text>
                        </View>
                    </View>
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("20' x 10'")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "20' x 10'");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "20' x 10'"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("20' x 10'")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"One car, 20' x 10' Sized Space (Ft.)"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("20' x 20'")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "20' x 20'");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "20' x 20'"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("20' x 20'")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"Two car(s), 20' x 20' Sized Space (Ft.)"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("10' x 10'")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "10' x 10'");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "10' x 10'"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("10' x 10'")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"10' x 10' Sized Space (Ft.)"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("20' x 12'")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "20' x 12'");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "20' x 12'"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("20' x 12'")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"20' x 12' Sized Space (Ft.)"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("20' x 15'")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "20' x 15'");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "20' x 15'"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("20' x 15'")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"20' x 15' Sized Space (Ft.)"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("20' x 18'")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "20' x 18'");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "20' x 18'"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("20' x 18'")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"20' x 18' Sized Space (Ft.)"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("18' x 10'")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "18' x 10'");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "18' x 10'"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("18' x 10'")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"18' x 10' Sized Space (Ft.)"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("20' x 11'")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "20' x 11'");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "20' x 11'"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("20' x 11'")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"20' x 11' Sized Space (Ft.)"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("15' x 10'")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "15' x 10'");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "15' x 10'"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("15' x 10'")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"15' x 10' Sized Space (Ft.)"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes("6' x 8'")) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== "6' x 8'");
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, "6' x 8'"]
                                });
                            }
                        }}
                        isChecked={calculateChecked("6' x 8'")}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={"6' x 8' Sized Space (Ft.)"}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <View style={styles.hrThick} />
                    <View>
                        <View style={styles.textBackgroundOutter}>
                            <Text style={styles.labelCheckbox}>Contact Required Or Not</Text>
                        </View>
                    </View>
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes('Yes, Contact is required prior')) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== 'Yes, Contact is required prior');
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, 'Yes, Contact is required prior']
                                });
                            }
                        }}
                        isChecked={calculateChecked('Yes, Contact is required prior')}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={'Yes, Contact is required prior'}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <CheckBox
                        style={styles.checkboxMainWrapper}
                        onClick={() => {
                            if (selectedFilteredOptions.includes('No, Contact is NOT required prior')) {
                                setSelectedFilterOptions(prevState => {
                                    return prevState.filter(iteration => iteration !== 'No, Contact is NOT required prior');
                                });
                            } else {
                                setSelectedFilterOptions(prevState => {
                                    return [...prevState, 'No, Contact is NOT required prior']
                                });
                            }
                        }}
                        isChecked={calculateChecked('No, Contact is NOT required prior')}
                        checkedImage={<Image source={require("../assets/images/icon/checked.png")} style={styles.checkboxIcon}/>}
                        unCheckedImage={<Image source={require('../assets/images/icon/unchecked.png')} style={styles.checkboxIcon}/>}
                        rightText={'No, Contact is NOT required prior'}
                        rightTextStyle={styles.rightTextCheckbox}
                    />
                    <View style={styles.hrThick} />
                    <AwesomeButtonBlue textColor={"#fff"} backgroundShadow={"black"} backgroundDarker={"#000"} backgroundColor={Colors.primaryColor} style={styles.buttonSearchWithCriteria} onPress={() => handleSearchWithCriteria()} stretch={true}>Search W/Selected Criteria</AwesomeButtonBlue>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <AwesomeButtonBlue textColor={"#fff"} backgroundShadow={"black"} backgroundDarker={"#000"} backgroundColor={Colors.primaryColor} style={styles.buttonSearchWithCriteria} onPress={() => handleSearchWithCriteria()} stretch={true}>Swap Back To Search Criteria</AwesomeButtonBlue>
                    <View style={styles.hrThick} />
                    {renderExistentOrNot()}
                    <View style={styles.hrThick} />
                    <AwesomeButtonBlue textColor={"#fff"} backgroundShadow={"black"} backgroundDarker={"#000"} backgroundColor={Colors.primaryColor} style={styles.buttonSearchWithCriteria} onPress={() => handleSearchWithCriteria()} stretch={true}>Swap Back To Search Criteria</AwesomeButtonBlue>
                </Fragment>
            );
        }
    }
    return (
        <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{ flex: 1, flexGrow: 1, backgroundColor: Colors.backColor }} style={{ flex: 1, flexGrow: 1, backgroundColor: 'white' }}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{ paddingBottom: 32.5 }}>
                <View style={{ margin: 5 }}>
                    <Svg
                        height={175}
                        width={width}
                        viewBox="0 0 1440 320"
                        style={{ position: 'absolute', left: -4.5, right: 0, top: -6.25 }}
                        preserveAspectRatio="none"
                    >
                        <Path
                            fill={Colors.secondaryColor}
                            d={"M0,32L6.9,53.3C13.7,75,27,117,41,138.7C54.9,160,69,160,82,144C96,128,110,96,123,122.7C137.1,149,151,235,165,277.3C178.3,320,192,320,206,282.7C219.4,245,233,171,247,165.3C260.6,160,274,224,288,250.7C301.7,277,315,267,329,229.3C342.9,192,357,128,370,96C384,64,398,64,411,69.3C425.1,75,439,85,453,96C466.3,107,480,117,494,122.7C507.4,128,521,128,535,117.3C548.6,107,562,85,576,106.7C589.7,128,603,192,617,192C630.9,192,645,128,658,122.7C672,117,686,171,699,192C713.1,213,727,203,741,208C754.3,213,768,235,782,218.7C795.4,203,809,149,823,133.3C836.6,117,850,139,864,133.3C877.7,128,891,96,905,85.3C918.9,75,933,85,946,106.7C960,128,974,160,987,149.3C1001.1,139,1015,85,1029,58.7C1042.3,32,1056,32,1070,64C1083.4,96,1097,160,1111,181.3C1124.6,203,1138,181,1152,176C1165.7,171,1179,181,1193,186.7C1206.9,192,1221,192,1234,170.7C1248,149,1262,107,1275,117.3C1289.1,128,1303,192,1317,202.7C1330.3,213,1344,171,1358,149.3C1371.4,128,1385,128,1399,149.3C1412.6,171,1426,213,1433,234.7L1440,256L1440,0L1433.1,0C1426.3,0,1413,0,1399,0C1385.1,0,1371,0,1358,0C1344,0,1330,0,1317,0C1302.9,0,1289,0,1275,0C1261.7,0,1248,0,1234,0C1220.6,0,1207,0,1193,0C1179.4,0,1166,0,1152,0C1138.3,0,1125,0,1111,0C1097.1,0,1083,0,1070,0C1056,0,1042,0,1029,0C1014.9,0,1001,0,987,0C973.7,0,960,0,946,0C932.6,0,919,0,905,0C891.4,0,878,0,864,0C850.3,0,837,0,823,0C809.1,0,795,0,782,0C768,0,754,0,741,0C726.9,0,713,0,699,0C685.7,0,672,0,658,0C644.6,0,631,0,617,0C603.4,0,590,0,576,0C562.3,0,549,0,535,0C521.1,0,507,0,494,0C480,0,466,0,453,0C438.9,0,425,0,411,0C397.7,0,384,0,370,0C356.6,0,343,0,329,0C315.4,0,302,0,288,0C274.3,0,261,0,247,0C233.1,0,219,0,206,0C192,0,178,0,165,0C150.9,0,137,0,123,0C109.7,0,96,0,82,0C68.6,0,55,0,41,0C27.4,0,14,0,7,0L0,0Z"}
                        />
                    </Svg>
                    {renderMainContentData()}
                    <Animated.View
                        style={{ transform: [{ rotateX: '180deg' }] }}
                    >
                        <Svg
                            height={175}
                            width={width}
                            viewBox="0 0 1440 320"
                            style={{ position: 'absolute', left: -4.5, right: 0, bottom: -125 }}
                            preserveAspectRatio="none"
                        >
                            <Path
                                fill={Colors.secondaryColor}
                                d={"M0,32L6.9,53.3C13.7,75,27,117,41,138.7C54.9,160,69,160,82,144C96,128,110,96,123,122.7C137.1,149,151,235,165,277.3C178.3,320,192,320,206,282.7C219.4,245,233,171,247,165.3C260.6,160,274,224,288,250.7C301.7,277,315,267,329,229.3C342.9,192,357,128,370,96C384,64,398,64,411,69.3C425.1,75,439,85,453,96C466.3,107,480,117,494,122.7C507.4,128,521,128,535,117.3C548.6,107,562,85,576,106.7C589.7,128,603,192,617,192C630.9,192,645,128,658,122.7C672,117,686,171,699,192C713.1,213,727,203,741,208C754.3,213,768,235,782,218.7C795.4,203,809,149,823,133.3C836.6,117,850,139,864,133.3C877.7,128,891,96,905,85.3C918.9,75,933,85,946,106.7C960,128,974,160,987,149.3C1001.1,139,1015,85,1029,58.7C1042.3,32,1056,32,1070,64C1083.4,96,1097,160,1111,181.3C1124.6,203,1138,181,1152,176C1165.7,171,1179,181,1193,186.7C1206.9,192,1221,192,1234,170.7C1248,149,1262,107,1275,117.3C1289.1,128,1303,192,1317,202.7C1330.3,213,1344,171,1358,149.3C1371.4,128,1385,128,1399,149.3C1412.6,171,1426,213,1433,234.7L1440,256L1440,0L1433.1,0C1426.3,0,1413,0,1399,0C1385.1,0,1371,0,1358,0C1344,0,1330,0,1317,0C1302.9,0,1289,0,1275,0C1261.7,0,1248,0,1234,0C1220.6,0,1207,0,1193,0C1179.4,0,1166,0,1152,0C1138.3,0,1125,0,1111,0C1097.1,0,1083,0,1070,0C1056,0,1042,0,1029,0C1014.9,0,1001,0,987,0C973.7,0,960,0,946,0C932.6,0,919,0,905,0C891.4,0,878,0,864,0C850.3,0,837,0,823,0C809.1,0,795,0,782,0C768,0,754,0,741,0C726.9,0,713,0,699,0C685.7,0,672,0,658,0C644.6,0,631,0,617,0C603.4,0,590,0,576,0C562.3,0,549,0,535,0C521.1,0,507,0,494,0C480,0,466,0,453,0C438.9,0,425,0,411,0C397.7,0,384,0,370,0C356.6,0,343,0,329,0C315.4,0,302,0,288,0C274.3,0,261,0,247,0C233.1,0,219,0,206,0C192,0,178,0,165,0C150.9,0,137,0,123,0C109.7,0,96,0,82,0C68.6,0,55,0,41,0C27.4,0,14,0,7,0L0,0Z"}
                            />
                        </Svg>
                    </Animated.View>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}

const TabBarScreen = ({ storageData }) => {

    const layout = useWindowDimensions();

    const navigation = useNavigation();

    const [ index, setIndex ] = useState(0);
    const [ routes ] = useState([
        { key: 'first', title: "Available Drop-Off Location(s)", },
        { key: 'second', title: "Search/Query Specific Drop-Off Point's" },
    ]);
    const [ locationsNearby, setLocationsNearby ] = useState([]);
    const [ selectedFilteredOptions, setSelectedFilterOptions ] = useState([]);

    useEffect(() => {

        if (_.has(storageData, "dropoffLocationData")) {

            const { latitude, longitude } = storageData.dropoffLocationData;

            const currentLoc = { latitude, longitude, latitudeDelta: 0.00875, longitudeDelta: 0.00875 };
    
            const config = {
                params: {
                    currentLoc
                }
            };
    
            axios.get(`${BASE_URL}/gather/dropoff/locations/points`, config).then((res) => {
    
                if (res.data.message === "Gathered relevant location points!") {
    
                    console.log(res.data);
    
                    const { results } = res.data;

                    setLocationsNearby(results);
    
                    Toast.show({
                        type: 'success',
                        text1: `Successfully gathered the relevant drop-off locations!`,
                        text2: `We've successfully gathered the related drop-off locations which should now be displayed on the appropriate places on the map...`,
                        visibilityTime: 3250,
                        position: "bottom",
                        onHide: () => {}
                    });
                } else {
                    console.log("Err", res.data);
    
                    Toast.show({
                        type: 'error',
                        text1: `An error occurred while fetching relevant results!`,
                        text2: `We've encountered an error while attempting to fetch the desired/relevant drop-off locations, please try to load the page again or contact support if the problem persists...`,
                        visibilityTime: 3250,
                        position: "bottom"
                    });
                }
            }).catch((err) => {
                console.log(err);
    
                Toast.show({
                    type: 'error',
                    text1: `An error occurred while fetching relevant results!`,
                    text2: `We've encountered an error while attempting to fetch the desired/relevant drop-off locations, please try to load the page again or contact support if the problem persists...`,
                    visibilityTime: 3250,
                    position: "bottom"
                });
            })
        } else {
            Geolocation.getCurrentPosition(info => {

                const { latitude, longitude } = info.coords;
            
                const currentLoc = { latitude, longitude, latitudeDelta: 0.00875, longitudeDelta: 0.00875 };
    
                const config = {
                    params: {
                        currentLoc
                    }
                };

                axios.get(`${BASE_URL}/gather/dropoff/locations/points`, config).then((res) => {
                    if (res.data.message === "Gathered relevant location points!") {
                        console.log(res.data);
        
                        const { results } = res.data;

                        setLocationsNearby(results);
        
                        Toast.show({
                            type: 'success',
                            text1: `Successfully gathered the relevant drop-off locations!`,
                            text2: `We've successfully gathered the related drop-off locations which should now be displayed on the appropriate places on the map...`,
                            visibilityTime: 3250,
                            position: "bottom",
                            onHide: () => {}
                        });
                    } else {
                        console.log("Err", res.data);
        
                        Toast.show({
                            type: 'error',
                            text1: `An error occurred while fetching relevant results!`,
                            text2: `We've encountered an error while attempting to fetch the desired/relevant drop-off locations, please try to load the page again or contact support if the problem persists...`,
                            visibilityTime: 3250,
                            position: "bottom"
                        });
                    }
                }).catch((err) => {
                    console.log(err);
        
                    Toast.show({
                        type: 'error',
                        text1: `An error occurred while fetching relevant results!`,
                        text2: `We've encountered an error while attempting to fetch the desired/relevant drop-off locations, please try to load the page again or contact support if the problem persists...`,
                        visibilityTime: 3250,
                        position: "bottom"
                    });
                })
            });
        }
    }, []);

    const handleRedirectToucableCardClicked = (listing) => {
        console.log("onPress clicked/ran...", listing);

        navigation.navigate("IndividualDropOffListingViewOnly", { listing });
    }

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'first':
                return <RenderMapViewNearbyUsers setLocationsNearby={setLocationsNearby} handleRedirectToucableCardClicked={handleRedirectToucableCardClicked} locationsNearby={locationsNearby} jumpTo={jumpTo} />;
            case 'second':
                return <SearchableDropoffLocationsHelper handleRedirectToucableCardClicked={handleRedirectToucableCardClicked} locationsNearby={locationsNearby} selectedFilteredOptions={selectedFilteredOptions} setSelectedFilterOptions={setSelectedFilterOptions} />;
            default: 
                return null;
        }
    }

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: Colors.primaryColor }}
                    tabStyle={{ width: layout.width / 2 }}
                    scrollEnabled={true}
                    style={{ backgroundColor: 'black' }}
                    renderLabel={({ route }) => {
                        return (
                            <Fragment>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ ...Fonts.blackRegular, textAlign: "center", color: "#fff" }}>
                                        {route.title}
                                    </Text>
                                </View>
                            </Fragment>
                        );
                    }}
                />
            )}
        />
    )
} 

const mapStateToProps = (state) => {
    return {
        location: state.location.currentLoc,
        storageData: state.storage.data,
        authData: state.auth.data
    }
}
export default connect(mapStateToProps, { })(TabBarScreen);