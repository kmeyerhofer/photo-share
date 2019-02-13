import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from './error.js';
import { removeErrorById } from '../redux/actions/errorActions.js';

class ErrorContainer extends Component {
  constructor(props) {
    super(props);
    this.removeSelf = this.removeSelf.bind(this);
  }

  removeSelf = (errorId) => {
    this.props.removeErrorById(errorId);
  }

  renderEachError = (errors) => {
    if (errors) {
      return errors.map((error) => {
        return (
          <Error
            key={error.id}
            message={error.message}
            id={error.id}
            removeSelf={this.removeSelf}
          />
        );
      });
    }
  }

  render() {
    return (
      <div>
        {/* <h2>This is the Error Container component!</h2> */}
        <ul>
          {this.renderEachError(this.props.errors)}
        </ul>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeErrorById: (errorId) => {
      dispatch(removeErrorById(errorId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer);
