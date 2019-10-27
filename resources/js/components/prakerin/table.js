import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Modal from 'react-modal';
import Skin from '../skin';

const LinkAdd = withRouter(({ history }) => (
    <button onClick={() => { history.push('/prakerin/add') }} className="btn btn-success float-right">
        <i className="fa fa-plus"></i> Tambah
    </button>
))
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

export default class Prakerin extends Component {
    constructor() {
        super();
        this.state = {
            tbody: "",
            visible: false,
            modalIsOpen: false,
            dataid: 0
        }

        this.actionClick = this.actionClick.bind(this);
    }

    componentWillMount() {
        this.renderTbody();
    }
    
    renderTbody(){
        Axios.post('/prakerin/table').then(response => {
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
                    tbody += "<td>"+ value.perusahaan +"</td>";
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

        if (el && el.getAttribute('tipe') === "edit") {

            this.props.history.push('/prakerin/edit/'+el.getAttribute('dataid'));

        } else if (el && el.getAttribute('tipe') === "delete") {
            
            this.setState({modalIsOpen: true, dataid: el.getAttribute('dataid')});

        }
    }
    
    hideRodal(){
        this.setState({visible: false});
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        this.subtitle.style.color = '#f00';
    }
     
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    deleteHandle(){
        let data = {'dataid': this.state.dataid}
        Axios.post('/prakerin/delete', data).then(response => {
            if (response.data.goal == true){
                this.setState({modalIsOpen: false});
                this.renderTbody();
            }
        }).catch(error => console.error(error));
    }
    
    render() {
        return (
            <span>
                <Skin/>
                <div className="contents">
                    <div className="panel">
                        <div className="panel-heading" style={{fontSize: '24px', fontWeight: '800'}}>
                            <span className="panel-title">Data Prakerin</span>
                            <LinkAdd/>
                        </div>
                        <div className="panel-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nama</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody onClick={this.actionClick} dangerouslySetInnerHTML={{__html: this.state.tbody}}/>
                            </table>
                        <Modal isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal">
                            <div className="col-md-12">
                                <label ref={subtitle => this.subtitle = subtitle}>
                                    <h2 className="m-0">Confirmation</h2>
                                </label>
                                <button className="close float-right" onClick={this.closeModal}>x</button>
                            </div>

                            <div className="col-md-12 p-0 my-3 text-center">
                                Yakin Ingin Menghapus data <b>{this.state.userid}</b>?
                            </div>
                            
                            <div className="col-md-12 p-0 text-right">
                                <button className="btn btn-ef btn-ef-1 btn-ef-1-danger btn-ef-1d mr-1" onClick={this.closeModal}>
                                    <i className="fa fa-times"></i> Tidak
                                </button>
                                <button className="btn btn-ef btn-ef-1 btn-ef-1-success btn-ef-1d" onClick={this.deleteHandle.bind(this)}>
                                    <i className="fa fa-check"></i> Ya
                                </button>
                            </div>
                        </Modal>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
}