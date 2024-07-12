import PropTypes from 'prop-types';

function ProductAttributes({ item, children, className, isModalView = false }) {
  const totalPrice = item.price
    ? parseFloat(item.price) * (item.quantity ?? 1)
    : null;

  return (
    <div className={`${className}`}>
      <h2
        className={isModalView ? 'capitalize font-light text-lg' : 'heading-h1'}
      >
        {item.name}
      </h2>

      {isModalView && <div className="my-2 font-bold">{totalPrice}</div>}

      {item.attributes?.map((attribute) => (
        <div key={attribute.type} className="mt-4">
          <h3
            className={`${
              isModalView ? 'font-sm' : 'font-bold uppercase'
            } capitalize mb-1`}
          >
            {attribute.type}:
          </h3>

          <div
            className={`${
              isModalView ? 'gap-x-2' : 'gap-x-3'
            } flex flex-wrap gap-y-2`}
          >
            {attribute.values.map((value) =>
              attribute.type.toLowerCase() === 'color' ? (
                <button
                  type="button"
                  key={attribute.type + value}
                  className={`relative ${
                    isModalView ? 'w-5 h-5' : 'w-8 h-8'
                  } border transition-colors border-white hover:border-primary`}
                  style={{ backgroundColor: value }}
                >
                  <div className="absolute inset-0 border border-white"></div>
                </button>
              ) : (
                <button
                  type="button"
                  key={attribute.type + value}
                  className={`${
                    isModalView ? 'w-6 h-6 text-sm' : 'w-20 h-10'
                  } flex items-center justify-center transition-colors bg-white border border-gray-800 hover:bg-gray-800 hover:text-white`}
                >
                  {value}
                </button>
              )
            )}
          </div>
        </div>
      ))}

      {!isModalView && (
        <>
          <h3 className="mt-4 mb-1 font-bold uppercase font-roboto">Price:</h3>
          <div className="heading-h2">{item.price}</div>
        </>
      )}

      {children}

      {!isModalView && (
        <p className="text-sm font-roboto">{item.description}</p>
      )}
    </div>
  );
}

ProductAttributes.propTypes = {
  item: PropTypes.object.isRequired,
  children: PropTypes.element,
  className: PropTypes.string,
  isModalView: PropTypes.bool,
};

export default ProductAttributes;
