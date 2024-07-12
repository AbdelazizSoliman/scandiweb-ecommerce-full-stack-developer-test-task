import { Component } from 'react';
import { ProductAttributes, ProductImageCarousel } from '../components';

class ProductDetail extends Component {
  render() {
    // Sample product data from API
    const product = {
      id: 'huarache-x-stussy-le',
      name: 'Nike Air Huarache Le',
      prices: [
        {
          amount: 144.69,
          currency: {
            label: 'USD',
            symbol: '$',
          },
        },
      ],
      attributes: [
        {
          id: 'Size',
          items: [
            {
              displayValue: '40',
              value: '40',
            },
            {
              displayValue: '41',
              value: '41',
            },
            {
              displayValue: '42',
              value: '42',
            },
            {
              displayValue: '43',
              value: '43',
            },
          ],
        },
      ],
      description: '<p>Great sneakers for everyday use!</p>',
      gallery: [
        'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087',
        'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087',
        'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087',
        'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087',
        'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087',
      ],
    };

    return (
      <main className="flex flex-col items-start mt-14 md:flex-row">
        <ProductImageCarousel images={product.gallery} alt={product.name} />

        <ProductAttributes className="md:w-1/3 md:pl-4" product={product}>
          <button type="button" className="w-full mb-8 btn-cta">
            Add to Cart
          </button>
        </ProductAttributes>
      </main>
    );
  }
}

export default ProductDetail;
