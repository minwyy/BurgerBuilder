import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZhaZha J'
                },
                value: ''
            },
  
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Wattle St'
                },
                value: ''
            },
            postcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '2009'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Australia'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'zzhaj@uts.edu.au'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                value: ''
            },
            paymentMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'returnservices', displayValue: 'Returnservices'},
                    {value: 'new customer', displayValue: 'New customer'}]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = ( e ) => {
        // e.preventDefault();
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
 
        }
        axios.post('/orders.json', order)
        .then (response => {
            this.setState({loading: false});
            this.props.history.push('/')
        })
        .catch(error => {
            this.setState({loading: false})
        });
        // console.log('hahahahhhhhhhhhhhh');
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedForm[inputIdentifier]=updatedFormElement;
        this.setState({orderForm: updatedForm});
    }

    render () {
        // console.log(this.props.price);
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({id:key, config: this.state.orderForm[key]})
        }
        
        let form = (            
        <React.Fragment>
            <form>
                {formElementsArray.map(forElement => (
                    <Input 
                        key={forElement.id}
                        elementType={forElement.config.elementType}
                        elementConfig={forElement.config.elementConfig}
                        value={forElement.config.value}
                        change={(event) => (this.inputChangeHandler(event, forElement.id))} />
                ))}
            </form>
            <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
        </React.Fragment>
        );
        if (this.state.loading) {
            form = <Spinner />;
        } 
        return (
            <div className={classes.ContactData}>
                <h4>Please fill your contact</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;