import React, { Fragment, useState, useEffect } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import { Colors, Sizes, Fonts } from "../../constants/styles.js";
import styles from "./distributorAccountOverviewMainStyles.js";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";


const { width, height } = Dimensions.get("window");

const chartData = [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100];

const chartConfig = {
    backgroundColor: Colors.primaryColor,
    backgroundGradientFrom: Colors.primaryColor,
    backgroundGradientTo: Colors.secondaryColor,
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
    }
};

const DistributorAccountOverview = (props) => {

    const navigation = useNavigation();

    const divider = () => {
        return (
            <View style={{ height: 1.25, marginTop: 11.25, backgroundColor: "darkgrey" }}></View>
        )
    }

    const title = ({ title }) => {
        return (
            <Text style={{
                ...Fonts.white20Bold,
                color: Colors.secondaryColor,
                fontWeight: "bold",
                fontSize: 17.25,
                marginVertical: Sizes.fixPadding + 5.0,
                marginHorizontal: Sizes.fixPadding * 2.0
            }}>
                {title}
            </Text>
        )
    }

    const infoAll = ({ icon, backColor, frontColor, title, }) => {

        return (
            <View style={styles.infoContainerStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{
                        ...styles.infoContainerCircleStyle,
                        backgroundColor: backColor,
                        borderColor: frontColor
                    }}>
                        {icon}
                    </View>
                    <Text style={{ ...Fonts.white17Bold, marginLeft: Sizes.fixPadding, color: "#000" }}>
                        {title}
                    </Text>
                </View>
                <View style={styles.arrowWrapper}>
                    <Image source={require("../../assets/images/icon/right-arrow.png")} style={{ maxWidth: 22.5, maxHeight: 22.5 }} />
                </View>
            </View>
        )
    }
    const shortDivider = () => {
        return (
            <Fragment>
                <View style={styles.centeredOnly}>
                    <View style={styles.shortDivider} />
                </View>
            </Fragment>
        )
    }
    // return main data...
    return (
        <Fragment>
            <ParallaxScroll
                renderHeader={({ animatedValue }) => <View style={{}}>

                </View>}
                headerHeight={0}
                style={{ flex: 1 }}
                isHeaderFixed={false}
                parallaxHeight={150}
                // headerBackgroundColor={""}
                renderParallaxBackground={({ animatedValue }) => <ImageBackground imageStyle={{ opacity: 0.675, backgroundColor: Colors.secondaryColor }} style={{ minWidth: width, minHeight: height * 0.4125, maxHeight: height * 0.4125 }} source={require("../../assets/images/warehouse.jpg")} />}
                renderParallaxForeground={({ animatedValue }) => {
                    return (
                        <Fragment>
                            <View style={styles.centeredAdjustedPara}>
                                <Text style={styles.topDescText}><Text style={{ textDecorationLine: "underline", color: Colors.secondaryColor }}>Distributor Management Options</Text>{"\n"}<Text style={styles.subbedText}>This contains helpful 'dropoff depot' core-functionality & other useful resources..</Text></Text>
                            </View>
                        </Fragment>
                    );
                }}
                parallaxBackgroundScrollSpeed={3}
                parallaxForegroundScrollSpeed={1.25}
            >
                <View style={styles.lineChartParaContainer}>
                    <View style={styles.centeredOnly}>
                        <Text style={styles.lineChartText}>Recent Earning Snap-Shot</Text>
                        <LineChart
                            data={{
                                labels: ['1st', '2nd', '3rd', '4th', "5th", "6th", "7th", "8th"],
                                datasets: [
                                    {
                                        data: chartData
                                    }
                                ]
                            }}
                            width={width}
                            height={height * 0.3625}
                            yAxisLabel="$"
                            // yAxisSuffix="k"
                            yAxisInterval={1} 
                            chartConfig={chartConfig}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                        <View style={{ paddingTop: 15 }} />
                        <ProgressChart
                            data={{
                                labels: ["Earned", "Pending", "Available"], // optional
                                data: [0.8, 0.625, 0.68]
                            }}
                            width={width}
                            height={height * 0.25625}
                            strokeWidth={16}
                            radius={32}
                            chartConfig={chartConfig}
                            hideLegend={false}
                            style={{ borderRadius: 12.5 }}
                        />
                        <View style={{ paddingTop: 15 }} />
                        <BarChart
                            style={{ borderRadius: 12.5 }}
                            data={{
                                labels: ["Jab.", "Feb.", "Mar.", "Apr.", "May", "June"],
                                datasets: [
                                  {
                                    data: [90, 45, 45, 80, 99, 43]
                                  }
                                ]
                            }}
                            width={width}
                            height={height * 0.3125}
                            yAxisLabel="$"
                            chartConfig={chartConfig}
                            verticalLabelRotation={30}
                        />
                         <View style={{ paddingTop: 15 }} />
                    </View>
                </View>
                <View style={{ backgroundColor: "#fff" }}>
                    <View style={{ height: 1.25, backgroundColor: "darkgrey" }}></View>
                    {title({ title: `Job-Management Option's` })}
                    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('')}>
                        {infoAll(
                            {
                                icon: <Image resizeMode="cover" source={require("../../assets/images/icon/create.png")} style={styles.iconCustom} />,
                                backColor: Colors.secondaryColor,
                                frontColor: Colors.blackColor,
                                title: `Available/Pending Freight`,

                            }
                        )}
                    </TouchableOpacity>
                    {shortDivider()}
                    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('')}>
                        {infoAll(
                            {
                                icon: <Image resizeMode="cover" source={require("../../assets/images/icon/handle.png")} style={styles.iconCustom} />,
                                backColor: Colors.primaryColor,
                                frontColor: Colors.blackColor,
                                title: `Assign Loads/Shipment's`,

                            }
                        )}
                    </TouchableOpacity>
                    {shortDivider()}
                    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('')}>
                        {infoAll(
                            {
                                icon: <Image resizeMode="cover" source={require("../../assets/images/icon/completed-freight.png")} style={styles.iconCustom} />,
                                backColor: Colors.secondaryColor,
                                frontColor: Colors.blackColor,
                                title: `Completed Freight Shipment's`,

                            }
                        )}
                    </TouchableOpacity>
                    {shortDivider()}
                    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ManageDistributorActiveLoads')}>
                        {infoAll(
                            {
                                icon: <Image resizeMode="cover" source={require("../../assets/images/icon/manage.png")} style={styles.iconCustom} />,
                                backColor: Colors.primaryColor,
                                frontColor: Colors.blackColor,
                                title: `Manage Active Load's`,

                            }
                        )}
                    </TouchableOpacity>
                    {divider()}
                    {title({ title: 'Core Management' })}
                    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('PreviousPaymentChartDataView')}>
                        {infoAll(
                            {
                                icon: <Image source={require("../../assets/images/icon/earning.png")} style={styles.iconCustom} />,
                                backColor: Colors.secondaryColor,
                                frontColor: Colors.blackColor,
                                title: `Previous Earnings/Payment's`,

                            }
                        )}
                    </TouchableOpacity>
                    {shortDivider()}
                    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('EditProfile')}>
                        {infoAll(
                            {
                                icon: <Image source={require("../../assets/images/icon/earning.png")} style={styles.iconCustom} />,
                                backColor: Colors.primaryColor,
                                frontColor: Colors.blackColor,
                                title: 'Pending Payouts/Earnings',

                            }
                        )}
                    </TouchableOpacity>
                    {divider()}
                </View>
            </ParallaxScroll>
        </Fragment>
    );
}
export default DistributorAccountOverview;