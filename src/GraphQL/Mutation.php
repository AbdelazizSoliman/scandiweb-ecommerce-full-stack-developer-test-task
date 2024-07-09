<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

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
            ],
        ]);
    }
}
