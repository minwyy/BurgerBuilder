import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux'
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/UI/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';



class BurgerBuilder extends Component {
    state = {
        // totalprice: 6,
        // purchasable: false,
        purchasing: false,
        // loading: false,
        // error: false
    }

    componentDidMount () {
         console.log(this.props);
         this.props.onInitIngredients();
    }
    
    updatePurchase (newIngre) {
        const sums = Object.keys(newIngre)
        .map(igKey => {
            return newIngre[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)
        return sums > 0;
    }


    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENTS_PRICE[type];
    //     const oldPrice = this.state.totalprice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ingredients: updatedIngredients, totalprice: newPrice});
    //     this.updatePurchase(updatedIngredients);
    // }
    
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount<=0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENTS_PRICE[type];
    //     const oldPrice = this.state.totalprice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({ingredients: updatedIngredients, totalprice: newPrice})
    //     this.updatePurchase(updatedIngredients);
    // };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    modalCloseHandler = () => {
        this.setState({purchasing: false});
    }

    continueHandler = () => { this.props.history.push('/checkout') }
        // alert("You will be not hungry soon!")
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price=' + this.state.totalprice)
        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
    

    render () {
        const disabledInfo = {...this.props.ings};
        for (let ingre in disabledInfo) {
            disabledInfo[ingre] = disabledInfo[ingre] <= 0;
        }
        let orderSummary = null;   
        let burger = this.props.error ? <p>Ingreidents can't be loaded!</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                    price={this.props.totalPrice} 
                    add={this.props.onIngredientsAdded} 
                    remove={this.props.onIngredientsRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchase(this.props.ings)}
                    ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.ings} 
            cancel={this.modalCloseHandler}
            continue={this.continueHandler}
            price={this.props.totalPrice} />;
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.modalCloseHandler}>
                   {orderSummary}
                </Modal>
                    {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => { 
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdded: (Name) => dispatch(actions.addIngredient(Name)),
        onIngredientsRemoved: (Name) => dispatch(actions.removeIngredient(Name)),
        onInitIngredients: () => dispatch(actions.initIngredient())
    };
}



export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));