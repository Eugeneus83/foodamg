<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function products()
    {
        return $this->hasMany(OrderProduct::class);
    }

}
