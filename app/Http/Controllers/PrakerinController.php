<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Anouar\Fpdf\Facades\Fpdf;
use App\PrakerinModel;

class PrakerinController extends Controller
{
    public function table(Request $request) {
        $filter = [];
        $filter['limit'] = $request->limit[0]['value'];
        $filter['search'] = $request->search ? $request->search : '';
        $filter['offset'] = $request->offset*$filter['limit']-$filter['limit'];

        $data = PrakerinModel::getData('', '', $filter);
        $count = PrakerinModel::rowCount($filter);
        
        return response()->json(['table' => $data, 'rows' => $count]);
    }

    public function addProcess(Request $request) {
        $data_insert = [
            'perusahaanid' => $request->perusahaan,
            'siswaid' => implode(',', $request->siswa)
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
            'perusahaanid' => $request->perusahaan,
            'siswaid' => implode(',', $request->siswa)
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
    
    public function exportPdf() {
        $data = PrakerinModel::getData();

        $pdf = new Fpdf();
        $pdf::AddPage();
        $pdf::SetFont('Arial','B',18);
        $pdf::Cell(0,10,"Data Prakerin",0,"","C");
        $pdf::Ln(20);

        $pdf::SetWidths([5, 85, 100]);
        $pdf::SetAligns(['L', 'L', 'L']);
        $border = [1, 1, 1];

        $pdf::SetFont('Arial','B',12);
        $thead = ['#', 'Perusahaan', 'Daftar Siswa'];
        $pdf::Row($thead, $border);

        $pdf::SetFont("Arial","",10);
        $no = 1;
        foreach ($data as $v) {
            $tbody = [$no++, $v->perusahaan];
            
            $siswa_arr = explode(',', $v->siswaid);
            $siswa = [];
            foreach($siswa_arr as $id) {
                $datasiswa = PrakerinModel::getSiswa($id);
                $siswa[] = " - $datasiswa->nama";
            }
            $tbody[] = implode("\n", $siswa);

            $pdf::Row($tbody, $border);
        }

        $pdf::Output();
        exit;
    }
}
