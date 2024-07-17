import { useState } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { useDataContext } from '../DataContext';

const ProductAttributes = ({
  product,
  className,
  isModalView = false,
  itemSelectedAttributes = [],
}) => {
  const { addToCart, updateCartItemAttribute } = useDataContext();
  const [selectedAttributes, setSelectedAttributes] = useState(
    itemSelectedAttributes
  );

  const totalPrice =
    product.prices && product.prices.length > 0
      ? `${product.prices[0].currency.symbol} ${(
          parseFloat(product.prices[0]?.amount) * (product.quantity ?? 1)
        ).toFixed(2)}`
      : null;

  const handleAttributeClick = (attribute) => {
    const existingIndex = selectedAttributes.findIndex(
      (attr) => attr.attributeId === attribute.attribute_id
    );

    const updatedSelectedAttributes = [...selectedAttributes];

    if (existingIndex !== -1) {
      updatedSelectedAttributes[existingIndex] = {
        id: attribute.id,
        attributeId: attribute.attribute_id,
        value: attribute.value,
      };
    } else {
      updatedSelectedAttributes.push({
        id: attribute.id,
        attributeId: attribute.attribute_id,
        value: attribute.value,
      });
    }

    setSelectedAttributes(updatedSelectedAttributes);

    if (isModalView) {
      updateCartItemAttribute(
        product,
        selectedAttributes,
        updatedSelectedAttributes
      );
    }
  };

  const isAttributeValueSelected = (attribute) => {
    return selectedAttributes.some(
      (attr) =>
        attribute.attribute_id === attr.attributeId &&
        attribute.value === attr.value
    );
  };

  return (
    <div className={`${className}${product.inStock ? '' : ' opacity-70'}`}>
      <h2
        className={isModalView ? 'capitalize font-light text-lg' : 'heading-h1'}
      >
        {product.name}
      </h2>

      {isModalView && <div className="my-2 font-bold">{totalPrice}</div>}

      {product.attributes?.map((attributeSet) => (
        <div
          key={attributeSet.id}
          className="mt-4"
          data-testid={`${
            isModalView ? 'cart-item' : 'product'
          }-attribute-${attributeSet.name.replace(/\s+/g, '-')}`}
        >
          <h3
            className={`${
              isModalView ? 'font-sm' : 'font-bold uppercase'
            } capitalize mb-1`}
          >
            {attributeSet.name}:
          </h3>

          <div
            className={`${
              isModalView ? 'gap-x-2' : 'gap-x-3'
            } flex flex-wrap gap-y-2`}
          >
            {attributeSet.items.map((attribute) =>
              attributeSet.type?.toLowerCase() === 'swatch' &&
              attributeSet.name?.toLowerCase() === 'color' ? (
                <button
                  type="button"
                  key={attribute.id}
                  className={`relative ${isModalView ? 'w-5 h-5' : 'w-8 h-8'} ${
                    isAttributeValueSelected(attribute)
                      ? 'border-primary'
                      : 'border-white'
                  } border ${
                    product.inStock ? 'hover:border-primary' : ''
                  } transition-colors`}
                  style={{ backgroundColor: attribute.value }}
                  title={attribute.displayValue}
                  onClick={() => handleAttributeClick(attribute)}
                  disabled={!product.inStock}
                  data-testid={`${
                    isModalView ? 'cart-item' : 'product'
                  }-attribute-${attributeSet.name.replace(/\s+/g, '-')}-${
                    isModalView
                      ? attribute.displayValue.replace(/\s+/g, '-')
                      : attribute.value
                  }${
                    isAttributeValueSelected(attribute) && isModalView
                      ? '-selected'
                      : ''
                  }`}
                >
                  <div className="absolute inset-0 border border-gray-200"></div>
                </button>
              ) : (
                <button
                  type="button"
                  key={attribute.id}
                  className={`${
                    isModalView
                      ? 'min:w-6 min:h-6 text-sm'
                      : 'min:w-20 min:h-10'
                  } ${
                    isAttributeValueSelected(attribute)
                      ? 'bg-text text-white'
                      : 'bg-white'
                  } px-1 flex items-center justify-center transition-colors border ${
                    product.inStock ? 'hover:bg-gray-800 hover:text-white' : ''
                  } border-gray-800`}
                  disabled={!product.inStock}
                  onClick={() => handleAttributeClick(attribute)}
                  data-testid={`${
                    isModalView ? 'cart-item' : 'product'
                  }-attribute-${attributeSet.name.replace(
                    /\s+/g,
                    '-'
                  )}-${attribute.displayValue.replace(/\s+/g, '-')}${
                    isAttributeValueSelected(attribute) ? '-selected' : ''
                  }`}
                >
                  {attribute.displayValue}
                </button>
              )
            )}
          </div>
        </div>
      ))}

      {!isModalView && (
        <>
          <h3 className="mt-4 mb-1 font-bold uppercase font-roboto">Price:</h3>
          <div className="heading-h2">
            {product.prices &&
              product.prices.length > 0 &&
              `${product.prices[0]?.currency.symbol} ${product.prices[0]?.amount}`}
          </div>
        </>
      )}

      {!isModalView && product.inStock && (
        <button
          type="button"
          className="w-full mb-8 btn-cta"
          onClick={() => addToCart(product, true, selectedAttributes)}
          disabled={product.attributes.length !== selectedAttributes.length}
          data-testid="add-to-cart"
        >
          Add to Cart
        </button>
      )}

      {!isModalView && (
        <div className="text-sm font-roboto" data-testid="product-description">
          {parse(DOMPurify.sanitize(product.description))}
        </div>
      )}
    </div>
  );
};

ProductAttributes.propTypes = {
  product: PropTypes.object.isRequired,
  className: PropTypes.string,
  isModalView: PropTypes.bool,
  itemSelectedAttributes: PropTypes.array,
};

export default ProductAttributes;
