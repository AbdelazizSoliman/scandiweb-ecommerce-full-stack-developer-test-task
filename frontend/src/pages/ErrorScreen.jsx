import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteError } from 'react-router-dom';
import notFound from '../assets/not-found.svg';

class ErrorScreen extends Component {
  render() {
    const { error } = this.props;

    return (
      <main className="flex flex-col items-center justify-center h-screen">
        <img src={notFound} alt="not found" className="w-64 mb-4" />
        <h2 className="text-2xl font-bold mb-2">
          {error && error.status === 404 ? 'Page not found' : 'Something went wrong'}
        </h2>
        <Link to="/" className="text-orange-600 hover:underline">
          Back home
        </Link>
      </main>
    );
  }
}

ErrorScreen.propTypes = {
  error: PropTypes.shape({
    status: PropTypes.number,
  }),
};

// Parent component to use useRouteError and pass it as props to ErrorScreen
const ErrorScreenWrapper = () => {
  const error = useRouteError();
  return <ErrorScreen error={error} />;
};

export default ErrorScreenWrapper;
