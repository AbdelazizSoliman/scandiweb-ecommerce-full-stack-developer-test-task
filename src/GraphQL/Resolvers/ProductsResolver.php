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

        return $product;
    }
}