import React from 'react'
import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import { connect } from 'react-redux'

const burger = (props) => {

    // console.log("the ingredients:")
    // console.log(props.ingredients);
    // console.log(Object.keys(props.ingredients));
    // const meat = Object.keys(props.ingredients)[2];
    // console.log(meat);
    // console.log(props.ingredients[meat]);

    const ingKeyArr = Object.keys(props.ingredients);
    // console.log(ingKeyArr);
    let transformedIngredients = ingKeyArr
        .map((ingType) => {
            const amount = props.ingredients[ingType];
            // console.log(`amount: ${amount}`)
            // console.log(typeof amount);
            const ingArr = Array(amount).fill(ingType);
            // console.log(ingArr);
            return ingArr.map(
                (ingType, index) => {
                    // console.log(myKey);
                    return <BurgerIngredient key={ingType + index} type={ingType} />
                }
            );
        })
        .reduce((burgerIngArr, el) => {
            return burgerIngArr.concat(el);
        });

    // console.log(transformedIngredients);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add ingredients!</p>
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />

        </div>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingd.ingredients
    }
}

export default connect(mapStateToProps)(burger);