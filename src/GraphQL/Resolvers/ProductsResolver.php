<?php

namespace App\GraphQL\Resolvers;

use App\Database;
use App\Contracts\GraphQL\ResolverContract;

class ProductsResolver implements ResolverContract
{
    public static function resolve(): array
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
}
