import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import CheckoutSummary from "./CheckoutSummary/CheckoutSummary";
import ContactData from "../ContactData/ContactData";
import { connect } from 'react-redux';

class Checkout extends Component {

    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // componentWillMount() {
        // console.log('[Checkout.js] componentWillMount');
    // }

    paramsToObject(entries) {
        const result = {}
        for (const [key, value] of entries) { // each 'entry' is a [key, value] tupple
            if (key !== 'price') {
                result[key] = +value;
            }
        }
        return result;
    }

    // constructor(props) {
        // super(props);
        // console.log('[Checkout.js] constructor')
        // const urlParams = new URLSearchParams(this.props.location.search);
        // const qpToObj = this.paramsToObject(urlParams.entries());
        // this.state = {
        //     ingredients: qpToObj,
        //     price: urlParams.get('price')
        // };
    // }

    // componentWillMount() {
    //     console.log('[Checkout.js] getSnapshotBeforeUpdate')
    // }

    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     console.log('[Checkout.js] getSnapshotBeforeUpdate')
    //     const urlParams = new URLSearchParams(this.props.location.search);
    //     const qpToObj = this.paramsToObject(urlParams.entries());
    //     this.state = {
    //         ingredients: qpToObj,
    //         price: urlParams.get('price')
    //     };
    //     return true;
    // }

    // componentDidUpdate() {
    //     console.log('[Checkout.js] componentDidUpdate')
    // }


    checkoutContinueHandler = () => {
        // console.log(this.props);
        this.props.history.replace(this.props.match.url + '/contact-data');
    }

    render() {
        // console.log('[Checkout.js] render');
        // console.log(`[Checkout.js] purchased: ${this.props.purchased}`)

        let summary = <Redirect to="/" />

        let purchaseComplete = null;
        if (this.props.purchased) {
            purchaseComplete = <Redirect to="/" />
        }
        if (this.props.ingredients) {
            summary = <div>
                {purchaseComplete}
                <CheckoutSummary
                    checkoutContinue={this.checkoutContinueHandler}
                />
                <Route
                    path={this.props.match.url + '/contact-data'}
                    // component={ContactData}
                    render={() => {
                        return <ContactData
                            {...this.props}
                        />
                    }}
                />

            </div>
        }

        return summary;

    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingd.ingredients,
        purchased: state.ordr.purchased
    }
}

export default connect(mapStateToProps)(Checkout);