<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Support\Facades\Session;

class TiketModel extends Model
{
    public static function getData() {
        $data = DB::table('tiket AS a')
                ->select(['a.id', 'lw.posisi', 'pr.nama as perusahaan'])
                ->join('lowongan AS lw', 'lw.id', 'a.lowonganid')
                ->join('perusahaan AS pr', 'pr.id', 'lw.perusahaanid')
                ->where('a.userid', Session::get('logins'));

        return $data->get();
    }

    public static function insertData($data) {
        $process = DB::table('tiket');

        return $process->insert($data);
    }

    public static function getSingleData($id, $userid) {
        $data = DB::table('tiket')
                ->where('userid', $userid)
                ->where('lowonganid', $id);

        return $data->first();
    }

    public static function deleteData($id, $data) {
        $process = DB::table('tiket')
                ->where('id', $id);

        return $process->delete($data);
    }
}
