import { gql } from '@apollo/client';

export const getCategoriesQuery = gql`
  query {
    categories {
      name
    }
  }
`;

const getProductFields = `
  id
  name
  inStock
  gallery
  description
  brand
  prices {
    amount
    currency {
      label
      symbol
    }
  }
  category
  attributes {
    id
    name
    type
    items {
      id
      value
      displayValue
    }
  }
`;

export const getProductsQuery = gql`
  query ($category: String) {
    products(category: $category) {
      ${getProductFields}
    }
  }
`;

export const getProductQuery = gql`
  query ($id: String!) {
    product(id: $id) {
      ${getProductFields}
    }
  }
`;

export const getCategoriesAndProductsQuery = gql`
  query getCategoriesAndProducts($category: String) {
    categories {
      name
    }
    products(category: $category) {
      ${getProductFields}
    }
  }
`;
