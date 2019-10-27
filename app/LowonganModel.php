<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class LowonganModel extends Model
{
    public static function queryData() {
        $select = array('a.id',
            'a.jurusanid',
            'a.perusahaanid',
            'a.tipeid',
            'a.jk', 
            'a.posisi', 
            'a.deskripsi',
            'a.syarat', 
            'a.tgl_rekrutmen',
            'pr.nama as perusahaan',
            'tp.nama as tipe'
        );
        $data = DB::table('lowongan AS a')
                ->select($select)
                ->leftJoin('perusahaan AS pr', 'pr.id', 'a.perusahaanid')
                ->leftJoin('tipe AS tp', 'tp.id', 'a.tipeid');

        return $data;
    }

    public static function getData($id = '', $field = 'a.id') {
        $data = static::queryData();
        if ($id) {
            $data->where($field, $id);

            return $data->first();
        }

        return $data->get();
    }

    public static function insertData($data) {
        $process = DB::table('lowongan')->insertGetId($data);

        return $process;
    }

    public static function updateData($data, $id) {
        $process = DB::table('lowongan')
                    ->where('id', $id)
                    ->update($data);
        return $process;
    }

    public static function deleteData($id){
        $process = DB::table('lowongan')
                    ->where('id', $id)
                    ->delete();
        return $process;
    }

    public static function getJurusan($id) {
        $data = DB::table('jurusan')
                ->where('id', $id);

        return $data->first();
    }
}
