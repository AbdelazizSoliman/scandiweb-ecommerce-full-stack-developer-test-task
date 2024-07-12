import { Component } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

class ProductAttributes extends Component {
  render() {
    const { product, children, className, isModalView = false } = this.props;

    const totalPrice =
      product.prices && product.prices.length > 0
        ? parseFloat(product.prices[0]?.amount) * (product.quantity ?? 1)
        : null;

    return (
      <div className={`${className}`}>
        <h2
          className={
            isModalView ? 'capitalize font-light text-lg' : 'heading-h1'
          }
        >
          {product.name}
        </h2>

        {isModalView && <div className="my-2 font-bold">{totalPrice}</div>}

        {product.attributes?.map((attribute) => (
          <div key={attribute.id} className="mt-4">
            <h3
              className={`${
                isModalView ? 'font-sm' : 'font-bold uppercase'
              } capitalize mb-1`}
            >
              {attribute.id}:
            </h3>

            <div
              className={`${
                isModalView ? 'gap-x-2' : 'gap-x-3'
              } flex flex-wrap gap-y-2`}
            >
              {attribute.items.map((item) =>
                attribute.id.toLowerCase() === 'color' ? (
                  <button
                    type="button"
                    key={attribute.id + item.value}
                    className={`relative ${
                      isModalView ? 'w-5 h-5' : 'w-8 h-8'
                    } border transition-colors border-white hover:border-primary`}
                    style={{ backgroundColor: item.value }}
                  >
                    <div className="absolute inset-0 border border-white"></div>
                  </button>
                ) : (
                  <button
                    type="button"
                    key={attribute.id + item.value}
                    className={`${
                      isModalView ? 'w-6 h-6 text-sm' : 'w-20 h-10'
                    } flex items-center justify-center transition-colors bg-white border border-gray-800 hover:bg-gray-800 hover:text-white`}
                  >
                    {item.displayValue}
                  </button>
                )
              )}
            </div>
          </div>
        ))}

        {!isModalView && (
          <>
            <h3 className="mt-4 mb-1 font-bold uppercase font-roboto">
              Price:
            </h3>
            <div className="heading-h2">
              {product.prices &&
                product.prices.length > 0 &&
                `${product.prices[0]?.currency.symbol}${product.prices[0]?.amount}`}
            </div>
          </>
        )}

        {children}

        {!isModalView && (
          <div className="text-sm font-roboto">
            {parse(DOMPurify.sanitize(product.description))}
          </div>
        )}
      </div>
    );
  }
}

ProductAttributes.propTypes = {
  product: PropTypes.object.isRequired,
  children: PropTypes.element,
  className: PropTypes.string,
  isModalView: PropTypes.bool,
};

export default ProductAttributes;
