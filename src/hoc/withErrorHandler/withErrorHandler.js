import React, { Component, Fragment } from "react";
import Modal from "../../Components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      err: null,
    };

    componentDidMount() {
      axios.interceptors.request.use((req) => {
        this.setState({ err: null });
        return req;
      });
      axios.interceptors.response.use(
        (res) => res,
        (err) => this.setState({ err: err })
      );
    }

    errorConfirmedHandler = () => {
      this.setState({ err: null });
    };
    render() {
      return (
        <Fragment>
          <Modal show={this.state.err} disable={this.errorConfirmedHandler}>
            {this.state.err ? this.state.err.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;
