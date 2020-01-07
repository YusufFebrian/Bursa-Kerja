import React, { Component } from 'react';
import {BrowserRouter as Router, withRouter, Redirect} from 'react-router-dom';
import { withAlert } from 'react-alert';
import Axios from 'axios';
import Select from 'react-dropdown-select';
import Skin from '../skin';

const LinkBack = withRouter(({ history }) => (
    <button onClick={() => { history.push('/user') }} className="btn btn-danger float-right">
        <i className="fa fa-arrow-left"></i> Kembali
    </button>
))

class Formuser extends Component {
    constructor(){
        super();


        this.alert = [];
        this.tipeform =  [];
        this.state = {
            type: '',

            id: '',
            setnama: '',
            setusername: '',
            setpassword: '',
            settipe: [],
            setjurusan: [],
            settahun: [],
            setperusahaan: [],

            optionsType: [],
            optionsJurusan: [],
            optionsTahun: [],
            optionsPerusahaan: []
        }

        this.notif = this.notif.bind(this);
    }

    componentWillMount() {
        this.formType();

        this.optionsType();
        this.optionsJurusan();
        this.optionsTahun();
        this.optionsPerusahaan();
    }

    formType() {
        let userid = this.props.match.params.id;
        if (userid){
            Axios.post('/user/data/'+userid).then(response => {
                let data = response.data;
                this.setState({
                    type: 'Ubah',
                    id: data.id,
                    setnama: (data.nama ? data.nama : ''),
                    setusername: (data.username ? data.username : ''),
                    setpassword: (data.password ? data.password : ''),
                    settipe: (data.tipeid ? [{value: data.tipeid, label: data.tipe}] : []),
                    setjurusan: (data.jurusanid ? [{value: data.jurusanid, label: data.jurusan}] : []),
                    settahun: (data.thn_ajaran ? [{value: data.thn_ajaran, label: data.tahun}] : []),
                    setperusahaan: (data.perusahaanid ? [{value: data.perusahaanid, label: data.perusahaan}] : [])
                })
            }).catch(error => console.error(error));
        } else {
            this.setState({
                type: 'Tambah'
            })
        }
    }

    optionsType() {
        Axios.post('/option/usertype').then(response => {
            if (response.data.goal == true) {
                this.setState({
                    optionsType: response.data.option
                })
            }
        }).catch(error => console.error(error));
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

    optionsPerusahaan() {
        Axios.post('/option/perusahaan').then(response => {
            if (response.data.goal == true) {
                this.setState({
                    optionsPerusahaan: response.data.option
                })
            }
        }).catch(error => console.error(error));
    }

    notif() {
        this.props.alert.show("complete the form");
    }

    handleChange(e) {
        let {name, value} = e.target;
        let statenm = 'set'+name;

        this.setState({
            [statenm]: value
        })
    }

    changeTipe(val) {
        this.tipeform = [];
        this.setState({ settipe: val });
        let siswa1 = <div className="col-md-12 form-group" key='1'>
                        <label className="col-md-3">Jurusan</label>
                        <div className="col-md-9 p-0">
                            <Select clearable={true} 
                            name="jurusan" 
                            options={this.state.optionsJurusan} 
                            values={this.state.setjurusan} 
                            onChange={(values) => this.setState({setjurusan: values})}
                            required
                            />
                        </div>
                    </div>;
        let siswa2 = <div className="col-md-12 form-group" key='2'>
                        <label className="col-md-3">Tahun Ajaran</label>
                        <div className="col-md-9 p-0">
                            <Select clearable={true} 
                            name="tahun" 
                            options={this.state.optionsTahun} 
                            values={this.state.settahun} 
                            onChange={(values) => this.setState({settahun: values})}
                            required
                            />
                        </div>
                    </div>;
        let industri =  <div className="col-md-12 form-group" key='3'>
                            <label className="col-md-3">Perusahaan</label>
                            <div className="col-md-9 p-0">
                                <Select clearable={true} 
                                name="perusahaan" 
                                options={this.state.optionsPerusahaan} 
                                values={this.state.setperusahaan} 
                                onChange={(values) => this.setState({setperusahaan: values})}
                                required
                                />
                            </div>
                        </div>;
        
        if (val && val[0]) {
            let tipe = val[0].value;
            if (tipe == 3 || tipe == 4) {
                this.tipeform.push(siswa1);
                this.tipeform.push(siswa2);
            } else if (tipe == 5) {
                this.tipeform.push(industri);
            }
        }
    }

    Submitter(e) {
        e.preventDefault();
        let data = {
            id          : this.state.id,
            nama        : e.target.nama.value,
            username    : e.target.username.value,
            password    : e.target.password.value,
            tipe        : this.state.settipe[0].value
        };
        if (data.tipe == 3 || data.tipe == 4) {
            data.jurusan = this.state.setjurusan[0].value;
            data.tahun = this.state.settahun[0].value;
        } else if (data.tipe == 5) {
            data.perusahaan = this.state.setperusahaan[0].value;
        }

        Axios.post(this.props.match.url+'/process', data).then(response => {
            if (response.data.goal == true) {
                this.props.history.push('/user');
            }
        }).catch(error => console.error(error));
    }

    render() {
        // const alert = useAlert();
        return (
            <span>
                <Skin/>
                <div className="contents">
                    <form onSubmit={this.Submitter.bind(this)}>
                        <div className="panel">
                            <div className="panel-heading">
                                <span class="panel-title">{this.state.type} User</span>
                                <button type="submit" className="btn btn-primary float-right ml-1">Simpan</button>
                                <LinkBack/>
                                <button type="button" onClick={this.notif}>sa</button>
                            </div>
                            
                            <div className="panel-body">
                                <div className="col-md-6 p-0">
                                    <div className="col-md-12 form-group">
                                        <label className="col-md-3">Nama</label>
                                        <div className="col-md-9 p-0">
                                            <input className="form-control" 
                                            name="nama" 
                                            placeholder="bki user" 
                                            value={this.state.setnama} 
                                            onChange={this.handleChange.bind(this)} 
                                            required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label className="col-md-3">Username</label>
                                        <div className="col-md-9 p-0">
                                            <input className="form-control" 
                                            name="username" 
                                            placeholder="bki_user@gmail.com" 
                                            value={this.state.setusername} 
                                            onChange={this.handleChange.bind(this)} 
                                            required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label className="col-md-3">Password</label>
                                        <div className="col-md-9 p-0">
                                            <input className="form-control" 
                                            name="password" 
                                            placeholder="bkiuser123" 
                                            value={this.state.setpassword} 
                                            onChange={this.handleChange.bind(this)} 
                                            required={this.state.type == 'Ubah' ? false : true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 p-0">
                                    <div className="col-md-12 form-group">
                                        <label className="col-md-3">Tipe</label>
                                        <div className="col-md-9 p-0">
                                            <Select clearable={true} 
                                            name="tipe"
                                            options={this.state.optionsType} 
                                            values={this.state.settipe}
                                            onChange={(values) => this.changeTipe(values) }
                                            required
                                            />
                                        </div>
                                    </div>
                                    {this.tipeform}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </span>
        );
    }
}

export default withAlert()(Formuser)