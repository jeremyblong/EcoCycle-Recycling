import React, { Fragment, useState } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Text as NativeText, Card, Icon } from '@rneui/themed';
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native"
import Video from 'react-native-video';
import { BASE_ASSET_URL } from "@env";
import styles from "./ViewMainVideoFeedManageStyles.js";

const ViewMainFeedAllConnectedComponents = (props) => { 

    const navigation = useNavigation();

    const [ feeds, setFeeds ] = useState([{
        id: 1,
        name: "Balcony",
        subtitle: "My back porch balcony view/camera.",
        active: false,
        motion: false,
        pictureQuality: "1080p",
        nightVision: true,
        micAndAudio: true,
        statusLight: false,
        siren: true,
        alertsOnMovement: false,
        notifications: true
    }, {
        id: 2,
        name: "Left House View",
        subtitle: "Complete view of left side of house - full coverage.",
        active: false,
        motion: false,
        pictureQuality: "1080p",
        nightVision: false,
        micAndAudio: false,
        statusLight: false,
        siren: true,
        alertsOnMovement: false,
        notifications: true
    }, {
        id: 3,
        name: "Garage View",
        subtitle: "View of external house garage view - street/driveway view.",
        active: false,
        motion: true,
        pictureQuality: "1080p",
        nightVision: true,
        micAndAudio: true,
        statusLight: false,
        siren: true,
        alertsOnMovement: false,
        notifications: true
    }, {
        id: 4,
        name: "Doorbell View",
        subtitle: "View of front porch and/or door - full wide-view of porch.",
        active: true,
        motion: true,
        pictureQuality: "4k",
        nightVision: true,
        micAndAudio: true,
        statusLight: false,
        siren: true,
        alertsOnMovement: false,
        notifications: true
    }]);

    const renderItem = ({ item, index }) => {
        return (
            <Fragment key={index}>
                <Card containerStyle={styles.cardContainerStyle} style={{ flex: 1 }}>
                    <Card.Title style={styles.name}>{item.name}</Card.Title>
                    <Card.FeaturedSubtitle style={{ color: "#fff", textAlign: 'left', marginBottom: 7.5  }}>{item.subtitle}</Card.FeaturedSubtitle>
                    <Card.Divider />
                    <View style={{
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: 'center'
                    }}>
                        <Button
                            icon={
                                <Icon
                                    name="camera"
                                    color={"white"}
                                    iconStyle={{ marginRight: 10 }}
                                />
                            }
                            onPress={() => {
                                navigation.navigate("IndividualLiveStreamView", { item })
                            }}
                            containerStyle={styles.containerButtonStyle}
                            buttonStyle={styles.buttonStyleCentered}
                            titleStyle={{ color: "white" }}
                            title="Watch Live"
                        />
                    </View>
                    <Video
                        source={{ uri: `${BASE_ASSET_URL}/Pexels+Videos+4698.mp4` }}
                        muted={true}   
                        paused={true}
                        playInBackground={false}
                        controls={false}
                        style={styles.videoStyle}
                        resizeMode="cover"
                        onError={(error) => console.log("CRITICALLLLL ERRRR: ---- .... :", error)}
                        onProgress={(val) => console.log("progresssssssssssssssss", val)}
                    />
                    <Card.Divider />
                </Card>
            </Fragment>
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32.5, backgroundColor: "black" }} style={{ flex: 1 }}>
                <FlatList
                    maxToRenderPerBatch={2}
                    data={feeds}
                    ListHeaderComponent={() => <View style={{ flex: 1 }}>
                        <Text style={styles.headerText}>Camera View(s)</Text>
                    </View>}
                    renderItem={renderItem}
                    keyExtractor={(item) => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{}}
                />
            </ScrollView>
        </View>
    );
}

export default ViewMainFeedAllConnectedComponents