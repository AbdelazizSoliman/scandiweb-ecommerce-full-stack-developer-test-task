<?php

namespace App\Models;

class Price extends Model
{
    public static function getByProductId($productId)
    {
        $prices = (new static)->db->query(
            'SELECT 
                p.amount, c.label, c.symbol 
            FROM 
                prices p
            JOIN
                currencies c
            ON
                p.currency = c.label
            WHERE
                p.product_id = :productId',
            [
                'productId' => $productId,
            ]
        )->get();

        $productPrices = [];
        foreach ($prices as $price) {
            $productPrices[] = [
                'amount' => number_format($price['amount'], 2, thousands_separator: ''),
                'currency' => [
                    'label' => $price['label'],
                    'symbol' => $price['symbol'],
                ],
            ];
        }

        return $productPrices;
    }
}