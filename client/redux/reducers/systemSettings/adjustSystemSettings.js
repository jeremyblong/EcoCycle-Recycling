import { SYSTEM_SETTINGS_STATE } from "../../actions/types.js";

const initialState = {
    data: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SYSTEM_SETTINGS_STATE:
            return {
                ...state,
                systemCurrentState: action.payload
            }
        default:
            return state;
    }
}