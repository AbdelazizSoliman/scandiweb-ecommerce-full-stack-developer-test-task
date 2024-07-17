<?php

namespace App\Models;

class Attribute extends Model
{
    public static function getByProductId($productId)
    {
        $attributes = [];
        $items = (new static)->db->query(
            'SELECT 
                pa.*, 
                a.name as attribute_name, 
                a.type as attribute_type
            FROM 
                product_attributes pa
            JOIN 
                attributes a
            ON 
                pa.attribute_id = a.id 
            WHERE 
                product_id = :productId',
            [
                'productId' => $productId,
            ]
        )->get();

        foreach ($items as $item) {
            $attributeId = $item['attribute_id'];

            if (!isset($attributes[$attributeId])) {
                $attributes[$attributeId] = [
                    'id' => $item['id'],
                    'attribute_id' => $attributeId,
                    'name' => $item['attribute_name'],
                    'type' => $item['attribute_type'],
                    'items' => [],
                ];
            }

            $attributes[$attributeId]['items'][] = [
                'id' => $item['id'],
                'attribute_id' => $attributeId,
                'value' => $item['value'],
                'displayValue' => $item['displayValue'],
            ];
        }

        return $attributes;
    }
}