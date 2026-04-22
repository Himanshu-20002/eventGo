import { combineReducers } from "redux";
import homeReducer from "../modules/home/api/slice";
import cartReducer from "../modules/cart/api/slice";
import accountReducer from "../modules/account/api/slice";
import aiAssistantReducer from "./aiAssistant/slice";

export default combineReducers({
    home: homeReducer,
    cart: cartReducer,
    account: accountReducer,
    aiAssistant: aiAssistantReducer,
})