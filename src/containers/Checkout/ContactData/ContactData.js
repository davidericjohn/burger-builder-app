import React, { Component } from 'react';
import axios from 'axios';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
        validation: {
          required: true,
          min: 4,
          max: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
        },
        value: '',
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'cheapest',
        validation: {},
        valid: true,
        touched: false,
      }
    },
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    formIsValid: false,
    loading: false,
  }

  componentWillMount() {
    const ingredients = this.props.location.state.ingredients ? { ...this.props.location.state.ingredients } : this.state.ingredients;
    this.setState({ ...this.state, ingredients: ingredients, totalPrice: this.props.location.state.totalPrice });
  }

  isValid = (value, rules) => {
    let isValid = true;
    if (!rules)
      return true;

    if (rules.required)
      isValid = value.trim() !== '' && isValid;

    if (rules.min)
      isValid = value.length >= rules.min && isValid

    if (rules.max)
      isValid = value.length <= rules.max && isValid

    if (rules.email) {
      const pattern = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$');
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  inputChangeHandler = (event, inputIndentifier) => {
    // creating a deep copy of the given input indentifier
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIndentifier]
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.isValid(event.target.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIndentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm)
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    // serializing postData
    const formData = {};
    for (const el in this.state.orderForm)
      formData[el] = this.state.orderForm[el].value;

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      orderData: formData,
    };

    axios.post('/orders.json', order)
      .then(response => {
        this.props.history.replace('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  render() {
    const formElements = Object.keys(this.state.orderForm)
      .map(el => {
        return {
          id: el,
          config: this.state.orderForm[el],
        }
      });

    let contactDataForm = (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form onSubmit={this.orderHandler}>
          {formElements.map(el => {
            return <Input
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              invalid={!el.config.valid}
              shouldValidate={el.config.validation}
              touched={el.config.touched}
              onchange={(e) => this.inputChangeHandler(e, el.id)} />
          })}
          <Button type="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
      </div>
    );
    if (this.state.loading)
      contactDataForm = <Spinner />

    return (
      <div>
        {contactDataForm}
      </div>
    );
  }
}

export default ContactData;