<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserModel;

class UserController extends Controller
{
    public function table(Request $request) {
        $data = UserModel::getData();
        
        return response()->json($data);
    }

    public function addProcess(Request $request) {
        $data_insert = [
            'nama' => $request->nama,
            'username' => $request->username,
            'password' => $request->password,
            'tipeid' => $request->tipe,
            'jurusanid' => $request->jurusan,
            'thn_ajaran' => $request->tahun,
            'perusahaanid' => $request->perusahaan
        ];
        
        $insert = UserModel::insertData($data_insert);
        
        if ($insert) {
            return response()->json(['goal'=>true]);
        } else {
            return response()->json(['goal'=>false]);
        }
    }

    public function getUser($id) {
        $data = UserModel::getData($id);

        return response()->json($data);
    }

    public function editProcess(Request $request) {
        $data_update = [
            'nama' => $request->nama,
            'username' => $request->username,
            'password' => $request->password,
            'tipeid' => $request->tipe,
            'jurusanid' => $request->jurusan,
            'thn_ajaran' => $request->tahun,
            'perusahaanid' => $request->perusahaan
        ];
        
        $update = UserModel::updateData($data_update, $request->id);
        
        if ($update) {
            return response()->json(['goal'=>true]);
        } else {
            return response()->json(['goal'=>false]);
        }
    }

    public function deleteProcess(Request $request){
        $delete = UserModel::deleteData($request->userid);

        if ($delete) {
            return response()->json(['goal'=>true]);
        } else {
            return response()->json(['goal'=>false]);
        }
    }
}
