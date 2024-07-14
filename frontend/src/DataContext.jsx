import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <DataContext.Provider
      value={{
        categoriesData,
        setCategoriesData,
        productsData,
        setProductsData,
        selectedCategory,
        setSelectedCategory,
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
