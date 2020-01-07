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
            // 'DATE_FORMAT(a.tgl_rekrutmen, "%d %M %Y")',
            'pr.nama as perusahaan',
            'tp.nama as tipe',
            'tk.pendaftar'
        );
        $data = DB::table('lowongan AS a')
                ->select($select)
                ->selectRaw('DATE_FORMAT(a.tgl_rekrutmen, "%d %M %Y") as tgl_rekrutmen')
                ->leftJoin('perusahaan AS pr', 'pr.id', 'a.perusahaanid')
                ->leftJoin('tipe AS tp', 'tp.id', 'a.tipeid')
                ->leftJoin(DB::raw('(SELECT count(id) as pendaftar, lowonganid FROM tiket GROUP BY lowonganid) tk'), 'tk.lowonganid', 'a.id');

        return $data;
    }

    public static function getData($id = '', $field = 'a.id', $filter = []) {
        $data = static::queryData();

        if ($filter) {
            $data->where(function($query) use ($filter) {
                $query->where('a.posisi', 'like', '%'.$filter['search'].'%');
                $query->orWhere('pr.nama', 'like', '%'.$filter['search'].'%');
                $query->orWhere('a.tgl_rekrutmen', 'like', '%'.$filter['search'].'%');
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
        $data = static::queryData();
        
        if ($filter) {
            $data->where(function($query) use ($filter) {
                $query->where('a.posisi', 'like', '%'.$filter['search'].'%');
                $query->orWhere('pr.nama', 'like', '%'.$filter['search'].'%');
                $query->orWhere('a.tgl_rekrutmen', 'like', '%'.$filter['search'].'%');
            });
        }
        
        return $data->count();
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
