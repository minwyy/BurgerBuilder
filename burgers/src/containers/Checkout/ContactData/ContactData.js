import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postcode: ''
        },
        loading: false
    }
    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
        };
        axios.post('/orders.json', order)
        .then (response => {
            this.setState({loading: false})
        })
        .catch(error => {
            this.setState({loading: false})
        });
    }

    render () {
        // console.log(this.props.price);
        return (
            <div className={classes.ContactData}>
                <h4>Please fill your contact</h4>
                <form>
                    <input className={classes.Input} type="Text" name="name" placeholder="Your name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
                    <input className={classes.Input} type="Text" name="street" placeholder="Street"/>
                    <input className={classes.Input} type="Text" name="postal" placeholder="Postal code"/>
                    <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;