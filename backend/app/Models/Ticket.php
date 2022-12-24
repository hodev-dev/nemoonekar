<?php

namespace App\Models;

use Morilog\Jalali\Jalalian;
use Hekmatinasser\Verta\Facades\Verta;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ticket extends Model
{
    use HasFactory;
    public $fillable = [
        'title',
        'message',
        'order',
        'time'
    ];
}
