import React, { Component } from 'react';
import Axios from 'axios';
import Select from 'react-dropdown-select';
import Skin from '../skin';

export default class Formserap extends Component {
    constructor() {
        super();

        this.state = {
            optionsJurusan: [],
            optionsTahun: [],

            setjurusan: [],
            settahun: [],
            setjumlah: '',
            setkerja: '',
            setkuliah: '',
            setwirausaha: '',
            setmiliter: '',
            setlain: ''
        }
    }

    componentWillMount() {
        // this.formType();

        this.optionsJurusan();
        this.optionsTahun();
    }

    formType() {
        let dataid = this.props.match.params.id;
        let that = this;
        if (userid){
            Axios.post('/lowongan/data/'+userid).then(response => {
                let data = response.data;
                
                this.setState({
                    type: 'Ubah',
                    id: data.id,
                    setjurusan: (data.jurusanid ? [{value: data.jurusanid, label: data.jurusan}] : []),
                    settahun: (data.tahunid ? [{value: data.tahunid, label: data.tahun}] : []),
                    setjumlah: (data.jumlah ? data.jumlah : []),
                    setkerja: (data.kerja ? data.kerja : []),
                    setkuliah: (data.kuliah ? data.kuliah : []),
                    setwirausaha: (data.wirausaha ? data.wirausaha : []),
                    setmiliter: (data.militer ? data.militer : []),
                    setlain: (data.lain ? data.lain : []),
                })
            }).catch(error => console.error(error));
        } else {
            this.setState({
                type: 'Tambah'
            })
        }
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

    optionsTahun() {
        Axios.post('/option/thn_ajaran').then(response => {
            if (response.data.goal == true) {
                this.setState({
                    optionsTahun: response.data.option
                })
            }
        }).catch(error => console.error(error));
    }

    handleChange(e) {
        let {name, value} = e.target;
        let statenm = 'set'+name;

        this.setState({
            [statenm]: value
        })
        
    }

    Submitter(e) {
        e.preventDefault();
    }

    render() {
        return (
            <span>
                <Skin/>
                <div className="contents">
                    <form onSubmit={this.Submitter.bind(this)}>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <span className="panel-title">{this.state.type} Keterserapan</span>
                                <button type="submit" className="btn btn-primary float-right ml-1">
                                    <i className="fa fa-save"></i> Simpan
                                </button>
                                <button className="btn btn-danger float-right ml-1">
                                    <i className="fa fa-arrow-left"></i> Kembali
                                </button>
                            </div>
                            <div className="panel-body">
                                <div className="col-md-6 p-0">
                                    <div className="col-md-12 form-group">
                                        <label className="col-md-3">Jurusan</label>
                                        <div className="col-md-9">
                                            <Select clearable={true} 
                                            name="jurusan"
                                            options={this.state.optionsJurusan} 
                                            values={this.state.setjurusan}
                                            onChange={(values) => this.setState({setjurusan: values})}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label className="col-md-3">Thn Ajaran</label>
                                        <div className="col-md-9">
                                            <Select clearable={true} 
                                            name="thn"
                                            options={this.state.optionsTahun} 
                                            values={this.state.settahun}
                                            onChange={(values) => this.setState({settahun: values})}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label className="col-md-3">Jumlah</label>
                                        <div className="col-md-9">
                                            <input className="form-control" 
                                            type="number"
                                            name="jumlah" 
                                            placeholder="2000" 
                                            value={this.state.setjumlah} 
                                            onChange={this.handleChange.bind(this)} 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 p-0">
                                    <div className="col-md-6 form-group">
                                        <label className="col-md-3 p-0">Kerja</label>
                                        <div className="col-md-9">
                                            <input className="form-control" 
                                            type="number"
                                            name="kerja" 
                                            placeholder="400" 
                                            value={this.state.setkerja} 
                                            onChange={this.handleChange.bind(this)} 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label className="col-md-3 p-0">Kuliah</label>
                                        <div className="col-md-9">
                                            <input className="form-control" 
                                            type="number"
                                            name="kuliah" 
                                            placeholder="400" 
                                            value={this.state.setkuliah} 
                                            onChange={this.handleChange.bind(this)} 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label className="col-md-3 p-0">Wirausaha</label>
                                        <div className="col-md-9">
                                            <input className="form-control" 
                                            type="number"
                                            name="wirausaha" 
                                            placeholder="400" 
                                            value={this.state.setwirausaha} 
                                            onChange={this.handleChange.bind(this)} 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label className="col-md-3 p-0">Militer</label>
                                        <div className="col-md-9">
                                            <input className="form-control" 
                                            type="number"
                                            name="militer" 
                                            placeholder="400" 
                                            value={this.state.setmiliter} 
                                            onChange={this.handleChange.bind(this)} 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label className="col-md-3 p-0">Lain<sup>2</sup></label>
                                        <div className="col-md-9">
                                            <input className="form-control" 
                                            type="number"
                                            name="lain" 
                                            placeholder="400" 
                                            value={this.state.setlain} 
                                            onChange={this.handleChange.bind(this)} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </span>
        )
    }
}