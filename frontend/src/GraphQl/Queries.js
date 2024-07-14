import { gql } from '@apollo/client';

export const getCategoriesQuery = gql`
  query {
    categories {
      name
    }
  }
`;

export const getProductsQuery = gql`
  query {
    products {
      id
      name
      inStock
      gallery
      description
      brand
      prices {
        amount
        currency
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
    }
  }
`;

export const getProductQuery = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      brand
      prices {
        amount
        currency
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
    }
  }
`;
