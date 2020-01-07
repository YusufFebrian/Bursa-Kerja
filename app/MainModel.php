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
        $data = DB::table('keterserapan AS a')
                ->select(['a.*', 'th.tahun', 'jr.akronim as jurusan'])
                ->join('thn_ajaran AS th', 'th.id', 'a.thn_ajaran')
                ->join('jurusan AS jr', 'jr.id', 'a.jurusanid');
        if ($thn)
            $data->where('thn_ajaran', $thn);
        if ($prodi)
            $data->where('jr.prodi', $prodi);
        if ($jurusan)
            $data->where('jr.id', $jurusan);
        return $data->get();
    }

    public static function insertData($data) {
        $process = DB::table('keterserapan')->insertGetId($data);

        return $process;
    }

    public static function updateData($id, $data) {
        $process = DB::table('keterserapan')
                ->where('id', $id);

        return $process->update($data);
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
