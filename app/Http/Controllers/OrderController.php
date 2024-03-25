<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Jobs\ProcessOrder;
use App\Models\Order;
use App\Models\OrderProduct;
use Illuminate\Http\Request;
use App\Enums\OrderStatus;
use \Illuminate\Http\JsonResponse;
use App\Http\Requests\StoreOrderRequest;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $orders = Order::where('user_id', $user->id)->get();
        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreOrderRequest $request): JsonResponse
    {
        $user = $request->user();
        $orderData = request(['name', 'phone', 'address']);
        $orderData['total'] = array_reduce($request->items, fn($sum, $item) => $sum + $item['price'] * $item['amount']);
        $orderData['user_id'] = $user->id;

        $order = new Order();
        $order->fill($orderData);
        $order->setStatus(OrderStatus::PENDING);
        $order->save();

        if ($order) {
            foreach ($request->items as $item) {
                OrderProduct::create([
                    'product_id' => $item['id'],
                    'order_id' => $order->id,
                    'amount' => $item['amount']
                ]);
            }
        }

        ProcessOrder::dispatch($order)->delay(now()->addMinutes(3));

        return response()->json(['success' => true]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order): JsonResponse
    {
        return response()->json($order);
    }
}
