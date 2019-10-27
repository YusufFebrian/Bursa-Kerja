import React, { Component } from 'react';
import Axios from 'axios';
import Select from 'react-dropdown-select';
import Skin from '../skin';

class FormLowongan extends Component {

    constructor() {
      super();
      this.listSyarat = [];
      this.state = {
        type: '',
        lastNum: 0,
        syarat : this.listSyarat,

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

        // cobaElement: '',
        // cobaValue: 'the value'
      }

      this.addSyarat = this.addSyarat.bind(this);
      this.removeSyarat = this.removeSyarat.bind(this);
      this.handleChange = this.handleChange.bind(this);
      
    //   this.cobaRender = this.cobaRender.bind(this);
    //   this.cobaChange = this.cobaChange.bind(this);
    };

    componentWillMount() {
        this.formType();

        this.optionsPerusahaan();
        this.optionsTipe();
        this.optionsJurusan();

        // this.cobaRender();
    }
    
    formType() {
        let userid = this.props.match.params.id;
        let that = this;
        if (userid){
            Axios.post('/lowongan/data/'+userid).then(response => {
                let data = response.data;
                console.log(data.jurusan);
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
        if (typeof value != 'string') { value = '' };
        let num = this.state.lastNum;
        this.listSyarat.push(
            <div id={"syarat-"+num} className="col-md-12 p-0 mb-1" key={num}>
                <div className="col-md-1 p-0 mt-2 d-flex justify-content-center align-items-center">
                    <i className="fas fa-dot-circle"></i>
                </div>
                <div className="col-md-9 p-0">
                    <input name='input_syarat' className="form-control" placeholder="Pekerja Keras" value={value} onChange={this.handleChange}/>
                </div>
                <div className="col-md-2 pt-1"><button type="button" className="btn btn-danger" onClick={() => this.removeSyarat(num)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
        );
        
        this.setState({
            syarat : this.listSyarat,
            lastNum: num+1
        });
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
        this.setState({
            syarat : this.listSyarat,
            postVal : ""
        });
    }

    handleChange(e) {
        let {name, value} = e.target;
        let statenm = 'set'+name;

        this.setState({
            [statenm]: value
        })
    }

    Submitter(el) {
        el.preventDefault();
        let syarat = [];
        el.target.input_syarat.forEach(function(e){
            syarat.push(e.value);
        })
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

    // cobaRender() {
    //     let coba = <input type="text" name="coba" value={this.state.cobaValue} onChange={this.cobaChange.bind(this)} />;

    //     this.setState({
    //         cobaElement: coba
    //     })
    // }

    // cobaChange(e) {
    //     this.setState({
    //         cobaValue: e.target.value
    //     })
    // }

    render() {
        return (
            <span>
                <Skin/>
                <div className="contents">
                    <form onSubmit={this.Submitter.bind(this)}>
                        <div className="panel panel-warning">
                            <div className="panel-heading" style={{fontSize: '24px', fontWeight: '800'}}>
                                {this.state.type} Lowongan
                                <button type="submit" className="btn btn-primary float-right ml-1">Simpan</button>
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
                                            onChange={(values) => {this.setState({setjurusan: values}); console.log(values)}}
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
                                            //     console.log(val);
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