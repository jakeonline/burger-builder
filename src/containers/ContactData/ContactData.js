import React, { Component } from "react";
import Button from '../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Input/Input'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { updateObject, validate } from '../../shared/utility'

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    errormessage: 'Name length is minimum of 4 characters'
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    errormessage: 'E-mail is required'

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
                    required: true,
                    errormessage: 'Street is required'
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                    errormessage: 'Country is required'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Post code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    errormessage: 'Zip code should be 5 characters'
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', display: 'Fastest' },
                        { value: 'cheapest', display: 'Cheapest' }
                    ]
                },
                value: 'cheapest',
                validation: {},
                valid: true,
                touched: false
            }
        },
        formIsValid: false
    }

    orderClickedHandler = (event) => {
        event.preventDefault();

        const orderFormData = {};
        for (let formId in this.state.orderForm) {
            orderFormData[formId] = this.state.orderForm[formId].value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: orderFormData,
            userId: this.props.userId
        }
        this.props.onOrderNow(order, this.props.token);
    }

    inputChangedHandler = (event, formIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[formIdentifier], {
            value: event.target.value,
            valid: validate(event.target.value, this.state.orderForm[formIdentifier].validation),
            touched: true

        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [formIdentifier]: updatedFormElement
        })
        // console.log(updatedFormElement);

        let updatedFormIsValid = true;
        for (let key in updatedOrderForm) {
            updatedFormIsValid = updatedFormIsValid && updatedOrderForm[key].valid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: updatedFormIsValid
        });
    }

    // hasRequiredLength(rule, requiredLength) {
    //     const requiredLengthResult = requiredLength(rule);
    //     const isValid = rule ? requiredLengthResult : true;
    //     console.log(`rule: ${rule} | requiredLengthResult: ${requiredLengthResult} | isValid: ${isValid}`);
    //     return isValid;
    // }

    isMinLength(value, minLengthRule) {
        return minLengthRule ? value.trim().length >= minLengthRule : true;
    }

    isMaxLength(value, maxLengthRule) {
        return maxLengthRule ? value.trim().length <= maxLengthRule : true;
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        // console.log(formElementsArray);

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

        let form = (<form>
            {formElements}
            <Button
                btnType="Success"
                clicked={this.orderClickedHandler}
                disabled={!this.state.formIsValid}
            >ORDER</Button>
        </form>);

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingd.ingredients,
        price: state.ingd.totalPrice,
        loading: state.ordr.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderNow: (order, token) => dispatch(actions.purchaseBurger(order, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));