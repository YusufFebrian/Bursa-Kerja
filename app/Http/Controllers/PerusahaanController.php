<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Anouar\Fpdf\Facades\Fpdf;
use App\PerusahaanModel;

class PerusahaanController extends Controller
{
    public function table(Request $request) {
        $filter = [];
        $filter['limit'] = $request->limit[0]['value'];
        $filter['search'] = $request->search ? $request->search : '';
        $filter['offset'] = $request->offset*$filter['limit']-$filter['limit'];

        $data = PerusahaanModel::getData('', '', $filter);
        $count = PerusahaanModel::rowCount($filter);
        
        return response()->json(['table' => $data, 'rows' => $count]);
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

    public function exportPdf() {
        $data = PerusahaanModel::getData();

        $pdf = new Fpdf();
        $pdf::AddPage();
        $pdf::SetFont('Arial','B',18);
        $pdf::Cell(0,10,"Data Perusahaan",0,"","C");
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
