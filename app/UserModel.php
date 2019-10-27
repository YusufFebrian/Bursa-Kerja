<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class UserModel extends Model
{
    public static function queryData() {
        $select = array('a.id', 
            'a.nama', 
            'a.username', 
            'a.tipeid',
            'a.jurusanid',
            'a.thn_ajaran',
            'a.perusahaanid',
            'tp.nama as tipe', 
            'jr.nama as jurusan', 
            'ta.tahun', 
            'pr.nama as perusahaan'
        );
        $data = DB::table('user AS a')
                ->select($select)
                ->join('tipe AS tp', 'tp.id', 'a.tipeid')
                ->leftJoin('jurusan AS jr', 'jr.id', 'a.jurusanid')
                ->leftJoin('thn_ajaran AS ta', 'ta.id', 'a.thn_ajaran')
                ->leftJoin('perusahaan AS pr', 'pr.id', 'a.perusahaanid');

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
        $process = DB::table('user')->insertGetId($data);

        return $process;
    }

    public static function updateData($data, $id) {
        $process = DB::table('user')
                    ->where('id', $id)
                    ->update($data);
        return $process;
    }

    public static function deleteData($id){
        $process = DB::table('user')
                    ->where('id', $id)
                    ->delete();
        return $process;
    }
}
