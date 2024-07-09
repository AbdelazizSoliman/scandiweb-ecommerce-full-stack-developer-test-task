<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use App\Contracts\GraphQL\Type as IType;
use GraphQL\Type\Definition\ObjectType;

class CategoryType implements IType
{
    public static function define(): ObjectType
    {
        return new ObjectType([
            'name' => 'Category',
            'fields' => [
                'name' => Type::string(),
            ],
        ]);
    }
}