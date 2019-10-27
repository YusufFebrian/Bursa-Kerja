import React, { Component } from 'react';
import Axios from 'axios';
import Select from 'react-dropdown-select';
import Skin from '../skin';

export default class Lowongan extends Component {
    constructor() {
        super();
        this.state = {
            lowongan: [],
            optionsJurusan: [],
            order1: '',
            order2: '',
            filsterSearch: '',
            filterJurusan: [],
            filterTipe: [],
            filtertglFrom: '',
            filtertglTo: ''
        }

        this.renderData = this.renderData.bind(this);
        this.detailData = this.detailData.bind(this);
    }

    componentWillMount() {
        this.renderData();

        this.optionsJurusan();
    }

    renderData() {
        let jurusan = [];
        this.state.filterJurusan.forEach(function(val) {
            jurusan.push(val.value);
        })

        let data = {
            cari: this.state.filterSearch,
            tipe: this.state.filterTipe[0],
            jurusan: jurusan,
            tglFrom: this.state.filtertglFrom,
            tglTo: this.state.filtertglTo,
            order1: this.state.order1[0],
            order2: this.state.order2[0]
        }

        console.log(data)
        axios.post('/lowongan/table', data).then(response => {
            console.log(response.data.lowongan);
            this.setState({
                lowongan: response.data.lowongan
            })
        }).catch((error) => console.error(error))
    }
    
    optionsJurusan() {
        Axios.post('/option/jurusan').then(response => {
            if (response.data.goal == true) {
                this.setState({
                    optionsJurusan: response.data.option
                })
            }
        }).catch(error => console.error(error));
    }

    changeFilter(e) {
        let {name, value} = e.target;
        let statenm = 'filter'+name;

        this.setState({
            [statenm]: value
        })

        this.renderData();
    }

    detailData(dataid) {
        this.props.history.push('/lowongan/edit/'+dataid);
    }

    render() {
        const that = this;
        return (
            <span>
                <Skin/>
                <div className="contents">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <span className="panel-title">Lowongan</span> (klik untuk buka/tutup)
                            <button onClick={() => { this.props.history.push('/lowongan/add') }} className="btn btn-success float-right">
                                <i className="fa fa-plus"></i> Tambah
                            </button>
                        </div>
                        <div className="panel-body py-0 p-0">
                            <div className="col-md-12 pr-0 pl-5 py-3">
                            <span className="alert-label primary">FILTER</span>
                                <div className="col-md-4 form-group">
                                    <label className="col-md-12">Cari</label>
                                    <div className="col-md-12 p-0">
                                        <input type="text" 
                                        className="form-control"
                                        name="Search"
                                        placeholder="Posisi / Deskripsi / Syarat"
                                        onChange={this.changeFilter.bind(this)} />
                                    </div>
                                </div>
                                <div className="col-md-4 form-group">
                                    <label className="col-md-12">Tipe</label>
                                    <div className="col-md-12 p-0">
                                        <Select clearable={true}
                                        options={this.state.optionsTipe}
                                        onChange={(e) => {this.setState({filterTipe: e}); this.renderData();}}/>
                                    </div>
                                </div>
                                <div className="col-md-4 form-group">
                                    <label className="col-md-12">Jurusan</label>
                                    <div className="col-md-12 p-0">
                                        <Select multi={true}
                                        clearable={true}
                                        labelField='akronim'
                                        options={this.state.optionsJurusan}
                                        onChange={(e) => {this.setState({filterJurusan: e}); this.renderData();}}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 pr-0 pl-5 py-3">
                            <span className="alert-label success">URUTAN</span>
                                <div className="col-md-4 form-group">
                                    <label className="col-md-12">Urutan 1</label>
                                    <div className="col-md-12 p-0">
                                        <Select clearable={true}
                                        options={this.state.optionsOrder1}
                                        onChange={(e) => {this.setState({order1: e}); this.renderData();}}/>
                                    </div>
                                </div>
                                <div className="col-md-4 form-group">
                                    <label className="col-md-12">Urutan 2</label>
                                    <div className="col-md-12 p-0">
                                        <Select multi={true}
                                        clearable={true}
                                        labelField='akronim'
                                        options={this.state.optionsOrder2}
                                        onChange={(e) => {this.setState({order2: e}); this.renderData();}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.lowongan.map(function(data, i) {
                        return (
                            <div className="tile lowongan" key={i} onClick={() => that.detailData(data.id)}>
                                <div className="tile-header dvd dvd-btm">
                                    <h1><b>{data.posisi}</b></h1>
                                    <ul className="controls">
                                        <li>
                                            <a className="hv-danger"><i className="fa fa-trash"></i></a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tile-widget">
                                    {data.perusahaan}
                                </div>
                                <div className="tile-body">
                                    {data.jurusan}
                                    <div className="float-right">
                                        Tanggal Rekrutmen : {data.tgl_rekrutmen}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </span>
        )
    }
}