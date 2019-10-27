<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use App\MainModel;

class MainController extends Controller
{
    public function index(Request $request){
        if (session()->has('logins')) {
            return view('index');
        } else {
            return redirect('login');
        }
    }

    public function islogin(){
        if (!Session::get('logins')) {
            return view('index');
        } else {
            return redirect('/');
        }
    }

    public function login(Request $request){
        $usr = $request->post('usr');
        $psw = $request->post('psw');

        $data_user = MainModel::Login($usr, $psw);
        if ($data_user){
            Session::put('logins', $data_user->id);
            Session::put('usertype', $data_user->tipeid);

            return response()->json(['goal'=>true]);
        } else {
            return response()->json(['goal'=>false, 'message'=>'Username / Password Tidak Terdaftar']);
        }
    }

    public function logout(Request $request){
        Session::flush();

        return redirect('login');
    }

    public function getAccount() {
        $account = MainModel::dataAccount();

        $data = [];
        foreach($account as $key => $value) {
            $data[$key] = $value;
        }
        return $data;
    }

    public function getKeterserapan(Request $request) {
        // var_dump($request->all());
        $keterserapan = MainModel::dataKeterserapan($request->tahun, $request->prodi, $request->jurusan);

        $data = ['kerja' => 0, 'kuliah' => 0, 'wirausaha' => 0, 'militer' => 0, 'lain' => 0];
        foreach($keterserapan as $value) {
            $data['kerja'] += $value->kerja;
            $data['kuliah'] += $value->kuliah;
            $data['wirausaha'] += $value->wirausaha;
            $data['militer'] += $value->militer;
            $data['lain'] += $value->lain;
        }
        return response()->json($data);
    }

    public function getImage(Request $request) {
        return response()->json(['url'=>Storage::url('logo_skariga.png')]);
    }

    public function optionsUsertype() {
        $option = MainModel::usertypeData();

        $data = [];
        foreach($option as $value) {
            $row = [];
            $row['value'] = $value->id;
            $row['label'] = $value->nama;

            $data[] = $row;
        }

        return response()->json(['goal'=>true, 'option'=>$data]);
    }

    public function optionsTipeLowongan() {
        $option = MainModel::tipeLowonganData();

        $data = [];
        foreach($option as $value) {
            $row = [];
            $row['value'] = $value->id;
            $row['label'] = $value->nama;

            $data[] = $row;
        }

        return response()->json(['goal'=>true, 'option'=>$data]);
    }

    public function optionsJurusan() {
        $option = MainModel::jurusanData();

        $data = [];
        foreach($option as $value) {
            $row = [];
            $row['value'] = $value->id;
            $row['label'] = $value->nama;
            $row['akronim'] = $value->akronim;

            $data[] = $row;
        }

        return response()->json(['goal'=>true, 'option'=>$data]);
    }

    public function optionsProdi() {
        $option = MainModel::prodiData();
        
        $data = [];
        foreach($option as $value) {
            $row = [];
            $row['value'] = $value->prodi;
            $row['label'] = $value->prodi;

            $data[] = $row;
        }

        return response()->json(['goal'=>true, 'option'=>$data]);
    }

    public function optionsThnAjaran() {
        $option = MainModel::thnAjaranData();

        $data = [];
        foreach($option as $value) {
            $row = [];
            $row['value'] = $value->id;
            $row['label'] = $value->tahun;

            $data[] = $row;
        }

        return response()->json(['goal'=>true, 'option'=>$data]);
    }

    public function optionsPerusahaan() {
        $option = MainModel::perusahaanData();

        $data = [];
        foreach($option as $value) {
            $row = [];
            $row['value'] = $value->id;
            $row['label'] = $value->nama;

            $data[] = $row;
        }

        return response()->json(['goal'=>true, 'option'=>$data]);
    }

    public function optionsSiswa() {
        $option = MainModel::siswaData();

        $data = [];
        foreach($option as $value) {
            $row = [];
            $row['value'] = $value->id;
            $row['label'] = $value->nama;

            $data[] = $row;
        }

        return response()->json(['goal'=>true, 'option'=>$data]);
    }
}