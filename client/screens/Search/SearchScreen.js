import React from "react";
import { Text, View, TextInput, ScrollView, StyleSheet, Image } from "react-native";
import { Fonts, Sizes } from "../../constants/styles";
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchScreen = ({ navigation }) => {
    const trendingsList = [
        "emily_wilson, 404 Cedar St, Hamletville, USA",
        "leo_harris, 1111 Redwood St, Seaside, USA",
        "john_doe, 123 Main St, Anytown, USA",
        "tina_perez, 1919 Oakwood St, Capitol City, USA",
        "victor_hughes, 2020 Cedarwood St, Mountainview, USA",
        "charlie_davis, 202 Pine St, Otherville, USA",
        "rachel_robinson, 1717 Beech St, Plainville, USA",
        "paul_walker, 1515 Elmwood St, Bayside, USA",
        "jack_green, 909 Willow St, Uptown, USA",
        "nate_taylor, 1313 Pinecone St, Rivertown, USA",
        "alice_jones, 789 Oak St, Sometown, USA",
        "hank_martin, 707 Cherry St, Ruralville, USA",
        "mary_jackson, 1212 Sequoia St, Hilltown, USA",
        "isabel_white, 808 Aspen St, Downtown, USA",
        "daniel_clark, 303 Birch St, Villagetown, USA",
        "quincy_sanders, 1616 Maplewood St, Forestville, USA",
        "frank_miller, 505 Spruce St, Metropolis, USA",
        "olivia_clarkson, 1414 Fir St, Lakeside, USA",
        "grace_lee, 606 Walnut St, Urbanville, USA",
        "jane_smith, 456 Elm St, Othertown, USA",
        "samuel_moore, 1818 Pinewood St, Parkville, USA",
        "bob_brown, 101 Maple St, Anycity, USA",
        "karen_black, 1010 Poplar St, Midcity, USA"
    ];

    function header() {
        return <View style={{
            backgroundColor: 'white', elevation: 4.0,
            height: 63.0, paddingHorizontal: Sizes.fixPadding * 2.0,
            justifyContent: 'center'
        }}>
            <View style={styles.searchContainerStyle}>
                <Image source={require("../../assets/images/icon/mag_prev_ui.png")} style={{ maxWidth: 27.5, maxHeight: 27.5 }} />
                <View style={{ flex: 1 }}>
                    <TextInput
                        placeholder="Search for users & dropoff points"
                        style={{ ...Fonts.gray17Regular, marginLeft: Sizes.fixPadding, }}
                    />
                </View>
            </View>
        </View>
    }

    function recentSearchesText() {
        return (
            <View style={styles.recentSearchesContainerTextStyle}>
                <Text style={{ ...Fonts.black18Bold }}>Your recent searches</Text>
                <Text style={{ ...Fonts.primaryColorRegular }}>Show more</Text>
            </View>
        )
    }

    const recentSearchList = ["daniel_clark, 303 Birch St, Villagetown, USA", "quincy_sanders, 1616 Maplewood St, Forestville, USA"];

    function recentSearches() {
        return (
            recentSearchList.map((item) =>
                <View key={item} style={styles.recentSearchesListStyle}>
                    <Image source={require("../../assets/images/icon/arrow_prev_ui.png")} style={{ maxWidth: 27.5, maxHeight: 27.5 }} />
                    <Text style={{ marginLeft: Sizes.fixPadding, fontSize: Sizes.fixPadding + 5.0, }}>{item}</Text>
                </View>
            )
        )
    }

    function trendingText() {
        return (
            <View style={styles.trendingTextContainerStyle}>
                <Text style={{ ...Fonts.black18Bold }}>Recent Searches</Text>
            </View>
        )
    }

    function trendings() {
        return (
            trendingsList.map((item) =>
                <View key={item} style={styles.trendingListStyle}>
                    <Image source={require("../../assets/images/icon/arrow_prev_ui.png")} style={{ maxWidth: 27.5, maxHeight: 27.5 }} />
                    <Text style={{ marginLeft: Sizes.fixPadding, fontSize: Sizes.fixPadding + 5.0, }}>{item}</Text>
                </View>
            )
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {header()}
            <ScrollView>
                {recentSearchesText()}
                {recentSearches()}
                {trendingText()}
                {trendings()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainerStyle: {
        backgroundColor: '#F5F5F5',
        borderRadius: 30.0,
        height: 45.0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Sizes.fixPadding + 5.0,
    },
    recentSearchesContainerTextStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        marginBottom: Sizes.fixPadding,
    },
    recentSearchesListStyle: {
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        alignItems: 'center'
    },
    trendingTextContainerStyle: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding,
        justifyContent: 'center'
    },
    trendingListStyle: {
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        alignItems: 'center'
    }
})

SearchScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default SearchScreen;