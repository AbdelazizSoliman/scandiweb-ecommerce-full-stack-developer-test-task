<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class Query
{
    public static function defineQueries()
    {
        return new ObjectType([
            'name' => 'Query',
            'fields' => [
                'echo' => [
                    'type' => Type::string(),
                    'args' => [
                        'message' => ['type' => Type::string()],
                    ],
                    'resolve' => static fn ($rootValue, array $args): string => $rootValue['prefix'] . $args['message'],
                ],
                'products' => [
                    'type' => Type::listOf(Types\ProductType::define()),
                    'resolve' => static fn () => Resolvers\ProductsResolver::resolve(),
                ],
            ],
        ]);
    }
}
