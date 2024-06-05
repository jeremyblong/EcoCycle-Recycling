import React, { Fragment, useState, useEffect, useRef } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity, Dimensions, FlatList, Linking } from "react-native";
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import { Colors } from "../../../constants/styles.js";
import styles from "./generateAndShipStyles.js";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import RBSheet from "react-native-raw-bottom-sheet";

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


const GenerateQRCodeAndMarkShip = (props) => {
    const rbSheetRef = useRef(null);

    const [ state, setState ] = useState({
        currentPage: "default",
        activeLink: ""
    });

    console.log("state", state);

    const navigation = useNavigation();
    // return main data...

    const onSuccess = e => {
        console.log("e", e);

        const url = e.data;

        console.log("url", url);

        setState(prevState => ({ 
            ...prevState, activeLink: url, currentPage: "default"
        }))

        setTimeout(() => {
            rbSheetRef.current.open();
        }, 1250)
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

    const renderMainContent = () => {
        const { currentPage } = state;

        if (currentPage === "scan") {
            return (
                <Fragment>
                    <QRCodeScanner
                        onRead={onSuccess}
                        flashMode={RNCamera.Constants.FlashMode.torch}
                        topContent={<Text style={styles.centerText}>
                        You'll need to {""}
                        <Text style={styles.textBold}>scan the QR code</Text> which will bring up all the details related to the shipment including but not limited to item count, inventory list, weight, etc...
                    </Text>}
                        bottomContent={<Text>Scanning the QR code will pull up the information you're looking for:</Text>}
                    />
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
        <Fragment>
            {renderMainContent()}
        </Fragment>
    );
}
export default GenerateQRCodeAndMarkShip;