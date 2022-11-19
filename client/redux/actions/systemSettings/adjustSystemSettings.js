import { SYSTEM_SETTINGS_STATE } from "../types.js";

export const updateChangeSystemSettings = (item) => {
    return {
        type: SYSTEM_SETTINGS_STATE,
        payload: item
    }
}