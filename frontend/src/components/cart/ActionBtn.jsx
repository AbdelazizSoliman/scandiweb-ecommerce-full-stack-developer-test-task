import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ActionBtn extends Component {
  render() {
    const { text, onClick, 'data-testid': dataTestId } = this.props;

    return (
      <button onClick={onClick} data-testid={dataTestId} className="btn-class">
        {text}
      </button>
    );
  }
}

ActionBtn.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  'data-testid': PropTypes.string,
};

export default ActionBtn;
