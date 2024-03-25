<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderProduct;
use App\Enums\OrderStatus;

class OrderService
{
    public function createOrder(array $orderData): Order
    {
        $orderData['total'] = array_reduce($orderData['items'], fn($sum, $item) => $sum + $item['price'] * $item['amount']);

        $order = new Order();
        $order->fill($orderData);
        $order->setStatus(OrderStatus::PENDING);
        $order->save();

        if (isset($orderData['items'])) {
            foreach ($orderData['items'] as $item) {
                OrderProduct::create([
                    'product_id' => $item['id'],
                    'order_id' => $order->id,
                    'amount' => $item['amount']
                ]);
            }
        }

        return $order;
    }
}
