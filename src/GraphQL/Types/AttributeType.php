<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use App\Contracts\GraphQL\Type as IType;
use GraphQL\Type\Definition\ObjectType;

class AttributeType implements IType
{
    public static function define(): ObjectType
    {
        return new ObjectType([
            'name' => 'Attribute',
            'fields' => [
                'displayValue' => Type::string(),
                'value' => Type::string(),
                'id' => Type::string(),
            ],
        ]);
    }
}
