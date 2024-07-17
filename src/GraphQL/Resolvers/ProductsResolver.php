<?php

namespace App\GraphQL\Resolvers;

use App\Models\Product;

class ProductsResolver
{
    public static function index(?string $category = null): array
    {
        return Product::all($category);
    }

    public static function show(string $productId): array
    {
        return Product::find($productId);
    }
}