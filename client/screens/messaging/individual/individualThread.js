import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { CometChat } from "@cometchat-pro/react-native-chat";
import Video from 'react-native-video';
import styles from './individualThreadStyles.js';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import { GiftedChat, Composer, Bubble } from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';
import moment from 'moment';
import axios from 'axios';
// import LottieView from 'lottie-react-native';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import Dialog from "react-native-dialog";
import RBSheet from "react-native-raw-bottom-sheet";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Button } from "@rneui/themed";

const { width, height } = Dimensions.get("window");

class IndividualThreadMessagingHelper extends Component {
constructor (props) {
    super(props);

    this.state = {
        messages: [],
        isTyping: false,
        message: "",
        isVisible: false,
        mediaMsg: null
    }
}
    renderPicOrVideo = () => {
        const { conversation } = this.props.route.params;

        if (conversation.profilePic.type === "video") {
            return <Video  
                resizeMode="cover"
                repeat
                source={{uri: `${Config.wasabi_url}/${conversation.profilePic.picture}` }} 
                autoplay={true}
                ref={(ref) => {
                    this.player = ref
                }}
                muted={true}
                style={styles.headerProfilePic}
            />;
        } else {
            return <Image source={require("../../../assets/images/blank-profile-pic.png")} style={styles.headerProfilePic} />;
        }
    }
    renderFooter = () => {
        const { isTyping, messages } = this.state;

        if (isTyping === true && typeof messages !== "undefined" && messages.length > 0) {
          return (
            <View style={styles.footerContainer}>
              <View style={styles.rightTyping}>
                <Image source={require("../../../assets/images/icon/typing.png")} style={{ minWidth: 40, minHeight: 40, maxWidth: 40, maxHeight: 40 }} />;
              </View>
            </View>
          );
        } else {
            return null;
        }
    }
    getMimeType = (ext) => {
        console.log("Ext:", ext);

        switch (ext) {
            case "jpg":
                return "image/jpg";
            case "jpeg":
                return "image/jpeg";
            case "png":
                return "image/png";
            default: 
                return "";
        }
    }
    imageCallback = (response) => {
        if (response.didCancel) {
            console.log('User cancelled photo picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else {
            console.log('ImagePicker Response: ', response);
            if (Platform.OS === 'ios' && response.fileName != undefined) {
                const ext = response.fileName.split('.')[1].toLowerCase();
                const type = this.getMimeType(ext);
                const name = response.fileName;

                const file = {
                    name: Platform.OS === "android" ? response.fileName : name,
                    type: Platform.OS === "android" ? response.type : type,
                    uri: Platform.OS === "android" ? response.uri : response.uri.replace("file://", ""),
                }
                console.log('file: ', file);
    
                this.setState({ mediaMsg: file }, () => {
                    this.RBSheet.open();
                })
            } else {
                const type = response.type;
                const name = 'Camera_001.jpeg';

                const file = {
                    name: Platform.OS === "android" ? response.fileName : name,
                    type: Platform.OS === "android" ? response.type : type,
                    uri: Platform.OS === "android" ? response.uri : response.uri.replace("file://", ""),
                }
                console.log('file: ', file);
    
                this.setState({ mediaMsg: file }, () => {
                    this.RBSheet.open();
                })
            }
        }
    }
    pickPicture = () => {
        const options = {
            mediaType: "photo",
            quality: 1
        };
        launchImageLibrary(options, this.imageCallback);
    }
    renderComposer = props => {
        return (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.centered} onPress={() => {
                this.pickPicture();
            }}>
                <Image source={require("../../../assets/images/icon/paperclip.png")} style={{ maxHeight: 27.25, height: 27.25, maxWidth: 27.25, width: 27.25, marginLeft: 11.25, justifyContent: 'center' }} />
            </TouchableOpacity>
            <Composer {...props} />
            <Button onPress={() => {
                this.handleMessageSend(this.state.message);
            }} type="clear" title={"Send!"}></Button>
          </View>
        );
    };
    componentDidMount() {

        const { conversation } = this.props.route.params;

        const listenerID = conversation.conversationWith.uid;

        CometChat.addMessageListener(
            listenerID,
            new CometChat.MessageListener({
                onTextMessageReceived: textMessage => {
                    console.log("Text message received successfully", textMessage);
                    // Handle text message

                    const UID = conversation.conversationWith.uid;
                    const limit = 50;

                    const messagesRequest = new CometChat.MessagesRequestBuilder().setLimit(limit).setUID(UID).build();

                    messagesRequest.fetchPrevious().then(
                        messages => {
                            console.log("Message list fetched:", messages);
                            // Handle the list of messages

                            const messageArray = [];

                            const reversed = (typeof messages !== "undefined" && messages.length > 0) ? messages.reverse() : messages;

                            for (let index = 0; index < reversed.length; index++) {
                                const message = reversed[index];

                                console.log("messssssssssssssssssage :", message);

                                if (message.type === "text") {
                                    if (message.sender.uid !== this.props.unique_id) {

                                        let customName = message.sender.name.replace(" ", "+");
                                        // this is the other user 
                                        messageArray.push({
                                            _id: uuid.v4(),
                                            text: <Text>{message.text}</Text>,
                                            createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                            user: {
                                                _id: message.sender.uid,
                                                name: message.sender.name,
                                                avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                            },
                                        })
                                    } else {
                                        let customName = message.sender.name.replace(" ", "+");
                                        // this is the logged in user
                                        messageArray.push({
                                            _id: uuid.v4(),
                                            text: <Text onPress={() => {
                                                this.setState({
                                                    isVisible: !this.state.isVisible,
                                                    selected: message.id
                                                })
                                            }}>{message.text}</Text>,
                                            createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                            user: {
                                                _id: this.props.unique_id,
                                                name: message.sender.name,
                                                avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                            },
                                        })
                                    }
                                } else if (message.type === "file") {
                                    console.log("message is a file", message);

                                    if (message.sender.uid !== this.props.unique_id) {

                                        let customName = message.sender.name.replace(" ", "+");
                                        // this is the logged in user
                                        messageArray.push({
                                            _id: uuid.v4(),
                                            image: message.data.url,
                                            createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                            user: {
                                            _id: message.sender.uid,
                                            name: message.sender.name,
                                            avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                            },
                                        })
                                    } else {
                                        let customName = message.sender.name.replace(" ", "+");
                                        // this is the logged in user
                                        messageArray.push({
                                            _id: uuid.v4(),
                                            image: message.data.url,
                                            createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                            user: {
                                            _id: this.props.unique_id,
                                            name: message.sender.name,
                                            avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                            },
                                        })
                                    }
                                }
                            }

                            this.setState({
                                messages: messageArray
                            })
                        },
                        error => {
                            console.log("Message fetching failed with error:", error);
                        }
                    );
                },
                onMediaMessageReceived: mediaMessage => {
                    console.log("Media message received successfully", mediaMessage);
                    // Handle media message

                    const UID = conversation.conversationWith.uid;
                    const limit = 50;

                    const messagesRequest = new CometChat.MessagesRequestBuilder().setLimit(limit).setUID(UID).build();

                    messagesRequest.fetchPrevious().then(
                        messages => {
                            console.log("Message list fetched:", messages);
                            // Handle the list of messages

                            const messageArray = [];

                            const reversed = messages.reverse();

                            for (let index = 0; index < reversed.length; index++) {
                                const message = reversed[index];

                                console.log(message);
                                if (message.type === "text") {
                                    if (message.sender.uid !== this.props.unique_id) {

                                        let customName = message.sender.name.replace(" ", "+");
                                        // this is the other user 
                                        messageArray.push({
                                            _id: uuid.v4(),
                                            text: <Text>{message.text}</Text>,
                                            createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                            user: {
                                            _id: message.sender.uid,
                                            name: message.sender.name,
                                            avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                            },
                                        })
                                    } else {
                                        let customName = message.sender.name.replace(" ", "+");
                                        // this is the logged in user
                                        messageArray.push({
                                            _id: uuid.v4(),
                                            text: <Text onPress={() => {
                                                this.setState({
                                                    isVisible: !this.state.isVisible,
                                                    selected: message.id
                                                })
                                            }}>{message.text}</Text>,
                                            createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                            user: {
                                            _id: this.props.unique_id,
                                            name: message.sender.name,
                                            avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                            },
                                        })
                                    }
                                } else if (message.type === "file") {
                                    console.log("message is a file", message);

                                    if (message.sender.uid !== this.props.unique_id) {

                                        let customName = message.sender.name.replace(" ", "+");
                                        // this is the logged in user
                                        messageArray.push({
                                            _id: uuid.v4(),
                                            image: message.data.url,
                                            createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                            user: {
                                            _id: message.sender.uid,
                                            name: message.sender.name,
                                            avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                            },
                                        })
                                    } else {
                                        let customName = message.sender.name.replace(" ", "+");
                                        // this is the logged in user
                                        messageArray.push({
                                            _id: uuid.v4(),
                                            image: message.data.url,
                                            createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                            user: {
                                            _id: this.props.unique_id,
                                            name: message.sender.name,
                                            avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                            },
                                        })
                                    }
                                }
                            }

                            this.setState({
                                messages: messageArray
                            })
                        },
                        error => {
                            console.log("Message fetching failed with error:", error);
                        }
                    );
                },
                onCustomMessageReceived: customMessage => {
                    console.log("Custom message received successfully", customMessage);
                    // Handle custom message
                },
                onMessageDeleted: message => {
                    console.log("Deleted Message", message);

                    const UID = conversation.conversationWith.uid;
                    const limit = 50;

                    const messagesRequest = new CometChat.MessagesRequestBuilder().setLimit(limit).setUID(UID).build();

                    messagesRequest.fetchPrevious().then(
                        messages => {
                            console.log("Message list fetched:", messages);
                            // Handle the list of messages

                            const messageArray = [];

                            const reversed = messages.reverse();

                            for (let index = 0; index < reversed.length; index++) {
                                const message = reversed[index];

                                console.log(message);
                                if (message.type === "text") {
                                    if (message.sender.uid !== this.props.unique_id) {

                                        let customName = message.sender.name.replace(" ", "+");
                                        // this is the other user 
                                        messageArray.push({
                                            _id: uuid.v4(),
                                            text: <Text>{message.text}</Text>,
                                            createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                            user: {
                                            _id: message.sender.uid,
                                            name: message.sender.name,
                                            avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                            },
                                        })
                                    } else {
                                        let customName = message.sender.name.replace(" ", "+");
                                        // this is the logged in user
                                        messageArray.push({
                                            _id: uuid.v4(),
                                            text: <Text onPress={() => {
                                                this.setState({
                                                    isVisible: !this.state.isVisible,
                                                    selected: message.id
                                                })
                                            }}>{message.text}</Text>,
                                            createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                            user: {
                                            _id: this.props.unique_id,
                                            name: message.sender.name,
                                            avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                            },
                                        })
                                    }
                                } else if (message.type === "file") {
                                    console.log("message is a file", message);

                                    if (message.sender.uid !== this.props.unique_id) {

                                        let customName = message.sender.name.replace(" ", "+");
                                        // this is the logged in user
                                        messageArray.push({
                                            _id: uuid.v4(),
                                            image: message.data.url,
                                            createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                            user: {
                                            _id: message.sender.uid,
                                            name: message.sender.name,
                                            avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                            },
                                        })
                                    } else {
                                        let customName = message.sender.name.replace(" ", "+");
                                        // this is the logged in user
                                        messageArray.push({
                                            _id: uuid.v4(),
                                            image: message.data.url,
                                            createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                            user: {
                                            _id: this.props.unique_id,
                                            name: message.sender.name,
                                            avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                            },
                                        })
                                    }
                                }
                            }

                            this.setState({
                                messages: messageArray
                            })
                        },
                        error => {
                            console.log("Message fetching failed with error:", error);
                        }
                    );
                },
                onTypingStarted: typingIndicator => {
                    console.log("Typing started :", typingIndicator);

                    if (typeof this.state.message !== "undefined" && this.state.message.length > 0) {

                        this.setState({
                            isTyping: true
                        })
                    }
                },
                onTypingEnded: typingIndicator => {
                    console.log("Typing ended :", typingIndicator);

                    this.setState({
                        isTyping: false
                    })
                }
            })
        );

        const UID = conversation.conversationWith.uid;
        const limit = 50;

        const messagesRequest = new CometChat.MessagesRequestBuilder()
        .setLimit(limit)
        .setUID(UID)
        .build();

        messagesRequest.fetchPrevious().then(
            messages => {
                console.log("Message list fetched:", messages);
                // Handle the list of messages

                const messageArray = [];

                const reversed = messages.reverse();

                for (let index = 0; index < reversed.length; index++) {
                    const message = reversed[index];

                    console.log("Messageeeeeeee ITERATED...: ", this.props, message);

                    if (message.type === "text") {
                    
                        if (message.sender.uid !== this.props.unique_id) {

                            console.log("Thisssssssssssssssssss ONE!");

                            let customName = message.sender.name.replace(" ", "+");
                            // this is the other user 
                            messageArray.push({
                                _id: uuid.v4(),
                                text: <Text>{message.text}</Text>,
                                createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                user: {
                                _id: message.sender.uid,
                                name: message.sender.name,
                                avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                },
                            })
                        } else {

                            console.log("Thisssssssssssssssssss TWO!");

                            let customName = message.sender.name.replace(" ", "+");
                            // this is the logged in user
                            messageArray.push({
                                _id: uuid.v4(),
                                text: <Text onPress={() => {
                                    this.setState({
                                        isVisible: !this.state.isVisible,
                                        selected: message.id
                                    })
                                }}>{message.text}</Text>,
                                createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                user: {
                                _id: this.props.unique_id,
                                name: message.sender.name,
                                avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                },
                            })
                        }
                    } else if (message.type === "file") {
                        console.log("message is a file", message);

                        if (message.sender.uid !== this.props.unique_id) {

                            let customName = message.sender.name.replace(" ", "+");
                            // this is the logged in user
                            messageArray.push({
                                _id: uuid.v4(),
                                image: message.data.url,
                                createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                user: {
                                _id: message.sender.uid,
                                name: message.sender.name,
                                avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                },
                            })
                        } else {
                            let customName = message.sender.name.replace(" ", "+");
                            // this is the logged in user
                            messageArray.push({
                                _id: uuid.v4(),
                                image: message.data.url,
                                createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                user: {
                                _id: this.props.unique_id,
                                name: message.sender.name,
                                avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                },
                            })
                        }
                    }
                }

                this.setState({
                    messages: messageArray
                })
            },
            error => {
                console.log("Message fetching failed with error:", error);
            }
        );
    }
    handleMessageSend = (message) => {
        const { conversation } = this.props.route.params;

        const receiverID = conversation.conversationWith.uid;
        const messageText = message;
        const receiverType = CometChat.RECEIVER_TYPE.USER;
        const textMessage = new CometChat.TextMessage(
            receiverID,
            messageText,
            receiverType
        );

        CometChat.sendMessage(textMessage).then(
            message => {
                console.log("Message sent successfully:", message);

                const UID = conversation.conversationWith.uid;
                const limit = 50;
        
                const messagesRequest = new CometChat.MessagesRequestBuilder()
                .setLimit(limit)
                .setUID(UID)
                .build();

                messagesRequest.fetchPrevious().then(
                    messages => {
                        console.log("Message list fetched:", messages);
                        // Handle the list of messages
        
                        const messageArray = [];
        
                        const reversed = messages.reverse();
        
                        for (let index = 0; index < reversed.length; index++) {
                            const message = reversed[index];
        
                            console.log(message);
                            
                            if (message.type === "text") {
                                if (message.sender.uid !== this.props.unique_id) {
        
                                    let customName = message.sender.name.replace(" ", "+");
                                    // this is the other user 
                                    messageArray.push({
                                        _id: uuid.v4(),
                                        text: <Text>{message.text}</Text>,
                                        createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                        user: {
                                          _id: message.sender.uid,
                                          name: message.sender.name,
                                          avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                        },
                                    })
                                } else {
                                    let customName = message.sender.name.replace(" ", "+");
                                    // this is the logged in user
                                    messageArray.push({
                                        _id: uuid.v4(),
                                        text: <Text onPress={() => {
                                            this.setState({
                                                isVisible: !this.state.isVisible,
                                                selected: message.id
                                            })
                                        }}>{message.text}</Text>,
                                        createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                        user: {
                                          _id: this.props.unique_id,
                                          name: message.sender.name,
                                          avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                        },
                                    })
                                }
                            } else if (message.type === "file") {
                                console.log("message is a file", message);

                                if (message.sender.uid !== this.props.unique_id) {

                                    let customName = message.sender.name.replace(" ", "+");
                                    // this is the logged in user
                                    messageArray.push({
                                        _id: uuid.v4(),
                                        image: message.data.url,
                                        createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                        user: {
                                        _id: message.sender.uid,
                                        name: message.sender.name,
                                        avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                        },
                                    })
                                } else {
                                    let customName = message.sender.name.replace(" ", "+");
                                    // this is the logged in user
                                    messageArray.push({
                                        _id: uuid.v4(),
                                        image: message.data.url,
                                        createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                        user: {
                                        _id: this.props.unique_id,
                                        name: message.sender.name,
                                        avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                        },
                                    })
                                }
                            }
                        }
        
                        this.setState({
                            messages: messageArray,
                            message: ""
                        })
                    },
                    error => {
                        console.log("Message fetching failed with error:", error);
                    }
                );
            },
            error => {
                console.log("Message sending failed with error:", error);
            }
        );
    }
    typing = (value) => {
        const { conversation } = this.props.route.params;

        console.log("typing:", value);

        this.setState({
            message: value
        })


        let receiverId = conversation.conversationWith.uid;
        let receiverType = CometChat.RECEIVER_TYPE.USER;

        let typingNotification = new CometChat.TypingIndicator(
            receiverId,
            receiverType
        );
        CometChat.startTyping(typingNotification);
    }
    deleteMessage = () => {
        console.log("delete", this.state.selected);

        const { conversation } = this.props.route.params;

        CometChat.deleteMessage(this.state.selected).then(
            message => {
                console.log("Message deleted", message);

                const UID = conversation.conversationWith.uid;
                const limit = 50;

                const messagesRequest = new CometChat.MessagesRequestBuilder().setLimit(limit).setUID(UID).build();

                messagesRequest.fetchPrevious().then(
                    messages => {
                        console.log("Message list fetched:", messages);
                        // Handle the list of messages

                        const messageArray = [];

                        const reversed = messages.reverse();

                        for (let index = 0; index < reversed.length; index++) {
                            const message = reversed[index];

                            console.log(message);

                            if (message.type === "text") {
                                
                                if (message.sender.uid !== this.props.unique_id) {

                                    let customName = message.sender.name.replace(" ", "+");
                                    // this is the other user 
                                    messageArray.push({
                                        _id: uuid.v4(),
                                        text: <Text>{message.text}</Text>,
                                        createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                        user: {
                                            _id: message.sender.uid,
                                            name: message.sender.name,
                                            avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                        },
                                    })
                                } else {
                                    let customName = message.sender.name.replace(" ", "+");
                                    // this is the logged in user
                                    messageArray.push({
                                        _id: uuid.v4(),
                                        text: <Text onPress={() => {
                                            this.setState({
                                                isVisible: !this.state.isVisible,
                                                selected: message.id
                                            })
                                        }}>{message.text}</Text>,
                                        createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                        user: {
                                            _id: this.props.unique_id,
                                            name: message.sender.name,
                                            avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                        },
                                    })
                                }
                            } else if (message.type === "file") {
                                console.log("message is a file", message);

                                if (message.sender.uid !== this.props.unique_id) {

                                    let customName = message.sender.name.replace(" ", "+");
                                    // this is the logged in user
                                    messageArray.push({
                                        _id: uuid.v4(),
                                        image: message.data.url,
                                        createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                        user: {
                                        _id: message.sender.uid,
                                        name: message.sender.name,
                                        avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                        },
                                    })
                                } else {
                                    let customName = message.sender.name.replace(" ", "+");
                                    // this is the logged in user
                                    messageArray.push({
                                        _id: uuid.v4(),
                                        image: message.data.url,
                                        createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                        user: {
                                        _id: this.props.unique_id,
                                        name: message.sender.name,
                                        avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                        },
                                    })
                                }
                            }
                        }

                        this.setState({
                            messages: messageArray
                        })
                    },
                    error => {
                        console.log("Message fetching failed with error:", error);
                    }
                );
            },
            error => {
                console.log("Message delete failed with error:", error);
            }
        );
    }
    sendMediaMessage = () => {
        const { conversation } = this.props.route.params;

        const receiverID = conversation.conversationWith.uid;

        const messageType = CometChat.MESSAGE_TYPE.FILE;
        const receiverType = CometChat.RECEIVER_TYPE.USER;

        const mediaMessage = new CometChat.MediaMessage(
            receiverID,
            this.state.mediaMsg,
            messageType,
            receiverType
        );

        CometChat.sendMediaMessage(mediaMessage).then(
            message => {
                // Message sent successfully.
                console.log("Media message sent successfully", message);

                this.RBSheet.close();

                const UID = conversation.conversationWith.uid;
                const limit = 50;
        
                const messagesRequest = new CometChat.MessagesRequestBuilder()
                .setLimit(limit)
                .setUID(UID)
                .build();

                messagesRequest.fetchPrevious().then(
                    messages => {
                        console.log("Message list fetched:", messages);
                        // Handle the list of messages
        
                        const messageArray = [];
        
                        const reversed = messages.reverse();
        
                        for (let index = 0; index < reversed.length; index++) {
                            const message = reversed[index];
        
                            console.log(message);
                            
                            if (message.type === "text") {
                                if (message.sender.uid !== this.props.unique_id) {
        
                                    let customName = message.sender.name.replace(" ", "+");
                                    // this is the other user 
                                    messageArray.push({
                                        _id: uuid.v4(),
                                        text: <Text>{message.text}</Text>,
                                        createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                        user: {
                                          _id: message.sender.uid,
                                          name: message.sender.name,
                                          avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                        },
                                    })
                                } else {
                                    let customName = message.sender.name.replace(" ", "+");
                                    // this is the logged in user
                                    messageArray.push({
                                        _id: uuid.v4(),
                                        text: <Text onPress={() => {
                                            this.setState({
                                                isVisible: !this.state.isVisible,
                                                selected: message.id
                                            })
                                        }}>{message.text}</Text>,
                                        createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                        user: {
                                          _id: this.props.unique_id,
                                          name: message.sender.name,
                                          avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                        },
                                    })
                                }
                            } else if (message.type === "file") {
                                console.log("message is a file", message);

                                if (message.sender.uid !== this.props.unique_id) {

                                    let customName = message.sender.name.replace(" ", "+");
                                    // this is the logged in user
                                    messageArray.push({
                                        _id: uuid.v4(),
                                        image: message.data.url,
                                        createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                        user: {
                                        _id: message.sender.uid,
                                        name: message.sender.name,
                                        avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                        },
                                    })
                                } else {
                                    let customName = message.sender.name.replace(" ", "+");
                                    // this is the logged in user
                                    messageArray.push({
                                        _id: uuid.v4(),
                                        image: message.data.url,
                                        createdAt: moment(new Date(message.sentAt * 1000)).format(),
                                        user: {
                                        _id: this.props.unique_id,
                                        name: message.sender.name,
                                        avatar: `https://ui-avatars.com/api/?name=${customName}`,
                                        },
                                    })
                                }
                            }
                        }
        
                        this.setState({
                            messages: messageArray,
                            message: ""
                        })
                    },
                    error => {
                        console.log("Message fetching failed with error:", error);
                    }
                );
            },
            error => {
                console.log("Media message sending failed with error", error);
                // Handle exception.
            }
        );
    }
    render() {
        console.log(this.props.route.params.conversation.conversationWith.name);

        console.log("indvidualThread state", this.state);
        return (
            <View style={{ backgroundColor: "#fff", height: "100%", width }}>
                 <View>
                    <Dialog.Container visible={this.state.isVisible}>
                    <Dialog.Title>Delete Message?</Dialog.Title>
                    <Dialog.Description>
                       Are you sure you want to delete this message? You cannot undo this action.
                    </Dialog.Description>
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisible: false
                        })
                    }} label="Cancel" />
                    <Dialog.Button onPress={() => {
                        this.setState({
                            isVisible: false
                        }, () => {
                            this.deleteMessage();
                        })
                    }} label="Delete" />
                    </Dialog.Container>
                </View>
                {/* <Header style={{ backgroundColor: "#303030" }}>
                    <Left style={{ maxWidth: 50 }}>
                        <Button onPress={() => {
                            this.props.navigation.replace("messaging-conversations");
                        }} transparent>
                            <Image source={require("../../../assets/images/icon/go-back-looped.png")} style={styles.smallerIcon} />
                        </Button>
                    </Left>
                    <Left>
                        <Button transparent>
                            {this.renderPicOrVideo()}
                            {Platform.OS === "ios" ? <Title style={Platform.OS === "ios" ? [styles.title, { color: "white" }] : styles.title}>{this.props.route.params.conversation.conversationWith.name}</Title> : null}
                        </Button>
                    </Left>
                    <Body>
        
                    </Body>
                    <Right>
                        <TouchableOpacity
                            style={{
                                borderWidth:1,
                                borderColor:'rgba(0,0,0,0.2)',
                                alignItems:'center',
                                marginRight: 5,
                                justifyContent:'center',
                                width: 35,
                                height: 35,
                                backgroundColor:'#141414',
                                borderRadius:35,
                            }}
                        >
                            <Image source={require("../../../assets/images/icon/phone-boxed.png")} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                borderWidth:1,
                                borderColor:'rgba(0,0,0,0.2)',
                                alignItems:'center',
                                marginRight: 5,
                                justifyContent:'center',
                                width: 35,
                                height: 35,
                                backgroundColor:'#141414',
                                borderRadius:35,
                            }}
                        >
                            <Image source={require("../../../assets/images/icon/video-on.png")} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                borderWidth:1,
                                borderColor:'rgba(0,0,0,0.2)',
                                alignItems:'center',
                                justifyContent:'center',
                                width: 35,
                                height: 35,
                                backgroundColor:'#141414',
                                borderRadius:35,
                                }}
                            >
                            <Image source={require("../../../assets/images/icon/info.png")} style={{ maxWidth: 25, maxHeight: 25 }} />
                        </TouchableOpacity>
                    </Right>
                </Header> */}
                <AwesomeButtonBlue borderColor={"#cccccc"} borderWidth={2} type={"anchor"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} textColor={"black"} shadowColor={"grey"} onPress={() => {
                    
                }} stretch={true}>Contract W/This User</AwesomeButtonBlue>
                <GiftedChat 
                    onInputTextChanged={(value) => {
                        this.typing(value);
                    }}
                    renderComposer={this.renderComposer}
                    infiniteScroll
                    messages={this.state.messages}
                    onSend={messages => {
                        console.log("messages", messages);

                        this.handleMessageSend(messages[0]);
                    }}
                    user={{
                        _id: this.props.unique_id,
                    }}
                    renderFooter={this.renderFooter}
                    text={this.state.message}
                />
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    closeOnDragDown={true}
                    height={height * 0.40}
                    openDuration={250}
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
                    <View style={styles.centered}>
                        {this.state.mediaMsg !== null ? <Image source={{ uri: this.state.mediaMsg.uri }} style={styles.previewImage} /> : null}
                    </View>
                    <View style={styles.bottomButton}>
                    <AwesomeButtonBlue borderColor={"#cccccc"} borderWidth={2} type={"anchor"} backgroundColor={"#ffffff"} backgroundPlaceholder={"black"} textColor={"black"} shadowColor={"grey"} onPress={this.sendMediaMessage} stretch={true}>Submit & Send Message</AwesomeButtonBlue>
                    </View>
                </RBSheet>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        unique_id: state.auth.data.uniqueId
    }
}
export default connect(mapStateToProps, { })(IndividualThreadMessagingHelper);