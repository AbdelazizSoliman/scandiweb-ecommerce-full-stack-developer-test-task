import PropTypes from 'prop-types';
import ProductAttributes from '../ProductAttributes';
import ActionBtn from './ActionBtn';
import { useDataContext } from '../../DataContext';

function CartModalItem({ item = {} }) {
  const { updateCartItemQuantity } = useDataContext();

  const productImage = item.product.gallery?.length
    ? item.product.gallery[0]
    : '';

  return (
    <div className="flex justify-between">
      <ProductAttributes
        className="w-3/6"
        isModalView={true}
        product={item.product}
        itemSelectedAttributes={item.selectedAttributes}
      />

      <div className="flex flex-col items-center justify-between w-1/6">
        <ActionBtn
          text="+"
          onClick={() => updateCartItemQuantity(item.id, 1)}
          data-testid="cart-item-amount-increase"
        />
        <span data-testid="cart-item-amount">{item.quantity}</span>
        <ActionBtn
          text="-"
          onClick={() => updateCartItemQuantity(item.id, -1)}
          data-testid="cart-item-amount-decrease"
        />
      </div>

      <div className="w-2/6">
        <img
          src={productImage}
          alt={item.product.name}
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
}

CartModalItem.propTypes = {
  item: PropTypes.object,
};

export default CartModalItem;
