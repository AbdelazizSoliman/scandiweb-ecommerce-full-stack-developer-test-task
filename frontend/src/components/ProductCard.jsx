import { Link } from 'react-router-dom';
import { Cart } from './';

function ProductCard() {
  return (
    <article className="w-full px-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="p-4 overflow-hidden transition-shadow duration-500 cursor-pointer hover:shadow-xl group">
        <div className="relative mb-6">
          <Link to="/products/123">
            <img
              src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087"
              alt="Running shoe"
              className="object-cover w-full h-auto"
            />
          </Link>

          <button
            onClick={() => console.log('Add to cart')}
            className="absolute bottom-0 p-2 transition-opacity duration-300 transform translate-y-1/2 rounded-full aaopacity-0 cta aagroup-hover:opacity-100 right-4"
          >
            <Cart color="white" className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-lg font-light capitalize">Running shoe</h3>
        <div className="text-lg">$50.00</div>
      </div>
    </article>
  );
}

export default ProductCard;
