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
                'categories' => [
                    'type' => Type::listOf(Types\CategoryType::define()),
                    'resolve' => static fn () => Resolvers\CategoriesResolver::index(),
                ],
                'products' => [
                    'type' => Type::listOf(Types\ProductType::define()),
                    'args' => [
                        'category' => ['type' => Type::string()],
                    ],
                    'resolve' => static fn ($rootValue, array $args) => Resolvers\ProductsResolver::index($args['category'] ?? null),
                ],
                'product' => [
                    'type' => Types\ProductType::define(),
                    'args' => [
                        'id' => ['type' => Type::nonNull(Type::string())],
                    ],
                    'resolve' => static fn ($rootValue, array $args) => Resolvers\ProductsResolver::show($args['id']),
                ],
            ],
        ]);
    }
}
