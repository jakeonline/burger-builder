import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        // console.log('[BurgerBuilder.js] componentDidMount');
        this.props.onInitIngredients();

    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });

    }
    // purchaseContinueHandler = () => {
    //     let queryParamString = [];
    //     for (let key in this.props.ingredients) {
    //         queryParamString.push(encodeURIComponent(key) +
    //             '=' +
    //             encodeURIComponent(this.this.ingredients[key]));
    //     }
    //     queryParamString.push('price=' + this.props.totalPrice.toFixed(2))
    //     this.props.history.push('/checkout?' + queryParamString.join('&'));
    // }

    purchaseContinueFromStoreHandler = () => {
        // console.log('[BurgerBuilder.js] purchaseContinueFromStoreHandler');
        // console.log('onPurchaseInit and go to checkout')
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render() {
        // console.log('[BurgerBuilder.js] render');
        // console.log(this.props.ingredients);

        let burger = this.props.error
            ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded</p>
            : <Spinner />;
        let orderSummary = null;

        if (this.props.ingredients) {
            burger = (
                <Auxiliary>
                    {/* <Burger ingredients={this.props.ingredients} /> */}
                    <Burger />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientDeducted={this.props.onIngredientRemoved}
                        // totalPrice={this.props.totalPrice}
                        // purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                // ingredients={this.props.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                // purchaseContinued={this.purchaseContinueHandler}
                purchaseContinued={this.purchaseContinueFromStoreHandler}
            // totalPrice={this.props.totalPrice}
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary >
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingd.ingredients,
        totalPrice: state.ingd.totalPrice,
        error: state.ingd.error,
        isAuthenticated: state.auth.idToken !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setIngredients: (ingredientsParam) => {
            // console.log('setIngredients');
            // console.log(ingredientsParam);
            dispatch(actions.setIngredients(ingredientsParam))
        },
        onInitIngredients: () => {
            // console.log('setIngredients');
            // console.log(ingredientsParam);
            dispatch(actions.initIngredients())
        },
        onIngredientAdded: (ingredientParam) => {
            dispatch(actions.addIngredient(ingredientParam))
        },
        onIngredientRemoved: (ingredientParam) => {
            dispatch(actions.removeIngredient(ingredientParam))
        },
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));