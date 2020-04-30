import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postcode: ''
        }
    }

    render () {
        return (
            <div className={classes.ContactData}>
                <h4>Please fill your contact</h4>
                <form>
                    <input className={classes.Input} type="Text" name="name" placeholder="Your name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
                    <input className={classes.Input} type="Text" name="street" placeholder="Street"/>
                    <input className={classes.Input} type="Text" name="postal" placeholder="Postal code"/>
                    <Button btnType="Success">Order</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;