<?php

namespace App\GraphQL\Resolvers;

class OrdersResolver
{
    public static function store(array $args): string
    {
        // dd($args);

        return 'Order placed successfully!';
    }
}
