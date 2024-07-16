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

        foreach ($products as &$product) {
            self::fetchProductDetails($product);
        }

        return $products;
    }

    public static function show(string $productId): array
    {
        $db = new Database();
        $product = $db->query('SELECT * FROM products where id = :id LIMIT 1', [
            "id" => $productId,
        ])->findOrFail();

        self::fetchProductDetails($product);

        return $product;
    }

    private static function fetchProductDetails(&$product): void
    {
        $db = new Database();

        // Parse the JSON 'gallery' field for each product
        $gallery = json_decode($product['gallery'], true);
        $product['gallery'] = $gallery !== null && is_array($gallery) ? $gallery : [];

        // Fetch related prices for the product
        $prices = $db->query('
        SELECT p.amount, c.label , c.symbol 
        FROM prices p
        JOIN currencies c ON p.currency = c.label
        WHERE p.product_id = :productId
    ', [
            'productId' => $product['id'],
        ])->get();

        $productPrices = [];
        foreach ($prices as $price) {
            $productPrices[] = [
                'amount' => number_format($price['amount'], 2, thousands_separator: ''),
                'currency' => [
                    'label' => $price['label'],
                    'symbol' => $price['symbol'],
                ],
            ];
        }
        $product['prices'] = $productPrices;

        $attributes = [];
        // Fetch related attributes and items for the product
        $items = $db->query(
            'SELECT 
                pa.*, 
                a.name as attribute_name, 
                a.type as attribute_type
            FROM 
                product_attributes pa
            JOIN 
                attributes a
            ON 
                pa.attribute_id = a.id 
            WHERE 
                product_id = :productId',
            ['productId' => $product['id']]
        )->get();

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
}
