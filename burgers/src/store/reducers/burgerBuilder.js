import * as actionTypes from '../actions/actionTypes';
import  { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 6,
    error: false
};

const INGREDIENTS_PRICE = {
    salad: 1.3,
    bacon: 2.2,
    cheese: 2.5,
    meat: 3.2
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS :
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            }
           return updateObject(state, updatedState);
            // return {
            //     ...state, ingredients: {
            //         ...state.ingredients, [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            //     }, totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            // }
        case actionTypes.REMOVE_INGREDIENTS :
            const updatedIngredientn = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
            const updatedIngredientsn = updateObject(state.ingredients, updatedIngredientn);
            const updatedStaten = {
                ingredients: updatedIngredientsn,
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            }
           return updateObject(state, updatedStaten);
        case actionTypes.SET_INGREDIENTS: 
           return updateObject(state, {ingredients: {
            salad: action.ingredients.salad,
            meat: action.ingredients.meat,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
        }, 
        totalPrice: 6,
        error: false})
        case actionTypes.FETCHING_INGREDIENTS_FAILED:
           return updateObject(state, {error: true})
        default:
            return state;
    }
}
 
export default reducer;
