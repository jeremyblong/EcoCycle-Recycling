import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { Text, View, StatusBar } from "react-native";
import { Colors, Sizes } from "../../constants/styles";
import TabBarScreen from "../../component/tabBarScreen";
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';

class StatisticScreen extends Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: Sizes.fixPadding * 2.0,
                    paddingVertical: Sizes.fixPadding,
                    alignItems: 'center', backgroundColor: 'white'
                }}>
                    <Text style={{ fontSize: 16.0, color: '#006400', fontFamily: 'Montserrat_Bold' }}>
                        Market is up 3.68% today
                    </Text>
                    <Icon name="search-sharp" size={24} color={Colors.primaryColor} />
                </View>

                <TabBarScreen navigation={this.props.navigation} />
            </SafeAreaView>
        )
    }
}

export default withNavigation(StatisticScreen);