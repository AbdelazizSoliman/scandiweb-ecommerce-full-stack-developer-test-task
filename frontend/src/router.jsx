import { Products, ErrorScreen, HomeLayout, ProductDetail } from './pages';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <ErrorScreen />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: '/:category',
        element: <Products />,
      },
      {
        path: 'products/:id',
        element: <ProductDetail />,
      },
    ],
  },
]);

export default router;
