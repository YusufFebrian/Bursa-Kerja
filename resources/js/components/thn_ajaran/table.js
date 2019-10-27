import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Modal from 'react-modal';
import Skin from '../skin';
import FormThnAjaran from './form';

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
            tbody: "",
            visible: false,
            modalIsOpen: false,
            modalContent: <p/>
        }

        this.actionClick = this.actionClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        this.renderTbody();
    }
    
    renderTbody(){
        Axios.post('/tahun-ajaran/table').then(response => {
            let num = 1;
            let tbody = "";
            response.data.forEach(value => {
                let editBtn = "<button tipe='edit' dataid='"+ value.id +"' class='btn btn-primary btn-sm mr-1'>"+
                                "<i class='fa fa-edit'></i>"+
                            "</button>";
                let deleteBtn = "<button tipe='delete' dataid='"+ value.id +"' class='btn btn-danger btn-sm mr-1'>"+
                                    "<i class='fa fa-trash'></i>"+
                                "</button>";
                tbody += "<tr>";
                    tbody += "<td>"+ (num++) +"</td>";
                    tbody += "<td>"+ value.tahun +"</td>";
                    tbody += "<td>"+ editBtn+" "+deleteBtn +"</td>";
                tbody += "</tr>";
            });
            this.setState({
                tbody: tbody
            })
        }).catch(error => console.error(error));
    }
    
    actionClick(e){
        let el = e.target;
        while (el && el !== e.currentTarget && el.tagName !== "BUTTON") {
            el = el.parentNode;
        }

        if (el) {
            this.setState({
                dataid: el.getAttribute('dataid'),
                modalType: el.getAttribute('tipe')
            })
            
            this.setState({
                modalIsOpen: true
            })
        }
    }

    closeModal() {
        this.setState({ 
            modalIsOpen: false 
        })
        this.renderTbody();
    }
    
    render() {
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