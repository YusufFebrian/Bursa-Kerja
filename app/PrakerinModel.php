<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class PrakerinModel extends Model
{
    public static function getData($id = '', $field = 'a.id') {
        $data = DB::table('prakerin AS a')
                ->select(['a.*', 'pr.nama as perusahaan'])
                ->leftJoin('perusahaan AS pr', 'pr.id', 'a.perusahaanid');

        if ($id) {
            $data->where($field, $id);

            return $data->first();
        }

        return $data->get();
    }

    public static function insertData($data) {
        $process = DB::table('prakerin')->insertGetId($data);

        return $process;
    }

    public static function updateData($data, $id) {
        $process = DB::table('prakerin')
                    ->where('id', $id)
                    ->update($data);
        return $process;
    }

    public static function deleteData($id){
        $process = DB::table('prakerin')
                    ->where('id', $id)
                    ->delete();
        return $process;
    }
    
    public static function getSiswa($id) {
        $data = DB::table('user')
                ->where('id', $id);

        return $data->first();
    }
}
