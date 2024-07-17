import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { Cart, CartModal, Loading, Logo, NavigationMenu } from '.';
import { useDataContext } from '../DataContext';
import { GET_CATEGORIES_AND_PRODUCTS, GET_PRODUCTS } from '../GraphQl/Queries';

const Header = () => {
  const { category } = useParams();
  const { cartItems, setSelectedCategory, setProductsData } = useDataContext();

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

  const [fetchData, { dataLoading, dataError }] = useLazyQuery(
    GET_CATEGORIES_AND_PRODUCTS,
    {
      onCompleted: (data) => {
        setProductsData(data.products);
        setCategories(data.categories.map((category) => category.name));
        setSelectedCategory(category ?? data.categories[0]?.name);
      },
    }
  );

  useEffect(() => {
    fetchData({ variables: { category } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  useEffect(() => {
    document.body.style.overflowY = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  if (dataError) {
    return (
      <p className="py-2 my-8 font-semibold text-center text-white bg-red-500">
        Oops! Something broke. Try reloading the page or come back later.
      </p>
    );
  }

  if (dataLoading) {
    return <Loading />;
  }

  return (
    <header className="relative z-10 flex items-center justify-between">
      <NavigationMenu
        categories={categories}
        handleCategoryChange={handleCategoryChange}
      />

      <div className="absolute inset-x-0 flex items-center justify-center mx-auto">
        <Link to="/" onClick={() => handleCategoryChange(categories[0])}>
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
            data-testid="cart-count-bubble"
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
