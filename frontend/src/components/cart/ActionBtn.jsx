import { Component } from 'react';
import PropTypes from 'prop-types';

class ActionBtn extends Component {
  render() {
    const { text, onClick } = this.props;

    return (
      <button
        className="flex items-center justify-center w-6 h-6 transition-colors border border-text hover:bg-text hover:text-white"
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
}

ActionBtn.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ActionBtn;
