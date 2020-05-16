import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            }, 
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password' 
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({id:key, config: this.state.orderForm[key]})
        }
        const form = formElementsArray.map(formElement => (
            <Input key={formElement.id}
            elementType={forElement.config.elementType}
            elementConfig={forElement.config.elementConfig}
            value={forElement.config.value}
            invalid={!forElement.config.valid}
            touched={forElement.config.touched}
            shouldValidation={forElement.config.validation}
            change={(event) => (this.inputChangeHandler(event, forElement.id))} 
            />
        ))
        return (
            <div>
                <form>
                    {form}
                    <Button btnType="Success" />
                </form>
            </div>
        )
    }
}

export default Auth;