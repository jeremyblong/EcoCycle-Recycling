import { PREVIOUS_INFORMATION } from "../../actions/types.js";

const initialState = {
    data: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PREVIOUS_INFORMATION:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}