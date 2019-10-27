import React, { Component } from 'react';
import Axios from 'axios';
import Select from 'react-dropdown-select';
import Skin from '../skin';

export default class Keterserapan extends Component {
    constructor() {
        super();

        this.tbody = [];
        this.state = {

        }
    }

    componentWillMount() {
        this.renderTbody();
    }

    renderTbody() {
        this.tbody = [];
    }

    Submitter(e) {
        e.preventDefault();


    }

    render() {
        return (
            <span>
                <Skin/>
                <div className="contents">
                    <div className="panel">
                        <div className="panel-heading" style={{fontSize: '24px', fontWeight: '800'}}>
                            <span class="panel-title">Data Perusahaan</span>
                            <LinkAdd/>
                        </div>
                        <div className="panel-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nama</th>
                                        <th>Alamat</th>
                                        <th>Email</th>
                                        <th>No Telp</th>
                                        <th>Nama HRD</th>
                                        <th>No Telp HRD</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {this.tbody.map(function(data, i) {
                                        return (
                                            <tr key={i}>
                                                <td>{i+1}</td>
                                                <td>{data.jurusan}</td>
                                                <td>{data.tahun}</td>
                                                <td>{data.jumlah}</td>
                                                <td>{data.kerja}</td>
                                                <td>{data.kuliah}</td>
                                                <td>{data.wirausaha}</td>
                                                <td>{data.militer}</td>
                                                <td>{data.lain}</td>
                                            </tr>
                                        )
                                    })} */}
                                </tbody>
                            </table>
                        </div>
                    </div>  
                </div>
            </span>
        )
    }
}