import { Component } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { DataProvider } from './DataContext';

class App extends Component {
  render() {
    return (
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    );
  }
}

export default App;
