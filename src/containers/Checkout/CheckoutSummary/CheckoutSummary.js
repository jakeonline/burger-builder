import React from "react";

import Burger from '../../../components/Burger/Burger'
import Button from '../../../components/UI/Button/Button';
import styles from './CheckoutSummary.module.css'
import { connect } from 'react-redux'

const checkoutSummary = (props) => {
    // console.log(props.ingredients);
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes good!</h1>
            <div>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType="Danger"
            // clicked
            >CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.checkoutContinue}
            >CONTINUE</Button>

        </div>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingd.ingredients
    }
}

export default connect(mapStateToProps)(checkoutSummary);