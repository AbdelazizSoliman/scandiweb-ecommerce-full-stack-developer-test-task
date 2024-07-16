import PropTypes from 'prop-types';
import { Component } from 'react';
import { useRouteError } from 'react-router-dom';
import { Error } from '../components';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const error = useRouteError();
    return <Component {...props} error={error} />;
  }
  ComponentWithRouterProp.displayName = `withRouter(${Component.displayName || Component.name || 'Component'})`;
  return ComponentWithRouterProp;
}

class ErrorScreen extends Component {
  render() {
    const { error } = this.props;

    return <Error statusCode={error?.status} message={error?.message} />;
  }
}

ErrorScreen.propTypes = {
  error: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string,
  }),
};

const NamedErrorScreen = withRouter(ErrorScreen);

export default NamedErrorScreen;
