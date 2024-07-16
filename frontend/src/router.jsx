import { Categories, ErrorScreen, HomeLayout, ProductDetail } from './pages';
import { createBrowserRouter } from 'react-router-dom';

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
        path: 'products/:id',
        element: <ProductDetail />,
      },
    ],
  },
]);

export default router;
