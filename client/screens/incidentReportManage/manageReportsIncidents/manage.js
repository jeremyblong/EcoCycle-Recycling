import React, { Fragment } from 'react'
import { Text, View, Image, ScrollView, Dimensions, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Colors, Sizes, Fonts } from "../../../constants/styles.js";
import { useNavigation } from "@react-navigation/native";


const { width, height } = Dimensions.get("window");

const DemoScreenPlaceholderWithImageBottom = (props) => {

    const navigation = useNavigation();

    const renderListItem = ({ icon, backColor, frontColor, title, subtitle }) => {

        return (
            <View style={styles.infoContainerStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{
                        ...styles.infoContainerCircleStyle,
                        backgroundColor: backColor,
                        borderColor: frontColor,
                    }}>
                        {icon}
                    </View>
                    <View style={{ flexDirection: "column", maxWidth: "85%" }}>
                        <Text style={{ ...Fonts.white17Bold, marginLeft: Sizes.fixPadding, paddingRight: 7.5 }}>
                            {title}
                        </Text>
                        <Text style={{ ...Fonts.white13Medium, marginLeft: Sizes.fixPadding, paddingRight: 7.5 }}>
                            {subtitle}
                        </Text>
                    </View>
                </View>
                <Image source={require("../../../assets/images/icon/right-arrow.png")} style={{ maxWidth: 22.5, maxHeight: 22.5 }} />
            </View>
        )
    };
    return (
        <Fragment>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar translucent={false} backgroundColor={Colors.primary} />
                <ScrollView contentContainerStyle={{ backgroundColor: "black", width, height, paddingTop: 25 }}>

                    <View style={styles.bottomImageContainer}>
                        <Image source={require("../../../assets/images/police-phone.png")} style={styles.largeImaged} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Fragment>
    );
}
const styles = StyleSheet.create({
    iconCustom: {
        maxWidth: 42.5,
        maxHeight: 42.5,
        borderRadius: 17.5,
        minHeight: 42.5,
        minWidth: 42.5
    },  
    bottomImageContainer: {
        margin: 22.5,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },  
    largeImaged: {
        resizeMode: "contain",
        maxWidth: width * 0.925,
        height: height * 0.525,
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 102.5
    },  
    listitemBorderBottom: {
        borderBottomColor: "#fff", 
        borderBottomWidth: 1.75,
        paddingTop: 15
    },
    infoContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding + 3.0
    },
    infoContainerCircleStyle: {
        height: 52.0, width: 52.0, borderRadius: 26.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.0
    }
});
export default DemoScreenPlaceholderWithImageBottom;