<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Hekmatinasser\Verta\Facades\Verta;

class TicketController extends Controller
{
    public function list_tickets()
    {
        return Ticket::orderBy('id', 'desc')->paginate(20);
    }

    public function list_ticket(Request $request)
    {
        return Ticket::where('id', $request->id)->first();
    }

    public function add_ticket(Request $request)
    {
        $ticket = Ticket::create([
            'title' => $request->title,
            'message' => $request->message,
            'order' => 1,
            'time' => Verta::now()->format('Y-n-j H:i')
        ]);
        return response()->json($ticket);
    }

    public function edit_ticket(Request $request)
    {
        return Ticket::whereId($request->id)->update($request->all());
    }

    public function delete_ticket(Request $request)
    {
        Ticket::where('id', $request->id)->delete();
    }
}
