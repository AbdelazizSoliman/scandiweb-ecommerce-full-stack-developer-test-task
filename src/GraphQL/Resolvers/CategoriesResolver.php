<?php

namespace App\GraphQL\Resolvers;

use App\Database;

class CategoriesResolver
{
    public static function index(): array
    {
        $db = new Database();
        $categories = $db->query('SELECT * FROM categories')->get();

        return $categories;
    }
}
