<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessOrder;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $orders = Order::where('user_id', $user->id)->get();
        return response()->json($orders)->withHeaders([
            'Content-Type' => 'application/json'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'address' => 'required|string',
            'phone' => 'required|string',
            'items' => 'required|array'
        ]);

        $user = $request->user();

        $orderData = request(['name', 'phone', 'address']);
        $orderData['total'] =  array_reduce($request->items, fn($sum, $item) => $sum + $item['price'] * $item['amount']);
        $orderData['user_id'] = $user->id;
        $orderData['status'] = 'pending';
        $order = Order::create($orderData);

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

        return response()->json(['success' => true])->withHeaders([
            'Content-Type' => 'application/json'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(int|string $orderId)
    {
        $order = Order::find((int)$orderId);
        return response()->json($order)->withHeaders([
            'Content-Type' => 'application/json'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
