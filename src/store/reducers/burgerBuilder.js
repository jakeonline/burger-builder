import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: initialState.totalPrice,
        error: initialState.error,
        building: false
    });
}

const addIngredient = (state, action) => {
    // let updatedIngredients = { ...state.ingredients };
    // let oldAmount = updatedIngredients[action.ingredientType];
    // updatedIngredients[action.ingredientType] = ++oldAmount;
    // updatedIngredients[action.ingredientType] = ++updatedIngredients[action.ingredientType];

    let updatedIngredients = updateObject(state.ingredients, {
        [action.ingredientType]: ++state.ingredients[action.ingredientType]
    })

    const updatedTotalPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredientType];

    return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: +updatedTotalPrice.toFixed(2),
        building: true
    });
}

const removeIngredient = (state, action) => {
    // let updatedIngredients = { ...state.ingredients };
    // let oldAmount = updatedIngredients[action.ingredientType];
    // let updatedAmount = --oldAmount
    // updatedIngredients[action.ingredientType] = updatedAmount < 0 ? 0 : updatedAmount;

    // const updatedTotalPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientType];

    // return {
    //     ...state,
    //     ingredients: updatedIngredients,
    //     totalPrice: +updatedTotalPrice.toFixed(2)
    // }
    let updatedIngredients = updateObject(state.ingredients, {
        [action.ingredientType]: --state.ingredients[action.ingredientType]
    })

    const updatedTotalPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredientType];

    return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: +updatedTotalPrice.toFixed(2),
        building: true
    });
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
}

const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
}

export default ingredientReducer;