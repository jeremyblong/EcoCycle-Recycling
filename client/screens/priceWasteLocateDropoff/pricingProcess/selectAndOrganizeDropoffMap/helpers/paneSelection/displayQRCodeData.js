import React, { Fragment, useState } from 'react';
import { View, Text } from "react-native";
import styles from "./universalStyles.js";
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import { saveDropOffCartData } from "../../../../../../redux/actions/ewasteCart/cartLogic.js";
import { connect } from "react-redux";
import _ from "lodash";


const SheetPaneQRCodeDataHelper = ({ sheetRef, formData }) => {

    const navigation = useNavigation();

    // const endpointURL = `send/notification/request/electronic/dropoff/***${uuid.v4()}/${otherUserID}`;
    // // // create QR-code string for api request/call
    // const apiString = `${BASE_URL}/${endpointURL}`;
    // // // add QR code to redux state in preparation for invite...
    // this.props.saveDropOffCartData({ QRString: apiString });

    const renderPageData = () => {
        return (
            <View style={{ backgroundColor: "#000", height: "100%" }}>
                <View style={styles.topContainerViewPortion}>
                    <Text style={styles.qrHeaderText}>Please scan the QR code to request/activate a new 'drop-off' request, the other user will be able to approve or deny this request with a 12hr expiration to encourage quick responses/action...</Text>
                    <View style={styles.thinDividerHRwhite} />
                    <Text style={styles.qrSubHeaderText}>This QR contains a specifically curated request - simply scan & the action will be automatically activated! </Text>
                    <QRCode
                        value={_.has(formData, "QRString") ? formData.QRString : "https://www.google.com/"}
                        size={150}
                    />
                </View>
                <View style={styles.bottomContainerViewPortion}>

                </View>
            </View>
        );
    }
    return (
        <Fragment>
            {renderPageData()}
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        formData: state.cartData.formData
    }
}
export default connect(mapStateToProps, { saveDropOffCartData })(SheetPaneQRCodeDataHelper);