import { Component } from 'react';
import PropTypes from 'prop-types';
import ProductAttributes from '../ProductAttributes';
import ActionBtn from './ActionBtn';

class CartModalItem extends Component {
  render() {
    const { product = {} } = this.props;

    const productImage = product.gallery?.length ? product.gallery[0] : '';

    return (
      <div className="flex justify-between">
        <ProductAttributes
          className="w-3/6"
          isModalView={true}
          product={product}
        />

        <div className="flex flex-col items-center justify-between w-1/6">
          <ActionBtn text="+" onClick={() => console.log('Button clicked!')} />
          <span>{product.quantity}</span>
          <ActionBtn text="-" onClick={() => console.log('Button clicked!')} />
        </div>

        <div className="w-2/6">
          <img
            src={productImage}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    );
  }
}

CartModalItem.propTypes = {
  product: PropTypes.object,
};

export default CartModalItem;
