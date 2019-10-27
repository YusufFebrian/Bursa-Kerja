<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class PerusahaanModel extends Model
{
    public static function getData($id = '', $field = 'a.id') {
        $data = DB::table('perusahaan');
        if ($id) {
            $data->where($field, $id);

            return $data->first();
        }

        return $data->get();
    }

    public static function insertData($data) {
        $process = DB::table('perusahaan')->insertGetId($data);

        return $process;
    }

    public static function updateData($data, $id) {
        $process = DB::table('perusahaan')
                    ->where('id', $id)
                    ->update($data);
        return $process;
    }

    public static function deleteData($id){
        $process = DB::table('perusahaan')
                    ->where('id', $id)
                    ->delete();
        return $process;
    }
}
