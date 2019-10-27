import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Select from 'react-dropdown-select';
import Skin from '../skin';

const LinkBack = withRouter(({ history }) => (
    <button onClick={() => { history.push('/perusahaan') }} className="btn btn-danger float-right">
        <i className="fa fa-arrow-left"></i> Kembali
    </button>
))

export default class Formperusahaan extends Component {
    constructor(){
        super();
        this.state = {
            type: '',

            id: '',
            setnama: '',
            setalamat: '',
            setemail: '',
            setnotelp: '',
            setnama_hrd: '',
            setnotelp_hrd: ''
        }
    }

    componentWillMount() {
        this.formType();
    }

    formType() {
        let dataid = this.props.match.params.id;
        if (dataid){
            Axios.post('/perusahaan/data/'+dataid).then(response => {
                let data = response.data;
                this.setState({
                    type: 'Ubah',
                    id: data.id,
                    setnama: (data.nama ? data.nama : ''),
                    setalamat: (data.alamat ? data.alamat : ''),
                    setemal: (data.email ? data.email : ''),
                    setnotelp: (data.notelp ? data.notelp : ''),
                    setnama_hrd: (data.nama_hrd ? data.nama_hrd : ''),
                    setnotelp_hrd: (data.notelp_hrd ? data.notelp_hrd : '')
                })
            }).catch(error => console.error(error));
        } else {
            this.setState({
                type: 'Tambah'
            })
        }
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
        let data = {
            id          : this.state.id,
            nama        : e.target.nama.value,
            alamat      : e.target.alamat.value,
            email       : e.target.email.value,
            notelp      : e.target.notelp.value,
            nama_hrd    : e.target.nama_hrd.value,
            notelp_hrd  : e.target.notelp_hrd.value
        };
        Axios.post(this.props.match.url+'/process', data).then(response => {
            if (response.data.goal == true) {
                this.props.history.push('/perusahaan');
            }
        }).catch(error => console.error(error));
    }

    render() {
        return (
            <span>
                <Skin/>
                <div className="contents">
                    <form onSubmit={this.Submitter.bind(this)}>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <span class="panel-title">{this.state.type} Perusahaan</span>
                                <button type="submit" className="btn btn-primary float-right ml-1">Simpan</button>
                                <LinkBack/>
                            </div>
                            <div className="panel-body">
                                <div className="col-md-6 form-group">
                                    <label className="col-md-3">Nama</label>
                                    <div className="col-md-9 p-0">
                                        <input className="form-control" 
                                        name="nama" 
                                        placeholder="PT. Indonesia Raya" 
                                        value={this.state.setnama} 
                                        onChange={this.handleChange.bind(this)} 
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label className="col-md-3">Nama HRD</label>
                                    <div className="col-md-9 p-0">
                                        <input className="form-control" 
                                        name="nama_hrd" 
                                        placeholder="Jokowi" 
                                        value={this.state.setnama_hrd} 
                                        onChange={this.handleChange.bind(this)} 
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label className="col-md-3">Email</label>
                                    <div className="col-md-9 p-0">
                                        <input className="form-control" 
                                        name="email" 
                                        placeholder="pt_ia@skariga.com" 
                                        value={this.state.setemail} 
                                        onChange={this.handleChange.bind(this)} 
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label className="col-md-3">No Telp HRD</label>
                                    <div className="col-md-9 p-0">
                                        <input className="form-control" 
                                        name="notelp_hrd" 
                                        placeholder="081xxxxxxxx" 
                                        value={this.state.setnotelp_hrd} 
                                        onChange={this.handleChange.bind(this)} 
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label className="col-md-3">No Telp</label>
                                    <div className="col-md-9 p-0">
                                        <input className="form-control" 
                                        name="notelp" 
                                        placeholder="0341xxxxxx" 
                                        value={this.state.setnotelp} 
                                        onChange={this.handleChange.bind(this)} 
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label className="col-md-3">Alamat</label>
                                    <div className="col-md-9 p-0">
                                        <textarea className="form-control" 
                                        name="alamat" 
                                        placeholder="Jln. Raya Besar No.01" 
                                        value={this.state.setalamat} 
                                        onChange={this.handleChange.bind(this)} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </span>
        );
    }
}