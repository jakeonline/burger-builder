import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurger = (order, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());

        const queryParams = '?auth=' + token;

        axios.post('/orders.json' + queryParams, order)
            .then(response => {
                // console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name, order));
                // this.setState({ loading: false });
                // this.props.history.push('/');
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
                // this.setState({ loading: false });
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const getOrdersStart = () => {
    return {
        type: actionTypes.GET_ORDERS_START,
    }
}

export const getOrders = (token, userId) => {
    return dispatch => {
        // console.log('[order.js action] getOrders')
        dispatch(getOrdersStart());

        const queryParams = '?auth=' + token
            + '&orderBy="userId"'
            + '&equalTo="' + userId + '"';

        axios.get('/orders.json' + queryParams)
            .then((response => {
                // console.log(response)
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }

                dispatch(getOrdersSuccess(fetchedOrders));

            }))
            .catch(error => {
                dispatch(getOrdersFail(error));
            })
    }
}

export const getOrdersSuccess = (orders) => {

    return {
        type: actionTypes.GET_ORDERS_SUCCESS,
        orders: orders
    }
}

export const getOrdersFail = (error) => {
    return {
        type: actionTypes.GET_ORDERS_FAIL,
        error: error
    }
}