<?php

namespace App\GraphQL\Resolvers;

use App\Database;
use App\Contracts\GraphQL\Resolver;

class ProductsResolver implements Resolver
{
    public static function index(): array
    {
        $db = new Database();
        $products = $db->query('SELECT * FROM products')->get();

        // Parse the JSON 'gallery' field for each product
        foreach ($products as &$product) {
            $gallery = json_decode($product['gallery'], true);
            $product['gallery'] = $gallery !== null && is_array($gallery) ? $gallery : [];

            // Fetch related prices for the product
            $prices = $db->query('SELECT * FROM prices WHERE product_id = :productId', [
                'productId' => $product['id'],
            ])->get();
            $product['prices'] = $prices;

            // Fetch related attributes and items for the product
            $items = $db->query('SELECT pa.*, a.name as attribute_name, a.type as attribute_type FROM product_attributes pa JOIN attributes a ON pa.attribute_id = a.id WHERE product_id = :productId', [
                'productId' => $product['id'],
            ])->get();

            $attributes = [];
            foreach ($items as $item) {
                $attributeId = $item['attribute_id'];
                // If attribute not yet added, initialize it
                if (!isset($attributes[$attributeId])) {
                    $attributes[$attributeId] = [
                        'id' => $item['attribute_id'],
                        'name' => $item['attribute_name'],
                        'type' => $item['attribute_type'],
                        'items' => [],
                    ];
                }
                // Append item details to the attribute's items
                $attributes[$attributeId]['items'][] = [
                    'id' => $item['id'],
                    'value' => $item['value'],
                    'displayValue' => $item['displayValue'],
                ];
            }

            $product['attributes'] = $attributes;
        }

        return $products;
    }

    public static function show($productId): array
    {
        $db = new Database();
        $product = $db->query('SELECT * FROM products where id = :id LIMIT 1', [
            "id" => $productId,
        ])->findOrFail();

        $gallery = json_decode($product['gallery'], true);
        $product['gallery'] = $gallery !== null && is_array($gallery) ? $gallery : [];

        // Fetch related prices for the product
        $prices = $db->query('SELECT * FROM prices WHERE product_id = :productId', [
            'productId' => $productId
        ])->get();
        $product['prices'] = $prices;

        // Fetch related attributes and items for the product
        $items = $db->query('SELECT pa.*, a.name as attribute_name, a.type as attribute_type FROM product_attributes pa JOIN attributes a ON pa.attribute_id = a.id WHERE product_id = :productId', [
            'productId' => $productId,
        ])->get();

        $attributes = [];
        foreach ($items as $item) {
            $attributeId = $item['attribute_id'];
            // If attribute not yet added, initialize it
            if (!isset($attributes[$attributeId])) {
                $attributes[$attributeId] = [
                    'id' => $item['attribute_id'],
                    'name' => $item['attribute_name'],
                    'type' => $item['attribute_type'],
                    'items' => [],
                ];
            }
            // Append item details to the attribute's items
            $attributes[$attributeId]['items'][] = [
                'id' => $item['id'],
                'value' => $item['value'],
                'displayValue' => $item['displayValue'],
            ];
        }

        $product['attributes'] = $attributes;

        return $product;
    }
}