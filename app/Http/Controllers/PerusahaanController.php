<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PerusahaanModel;

class PerusahaanController extends Controller
{
    public function table(Request $request) {
        $data = PerusahaanModel::getData();
        
        return response()->json($data);
    }

    public function addProcess(Request $request) {
        $data_insert = [
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'email' => $request->email,
            'notelp' => $request->notelp,
            'nama_hrd' => $request->nama_hrd,
            'notelp_hrd' => $request->notelp_hrd
        ];
        
        $insert = PerusahaanModel::insertData($data_insert);
        
        if ($insert) {
            return response()->json(['goal'=>true]);
        } else {
            return response()->json(['goal'=>false]);
        }
    }

    public function getUser($id) {
        $data = PerusahaanModel::getData($id);

        return response()->json($data);
    }

    public function editProcess(Request $request) {
        $data_update = [
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'email' => $request->email,
            'notelp' => $request->notelp,
            'nama_hrd' => $request->nama_hrd,
            'notelp_hrd' => $request->notelp_hrd
        ];
        
        $update = PerusahaanModel::updateData($data_update, $request->id);
        
        if ($update) {
            return response()->json(['goal'=>true]);
        } else {
            return response()->json(['goal'=>false]);
        }
    }

    public function deleteProcess(Request $request){
        $delete = PerusahaanModel::deleteData($request->dataid);

        if ($delete) {
            return response()->json(['goal'=>true]);
        } else {
            return response()->json(['goal'=>false]);
        }
    }
}
