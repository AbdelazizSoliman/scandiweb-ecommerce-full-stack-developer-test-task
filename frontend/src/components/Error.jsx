import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import errorImg from '../assets/error.svg';

class Error extends Component {
  render() {
    const { statusCode = 500 } = this.props;

    return (
      <main className="flex flex-col items-center justify-center max:h-screen">
        <img src={errorImg} alt="error" className="w-64 mb-6" />

        <h1 className="heading-h1">
          {statusCode === 404
            ? 'Page not found'
            : statusCode === 400
            ? 'Bad request'
            : 'Something went wrong'}
        </h1>

        <Link to="/" className="btn-cta">
          Back home
        </Link>
      </main>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number,
};

export default Error;
