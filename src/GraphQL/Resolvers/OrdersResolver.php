<?php

namespace App\GraphQL\Resolvers;

use App\Database;

class OrdersResolver
{
    public static function store(array $args): string
    {
        // Validate required fields
        if (!isset($args['items']) || empty($args['items'])) {
            abort(400, 'Items are required.');
        }

        // Initialize Database connection
        $db = new Database();

        // Start transaction
        $db->beginTransaction();

        try {
            // Create the order and get the order ID
            $orderId = self::createOrder($db);

            // Initialize total amount and currency
            $totalAmount = 0;
            $currency = null;

            foreach ($args['items'] as $item) {
                self::validateItem($db, $item); // Validate item attributes

                // Calculate paid amount and get product details
                $productDetails = self::calculatePaidAmount($db, $item);

                // Insert order item
                self::insertOrderItem($db, $orderId, $productDetails);

                // Update total amount and set currency if not set
                $totalAmount += $productDetails['paidAmount'];
                if ($currency === null) {
                    $currency = $productDetails['paidCurrency'];
                }
            }

            // Update order with total amount and currency
            self::updateOrder($db, $orderId, $totalAmount, $currency);

            // Commit transaction
            $db->commit();

            return "Order placed successfully! Order ID: $orderId";
        } catch (\Exception $e) {
            // Rollback transaction if any error occurs
            $db->rollback();
            throw $e;
        }
    }

    private static function createOrder(Database $db): int
    {
        // Insert order into orders table with placeholder values
        $result = $db->query('INSERT INTO orders (total_amount, total_currency) VALUES (?, ?)', [0, 'USD']);

        if (!$result) {
            abort(500, 'Failed to create order.');
        }

        // Return the last inserted order ID
        return $db->getLastInsertId();
    }

    private static function validateItem(Database $db, array $item): void
    {
        $productId = $item['productId'];
        // Validate productId
        if (!isset($productId)) {
            abort(400, 'Product ID is required.');
        }

        // Check if the product is in stock
        $product = $db->query('SELECT inStock, name FROM products WHERE id = ?', [$productId])
            ->fetch();

        if (!$product) {
            abort(400, 'Product not found.');
        }

        if (!$product['inStock']) {
            abort(400, 'Product is not in stock.');
        }

        // Validate attributeValues
        if (!isset($item['attributeValues']) || empty($item['attributeValues'])) {
            abort(400, 'Attribute values are required.');
        }

        // Iterate over attributeValues and validate each attribute
        foreach ($item['attributeValues'] as $attribute) {
            // Query the database to check if the attribute exists
            $result = $db->query(
                'SELECT COUNT(*) FROM product_attributes WHERE id = ? AND value = ? LIMIT 1',
                [
                    $attribute['id'],
                    $attribute['value']
                ]
            );

            // Check if attribute exists
            if ($result->fetchColumn() == 0) {
                abort(400, "Oops! '{$product['name']}' with '{$attribute['value']}' attribute does not exist or is invalid. Please check and try again.");
            }
        }
    }

    private static function calculatePaidAmount(Database $db, array $item): array
    {
        $productId = $item['productId'];
        $quantity = $item['quantity'] ?? 1;

        // Get product name and price
        $productQuery = $db->query('SELECT name FROM products WHERE id = ?', [$productId]);
        $product = $productQuery->fetch();

        if (!$product) {
            abort(400, 'Product not found.');
        }

        $priceQuery = $db->query('SELECT amount, currency FROM prices WHERE product_id = ?', [$productId]);
        $price = $priceQuery->fetch();

        if (!$price) {
            abort(500, 'Price not found for product.');
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
            'paidCurrency' => $paidCurrency
        ];
    }

    private static function insertOrderItem(Database $db, int $orderId, array $productDetails): void
    {
        $result = $db->query(
            'INSERT INTO order_items (order_id, product_id, product_name, attribute_values, quantity, paid_amount, paid_currency) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                $orderId,
                $productDetails['productId'],
                $productDetails['productName'],
                $productDetails['attributeValues'],
                $productDetails['quantity'],
                $productDetails['paidAmount'],
                $productDetails['paidCurrency']
            ]
        );

        if (!$result) {
            abort(500, 'Failed to insert order item.');
        }
    }

    private static function updateOrder(Database $db, int $orderId, float $totalAmount, string $currency): void
    {
        $result = $db->query(
            'UPDATE orders SET total_amount = ?, total_currency = ? WHERE id = ?',
            [$totalAmount, $currency, $orderId]
        );

        if (!$result) {
            abort(500, 'Failed to update order.');
        }
    }
}