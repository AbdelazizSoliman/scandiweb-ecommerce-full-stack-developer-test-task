<?php

namespace App\Models;

use App\Database;

class OrderItem extends Model
{
    protected static string $table = 'order_items';

    public static function insertItem(Database $db, int $orderId, array $productDetails): array
    {
        $result = $db->query(
            'INSERT INTO ' .
                static::$table .
                ' (order_id, product_id, product_name, attribute_values, quantity, paid_amount, paid_currency) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                $orderId,
                $productDetails['productId'],
                $productDetails['productName'],
                $productDetails['attributeValues'],
                $productDetails['quantity'],
                $productDetails['paidAmount'],
                $productDetails['paidCurrency'],
            ]
        );

        if (!$result) {
            return [
                'success' => false,
                'error' => 'Failed to insert order item.'
            ];
        }

        return [
            'success' => true
        ];
    }
}