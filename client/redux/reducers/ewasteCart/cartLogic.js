import { SAVE_CART_ITEM_TO_CART, CART_LOGIC_MODIFICATION_DATA } from "../../actions/types.js";


export default (state = {}, action) => {
    switch (action.type) {
        case SAVE_CART_ITEM_TO_CART:
            return {
                ...state,
                cartData: action.payload
            }
        case CART_LOGIC_MODIFICATION_DATA:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [Object.keys(action.payload)[0]]: Object.values(action.payload)[0]
                }
            }
        default:
            return state;
    }
}