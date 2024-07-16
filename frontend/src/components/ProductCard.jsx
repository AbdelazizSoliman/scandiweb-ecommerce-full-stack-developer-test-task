import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Cart } from './';
import searchingImg from '../assets/search.svg';
import { useDataContext } from '../DataContext';

function ProductCard({ product = {} }) {
  const { addToCart } = useDataContext();

  return (
    <article
      className="w-full px-4 sm:w-1/2 md:w-1/3 lg:w-1/4"
      data-testid={`cart-item-attribute-${product.name
        .replace(/\s+/g, '-')
        .toLowerCase()}`}
    >
      <div className="p-4 overflow-hidden transition-shadow duration-500 hover:shadow-xl group">
        <div className="relative mb-6">
          <Link to={`/products/${product.id}`}>
            <div className="relative min-h-52">
              <img
                src={product.gallery[0] ?? searchingImg}
                alt={product.name}
                loading="lazy"
                className="object-cover w-full h-auto"
              />
              {!product.inStock && (
                <div className="absolute inset-0 flex items-center justify-center px-2 py-1 text-2xl uppercase bg-white bg-opacity-70 text-muted">
                  Out of Stock
                </div>
              )}
            </div>
          </Link>

          {product.inStock && (
            <button
              onClick={() => addToCart(product)}
              className="absolute bottom-0 p-2 transition-opacity duration-300 transform translate-y-1/2 rounded-full opacity-0 cta group-hover:opacity-100 right-4"
            >
              <Cart color="white" className="w-5 h-5" />
            </button>
          )}
        </div>

        <h3 className="text-lg font-light capitalize">{product.name}</h3>
        <div className={`${!product.inStock ? 'text-muted ' : ''}text-lg`}>
          {product.prices[0]?.currency?.symbol} {product.prices[0]?.amount}
        </div>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    inStock: PropTypes.bool.isRequired,
    gallery: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    prices: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.string.isRequired,
        currency: PropTypes.shape({
          label: PropTypes.string.isRequired,
          symbol: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    category: PropTypes.string.isRequired,
    attributes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            displayValue: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default ProductCard;
