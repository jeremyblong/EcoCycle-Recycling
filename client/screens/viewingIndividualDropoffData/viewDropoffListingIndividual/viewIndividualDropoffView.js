import React, { useState, Fragment, useEffect, useRef } from "react";
import { Fonts, Colors, Sizes, } from "../../../constants/styles";
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image, Dimensions, Animated, Keyboard } from "react-native";
import CollapsingToolbar from "../../../component/appBarScreen.js";
import GoogleMapRenderHelper from "./helpers/mapRender.js";
import { useNavigation } from "@react-navigation/native";
import styles from "./viewIndividualDropoffViewStyles.js";
import Collapsible from 'react-native-collapsible';
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import { BASE_ASSET_URL, BASE_URL } from "@env";
import Modal from "react-native-modal";
import Svg, { Path } from 'react-native-svg';
import moment from "moment";
import ViewMoreText from 'react-native-view-more-text';
import axios from "axios";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import Dialog from "react-native-dialog";
import Toast from 'react-native-toast-message';
import { connect } from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import RBSheetReplyToCommentHelper from "./helpers/RBSheetComment/commentReplySheetHelper.js";
import _ from "lodash";
import RBSheetSendPrivateMessageHelper from "./helpers/RBSheetPrivateMessage/sendPrivateMessagePane.js";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

const { width, height } = Dimensions.get('screen');

const ViewIndividualDropoffListingStorageViewMain = (props) => {

    const textInputCommentRef = useRef(null);
    const refSheetCommentReply = useRef(null);
    const sendPrivateMessageRef = useRef(null);

    
    const { route, authData } = props;

    const { listing } = route.params;

    const navigation = useNavigation();

    const [ state, setState ] = useState({
        expanded: false,
        showSnackBar: false,
        isInWishList: false,
        isCollapsed: false,
        modalVisibility: false,
        selectedImage: null,
        commentText: "",
        comments: [],
        posterProfilePic: null,
        commentDialog: false,
        multiline: false,
        currentlySelected: null,
        liveListing: null,
        listingLoaded: false,
        isFetchingComments: false,
        sliceRegion: {
            start: 0,
            end: 1
        }
    });

    const { mainData, postedByID, date, dateString, id, newlyConstructedCoordsRandomizedNearby, alreadyCompletedDeliveries, comments, likes, dislikes, postedByName, postedByUsername
    } = state.liveListing || {};
    
    const { mainCategory, subCategory, environmentalConditions, environmentBuildingType, spaceMeasurementsDimensionsFeet, contactRequiredOrNot, description, uploadedRelatedImages } = mainData || {};

    const fetchCommentsToAddProfilePic = () => {

        const { comments } = state;

        const promises = [];

        if (typeof comments !== "undefined" && comments.length > 0) {
            for (let idxxxxx = 0; idxxxxx < comments.length; idxxxxx++) {
                const previousCommentOBJ = comments[idxxxxx];
                
                const { commenterID } = previousCommentOBJ;
    
                if (typeof previousCommentOBJ.subcomments !== "undefined" && previousCommentOBJ.subcomments.length > 0) {

                    for (let idxxxxx = 0; idxxxxx < previousCommentOBJ.subcomments.length; idxxxxx++) {
                        const nestedSubcomment = previousCommentOBJ.subcomments[idxxxxx];

                        console.log("nestedSubcomment", nestedSubcomment);

                        promises.push(new Promise((resolve, reject) => {
                            // update comments state
                            const config = {
                                params: {
                                    postedByID: nestedSubcomment.commenterID
                                }
                            };
                            axios.get(`${BASE_URL}/gather/only/profile/picture/with/id`, config).then((res) => {
                                if (res.data.message === "Submitted gathered user's picture/file!") {
        
                                    const { user } = res.data; 
            
                                    nestedSubcomment["lastProfilePic"] = (typeof user.profilePictures !== "undefined" && user.profilePictures.length > 0) ? user.profilePictures[user.profilePictures.length - 1] : null;
            
                                    resolve(previousCommentOBJ);
                                } else {
            
                                    nestedSubcomment["lastProfilePic"] = null;
            
                                    resolve(previousCommentOBJ);
                                }
                            }).catch((err) => {
                                nestedSubcomment["lastProfilePic"] = null;
            
                                resolve(previousCommentOBJ);
                            })
                        }));
                    }

                } else {
                    promises.push(new Promise((resolve, reject) => {
                        // update comments state
                        const config = {
                            params: {
                                postedByID: commenterID
                            }
                        };
                        axios.get(`${BASE_URL}/gather/only/profile/picture/with/id`, config).then((res) => {
                            if (res.data.message === "Submitted gathered user's picture/file!") {
    
                                const { user } = res.data; 
        
                                previousCommentOBJ["lastProfilePic"] = (typeof user.profilePictures !== "undefined" && user.profilePictures.length > 0) ? user.profilePictures[user.profilePictures.length - 1] : null;
        
                                resolve(previousCommentOBJ);
                            } else {
        
                                previousCommentOBJ["lastProfilePic"] = null;
        
                                resolve(previousCommentOBJ);
                            }
                        }).catch((err) => {
                            previousCommentOBJ["lastProfilePic"] = null;
        
                            resolve(previousCommentOBJ);
                        })
                    }));
                }
            };
    
            Promise.all(promises).then((passedValues) => {

                console.log("Promise passedValues passedValues passedValues passedValues....:", passedValues);
    
                setState(prevState => {
                    return {
                        ...prevState,
                        comments: passedValues
                    }
                });
            });
        } else {
            console.log("NO comments available...!");
        }
    }
    console.log("state.comments", state.comments);

    useEffect(() => {
        console.log("Effect subcomments-related re-mounted...");

        fetchCommentsToAddProfilePic();

    }, [...state.comments.map((comment) => {
        return comment.id;
    })])
    
    useEffect(() => {
        console.log("Effect comments re-mounted...");

        fetchCommentsToAddProfilePic();

    }, [state.comments.length]);

    useEffect(() => {
        // set listing data for global availability...!
        setState(prevState => {
            return {
                ...prevState,
                liveListing: listing,
                listingLoaded: true
            }
        });
        // fetch pictures relevant to comment(s)
        const config = {
            params: {
                postedByID: listing.postedByID
            }
        };
        axios.get(`${BASE_URL}/gather/only/profile/picture/with/id`, config).then((res) => {
            if (res.data.message === "Submitted gathered user's picture/file!") {

                console.log("Succcccccccesssss: ", res.data);

                const { user } = res.data; 

                setState(prevState => {
                    return {
                        ...prevState,
                        posterProfilePic: (typeof user.profilePictures !== "undefined" && user.profilePictures.length > 0) ? user.profilePictures[user.profilePictures.length - 1] : null,
                        comments: listing.comments
                    }
                })
            } else {
                console.log("Else ran upon axios request...:", res.data);
            }
        }).catch((err) => {
            console.log("Errrrrrrrrrrrrrr", err);
        });

        fetchCommentsToAddProfilePic();
    }, []) 

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const contactOwnerInfo = () => {

        const calculateProfilePicPoster = () => {
            if (state.posterProfilePic !== null) {
                return (
                    <Fragment>
                        <Image
                            source={{ uri: `${BASE_ASSET_URL}/${state.posterProfilePic.link}` }}
                            style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
                        />
                    </Fragment>
                );
            } else {
                return (
                    <Fragment>
                        <Image
                            source={require('../../../assets/images/icon/user-default.png')}
                            style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
                        />
                    </Fragment>
                );
            }
        }
        return (
            <View style={styles.ownerInfoContentStyle}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                    }}>
                        {calculateProfilePicPoster()}
                        <View style={{ marginLeft: Sizes.fixPadding }}>
                            <Text style={{ ...Fonts.blackColor16Bold, fontWeight: "bold", textDecorationLine: "underline" }}>
                                {postedByName}
                            </Text>
                            <Text style={{ ...Fonts.grayColor14Medium, flexWrap: "nowrap", display: "flex", maxWidth: width * 0.285 }}>
                                {postedByUsername}
                            </Text>
                        </View>
                    </View>
                    <AwesomeButtonBlue width={150} type={"secondary"} onPress={() => sendPrivateMessageRef.current.open()} backgroundShadow={"black"}>Contact This User</AwesomeButtonBlue>
                </View>
            </View>
        )
    }
    const renderPhysicalSpaceSizeRender = () => {
        
        const { length, width, height } = spaceMeasurementsDimensionsFeet;
        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: Sizes.fixPadding - 8.0
                    }}>
                    <Text style={styles.titled}>
                        Space/Location Size-Constraint(s)
                    </Text>
                    <TouchableOpacity onPress={() => {
                        setState(prevState => {
                            return {
                                ...prevState,
                                isCollapsed: !prevState.isCollapsed
                            }
                        })
                    }}>
                        <Image
                            source={require('../../../assets/images/icon/change-96.png')}
                            style={{ width: 32.5, height: 32.5, borderRadius: 11.5, left: -15 }}
                        />
                    </TouchableOpacity>
                </View>
                <Collapsible collapsed={state.isCollapsed}>
                    <View style={{ marginVertical: Sizes.fixPadding + 1.75, marginHorizontal: Sizes.fixPadding * 1.75 }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: Sizes.fixPadding - 7.0
                        }}>
                            <Text style={{ ...Fonts.grayColor12Medium, fontWeight: "bold", fontSize: 16.25 }}>
                                <Text style={styles.buildingTypeText}>{length}" x {width}" x {height}"</Text> (Length ~ Width ~ Height)
                            </Text>
                        </View>
                    </View>
                </Collapsible>
            </View>
        )
    }
    const enviormentalConditionsMet = () => {
        return (
            <View style={{ marginTop: Sizes.fixPadding - 8.0, paddingBottom: Sizes.fixPadding }}>
                {environmentalConditions.map((item) => (
                    <View key={item.id}>
                        <View style={styles.aminitiesContentStyle}>
                            <Image
                                source={require('../../../assets/images/icon/checked-circle.png')}
                                style={{ width: 27.25, height: 27.25, borderRadius: 9.25, tintColor: Colors.primaryColor }}
                            />
                            <Text style={{ ...Fonts.blackColor14Regular, marginLeft: 8.25, marginTop: 1.5 }}>
                                <Text style={styles.mainChunkText}>{item.name}</Text> ~ {item.subtitle}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        )
    }
    const mapInfo = () => {

        const latitude = newlyConstructedCoordsRandomizedNearby.coordinates[1];
        const longitude = newlyConstructedCoordsRandomizedNearby.coordinates[0];

        return (
            <View style={styles.mapStyle}>
                <GoogleMapRenderHelper
                    latitude={latitude}
                    longitude={longitude}
                    height={150}
                    pinColor={Colors.primaryColor}
                />
            </View>
        )
    }
    const renderPhotoLargeViewModalHelper = () => {
        if (state.selectedImage !== null) {
            
            const { link, name, date, systemDate } = state.selectedImage;
            return (
                <Fragment>
                    <Modal style={styles.imageModalMain} backdropColor={"#000"} onBackButtonPress={() => {
                        setState(prevState => {
                            return {
                                ...prevState,
                                modalVisibility: false
                            }
                        })
                    }} onBackdropPress={() => {
                        setState(prevState => {
                            return {
                                ...prevState,
                                modalVisibility: false
                            }
                        })
                    }} isVisible={state.modalVisibility} backdropOpacity={0.825}>
                        <View style={styles.innerModalWrapper}>
                            <Image
                                source={{ uri: `${BASE_ASSET_URL}/${link}` }}
                                style={styles.propertyPhotosModalImageStyle}
                                resizeMode="cover"
                            />
                            <View style={styles.hr} />
                            <View style={{ backgroundColor: "#fff" }}>
                                <View style={styles.textInnerContainer}>
                                    <Text style={styles.textInnerLabel}>File Name:</Text>
                                    <Text style={styles.imageNameWrapped}>{name}</Text>
                                </View>
                                <View style={styles.hr} />
                                <View style={styles.textInnerContainer}>
                                    <Text style={styles.textInnerLabel}>Timestamp Of Upload</Text>
                                    <Text style={styles.imageNameWrapped}>{systemDate} or around {moment(date).fromNow(false)}</Text>
                                </View>
                                <View style={styles.hr} />
                                <Animated.View
                                    style={{ transform: [{ rotateX: '180deg' }] }}
                                >
                                    <Svg
                                        height={150}
                                        width={width * 0.9035}
                                        viewBox="0 0 1440 320"
                                        style={{ left: 0, right: 0, bottom: 70 }}
                                        preserveAspectRatio="none"
                                    >
                                        <Path
                                            fill={Colors.secondaryColor}
                                            d={"M0,128L6.5,117.3C13,107,26,85,39,74.7C51.9,64,65,64,78,101.3C90.8,139,104,213,117,250.7C129.7,288,143,288,156,250.7C168.6,213,182,139,195,138.7C207.6,139,221,213,234,213.3C246.5,213,259,139,272,106.7C285.4,75,298,85,311,74.7C324.3,64,337,32,350,64C363.2,96,376,192,389,213.3C402.2,235,415,181,428,181.3C441.1,181,454,235,467,256C480,277,493,267,506,245.3C518.9,224,532,192,545,186.7C557.8,181,571,203,584,208C596.8,213,610,203,623,176C635.7,149,649,107,662,117.3C674.6,128,688,192,701,213.3C713.5,235,726,213,739,208C752.4,203,765,213,778,229.3C791.4,245,804,267,817,266.7C830.3,267,843,245,856,208C869.2,171,882,117,895,90.7C908.1,64,921,64,934,58.7C947,53,960,43,973,80C985.9,117,999,203,1012,224C1024.9,245,1038,203,1051,202.7C1063.8,203,1077,245,1090,240C1102.7,235,1116,181,1129,144C1141.6,107,1155,85,1168,69.3C1180.5,53,1194,43,1206,53.3C1219.5,64,1232,96,1245,101.3C1258.4,107,1271,85,1284,90.7C1297.3,96,1310,128,1323,165.3C1336.2,203,1349,245,1362,224C1375.1,203,1388,117,1401,85.3C1414.1,53,1427,75,1434,85.3L1440,96L1440,0L1433.5,0C1427,0,1414,0,1401,0C1388.1,0,1375,0,1362,0C1349.2,0,1336,0,1323,0C1310.3,0,1297,0,1284,0C1271.4,0,1258,0,1245,0C1232.4,0,1219,0,1206,0C1193.5,0,1181,0,1168,0C1154.6,0,1142,0,1129,0C1115.7,0,1103,0,1090,0C1076.8,0,1064,0,1051,0C1037.8,0,1025,0,1012,0C998.9,0,986,0,973,0C960,0,947,0,934,0C921.1,0,908,0,895,0C882.2,0,869,0,856,0C843.2,0,830,0,817,0C804.3,0,791,0,778,0C765.4,0,752,0,739,0C726.5,0,714,0,701,0C687.6,0,675,0,662,0C648.6,0,636,0,623,0C609.7,0,597,0,584,0C570.8,0,558,0,545,0C531.9,0,519,0,506,0C493,0,480,0,467,0C454.1,0,441,0,428,0C415.1,0,402,0,389,0C376.2,0,363,0,350,0C337.3,0,324,0,311,0C298.4,0,285,0,272,0C259.5,0,246,0,234,0C220.5,0,208,0,195,0C181.6,0,169,0,156,0C142.7,0,130,0,117,0C103.8,0,91,0,78,0C64.9,0,52,0,39,0C25.9,0,13,0,6,0L0,0Z"}
                                        />
                                    </Svg>
                                </Animated.View>
                                <View style={{ margin: 7.25 }}>
                                    <AwesomeButtonBlue stretch={true} type={"secondary"} onPress={() => {
                                        setState(prevState => {
                                            return {
                                                ...prevState,
                                                selectedImage: null,
                                                modalVisibility: false
                                            }
                                        })
                                    }} backgroundShadow={"black"}>Close View/Pane</AwesomeButtonBlue>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </Fragment>
            ); // `${BASE_ASSET_URL}/${item.link}`
        } 
    }
    const photos = () => {
        const renderItem = ({ item, index }) => {
            return (
                <Fragment key={index}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={{ overflow: 'hidden' }}
                        onPress={() => {
                            setState(prevState => {
                                return {
                                    ...prevState,
                                    selectedImage: item,
                                    modalVisibility: true
                                }
                            })
                        }} // navigation.navigate('ImageFullView', { image: item.photo, id: item.id })
                    >
                        <Image
                            source={{ uri: `${BASE_ASSET_URL}/${item.link}` }}
                            style={styles.propertyPhotosStyle}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                </Fragment>
            );
        }
        return (
            <FlatList
                horizontal
                data={uploadedRelatedImages}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: Sizes.fixPadding * 2.0,
                    paddingTop: Sizes.fixPadding - 5.0
                }}
            />
        )
    };
    const handleCommentAdd = (comment) => {
        console.log("handleCommentAdd clicked/executed...:", comment);

        Keyboard.dismiss();

        const { commentText } = state;

        const { uniqueId, firstName, lastName, username } = authData;

        const config = {
            uniqueId,
            commenterFullName: `${firstName} ${lastName}`,
            commenterUsername: username,
            commentText,
            listingID: listing.id
        };

        axios.post(`${BASE_URL}/post/new/comment/dropoff/listing`, config).then((res) => {
            if (res.data.message === "Submitted & posted comment successfully!") {
                console.log(res.data);

                const { comments } = res.data;
                
                setState(prevState => {
                    return {
                        ...prevState,
                        comments,
                        commentText: ""
                    }
                })

                Toast.show({
                    type: 'success',
                    text1: `Successfully POSTED your comment!`,
                    text2: `We've successfully posted your new comment and it is now live/active & viewable by other user's...`,
                    visibilityTime: 2750,
                    position: "bottom"
                });

            } else {
                Toast.show({
                    type: 'error',
                    text1: `An error occurred while attempting post your comment!`,
                    text2: `We've encountered an error while attempting to post your new comment, please try this action again or contact support if the problem persists...`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
            }
        }).catch((err) => {
            Toast.show({
                type: 'error',
                text1: `An error occurred while attempting post your comment!`,
                text2: `We've encountered an error while attempting to post your new comment, please try this action again or contact support if the problem persists...`,
                visibilityTime: 4250,
                position: "bottom"
            });
        });
    }

    const addLikeToComment = (comment) => {
        console.log("addLikeToComment clicked/executed...:");

        const { uniqueId, firstName, lastName, username } = authData;

        const config = {
            uniqueId,
            commenterFullName: `${firstName} ${lastName}`,
            commenterUsername: username,
            listingID: listing.id,
            commentID: comment.id
        };

        axios.post(`${BASE_URL}/like/or/remove/heart/main/comment/dropoff/listing`, config).then((res) => {
            if (res.data.message === "Successfully 'hearted' the comment!") {
                console.log(res.data);

                const { comments } = res.data;
                
                setState(prevState => {
                    return {
                        ...prevState,
                        comments
                    }
                })

                Toast.show({
                    type: 'success',
                    text1: `Successfully LIKED the desired comment!`,
                    text2: `We've successfully added/removed the appropriate 'like/heart' based on any previous interactions w/this comment - if you liked it we removed the like but if no like was present, one was added!`,
                    visibilityTime: 2750,
                    position: "bottom"
                });

            } else if (res.data.message === "Successfully removed 'hearted' reaction from comment!") {
                console.log(res.data);

                const { comments } = res.data;
                
                setState(prevState => {
                    return {
                        ...prevState,
                        comments
                    }
                })

                Toast.show({
                    type: 'info',
                    text1: `Successfully REMOVED your previous 'like/heart'!`,
                    text2: `We've successfully added/removed the appropriate 'like/heart' based on any previous interactions w/this comment - if you liked it we removed the like but if no like was present, one was added!`,
                    visibilityTime: 2750,
                    position: "bottom"
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: `An error occurred while attempting to 'like/heart' the comment!`,
                    text2: `We've encountered an error while attempting to 'like/heart' the comment, please try this action again or contact support if the problem persists...`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
            }
        }).catch((err) => {
            Toast.show({
                type: 'error',
                text1: `An error occurred while attempting to 'like/heart' the comment!`,
                text2: `We've encountered an error while attempting to 'like/heart' the comment, please try this action again or contact support if the problem persists...`,
                visibilityTime: 4250,
                position: "bottom"
            });
        });
    }

    const addLikeToSubCommentNested = (comment, mainComment) => {
        console.log("addLikeToSubCommentNested clicked/executed...:");

        const { uniqueId, firstName, lastName, username } = authData;

        const config = {
            mainCommentID: mainComment.id,
            uniqueId,
            commenterFullName: `${firstName} ${lastName}`,
            commenterUsername: username,
            listingID: listing.id,
            commentID: comment.id
        };
       
        axios.post(`${BASE_URL}/like/or/remove/nested/subcomment/dropoff/listing`, config).then((res) => {
            if (res.data.message === "Successfully 'hearted' the comment!") {
                console.log(res.data);

                const { comments } = res.data;
                
                setState(prevState => {
                    return {
                        ...prevState,
                        comments
                    }
                })

                Toast.show({
                    type: 'success',
                    text1: `Successfully LIKED the desired comment!`,
                    text2: `We've successfully added/removed the appropriate 'like/heart' based on any previous interactions w/this comment - if you liked it we removed the like but if no like was present, one was added!`,
                    visibilityTime: 2750,
                    position: "bottom"
                });

            } else if (res.data.message === "Successfully removed 'hearted' reaction from comment!") {
                console.log(res.data);

                const { comments } = res.data;
                
                setState(prevState => {
                    return {
                        ...prevState,
                        comments
                    }
                })

                Toast.show({
                    type: 'info',
                    text1: `Successfully REMOVED your previous 'like/heart'!`,
                    text2: `We've successfully added/removed the appropriate 'like/heart' based on any previous interactions w/this comment - if you liked it we removed the like but if no like was present, one was added!`,
                    visibilityTime: 2750,
                    position: "bottom"
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: `An error occurred while attempting to 'like/heart' the comment!`,
                    text2: `We've encountered an error while attempting to 'like/heart' the comment, please try this action again or contact support if the problem persists...`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
            }
        }).catch((err) => {
            Toast.show({
                type: 'error',
                text1: `An error occurred while attempting to 'like/heart' the comment!`,
                text2: `We've encountered an error while attempting to 'like/heart' the comment, please try this action again or contact support if the problem persists...`,
                visibilityTime: 4250,
                position: "bottom"
            });
        });
    }

    const replyToMessageComment = (comment) => {
        console.log("replyToMessageComment clicked/executed...:");

        setState(prevState => {
            return {
                ...prevState,
                currentlySelected: comment
            }
        });

        refSheetCommentReply.current.open();
    }
    const renderViewMore = (onPress) => {
        return (
            <Text style={styles.showMoreOrLess} onPress={onPress}>View more</Text>
        )
    }
    const renderViewLess = (onPress) => {
        return (
            <Text style={styles.showMoreOrLess} onPress={onPress}>View less</Text>
        )
    }
    const renderBuildingType = (listing) => {
        return (
            <View style={{ marginLeft: 17.25, marginRight: 17.25, marginBottom: 25 }}>
                <Text style={styles.buildingTypeText}>{environmentBuildingType.name}</Text>
                <View style={styles.thinnerHr} />
                <Text style={styles.buildingTypeTextSub}>{environmentBuildingType.subtitle}</Text>
            </View>
        );
    }
    const renderContactRequirements = (listing) => {
        return (
            <View style={{ marginLeft: 17.25, marginRight: 17.25, marginBottom: 25 }}>
                <Text style={styles.buildingTypeText}>{contactRequiredOrNot.name}</Text>
                <View style={styles.thinnerHr} />
                <Text style={styles.buildingTypeTextSub}>{contactRequiredOrNot.subtitle}</Text>
            </View>
        );
    }
    const descriptionTextRender = (listing) => {
        return (
            <ViewMoreText
                numberOfLines={3}
                renderViewMore={renderViewMore}
                renderViewLess={renderViewLess}
                textStyle={{ ...Fonts.blackColor12Regular, marginHorizontal: Sizes.fixPadding * 1.75, marginRight: 25, textAlign: 'justify', color: "#000", fontWeight: "bold" }}
            >
                <Text>
                    {description}
                </Text>
            </ViewMoreText>
        );
    }
    const title = ({ title }) => {
        return (
            <Text style={styles.titled}>
                {title}
            </Text>
        )
    }
    const renderSpacerPadding = () => {
        return <View style={{ paddingTop: 12.5, paddingBottom: 12.5 }} />;
    }
    const renderCommentConfirmationDialog = () => {
        return (
            <Dialog.Container visible={state.commentDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.black18Bold, paddingBottom: Sizes.fixPadding - 5.0, fontSize: 17.25 }}>
                        Are you ready to post your comment? Please click "Post My Comment" if you're ready to submit your comment or cancel to continue with your edit(s)...
                    </Text>
                    <View style={styles.modalHrLine} />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        commentDialog: false
                                    }
                                })
                            }}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black20Regular, fontWeight: "bold", textAlign: "center", color: "#fff" }}>Cancel ~ Don't Post.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        commentDialog: false
                                    }
                                });
                                
                                handleCommentAdd();
                            }}
                            style={styles.logOutButtonStyle}
                        >
                            <Text style={{ ...Fonts.white20Regular, textAlign: "center", fontWeight: "bold", color: "#fff" }}>Post My Comment!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }
    const renderCommentList = () => {

        const calculateMainPreviousLikeOrNot = (item) => {
            const alreadyRespondedIndex = _.has(item, "alreadyReactedArr") ? item.alreadyReactedArr.findIndex(item => item.reactorID === authData.uniqueId) : -1;
            const { likes } = item;

            return <Text style={styles.replyTextLeftLike}><Text style={alreadyRespondedIndex === -1 ? styles.blackBold : styles.redText}>{alreadyRespondedIndex === -1 ? "Add Like!" : "Remove Like?"}</Text>{'\t'}{'\t'}<Text style={styles.greenText}>{likes} like(s)</Text></Text>;
        }
        // render item helper function...
        const renderItem = ({ item, index }) => {
            const { subcomments } = item;
            return (
                <View style={styles.columned} key={index}>
                    <View style={styles.containerFlatList}>
                        <TouchableOpacity onPress={() => {}}>
                            {typeof item.lastProfilePic !== "undefined" && item.lastProfilePic !== null ? <Image style={styles.image} source={{ uri: `${BASE_ASSET_URL}/${item.lastProfilePic.link}` }}/> : <Image style={styles.image} source={require("../../../assets/images/icon/user-default.png")}/>}
                        </TouchableOpacity>
                        <View style={styles.contentFlatList}>
                            <View style={styles.contentHeader}>
                            <Text style={styles.name}>{item.commenterFullName}</Text>
                            <Text style={styles.time}>Posted {moment(item.posted).fromNow()}</Text>
                            </View>
                            <Text rkType='primary3 mediumLine'>{item.commentText.slice(0, 150)}</Text>
                        </View>
                        <TouchableOpacity style={styles.positionLeftReply} onPress={() => replyToMessageComment(item)}>
                            <Text style={styles.replyTextLeft}>Reply</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.positionLeftReplyLikeOutter} onPress={() => addLikeToComment(item)}>
                            {calculateMainPreviousLikeOrNot(item)}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.positionRightTouchable} onPress={() => addLikeToComment(item)}>
                            <Image style={styles.heartImageIcon} source={require('../../../assets/images/icon/light-blue-heart.png')}/>
                        </TouchableOpacity>
                    </View> 
                    {typeof subcomments !== "undefined" && subcomments.length > 0 ? subcomments.map((subcomment, indexxxxx) => {
                        console.log("subcomment", subcomment);
                        return (
                            <View style={styles.columned}>
                                <View style={styles.topContainerSub}>
                                    <Image style={styles.hookedArrowUp} source={require('../../../assets/images/icon/up-hooked-arrow.png')}/>
                                    <Text style={styles.replyingNoteText}>(Reply/Subcomment)</Text>
                                    <Image style={styles.hookedArrowUpRight} source={require('../../../assets/images/icon/up-right-arrow.png')}/>
                                </View>
                                <View style={styles.outterRowLayer} key={indexxxxx}>
                                    <View style={styles.containerNestedFlatList}>
                                        <TouchableOpacity style={styles.positionRightTouchableNested} onPress={() => addLikeToSubCommentNested(subcomment, item)}>
                                            <Image style={styles.heartImageIconSubbed} source={require('../../../assets/images/icon/light-blue-heart.png')}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.positionLeftReplyLikeOutterNested} onPress={() => addLikeToSubCommentNested(subcomment, item)}>
                                            {calculateMainPreviousLikeOrNot(subcomment)}
                                        </TouchableOpacity>
                                        <View style={styles.contentNestedFlatList}>
                                            <View style={styles.contentHeader}>
                                                <Text style={styles.timeSub}>Posted {moment(subcomment.posted).fromNow()}</Text>
                                                <Text style={styles.nameSub}>{subcomment.commenterFullName}</Text>
                                            </View>
                                            <Text style={styles.mainTextSub} rkType='primary3 mediumLine'>{subcomment.commentText.slice(0, 150)}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => {}}>
                                            {typeof subcomment.lastProfilePic !== "undefined" && subcomment.lastProfilePic !== null ? <Image style={styles.image} source={{ uri: `${BASE_ASSET_URL}/${subcomment.lastProfilePic.link}` }}/> : <Image style={styles.image} source={require("../../../assets/images/icon/user-default.png")}/>}
                                        </TouchableOpacity>
                                    </View> 
                                </View>
                            </View>
                        );
                    }) : null}
                </View>
            );
        };

        const onRefresh = () => {
            console.log("handle refresh...!");

            setState(prevState => {
                return {
                    ...prevState,
                    sliceRegion: {
                        start: prevState.sliceRegion.start + 4,
                        end: prevState.sliceRegion.end + 4
                    }
                }
            })
        }
        const renderCommentSubmissionButton = () => {
            console.log("renderCommentSubmissionButton ran/running...");

            const { commentText } = state;
            if (typeof commentText !== "undefined" && commentText.length >= 20) {
                return (
                    <Fragment>
                        <View style={styles.centered}>
                            <View style={styles.thickerBlueHr} />
                        </View>
                        <View style={styles.centered}>
                            <TouchableOpacity onPress={() => {
                                setState(prevState => {
                                    return {
                                        ...prevState,
                                        commentDialog: true
                                    }
                                })
                            }} style={styles.commentSubmissionTouchable}>
                                <View style={styles.rowOnly}>
                                    <Image style={styles.heartImageIcon} source={require('../../../assets/images/icon/post-new-comment.png')}/>
                                    <Text style={styles.touchableInnerText}>Submit Comment!</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Fragment>
                );
            }
        };
        console.log("state.sliceRegion.start, state.sliceRegion.end", state.sliceRegion.start, state.sliceRegion.end);
        return (
            <Fragment>
                <View style={styles.centered}>
                    <View style={styles.thickerBlueHrTop} />
                </View>
                <View style={{ margin: 4.25 }}>
                    <FloatingLabelInput 
                        label={"Type a comment/thought..."}
                        labelStyles={{ paddingTop: 10 }}
                        maxLength={150}
                        multiline={state.multiline}
                        staticLabel={true}
                        hint={"Enter AT least 20 characters..."}
                        hintTextColor={Colors.primaryColor}
                        ref={textInputCommentRef}
                        numberOfLines={state.multiline ? 6 : 1}
                        showCountdown={true}
                        onFocus={() => {
                            setState(prevState => {
                                return {
                                    ...prevState,
                                    multiline: true
                                }
                            })
                        }}
                        inputStyles={{ textAlignVertical: 'top', paddingTop: 22.5 }}
                        onBlur={() => {
                            setState(prevState => {
                                return {
                                    ...prevState,
                                    multiline: false
                                }
                            });
                            Keyboard.dismiss();
                        }}
                        blurOnSubmit={true}
                        rightComponent={typeof state.commentText !== "undefined" && state.commentText.length >= 20 ? <TouchableOpacity onPress={() => {
                            setState(prevState => {
                                return {
                                    ...prevState,
                                    commentDialog: true
                                }
                            })
                        }}><Image style={styles.innerIconInput} source={require('../../../assets/images/icon/post-new-comment.png')} /></TouchableOpacity> : null}
                        value={state.commentText}
                        returnKeyType={"submit"}
                        onChangeText={value => {
                            setState(prevState => {
                                return {
                                    ...prevState,
                                    commentText: value
                                }
                            })
                        }}
                    />
                </View>
                {renderCommentSubmissionButton()}
                <View style={styles.centered}>
                    <View style={styles.thickerBlueHr} />
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponentStyle={styles.flatListHeaderStyles}
                    keyExtractor={(item) => item.id}
                    data={state.comments} //.slice(state.sliceRegion.start, state.sliceRegion.end)
                    style={styles.root}
                    contentContainerStyle={{ flex: 1 }}
                    // onEndReachedThreshold={0.1}
                    // onEndReached={({ distanceFromEnd }) => {
                    //     console.log("distanceFromEnd", distanceFromEnd);

                    //     if (distanceFromEnd < 0 && state.listingLoaded === true) return;
                    //         onRefresh();
                    //     }
                    // }
                    extraData={state}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={styles.separator}/>
                        );
                    }}
                    renderItem={renderItem} 
                />
            </Fragment>
        );
    }
    const propertyInfo = (listing) => {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={[styles.propertyAmountContentStyle, { marginTop: 32.5 }]}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        {mainCategory.subtitle}
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: Sizes.fixPadding
                }}>
                    <View>
                        <Text style={{ ...Fonts.grayColor14Medium }}>
                            Posted <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>{moment(date).fromNow(true)}</Text> on {dateString}
                        </Text>
                        <Text style={styles.subCategoryStyleText}>
                            {subCategory.name}
                        </Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: Sizes.fixPadding + 8.75,
                    marginBottom: Sizes.fixPadding + 2.75
                }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.numericalWrapper}>
                            <Text style={styles.numericalText}><Text style={styles.innerNumText}>{likes}</Text> likes</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.numericalWrapper}>
                            <Text style={styles.numericalText}><Text style={styles.innerNumText}>{dislikes}</Text> dislikes</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.numericalWrapper}>
                            <Text style={styles.numericalText}><Text style={styles.innerNumText}>{alreadyCompletedDeliveries}</Text> drop's</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    const {
        showSnackBar,
        isInWishList,
    } = state;

    const thumbsUpMainPostSubmission = (listing) => {
        console.log("thumbsUpMainPostSubmission clicked/ran...!");

        const { uniqueId, firstName, lastName, username } = authData;

        const config = {
            uniqueId,
            reactorFullName: `${firstName} ${lastName}`,
            reactorUsername: username,
            listingID: listing.id
        };
       
        axios.post(`${BASE_URL}/respond/thumbs/up/dropoff/listing/main`, config).then((res) => {
            if (res.data.message === "Successfully 'thumbed-up' the comment!") {

                console.log("Successfully 'thumbed-up' the comment!..........:", res.data);

                const { listing } = res.data;
                
                setState(prevState => {
                    return {
                        ...prevState,
                        liveListing: listing
                    }
                });

                Toast.show({
                    type: 'success',
                    text1: `You've 'thumbs-upd' this listing/drop-off post!`,
                    text2: `We've successfully updated/added your 'thumbs-up' response to this listing's data!`,
                    visibilityTime: 2750,
                    position: "bottom"
                });
            } else if (res.data.message === "Successfully removed-previous 'thumbed-up' the comment!") {
                console.log("Successfully 'thumbed-up' the comment!..........:", res.data);

                const { listing } = res.data;
                
                setState(prevState => {
                    return {
                        ...prevState,
                        liveListing: listing
                    }
                });

                Toast.show({
                    type: 'info',
                    text1: `We've successfully revoked your previous 'like'!`,
                    text2: `We've successfully revoked/removed the previous 'like' you left at a different point in time - since you've already previously reacted, we automatically removed it!`,
                    visibilityTime: 2750,
                    position: "bottom"
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: `An error occurred while attempting to 'thumbs-up' the comment!`,
                    text2: `We've encountered an error while attempting to 'thumbs-up' the comment, please try this action again or contact support if the problem persists...`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
            }
        }).catch((err) => {
            Toast.show({
                type: 'error',
                text1: `An error occurred while attempting to 'thumbs-up' the comment!`,
                text2: `We've encountered an error while attempting to 'thumbs-up' the comment, please try this action again or contact support if the problem persists...`,
                visibilityTime: 4250,
                position: "bottom"
            });
        });
    }
    
    const thumbsDownMainPostSubmission = (listing) => {
        console.log("thumbsDownMainPostSubmission clicked/ran...!");

        const { uniqueId, firstName, lastName, username } = authData;

        const config = {
            uniqueId,
            reactorFullName: `${firstName} ${lastName}`,
            reactorUsername: username,
            listingID: listing.id
        };
       
        axios.post(`${BASE_URL}/respond/thumbs/down/dropoff/listing/main`, config).then((res) => {
            if (res.data.message === "Successfully 'thumbed-down' the comment!") {
                console.log("Successfully 'thumbed-down' the comment!..........:", res.data);

                const { listing } = res.data;
                
                setState(prevState => {
                    return {
                        ...prevState,
                        liveListing: listing
                    }
                });

                Toast.show({
                    type: 'success',
                    text1: `You've 'thumbs-downd' this listing/drop-off post!`,
                    text2: `We've successfully updated/added your 'thumbs-down' response to this listing's data!`,
                    visibilityTime: 2750,
                    position: "bottom"
                });
            } else if (res.data.message === "Successfully removed-previous 'thumbed-down' the comment!") {
                console.log("Successfully 'thumbed-down' the comment!..........:", res.data);

                const { listing } = res.data;
                
                setState(prevState => {
                    return {
                        ...prevState,
                        liveListing: listing
                    }
                });

                Toast.show({
                    type: 'info',
                    text1: `We've successfully revoked your previous 'like'!`,
                    text2: `We've successfully revoked/removed the previous 'like' you left at a different point in time - since you've already previously reacted, we automatically removed it!`,
                    visibilityTime: 2750,
                    position: "bottom"
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: `An error occurred while attempting to 'thumbs-down' the comment!`,
                    text2: `We've encountered an error while attempting to 'thumbs-down' the comment, please try this action again or contact support if the problem persists...`,
                    visibilityTime: 4250,
                    position: "bottom"
                });
            }
        }).catch((err) => {
            Toast.show({
                type: 'error',
                text1: `An error occurred while attempting to 'thumbs-down' the comment!`,
                text2: `We've encountered an error while attempting to 'thumbs-down' the comment, please try this action again or contact support if the problem persists...`,
                visibilityTime: 4250,
                position: "bottom"
            });
        });
    }

    const conditionallyRenderMainChunkData = () => {

        const { listingLoaded, liveListing } = state;

        if (listingLoaded === true) {
            return (
                <Fragment>
                    <RBSheet
                        ref={refSheetCommentReply}
                        closeOnDragDown={false}
                        closeOnPressMask={true}
                        dragFromTopOnly={true}
                        height={height}
                        closeDuration={35}
                        openDuration={35}
                        customStyles={{
                            container: {
                                paddingHorizontal: Sizes.fixPadding * 2.0,
                            },
                            draggableIcon: {
                                width: width * 0.725
                            }
                        }}
                    >
                        <RBSheetReplyToCommentHelper listing={liveListing} authData={authData} currentlySelected={state.currentlySelected} setStateOutter={setState} refSheetCommentReply={refSheetCommentReply} />
                    </RBSheet>
                    <RBSheet
                        ref={sendPrivateMessageRef}
                        closeOnDragDown={false}
                        closeOnPressMask={true}
                        dragFromTopOnly={true}
                        height={height}
                        closeDuration={35}
                        openDuration={35}
                        customStyles={{
                            container: {
                                paddingHorizontal: Sizes.fixPadding * 2.0,
                            },
                            draggableIcon: {
                                width: width * 0.725
                            }
                        }}
                    >
                        <RBSheetSendPrivateMessageHelper listing={liveListing} authData={authData} setStateOutter={setState} sendPrivateMessageRef={sendPrivateMessageRef} />
                    </RBSheet>
                    {renderPhotoLargeViewModalHelper(liveListing)}
                    {renderCommentConfirmationDialog(liveListing)}
                    <CollapsingToolbar
                        leftItem={null}
                        rightItem={
                            <View
                                activeOpacity={0.9}
                                onPress={() => updateState({ showSnackBar: true, isInWishList: !isInWishList })}
                                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center", paddingBottom: 7.25 }}
                            >
                                <TouchableOpacity style={styles.centeredRowWrapper} onPress={() => thumbsUpMainPostSubmission(liveListing)}>
                                    <View style={styles.innerRowWrapper}>
                                        <Text style={styles.greenTextTwo}>({liveListing.likes})</Text>
                                    </View>
                                    <Image
                                        source={require('../../../assets/images/icon/thumbs_up.png')}
                                        style={{ width: 57.5, height: 57.5 }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.centeredRowWrapper} onPress={() => thumbsDownMainPostSubmission(liveListing)}>
                                    <Image
                                        source={require('../../../assets/images/icon/thumbs_down.png')}
                                        style={{ width: 57.5, height: 57.5 }}
                                    />
                                    <View style={styles.innerRowWrapper}>
                                        <Text style={styles.redTextTwo}>({liveListing.dislikes})</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        borderBottomRadius={20}
                        toolbarColor={Colors.primaryColor}
                        toolBarMinHeight={40}
                        toolbarMaxHeight={358}
                        src={require('../../../assets/images/e-waste-1.jpg')}>
                        <View style={{ paddingBottom: Sizes.fixPadding * 8.0 }}>
                            {propertyInfo()}
                            {title({ title: 'Description' })}
                            {descriptionTextRender()}
                            {title({ title: 'Property Type' })}
                            {renderBuildingType()}
                            {title({ title: 'Contact Required Or Not' })}
                            {renderContactRequirements()}
                            {title({ title: 'Photos' })}
                            {photos()}
                            {renderSpacerPadding()}
                            {title({ title: 'Location' })}
                            {mapInfo()}
                            {renderSpacerPadding()}
                            {title({ title: 'Enviormental Conditions Selected' })}
                            {enviormentalConditionsMet()}
                            {renderPhysicalSpaceSizeRender()}
                            {title({ title: 'Comment(s)' })}
                            {renderCommentList()}
                        </View>
                    </CollapsingToolbar>
                    {contactOwnerInfo()}
                </Fragment>
            );
        } else {
            return (
                <View style={{ margin: 9.25 }}>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderMedia}
                    >
                        <PlaceholderLine width={80} />
                        <PlaceholderLine width={width * 0.25} />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                </View>
            );
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor, }}>
            {conditionallyRenderMainChunkData()}
        </SafeAreaView>
    );
}
const mapStateToProps = (state) => {
    return {
        authData: state.auth.data
    }
}
export default connect(mapStateToProps, {})(ViewIndividualDropoffListingStorageViewMain);