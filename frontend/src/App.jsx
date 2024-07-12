import { Component } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Categories, ErrorScreen, HomeLayout, ProductDetail } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <ErrorScreen />,
    children: [
      {
        index: true,
        element: <Categories />,
      },
      {
        path: 'products/:productId',
        element: <ProductDetail />,
      },
    ],
  },
]);

class App extends Component {
  render() {
    return <RouterProvider router={router} />;
  }
}

export default App;
