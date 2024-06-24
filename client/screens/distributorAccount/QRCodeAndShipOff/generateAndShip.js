import React, { Fragment, useState, useEffect, useRef } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity, Dimensions, FlatList, Linking, TextInput, ScrollView } from "react-native";
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import { Colors } from "../../../constants/styles.js";
import styles from "./generateAndShipStyles.js";
import { useNavigation } from "@react-navigation/native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from 'react-native-toast-message';
import axios from "axios";
import { BASE_URL } from "@env";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import _ from "lodash";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");

const data = [
    {
        id: '1',
        thumbnail: require("../../../assets/images/qr1.jpg"),
        title: 'Ready to ship/print?',
        channel: 'Generate & Print off a QR code and attach it to the pallet/container',
        link: "/print/scan/qr/code",
        views: '',
        duration: '',
    },
    {
        id: '2',
        thumbnail: require("../../../assets/images/qr2.jpg"),
        title: 'QR code management',
        channel: "Managing multiple shipments? Click here to see all of your QR Codes & manage them!",
        views: '',
        link: "/scan/qr/code/shipping",
        duration: "",
    },
    {
        id: '3',
        thumbnail: require("../../../assets/images/scanner.jpg"),
        title: 'Scan QR Codes',
        channel: 'Receiving or need to scan a QR code? Click here!',
        views: '',
        link: "/scan/qr/code/shipping",
        duration: '',
    },
    {
        id: '4',
        thumbnail: require("../../../assets/images/ana.jpg"),
        title: 'Analytics and Reports',
        channel: 'View analytics, reports and other various helpful information.',
        views: '',
        link: "/scan/qr/code/shipping",
        duration: '',
    },
    {
        id: '5',
        thumbnail: require("../../../assets/images/settingsvib.jpg"),
        title: "Settings",
        channel: 'Manage your QR settings and general management related to your codes',
        views: '',
        link: "/scan/qr/code/shipping",
        duration: '',
    }
];


const dataTwo = [
    {
        id: '1',
        thumbnail: 'https://via.placeholder.com/640x360',
        title: 'Video 1',
        channel: 'Channel 1',
        views: '1.2M views',
        duration: '5:01',
    },
    {
        id: '2',
        thumbnail: 'https://via.placeholder.com/640x360',
        title: 'Video 2',
        channel: 'Channel 2',
        views: '2.3M views',
        duration: '10:02',
    },
    {
        id: '3',
        thumbnail: 'https://via.placeholder.com/640x360',
        title: 'Video 3',
        channel: 'Channel 3',
        views: '3.4M views',
        duration: '15:03',
    },
    {
        id: '4',
        thumbnail: 'https://via.placeholder.com/640x360',
        title: 'Video 3',
        channel: 'Channel 3',
        views: '3.4M views',
        duration: '15:03',
    },
    {
        id: '5',
        thumbnail: 'https://via.placeholder.com/640x360',
        title: 'Video 3 ',
        channel: 'Channel 3',
        views: '3.4M views',
        duration: '15:03',
    },
    {
        id: '6',
        thumbnail: 'https://via.placeholder.com/640x360',
        title: 'Video 3',
        channel: 'Channel 3',
        views: '3.4M views',
        duration: '15:03',
    },
    {
        id: '7',
        thumbnail: 'https://via.placeholder.com/640x360',
        title: 'Video 3',
        channel: 'Channel 3',
        views: '3.4M views',
        duration: '15:03',
    },
    {
        id: '8',
        thumbnail: 'https://via.placeholder.com/640x360',
        title: 'Video 3',
        channel: 'Channel 3',
        views: '3.4M views',
        duration: '15:03',
    }
];


const GenerateQRCodeAndMarkShip = ({ authData, location }) => {
    const rbSheetRef = useRef(null);
    const codeInput = useRef(null);
    const scannerRef = useRef(null);
    const timeoutRef = useRef(null);

    const [ state, setState ] = useState({
        currentPage: "default",
        activeLink: "",
        listingInfo: null,
        inputsAreActive: false,
        code: "",
        user: null
    });

    console.log("state", state);

    const navigation = useNavigation();

    useEffect(() => {
        // Set a timeout to stop the scanner if QR code is not scanned in time
        timeoutRef.current = setTimeout(() => {
            if (scannerRef.current) {
                scannerRef.current.reactivate();
            }
        }, 15000); // 15 seconds timeout

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);
    // return main data...

    const renderItemPane = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.videoTwo} key={index} onPress={() => {}}>
                <Image style={styles.thumbnailTwo} source={{ uri: item["Picture URL"] }} />
                <View style={styles.detailsTwo}>
                    <Text style={styles.titleTwo}>{item.Brand} ~ {item.Model}</Text>
                    <Text style={styles.channelTwo}>{item.category}</Text>
                    <View style={styles.viewCountTwo}>
                        <Text style={styles.viewsTwo}>{item.uniqueId}</Text>
                        {/* <Text style={styles.durationTwo}>{item.duration}</Text> */}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const onSuccess = e => {
        console.log("e", e);

        const url = e.data;

        console.log("url", url);

        setState(prevState => ({ 
            ...prevState, activeLink: url, currentPage: "default"
        }))

        const { code } = state;

        if (url.includes("/fetch/dropoff/shipment/details")) {

            setTimeout(() => {
                setState(prevState => ({ 
                    ...prevState, code: ""
                }))

                navigation.navigate('BottomTabScreen', { index: 1 });
            }, 2250);
            
            const config = {
                params: {
                    url,
                    code
                }
            };
    
            axios.get(`${BASE_URL}/gather/qrcode/data/provide/code/dropoff`, config).then((res) => {
                if (res.data.message === "Gathered the appropriate data/listing!") {
                    console.log(res.data);
    
                    const { listingInfo } = res.data;
    
                    setState(prevState => ({ ...prevState, listingInfo }))
    
                    setTimeout(() => {
                        rbSheetRef.current.open();
                    }, 1250)
    
                    Toast.show({
                        type: 'success',
                        text1: `Successfully gathered the relevant listing information!`,
                        text2: `We've successfully gathered the related listing information which should now be displayed in the following pane.`,
                        visibilityTime: 3250,
                        position: "bottom",
                        onHide: () => {}
                    });
                } else {
                    console.log("Err", res.data);
    
                    Toast.show({
                        type: 'error',
                        text1: `An error occurred while fetching relevant results!`,
                        text2: `We've encountered an error while attempting to fetch the desired/relevant listing information, please try to load the page again or contact support if the problem persists...`,
                        visibilityTime: 3250,
                        position: "bottom"
                    });
                }
            }).catch((err) => {
                console.log(err);
    
                Toast.show({
                    type: 'error',
                    text1: `An error occurred while fetching relevant results!`,
                    text2: `We've encountered an error while attempting to fetch the desired/relevant listing information, please try to load the page again or contact support if the problem persists...`,
                    visibilityTime: 3250,
                    position: "bottom"
                });
            })
        } else {
            
            if (authData.accountType === "3rd-party-distribution-account") {
                const config = {
                    params: {
                        url
                    }
                };
        
                axios.get(`${BASE_URL}/gather/relevant/listing/qrcode/lookup`, config).then((res) => {
                    if (res.data.message === "Gathered the appropriate data/listing!") {
                        console.log(res.data);
        
                        const { listingInfo, user } = res.data;
        
                        setState(prevState => ({ ...prevState, listingInfo, user }))
        
                        setTimeout(() => {
                            rbSheetRef.current.open();
                        }, 1250)
        
                        Toast.show({
                            type: 'success',
                            text1: `Successfully gathered the relevant listing information!`,
                            text2: `We've successfully gathered the related listing information which should now be displayed in the following pane.`,
                            visibilityTime: 3250,
                            position: "bottom",
                            onHide: () => {}
                        });
                    } else {
                        console.log("Err", res.data);
        
                        Toast.show({
                            type: 'error',
                            text1: `An error occurred while fetching relevant results!`,
                            text2: `We've encountered an error while attempting to fetch the desired/relevant listing information, please try to load the page again or contact support if the problem persists...`,
                            visibilityTime: 3250,
                            position: "bottom"
                        });
                    }
                }).catch((err) => {
                    console.log(err);
        
                    Toast.show({
                        type: 'error',
                        text1: `An error occurred while fetching relevant results!`,
                        text2: `We've encountered an error while attempting to fetch the desired/relevant listing information, please try to load the page again or contact support if the problem persists...`,
                        visibilityTime: 3250,
                        position: "bottom"
                    });
                })
            } else {
                Toast.show({
                    type: 'error',
                    text1: `Your account type is invliad. Must be recycling Co.`,
                    text2: `This functionality is ONLY available to RECYCLING PARTNERS/FACILITIES only.`,
                    visibilityTime: 3250,
                    position: "bottom"
                });
            }
        }
        // Linking.openURL(e.data).catch(err =>
        //   console.error('An error occured', err)
        // );
    };

    const calculateRoute = (item) => {
        switch (item.link) {
            case "/scan/qr/code/shipping":
                setState(prevState => ({ ...prevState, currentPage: "scan" }))
                break;
            case "/print/scan/qr/code":
                
                break;
            // case "/scan/qr/code/shipping":
                
            //     break;
            // case "/scan/qr/code/shipping":
                
            //     break;
            // case "/scan/qr/code/shipping":
                
            //     break;
            default:
                break;
        }
    };

    const renderItem = ({ item }) => {
        return (
          <TouchableOpacity style={styles.video} onPress={() => calculateRoute(item)}>
            <Image style={styles.thumbnail} source={item.thumbnail} />
            <View style={[styles.details, { top: -10 }]}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.channel}>{item.channel}</Text>
              <View style={styles.viewCount}>
                <Text style={styles.views}>{item.views}</Text>
                <Text style={styles.duration}>{item.duration}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
    };

    const handleAcceptanceSubmission = () => {
        console.log("handleAcceptanceSubmission clicked/ran...");

        const { user, listingInfo } = state;
        const config = {
            uniqueId: authData.uniqueId,
            location,
            cartData: user.totalPalletItemsInventoryList,
            totalWeight: {
                measurement: "kg",
                weight: user.totalPalletWeight
            },
            otherUser: user,
            listingInfo
        };

        axios.post(`${BASE_URL}/accept/responsibilty/delivery/transfer`, config).then((res) => {
            if (res.data.message === "Successfully processed the shipment and accepted!") {
                console.log(res.data);

                const { } = res.data;

                setTimeout(() => {
                    rbSheetRef.current.close();
                }, 1250)

                Toast.show({
                    type: 'success',
                    text1: `Successfully accepted this shipment!`,
                    text2: `You've successfully accepted this shipment and now assume responsibility for it.`,
                    visibilityTime: 3250,
                    position: "bottom",
                    onHide: () => {}
                });
            } else {
                console.log("Err", res.data);

                Toast.show({
                    type: 'error',
                    text1: `An error occurred while processing drop-off request.`,
                    text2: `We've encountered an error while attempting to accept this drop-off request, please try to load the page again or contact support if the problem persists...`,
                    visibilityTime: 3250,
                    position: "bottom"
                });
            }
        }).catch((err) => {
            console.log(err);

            Toast.show({
                type: 'error',
                text1: `An error occurred while processing drop-off request.`,
                text2: `We've encountered an error while attempting to accept this drop-off request, please try to load the page again or contact support if the problem persists...`,
                visibilityTime: 3250,
                position: "bottom"
            });
        })
    }

    const renderPaneContent = () => {
        if (state.listingInfo !== null) {
            const { user } = state;
            return (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 125 }} style={{ margin: 12.25 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 18.25 }}>This is crate/listing #: <Text style={{ textDecorationLine: "underline" }}>{state.listingInfo.listingNum}</Text></Text>
                    <Text style={styles.subbexTextcustom}>Total pallet weight (Est.): <Text style={{ color: "blue" }}>{_.has(user, "totalPalletWeight") ? user.totalPalletWeight : "Unknown."} KG.</Text></Text>
                    <Text style={[styles.subbexTextcustom, { marginTop: 0 }]}>Total items in pallet: <Text style={{ color: "blue" }}>{_.has(user, "totalPalletItemsInventoryList") ? user.totalPalletItemsInventoryList.length : "Unknown."} items.</Text></Text>
                    <FlatList
                        style={styles.container}
                        data={user.totalPalletItemsInventoryList}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItemPane}
                        keyExtractor={item => item.id}
                        ListFooterComponent={() => (
                            <Fragment>  
                                <AwesomeButtonBlue textColor={"#fff"} backgroundShadow={"black"} backgroundDarker={"#000"} backgroundColor={Colors.primaryColor} style={styles.buttonSearchWithCriteria} onPress={() => handleAcceptanceSubmission()} stretch={true}>Accept Shipment</AwesomeButtonBlue>
                            </Fragment>
                        )}
                        ListHeaderComponentStyle={{ paddingBottom: 30 }}
                        ListHeaderComponent={() => (
                            <Fragment>  
                                <AwesomeButtonBlue textColor={"#fff"} backgroundShadow={"black"} backgroundDarker={"#000"} backgroundColor={Colors.primaryColor} style={styles.buttonSearchWithCriteria} onPress={() => handleAcceptanceSubmission()} stretch={true}>Accept Shipment</AwesomeButtonBlue>
                            </Fragment>
                        )}
                    />
                </ScrollView>
            );
        }
    }
    const renderMainContent = () => {
        const { currentPage } = state;

        if (currentPage === "scan") {
            return (
                <Fragment>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always' contentContainerStyle={state.inputsAreActive === true ? { paddingBottom: 152.5 } : { paddingBottom: 0 }}>
                        <QRCodeScanner
                            onRead={onSuccess}
                            showMarker={true}
                            ref={scannerRef}
                            topViewStyle={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 62.50, paddingTop: 40 }}
                            bottomViewStyle={{ padding: 10 }}
                            flashMode={RNCamera.Constants.FlashMode.torch}
                            topContent={<View style={styles.centeredTop}>
                                <Text style={styles.centerText}>
                                    You'll need to {""}
                                    <Text style={styles.textBold}>scan the QR code</Text> which will bring up all the details related to the shipment, Scan the code and you'll find what you're looking for.{"\n"}{"\n"}<Text style={[styles.labelCustom, { marginBottom: 11.25 }]}>Enter the code BREFORE SCANNING your QR CODE below if required so it transmits upon scanning.</Text><Text></Text>
                                </Text>
                                <View style={styles.textFieldContainerStyle}>
                                    <TextInput
                                        value={state.code}
                                        placeholder="Enter your code (if applicable):"
                                        ref={codeInput}
                                        style={{ minWidth: "100%" }}
                                        onSubmitEditing={() => {
                                            setState(prevState => ({
                                                ...prevState,
                                                inputsAreActive: false
                                            }));
                                        }}
                                        onFocus={() => {
                                            setState(prevState => ({
                                                ...prevState,
                                                inputsAreActive: true
                                            }));
                                        }}
                                        onChangeText={(value) => {
                                            setState(prevState => ({
                                                ...prevState,
                                                code: value
                                            }));
                                        }}
                                    />
                                    </View>
                                {/* <View style={styles.hr} />
                                <Text>Scanning the QR code will pull up the information you're looking for:</Text> */}
                            </View>}
                            // bottomContent={}
                        />
                    </KeyboardAwareScrollView>
                </Fragment>
            );
        } else if (currentPage === "default") {
            return (
                <Fragment>
                    <RBSheet
                        ref={ref => {
                            rbSheetRef.current = ref;
                        }}
                        height={height * 0.825}
                        openDuration={250}
                        closeOnDragDown={true}
                        customStyles={{
                            container: {
                                width
                            },
                            draggableIcon: {
                                borderBottomColor: "grey",
                                borderBottomWidth: 2,
                                width: 200
                            }
                        }}
                    >
                        {renderPaneContent()}
                    </RBSheet>
                    <ParallaxScroll
                        renderHeader={({ animatedValue }) => <View style={{}}>

                        </View>}
                        headerHeight={0}
                        style={{ flex: 1 }}
                        isHeaderFixed={false}
                        parallaxHeight={150}
                        // headerBackgroundColor={""}
                        renderParallaxBackground={({ animatedValue }) => <ImageBackground imageStyle={{ opacity: 0.675, backgroundColor: Colors.secondaryColor }} style={{ minWidth: width, minHeight: height * 0.4125, maxHeight: height * 0.4125 }} source={require("../../../assets/images/shipqr.jpg")} />}
                        renderParallaxForeground={({ animatedValue }) => {
                            return (
                                <Fragment>
                                    <View style={styles.centeredAdjustedPara}>
                                        <Text style={styles.topDescText}><Text style={{ textDecorationLine: "underline", color: Colors.secondaryColor }}>QR code management</Text>{"\n"}<Text style={styles.subbedText}>Generate a QR code to encapsulate all shipment details, ensuring seamless tracking and management throughout the delivery process.</Text></Text>
                                    </View>
                                </Fragment>
                            );
                        }}
                        parallaxBackgroundScrollSpeed={3}
                        parallaxForegroundScrollSpeed={1.25}
                    >
                        <ScrollView contentContainerStyle={{ display: "flex", flex: 1, margin: 12.25 }} style={styles.lineChartParaContainer}>
                            <FlatList
                                style={styles.container}
                                ListHeaderComponent={() => (
                                    <Fragment>
                                        <Text style={[styles.title, { marginBottom: 15 }]}>Select the shipment you'd like to manage or print/generate a qr code for:</Text>
                                    </Fragment>
                                )}
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
                        </ScrollView>
                    </ParallaxScroll>
                </Fragment>
            );
        } else {
            return null;
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            {renderMainContent()}
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        location: state.location.currentLoc,
        authData: state.auth.data
    }
}
export default connect(mapStateToProps, {})(GenerateQRCodeAndMarkShip);