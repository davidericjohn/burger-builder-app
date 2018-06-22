import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { isValid } from '../../utility/utility';

import messages from '../../messages/messages';
import * as actions from '../../store/actions/actionCreators';
import { cleanErrorCode, updateObject } from '../../utility/utility';

class Auth extends Component {

  state = {
    isSignUp: false,
    authForm: {
      username: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Username',
        },
        value: '',
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
    }
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangeHandler = (event, inputIndentifier) => {
    // creating a deep copy of the given input indentifier
    const updatedAuthForm = updateObject(this.state.authForm, {
      [inputIndentifier]: updateObject(this.state.authForm[inputIndentifier], {
        value: event.target.value,
        valid: isValid(event.target.value, this.state.authForm[inputIndentifier].validation),
        touched: true,
      })
    });

    this.setState({ authForm: updatedAuthForm });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.authForm.username.value,
      this.state.authForm.password.value, this.state.isSignUp);
  }

  switchHandler = (event) => {
    event.preventDefault();
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  }

  render() {
    const formElements = Object.keys(this.state.authForm)
      .map(el => {
        return {
          id: el,
          config: this.state.authForm[el],
        }
      });

    let form = formElements.map(el => {
      return <Input
        key={el.id}
        elementType={el.config.elementType}
        elementConfig={el.config.elementConfig}
        value={el.config.value}
        invalid={!el.config.valid}
        shouldValidate={el.config.validation}
        touched={el.config.touched}
        onchange={(e) => this.inputChangeHandler(e, el.id)} />
    });

    if (this.props.loading)
      form = <Spinner />;

    let error = null;
    if (this.props.error) {
      const errorCode = cleanErrorCode(this.props.error.message);
      error = <p>{messages.auth[errorCode] ? messages.auth[errorCode] : messages.auth.GENERIC_ERROR}</p>;
    }

    let redirect = null;
    if (this.props.isAuthenticated) {
      redirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {redirect}
        {error}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button type="Success">
            {this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}
          </Button>
        </form>
        <Button onclick={this.switchHandler} type="Danger">SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token != null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password, isSignUp) => dispatch(actions.auth(username, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);