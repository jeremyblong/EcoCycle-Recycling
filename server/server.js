const express = require("express");
const app = express();
const config = require("config");
const bodyParser = require('body-parser');
const cors = require("cors");
const xss = require('xss-clean');
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require("express-rate-limit");
const aws = require('aws-sdk');
// const passport = require("passport");
const { Connection } = require("./mongoUtil.js");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");
const http = require("http");
const server = http.createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: '*'
	}
});
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const cron = require('node-cron');
const axios = require("axios");

// setup port logic
const PORT = process.env.PORT || 5000;

aws.config.update({
    secretAccessKey: config.get("awsSecretKey"),
    accessKeyId: config.get("awsAccessKey"),
    region: config.get("awsRegion")
});

app.use(session({
	secret: "123abcthatllama707",
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 2 * 60 * 1000
	}
}));

app.use(bodyParser.json({
	limit: "750mb"
}));
app.use(bodyParser.urlencoded({
	limit: "750mb",
	extended: false
}));

const corsOptions = {
	origin: true,
	credentials: true,
  	optionSuccessStatus: 200
};

app.use(flash());
// passport stuff
require("./stategies/passport/jwtStrategy.js");
require("./stategies/passport/authentication.js");
require("./schemas/auth/newUser.js");

app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.authenticate())

app.use(session({ 
	cookie: { 
		maxAge: 60000 
	}, 
	secret: 'woot',
	resave: false, 
	saveUninitialized: false
}));
  
app.use(cors(corsOptions));

// app.use(passport.initialize());

const limiter = rateLimit({
    max: 100,// max requests
    windowMs: 60 * 60 * 1000 * 1000, // remove the last 1000 for production
    message: 'Too many requests' // message to send
}); 

app.use(xss());
app.use(helmet());
app.use(mongoSanitize());
app.use(limiter);


app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	next();
});

cron.schedule('*/1 * * * *', () => { // */10 * * * *  |----------------------| every 10 minutes (production code).
	console.log('running a task every minute every 10 secs...');

	const configuration = {};

	axios.put(`${config.get("baseURL")}/remove/old/expired/available/electronic/dropoffs`, configuration).then((res) => {
		if (res.data) {
			const { message } = res.data;

			if (message === "Successfully updated/removed the appropriate result(s)!") {
				console.log("Successfully removed the desired item(s)...!");
			}
		}
	}).catch((res) => {
		console.log("Errrrrrrrrrrrrr cron-job data...:", res.data);
	})
});  

app.post('/twilio-webhook', (req, res) => {

	console.log("ran/running...........!", req.body);

	const twiml = new MessagingResponse();
  
	// twiml.message('The Robots are coming! Head for the hills!');
  
	res.writeHead(200, {'Content-Type': 'text/xml'});

	console.log(twiml.toString());
	
	res.end(twiml.toString());
});

// routes go here...
app.use("/gather/dropoffs/contracts/pending", require("./routes/electronicDropoff/activeDrops/gatherDrops/index.js"));
app.use("/register/new/user", require("./routes/authentication/signup/signup.js"));
app.use("/upload/misc/file/wo/saving", require("./routes/universal/imageUploads/base64upload.js"));
app.use("/submit/authentication/code", require("./routes/authentication/twilio/verifyCode.js"));
app.use("/post/newly/generated/pin", require("./routes/authentication/pin/updateWithPin.js"));
app.use("/gather/general/information/user", require("./routes/universal/gatherUserCoreInfo/gatherSpecificUserInfo.js"));
app.use("/login", require("./routes/authentication/login/authenticate.js"));
app.use("/upload/misc/file/wo/save/profile/picture", require("./routes/profile/profileData/managePictures/uploadPhotoAndSave.js"));
app.use("/upload/audio/file/profile/about", require("./routes/profile/profileData/uploadAudioTrack/uploadAudio.js"));
app.use("/send/invite/pooling/resources/phone", require("./routes/poolingResources/inviteNewUser/inviteNewUserSplitPercentage.js"));
app.use("/send/invite/pooling/resources/email", require("./routes/poolingResources/inviteNewUser/inviteNewUserSplitPercentageEmail.js"));
app.use("/send/notification/request/electronic/dropoff/:id/:otherUserID", require("./routes/electronicDropoff/QRcodeLogic/recognizeQRRead.js"));
app.use("/gather/nearby/dropoff/locations/points", require("./routes/electronicDropoff/map/locationDropoffPoints/locateNearbyDropoffPoints.js"));
app.use("/update/partially/randomize/user/public/location", require("./routes/universal/location/updateLocation.js"));
app.use("/send/invite/notification/drop/off/organization", require("./routes/electronicDropoff/sendNotification/sendNewNotificationDropOffInvite.js"));
app.use("/gather/notifications", require("./routes/notifications/fetchNotifications.js"));
app.use("/fetch/device/type/via/query", require("./routes/electronicDropoff/fetchDeviceDetails/fetchDeviceByCategorySearch.js"));
app.use("/fetch/device/type/individual", require("./routes/electronicDropoff/fetchDeviceDetails/fetchIndividualProduct.js"));
app.use("/add/contract/to/active/contracts/dropoff", require("./routes/notifications/respondToNotification/acceptNewContractDropoff/acceptRequest.js"));
app.use("/post/new/available/space/dropoffs/ewaste", require("./routes/listNewSpaceDropoff/listANewSpaceToDropoff.js"));
app.use("/gather/dropoff/locations/points", require("./routes/nearbyDropoffs/gatherDropoffPoints/gatherNearbyDropoffPoints.js"));
app.use("/gather/only/profile/picture/with/id", require("./routes/universal/gatherUserCoreInfo/gatherProfilePictureFileById.js"));
app.use("/post/new/comment/dropoff/listing", require("./routes/nearbyDropoffs/commentDropoffRelated/postNewCommentDropoffListing.js"));
app.use("/post/new/subcomment/comment/dropoff/listing", require("./routes/nearbyDropoffs/commentDropoffRelated/postSubCommentDropoffListing.js"));
app.use("/like/or/remove/heart/main/comment/dropoff/listing", require("./routes/nearbyDropoffs/commentDropoffRelated/likeHeartRelated/addRemoveLike/addRemoveHeartLikeRespond.js"));
app.use("/like/or/remove/nested/subcomment/dropoff/listing", require("./routes/nearbyDropoffs/commentDropoffRelated/likeHeartRelated/addRemoveLikeNestedComment/addRemoveHearLikeResponseNested.js"));
app.use("/respond/thumbs/up/dropoff/listing/main", require("./routes/nearbyDropoffs/likeDislikeMainListingDropoff/like/likeMainListingDropoff.js"));
app.use("/respond/thumbs/down/dropoff/listing/main", require("./routes/nearbyDropoffs/likeDislikeMainListingDropoff/dislike/dislikeMainListingDropoff.js"));
app.use("/upload/available/delivery/transport/freight/listing", require("./routes/freightListings/postNewFreightListing/postNewFreightListingAvailable.js"));
app.use("/gather/dropoff/locations/points/transport/freight", require("./routes/freightListings/mapRelated/fetchNearbyListings.js"));
app.use("/post/new/subcomment/comment/dropoff/listing/available/freight/listing", require("./routes/freightListings/individualFreightListing/comments/postNewSubCommentOnListing.js"));
app.use("/post/new/comment/dropoff/listing/available/freight/listing", require("./routes/freightListings/individualFreightListing/comments/postNewMainCommentListing.js"));
app.use("/like/or/remove/heart/main/comment/dropoff/listing/available/freight/listing", require("./routes/freightListings/individualFreightListing/comments/heartsLikesDislikes/addOrRemoveLikeMain.js"));
app.use("/like/or/remove/nested/subcomment/dropoff/listing/available/freight/listing", require("./routes/freightListings/individualFreightListing/comments/heartsLikesDislikes/addOrRemoveLikeMain.js"));
app.use("/respond/thumbs/up/dropoff/listing/main/available/freight/listing", require("./routes/freightListings/individualFreightListing/heartsLikesDislikesMainListingOnly/likes/addOrRemoveLikeConditionally.js"));
app.use("/respond/thumbs/down/dropoff/listing/main/available/freight/listing", require("./routes/freightListings/individualFreightListing/heartsLikesDislikesMainListingOnly/dislikes/addOrRemoveDislikeConditionally.js"));
app.use("/adjust/birthdate/once/profile/data", require("./routes/profile/profileData/birthdateData/saveNewUpdatedBirthdate.js"));
app.use("/start/conversation/save", require("./routes/messaging/startConversation/startConvo.js"));
app.use("/delete/group/conversation", require("./routes/messaging/group/delete/deleteConversation.js"));
app.use("/leave/conversation/only/individual", require("./routes/messaging/group/leave/leaveGroup.js"));
app.use("/add/additional/users/group/chat", require("./routes/messaging/group/add/addAdditionalMembers.js"));
app.use("/ban/user/conversation", require("./routes/messaging/group/ban/banUserGroupChat.js"));
// app.use("/gather/profile/pictures", require("./routes/messaging/activeConversations/gatherProfilePictures.js"));
app.use("/save/firebase/token", require("./routes/firebase/saveFireBaseTokenData.js"));
app.use("/gather/profile/pictures", require("./routes/messaging/gatherPicturesMessageConversations.js"));
app.use("/gather/profile/pictures/group", require("./routes/messaging/group/gather/gatherActiveGroupConvos.js"));
app.use("/initiate/group/chat", require("./routes/messaging/group/initiate/startGroupConvo.js"));
app.use("/gather/friends/by/name", require("./routes/friends/findFriendsByName.js"));
app.use("/post/new/request/available/collection/item", require("./routes/dropoffRequests/addToPendingQueue/addToQueue.js"));
app.use("/fetch/available/electronics/pending/selection/delivery", require("./routes/dropoffRequests/pendingRequests/fetchNearbyGeoListings.js"));
app.use("/remove/old/expired/available/electronic/dropoffs", require("./routes/cronjobs/availablePendingDropoffs/checkExpiredPendingDropoff.js"));
app.use("/gather/specific/number/users/standard/only", require("./routes/universal/gatherMultipleUsersLength/gatherUsers.js"));
app.use("/gather/main/users/promoted/accounts/only", require("./routes/universal/promotedUserRelated/gatherPromotedUserAccounts.js"));
app.use("/upload/misc/file/wo/save/cover/photo", require("./routes/profile/profileData/managePictures/coverPhoto/uploadCoverPhotoProfile.js"));
app.use("/initiate/new/label/creation", require("./routes/deliveries/initiateNewDelivery/newDelivery.js"));
app.use("/send/email/shipping/label/link", require("./routes/emailRelated/shippingRelated/sendLabelShippingEmail.js"));
app.use("/boost/profile/dropoff/account/type", require("./routes/distributorRelated/boostAccountProfile/boostProfile.js"));
app.use("/gather/relevant/listing/qrcode/lookup", require("./routes/QRCodeRelated/fetchDetails/index.js"));
app.use("/save/recycling/dropoff/facility", require("./routes/recyclingPartners/saveNewListing/index.js"));
app.use("/gather/recycling/companies/nearby", require("./routes/recyclingPartners/fetchListings/fetch.js"));
app.use("/initiate/shipment/recycling/facility/and/more", require("./routes/recyclingPartners/shipAndProcess/index.js"));
app.use("/calculate/weight/via/ai", require("./routes/AIrelated/calculateWeightByStrings.js"));
app.use("/handle/initiation/dropoff/generate", require("./routes/QRCodeRelated/dropoff/processDropoffGeneration.js"));
app.use("/gather/qrcode/data/provide/code/dropoff", require("./routes/QRCodeRelated/dropoff/readCode.js"));
app.use("/gather/general/information/dropoff", require("./routes/nearbyDropoffs/gatherIndividualDropoff/gather.js"));
app.use("/initiate/stripe/ifnot/active", require("./routes/stripePayment/initiateAccountIfNotApplicable/initiate.js"));
app.use("/onboarding/flow/stripe/links", require("./routes/stripePayment/onboarding/onboard.js"));
app.use("/save/card/details", require("./routes/stripePayment/addPaymentMethod/add.js"));
app.use("/attach/deposit/funds/into/account", require("./routes/stripePayment/depositFunds/deposit.js"));
app.use("/gather/account/available/balance", require("./routes/stripePayment/availableBal/gather.js"));
app.use("/cashout/balance/stripe", require("./routes/stripePayment/cashout/index.js"));
app.use("/accept/responsibilty/delivery/transfer", require("./routes/recyclingPartners/acceptShipment/acceptAfterScanning.js"));

io.on("connection", socket => {

	let address = socket.handshake.address;
	
	console.log("New client connection established && NEW CLIENT connected...: ", address);

	socket.on("new-available-electronic-delivery", (listing) => {
		setTimeout(() => {
			console.log("new-available-electronic-delivery RECIEVED!...", listing);
			
			io.sockets.emit("new-available-electronic-delivery", listing);
		}, 5000);
	});

	socket.on("disconnect", () => console.log("Client disconnected"));
});

Connection.open();

server.on("listening", (socket) => {
	console.log("server listening, running...");
})

server.listen(PORT, () => {
	console.log(`app listening on port ${PORT}!`);
});