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
      ? `${product.prices[0].currency.symbol}${(
          parseFloat(product.prices[0]?.amount) * (product.quantity ?? 1)
        ).toFixed(2)}`
      : null;

  const handleAttributeClick = (attributeSetId, attribute) => {
    const existingIndex = selectedAttributes.findIndex(
      (attr) => attr.id === attributeSetId
    );

    const updatedSelectedAttributes = [...selectedAttributes];

    if (existingIndex !== -1) {
      updatedSelectedAttributes[existingIndex] = {
        id: attributeSetId,
        attributeId: attributeSetId,
        value: attribute.value,
      };
    } else {
      updatedSelectedAttributes.push({
        id: attributeSetId,
        attributeId: attributeSetId,
        value: attribute.value,
      });
    }

    setSelectedAttributes(updatedSelectedAttributes);

    if (isModalView) {
      updateCartItemAttribute(product, updatedSelectedAttributes);
    }
  };

  const isAttributeValueSelected = (attributeSetId, attribute) => {
    return selectedAttributes.some(
      (attr) =>
        attr.attributeId === attributeSetId && attr.value === attribute.value
    );
  };

  return (
    <div className={`${className}`}>
      <h2
        className={isModalView ? 'capitalize font-light text-lg' : 'heading-h1'}
      >
        {product.name}
      </h2>

      {isModalView && <div className="my-2 font-bold">{totalPrice}</div>}

      {product.attributes?.map((attributeSet) => (
        <div key={attributeSet.id} className="mt-4">
          <h3
            className={`${
              isModalView ? 'font-sm' : 'font-bold uppercase'
            } capitalize mb-1`}
          >
            {attributeSet.id}:
          </h3>

          <div
            className={`${
              isModalView ? 'gap-x-2' : 'gap-x-3'
            } flex flex-wrap gap-y-2`}
          >
            {attributeSet.items.map((attribute) =>
              attributeSet.id.toLowerCase() === 'color' ? (
                <button
                  type="button"
                  key={attributeSet.id + attribute.value}
                  className={`relative ${isModalView ? 'w-5 h-5' : 'w-8 h-8'} ${
                    isAttributeValueSelected(attributeSet.id, attribute)
                      ? 'border-primary'
                      : 'border-white'
                  } border transition-colors hover:border-primary`}
                  style={{ backgroundColor: attribute.value }}
                  onClick={() =>
                    handleAttributeClick(attributeSet.id, attribute)
                  }
                >
                  <div className="absolute inset-0 border border-gray-200"></div>
                </button>
              ) : (
                <button
                  type="button"
                  key={attributeSet.id + attribute.value}
                  className={`${
                    isModalView
                      ? 'min:w-6 min:h-6 text-sm'
                      : 'min:w-20 min:h-10'
                  } ${
                    isAttributeValueSelected(attributeSet.id, attribute)
                      ? 'bg-text text-white'
                      : 'bg-white'
                  } px-1 flex items-center justify-center transition-colors border border-gray-800 hover:bg-gray-800 hover:text-white`}
                  onClick={() =>
                    handleAttributeClick(attributeSet.id, attribute)
                  }
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
              `${product.prices[0]?.currency.symbol}${product.prices[0]?.amount}`}
          </div>
        </>
      )}

      {!isModalView && product.inStock && (
        <button
          type="button"
          className="w-full mb-8 btn-cta"
          onClick={() => addToCart(product, true, selectedAttributes)}
        >
          Add to Cart
        </button>
      )}

      {!isModalView && (
        <div className="text-sm font-roboto">
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
