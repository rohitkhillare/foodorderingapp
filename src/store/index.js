import { combineReducers } from "redux";
import FoodItemReducers from "./FoodItemReducers";

export default combineReducers(
    {
        foodlistreducer:FoodItemReducers
    }
);