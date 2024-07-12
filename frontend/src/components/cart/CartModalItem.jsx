import { Component } from 'react';
import PropTypes from 'prop-types';
import ProductAttributes from '../ProductAttributes';
import ActionBtn from './ActionBtn';

class CartModalItem extends Component {
  static propTypes = {
    item: PropTypes.object,
  };

  static defaultProps = {
    item: {},
  };

  render() {
    const { item } = this.props;

    return (
      <div className="flex justify-between">
        <ProductAttributes className="w-3/6" isModalView={true} item={item} />

        <div className="flex flex-col items-center justify-between w-1/6">
          <ActionBtn text="+" onClick={() => console.log('Button clicked!')} />
          <span>{item.quantity}</span>
          <ActionBtn text="-" onClick={() => console.log('Button clicked!')} />
        </div>

        <div className="w-2/6">
          <img
            src={item.image}
            alt={item.name}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    );
  }
}

export default CartModalItem;
