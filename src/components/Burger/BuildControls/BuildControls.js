import React from 'react'
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'
import { connect } from 'react-redux'


const buildControls = (props) => {
    const controls = [
        { label: 'Meat', type: 'meat' },
        { label: 'Cheese', type: 'cheese' },
        { label: 'Salad', type: 'salad' },
        { label: 'Bacon', type: 'bacon' }
    ];

    const isPurchaseable = () => {
        // const ingredients = { ...updatedIngredients };
        // console.log(ingredients);
        const sum = Object.keys(props.ingredients)
            .map((ingredient) => {
                return props.ingredients[ingredient];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        // console.log(`sum: ${sum}`);

        // this.setState({ purchaseable: sum > 0 });
        return sum > 0;
    }

    const disabledInfo = { ...props.ingredients };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
        <div className={styles.BuildControls}>
            <p>Current price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {
                controls.map(control =>
                    <BuildControl
                        label={control.label}
                        key={control.label}
                        added={() => props.ingredientAdded(control.type)}
                        deducted={() => props.ingredientDeducted(control.type)}
                        disabled={disabledInfo[control.type]}
                    />
                )
            }
            <button
                disabled={!isPurchaseable()}
                className={styles.OrderButton}
                onClick={props.ordered}>
                {
                    props.isAuthenticated
                        ? 'ORDER NOW'
                        : 'SIGN UP TO ORDER NOW'
                }
            </button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        ingredients: state.ingd.ingredients,
        totalPrice: state.ingd.totalPrice
    }
}

export default connect(mapStateToProps)(buildControls);