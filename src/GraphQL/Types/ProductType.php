<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use App\Contracts\GraphQL\Type as IType;
use GraphQL\Type\Definition\ObjectType;

class ProductType implements IType
{
    public static function define(): ObjectType
    {
        return new ObjectType([
            'name' => 'Product',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'inStock' => Type::boolean(),
                'gallery' => Type::listOf(Type::string()),
                'description' => Type::string(),
                'category' => Type::string(),
                'brand' => Type::string(),
            ],
        ]);
    }
}
