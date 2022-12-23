<?php

namespace Database\Seeders;

use App\Models\Ticket;
use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i <= 50; ++$i) {
            \App\Models\Ticket::create([
                'title' => fake()->title(),
                'order' => rand(1, 10),
                'message' => fake()->text()
            ]);
        }
    }
}
