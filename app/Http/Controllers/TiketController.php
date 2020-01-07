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

    public function addProcess(Request $request) {
        $data = [
            'userid' => $request->session()->get('logins'),
            'lowonganid' => $request->lowonganid
        ];

        $insert = TiketModel::insertData($data);

        if ($insert) {
            return response()->json(['goal' => true]);
        } else {
            return response()->json(['goal' => false]);
        }
    }

    public function checkTiket(Request $request) {
        $check = TiketModel::getSingleData($request->lowonganid, $request->session()->get('logins'));
        
        if ($check) {
            return response()->json(['goal' => true]);
        } else {
            return response()->json(['goal' => false]);
        }
    }
}
