import { ProductAttributes } from '../components';

function ProductDetail() {
  // Dummy data for items in the cart
  const item = {
    id: 1,
    name: 'Item 1',
    price: 50,
    attributes: [
      { type: 'size', values: ['XS', 'S', 'M', 'L'] },
      { type: 'color', values: ['#FF0000', '#0000FF', '#00FF00'] },
    ],
    quantity: 2,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi natus ipsa nam pariatur perferendis in, eaque commodi, impedit dolor labore, adipisci ab laboriosam? Tempora, facere aliquid totam eius earum quibusdam?',
    image:
      'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png',
  };

  return (
    <main className="flex flex-col items-start mt-14 md:flex-row">
      <div className="md:w-2/3">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full max-h-96"
        />
      </div>

      <ProductAttributes className="md:w-1/3 md:pl-4" item={item}>
        <button className="w-full mb-8 btn-cta">Add to Cart</button>
      </ProductAttributes>
    </main>
  );
}

export default ProductDetail;
