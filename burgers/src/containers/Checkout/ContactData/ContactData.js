import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import * as actions from '../../../store/actions/index';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
  
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 4
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                value: 'fastest',
                valid: true,
                validation: {}
            },
            paymentMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'returnservices', displayValue: 'Returnservices'},
                    {value: 'new customer', displayValue: 'New customer'}]
                },
                value: 'returnservices',
                valid: true,
                validation: {}
            }
        },
        formIsValid: false
    }

    orderHandler = ( e ) => {
        // e.preventDefault();
  
        const formData = {};
        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value;
        }
        // console.log(formData);

        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            userInfo: formData
        }

        this.props.onOrderBurger(order);
        // axios.post('/orders.json', order)
        // .then (response => {
        //     this.setState({loading: false});
        //     this.props.history.push('/')
        // })
        // .catch(error => {
        //     this.setState({loading: false})
        // });
        // console.log('hahahahhhhhhhhhhhh');
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        // valid check
        
        updatedFormElement.valid = this.checkValidity (updatedFormElement.value, updatedFormElement.validation);
        updatedForm[inputIdentifier]=updatedFormElement;
        // console.log(updatedFormElement);
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedForm, formIsValid: formIsValid});
    }

    checkValidity (value, rules) {
        let isValid = true;
        if (rules.required && isValid) {
            isValid = value.trim() !== '';
        }

        if (rules.minLength && isValid) {
            isValid = value.length >= rules.minLength;
        }
       
        if (rules.maxLength && isValid) {
            isValid = value.length <= rules.maxLength;
            
        }
        return isValid;
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
                        invalid={!forElement.config.valid}
                        touched={forElement.config.touched}
                        shouldValidation={forElement.config.validation}
                        change={(event) => (this.inputChangeHandler(event, forElement.id))} />
                ))}
            </form>
            <Button btnType='Success' clicked={this.orderHandler} disabled={!this.state.formIsValid}>Order</Button>
        </React.Fragment>
        );
        if (this.props.loading) {
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

const mapStateToProps = state => { 
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    };
}


const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));