import { PREVIOUS_INFORMATION } from "../types.js";

export const saveUpdatePreviousLocationDetailsDropoff = (item) => {
    return {
        type: PREVIOUS_INFORMATION,
        payload: item
    }
}