import { Cart } from './';

function ProductCard() {
  return (
    <article className="w-full px-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="p-4 overflow-hidden transition-shadow duration-500 cursor-pointer hover:shadow-xl group">
        <div className="relative mb-6">
          <img
            src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087"
            alt="Running short"
            className="object-cover w-full h-auto"
          />

          <button className="absolute bottom-0 p-2 transition-opacity duration-500 transform translate-y-1/2 rounded-full opacity-0 md:p-3 cta group-hover:opacity-100 right-4">
            <Cart color="white" />
          </button>
        </div>

        <h3 className="text-lg font-light capitalize">Running short</h3>
        <div className="text-lg">$50.00</div>
      </div>
    </article>
  );
}

export default ProductCard;
