import { gql } from '@apollo/client';

export const PLACE_ORDER = gql`
  mutation PlaceOrder($orderInput: OrderInput!) {
    placeOrder(OrderInput: $orderInput)
  }
`;
