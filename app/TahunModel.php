<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class TahunModel extends Model
{
    public static function getData($id = '', $field = 'id') {
        $data = DB::table('thn_ajaran');
        if ($id) {
            $data->where($field, $id);

            return $data->first();
        }

        return $data->get();
    }

    public static function insertData($data) {
        $process = DB::table('thn_ajaran')->insertGetId($data);

        return $process;
    }

    public static function updateData($data, $id) {
        $process = DB::table('thn_ajaran')
                    ->where('id', $id)
                    ->update($data);
        return $process;
    }

    public static function deleteData($id){
        $process = DB::table('thn_ajaran')
                    ->where('id', $id)
                    ->delete();
        return $process;
    }
}
