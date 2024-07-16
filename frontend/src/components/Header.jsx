import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cart, CartModal, Logo, NavigationMenu } from '.';
import { useDataContext } from '../DataContext';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const { cartItems } = useDataContext();

  const toggleModal = () => setShowModal((prevState) => !prevState);

  useEffect(() => {
    document.body.style.overflowY = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  return (
    <header className="relative z-10 flex items-center justify-between">
      <NavigationMenu />

      <div className="absolute inset-x-0 flex items-center justify-center mx-auto">
        <Link to="/">
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
          ></div>
          <CartModal cartItems={cartItems} />
        </>
      )}
    </header>
  );
};

export default Header;
