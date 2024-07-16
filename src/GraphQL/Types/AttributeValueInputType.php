<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\InputObjectType;

class AttributeValueInputType extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'AttributeValueInput',
            'fields' => [
                'id' => ['type' => Type::nonNull(Type::string())],
                'value' => ['type' => Type::nonNull(Type::string())],
            ],
        ]);
    }
}
