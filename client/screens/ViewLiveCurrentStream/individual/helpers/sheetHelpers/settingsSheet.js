import React, { Fragment } from "react";
import { Dimensions, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { ListItem } from "@rneui/themed";

const { width, height } = Dimensions.get("window");

const RenderSettingsSheetHelper = ({ sheetRef }) => {
    return (
        <Fragment>
            <RBSheet
                ref={sheetRef}
                height={height * 0.575}
                openDuration={250}
                closeOnDragDown={true}
                customStyles={{
                    container: {
                        
                    }
                }}
            >
                <ListItem onPress={() => {}} style={styles.listitemSettings} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Full Screen</ListItem.Title>
                        <ListItem.Subtitle>Display "full-screen" view (View via entire screen)</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem onPress={() => {}} style={styles.listitemSettings} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Speak Through Camera</ListItem.Title>
                        <ListItem.Subtitle>Speak via voice communication through this camera</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem onPress={() => {}} style={styles.listitemSettings} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Listen/Audio-Viewing</ListItem.Title>
                        <ListItem.Subtitle>Stealthfully listen to audio through this camera</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem onPress={() => {}} style={styles.listitemSettings} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>AI Tracking/Detection Options & Settings</ListItem.Title>
                        <ListItem.Subtitle>Manage/Edit your AI (artificial intelligence) settings such as tracking, identity verification...</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem onPress={() => {}} style={styles.listitemSettings} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Record specific time-slots</ListItem.Title>
                        <ListItem.Subtitle>Manage, control & record specific time-slots throughout the week (daily automation)</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </RBSheet>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    listitemSettings: {
        maxWidth: width,
        width
    }
});
export default RenderSettingsSheetHelper;