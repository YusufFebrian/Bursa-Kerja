import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Modal from 'react-modal';
import Skin from '../skin';
import FormThnAjaran from './form';
import Select from 'react-dropdown-select';

const customStyles = {
    content : {
        zIndex                : '3',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

export default class ThnAjaran extends Component {
    constructor() {
        super();
        this.state = {
            setSearch: '',
            setShow: '',
            setOffset: '1',
            setLimit: [{label: '10', value: 10}],
            setRows: 0,
            tbody: "",

            visible: false,
            modalIsOpen: false,
            modalContent: <p/>
        }

        this.actionClick = this.actionClick.bind(this);
        this.tableControl = this.tableControl.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        this.tableControl();
    }
    
    renderTbody(filter){
        Axios.post('/tahun-ajaran/table', filter).then(response => {
            let limit = filter.limit[0].value;
            let num = filter.offset*limit-limit;
            let fNum = num+1;
            let tbody = "";
            response.data.table.forEach(value => {
                let editBtn = "<button tipe='edit' dataid='"+ value.id +"' class='btn btn-primary btn-sm mr-1'>"+
                                "<i class='fa fa-edit'></i>"+
                            "</button>";
                let deleteBtn = "<button tipe='delete' dataid='"+ value.id +"' class='btn btn-danger btn-sm mr-1'>"+
                                    "<i class='fa fa-trash'></i>"+
                                "</button>";
                tbody += "<tr>";
                    tbody += "<td>"+ (++num) +"</td>";
                    tbody += "<td>"+ value.tahun +"</td>";
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

        if (el && el.getAttribute('tipe') === "delete") {
            this.setState({
                dataid: el.getAttribute('dataid'),
                modalType: el.getAttribute('tipe')
            })
            
            this.setState({
                modalIsOpen: true
            })
        }
    }

    tableControl(el = -1, type = '') {
        let filter = {};
        filter.limit = this.state.setLimit;
        filter.search = this.state.setSearch;
        filter.offset = this.state.setOffset;

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

    closeModal() {
        this.setState({ 
            modalIsOpen: false 
        })
        this.tableControl();
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
                            <span class="panel-title">Data Tahun Ajaran</span>
                            <button tipe="add" onClick={this.actionClick} dataid=""
                            className="btn btn-success float-right">
                                <i className="fa fa-plus"></i> Tambah
                            </button>
                        </div>
                        <div className="panel-body">
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
                                        <th>Tahun</th>
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
                            <Modal isOpen={this.state.modalIsOpen} contentLabel="Modalr" style={customStyles}>
                                <FormThnAjaran type={this.state.modalType} 
                                dataid={this.state.dataid} 
                                onClose={this.closeModal} />
                            </Modal>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
}