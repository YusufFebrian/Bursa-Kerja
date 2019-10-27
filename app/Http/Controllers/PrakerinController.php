<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PrakerinModel;

class PrakerinController extends Controller
{
    public function table(Request $request) {
        $data = PrakerinModel::getData();
        
        return response()->json($data);
    }

    public function addProcess(Request $request) {
        $data_insert = [
            'perusahaanid' => $request->perusahaanid
        ];
        
        $insert = PrakerinModel::insertData($data_insert);
        
        if ($insert) {
            return response()->json(['goal'=>true]);
        } else {
            return response()->json(['goal'=>false]);
        }
    }

    public function getPrakerin($id) {
        $data = PrakerinModel::getData($id);
        
        $result = [];
        foreach($data as $key => $value) {
            $result[$key] = $value;
        }

        $siswa_arr = explode(',', $data->siswaid);
        $siswa = [];
        foreach($siswa_arr as $id) {
            $datasiswa = PrakerinModel::getSiswa($id);
            $siswa[] = ['value' => $datasiswa->id, 'label' => $datasiswa->nama];
        }
        $result['siswa'] = $siswa;

        return response()->json($result);
    }

    public function editProcess(Request $request) {
        $data_update = [
            'perusahaanid' => $request->perusahaanid
        ];
        
        $update = PrakerinModel::updateData($data_update, $request->id);
        
        if ($update) {
            return response()->json(['goal'=>true]);
        } else {
            return response()->json(['goal'=>false]);
        }
    }

    public function deleteProcess(Request $request){
        $delete = PrakerinModel::deleteData($request->dataid);

        if ($delete) {
            return response()->json(['goal'=>true]);
        } else {
            return response()->json(['goal'=>false]);
        }
    }
}
