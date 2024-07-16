<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\InputObjectType;

class OrderItemInputType extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderItemInput',
            'fields' => [
                'productId' => ['type' => Type::nonNull(Type::string())],
                'quantity' => ['type' => Type::nonNull(Type::int())],
                'attributeValues' => [
                    'type' => Type::listOf(new AttributeValueInputType())
                ],
            ],
        ]);
    }
}
