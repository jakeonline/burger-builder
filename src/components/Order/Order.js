import React from 'react'
import styles from './Order.module.css'

const order = (props) => {

    const ingredients = [];

    for (let ingredient in props.ingredients) {
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        });
    }

    const ingredientOutput = ingredients.map((ing) => {
        return <span
            key={ing.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'

            }}>{ing.name} ({ing.amount})</span>
    });

    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{props.price}</strong></p>
        </div>
    );
};

export default order;