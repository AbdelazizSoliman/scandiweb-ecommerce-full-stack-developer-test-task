import { Component, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import router from './router';
import { getCategoriesQuery, getProductsQuery } from './graphql/queries';
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
  const { setCategoriesData, setProductsData, selectedCategory } =
    useDataContext();

  const [
    fetchCategories,
    { loading: categoriesLoading, error: categoriesError },
  ] = useLazyQuery(getCategoriesQuery, {
    onCompleted: (data) => setCategoriesData(data.categories),
  });

  const [fetchProducts, { loading: productsLoading, error: productsError }] =
    useLazyQuery(getProductsQuery, {
      onCompleted: (data) => setProductsData(data.products),
    });

  useEffect(() => {
    const category = new URLSearchParams(location.search).get('category');
    console.log(category);

    fetchCategories();
    fetchProducts({ variables: { category } });
  }, [fetchCategories, fetchProducts, selectedCategory]);

  if (categoriesError || productsError) {
    return (
      <p className="my-8 font-semibold text-center text-red-500">
        Something went wrong
      </p>
    );
  }

  if (categoriesLoading || productsLoading) {
    return <Loading />;
  }

  return null;
}

export default App;
