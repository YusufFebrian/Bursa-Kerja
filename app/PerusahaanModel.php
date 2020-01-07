<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class PerusahaanModel extends Model
{
    public static function getData($id = '', $field = 'a.id', $filter = []) {
        $data = DB::table('perusahaan');

        if ($filter) {
            $data->where(function($query) use ($filter) {
                $query->where('nama', 'like', '%'.$filter['search'].'%');
                $query->orWhere('alamat', 'like', '%'.$filter['search'].'%');
                $query->orWhere('email', 'like', '%'.$filter['search'].'%');
                $query->orWhere('nama_hrd', 'like', '%'.$filter['search'].'%');
            });
            $data->limit($filter['limit']);
            $data->offset($filter['offset']);
        }

        if ($id) {
            $data->where($field, $id);

            return $data->first();
        }

        return $data->get();
    }

    public static function rowCount($filter = []) {
        $data = DB::table('perusahaan');
        
        if ($filter) {
            $data->where(function($query) use ($filter) {
                $query->where('nama', 'like', '%'.$filter['search'].'%');
                $query->orWhere('alamat', 'like', '%'.$filter['search'].'%');
                $query->orWhere('email', 'like', '%'.$filter['search'].'%');
                $query->orWhere('nama_hrd', 'like', '%'.$filter['search'].'%');
            });
        }
        
        return $data->count();
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
