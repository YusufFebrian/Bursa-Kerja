import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Select from 'react-dropdown-select';
import Skin from '../skin';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

export default class FormThnAjaran extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            content: '',

            id: '',
            settahun: ''
        }

        this.formEdit = this.formEdit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.Delete = this.Delete.bind(this);
        this.Submitter = this.Submitter.bind(this);
    }

    componentWillMount() {
        this.formType();
    }

    formType() {
        if (this.props.type == 'edit'){
            Axios.post('/tahun-ajaran/data/'+this.props.dataid).then(response => {
                let data = response.data;
                this.setState({
                    title: 'Ubah Tahun Ajaran',
                    id: data.id,
                    settahun: (data.tahun ? data.tahun : '')
                })
                this.setState({ content:this.formEdit(data.tahun) });
    
            }).catch(error => console.error(error));

        } else if (this.props.type == 'ADD'){
            this.setState({
                title: 'Tambah Tahun Ajaran'
            })

        } else if (this.props.type == 'delete') {
            this.setState({
                title: 'Konfirmasi Hapus'
            })

        }
        console.log(this.state.settahun+'dsad');
        if (this.props.type == 'add') {
            this.setState({ content:this.formAdd() });

        } else if (this.props.type == 'edit') {
            // this.setState({ content:this.formEdit() });

        } else if (this.props.type == 'delete') {
            this.setState({ content:this.formDelete() });

        }
    }

    formAdd() {
        return (
            <form onSubmit={this.Submitter}>
                <div className="col-md-12 p-0">
                    <div className="col-md-9 form-group">
                        <label className="col-md-3">Tahun</label>
                        <div className="col-md-9">
                            <input type="text" name="tahun" className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="col-md-12 p-0 text-right">
                    <button type="button" className="btn btn-danger mr-1" onClick={this.closeModal}>
                        <i className="fa fa-arrow-left"></i> Kembali
                    </button>
                    <button type="submit" className="btn btn-success">
                        <i className="fa fa-save"></i> Simpan
                    </button>
                </div>
            </form>
        );
    }
    
    formEdit(tahun) {
        return (
            <form onSubmit={this.Submitter}>
                <div className="col-md-12 p-0">
                    <div className="col-md-9 form-group">
                        <label className="col-md-3">Tahun</label>
                        <div className="col-md-9">
                            <input type="text" name="tahun" 
                            className="form-control" 
                            placeholder="PT. Indonesia Raya" 
                            value={tahun} onChange={this.handleChange.bind(this)} />
                        </div>
                    </div>
                </div>
                <div className="col-md-12 p-0 text-right">
                    <button type="button" className="btn btn-danger mr-1" onClick={this.closeModal}>
                        <i className="fa fa-arrow-left"></i> Kembali
                    </button>
                    <button type="submit" className="btn btn-success">
                        <i className="fa fa-save"></i> Simpan
                    </button>
                </div>
            </form>
        );
    }

    formDelete() {
        return (
            <div>
                <div className="col-md-12 p-0 my-3 text-center">
                    Yakin Ingin Menghapus data <b>{this.props.dataid}</b>?
                </div>
                <div className="col-md-12 p-0 text-right">
                    <button className="btn btn-danger mr-1" onClick={this.closeModal}>
                        <i className="fa fa-times"></i> Tidak
                    </button>
                    <button className="btn btn-success" onClick={this.Delete}>
                        <i className="fa fa-check"></i> Ya
                    </button>
                </div>
            </div>
        );
    }

    closeModal() {
        this.props.onClose('d');
    }

    handleChange(e) {
        let {name, value} = e.target;
        let statenm = 'set'+name;
        
        this.setState({
            [statenm]: value,
            content: this.formEdit(value)
        })
    }

    Delete() {
        let data = {'dataid': this.props.dataid}
        Axios.post('/tahun-ajaran/delete', data).then(response => {
            if (response.data.goal == true){
                this.closeModal();
            }
        }).catch(error => console.error(error));
    }

    Submitter(e) {
        e.preventDefault();
        let data = {
            id          : this.props.dataid,
            tahun       : e.target.tahun.value
        };
        Axios.post('/tahun-ajaran/'+this.props.type+'/process', data).then(response => {
            if (response.data.goal == true) {
                this.closeModal();
            }
        }).catch(error => console.error(error));
    }

    render() {
        return (
            <span>
                <div className="col-md-12">
                    <label>
                        <h4 className="m-0">{this.state.title}</h4>
                        {/* <DatePicker/> */}
                    </label>
                    <button className="close float-right" onClick={this.closeModal}>x</button>
                </div>
                {this.state.content}
            </span>
        );
    }
}