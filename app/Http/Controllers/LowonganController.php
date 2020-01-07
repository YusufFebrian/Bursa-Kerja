<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Anouar\Fpdf\Facades\Fpdf;
use App\LowonganModel;

class LowonganController extends Controller
{
    public function table(Request $request) {
        $filter = [];
        $filter['limit'] = $request->limit[0]['value'];
        $filter['search'] = $request->search ? $request->search : '';
        $filter['offset'] = $request->offset*$filter['limit']-$filter['limit'];

        $data = LowonganModel::getData('', '', $filter);
        $count = LowonganModel::rowCount($filter);

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
        
        return response()->json(['lowongan' => $lowongan, 'rows' => $count]);
    }

    public function addProcess(Request $request) {
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

    public function exportPdf() {
        $data = LowonganModel::getData();

        $pdf = new Fpdf();
        $pdf::AddPage();
        $pdf::SetFont('Arial','B',18);
        $pdf::Cell(0,10,"Data Lowongan",0,"","C");
        $pdf::Ln(20);

        $pdf::SetWidths([5, 55, 30, 65, 30]);
        $pdf::SetAligns(['L', 'L', 'L', 'L', 'L']);
        $border = [1, 1, 1, 1, 1, 1, 1, 1, 1];

        $pdf::SetFont('Arial','B',12);
        $thead = ['#', 'Perusahaan', 'Posisi', 'Syarat', 'Tgl Rekrut'];
        $pdf::Row($thead, $border);

        $pdf::SetFont("Arial","",10);
        $no = 1;
        foreach ($data as $v) {
            $syarat = " - ".str_replace("$$", "\n - ", $v->syarat);
            $tgl_rekrut = date_format(date_create($v->tgl_rekrutmen), 'd M Y');
            $tbody = [$no++, $v->perusahaan, $v->posisi, $syarat, $tgl_rekrut];
            $pdf::Row($tbody, $border);
        }
        $pdf::Output();
        exit;
    }
}
