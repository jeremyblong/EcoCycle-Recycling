import { UPDATE_FREIGHT_DETAILS } from "../../actions/types.js";

const initialState = {
    data: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FREIGHT_DETAILS:
            return {
                ...state,
                formData: action.payload
            }
        default:
            return state;
    }
}