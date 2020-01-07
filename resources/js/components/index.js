import React, { Component } from 'react';
import Select from 'react-dropdown-select';
import { Pie } from 'react-chartjs-2';
import Axios from 'axios';

export default class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            options_jurusan: [],
            keterserapan: {
                labels: [''],
                datasets: [{
                    label: 'Data Keterserapan',
                    data: [0],
                    backgroundColor: ['']
                }]
            },
            chartOptions: {
                maintainAspectRatio: false,
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            let label = data['labels'][tooltipItem['index']];
                            let amount = data['datasets'][0]['data'][tooltipItem['index']];
                            let total = data['datasets'][0]['_meta'][0]['total'];
                            let percent = amount/total * 100;
                            return label + ': ' + percent + '%';
                        }
                    }
                },
                legend: {
                    position: 'left'
                }
            },
        }
        
        this.linkClick = this.linkClick.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.renderChart = this.renderChart.bind(this);
    }

    componentWillMount() {
        this.renderChart();
        
        Axios.post('/option/thn_ajaran').then(response => {
            if (response.data.goal == true) {
                this.setState({
                    options_tahun: response.data.option
                })
            }
        }).catch(error => console.error(error));
        
        Axios.post('/option/prodi').then(response => {
            this.setState({
                options_prodi: response.data.option
            })
        }).catch(error => console.log(error));
        
        Axios.post('/option/jurusan').then(response => {
            this.setState({
                options_jurusan: response.data.option
            })
        }).catch(error => console.log(error));
    }

    linkClick(to) {
        this.props.history.push(to)
    }

    changeFilter(type, data) {
        let statename = 'filter_'+type;
        let filvalue = (data && data.length ? data[0].value : 0);

        this.setState({
            [statename]: filvalue
        })

        this.renderChart(type, data);
    }
    
    renderChart(filter, selected) {
        let filter_nm = (filter ? filter : 'nodata');
        let filter_val = (selected && selected.length ? selected[0].value : 0);
        let data = {
            tahun: this.state.filter_tahun,
            prodi: this.state.filter_prodi,
            jurusan: this.state.filter_jurusan,
            [filter_nm]: filter_val
        }
        console.log(data);

        axios.post('/keterserapan', data).then(response => {
            console.log(response.data.sql);
            this.setState({
                keterserapan: {
                    labels: ['Kerja', 'Kuliah', 'Wirausaha', 'Militer', 'Lain-lain'],
                    datasets: [{
                        label: 'Data Keterserapan',
                        data: [response.data.kerja, response.data.kuliah, response.data.militer, response.data.wirausaha, response.data.lain],
                        backgroundColor: ['#ff2f00', '#2196f3', '#ffc107', '#2e7d32']
                    }]
                }
            })
        }).catch(error => console.log(error));
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
                                <li className="nav-item mr-1 active">
                                    <a className="nav-link" onClick={() => this.linkClick('/')}>Home</a>
                                </li>
                                <li className="nav-item mr-1">
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
                <div className="content-area">
                    <div className="container text-center text-white">
                        <h1 className="font-weight-bold mt-0">BKI Skariga</h1>
                        <h4>Cari lowongan sesuai dengan keahlianmu.</h4>
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
                <div className="jumbotron bg-transparent py-0">
                    <div className="row">
                        <div className="col-lg-6 border-right border-bottom text-center py-5 px-5">
                            <h3>Siswa / Alumni</h3>
                            <p className="w-50 m-auto">Daftar lowongan dan peroleh peluang kerja sesuai dengan keahlianmu.</p>
                        </div>
                        <div className="col-lg-6 border-left border-bottom text-center py-5 px-5">
                            <h3>Perusahaan</h3>
                            <p className="w-50 m-auto">Pasang iklan lowongan agar terhubung dengan siswa / alumni yang paling potensial.</p>
                        </div>
                    </div>
                </div>
                <div className="jumbotron bg-transparent ">
                    <div className="container">
                        <h1 className="text-center font-weight-bold">DATA KETERSERAPAN</h1>
                        <div className="row justify-content-center">
                            <div className="col-lg-3 pl-0 mb-3">
                                <label className="pl-0">Tahun Ajaran</label>
                                <Select clearable={true} options={this.state.options_tahun} placeholder="Semua"
                                onChange={(values) => {this.renderChart('tahun', values); this.changeFilter('tahun', values)}} />
                            </div>
                            <div className="col-lg-3 pl-0 mb-3">
                                <label className="pl-0">Departemen</label>
                                <Select clearable={true} options={this.state.options_prodi} placeholder="Semua" 
                                onChange={(values) => {this.renderChart('prodi', values); this.changeFilter('prodi', values)}} />
                            </div>
                            <div className="col-lg-3 pl-0 mb-3">
                                <label className="pl-0">Jurusan</label>
                                <Select clearable={true} options={this.state.options_jurusan} placeholder="Semua"
                                onChange={(values) => {this.renderChart('jurusan', values); this.changeFilter('jurusan', values)}} />
                            </div>
                        </div>
                        <div style={{height: '500px'}}>
                            <Pie data={this.state.keterserapan} options={this.state.chartOptions} />
                        </div>
                    </div>
                </div>
                <div className="jumbotron bg-white py-0">
                    <div className="container py-5 px-0">
                        <h2 className="text-center font-weight-bold">Partner Industri</h2>
                        <div className="slider">
                            <div className="slide-track">
                                <div className="slide">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png" height="100" width="250" alt="" />
                                </div>
                                <div className="slide">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png" height="100" width="250" alt="" />
                                </div>
                                <div className="slide">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png" height="100" width="250" alt="" />
                                </div>
                                <div className="slide">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png" height="100" width="250" alt="" />
                                </div>
                                <div className="slide">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png" height="100" width="250" alt="" />
                                </div>
                                <div className="slide">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png" height="100" width="250" alt="" />
                                </div>
                                <div className="slide">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png" height="100" width="250" alt="" />
                                </div>
                                <div className="slide">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png" height="100" width="250" alt="" />
                                </div>
                                <div className="slide">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png" height="100" width="250" alt="" />
                                </div>
                                <div className="slide">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png" height="100" width="250" alt="" />
                                </div>
                                <div className="slide">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png" height="100" width="250" alt="" />
                                </div>
                            </div>
                        </div>
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