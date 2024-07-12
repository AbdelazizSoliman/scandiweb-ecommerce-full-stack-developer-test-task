import { Cart } from './';

function ProductCard() {
  return (
    <article className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4">
      <div className="p-4 overflow-hidden hover:shadow-xl transition-shadow duration-500 cursor-pointer group">
        <div className="relative mb-6">
          <img
            src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087"
            alt=""
            className="w-full h-auto"
          />

          <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute bottom-0 right-4 transform translate-y-1/2 bg-accent text-white p-2 rounded-full">
            <Cart />
          </button>
        </div>

        <h3 className="font-light text-lg capitalize">Running short</h3>
        <h2 className="text-lg">$50.00</h2>
      </div>
    </article>
  );
}

export default ProductCard;
