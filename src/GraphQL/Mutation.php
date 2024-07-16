<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\Type;
use App\GraphQL\Types\OrderInputType;
use GraphQL\Type\Definition\ObjectType;

class Mutation
{
    public static function defineMutations()
    {
        return new ObjectType([
            'name' => 'Mutation',
            'fields' => [
                'sum' => [
                    'type' => Type::int(),
                    'args' => [
                        'x' => ['type' => Type::int()],
                        'y' => ['type' => Type::int()],
                    ],
                    'resolve' => static fn ($calc, array $args): int => $args['x'] + $args['y'],
                ],
                'placeOrder' => [
                    'type' => Type::string(),
                    'args' => [
                        'OrderInput' => Type::nonNull(new OrderInputType()),
                    ],
                    'resolve' => static fn ($rootValue, array $args) => Resolvers\OrdersResolver::store($args['OrderInput']),
                ],
            ],
        ]);
    }
}
