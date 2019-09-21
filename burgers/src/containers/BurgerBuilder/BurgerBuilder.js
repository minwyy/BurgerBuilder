import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux'
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/UI/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


const INGREDIENTS_PRICE = {
    salad: 1.3,
    bacon: 2.5,
    cheese: 2.8,
    meat: 3.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalprice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }
    
    updatePurchase (newIngre) {
        const sums = Object.keys(newIngre)
        .map(igKey => {
            return newIngre[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)
        this.setState({purchasable: sums > 0});
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
        this.updatePurchase(updatedIngredients);
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
        this.updatePurchase(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    modalCloseHandler = () => {
        this.setState({purchasing: false});
    }

    continueHandler = () => {
        // alert("You will be not hungry soon!")
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalprice,
            customer: {
                name: 'Zhazha J',
                address: {
                    street: 'Wattle st',
                    postcode: '2009',
                    country: 'Australia'
                },
                email: 'zzhaj@uts.edu.au',
            },
            deliveryMethod: 'car',
            paymentMethod: 'returnService'
        }
        axios.post('/orders.json', order)
        .then (response => {
            this.setState({loading: false, purchasing: false})
        })
        .catch(error => {
            this.setState({loading: false, purchasing: false})
        });
    }


    render () {
        const disabledInfo = {...this.state.ingredients};
        for (let ingre in disabledInfo) {
            disabledInfo[ingre] = disabledInfo[ingre] <= 0;
        }
        let orderSummary = <OrderSummary ingredients={this.state.ingredients} 
            cancel={this.modalCloseHandler}
            continue={this.continueHandler}
            price={this.state.totalprice} />;
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.modalCloseHandler}>
                   {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                price={this.state.totalprice}
                add={this.addIngredientHandler} 
                remove={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);