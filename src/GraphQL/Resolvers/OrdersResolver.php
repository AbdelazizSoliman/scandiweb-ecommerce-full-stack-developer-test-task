<?php

namespace App\GraphQL\Resolvers;

use App\Models\Order;
use App\Database;
use App\Models\OrderItem;

class OrdersResolver
{
    public static function store(array $args): string
    {
        if (empty($args['items'])) {
            abort(400, 'Items are required');
        }

        $db = new Database();
        $db->beginTransaction();

        try {
            $orderResult = Order::create($db);
            if (!$orderResult['success']) {
                abort(500, $orderResult['error']);
            }
            $orderId = $orderResult['orderId'];

            $totalAmount = 0;
            $currency = null;

            foreach ($args['items'] as $item) {
                self::validateItemAttributes($db, $item);

                $productDetails = self::calculatePaidAmount($db, $item);

                $insertItemResult = OrderItem::insertItem($db, $orderId, $productDetails);
                if (!$insertItemResult['success']) {
                    abort(500, $insertItemResult['error']);
                }
                $totalAmount += $productDetails['paidAmount'];
                if ($currency === null) {
                    $currency = $productDetails['paidCurrency'];
                }
            }

            $updateOrderResult = Order::update($db, $orderId, $totalAmount, $currency);
            if (!$updateOrderResult['success']) {
                abort(500, $updateOrderResult['error']);
            }

            $db->commit();

            return "Order placed successfully! Order ID: $orderId";
        } catch (\Exception $e) {
            $db->rollback();
            throw $e;
        }
    }

    private static function validateItemAttributes(Database $db, array $item): void
    {
        $productId = $item['productId'];

        if (!isset($productId)) {
            abort(400, 'Product ID is required');
        }

        $product = $db->query('SELECT inStock, name FROM products WHERE id = ?', [$productId])->fetch();

        if (!$product) {
            abort(400, 'Product not found');
        }

        if (!$product['inStock']) {
            abort(400, "Unfortunately, '{$product['name']}' is out of stock. Please check back later.");
        }

        $attributeCount = $db->query(
            'SELECT COUNT(DISTINCT attribute_id) FROM product_attributes WHERE product_id = ?',
            [$productId]
        )->fetchColumn();

        if (!isset($item['attributeValues']) || $attributeCount !== count($item['attributeValues'])) {
            abort(400, 'Attribute values are required');
        }

        // iterate over attributeValues and validate each attribute exists
        foreach ($item['attributeValues'] as $attribute) {
            $result = $db->query(
                'SELECT COUNT(*) FROM product_attributes WHERE id = ? AND value = ? LIMIT 1',
                [$attribute['id'], $attribute['value']]
            );

            if ($result->fetchColumn() == 0) {
                abort(400, "Oops! '{$product['name']}' with '{$attribute['value']}' attribute does not exist or is invalid. Please check and try again.");
            }
        }
    }

    private static function calculatePaidAmount(Database $db, array $item): array
    {
        $productId = $item['productId'];
        $quantity = $item['quantity'] ?? 1;

        $productQuery = $db->query('SELECT name FROM products WHERE id = ?', [$productId]);
        $product = $productQuery->fetch();

        if (!$product) {
            abort(400, 'Product not found');
        }

        $priceQuery = $db->query('SELECT amount, currency FROM prices WHERE product_id = ?', [$productId]);
        $price = $priceQuery->fetch();

        if (!$price) {
            abort(500, 'Price not found for product');
        }

        $paidAmount = $price['amount'] * $quantity;
        $paidCurrency = $price['currency'];

        $formattedAttributeValues = [];
        foreach ($item['attributeValues'] as $attribute) {
            $formattedAttributeValues[strtolower($attribute['id'])] = $attribute['value'];
        }
        $attributeValuesJson = json_encode([$formattedAttributeValues]);

        return [
            'productId' => $productId,
            'productName' => $product['name'],
            'attributeValues' => $attributeValuesJson,
            'quantity' => $quantity,
            'paidAmount' => $paidAmount,
            'paidCurrency' => $paidCurrency,
        ];
    }
}