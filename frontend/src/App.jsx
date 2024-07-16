import { Component, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import router from './router';
import { getCategoriesAndProductsQuery } from './GraphQl/Queries';
import { DataProvider, useDataContext } from './DataContext';
import { Loading } from './components';

class App extends Component {
  render() {
    return (
      <DataProvider>
        <FetchData />
        <RouterProvider router={router} />
      </DataProvider>
    );
  }
}

function FetchData() {
  const { setCategoriesData, setProductsData } = useDataContext();

  const [fetchData, { loading, error }] = useLazyQuery(
    getCategoriesAndProductsQuery,
    {
      onCompleted: (data) => {
        setCategoriesData(data.categories);
        setProductsData(data.products);
      },
    }
  );

  useEffect(() => {
    const category = new URLSearchParams(location.search).get('category');

    fetchData({ variables: { category } });
  }, [fetchData]);

  if (error) {
    return (
      <p className="my-8 font-semibold text-center text-red-500">
        Something went wrong
      </p>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return null;
}

export default App;
