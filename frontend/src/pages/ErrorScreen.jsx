import PropTypes from 'prop-types';
import { Component } from 'react';
import { useRouteError } from 'react-router-dom';
import { Error } from '../components';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const error = useRouteError();

    return <Component {...props} error={error} />;
  }

  return ComponentWithRouterProp;
}

class ErrorScreen extends Component {
  render() {
    const { error } = this.props;

    return <Error statusCode={error?.status} />;
  }
}

ErrorScreen.propTypes = {
  error: PropTypes.object,
};

export default withRouter(ErrorScreen);
