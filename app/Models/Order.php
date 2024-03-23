<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\OrderStatus;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'phone',
        'address',
        'total',
        'status'
    ];

    public $incrementing = true;

    public $timestamps = true;

    public function setStatus(OrderStatus $status): void
    {
        $this->status = $status->value;
    }

}
