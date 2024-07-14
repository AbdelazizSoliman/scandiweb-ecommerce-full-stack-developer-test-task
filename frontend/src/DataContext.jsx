import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [categoriesData, setCategoriesData] = useState(null);
  const [productsData, setProductsData] = useState(null);

  return (
    <DataContext.Provider
      value={{
        categoriesData,
        setCategoriesData,
        productsData,
        setProductsData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
