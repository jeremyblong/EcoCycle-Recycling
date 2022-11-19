import { SAVE_CART_ITEM_TO_CART, CART_LOGIC_MODIFICATION_DATA } from "../types.js";

export const saveItemToEWasteCart = (item) => {
    return {
        type: SAVE_CART_ITEM_TO_CART,
        payload: item
    }
}
export const saveDropOffCartData = (item) => {
    return {
        type: CART_LOGIC_MODIFICATION_DATA,
        payload: item
    }
}