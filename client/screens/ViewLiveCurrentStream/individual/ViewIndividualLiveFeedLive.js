import React, { Component, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./ViewIndividualLiveFeedLiveStyles.js";
import { BASE_ASSET_URL } from "@env";
import Video from "react-native-video";
import RenderSettingsSheetHelper from "./helpers/sheetHelpers/settingsSheet.js";
import { io } from "socket.io-client";

const ViewIndividualLiveFeedStreamManuver = (props) => {

    const sheetRef = useRef(null);

    return (
        <View style={styles.outterContainer}>
            <View style={styles.topContainer}>
                <Video
                    source={{ uri: `${BASE_ASSET_URL}/Pexels+Videos+4698.mp4` }}
                    muted={true}
                    paused={true}
                    controls={false}
                    style={styles.backgroundVideo}
                    resizeMode="cover"
                    onError={(error) => console.log("CRITICALLLLL ERRRR: ---- .... :", error)}
                    onProgress={(val) => console.log("progresssssssssssssssss", val)}
                />
                <View style={styles.spacerVideoBottom} />
            </View>
            <RenderSettingsSheetHelper sheetRef={sheetRef} />
            <View style={styles.controlsContainer}>
                <TouchableOpacity onPress={() => sheetRef.current.open()}>
                    <Image source={require("../../../assets/images/icon/settings-pretty.png")} style={styles.topRightIcon} />
                </TouchableOpacity>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => {}}>
                        <Image source={require("../../../assets/images/icon/up.png")} style={styles.controllerIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.centeredRow}>
                    <View style={styles.columnContainer}>
                        <TouchableOpacity onPress={() => {}}>
                            <Image source={require("../../../assets/images/icon/left.png")} style={styles.controllerIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.columnContainer}>
                        <TouchableOpacity onPress={() => {}}>
                            <Image source={require("../../../assets/images/icon/right.png")} style={styles.controllerIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => {}}>
                        <Image source={require("../../../assets/images/icon/down.png")} style={styles.controllerIcon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => {}}>
                    <Image source={require("../../../assets/images/icon/camera.png")} style={styles.bottomLeftIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                    <Image source={require("../../../assets/images/icon/record.png")} style={styles.bottomRightIcon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default ViewIndividualLiveFeedStreamManuver;