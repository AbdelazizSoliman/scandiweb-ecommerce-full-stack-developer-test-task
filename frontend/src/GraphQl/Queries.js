import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
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
      attribute_id
      value
      displayValue
    }
  }
`;

export const GET_PRODUCTS = gql`
  query ($category: String) {
    products(category: $category) {
      ${getProductFields}
    }
  }
`;

export const GET_SINGLE_PRODUCT = gql`
  query ($id: String!) {
    product(id: $id) {
      ${getProductFields}
    }
  }
`;

export const GET_CATEGORIES_AND_PRODUCTS = gql`
  query ($category: String) {
    categories {
      name
    }
    products(category: $category) {
      ${getProductFields}
    }
  }
`;
