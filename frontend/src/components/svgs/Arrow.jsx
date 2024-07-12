import { Component } from 'react';
import PropTypes from 'prop-types';

class Arrow extends Component {
  render() {
    const { direction = 'right' } = this.props;

    const rotateClasses = {
      up: '-rotate-90',
      down: 'rotate-90',
      left: 'rotate-180',
      right: 'rotate-0',
    };

    return (
      <svg
        className={`w-6 h-6 ${rotateClasses[direction]}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.707 15.707a1 1 0 01-1.414-1.414L10.586 10 6.293 5.707a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
}

Arrow.propTypes = {
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
};

export default Arrow;
