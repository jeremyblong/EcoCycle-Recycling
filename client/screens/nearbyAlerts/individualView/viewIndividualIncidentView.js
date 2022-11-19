import React, { Fragment, useState } from "react";
import { Text, ScrollView, Dimensions, Image, View, TouchableOpacity } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { ListItem, Avatar, Badge, Card, Icon } from '@rneui/themed'
import { Colors } from "../../../constants/styles.js";
import moment from "moment";
import ViewMoreText from 'react-native-view-more-text';
import Timeline from 'react-native-timeline-flatlist'
import styles from "./viewIndividualIncidentViewStyles.js";
import customMapStyle from "../../../component/JSONStyles/mapStyle.js";


const { width, height } = Dimensions.get("window");

const IndividualIncidentReportView = (props) => {

    const [ region, setRegion ] = useState({ latitude: 45.516869, longitude: -122.682838, latitudeDelta: 5, longitudeDelta: 5 });
    const [ timelineData, setTimelineData ] = useState([
        { time: '09:00 am', title: '911 call recieved', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco', icon: <Image
        style={styles.timelineIcon}
        source={require('../../../assets/images/icon/update-neon.png')}
    /> },
        { time: '10:45 am', title: 'Police have arrived at the scene', description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', icon: <Image
        style={styles.timelineIcon}
        source={require('../../../assets/images/icon/update-neon.png')}
    /> },
        { time: '12:00 pm', title: 'EMS called to respond to physical assault injury', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra et ultrices neque ornare aenean. Mattis nunc sed blandit libero volutpat sed cras ornare. Orci ac auctor augue mauris. Vulputate eu scelerisque felis imperdiet proin fermentum. Lectus arcu bibendum at varius vel pharetra. Nulla pharetra diam sit amet nisl. Egestas pretium aenean pharetra magna ac placerat vestibulum. ', icon: <Image
        style={styles.timelineIcon}
        source={require('../../../assets/images/icon/update-neon.png')}
    /> },
        { time: '3:24 pm', title: 'Witness reported suspect running from scene NW towards 10th Ave.', description: 'Aliquam sem fringilla ut morbi tincidunt augue interdum velit. Nunc aliquet bibendum enim facilisis', icon: <Image
        style={styles.timelineIcon}
        source={require('../../../assets/images/icon/update-neon.png')}
    /> },
        { time: '5:30 pm', title: 'Police have made an arrest - 2 suspects pending', description: 'Cursus mattis molestie a iaculis at. Risus feugiat in ante metus dictum at tempor commodo. Vivamus at augue eget arcu dictum varius duis at consectetur. Ullamcorper velit sed ullamcorper morbi tincidunt. Tristique senectus et netus et malesuada. Sit amet venenatis urna cursus eget nunc scelerisque viverra mauris. Praesent elementum facilisis leo vel. Sed sed risus pretium quam vulputate dignissim suspendisse', icon: <Image
        style={styles.timelineIcon}
        source={require('../../../assets/images/icon/update-neon.png')}
    /> }
    ]);

    const incident = props.route.params.incident;

    const { lat, lon } = incident.address.otherData.position;

    const renderViewMore = (onPress) => {
        return (
            <Text style={{ color: Colors.greenColor }} onPress={onPress}>View more</Text>
        )
    };
    const renderViewLess = (onPress) => {
        return (
            <Text style={{ color: Colors.greenColor }} onPress={onPress}>View less</Text>
        )
    };

    const calculateLegibleType = (type) => {
        const selectableItems = [
            { label: 'Burglary', value: 'burglary' }
        ];
        const matchingIndex = selectableItems.findIndex(x => x.value === type);

        return selectableItems[matchingIndex].label;
    }
    const randomOne = Math.floor(Math.random() * (5 - 0 + 1) + 0);
    return (
        <Fragment>
            <View style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "black", paddingBottom: 42.5 }} style={{ flex: 1 }}>
                        <MapView
                            customMapStyle={customMapStyle}
                            onRegionChangeComplete={(region) => setRegion(region)}
                            region={region}
                            style={styles.map}
                        >
                            <Marker
                                key={1}
                                coordinate={{ latitude: lat, longitude: lon, latitudeDelta: 5, longitudeDelta: 5 }}
                                title={"~ INCIDENT REPORT ~"}
                                description={"This is the approx. location of said incident reported..."}
                            />
                        </MapView>
                        <View style={styles.addressWrapper}>
                            <Text style={styles.addressText}>{incident.address.name}</Text>
                        </View>
                        <ListItem containerStyle={{ backgroundColor: "black", borderBottomWidth: 1.25, borderBottomColor: Colors.greenColor  }} bottomDivider>
                            <Avatar source={require("../../../assets/images/icon/police.png")} />
                            <ListItem.Content>
                                <ListItem.Title style={{ fontWeight: "bold", color: "#fff" }}>Type Of Incident & Time</ListItem.Title>
                                <ListItem.Subtitle style={{ color: Colors.greenColor, fontWeight: "bold", maxWidth: width * 0.5 }}>{calculateLegibleType(incident.typeOfIncident)} around {moment(incident.occuranceDateAndTime).format("hh:mm:ss a")} ~ {moment(incident.occuranceDateAndTime).fromNow()}</ListItem.Subtitle>
                            </ListItem.Content>
                            <View style={{ flexDirection: "row", maxWidth: 112.5, position: "absolute", right: 10, top: 12.5 }}>
                                <TouchableOpacity onPress={() => { }}>
                                    <Image source={require("../../../assets/images/icon/thumbs_up.png")} style={styles.thumbIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { }}>
                                    <Image source={require("../../../assets/images/icon/thumbs_down.png")} style={styles.thumbIcon} />
                                </TouchableOpacity>
                            </View>
                        </ListItem>
                        <View style={{ margin: 17.5 }}>
                            <Text style={styles.label}>Incident Title:</Text>
                            <Text style={styles.headerText}>{incident.title}</Text>
                            <Text style={styles.label}>Incident Subtitle:</Text>
                            <Text style={styles.headerText}>{incident.subtitle}</Text>
                            <Text style={styles.label}>Description: </Text>
                            <ViewMoreText
                                numberOfLines={5}
                                renderViewMore={renderViewMore}
                                renderViewLess={renderViewLess}
                                textStyle={{ textAlign: 'left' }}
                            >
                                <Text style={styles.headerText}>{incident.description}</Text>
                            </ViewMoreText>
                            <View style={{ marginTop: 12.5 }} />
                            <Text style={styles.label}>Relevant Hashtag(s): </Text>
                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                {typeof incident.hashtags !== "undefined" && incident.hashtags.length > 0 ? incident.hashtags.map((hashtag, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <Badge
                                                status="secondary"
                                                value={hashtag}
                                                badgeStyle={{ padding: 3.75, height: 27.5 }}
                                                textStyle={{ color: "black", fontWeight: "bold" }}
                                                containerStyle={{ margin: 4.25 }}
                                            />
                                        </Fragment>
                                    );
                                }) : null}
                            </View>

                            <Text style={[styles.label, { marginTop: 17.5, marginBottom: 22.5 }]}>Timeline/Updates: </Text>
                            <Timeline
                                circleSize={25}
                                circleColor={Colors.backColor}
                                lineColor={Colors.primaryColor}
                                timeContainerStyle={{ minWidth: 70 }}
                                lineWidth={5}
                                timeStyle={{ textAlign: 'center', backgroundColor: Colors.greenColor, color: 'black', fontWeight: "bold", padding: 5, borderRadius: 13 }}
                                descriptionStyle={{ color: '#fff' }}
                                options={{
                                    style: { paddingTop: 5 }
                                }}
                                innerCircle={'icon'}
                                titleStyle={{ color: Colors.greenColor, marginLeft: 3.25 }}
                                data={timelineData}
                                isUsingFlatlist={false}
                            />
                            <View style={{ marginTop: 17.5, borderTopColor: Colors.greenColor, borderTopWidth: 3.5 }} />
                        </View>
                        <View style={{ margin: 12.5 }}>
                            <Text style={styles.commentHeader}>Comment(s)</Text>
                        </View>
                        <Card containerStyle={styles.commentInitial}>
                            <ListItem containerStyle={{ backgroundColor: "black", maxHeight: 60, marginTop: 10 }} bottomDivider>
                                <Avatar style={styles.avatarComment} source={require("../../../assets/images/user.png")} />
                                <ListItem.Content>
                                    <ListItem.Title style={styles.commentTitle}>Johnny Deporonoto</ListItem.Title>
                                    <ListItem.Subtitle style={styles.commentSubtitle}>{moment(new Date(2022, randomOne, 3)).fromNow(false)}</ListItem.Subtitle>

                                    <Text style={styles.commentText}></Text>
                                </ListItem.Content>
                            </ListItem>
                            <Card.Divider />
                            <Text style={{ marginBottom: 10, color: "#fff" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </Text>
                            <Card.Divider />
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => {}}>
                                    <Text style={styles.replyText}>Reply</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { }}>
                                    <Text style={styles.replyText}>Like?</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => { }}>
                                <View style={styles.positionRightBottom}>
                                    <Image source={require("../../../assets/images/icon/like-heart.png")} style={styles.likeHandIcon} />
                                    <Text style={{ color: "#fff", marginLeft: 10, marginTop: 5 }}>{Math.floor(Math.random() * (125 - 0 + 1) + 0)}</Text>
                                </View>
                            </TouchableOpacity>
                        </Card>
                        <Card containerStyle={styles.commentReply}>
                            <ListItem containerStyle={{ backgroundColor: "black", maxHeight: 60, marginTop: 10 }} bottomDivider>
                                <Avatar style={styles.avatarComment} source={require("../../../assets/images/user.png")} />
                                <ListItem.Content>
                                    <ListItem.Title style={styles.commentTitle}>Johnny Deporonoto</ListItem.Title>
                                    <ListItem.Subtitle style={styles.commentSubtitle}>{moment(new Date(2022, randomOne, 3)).fromNow(false)}</ListItem.Subtitle>

                                    <Text style={styles.commentText}></Text>
                                </ListItem.Content>
                            </ListItem>
                            <Card.Divider />
                            <Text style={{ marginBottom: 10, color: "#fff" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </Text>
                            <Card.Divider />
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => { }}>
                                    <Text style={styles.replyText}>Reply</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { }}>
                                    <Text style={styles.replyText}>Like?</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => { }}>
                                <View style={styles.positionRightBottom}>
                                    <Image source={require("../../../assets/images/icon/like-heart.png")} style={styles.likeHandIcon} />
                                    <Text style={{ color: "#fff", marginLeft: 10, marginTop: 5 }}>{Math.floor(Math.random() * (125 - 0 + 1) + 0)}</Text>
                                </View>
                            </TouchableOpacity>
                            <Image source={require("../../../assets/images/icon/comment-reply.png")} style={styles.replyDirector} />
                        </Card>
                        <Card containerStyle={styles.commentInitial}>
                            <ListItem containerStyle={{ backgroundColor: "black", maxHeight: 60, marginTop: 10 }} bottomDivider>
                                <Avatar style={styles.avatarComment} source={require("../../../assets/images/user.png")} />
                                <ListItem.Content>
                                    <ListItem.Title style={styles.commentTitle}>Johnny Deporonoto</ListItem.Title>
                                    <ListItem.Subtitle style={styles.commentSubtitle}>{moment(new Date(2022, randomOne, 3)).fromNow(false)}</ListItem.Subtitle>

                                    <Text style={styles.commentText}></Text>
                                </ListItem.Content>
                            </ListItem>
                            <Card.Divider />
                            <Text style={{ marginBottom: 10, color: "#fff" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </Text>
                            <Card.Divider />
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => { }}>
                                    <Text style={styles.replyText}>Reply</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { }}>
                                    <Text style={styles.replyText}>Like?</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => { }}>
                                <View style={styles.positionRightBottom}>
                                    <Image source={require("../../../assets/images/icon/like-heart.png")} style={styles.likeHandIcon} />
                                    <Text style={{ color: "#fff", marginLeft: 10, marginTop: 5 }}>{Math.floor(Math.random() * (125 - 0 + 1) + 0)}</Text>
                                </View>
                            </TouchableOpacity>
                        </Card>
                        <Card containerStyle={styles.commentInitial}>
                            <ListItem containerStyle={{ backgroundColor: "black", maxHeight: 60, marginTop: 10 }} bottomDivider>
                                <Avatar style={styles.avatarComment} source={require("../../../assets/images/user.png")} />
                                <ListItem.Content>
                                    <ListItem.Title style={styles.commentTitle}>Johnny Deporonoto</ListItem.Title>
                                    <ListItem.Subtitle style={styles.commentSubtitle}>{moment(new Date(2022, randomOne, 3)).fromNow(false)}</ListItem.Subtitle>

                                    <Text style={styles.commentText}></Text>
                                </ListItem.Content>
                            </ListItem>
                            <Card.Divider />
                            <Text style={{ marginBottom: 10, color: "#fff" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </Text>
                            <Card.Divider />
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => { }}>
                                    <Text style={styles.replyText}>Reply</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { }}>
                                    <Text style={styles.replyText}>Like?</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => { }}>
                                <View style={styles.positionRightBottom}>
                                    <Image source={require("../../../assets/images/icon/like-heart.png")} style={styles.likeHandIcon} />
                                    <Text style={{ color: "#fff", marginLeft: 10, marginTop: 5 }}>{Math.floor(Math.random() * (125 - 0 + 1) + 0)}</Text>
                                </View>
                            </TouchableOpacity>
                        </Card>
                        <Card containerStyle={styles.commentReply}>
                            <ListItem containerStyle={{ backgroundColor: "black", maxHeight: 60, marginTop: 10 }} bottomDivider>
                                <Avatar style={styles.avatarComment} source={require("../../../assets/images/user.png")} />
                                <ListItem.Content>
                                    <ListItem.Title style={styles.commentTitle}>Johnny Deporonoto</ListItem.Title>
                                    <ListItem.Subtitle style={styles.commentSubtitle}>{moment(new Date(2022, randomOne, 3)).fromNow(false)}</ListItem.Subtitle>

                                    <Text style={styles.commentText}></Text>
                                </ListItem.Content>
                            </ListItem>
                            <Card.Divider />
                            <Text style={{ marginBottom: 10, color: "#fff" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </Text>
                            <Card.Divider />
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => { }}>
                                    <Text style={styles.replyText}>Reply</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { }}>
                                    <Text style={styles.replyText}>Like?</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => { }}>
                                <View style={styles.positionRightBottom}>
                                    <Image source={require("../../../assets/images/icon/like-heart.png")} style={styles.likeHandIcon} />
                                    <Text style={{ color: "#fff", marginLeft: 10, marginTop: 5 }}>{Math.floor(Math.random() * (125 - 0 + 1) + 0)}</Text>
                                </View>
                            </TouchableOpacity>
                            <Image source={require("../../../assets/images/icon/comment-reply.png")} style={styles.replyDirector} />
                        </Card>
                    </ScrollView>
                </View>
            </View>
        </Fragment>
    );
}
export default IndividualIncidentReportView;