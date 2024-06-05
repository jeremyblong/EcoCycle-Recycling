import React, { useState, useEffect, Fragment } from 'react';
import { 
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList 
} from "react-native";
import styles from "./mainPricingInitiationPageStyles.js";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import _ from "lodash";
import axios from "axios";
import { BASE_URL } from "@env";
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const pickerSelectOptions = [
    { label: 'Smartphones/Mobile Only', value: 'mobiles' },
    { label: 'Tablet Only', value: 'tablets' },
    { label: "Smartwatches/Wearables Only", value: "wearables" },
    { label: "Laptop Only", value: "laptops" },
    { label: "Television(s) Only", value: "televisions" },
    { label: "Gaming Console's Only", value: "gamingconsoles" }
]

const MainPricingIdentificationInitiationPage = (props) => {

    const navigation = useNavigation();
    
    const [ searchValue, setSearchValue ] = useState("");
    const [ data, setData ] = useState([]);
    const [ page, setPage ] = useState(0);
    const [ category, setCategory ] = useState({ label: 'Smartphones/Mobile Only', value: 'mobiles' });

    useEffect(() => {
        setTimeout(() => {
            fetchInitialResultsUponLoad();
        }, 500);
    }, []);

    const handleNewDataSearch = async (query) => {

        const configuration = {
            params: {
                query,
                category: category.value
            }
        }

        const response = await axios.get(`${BASE_URL}/fetch/device/type/via/query`, configuration);

        console.log("Searched with query...");

        if (response.data.message === "Successfully fetched desired results from query & category selected!") {

            const { results } = response.data;

            setData(results.slice(0, 32));

            setSearchValue("");
        } else {
            console.log("Could NOT find appropriate data from API request.");

            Toast.show({
                type: 'error',
                text1: `Could NOT fetch your results...`,
                text2: `Make sure you're entering a 'string' LONGER than 0 charactor's and/or try your action again!`,
                visibilityTime: 4250,
                position: "bottom"
            });
        }
    }

    const fetchInitialResultsUponLoad = async () => {

        const configuration = {
            params: {
                query: "iphone",
                category: "mobiles"
            }
        }

        const response = await axios.get(`${BASE_URL}/fetch/device/type/via/query`, configuration);

        if (response.data.message === "Successfully fetched desired results from query & category selected!") {

            const { results } = response.data;

            setData(results.slice(0, 32));

        } else {
            console.log("Could NOT find appropriate data from API request.");

            Toast.show({
                type: 'error',
                text1: `Could NOT fetch your results...`,
                text2: `Make sure you're entering a 'string' LONGER than 0 charactor's and/or try your action again!`,
                visibilityTime: 4250,
                position: "bottom"
            });
        }
    }

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    const renderItemData = ({ item, index }) => {
        if (index === 0) {
            console.log("item", item);
        }

        const { Model, Processor, RAM, Brand } = item;

        return (
            <TouchableOpacity onPress={() => navigation.navigate('IndividualItemInformationSelection', { item, category })} style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image style={styles.cardImage} source={{ uri: _.has(item, "Picture URL") ? item["Picture URL"] : "https://identification-blockchain.s3.us-west-2.amazonaws.com/no-image.jpg" }} />
                </View>
                <View style={styles.cardContent}>
                    <Text style={styles.title}>{_.has(item, "Model") && _.has(item, "Brand") ? `${Brand} ${Model}` : "Model/Brand ~ Unavailable"}</Text>
                    <Text style={styles.count}>{`${_.has(item, "Processor") ? Processor : "Unavailable"} - ${_.has(item, "RAM") ? RAM : "Unavailable"} - ${item["Internal storage"]}`}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    const renderEmptyContainer = () => {
        return (
            <Fragment>
                <View style={styles.toppedContainerTextWrapper}>
                    <Text style={styles.noResultText}>We could NOT find any results/products for your desired search query/term...</Text>
                </View>
                <View style={styles.centeredBothWays}>
                    <Image resizeMode={"contain"} source={require("../../../../assets/images/pricing_prev_ui.png")} style={styles.resultsNotFoundImage} />
                </View>
            </Fragment>
        );
    }
    return (
        <View>
            <ScrollView 
                style={styles.mainScrollviewContainer} 
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        console.log("close to bottom...!");
                        
                        // onScrollHandler();
                    }
                }}
                scrollEventThrottle={400}
            >
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Select a specific product category (if you desire)</Text>
                    <View style={styles.thinerHR} />
                    <RNPickerSelect
                        onValueChange={(value, index) => setCategory(pickerSelectOptions[index === 0 ? index : index - 1])} // remove index as it starts at 1 and NOT 0 index(ed)
                        // value={category}
                        items={pickerSelectOptions}
                    />
                    <View style={styles.thinerHR} />
                    <Text style={[styles.label, { marginBottom: 22.5 }]}>Enter a device query term (Model, Version, Etc...)</Text>
                    <FloatingLabelInput
                        label={(`Searching '${category.label}'`).slice(0, 40)}
                        isPassword={false}
                        maxLength={14}
                        showCountdown={true}
                        onBlur={() => handleNewDataSearch(searchValue)}
                        rightComponent={<TouchableOpacity onPress={() => handleNewDataSearch(searchValue)}><Image style={styles.innerIconInput} source={require("../../../../assets/images/icon/search.png")} /></TouchableOpacity>}
                        togglePassword={false}
                        value={searchValue}
                        onChangeText={value => {
                            setSearchValue(value);
                        }}
                    />
                </View>
                <View style={styles.thinHR} />
                <FlatList style={styles.list}
                    contentContainerStyle={styles.listContainer}
                    data={data}
                    scrollEventThrottle={400}
                    horizontal={false}
                    numColumns={2}
                    onEndThreshold={0}
                    keyExtractor={(item, index) => {
                        return index.toString();
                    }}
                    ListEmptyComponent={renderEmptyContainer()}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={styles.separator}/>
                        )
                    }}
                    renderItem={(post) => renderItemData(post)}
                />
            </ScrollView>
        </View>
    );
}

export default MainPricingIdentificationInitiationPage;