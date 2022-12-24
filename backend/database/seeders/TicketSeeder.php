<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Faker\Factory;
use App\Models\Ticket;
use Illuminate\Database\Seeder;
use Hekmatinasser\Verta\Facades\Verta;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::create([
            'name' => 'test',
            'email' => 'test@mail.com',
            'password' => Hash::make('123456'),
        ]);
        for ($i = 0; $i <= 50; ++$i) {
            \App\Models\Ticket::create([
                'title' => fake()->title(),
                'order' => rand(1, 10),
                'message' => fake()->text(),
                'time' => Verta::now()->format('Y-n-j H:i')
            ]);
        }
    }
}
