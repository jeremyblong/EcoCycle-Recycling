import { UPDATE_FREIGHT_DETAILS } from "../types.js";

export const updateFreightDetailsState = (item) => {
    return {
        type: UPDATE_FREIGHT_DETAILS,
        payload: item
    }
}