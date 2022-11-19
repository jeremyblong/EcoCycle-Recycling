import { combineReducers } from "redux";
import auth from "./authentication/auth.js";
import location from "./location/updateLocation.js";
import systemSettings from "./systemSettings/adjustSystemSettings.js";
import cartData from "./ewasteCart/cartLogic.js";
import storage from "./storageDropoffRelated/storageRelatedUpdates.js";
import formDataNewFreightRequest from "./requestFreightPickup/index.js";

export default combineReducers({
    auth,
    location,
    systemSettings,
    cartData,
    storage,
    freightPickupData: formDataNewFreightRequest
})