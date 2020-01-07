import React, { Component } from 'react';
import Axios from 'axios';
import Select from 'react-dropdown-select';
import Skin from '../skin';
import Syarat from './syarat';

class FormLowongan extends Component {

    constructor() {
      super();
      this.listSyarat = [];
      this.state = {
        type: '',
        lastNum: 0,
        syarat : this.listSyarat,
        syaratVal: {},

        id: '',
        setperusahaan: [],
        settipe: [],
        setdeskripsi: '',
        setposisi: '',
        settglrekrut: '',
        setjurusan: [],
        settest: '',

        optionsPerusahaan: [],
        optionsTipe: [],
        optionsJurusan: [],

        added: false,
      }

      this.addSyarat = this.addSyarat.bind(this);
      this.editSyarat = this.editSyarat.bind(this);
      this.removeSyarat = this.removeSyarat.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.checkTiket = this.checkTiket.bind(this);
      this.addTicket = this.addTicket.bind(this);
    };

    componentWillMount() {
        this.formType();

        this.optionsPerusahaan();
        this.optionsTipe();
        this.optionsJurusan();
    }
    
    formType() {
        let dataid = this.props.match.params.id;
        let that = this;
        if (dataid){
            Axios.post('/lowongan/data/'+dataid).then(response => {
                let data = response.data;
                this.setState({
                    type: 'Ubah',
                    id: data.id,
                    setperusahaan: (data.perusahaanid ? [{value: data.perusahaanid, label: data.perusahaan}] : []),
                    settipe: (data.tipeid ? [{value: data.tipeid, label: data.tipe}] : []),
                    setdeskripsi: (data.deskripsi ? data.deskripsi : ''),
                    setposisi: (data.posisi ? data.posisi : ''),
                    settglrekrut: (data.tgl_rekrutmen ? data.tgl_rekrutmen : ''),
                    setjurusan: (data.jurusan ? data.jurusan : [])
                })

                data.syarat.forEach(function(value){
                    that.addSyarat(value);
                })
            }).catch(error => console.error(error));
        } else {
            this.setState({
                type: 'Tambah'
            })
        }
        
        this.checkTiket(dataid);
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

    optionsTipe() {
        Axios.post('/option/tipelowongan').then(response => {
            if (response.data.goal == true) {
                this.setState({
                    optionsTipe: response.data.option
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

    addSyarat(value) {
        if (typeof value != 'string') value = '';
        let num = this.state.lastNum;
        this.listSyarat.push(
            <Syarat key={num} value={value} num={num} change={this.editSyarat} remove={this.removeSyarat} />
        );

        let syaratVal = this.state.syaratVal;
        syaratVal['val-'+num] = value;
        
        this.setState({
            syarat : this.listSyarat,
            lastNum: num+1,
            syaratVal: syaratVal
        });
    }

    editSyarat(val, num) {
        let syaratVal = this.state.syaratVal;
        syaratVal['val-'+num] = val;

        this.setState({
            syaratVal: syaratVal
        })
        console.log(this.state.syaratVal)
    }

    removeSyarat(key_remove) {
        let old = this.listSyarat;
        let key_syarat = 0;
        old.forEach(function(val, i){
            if (val.key == key_remove) {
                key_syarat = i;
            }
        })
        old.splice(key_syarat, 1);
        let syaratVal = this.state.syaratVal;
        syaratVal['val-'+key_remove] = '';

        this.setState({
            syarat : this.listSyarat,
            syaratVal: syaratVal
        });
    }

    handleChange(e) {
        let {name, value} = e.target;
        let statenm = 'set'+name;

        this.setState({
            [statenm]: value
        })
    }

    checkTiket(id) {
        Axios.post('/tiket/check', {lowonganid: id}).then(response => {
            if (response.data.goal == true) {
                this.setState({
                    added: true
                })
            }
        }).catch(error => console.error(error));
    }

    addTicket() {
        Axios.post('/tiket/add', {lowonganid: this.state.id}).then(response => {
            if (response.data.goal == true) {
                this.setState({
                    added: true
                })
            }
        }).catch(error => console.error(error));
    }

    Submitter(el) {
        el.preventDefault();

        let syarat = [];
        for (let key in this.state.syaratVal) {
            if ( this.state.syaratVal[key] ) {
                syarat.push(this.state.syaratVal[key])
            }
        }

        let data  = {
            id          : this.state.id,
            perusahaan  : this.state.setperusahaan[0],
            posisi      : this.state.setposisi,
            tipe        : this.state.settipe[0],
            tglrekrut   : this.state.settglrekrut,
            deskripsi   : this.state.setdeskripsi,
            jurusan     : this.state.setjurusan,
            syarat      : syarat
        };
        Axios.post(this.props.match.url+'/process', data).then(response => {
            if (response.data.goal == true) {
                this.props.history.push('/lowongan');
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
                            <div className="panel-heading" style={{fontSize: '24px', fontWeight: '800'}}>
                                {this.state.type} Lowongan
                                <button type="submit" className="btn btn-primary float-right ml-1">Simpan</button>
                                {
                                    (this.state.type == 'Ubah') &&
                                    (this.state.added == false ? 
                                        <button type="button" className="btn btn-warning float-right ml-1"
                                        onClick={this.addTicket}>Daftar</button>
                                    :
                                        <button type="button" className="btn btn-warning disabled float-right ml-1">Terdaftar</button>
                                    )
                                }
                                <button onClick={() => { this.props.history.push('/lowongan') }} 
                                className="btn btn-danger float-right">
                                    <i className="fa fa-arrow-left"></i> Kembali
                                </button>
                            </div>
                            <div className="panel-body">
                                <div className="col-md-6 p-0">
                                    <div className="col-md-12 form-group">
                                        <label className="col-md-3">Perusahaan</label>
                                        <div className="col-md-9">
                                            <Select clearable={true} 
                                            name="perusahaan"
                                            options={this.state.optionsPerusahaan} 
                                            values={this.state.setperusahaan}
                                            onChange={(values) => this.setState({setperusahaan: values})}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label className="col-md-3">Tipe</label>
                                        <div className="col-md-9">
                                            <Select clearable={true} 
                                            name="tipe"
                                            options={this.state.optionsTipe} 
                                            values={this.state.settipe}
                                            onChange={(values) => this.setState({settipe: values})}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label className="col-md-3">Deskripsi</label>
                                        <div className="col-md-9">
                                            <textarea className="form-control" 
                                            name="deskripsi" 
                                            placeholder="S&K Berlaku" 
                                            value={this.state.setdeskripsi} 
                                            onChange={this.handleChange.bind(this)} 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 p-0">
                                    <div className="col-md-12 form-group">
                                        <label className="col-md-3">Posisi</label>
                                        <div className="col-md-9">
                                            <input className="form-control" 
                                            name="posisi" 
                                            placeholder="Admin" 
                                            value={this.state.setposisi} 
                                            onChange={this.handleChange.bind(this)} 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label className="col-md-3">Tgl Rekrutmen</label>
                                        <div className="col-md-9">
                                            <input className="form-control" 
                                            name="tglrekrut" 
                                            placeholder="2012-12-12" 
                                            value={this.state.settglrekrut} 
                                            onChange={this.handleChange.bind(this)} 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label className="col-md-3">Jurusan</label>
                                        <div className="col-md-9">
                                            <Select clearable={true} 
                                            multi={true}
                                            name="jurusan"
                                            options={this.state.optionsJurusan}
                                            values={this.state.setjurusan}
                                            valueField='value'
                                            labelField='akronim'
                                            onChange={(values) => {this.setState({setjurusan: values});}}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    {/* {this.state.cobaElement} */}
                                    <div className="col-md-12 mb-3">
                                        <button type="button" className="btn btn-success float-left" onClick={this.addSyarat}>
                                            <i className="fas fa-plus"></i>
                                        </button>
                                        <label className="col-md-3 mt-1">Syarat & Ketentuan</label>
                                    </div>
                                    <div id="list-syarat" className="col-md-12">
                                        {
                                            this.listSyarat
                                            // .map(function(val) { 
                                            //     return val;
                                            // })
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


export default FormLowongan;