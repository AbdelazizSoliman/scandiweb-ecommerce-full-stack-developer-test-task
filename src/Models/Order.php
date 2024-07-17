<?php

namespace App\Models;

use App\Database;

class Order extends Model
{
    protected static string $table = 'orders';

    public static function create(Database $db): array
    {
        $result = $db->query(
            'INSERT INTO ' . static::$table . ' (total_amount, total_currency) VALUES (?, ?)',
            [0, 'USD']
        );

        if (!$result) {
            return [
                'success' => false,
                'error' => 'Failed to create order'
            ];
        }

        return [
            'success' => true,
            'orderId' => $db->getLastInsertId()
        ];
    }

    public static function update(Database $db, int $orderId, float $totalAmount, string $currency): array
    {
        $result = $db->query(
            'UPDATE ' . static::$table . ' SET total_amount = ?, total_currency = ? WHERE id = ?',
            [$totalAmount, $currency, $orderId]
        );

        if (!$result) {
            return [
                'success' => false,
                'error' => 'Failed to update order'
            ];
        }

        return [
            'success' => true
        ];
    }
}