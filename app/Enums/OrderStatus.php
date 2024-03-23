<?php

namespace App\Enums;

Enum OrderStatus: string
{
    case PENDING  = 'pending';
    case PROCESSED = 'processed';
}
