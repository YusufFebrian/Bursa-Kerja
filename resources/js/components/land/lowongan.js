import React, { Component } from 'react';
import Select from 'react-dropdown-select';
import Axios from 'axios';

export default class viewLowongan extends Component {
    constructor() {
        super();

        this.state = {
            lowongan: [],
            optionsJurusan: [],
            filsterSearch: '',
            filterJurusan: [],
            order: '',
        }

        this.linkClick = this.linkClick.bind(this)
        this.renderData = this.renderData.bind(this);
    }

    componentWillMount() {
        this.renderData();

        Axios.post('/option/jurusan').then(response => {
            this.setState({
                options_jurusan: response.data.option
            })
        }).catch(error => console.log(error));
    }

    renderData() {
        let jurusan = [];
        this.state.filterJurusan.forEach(function(val) {
            jurusan.push(val.value);
        })

        let data = {
            cari: this.state.filterSearch,
            jurusan: jurusan,
            order: this.state.order[0]
        }

        axios.post('/lowongan/table', data).then(response => {
            this.setState({
                lowongan: response.data.lowongan
            })
        }).catch((error) => console.error(error))
    }
    
    linkClick(to) {
        this.props.history.push(to)
    }

    render() {
        return (
            <span>
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <div className="container">
                        <a className="navbar-brand" href="#">
                            <img src="/image/logo_skariga.png" height="40" className="float-lefts"/>
                            <b className="float-lefts ml-3" style={{ fontSize: "25px"}}>BKI Skariga</b>
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item mr-1">
                                    <a className="nav-link" onClick={() => this.linkClick('/')}>Home</a>
                                </li>
                                <li className="nav-item mr-1 active">
                                    <a className="nav-link" onClick={() => this.linkClick('/cari-lowongan')}>Cari Lowongan</a>
                                </li>
                                <li className="nav-item mr-1">
                                    <a className="nav-link" onClick={() => this.linkClick('/pasang')}>Pasang Lowongan</a>
                                </li>
                                <li className="nav-item mr-1">
                                    <a href="/login" className="btn btn-primary">LOGIN</a>
                                </li>
                                <li className="nav-item mr-1">
                                    <a href="/daftar" className="btn btn-success">DAFTAR</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="content-area py-5">
                    <div className="container text-center text-white">
                        <div className="row px-5 mx-5 mt-20">
                            <div className="col-lg-7 pr-0">
                                <input type="text" className="form-control bg-light" aria-label="Large" placeholder="Cari Posisi atau Perusahaan" />
                            </div>
                            <div className="col-lg-4 px-0">
                                <Select clearable={true} options={this.state.options_jurusan} 
                                className="form-control bg-light" placeholder="Jurusan" />
                            </div>
                            <div className="col-lg-1 pl-0">
                                <button className="btn btn-warning h-100 float-left"><i className="fa fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jumbotron bg-transparent">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-1 offset-lg-8 pr-0">
                                <i className="fas fa-sort-amount-down fa-2x float-right"></i>
                            </div>
                            <div className="col-lg-3 mb-2">
                                <Select clearable={true} options={this.state.options_jurusan} 
                                className="form-control bg-white" placeholder="Not Sorted" />
                            </div>
                        </div>
                        {this.state.lowongan.map(function(data, i) {
                            return (
                                <div className="card mb-3">
                                    <div className="card-header bg-white">
                                        <span className="h3 font-weight-bold">{data.posisi}</span>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="row mb-2">
                                                    <b className="col-lg-3">Perusahaan</b><span className="col-lg-9">{data.perusahaan}</span>
                                                </div>
                                                <div className="row">
                                                    <b className="col-lg-3">Jurusan</b><span className="col-lg-9">{data.jurusan}</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <b>Deskripsi</b>
                                                <p>dajlsddkjas</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <button className="btn btn-warning float-right" onClick={() => this.addTiket(data.id)}>DAFTAR</button> 
                                        <button className="btn btn-link float-right" onClick={() => this.linkClick('/cari-lowongan/'+data.id)}>DETAIL</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="jumbotron bg-dark mb-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 border-right border-secondary">
                                <p className="h4 text-white font-weight-bold">Tentang BKI</p>
                                <p className="h5 text-secondary mt-3">BKI adalah badan yang bergerak untuk mempermudah siswa / alumni mencari pekerjaan, situs BKI hadir sejak 2019 mempermudah cari pekerjaan dan perekrutan karyawan.</p>
                            </div>
                            <div className="col-lg-3 border-right border-secondary">
                                <p className="h4 text-white font-weight-bold">Bantuan</p>
                                <ul className="list-unstyled h5 mt-3">
                                    <li className="mb-1">
                                        <a href="/sosmed" className="text-secondary">FAQ</a>
                                    </li>
                                    <li className="mb-1">
                                        <a href="/sosmed" className="text-secondary">Pusat Bantuan</a>
                                    </li>
                                    <li className="mb-1">
                                        <a href="/sosmed" className="text-secondary">Kebijakan Privasi</a>
                                    </li>
                                    <li className="mb-1">
                                        <a href="/sosmed" className="text-secondary">Kondisi dan Ketentuan</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-3 border-right border-secondary">
                                <p className="h4 text-white font-weight-bold">Blog</p>
                                <ul className="list-unstyled h5 mt-3">
                                    <li className="mb-1">
                                        <a href="/sosmed" className="text-secondary">SSB SMK PGRI 3 Malang</a>
                                    </li>
                                    <li className="mb-1">
                                        <a href="/sosmed" className="text-secondary">Facebook</a>
                                    </li>
                                    <li className="mb-1">
                                        <a href="/sosmed" className="text-secondary">Youtube</a>
                                    </li>
                                    <li className="mb-1">
                                        <a href="/sosmed" className="text-secondary">Instagram</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-3">
                                <p className="h4 text-white font-weight-bold">Hubungi Kami</p>
                                <ul className="list-unstyled h5 mt-3">
                                    <li className="mb-1">
                                        <a href="/sosmed" className="text-secondary"><i className="fa fa-phone"></i> +62 890 2823 1293</a>
                                    </li>
                                    <li className="mb-1">
                                        <a href="/sosmed" className="text-secondary"><i className="fa fa-envelope"></i> skariga@gmail.com</a>
                                    </li>
                                    <li className="mb-1">
                                        <a href="/sosmed" className="text-secondary"><i className="fa fa-twiter"></i> Twiter</a>
                                    </li>
                                    <li className="mb-1">
                                        <a href="/sosmed" className="text-secondary"><i className="fa fa-facebook-square"></i> Facebook</a>
                                    </li>
                                    <li className="mb-1">
                                        <a href="/sosmed" className="text-secondary"><i className="fa fa-youtube"></i> Youtube</a>
                                    </li>
                                    <li className="mb-1">
                                        <a href="/sosmed" className="text-secondary"><i className="fa fa-instagram"></i> Instagram</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jumbotron bg-dark py-2 mb-0 border-top border-secondary">
                    <div className="container">
                        Copyright &copy; BKI Skariga - All Rights Reserved
                    </div>
                </div>
            </span>
        )
    }
}