import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            ingre: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }
    const ingredientsOutput = ingredients.map(ig => (
        <span 
        key={ig.ingre}
        style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }}
        >{ig.ingre} ({ig.amount})</span>
    ))

    return(
    <div className={classes.Order}>
        {ingredientsOutput}
        <p>Price: <strong>AUD {props.price.toFixed(2)}</strong></p>
    </div>
    )
}

export default order;