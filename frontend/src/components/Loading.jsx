import { Component } from 'react';
import { Spinner } from './';

class Loading extends Component {
  componentDidMount() {
    document.body.classList.add('overflow-hidden');
  }

  componentWillUnmount() {
    document.body.classList.remove('overflow-hidden');
  }

  render() {
    return (
      <div
        role="status"
        className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full overflow-hidden bg-white"
      >
        <Spinner />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
}

export default Loading;
