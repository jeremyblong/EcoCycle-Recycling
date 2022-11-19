import React, { useEffect } from "react";
import { Platform } from "react-native";
import BottomTabBarScreen from "./component/bottomTabBarScreen";
import TotalBalanceScreen from "./screens/balance/totalBalanceScreen";
import SuccessScreen from "./screens/success/successScreen";
import WithdrawScreen from "./screens/withdraw/withdrawScreen";
import WrongScreen from "./screens/wrong/wrongScreen";
import EditProfileScreen from "./screens/editProfile/editProfileScreen";
import SupportScreen from "./screens/support/supportScreen";
import PrivacyPolicyScreen from "./screens/privacyPolicy/privacyPolicyScreen";
import SigninScreen from "./screens/auth/signinScreen";
import RegisterScreen from "./screens/auth/registerScreen";
import OTPScreen from "./screens/auth/otpScreen";
import SecurePinScreen from "./screens/auth/securePinScreen";
import SplashScreen from "./screens/splashScreen";
import Toast from 'react-native-toast-message';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from "./redux/store/store.js";
import messaging from '@react-native-firebase/messaging';
import FlashMessage from "react-native-flash-message";
import uuid from "react-native-uuid";
import { showMessage } from "react-native-flash-message";
import { CometChat } from '@cometchat-pro/react-native-chat';
import { COMET_CHAT_APP_ID } from "@env";
import Orientation from 'react-native-orientation-locker';
/// main imports... ///  main imports... ///  main imports... /// 
import NotificationScreen from './screens/Notifications/NotificationScreen';
import SearchScreen from "./screens/Search/SearchScreen";
// import ViewAllScreen from './screens/ViewAll/ViewAllScreen';
// import TimeSlotScreen from './screens/TimeSlots/TimeSlotsScreen';
import MainDisplayViewPaymentRelated from './screens/paymentRelated/index.js';
import ReviewScreen from './screens/Review/ReviewScreen';
// import MessageScreen from './screens/Message/MessageScreen';
import AboutUsScreen from './screens/AboutUs/AboutUsScreen';
import ModifyDataProfileHelper from "./screens/editProfile/modifyData.js";
import BackgroundLocationTrackingHelper from "./backgroundLocationTracking.js";
import IndividualIncidentReportView from "./screens/nearbyAlerts/individualView/viewIndividualIncidentView.js";
import DemoScreenPlaceholderWithImageBottom from "./screens/incidentReportManage/manageReportsIncidents/manage.js";
import ViewMainFeedAllConnectedComponents from "./screens/ViewLiveCurrentStream/ViewMainVideoFeedManage.js";
import ViewIndividualLiveFeedStreamManuver from "./screens/ViewLiveCurrentStream/individual/ViewIndividualLiveFeedLive.js";
import MainDisplayInvitationComponent from "./screens/inviteFriendsPoolResources/main/viewMainInviteDisplay.js";
import MainPricingIdentificationInitiationPage from "./screens/priceWasteLocateDropoff/pricingProcess/main/mainPricingInitiationPage.js";
import IndividualPageInformationSelectionPage from "./screens/priceWasteLocateDropoff/pricingProcess/individual/individualItemSelectionPage.js";
import OrganizeAndSetupDropoffTimeViaMap from "./screens/priceWasteLocateDropoff/pricingProcess/selectAndOrganizeDropoffMap/organizeAndSetupDropoffTime.js";
import ViewManageCartOfEWasteDisposalItemsPending from "./screens/priceWasteLocateDropoff/pricingProcess/cartManagement/mainCartView/viewCart.js";
import InitiateDropOffRequest from "./screens/priceWasteLocateDropoff/initiateDropoffRequest/initiateRequest.js";
import ViewingAllActiveContractDropOffList from "./screens/generalManagement/dropoffContracts/viewList/viewActiveContractList.js";
import ListNewPropertyFreeSpaceProcess from "./screens/rentingExtraSpace/listNewSpaceRent/startListingNewSpaceProcess.js";
import ViewIndividualDropoffListingStorageViewMain from "./screens/viewingIndividualDropoffData/viewDropoffListingIndividual/viewIndividualDropoffView.js";
import SecurityLogsListRenderHelper from "./screens/securityLogs/securityLogDetailList.js";
import ViewMapAvailableDeliveriesContracts from "./screens/truckingDeliveryRelated/mapView/viewMapAvailableDeliveries.js";
import PostNewDeliveryAvailableJob from "./screens/truckingDeliveryRelated/postNewAvailableJob/postNewDeliveryAvailable.js";
import UploadImagesRelevantHelperImagesNewDeliveryPost from "./screens/truckingDeliveryRelated/postNewAvailableJob/uploadingRelevantImages/uploadImagesViaForm.js";
import ViewIndividualFreightAvailableListing from "./screens/truckingDeliveryRelated/individualView/viewIndividualListing.js";
import MessagingHomeChannelsHelper from "./screens/messaging/mainMessagingView.js";
import IndividualThreadMessagingHelper from "./screens/messaging/individual/individualThread.js";
import IndividualGroupConversationHelper from "./screens/messaging/group/individualGroup.js";
import WaitingToHaveDeliveryAcceptedHelper from "./screens/dropoffDeliveries/waitToBeFulfilled/waitingForOrderConfirmation.js";
import MainProfileScreenHelper from "./screens/Profile/individualProfileView/individualUserProfile.js";
import DistributorAccountOverview from "./screens/distributorAccount/distributorAccountOverviewMain.js";
import ManageDistributorActiveLoads from "./screens/distributorAccount/activeLoads/viewManageActiveLoads.js";
import RenderEarningsPaymentsOverviewDistributor from "./screens/distributorAccount/earningOverview/viewEarningsOverviewReview.js";
import NewFreightPickupRequestingMainView from "./screens/distributorAccount/organizeNewFreightPickupList/createNewListingAccount.js";
import BoostAccountDropoffDepotProfile from "./screens/distributorAccount/boostProfile/boostMyProfile.js";       
import WithdrawlPaymentFunding from "./screens/paymentRelated/withdrawl/withdrawlFunds.js";   
import ViewAvailableBalances from "./screens/paymentRelated/available/viewAvailableBalance.js";        
import DepositPaymentHelper from "./screens/paymentRelated/deposit/depositPayment.js";  
import AddNewPaymentMethodMain from "./screens/paymentRelated/addNewPaymentMethod/newPaymentAdd.js";

const Stack = createStackNavigator();

const RenderPages = (props) => {

  console.log("propppppppppppppppppppps", props);

  const renderHeaderOptions = (title) => {
    return {
      title: title,
      headerStyle: {
        backgroundColor: '#000',
        borderTopColor: 'black',
        borderTopWidth: 1.5
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: "#fff"
      },
    }
  }

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus, enabled);
    }
  }
   
  useEffect(() => {
    
    Orientation.lockToPortrait();

    requestUserPermission();
    // SplashScreen.hide();

    const appID = COMET_CHAT_APP_ID;
    const region = 'us';

    const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();

    CometChat.init(appID, appSetting).then(
      () => {
        console.log('Initialization completed successfully');
        // You can now call login function.
      },
      (error) => {
        console.log('Initialization failed with error:', error);
        // Check the reason for error and take appropriate action.
      },
    );

    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

      if (Platform.OS === "android") {
        
        const { imageUrl } = remoteMessage.notification.android;
        const { body, title } = remoteMessage.notification;
        const { sentTime, data, from, messageId } = remoteMessage;

        showMessage({
          message: title,
          description: body,
          type: "info",
          titleStyle: { fontWeight: "bold", textDecorationLine: "underline" },
          duration: 3250
        });
      } else {

      }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);

      const generated = uuid.v4();

      showMessage({
          message: "You have a NEW push notification/message!",
          description: "Please check your notification(s) page/view to see the updated notification or message, this could require immediate action so please check it.",
          type: "success",
          duration: 3250
      });

    //   PushNotification.createChannel(
    //     {
    //       channelId: generated, // (required)
    //       channelName: generated, // (required)
    //       soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    //       importance: 4, // (optional) default: 4. Int value of the Android notification importance
    //       vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    //     }, (created) => {
    //       console.log(`createChannel returned '${created}'`);

    //       PushNotification.localNotification({
    //         /* Android Only Properties */
    //         channelId: generated, // (required) channelId, if the channel doesn't exist, notification will not trigger.
    //         bigText: remoteMessage.notification.title, // (optional) default: "message" prop
    //         subText: remoteMessage.notification.body
    //       });
    //     }
    //   );
    });
    /* Success */
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage);

      // props.navigation.navigate(remoteMessage.data.dl);
      // props.checkToNavigatePushNotification({
      //   redirect: true,
      //   route: remoteMessage.data.dl
      // })
    });

    /* Success */
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage);
      }
    });
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={renderHeaderOptions("Splash/Loading...")} name="Splash" component={SplashScreen} /> 
          <Stack.Screen options={renderHeaderOptions("Sign-In")} name="SignIn" component={SigninScreen} />
          <Stack.Screen options={renderHeaderOptions("Registration")} name="Register" component={RegisterScreen} />
          <Stack.Screen options={renderHeaderOptions("One-Time Password")} name="OTP" component={OTPScreen} />
          <Stack.Screen options={renderHeaderOptions("Secure-Pin Entry")} name="SecurePin" component={SecurePinScreen} />
          <Stack.Screen options={renderHeaderOptions("Homepage/Home")} name="BottomTabScreen" component={BottomTabBarScreen} />
          <Stack.Screen options={renderHeaderOptions("Success Confirmation")} name="Success" component={SuccessScreen} />
          <Stack.Screen options={renderHeaderOptions("Wrong Screen/Page")} name="Wrong" component={WrongScreen} />
          <Stack.Screen options={renderHeaderOptions("Balance")} name="Balance" component={TotalBalanceScreen} />
          <Stack.Screen options={renderHeaderOptions("Withdraw")} name="Withdraw" component={WithdrawScreen} />
          <Stack.Screen options={renderHeaderOptions("Edit/Editing Profile")} name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen options={renderHeaderOptions("Support/Help")} name="Support" component={SupportScreen} />
          <Stack.Screen options={renderHeaderOptions("Privacy Policy")} name="PrivacyPolicy" component={PrivacyPolicyScreen} />
          <Stack.Screen options={renderHeaderOptions("Search(ing)")} name="Search" component={SearchScreen} />
          <Stack.Screen options={renderHeaderOptions("Boost Your Account/Profile")} name="BoostProfileDropoffAccount" component={BoostAccountDropoffDepotProfile} />
          {/* <Stack.Screen options={renderHeaderOptions("Time Slot(s)")} name="TimeSlots" component={TimeSlotScreen} /> */}
          {/* <Stack.Screen options={renderHeaderOptions("Payment Method(s)")} name="PaymentMethod" component={PaymentMethodScreen} /> */}
          <Stack.Screen options={renderHeaderOptions("Review(s)")} name="Review" component={ReviewScreen} />
          {/* <Stack.Screen options={renderHeaderOptions("Message/Messaging")} name="Message" component={MessageScreen} /> */}
          <Stack.Screen options={renderHeaderOptions("About Us")} name="AboutUs" component={AboutUsScreen} />
          <Stack.Screen options={renderHeaderOptions("Modifying Profile Data")} name="ProfileModifyData" component={ModifyDataProfileHelper} />
          <Stack.Screen options={renderHeaderOptions("Individual Incident Report")} name="IndividualIncidentReportView" component={IndividualIncidentReportView} />
          {/* <Stack.Screen options={renderHeaderOptions("Demo/Placeholder Page")} name="ManageIncidentsAndMore" component={DemoScreenPlaceholderWithImageBottom} /> */}
          <Stack.Screen options={renderHeaderOptions("View All Connected Logic")} name="ViewMainFeedAllConnectedComponents" component={ViewMainFeedAllConnectedComponents} />
          <Stack.Screen options={renderHeaderOptions("Individual Live-Stream View")} name="IndividualLiveStreamView" component={ViewIndividualLiveFeedStreamManuver} />
          <Stack.Screen options={renderHeaderOptions("Inviting Others (Pooling Resources)")} name="MainDisplayInvitePoolingResources" component={MainDisplayInvitationComponent} /> 
          <Stack.Screen options={renderHeaderOptions("Pricing E-Waste Resource(s)")} name="PriceEWasteLocateDropoff" component={MainPricingIdentificationInitiationPage} />
          <Stack.Screen options={renderHeaderOptions("Selecting/Delivering E-Waste Product's")} name="IndividualItemInformationSelection" component={IndividualPageInformationSelectionPage} />
          <Stack.Screen options={renderHeaderOptions("Drop-Off Information Dialog")} name="DropOffInformationDialogMap" component={OrganizeAndSetupDropoffTimeViaMap} />
          <Stack.Screen options={renderHeaderOptions("Viewing Pending Cart-Item's")} name="CartItemsDisplayEWasteDropOffPreview" component={ViewManageCartOfEWasteDisposalItemsPending} />
          <Stack.Screen options={renderHeaderOptions("Initiate Drop-Off Request(s)")} name="InitiateDropOffRequestSendNotification" component={InitiateDropOffRequest} />
          <Stack.Screen options={renderHeaderOptions("Viewing Notification's")} name="ViewNotificationScreen" component={NotificationScreen} /> 
          <Stack.Screen options={renderHeaderOptions("Active Drop-Off Contract's")} name="ActiveDropOffContractListView" component={ViewingAllActiveContractDropOffList} />
          <Stack.Screen options={renderHeaderOptions("List Available Storage Space")} name="ListNewStorageSpaceForRentDropoff" component={ListNewPropertyFreeSpaceProcess} />
          <Stack.Screen options={renderHeaderOptions("Individual Drop-Off Listing View")} name="IndividualDropOffListingViewOnly" component={ViewIndividualDropoffListingStorageViewMain} />
          <Stack.Screen options={renderHeaderOptions("Authentication Security Log(s)")} name="ViewSecurityAuthenticationLogs" component={SecurityLogsListRenderHelper} />
          <Stack.Screen options={renderHeaderOptions("View Available Deliveries (Map-View)")} name="AvailableFreightTruckingDeliveries" component={ViewMapAvailableDeliveriesContracts} />
          <Stack.Screen options={renderHeaderOptions("Post New Available Delivery")} name="PostNewAvailableDeliveryContractForm" component={PostNewDeliveryAvailableJob} />
          <Stack.Screen options={renderHeaderOptions("Add Photo's To Your Post/Listing")} name="AddPhotosNewAvailableDeliveriesForm" component={UploadImagesRelevantHelperImagesNewDeliveryPost} />
          <Stack.Screen options={renderHeaderOptions("Individual Freight Availability Listing")} name="IndividualFreightAvailableListingView" component={ViewIndividualFreightAvailableListing} />
          <Stack.Screen options={renderHeaderOptions("Private/Group Messaging")} name="PrivateMessagingMainView" component={MessagingHomeChannelsHelper} />
          <Stack.Screen options={renderHeaderOptions("Group-Messaging View")} name="GroupConversationThreadView" component={IndividualGroupConversationHelper} />
          <Stack.Screen options={renderHeaderOptions("Private-Messaging View")} name="IndividualMessageThreadView" component={IndividualThreadMessagingHelper} />
          <Stack.Screen options={renderHeaderOptions("Waiting For Order-Fulfillment")} name="DrivingSelectingPendingView" component={WaitingToHaveDeliveryAcceptedHelper} />
          <Stack.Screen options={renderHeaderOptions("Personal Profile View")} name="MainProfileViewScreen" component={MainProfileScreenHelper} />
          <Stack.Screen options={renderHeaderOptions("Distributor Account Overview")} name="DistributorAccountManagementCreation" component={DistributorAccountOverview} />
          <Stack.Screen options={renderHeaderOptions("Distributor Earning's Review")} name="PreviousPaymentChartDataView" component={RenderEarningsPaymentsOverviewDistributor} />
          <Stack.Screen options={renderHeaderOptions("Manage Active Load's")} name="ManageDistributorActiveLoads" component={ManageDistributorActiveLoads} />
          <Stack.Screen options={renderHeaderOptions("Organize/Order New Freight Pick-Up")} name="RequestANewFreightPickupDepot" component={NewFreightPickupRequestingMainView} />
          <Stack.Screen options={renderHeaderOptions("Payment(s) Main Overview")} name="ManagePaymentMethodsOverview" component={MainDisplayViewPaymentRelated} />
          <Stack.Screen options={renderHeaderOptions("Withdrawl Funds/Funding")} name="WithdrawlFundingPaymentRelated" component={WithdrawlPaymentFunding} />
          <Stack.Screen options={renderHeaderOptions("View Available Balance(s)")} name="ViewAvailableBalances" component={ViewAvailableBalances} />
          <Stack.Screen options={renderHeaderOptions("Deposit Funds/Funding To Account")} name="DepositFundingIntoAccount" component={DepositPaymentHelper} />
          <Stack.Screen options={renderHeaderOptions("Add New Payment Method")} name="AddNewPaymentMethod" component={AddNewPaymentMethodMain} />
        </Stack.Navigator>
        <Toast />
        <FlashMessage position="top" />
        <BackgroundLocationTrackingHelper props={props} />
      </NavigationContainer>
    </Provider>
  );
}
export default RenderPages;

// peer chaincode invoke "${TARGET_TLS_OPTIONS[@]}" -C mychannel -n token_erc20 -c '{"function":"Initialize","Args":["ElectraCycle", "ELCT", "2"]}'

// peer chaincode install -n token_erc20 -v 1.0 -p github.com/hyperledger/fabric/examples/chaincode/go/chaincode_example02


// ./network.sh deployCC -ccn token_erc20 -ccp ../token-erc-20/chaincode-go -ccl go
// custom_20_chaincode

// peer chaincode invoke "${TARGET_TLS_OPTIONS[@]}" -C mychannel -n token_erc20 -c '{"function":"Mint","Args":["100000"]}'
// peer chaincode invoke "${TARGET_TLS_OPTIONS[@]}" -C mychannel -n token_erc20 -c '{"function":"Initialize","Args":["ElectraCoin", "ELC", "2"]}'


// ./network.sh deployCC -ccn token_erc20 -ccp ../token-erc-20/chaincode-javascript -ccl javascript

// fabric-ca-client enroll -u https://minter:Jer246355abc123@localhost:7054 --caname ca-org1 -M "${PWD}/organizations/peerOrganizations/org1.example.com/users/minter@org1.example.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/org1/tls-cert.pem"

// fabric-ca-client register --caname ca-org1 --id.name minter --id.secret Jer246355abc123 --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/org1/tls-cert.pem"


// configtxgen -profile TwoOrgsApplicationGenesis -outputCreateChannelTx ./channel-artifacts/channel1.tx -channelID mainchannel
