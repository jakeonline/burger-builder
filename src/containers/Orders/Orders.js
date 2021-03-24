import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

    // state = {
    //     orders: [],
    //     loading: true
    // }

    componentDidMount() {
        // console.log('[Orders.js] componentDidMount');
        this.props.onLoadOrders(this.props.token, this.props.userId);
    }

    render() {
        // console.log(`loading: ${this.props.loading}`)
        let orders = <Spinner />

        if (!this.props.loading) {
            orders = this.props.orders.map((order) => {
                return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            });
        }

        return (
            <div>
                {orders}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        orders: state.ordr.orders,
        loading: state.ordr.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadOrders: (token, userId) => dispatch(actions.getOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));