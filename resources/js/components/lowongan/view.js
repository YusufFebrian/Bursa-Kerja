import React, { Component } from 'react';
import Axios from 'axios';
import Select from 'react-dropdown-select';
import Skin from '../skin';

export default class Lowongan extends Component {
    constructor() {
        super();
        this.state = {
            setSearch: '',
            setShow: '',
            setOffset: '1',
            setLimit: [{label: '10', value: 10}],
            setRows: 0,
            tbody: '',

            lowongan: [],
            // optionsJurusan: [],
            // order1: '',
            // order2: '',
            // filsterSearch: '',
            // filterJurusan: [],
            // filterTipe: [],
            // filtertglFrom: '',
            // filtertglTo: ''
        }

        // this.renderData = this.renderData.bind(this);
        this.detailData = this.detailData.bind(this);
        this.actionClick = this.actionClick.bind(this);
        this.tableControl = this.tableControl.bind(this);
    }

    componentWillMount() {
        this.tableControl();
        // this.renderData();

        // this.optionsJurusan();
    }

    // renderData() {
    //     let jurusan = [];
    //     this.state.filterJurusan.forEach(function(val) {
    //         jurusan.push(val.value);
    //     })

    //     let data = {
    //         cari: this.state.filterSearch,
    //         tipe: this.state.filterTipe[0],
    //         jurusan: jurusan,
    //         tglFrom: this.state.filtertglFrom,
    //         tglTo: this.state.filtertglTo,
    //         order1: this.state.order1[0],
    //         order2: this.state.order2[0]
    //     }

    //     axios.post('/lowongan/table', data).then(response => {
    //         this.setState({
    //             lowongan: response.data.lowongan
    //         })
    //     }).catch((error) => console.error(error))
    // }
    
    // optionsJurusan() {
    //     Axios.post('/option/jurusan').then(response => {
    //         if (response.data.goal == true) {
    //             this.setState({
    //                 optionsJurusan: response.data.option
    //             })
    //         }
    //     }).catch(error => console.error(error));
    // }

    // changeFilter(e) {
    //     let {name, value} = e.target;
    //     let statenm = 'filter'+name;

    //     this.setState({
    //         [statenm]: value
    //     })

    //     this.renderData();
    // }

    detailData(dataid) {
        this.props.history.push('/lowongan/edit/'+dataid);
    }
    
    renderTbody(filter){
        Axios.post('/lowongan/table', filter).then(response => {
            let limit = filter.limit[0].value;
            let num = filter.offset*limit-limit;
            let fNum = num+1;
            let tbody = "";
            response.data.lowongan.forEach(value => {
                let editBtn = "<button tipe='edit' dataid='"+ value.id +"' class='btn btn-primary btn-sm mr-1'>"+
                                "<i class='fa fa-edit'></i>"+
                            "</button>";
                let deleteBtn = "<button tipe='delete' dataid='"+ value.id +"' class='btn btn-danger btn-sm mr-1'>"+
                                    "<i class='fa fa-trash'></i>"+
                                "</button>";
                tbody += "<tr>";
                    tbody += "<td>"+ (++num) +"</td>";
                    tbody += "<td>"+ value.posisi +"</td>";
                    tbody += "<td>"+ value.perusahaan +"</td>";
                    tbody += "<td>"+ value.tgl_rekrutmen +"</td>";
                    tbody += "<td>"+ (value.pendaftar ? value.pendaftar : '0') +"</td>";
                    tbody += "<td>"+ editBtn+" "+deleteBtn +"</td>";
                tbody += "</tr>";
            });

            let lNum = num;
            this.setState({
                tbody: tbody,
                setShow: `Showing ${fNum} to ${lNum} from ${response.data.rows} data`,
                setRows: response.data.rows
            })
        }).catch(error => console.error(error));
    }
    
    actionClick(e){
        let el = e.target;
        while (el && el !== e.currentTarget && el.tagName !== "BUTTON") {
            el = el.parentNode;
        }

        if (el && el.getAttribute('tipe') === "edit") {

            this.props.history.push('/lowongan/edit/'+el.getAttribute('dataid'));

        } else if (el && el.getAttribute('tipe') === "delete") {
            
            this.setState({modalIsOpen: true, dataid: el.getAttribute('dataid')});

        }
    }

    tableControl(el = -1, type = '') {
        let filter = {};
        filter.limit = this.state.setLimit;
        filter.search = this.state.setSearch;
        
        if (el != -1) {
            if (type != 'Offset') {
                filter.offset = 1;
                this.setState({ setOffset: 1 })
            }
            
            filter[type.toLowerCase()] = el;
            this.setState({ ['set'+type]: el })
        }

        this.renderTbody(filter);
    }

    render() {
        let optionsLimit = [
            {label: '10', value: 10},
            {label: '25', value: 25},
            {label: '50', value: 50},
            {label: '100', value: 100}
        ];

        let toOffset = Math.ceil(this.state.setRows / this.state.setLimit[0].value);
        let offsets = [{label: '<<', value: 1}];
        for (let i = 1; i <= toOffset; i++) {
            offsets.push({label: i, value: i});
        }
        offsets.push({label: '>>', value: toOffset});

        return (
            <span>
                <Skin/>
                <div className="contents">
                    <div className="panel">
                        <div className="panel-heading">
                            <span className="panel-title">Lowongan</span>
                            <button onClick={() => { this.props.history.push('/lowongan/add') }} className="btn btn-success float-right">
                                <i className="fa fa-plus"></i> Tambah
                            </button>
                            <a href="/lowongan/report" className="btn btn-warning float-right mr-1" target="_blank">
                                <i className="fa fa-print"></i> Print PDF
                            </a>
                        </div>
                        <div className="panel-body">
                            {/* <div className="col-md-12 pr-0 pl-5 py-3">
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
                            </div> */}
                            <div className="col-lg-3 mb-2 p-0">
                                <label className="col-lg-3 p-0 font-weight-bold">Show</label>
                                <div className="col-lg-8">
                                    <Select className="form-control" id="tbl-limit" options={optionsLimit}
                                    onChange={(e) => this.tableControl(e, 'Limit')} values={this.state.setLimit}/>
                                </div>
                            </div>

                            <div className="col-lg-4 mb-2 p-0 offset-lg-5">
                                <label className="col-lg-3 font-weight-bold">Search</label>
                                <div className="col-lg-9 pr-0">
                                    <input type="text" className="form-control" id="tbl-search" placeholder="Search..."
                                    onChange={(e) => this.tableControl(e.target.value, 'Search')} value={this.state.setSearch} />
                                </div>
                            </div>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Posisi</th>
                                        <th>Perusahaan</th>
                                        <th>Tgl Rekrutmen</th>
                                        <th>Pendaftar</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody onClick={this.actionClick} dangerouslySetInnerHTML={{__html: this.state.tbody}}/>
                            </table>
                            <div className="col-lg-6 mt-2 p-0">
                                <label>{this.state.setShow}</label>
                            </div>
                            <div className="col-lg-6 mt-2 p-0 d-flex justify-content-end">
                                {offsets.map((e, i) => {
                                    let active = (this.state.setOffset == e.label) ? 'active' : '';
                                    return (
                                        <button className={'tbl-page '+active} key={i}
                                        onClick={() => this.tableControl(e.value, 'Offset')}>
                                            {e.label}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    {/* {this.state.lowongan.map(function(data, i) {
                        return (
                            <div className="tile lowongan" key={i}>
                                <div className="tile-header dvd dvd-btm">
                                    <h1><b>{data.posisi}</b></h1>
                                    <ul className="controls">
                                        <li onClick={() => that.detailDats()}>
                                            <a className="hv-danger"><i className="fa fa-trash"></i></a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tile-widget" onClick={() => that.detailData(data.id)}>
                                    {data.perusahaan}
                                </div>
                                <div className="tile-body" onClick={() => that.detailData(data.id)}>
                                    {data.jurusan}
                                    <div className="float-right">
                                        Tanggal Rekrutmen : {data.tgl_rekrutmen}
                                    </div>
                                </div>
                            </div>
                        )
                    })} */}
                </div>
            </span>
        )
    }
}