import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const setIngredients = (ingredientsParam) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredientsParam
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}


export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data))
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed())
        })
    }
}

export const addIngredient = (ingredientParam) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: ingredientParam
    }
}

export const removeIngredient = (ingredientParam) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT
        , ingredientType: ingredientParam
    }
}


