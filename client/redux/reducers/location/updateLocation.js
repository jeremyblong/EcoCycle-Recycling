import { LOCATION } from "../../actions/types.js";

const initialState = {
    data: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOCATION:
            return {
                ...state,
                currentLoc: action.payload
            }
        default:
            return state;
    }
}