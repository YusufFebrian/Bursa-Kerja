<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Support\Facades\Session;

class MainModel extends Model
{
    public static function Login($usr, $psw){
        $data = DB::table('user')
                ->where('username', $usr)
                ->where('password', $psw);
        return $data->first();
    }

    public static function dataAccount(){
        $data = DB::table('user')
                ->select(['user.nama', 'tipe.nama as tipenm'])
                ->join('tipe', 'tipe.id', 'user.tipeid')
                ->where('user.id', Session::get('logins'));
        return $data->first();
    }

    public static function dataKeterserapan($thn = '', $prodi = '', $jurusan = ''){
        $data = DB::table('keterserapan')
                ->join('jurusan', 'jurusan.id', 'keterserapan.jurusanid');
        if ($thn)
            $data->where('thn_ajaran', $thn);
        if ($prodi)
            $data->where('jurusan.prodi', $prodi);
        if ($jurusan)
            $data->where('jurusan.id', $jurusan);
        return $data->get();
    }

    public static function usertypeData() {
        $data = DB::table('tipe')
                ->where('kategori', 'USER_TYPE');
        return $data->get();
    }

    public static function tipeLowonganData() {
        $data = DB::table('tipe')
                ->where('kategori', 'LOWONGAN');
        return $data->get();
    }

    public static function jurusanData() {
        $data = DB::table('jurusan');
        return $data->get();
    }

    public static function prodiData() {
        $data = DB::table('jurusan')
                ->select('prodi')->distinct();
        return $data->get();
    }

    public static function thnAjaranData() {
        $data = DB::table('thn_ajaran');
        return $data->get();
    }

    public static function perusahaanData() {
        $data = DB::table('perusahaan');
        return $data->get();
    }

    public static function siswaData() {
        $data = DB::table('user')
                ->where('tipeid', '3');
        return $data->get();
    }
}
