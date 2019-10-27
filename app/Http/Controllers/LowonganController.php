<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\LowonganModel;

class LowonganController extends Controller
{
    public function table(Request $request) {
        $data = LowonganModel::getData();

        $lowongan = [];
        foreach($data as $row) {
            $result = [];
            foreach($row as $key => $value) {
                $result[$key] = $value;
            }

            $jurusan_arr = explode(',', $row->jurusanid);
            $jurusan = [];
            foreach($jurusan_arr as $id) {
                $datajurus = LowonganModel::getJurusan($id);
                $jurusan[] = $datajurus->akronim;
            }
            $result['jurusan'] = implode(', ', $jurusan);

            $lowongan[] = $result;
        }
        
        return response()->json(['lowongan' =>$lowongan]);
    }

    public function addProcess(Request $request) {
        dd($request->all());
        $perusahaan = $request->perusahaan['value'];
        $tipe = $request->tipe['value'];
        $jurusan = [];
        foreach($request->jurusan as $val) {
            $jurusan[] = $val['value'];
        }
        $jurusan = implode(",", $jurusan);
        $syarat = implode("$$", $request->syarat);

        $data_insert = [
            'perusahaanid' => $perusahaan,
            'posisi' => $request->posisi,
            'tipeid' => $tipe,
            'tgl_rekrutmen' => $request->tglrekrut,
            'deskripsi' => $request->deskripsi,
            'jurusanid' => $jurusan,
            'syarat' => $syarat
        ];
        
        $insert = LowonganModel::insertData($data_insert);
        
        if ($insert) {
            return response()->json(['goal'=>true]);
        } else {
            return response()->json(['goal'=>false]);
        }
    }

    public function getLowongan($id) {
        $data = LowonganModel::getData($id);

        $result = [];
        foreach($data as $key => $value) {
            $result[$key] = $value;
        }

        $jurusan_arr = explode(',', $data->jurusanid);
        $jurusan = [];
        foreach($jurusan_arr as $id) {
            $datajurus = LowonganModel::getJurusan($id);
            $jurusan[] = ['value' => $datajurus->id, 'label' => $datajurus->nama, 'akronim' => $datajurus->akronim];
        }
        $result['jurusan'] = $jurusan;

        $syarat = explode('$$', $data->syarat);
        $result['syarat'] = $syarat;

        $lowongan[] = $result;

        return response()->json($result);
    }

    public function editProcess(Request $request) {
        $perusahaan = $request->perusahaan['value'];
        $tipe = $request->tipe['value'];
        $jurusan = [];
        foreach($request->jurusan as $val) {
            $jurusan[] = $val['value'];
        }
        $jurusan = implode(",", $jurusan);
        $syarat = implode("$$", $request->syarat);

        $data_update = [
            'perusahaanid' => $perusahaan,
            'posisi' => $request->posisi,
            'tipeid' => $tipe,
            'tgl_rekrutmen' => $request->tglrekrut,
            'deskripsi' => $request->deskripsi,
            'jurusanid' => $jurusan,
            'syarat' => $syarat
        ];
        
        $update = LowonganModel::updateData($data_update, $request->id);
        
        if ($update) {
            return response()->json(['goal'=>true]);
        } else {
            return response()->json(['goal'=>false]);
        }
    }

    public function deleteProcess(Request $request){
        $delete = LowonganModel::deleteData($request->userid);

        if ($delete) {
            return response()->json(['goal'=>true]);
        } else {
            return response()->json(['goal'=>false]);
        }
    }
}
