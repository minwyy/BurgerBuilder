import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';



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
        },
        isSignup: true
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
        if (rules.isEmail && isValid) {
            const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            isValid = pattern.test(value)
        }
        return isValid;
    }

    inputChangeHandler (event, controlName) {
        const updatedControls = {
            ...this.state.controls, 
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls})
    }

    submitHandler = (event) => {
        // event.preventDefault();
        // console.log(this.state.controls.email.value);
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
            this.setState(prevState => {
                return {isSignup: !prevState.isSignup}})
    }
    

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({id:key, config: this.state.controls[key]})
        }
        let form = formElementsArray.map(forElement => (
            <Input key={forElement.id}
            elementType={forElement.config.elementType}
            elementConfig={forElement.config.elementConfig}
            value={forElement.config.value}
            invalid={!forElement.config.valid}
            touched={forElement.config.touched}
            shouldValidation={forElement.config.validation}
            change={(event) => (this.inputChangeHandler(event, forElement.id))} 
            />
        ))
        if(this.props.loading) {
            form = <Spinner />;
        }

        let errorMSG = null;
        if (this.props.error) {
            errorMSG = (
                <p>{this.props.error.message}</p>
            )
        }

        return (
            <div className={classes.Auth}>
                {errorMSG}
                <form>
                    {form}
                </form>
                <Button btnType="Success" clicked={this.submitHandler} >Submit</Button>
                <Button btnType="Danger"
                    clicked={this.switchAuthModeHandler}
                >Switch to {this.state.isSignup ? 'signin' : 'signup'} </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);