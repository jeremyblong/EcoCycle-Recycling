import React from "react";
import Svg, { Path } from 'react-native-svg';
import { View } from "react-native";

const WavyHeaderTopperHelper = ({ customStyles, dString }) => {
    return (
        <View style={customStyles}>
            <View style={{ height: 90 }}>
                <Svg
                    height={90}
                    width="100%"
                    viewBox="0 0 1440 320"
                    style={{ position: 'absolute' }}
                >
                    <Path
                        fill="#D81159"
                        d={dString}
                    />
                </Svg>
            </View>
        </View>
    );
}
export default WavyHeaderTopperHelper;