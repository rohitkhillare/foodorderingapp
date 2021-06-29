
import fooditemlist from "../components/fooditem/foodList";

const FoodItemReducers = (state = fooditemlist, action: any) => {
    switch (action.type) {
        case 'add':
            return { ...state, fooditemlist: action.payload };

        default:
            return state;
    }
};

export default FoodItemReducers;