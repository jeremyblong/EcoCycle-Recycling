import React, { Fragment } from "react";
import { View, Text, Image } from "react-native";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import styles from "./coverPhotoPaneStyles.js";



const PaneUploadCoverPhotoHelper = ({ coverPhotoRef }) => {
    return (
        <Fragment>
            <View style={styles.container}>

                <View style={styles.contentContainer}>

                    <View style={styles.titleWrapper}>
                    
                    </View>
                    <View style={styles.inputWrapper}>
                    
                    </View>

                </View>
                <View style={styles.footer}>
                    <AwesomeButtonBlue backgroundDarker={"#000"} backgroundColor={"#e60000"} style={styles.absoluteButtonBottom} type={"secondary"} onPress={() => coverPhotoRef.current.close()} textColor={"#fff"} backgroundShadow={"black"} stretch={true}>Cancel/Close Pane</AwesomeButtonBlue>
                </View>
            </View>
        </Fragment>
    );
}
export default PaneUploadCoverPhotoHelper;