// import { Component } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getProductQuery } from '../GraphQl/Queries';
import {
  Error,
  Loading,
  ProductAttributes,
  ProductImageCarousel,
} from '../components';
import ErrorScreen from './ErrorScreen';

function ProductDetail() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(getProductQuery, {
    variables: { id },
  });

  if (error) {
    return error.networkError ? (
      <Error
        statusCode={error.networkError.statusCode}
        message="Item not found"
      />
    ) : (
      <ErrorScreen />
    );
  }

  if (loading) {
    return <Loading />;
  }

  const { product } = data;

  return (
    <main className="flex flex-col items-start mt-14 md:flex-row">
      <ProductImageCarousel images={product.gallery} alt={product.name} />

      <ProductAttributes className="md:w-1/3 md:pl-4" product={product}>
        {product.inStock ? (
          <button type="button" className="w-full mb-8 btn-cta">
            Add to Cart
          </button>
        ) : null}
      </ProductAttributes>
    </main>
  );
}

export default ProductDetail;
