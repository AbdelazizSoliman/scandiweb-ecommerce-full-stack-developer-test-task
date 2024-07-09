<?php

namespace App\GraphQL\Resolvers;

use App\Database;
use App\Contracts\GraphQL\Resolver;

class ProductsResolver implements Resolver
{
    public static function index(): array
    {
        $dbConfig = require base_path('src/config/database.php');
        $db = new Database($dbConfig);
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
        $dbConfig = require base_path('src/config/database.php');
        $db = new Database($dbConfig);

        $product = $db->query('SELECT * FROM products where id = :id LIMIT 1', [
            "id" => $productId,
        ])->findOrFail();

        $gallery = json_decode($product['gallery'], true);
        $product['gallery'] = $gallery !== null && is_array($gallery) ? $gallery : [];

        return $product;
    }
}
