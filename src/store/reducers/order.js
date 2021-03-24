import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const getOrdersStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const getOrdersSuccess = (state, action) => {
    return updateObject(state, { loading: false, orders: action.orders })
}

const getOrdersFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false })
}

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    })
}

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDERS_START: return getOrdersStart(state, action);
        case actionTypes.GET_ORDERS_SUCCESS: return getOrdersSuccess(state, action);
        case actionTypes.GET_ORDERS_FAIL: return getOrdersFail(state, action);
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        default: return state;
    }
}

export default orderReducer;