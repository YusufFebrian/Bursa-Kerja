<?php

// use Illuminate\Support\Facades\Session;
// use Illuminate\Support\Facades\Storage;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::group(['middleware' => ['web']], function () {
    Route::get('/', 'MainController@index');
    Route::get('login', 'MainController@islogin');
    Route::post('login_p', 'MainController@login');
    Route::get('daftar', 'MainController@index');
    Route::post('logout', 'MainController@logout');

    Route::get('/user', 'MainController@index');
    Route::post('/user/table', 'UserController@table');
    Route::get('/user/add', 'MainController@index');
    Route::post('/user/add/process', 'UserController@addProcess');
    Route::get('/user/edit/{id}', 'MainController@index');
    Route::post('/user/data/{id}', 'UserController@getUser');
    Route::post('/user/edit/{id}/process', 'UserController@editProcess');
    Route::post('/user/delete', 'UserController@deleteProcess');

    Route::get('/perusahaan', 'MainController@index');
    Route::post('/perusahaan/table', 'PerusahaanController@table');
    Route::get('/perusahaan/add', 'MainController@index');
    Route::post('/perusahaan/add/process', 'PerusahaanController@addProcess');
    Route::get('/perusahaan/edit/{id}', 'MainController@index');
    Route::post('/perusahaan/data/{id}', 'PerusahaanController@getUser');
    Route::post('/perusahaan/edit/{id}/process', 'PerusahaanController@editProcess');
    Route::post('/perusahaan/delete', 'PerusahaanController@deleteProcess');

    Route::get('/tahun-ajaran', 'MainController@index');
    Route::post('/tahun-ajaran/table', 'TahunController@table');
    Route::post('/tahun-ajaran/add/process', 'TahunController@addProcess');
    Route::post('/tahun-ajaran/data/{id}', 'TahunController@getUser');
    Route::post('/tahun-ajaran/edit/process', 'TahunController@editProcess');
    Route::post('/tahun-ajaran/delete', 'TahunController@deleteProcess');

    Route::get('/lowongan', 'MainController@index');
    Route::post('/lowongan/table', 'LowonganController@table');
    Route::get('/lowongan/add', 'MainController@index');
    Route::post('/lowongan/add/process', 'LowonganController@addProcess');
    Route::post('/lowongan/data/{id}', 'LowonganController@getLowongan');
    Route::get('/lowongan/edit/{id}', 'MainController@index');
    Route::post('/lowongan/edit/{id}/process', 'LowonganController@editProcess');
    Route::post('/lowongan/delete', 'LowonganController@deleteProcess');
    
    Route::get('/prakerin', 'MainController@index');
    Route::post('/prakerin/table', 'PrakerinController@table');
    Route::get('/prakerin/add', 'MainController@index');
    Route::post('/prakerin/add/process', 'PrakerinController@addProcess');
    Route::get('/prakerin/edit/{id}', 'MainController@index');
    Route::post('/prakerin/data/{id}', 'PrakerinController@getPrakerin');
    Route::post('/prakerin/edit/{id}/process', 'PrakerinController@editProcess');
    Route::post('/prakerin/delete', 'PrakerinController@deleteProcess');

    Route::get('/tiket', 'MainController@index');
    Route::post('/tiket/table', 'TiketController@table');
    Route::post('/tiket/delete', 'TiketController@deleteProcess');
    
    Route::post('urlImage', 'MainController@getImage');
    Route::post('account', 'MainController@getAccount');
    Route::post('keterserapan', 'MainController@getKeterserapan');
    
    Route::post('/option/usertype', 'MainController@optionsUsertype');
    Route::post('/option/tipelowongan', 'MainController@optionsTipeLowongan');
    Route::post('/option/jurusan', 'MainController@optionsJurusan');
    Route::post('/option/prodi', 'MainController@optionsProdi');
    Route::post('/option/thn_ajaran', 'MainController@optionsThnAjaran');
    Route::post('/option/perusahaan', 'MainController@optionsPerusahaan');
    Route::post('/option/siswa', 'MainController@optionsSiswa');
});
