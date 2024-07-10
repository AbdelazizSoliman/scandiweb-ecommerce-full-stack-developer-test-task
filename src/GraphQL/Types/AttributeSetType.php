<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use App\Contracts\GraphQL\Type as IType;
use GraphQL\Type\Definition\ObjectType;

class AttributeSetType implements IType
{
    public static function define(): ObjectType
    {
        return new ObjectType([
            'name' => 'AttributeSet',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'type' => Type::string(),
                'items' => Type::listOf(AttributeType::define()),
            ],
        ]);
    }
}