import PropTypes from 'prop-types';
import CartModalItem from './CartModalItem';

function CartModal({ items = [] }) {
  return (
    <section className="absolute z-50 bg-white shadow-lg -right-3.5 top-full w-80 py-6 px-4">
      <h2 className="mb-6">
        <span className="font-bold">My Bag</span>
        {!!items.length &&
          `, ${items.reduce((total, item) => total + item.quantity, 0)} items`}
      </h2>

      {items.length === 0 ? (
        <p className="mt-2 text-gray-500">Your bag is empty.</p>
      ) : (
        <>
          <div className="space-y-8 overflow-y-auto max-h-80">
            {items.map((item) => (
              <CartModalItem key={item.id} item={item} />
            ))}
          </div>

          <div className="pt-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold font-roboto">Total</h3>
              <div className="font-bold">
                {items.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </div>
            </div>

            <button className="w-full mt-8 btn-cta">Place Order</button>
          </div>
        </>
      )}
    </section>
  );
}

CartModal.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export default CartModal;
