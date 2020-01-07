<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class PrakerinModel extends Model
{
    public static function getData($id = '', $field = 'a.id', $filter = []) {
        $data = DB::table('prakerin AS a')
                ->select(['a.*', 'pr.nama as perusahaan'])
                ->leftJoin('perusahaan AS pr', 'pr.id', 'a.perusahaanid');

        if ($filter) {
            $data->where(function($query) use ($filter) {
                $query->where('pr.nama', 'like', '%'.$filter['search'].'%');
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
        $data = DB::table('prakerin AS a')
                ->select(['a.*', 'pr.nama as perusahaan'])
                ->leftJoin('perusahaan AS pr', 'pr.id', 'a.perusahaanid');
        
        if ($filter) {
            $data->where(function($query) use ($filter) {
                $query->where('pr.nama', 'like', '%'.$filter['search'].'%');
            });
        }
        
        return $data->count();
    }

    public static function insertData($data) {
        $process = DB::table('prakerin')->insertGetId($data);

        return $process;
    }

    public static function updateData($data, $id) {
        try { 
            $process = DB::table('prakerin')
                        ->where('id', $id)
                        ->update($data);
                        // dd($id);
            return $process;
        } catch(\Illuminate\Database\QueryException $ex){ 
            dd($ex->getMessage()); 
        }
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
