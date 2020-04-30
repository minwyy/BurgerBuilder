import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../Button/Button';


class OrderSummary extends Component {
    componentWillUpdate() {
        // console.log(this.props.ingredients);
    }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (<li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]} 
            </li>)
        })
            return (
                <Aux>
                    <h3>Your Order</h3>
                    <p>A delicious burger with the following ingredients:</p>
                    <ul>
                        {ingredientSummary}
                    </ul>
                    <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                    <p>Continue to Checkout?</p>
                    <Button clicked={this.props.cancel} btnType='Danger'>Cancel</Button>  
                    <Button clicked={this.props.continue} btnType='Success'>CONTINUE</Button>  
                </Aux>
            )
    }
}

export default OrderSummary;