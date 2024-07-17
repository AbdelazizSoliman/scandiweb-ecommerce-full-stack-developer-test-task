import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { Cart, CartModal, Logo, NavigationMenu } from '.';
import { useDataContext } from '../DataContext';
import { GET_PRODUCTS } from '../GraphQl/Queries';

const Header = () => {
  const { category } = useParams();
  const { cartItems, setSelectedCategory, setProductsData, categoriesData } =
    useDataContext();

  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);

  const toggleModal = () => setShowModal((prevState) => !prevState);

  const [fetchProducts] = useLazyQuery(GET_PRODUCTS, {
    onCompleted: (data) => setProductsData(data.products),
  });

  const handleCategoryChange = (category) => {
    fetchProducts({ variables: { category } });
    setSelectedCategory(category);
  };

  useEffect(() => {
    document.body.style.overflowY = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  useEffect(() => {
    setCategories(categoriesData.map((category) => category.name));

    // const category = new URLSearchParams(location.search).get('category');
    setSelectedCategory(category ?? categoriesData[0]?.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesData]);

  return (
    <header className="relative z-10 flex items-center justify-between">
      <NavigationMenu
        categories={categories}
        handleCategoryChange={handleCategoryChange}
      />

      <div className="absolute inset-x-0 flex items-center justify-center mx-auto">
        <Link
          to="/"
          onClick={() => handleCategoryChange(categoriesData[0]?.name)}
        >
          <Logo />
        </Link>
      </div>

      <button
        className="relative z-10 cursor-pointer"
        onClick={toggleModal}
        data-testid="cart-btn"
      >
        <Cart />
        {cartItems.length > 0 && (
          <div
            className="absolute flex items-center justify-center w-5 h-5 -mt-1 -mr-1 text-sm text-white rounded-full -top-1 -right-2 bg-text"
            data-testid="cart-item-amount"
          >
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </div>
        )}
      </button>

      {showModal && (
        <>
          <div
            className="absolute inset-x-0 z-50 h-screen bg-black opacity-25 top-full -right-20 -left-20"
            onClick={toggleModal}
            data-testid="cart-overlay"
          ></div>
          <CartModal cartItems={cartItems} />
        </>
      )}
    </header>
  );
};

export default Header;
