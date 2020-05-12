import * as actionTypes from '../actions/actionTypes';


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
            return {
                ...state, ingredients: {
                    ...state.ingredients, [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }, totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENTS :
            return {
                ...state, ingredients: {
                    ...state.ingredients, [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                }, totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
        }
        case actionTypes.SET_INGREDIENTS: 
        return {
            ...state, 
            ingredients: {
                salad: action.ingredients.salad,
                meat: action.ingredients.meat,
                bacon: action.ingredients.bacon,
                cheese: action.ingredients.cheese,
            },
            error: false
        }
        case actionTypes.FETCHING_INGREDIENTS_FAILED:
        return {
            ...state,
            error: true
        }
        default:
            return state;

    }
}

export default reducer;
