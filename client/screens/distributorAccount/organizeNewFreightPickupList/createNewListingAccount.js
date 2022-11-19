import React, { Fragment, useState, useEffect } from "react";
import { Dimensions, ImageBackground } from "react-native";
import styles from "./createNewListingAccountStyles.js";
import { Colors } from "../../../constants/styles";
import PageOneDistributorAccountCreation from "./pages/coreDataPageOne/page.js";
import * as Progress from 'react-native-progress';
import IntroductionToFreightShippingActivation from "./pages/introductionPage/page.js";
import PageTwoRequestNewFreightHelper from "./pages/coreDataPageTwo/page.js";
import PageThreeRequestNewFreightHelper from "./pages/coreDataPageThree/page.js";
import PageFourDistributorAccountCreation from "./pages/coreDataPageFour/page.js";
import PageFiveDistributorAccountCreation from "./pages/coreDataPageFive/page.js";
import _ from "lodash";
import { connect } from "react-redux";
import { updateFreightDetailsState } from "../../../redux/actions/requestFreightPickup/pickupDetails.js";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import PageSixDistributorAccountCreation from "./pages/coreDataPageSix/page.js";

const { width } = Dimensions.get("window");

const NewFreightPickupRequestingMainView = (props) => {

    const { updateFreightDetailsState, freightData } = props;

    const [ state, setState ] = useState({
        pageOneData: {
            companyName: ""
        },
        page: 1
    })

    const updateMainState = (data) => setState(prevState => {
        return {
            ...prevState,
            ...data
        }
    });


    useEffect(() => {
        if (_.has(props.freightData, "page")) {
            updateMainState({ page: freightData.page });
        }
    }, [])

    const calculateCurrentPageView = (value) => {
        switch (value) {
            case 1:
                return (
                    <Fragment>
                        <ImageBackground imageStyle={{ opacity: 0.565 }} resizeMode={"cover"} style={styles.imageBacked} source={require("../../../assets/images/design-1.png")}>
                            <IntroductionToFreightShippingActivation updateMainState={updateMainState} props={props} />
                        </ImageBackground>
                    </Fragment>
                );
                break;
            case 2:
                return (
                    <Fragment>
                        <ImageBackground imageStyle={{ opacity: 0.4 }} resizeMode={"cover"} style={styles.imageBacked} source={require("../../../assets/images/design-3.png")}>
                            <PageOneDistributorAccountCreation updateMainState={updateMainState} masterState={state} masterSetState={setState} props={props} />
                        </ImageBackground>
                    </Fragment>
                );
                break;
            case 3:
                return (
                    <Fragment>
                        <ImageBackground imageStyle={{ opacity: 0.4 }} resizeMode={"cover"} style={styles.imageBacked} source={require("../../../assets/images/design-2.png")}>
                            <PageTwoRequestNewFreightHelper updateMainState={updateMainState} masterState={state} masterSetState={setState} props={props} />
                        </ImageBackground>
                    </Fragment>
                );
                break;
            case 4:
                return (
                    <Fragment>
                        <ImageBackground imageStyle={{ opacity: 0.4 }} resizeMode={"cover"} style={styles.imageBacked} source={require("../../../assets/images/design-1.png")}>
                            <PageThreeRequestNewFreightHelper updateMainState={updateMainState} masterState={state} masterSetState={setState} props={props} />
                        </ImageBackground>
                    </Fragment>
                );
                break;
            case 5:
                return (
                    <Fragment>
                        <ImageBackground imageStyle={{ opacity: 0.4 }} resizeMode={"cover"} style={styles.imageBacked} source={require("../../../assets/images/design-3.png")}>
                            <PageFourDistributorAccountCreation updateMainState={updateMainState} masterState={state} masterSetState={setState} props={props} />
                        </ImageBackground>
                    </Fragment>
                );
                break;
            case 6:
                return (
                    <Fragment>
                        <ImageBackground imageStyle={{ opacity: 0.4 }} resizeMode={"cover"} style={styles.imageBacked} source={require("../../../assets/images/design-3.png")}>
                            <PageFiveDistributorAccountCreation updateMainState={updateMainState} masterState={state} masterSetState={setState} props={props} />
                        </ImageBackground>
                    </Fragment>
                );
                break;
            case 7:
                return (
                    <Fragment>
                        <ImageBackground imageStyle={{ opacity: 0.4 }} resizeMode={"cover"} style={styles.imageBacked} source={require("../../../assets/images/design-3.png")}>
                            <PageSixDistributorAccountCreation updateMainState={updateMainState} masterState={state} masterSetState={setState} props={props} />
                        </ImageBackground>
                    </Fragment>
                );
                break;
            default:
                break;
        }
    }

    const calculatePercentage = (value) => {
        switch (value) {
            case 1:
                return 0.2;
                break;
            case 2:
                return 0.4;
                break;
            case 3:
                return 0.6;
                break;
            case 4:
                return 0.8;
                break;
            case 5:
                return 1;
                break;
            default:
                break;
        }
    }

    return (
        <Fragment>
            <Progress.Bar progress={calculatePercentage(state.page)} color={Colors.greenColor} height={10} width={width} />
            {calculateCurrentPageView(state.page)}
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        freightData: state.freightPickupData.formData
    }
}
export default connect(mapStateToProps, { updateFreightDetailsState })(NewFreightPickupRequestingMainView);