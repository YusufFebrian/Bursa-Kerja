<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\TiketModel;

class TiketController extends Controller
{
    public function table(Request $request) {
        $tiket = TiketModel::getData();

        return response()->json(['tiket'=>$tiket]);
    }
}
