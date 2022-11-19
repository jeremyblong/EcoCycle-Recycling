import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Fonts, Sizes } from "../../constants/styles";
import { TransitionPresets } from 'react-navigation-stack';

const AboutUsScreen = () => {
    return (
        <View style={styles.aboutUsContainerStyle}>

            <Text style={{ ...Fonts.black16Regular, textAlign: 'justify' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </Text>

            <Text style={{ ...Fonts.black16Regular, marginVertical: Sizes.fixPadding + 5.0, textAlign: 'justify' }}>
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>

            <Text style={{ ...Fonts.black16Regular, textAlign: 'justify' }}>
                Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source
            </Text>

        </View>
    )
}

AboutUsScreen.navigationOptions = {
    title: 'About Us',
    headerTitleStyle: { ...Fonts.black20Bold, marginLeft: -Sizes.fixPadding * 2.0 },
    ...TransitionPresets.SlideFromRightIOS,
}

const styles = StyleSheet.create({
    aboutUsContainerStyle: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0
    }
})

export default AboutUsScreen;