import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || []
  );
  const [selectedCategory, setSelectedCategory] = useState(null);

  const addToCart = (
    product = {},
    shouldProvideAttributes = false,
    selectedAttributes = [] // Accept selected attributes
  ) => {
    let attributes;

    if (shouldProvideAttributes) {
      // Check if all product attributes are selected
      const missingAttributes = product.attributes.filter(
        (attr) =>
          !selectedAttributes.some(
            (selectedAttr) => selectedAttr.id === attr.id
          )
      );

      if (missingAttributes.length > 0) {
        return toast.error('Please select all attributes! ⚠️');
      }

      attributes = selectedAttributes.map((attr) => ({
        id: attr.id,
        value: attr.value,
      }));
    } else {
      // If no attributes selected, use default ones
      attributes = product.attributes?.map((attr) => ({
        id: attr.id,
        value: attr.items[0].value,
      }));
    }

    const existingCartItems = [...cartItems];

    // Check if the product already exists in the cart with the same attributes
    const existingItemIndex = existingCartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        JSON.stringify(item.selectedAttributes) === JSON.stringify(attributes)
    );

    if (existingItemIndex !== -1) {
      // If the product exists, increase its quantity
      existingCartItems[existingItemIndex].quantity += 1;
    } else {
      // If the product does not exist, add it to cart
      const newItem = {
        id: new Date().valueOf(),
        product,
        selectedAttributes: attributes,
        quantity: 1,
      };
      existingCartItems.push(newItem);
    }

    // Update cart items and persist in localStorage
    setCartItems(existingCartItems);
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));

    toast.success('Product added to cart! 🛒');
  };

  const updateCartItemAttribute = (product, newAttributes) => {
    // Find the index of the cart item corresponding to the given product
    const index = cartItems.findIndex((item) => item.product.id === product.id);

    if (index !== -1) {
      // Update the selectedAttributes of the cart item with the newAttributes
      const updatedCartItem = {
        ...cartItems[index],
        selectedAttributes: newAttributes,
      };

      // Update the cartItems array with the updated cart item
      const updatedCartItems = [...cartItems];
      updatedCartItems[index] = updatedCartItem;

      // Update the cartItems state
      setCartItems(updatedCartItems);

      // Update localStorage with the updated cartItems
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  };

  const updateCartItemQuantity = (itemId, value) => {
    const existingCartItems =
      JSON.parse(localStorage.getItem('cartItems')) || [];

    // Find the item in the cart
    const index = existingCartItems.findIndex((item) => item.id === itemId);

    if (index !== -1) {
      existingCartItems[index].quantity += value;

      if (existingCartItems[index].quantity <= 0) {
        existingCartItems.splice(index, 1);
      }

      localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
      setCartItems(existingCartItems);
    }
  };

  return (
    <DataContext.Provider
      value={{
        categoriesData,
        setCategoriesData,
        productsData,
        setProductsData,
        selectedCategory,
        setSelectedCategory,
        addToCart,
        cartItems,
        updateCartItemQuantity,
        updateCartItemAttribute,
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
