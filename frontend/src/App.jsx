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

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
