import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux'
import BuildControls from '../../components/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
    salad: 1,
    bacon: 2,
    cheese: 2,
    meat: 3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalprice: 4

    }
    
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalprice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ingredients: updatedIngredients, totalprice: newPrice});
    }
    
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount<=0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalprice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ingredients: updatedIngredients, totalprice: newPrice})
        
        
    };

    render () {
        const disabledInfo = {...this.state.ingredients};
        for (let ingre in disabledInfo) {
            disabledInfo[ingre] = disabledInfo[ingre] <= 0;
        }
        
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls add={this.addIngredientHandler} remove={this.removeIngredientHandler}
                disabled={disabledInfo}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;