import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import { Fonts, Sizes } from "../../constants/styles";
import TabBarScreen from "../../components/TabBarScreen";

const NearbyBreakinAlertOccurances = (props) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
            <View style={{ height: 55.0, justifyContent: 'center' }}>
                <Text style={{ ...Fonts.black20Bold, marginHorizontal: Sizes.fixPadding * 2.0, color: "#fff" }}>
                    View/Search Nearby Drop-Off's
                </Text>
            </View>
            <TabBarScreen props={props} />
        </SafeAreaView>
    );
}

NearbyBreakinAlertOccurances.navigationOptions = {
    title: "View/Search Nearby Drop-Off's",
    headerTitleStyle: { ...Fonts.white20Bold, marginLeft: -Sizes.fixPadding * 2.0 },
    headerStyle: {
        backgroundColor: "black",
        elevation: 0,
    }
}

export default NearbyBreakinAlertOccurances;