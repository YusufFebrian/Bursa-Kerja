import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Select from 'react-dropdown-select';
import Skin from '../skin';

const LinkBack = withRouter(({ history }) => (
    <button onClick={() => { history.push('/prakerin') }} className="btn btn-danger float-right">
        <i className="fa fa-arrow-left"></i> Kembali
    </button>
))

export default class Formprakerin extends Component {
    constructor(){
        super();
        
        this.listSiswa = [];
        this.state = {
            type: '',
            lastNum: 0,
            listKey: [],
            listVal: [],
            siswa : this.listSiswa,
            values : [],

            id: '',
            setperusahaan: [],
            setsiswa: [],

            optionsPerusahaan: [],
            optionsSiswa: []
        }
        
        this.addSiswa = this.addSiswa.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeSiswa = this.removeSiswa.bind(this);
        this.Submitter = this.Submitter.bind(this);
    }

    componentWillMount() {
        this.optionsPerusahaan();
        this.optionsSiswa();
        
        this.formType();
    }
    
    formType() {
        let dataid = this.props.match.params.id;
        let that = this;
        if (dataid){
            Axios.post('/prakerin/data/'+dataid).then(response => {
                let data = response.data;
                this.setState({
                    type: 'Ubah',
                    id: data.id,
                    setperusahaan: (data.perusahaan ? [{value: data.perusahaanid, label: data.perusahaan}] : [])
                })
                data.siswa.forEach(function(value){
                    that.addSiswa([value]);
                })
            }).catch(error => console.error(error));
        } else {
            this.setState({
                type: 'Tambah'
            })
        }
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

    optionsSiswa() {
        Axios.post('/option/siswa').then(response => {
            if (response.data.goal == true) {
                this.setState({
                    optionsSiswa: response.data.option
                })
            }
        }).catch(error => console.error(error));
    }
    
    addSiswa(value = []) {
        let num = this.state.lastNum;
        let listkey = this.state.listKey;
        listkey.push(num);
        // console.log(listkey)
        // console.log(this.listSiswa)

        this.setState({
            listKey: listkey
        })
        this.listSiswa.push(
            <div id={"siswa-"+num} className="col-md-12 p-0 mb-1" key={num}>
                <div className="col-md-1 p-0 mt-2 d-flex justify-content-center align-items-center">
                    <i className=   "fas fa-dot-circle"></i>
                </div>
                <div className="col-md-9 p-0">
                    <Select 
                    clearable={true} 
                    name="select_siswa"
                    options={this.state.optionsSiswa} 
                    values={value}
                    onChange={(values) => {this.handleChange(num, values)} }
                    />
                </div>
                <div className="col-md-2 pt-1"><button type="button" className="btn btn-danger" onClick={() => this.removeSiswa(num)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
        );
        
        this.setState({
            siswa : this.listSiswa,
            lastNum: num+1
        });
    }

    removeSiswa(key_remove) {
        let old = this.listSiswa;
        let oldlistKey = this.state.listKey;
        let key_siswa = 0;
        old.forEach(function(val, i){
            if (val.key == key_remove) {
                key_siswa = i;
            }
        })

        old.splice(key_siswa, 1);
        oldlistKey.splice(key_siswa, 1);

        this.setState({
            siswa : this.listSiswa,
            listKey : oldlistKey,
            postVal : ""
        });
    }

    handleChange(key, val) {
        let values = this.state.values;
        let statenm = 'set_'+key;
        values[statenm] = val;

        this.setState({
            values: values
        })
    }

    Submitter(e) {
        e.preventDefault();
        let siswa = [];
        let that = this;
        this.listSiswa.forEach(function(e){
            if (that.state.values['set_'+e.key].length) {
                siswa.push(that.state.values['set_'+e.key][0].value);
            }
        })
        let data = {
            id          : this.state.id,
            perusahaan  : this.state.setperusahaan[0].value,
            siswa       : siswa
        };
        
        Axios.post(this.props.match.url+'/process', data).then(response => {
            if (response.data.goal == true) {
                this.props.history.push('/prakerin');
            }
        }).catch(error => console.error(error));
    }

    render() {
        return (
            <span>
                <Skin/>
                <div className="contents">
                    <form onSubmit={this.Submitter.bind(this)}>
                        <div className="panel">
                            <div className="panel-heading">
                                <span class="panel-title">{this.state.type} Prakerin</span>
                                <button type="submit" className="btn btn-primary float-right ml-1">Simpan</button>
                                <LinkBack/>
                            </div>
                            <div className="panel-body">
                                <div className="col-md-6 form-group">
                                    <label className="col-md-3">Perusahaan</label>
                                    <div className="col-md-9 p-0">
                                        <Select clearable={true} 
                                        name="perusahaan"
                                        options={this.state.optionsPerusahaan} 
                                        values={this.state.setperusahaan}
                                        onChange={(values) => this.setState({setperusahaan: values})}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    {/* {this.state.cobaElement} */}
                                    <div className="col-md-12 mb-3">
                                        <button type="button" className="btn btn-success float-left" onClick={() => { this.addSiswa() }}>
                                            <i className="fas fa-plus"></i>
                                        </button>
                                        <label className="col-md-3 mt-1">Daftar Siswa</label>
                                    </div>
                                    <div id="list-siswa" className="col-md-12">
                                        {
                                            this.listSiswa.map(function(val) { 
                                                return val;
                                            })
                                        }
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