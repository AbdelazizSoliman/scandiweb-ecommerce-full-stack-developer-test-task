import PropTypes from 'prop-types';
import CartModalItem from './CartModalItem';
import PlaceOrderBtn from './PlaceOrderBtn';

function CartModal({ cartItems = [] }) {
  const totalPrice = cartItems
    .reduce(
      (total, item) =>
        total + parseFloat(item.product?.prices[0]?.amount) * item.quantity,
      0
    )
    .toFixed(2);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <section className="absolute z-50 bg-white shadow-lg -right-3.5 top-full w-80 py-6 px-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
      <h2 className="mb-6">
        <span className="font-bold">My Bag</span>
        {!!totalItems && `, ${totalItems} item${totalItems === 1 ? '' : 's'}`}
      </h2>

      {totalItems === 0 ? (
        <p className="mt-2 text-gray-500">Your bag is empty.</p>
      ) : (
        <>
          <div className="py-4 space-y-8 overflow-y-auto max-h-80">
            {cartItems.map((item) => (
              <CartModalItem key={item.id} item={item} />
            ))}
          </div>

          <div className="pt-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold font-roboto">Total</h3>
              <div className="font-bold" data-testid="cart-total">
                {`${cartItems[0]?.product.prices[0].currency.symbol} ${totalPrice}`}
              </div>
            </div>

            <PlaceOrderBtn className="w-full mt-8" />
          </div>
        </>
      )}
    </section>
  );
}

CartModal.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object),
};

export default CartModal;
