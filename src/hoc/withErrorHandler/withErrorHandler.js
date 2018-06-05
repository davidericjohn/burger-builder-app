import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {

  return class extends Component {
    state = {
      hasError: false,
      errorMsg: null,
    }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({
          hasError: false,
          errorMsg: null,
        });
        return req;
      });

      this.respInterceptor = axios.interceptors.response.use(resp => resp, error => {
        this.setState({
          hasError: true,
          errorMsg: error.message,
        });
      });
    }

    componentWillUnmount() {
      // clean up
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.respInterceptor);
    }

    errorConfirmHandler = () => {
      this.setState({
        hasError: false,
        errorMsg: null,
      });
    }

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.hasError}
            closeModal={this.errorConfirmHandler}>
            {this.state.hasError ? this.state.errorMsg : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  };
}

export default withErrorHandler;