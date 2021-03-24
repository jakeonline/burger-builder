import React, { Component } from "react";
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router";
import { updateObject, validate } from "../../shared/utility";

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                    errormessage: 'Email should be valid'
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    errormessage: 'Name length is minimum of 6 characters'

                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        isSignUp: true
    }

    inputChangedHandler = (event, formIdentifier) => {
        const updatedFormElement = updateObject(this.state.controls[formIdentifier], {
            value: event.target.value,
            valid: validate(event.target.value, this.state.controls[formIdentifier].validation),
            touched: true
            
        });
        const updatedLoginForm = updateObject(this.state.controls, {
            [formIdentifier]: updatedFormElement
        });

        let updatedFormIsValid = true;
        for (let key in updatedLoginForm) {
            updatedFormIsValid = updatedFormIsValid && updatedLoginForm[key].valid;
        }

        this.setState({
            controls: updatedLoginForm,
            formIsValid: updatedFormIsValid
        });
    }
    isMinLength(value, minLengthRule) {
        return minLengthRule ? value.trim().length >= minLengthRule : true;
    }

    isMaxLength(value, maxLengthRule) {
        return maxLengthRule ? value.trim().length <= maxLengthRule : true;
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        });
    }

    componentDidMount () {
        // console.log('[Auth.js] componenetDidMount')
        // console.log(`[Auth.js] !this.props.buildingBurger : ${!this.props.buildingBurger}`)
        // console.log(`[Auth.js] this.props.authRedirectPath : ${this.props.authRedirectPath}`)
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            // console.log('[Auth.js] onSetAuthRedirectPath to /')
            this.props.onSetAuthRedirectPath();
        }
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const formElements = formElementsArray.map(
            (formElement) => {
                return (
                    <Input key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        valid={formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        errormessage={formElement.config.validation ? formElement.config.validation.errormessage : null}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                );
            });
        // console.log(formElements);

        let errorPrompt = null;
        // console.log('Displaying error...')
        // console.log(this.props.error)
        if (this.props.error) {
            errorPrompt = <p>{this.props.error.message}</p>
        }

        let authForm = (<form>
            {errorPrompt}
            {formElements}  
            <Button
                btnType="Success"
                clicked={this.submitHandler}
                disabled={!this.state.formIsValid}
            >{this.state.isSignUp ? 'SIGN UP' : 'LOG IN'}</Button>
            <Button
                btnType="Danger"
                clicked={this.switchAuthHandler}
            >SWITCH TO {this.state.isSignUp ? 'LOG IN' : 'SIGN UP'}</Button>
        </form>);

        if (this.props.loading) {
            authForm = <Spinner />
        }

        // console.log(`this.props.authRedirectPath: ${this.props.authRedirectPath}`)

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
            // console.log('redirecting to burgerbldr')
            // console.log(this.props.ingredients)
            // if(this.props.ingredients) { // isPurchaseable
                // console.log('redirecting to checkout')
                // authRedirect = <Redirect to="/checkout" />
            // }
        }
        return (
            < div className = { styles.Auth } >
                { authRedirect }
                { authForm }
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated: state.auth.idToken !== null,
        // ingredients: state.ingd.ingredients
        buildingBurger: state.ingd.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (username, password, isSignUp) => dispatch(actions.authUser(username, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);