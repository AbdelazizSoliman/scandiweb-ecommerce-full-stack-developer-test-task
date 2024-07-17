<?php

namespace App\Models;

class Product extends Model
{
    public static function all(?string $category = null): array
    {
        $products = new static();
        $query = 'SELECT * FROM ' . static::$table;
        $params = [];

        if ($category && strtolower($category) !== 'all') {
            $query .= ' WHERE category = :category';
            $params['category'] = $category;
        }

        $products = $products->db->query($query, $params)->get();

        foreach ($products as &$product) {
            self::fetchProductDetails($product);
        }

        return $products;
    }

    public static function find(string $value, ?string $column = null): ?array
    {
        $product = parent::find($value);

        if ($product) {
            self::fetchProductDetails($product);
        }

        return $product;
    }

    private static function fetchProductDetails(&$product)
    {
        $gallery = json_decode($product['gallery'], true);
        $product['gallery'] = $gallery !== null && is_array($gallery) ? $gallery : [];

        $product['prices'] = Price::getByProductId($product['id']);

        $product['attributes'] = Attribute::getByProductId($product['id']);
    }
}