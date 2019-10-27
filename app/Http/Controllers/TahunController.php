<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\TahunModel;

class TahunController extends Controller
{
    public function table(Request $request) {
        $data = TahunModel::getData();
        
        return response()->json($data);
    }

    public function addProcess(Request $request) {
        $data_insert = [
            'tahun' => $request->tahun
        ];
        
        $insert = TahunModel::insertData($data_insert);
        
        if ($insert) {
            return response()->json(['goal'=>true]);
        } else {
            return response()->json(['goal'=>false]);
        }
    }

    public function getUser($id) {
        $data = TahunModel::getData($id);

        return response()->json($data);
    }

    public function editProcess(Request $request) {
        $data_update = [
            'Tahun' => $request->tahun
        ];
        
        $update = TahunModel::updateData($data_update, $request->id);
        
        if ($update) {
            return response()->json(['goal'=>true]);
        } else {
            return response()->json(['goal'=>false]);
        }
    }

    public function deleteProcess(Request $request){
        $delete = TahunModel::deleteData($request->dataid);

        if ($delete) {
            return response()->json(['goal'=>true]);
        } else {
            return response()->json(['goal'=>false]);
        }
    }
}
