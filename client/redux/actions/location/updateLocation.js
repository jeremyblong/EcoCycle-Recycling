import { LOCATION } from "../types.js";

export const updateLocationData = (item) => {
    return {
        type: LOCATION,
        payload: item
    }
}