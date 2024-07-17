import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || []
  );
  const [selectedCategory, setSelectedCategory] = useState(null);

  const addToCart = (
    product = {},
    shouldProvideAttributes = false,
    selectedAttributes = []
  ) => {
    let attributes;

    if (shouldProvideAttributes) {
      const missingAttributes = product.attributes.filter(
        (attr) =>
          !selectedAttributes.some(
            (selectedAttr) => selectedAttr.attributeId === attr.name
          )
      );

      if (missingAttributes.length > 0) {
        return toast.error('Please select all attributes! ⚠️');
      }

      attributes = selectedAttributes.map((attr) => ({
        id: attr.id,
        attributeId: attr.attributeId,
        value: attr.value,
      }));
    } else {
      // If no attributes selected, use default ones
      attributes = product.attributes?.map((attr) => ({
        id: attr.items[0].id,
        attributeId: attr.items[0].attribute_id,
        value: attr.items[0].value,
      }));
    }

    const existingCartItems = [...cartItems];

    const existingItemIndex = existingCartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        JSON.stringify(item.selectedAttributes) === JSON.stringify(attributes)
    );

    if (existingItemIndex !== -1) {
      existingCartItems[existingItemIndex].quantity += 1;
    } else {
      const newItem = {
        id: new Date().valueOf(),
        product,
        selectedAttributes: attributes,
        quantity: 1,
      };

      existingCartItems.unshift(newItem);
    }

    setCartItems(existingCartItems);
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));

    toast.success('Item added to cart! 🛒');
  };

  const updateCartItemAttribute = (product, oldAttributes, newAttributes) => {
    const itemIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        JSON.stringify(item.selectedAttributes) ===
          JSON.stringify(oldAttributes)
    );

    if (itemIndex === -1) return;

    const duplicateItemIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        JSON.stringify(item.selectedAttributes) ===
          JSON.stringify(newAttributes)
    );

    const existingCartItems = [...cartItems];
    // update the cart item if no duplicate item is found with the same attributes
    if (duplicateItemIndex === -1) {
      const updatedCartItem = {
        ...cartItems[itemIndex],
        selectedAttributes: newAttributes,
      };

      existingCartItems[itemIndex] = updatedCartItem;

      toast.success('Cart item updated successfully!');
    }
    // merge the quantities of duplicate items if they have different attributes
    else if (itemIndex !== duplicateItemIndex) {
      existingCartItems[itemIndex].quantity +=
        existingCartItems[duplicateItemIndex].quantity;

      // remove the duplicate item from the cart
      existingCartItems.splice(duplicateItemIndex, 1);

      toast.success('Cart item quantities merged successfully!');
    }

    setCartItems(existingCartItems);

    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
  };

  const updateCartItemQuantity = (itemId, value) => {
    const existingCartItems =
      JSON.parse(localStorage.getItem('cartItems')) || [];

    const index = existingCartItems.findIndex((item) => item.id === itemId);

    if (index !== -1) {
      existingCartItems[index].quantity += value;

      if (existingCartItems[index].quantity <= 0) {
        existingCartItems.splice(index, 1);
      }

      localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
      setCartItems(existingCartItems);

      toast.success('Cart item updated successfully!');
    }
  };

  const emptyCart = () => {
    localStorage.removeItem('cartItems');

    setCartItems([]);
  };

  return (
    <DataContext.Provider
      value={{
        productsData,
        setProductsData,
        selectedCategory,
        setSelectedCategory,
        addToCart,
        cartItems,
        updateCartItemQuantity,
        updateCartItemAttribute,
        emptyCart,
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
