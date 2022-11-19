import React, { Component, Fragment, createRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, StyleSheet, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'; // WAS NATIVE-BASE
import styles from './mainMessagingViewStyles.js';
import SearchBar from 'react-native-search-bar';
import axios from "axios";
import moment from "moment";
import { CometChat } from "@cometchat-pro/react-native-chat";
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import RBSheet from "react-native-raw-bottom-sheet";
import Autocomplete from "react-native-autocomplete-input";
import RNPickerSelect from 'react-native-picker-select';
import uuid from "react-native-uuid";
import { connect } from "react-redux";
import Toast from 'react-native-toast-message';
import DialogInput from 'react-native-dialog-input';
import { showMessage } from "react-native-flash-message";
import _ from "lodash";
import { TabView, TabBar } from 'react-native-tab-view';
import { Colors } from "../../constants/styles.js";
import { BASE_ASSET_URL, BASE_URL } from "@env";

const { height, width } = Dimensions.get("window");

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
});
  

class MessagingHomeChannelsHelper extends Component {
constructor (props) {
    super(props);

    this.state = {
        data: [],
        selected: [],
        friends: [],
        convos: [],
        hide: true,
        index: 0,
        password: "",
        groupName: "",
        conversationSelected: null,
        groupConversations: [],
        isDialogVisible: false,
        privacy: null,
        routes: [
            { key: 'first', title: 'Private' },
            { key: 'second', title: 'Groups' },
        ]
    }
    this.RBSheet = createRef(null);
    this.searchBarRef = createRef(null);
}
    handleCancellation = () => {
        console.log("cancelled.")
    }
    handleSearch = () => {
        console.log("handleSearch clicked.");
    }
    componentDidMount() {
        const conversationsRequest = new CometChat.ConversationsRequestBuilder().setLimit(50).setConversationType("user").build();

        conversationsRequest.fetchNext().then(
            conversationList => {
                console.log("Conversations list received:", conversationList);

                if (typeof conversationList !== "undefined" && conversationList.length === 0) {
                    this.setState({
                        index: 0
                    })
                } else {
                    axios.post(`${BASE_URL}/gather/profile/pictures`, {
                        conversationList
                    }).then((res) => {
                        if (res.data.message === "Success!") {
                            console.log(res.data);
    
                            const { convos } = res.data;
    
                            this.setState({
                                convos,
                                index: 0
                            })
                        } else {
                            console.log("Err", res.data);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            },
            error => {
                console.log("Conversations list fetching failed with error:", error);
            }
        );

        // axios.get("https://randomuser.me/api/?results=30").then((res) => {
        //     if (res.data) {
        //         console.log(res.data);

        //         const { results } = res.data;

        //         this.setState({
        //             data: results
        //         })
        //     } else {
        //         console.log(res.data);
        //     }
        // }).catch((err) => {
        //     console.log(err);
        // });
    }
    fetchGroupConversations = () => {
        const groupsRequest = new CometChat.GroupsRequestBuilder().setLimit(35).joinedOnly(true).build();

        groupsRequest.fetchNext().then(
            conversationList => {
                console.log("Group conversations list received:", conversationList);

                if (typeof conversationList !== "undefined" && conversationList.length === 0) {
                    this.setState({
                        groupConversations: []
                    });
                } else {
                    axios.post(`${BASE_URL}/gather/profile/pictures/group`, {
                        conversationList
                    }).then((res) => {
                        if (res.data.message === "Success!") {
                            console.log(res.data);
    
                            const { convos } = res.data;
    
                            this.setState({
                                groupConversations: convos
                            })
                        } else {
                            console.log("Err", res.data);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            },
            error => {
                console.log("Group conversations list fetching failed with error:", error);
            }
        );
    }
    fetchIndividualConversations = () => {
        const conversationsRequest = new CometChat.ConversationsRequestBuilder().setLimit(50).setConversationType("user").build();

        conversationsRequest.fetchNext().then(
            conversationList => {
                console.log("Conversations list received:", conversationList);

                axios.post(`${BASE_URL}/gather/profile/pictures`, {
                    conversationList
                }).then((res) => {
                    if (res.data.message === "Success!") {
                        console.log(res.data);

                        const { convos } = res.data;

                        this.setState({
                            convos
                        })
                    } else {
                        console.log("Err", res.data);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            },
            error => {
                console.log("Conversations list fetching failed with error:", error);
            }
        );
    }
    calculateType = (type) => {
        switch (type) {
            case "password":
                return "Password Required";
                break;
            case "public":
                return "Anyone/Open";
                break;
            case "private":
                return "Invite ONLY";
            default:
                break;
        }
    }
    // renderNormalItem = ({ item, index }) => {
    //     if (index % 3 === 0) {
    //         return (
    //             <TouchableOpacity key={index} style={styles.centered} onPress={() => {

    //             }}>
    //                 <View style={[styles.circleTwo, { borderColor: "blue", borderWidth: 4 }]}>
    //                     <Image source={{ uri: item.picture.large }} style={{ maxWidth: "100%", maxHeight: "100%", minWidth: "100%", minHeight: "100%", borderRadius: 40, marginTop: 0 }} />    
    //                 </View>
    //                 <Text style={styles.name}>{item.name.first}</Text>
    //             </TouchableOpacity>
    //         );
    //     } else {
    //         return (
    //             <TouchableOpacity key={index} style={styles.centered} onPress={() => {

    //             }}>
    //                 <View style={styles.circleTwo}>
    //                     <Image source={{ uri: item.picture.large }} style={{ maxWidth: "100%", maxHeight: "100%", minWidth: "100%", minHeight: "100%", borderRadius: 40, marginTop: 0 }} />    
    //                 </View>
    //                 <Text style={styles.name}>{item.name.first}</Text>
    //             </TouchableOpacity>
    //         );
    //     }
    // }
    renderItemConvos = ({ item, index }) => {
        const conversation = item;

        console.log("conversation", conversation.conversationWith);

        if (index % 3 === 0) {
            return (
                <TouchableOpacity key={index} style={[styles.centered, { flexDirection: "row" }]} onPress={() => {
                    this.props.navigation.push("IndividualMessageThreadView", { conversation })
                }}>
                    <View style={styles.columnLeft}>
                        <View style={styles.centered}>
                            <View style={[styles.circleTwo, { borderColor: "blue", borderWidth: 4 }]}>
                                <Image source={{ uri: conversation.conversationWith.avatar }} style={{ maxWidth: "100%", maxHeight: "100%", minWidth: "100%", minHeight: "100%", borderRadius: 40, marginTop: 0 }} />    
                            </View>
                        
                        </View>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={styles.topTextSmall}>{conversation.conversationWith.name}</Text>
                        <Text style={styles.topTextSmaller}>{conversation.lastMessage.text && conversation.lastMessage.text.length > 0 ? conversation.lastMessage.text.slice(0, 30) : ""}... <Text style={styles.formatTextRightAgo}>{moment(new Date(conversation.lastMessage.sentAt * 1000)).fromNow()}</Text></Text>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity key={index} style={[styles.centered, { flexDirection: "row" }]} onPress={() => {
                    this.props.navigation.push("IndividualMessageThreadView", { conversation })
                }}>
                    <View style={styles.columnLeft}>
                        <View style={styles.centered}>
                            <View style={styles.circleTwo}>
                                <Image source={{ uri: conversation.conversationWith.avatar }} style={{ maxWidth: "100%", maxHeight: "100%", minWidth: "100%", minHeight: "100%", borderRadius: 40, marginTop: 0 }} />    
                            </View>
                        
                        </View>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={styles.topTextSmall}>{conversation.conversationWith.name}</Text>
                        <Text style={styles.topTextSmaller}>{conversation.lastMessage.text && conversation.lastMessage.text.length > 0 ? conversation.lastMessage.text.slice(0, 30) : ""}... <Text style={styles.formatTextRightAgo}>{moment(new Date(conversation.lastMessage.sentAt * 1000)).fromNow()}</Text></Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }
    renderListHeaderTopBar = () => {
        return (
            <Fragment>
                <TouchableOpacity style={[styles.centered, { marginTop: 10 }]} onPress={() => {

                }}>
                    <View style={styles.circle}>
                        <Image source={require("../../assets/images/icon/plus.png")} style={{ maxWidth: 30, maxHeight: 30 }} />    
                    </View>
                    <View style={{ marginTop: 0 }} />
                    <Text style={[styles.name, { marginTop: 10 }]}>Your Story</Text>
                </TouchableOpacity>
            </Fragment>
        );
    }
    renderItemGroupConversations = ({ item, index }) => {
        const conversation = item;

        if (index % 3 === 0) {
            return (
                <TouchableOpacity key={index} style={[styles.centered, { flexDirection: "row" }]} onPress={() => {
                    if (conversation.type !== "password") {
                        this.props.navigation.push("GroupConversationThreadView", { conversation })
                    } else {
                        this.setState({
                            conversationSelected: conversation,
                            isDialogVisible: true
                        })
                    }
                }}>
                    <View style={styles.columnLeft}>
                        <View style={styles.centered}>
                            <View style={[styles.circleTwo, { borderColor: "blue", borderWidth: 4 }]}>
                                <Image source={{ uri: `${BASE_ASSET_URL}/${conversation.profilePic.link}` }} style={{ maxWidth: "100%", maxHeight: "100%", minWidth: "100%", minHeight: "100%", borderRadius: 40, marginTop: 0 }} />    
                            </View>
                        
                        </View>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={styles.topTextSmall}>{conversation.name}</Text>
                        <View style={{ flexDirection: "row", width: width * 0.80 }}>
                            <Text style={styles.topTextSmaller}>Members Joined: {conversation.membersCount}</Text>
                            <Text style={styles.textRightSmall}>{this.calculateType(conversation.type)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity key={index} style={[styles.centered, { flexDirection: "row" }]} onPress={() => {
                    if (conversation.type !== "password") {
                        this.props.navigation.push("GroupConversationThreadView", { conversation })
                    } else {
                        this.setState({
                            conversationSelected: conversation,
                            isDialogVisible: true
                        })
                    }
                }}>
                    <View style={styles.columnLeft}>
                        <View style={styles.centered}>
                            <View style={styles.circleTwo}>
                                <Image source={{ uri: `${BASE_ASSET_URL}/${conversation.profilePic.link}` }} style={{ maxWidth: "100%", maxHeight: "100%", minWidth: "100%", minHeight: "100%", borderRadius: 40, marginTop: 0 }} />    
                            </View>
                        
                        </View>
                    </View>
                    <View style={styles.rightColumn}>
                        <Text style={styles.topTextSmall}>{conversation.name}</Text>
                        <View style={{ flexDirection: "row", width: width * 0.80 }}>
                            <Text style={styles.topTextSmaller}>Members Joined: {conversation.membersCount}</Text>
                            <Text style={styles.textRightSmall}>{this.calculateType(conversation.type)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    }
    renderScene = ({ route, jumpTo }) => {
        const { convos, data, groupConversations } = this.state;

        switch (route.key) {
          case 'first':
            return (
                <Fragment>
                    <ScrollView style={styles.container}>
                        <SearchBar
                            ref={ref => this.searchBarRef = ref}
                            placeholder="Search for specific user(s)..."
                            onChangeText={(searchValue) => {
                                this.setState({
                                    searchValue
                                })
                            }}
                            searchBarStyle={"prominent"}
                            textColor={Colors.secondaryColor}
                            textFieldBackgroundColor={"#fff"}
                            onSearchButtonPress={this.handleSearch}
                            onCancelButtonPress={this.handleCancellation}
                        />
                        <View style={{ margin: 5 }}>
                            {/* <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                ListHeaderComponentStyle={styles.convoListStyles}
                                ListHeaderComponent={() => this.renderListHeaderTopBar()}
                                keyExtractor={(item) => `${item.login.uuid}`}
                                data={data}
                                style={styles.horizontalScroll}
                                contentContainerStyle={styles.containerStyle}
                                renderItem={this.renderNormalItem}
                            /> */}
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                ListHeaderComponentStyle={styles.convoListStyles}
                                keyExtractor={(item) => `${item.conversationId}`}
                                data={convos}
                                style={styles.myScroller}
                                contentContainerStyle={styles.containerStyle}
                                renderItem={this.renderItemConvos}
                            />
                        </View>
                    </ScrollView>
                </Fragment>
            );
          case 'second':
            return (
                <Fragment>
                    <ScrollView style={styles.container}>
                        <SearchBar
                            placeholder="Search"
                            onChangeText={(searchValue) => {
                                this.setState({
                                    searchValue
                                })
                            }}
                            searchBarStyle={"prominent"}
                            textColor={Colors.secondaryColor}
                            textFieldBackgroundColor={"#f0f0f0"}
                            onSearchButtonPress={this.handleSearch}
                            onCancelButtonPress={this.handleCancellation}
                        />
                        <View style={{ margin: 5 }}>
                            {/* <AwesomeButtonBlue type={"secondary"} textColor={"black"} onPress={() => {
                                this.RBSheet.open();
                            }} stretch={true}>Create Group Chat</AwesomeButtonBlue> */}
                            {/* <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                ListHeaderComponentStyle={styles.convoListStyles}
                                ListHeaderComponent={() => this.renderListHeaderTopBar()}
                                keyExtractor={(item) => `${item.login.uuid}`}
                                data={data}
                                style={styles.horizontalScroll}
                                contentContainerStyle={styles.containerStyle}
                                renderItem={this.renderNormalItem}
                            /> */}
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                ListHeaderComponentStyle={styles.convoListStyles}
                                keyExtractor={(item) => `${item.conversationId}`}
                                data={groupConversations}
                                style={styles.myScroller} 
                                contentContainerStyle={styles.containerStyle}
                                renderItem={this.renderItemGroupConversations}
                            />
                        </View>
                    </ScrollView>
                </Fragment>
            )
        }
    };
    handleSearch = (query) => {
        console.log("query", query);
    }
    handleGroupStart = () => {
        const { privacy, selected, groupName, password } = this.state;

        const GUID = uuid.v4();
        const groupNameVar = groupName;
        const groupType = (privacy === "public" ? CometChat.GROUP_TYPE.PUBLIC : privacy === "private" ? CometChat.GROUP_TYPE.PRIVATE : privacy === "password" ? CometChat.GROUP_TYPE.PASSWORD : null);
        const pass = (privacy === "password" ? password : "");

        const group = new CometChat.Group(GUID, groupNameVar, groupType, pass);

        CometChat.createGroup(group).then(
            groupppp => {
                console.log("Group created successfully:", groupppp);

                const membersList = [];
                const members = [];

                const promiseee = new Promise((resolve, reject) => {
                    for (let index = 0; index < selected.length; index++) {
                        const element = selected[index];
                        
                        membersList.push(new CometChat.GroupMember(element.unique_id, CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT));
                        members.push(element.unique_id);

                        if ((selected.length - 1) === index) {
                            resolve({
                                membersList, 
                                members
                            });
                        }
                    }
                })

                promiseee.then((passedValues) => {
                    CometChat.addMembersToGroup(GUID, passedValues.membersList, []).then(
                        response => {
                            console.log("response", response);
    
                            axios.post(`${BASE_URL}/initiate/group/chat`, {
                                privacy,
                                selected,
                                group: groupppp,
                                id: this.props.unique_id,
                                others: passedValues.members,
                                fullName: this.props.fullName
                            }).then((res) => {
                                if (res.data.message === "Initiated group!") {
                                    console.log(res.data);
            
                                    const { customGroup } = res.data;
            
                                    this.setState({
                                        groupConversations: [...this.state.groupConversations, customGroup],
                                        privacy: null,
                                        selected: [],
                                        password: "",
                                        groupName: ""
                                    }, () => {
                                        this.RBSheet.close();
                                    })
                                } else {
                                    console.log("err", res.data);
                                }
                            }).catch((err) => {
                                console.log(err);``
                            })
                        },
                        error => {
                          console.log("Something went wrong", error);
                        }
                    );
                })
            },
            error => {
                console.log("Group creation failed with exception:", error);
            }
        );
    }
    render () {
        console.log("conversations state", this.state);

        const { data, convos, query, friends, selected, groupName, privacy } = this.state;

        // const menu = <Side props={this.props} />;
        
        console.log("messaging conversations state", this.state);

        const string = "This is the message that was sent that contains the last message";
        return (
            <Fragment>
                <DialogInput 
                    isDialogVisible={this.state.isDialogVisible}
                    title={"Enter Password to enter..."}
                    message={"Please enter the password to enter - if you do not have this password, message the group leader..."}
                    hintInput ={"Password"}
                    submitInput={ (inputText) => {
                        const GUID = this.state.conversationSelected.guid;
                        const groupType = CometChat.GROUP_TYPE.PASSWORD;

                        CometChat.joinGroup(GUID, groupType, inputText).then(
                        group => {
                            console.log("Group joined successfully:", group);

                            this.setState({
                                isDialogVisible: false
                            }, () => {
                                this.props.navigation.push("GroupConversationThreadView", { conversation: this.state.conversationSelected });
                            })
                        },
                        error => {
                            console.log("Group joining failed with exception:", error);

                            if (error.code === "ERR_ALREADY_JOINED") {
                                this.setState({
                                    isDialogVisible: false
                                }, () => {
                                    this.props.navigation.push("GroupConversationThreadView", { conversation: this.state.conversationSelected });
                                })
                            } else {
                                this.setState({
                                    isDialogVisible: false
                                }, () => {
                                    showMessage({
                                        message: "Password does NOT match our records...",
                                        description: "The entered password doesn't match our records - passwords are 'case' sensitive.",
                                        type: "danger",
                                        duration: 3500
                                    });
                                })
                            }
                        }
                        );
                    }}
                    closeDialog={ () => {
                        this.setState({
                            isDialogVisible: false
                        })
                    }}
                >
                </DialogInput>
                <TabView
                    // navigationState={{ index, routes }}
                    navigationState={this.state}
                    renderScene={this.renderScene}
                    onIndexChange={(index) => this.setState({ index })}
                    swipeEnabled={false}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            indicatorStyle={{ backgroundColor: '#2497F3' }}
                            tabStyle={{
                                width: width * 0.50
                            }}
                            scrollEnabled={true}
                            style={{ backgroundColor: 'white' }}
                            renderLabel={({ route, focused, color }) => {
                                if (route.key === this.state.routes[this.state.index].key) {
                                    return (
                                        <Fragment>
                                            <AwesomeButtonBlue textColor={Colors.primaryColor} backgroundShadow={Colors.secondaryColor} backgroundDarker={"#000"} backgroundColor={Colors.whiteColor} onPress={() => {
                                                // this.setState({ 
                                                //     index: i 
                                                // }, () => {
                                                //     this.fetchIndividualConversations();
                                                // })
                                                this.fetchIndividualConversations();
                                            }} style={styles.tabbedButton} stretch={true}>{route.title}</AwesomeButtonBlue>
                                        </Fragment>
                                    );
                                } else {
                                    return (
                                        <Fragment>
                                           <AwesomeButtonBlue textColor={"#000"} backgroundShadow={Colors.secondaryColor} backgroundDarker={"#000"} backgroundColor={Colors.whiteColor} onPress={() => {
                                                // this.setState({ 
                                                //     index: i 
                                                // }, () => {
                                                //     this.fetchIndividualConversations();
                                                // })
                                                this.fetchIndividualConversations();
                                            }} style={styles.tabbedButton} stretch={true}>{route.title}</AwesomeButtonBlue>
                                        </Fragment>
                                    );
                                }
                            }}
                        />
                    )}
                />
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={height}
                    openDuration={250}
                    customStyles={{
                        container: {
                            
                        }
                    }}
                >   
                    <View style={styles.rbContainer}> 
                        <Text style={styles.headerText}>Please select the "Group Type" visibility settings</Text>
                        <RNPickerSelect
                            value={this.state.privacy}
                            style={pickerSelectStyles}
                            onValueChange={(value) => {
                                this.setState({
                                    privacy: value
                                })
                            }}
                            items={[
                                { label: 'Public', value: 'public' },
                                { label: 'Private', value: 'private' },
                                { label: 'Password Enabled', value: 'password' },
                            ]}
                        />                               
                        <Text style={styles.headerText}>Search for a name(s) - first and last</Text>
                        <Autocomplete
                            data={friends}
                            value={query}
                            hideResults={this.state.hide}
                            placeholder={"Search for your friends name's (first + last)"}
                            placeholderTextColor={"grey"}
                            listContainerStyle={{height: friends.length * 70}}
                            onChangeText={(text) => this.setState({ 
                                query: text,
                                hide: false
                            }, () => {
                                this.handleSearch(this.state.query);
                            })}
                            flatListProps={{
                                keyExtractor: (_, idx) => idx,
                                renderItem: ({ item }) => {
                                    return (
                                        <Fragment key={idx}>
                                            <ListItem button={true} onPress={() => {
                                                if (typeof selected !== "undefined" && selected.length > 0) {
                                                    if (selected.filter(e => e.username === item.username).length > 0) {
                                                        console.log("Includes...");

                                                        Toast.show({
                                                            type: 'error',
                                                            text1: 'Already included in selected list!',
                                                            text2: 'This user is already selected - select a user that you have NOT selected yet...',
                                                            visibilityTime: 4000,
                                                            position: "bottom"
                                                        });
                                                    } else {
                                                        console.log("Doesn't include...");

                                                        this.setState({
                                                            selected: [...this.state.selected, item],
                                                            hide: true,
                                                            query: ""
                                                        })
                                                    }
                                                } else {
                                                    this.setState({
                                                        selected: [...this.state.selected, item],
                                                        hide: true,
                                                        query: ""
                                                    })
                                                }
                                            }} style={{ zIndex: 999999 }}>
                                                <ListItem.Content>
                                                    <ListItem.Title style={{ fontSize: 20 }}>{item.firstName + " " + item.lastName}</ListItem.Title>
                                                    <ListItem.Subtitle>{item.username}</ListItem.Subtitle>
                                                </ListItem.Content>
                                                <Avatar style={styles.avatarComment} source={require("../../assets/images/icon/right-arrow-custom.png")} />
                                            </ListItem>
                                        </Fragment>
                                    );
                                },
                            }}
                        />
                    <ScrollView vertical={true} showsVerticalScrollIndicator={false} style={styles.scrollerCustom}>
                        {typeof selected !== "undefined" && selected.length > 0 ? selected.map((item, index) => {
                            return (
                                <Fragment>
                                    <ListItem button={true} onPress={() => {
                                        this.setState({
                                            selected: this.state.selected.filter((each, i) => {
                                                if (each.unique_id !== item.unique_id) {
                                                    return item;
                                                }
                                            }),
                                            query: ""
                                        })
                                    }} style={{ zIndex: 999999 }}>
                                        <ListItem.Content>
                                            <ListItem.Title style={{ fontSize: 20 }}>{item.firstName + " " + item.lastName}</ListItem.Title>
                                            <ListItem.Subtitle>{item.username}</ListItem.Subtitle>
                                        </ListItem.Content>
                                        <Avatar style={styles.avatarComment} source={require("../../assets/images/icon/close.png")} />
                                    </ListItem>
                                </Fragment>
                            );
                        }) : null}
                    </ScrollView>
                    </View>
                    {(typeof selected !== "undefined" && selected.length > 0) && (typeof groupName !== "undefined" && groupName.length > 0) && (privacy !== null) ? <AwesomeButtonBlue type={"secondary"} textColor={"black"} onPress={() => {
                        this.handleGroupStart();
                    }} stretch={true}>Start Group Chat</AwesomeButtonBlue> : null}
                </RBSheet>
            </Fragment>
        );
    }
};
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.data.uniqueId,
        fullName: `${state.auth.data.firstName} ${state.auth.data.lastName}`,
        profilePic: typeof state.auth.data.profilePictures !== "undefined" && state.auth.data.profilePictures.length > 0 ? state.auth.data.profilePictures[state.auth.data.profilePictures - 1] : null
    }
}
export default connect(mapStateToProps, {})(MessagingHomeChannelsHelper);