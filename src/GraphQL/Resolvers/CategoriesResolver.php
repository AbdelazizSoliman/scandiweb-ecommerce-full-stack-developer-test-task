<?php

namespace App\GraphQL\Resolvers;

use App\Database;
use App\Contracts\GraphQL\Resolver;

class CategoriesResolver implements Resolver
{
    public static function index(): array
    {
        $db = new Database();
        $categories = $db->query('SELECT * FROM categories')->get();

        return $categories;
    }
}