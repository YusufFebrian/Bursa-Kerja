import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import Axios from 'axios';
// import Rodal from 'rodal';
// import 'rodal/lib/rodal.css';
import Modal from 'react-modal';
import Skin from './skin';

const LinkAdd = withRouter(({ history }) => (
    <button onClick={() => { history.push('/user/add') }} className="btn btn-success float-right">
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

export default class User extends Component {
    constructor(){
        super();
        this.state = {
            tbody: "",
            visible: false,
            modalIsOpen: false,
            userid: 0
        }
        this.actionClick = this.actionClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        this.renderTbody();
    }

    renderTbody(){
        Axios.post('/user/table').then(response => {
            let num = 1;
            let tbody = "";
            response.data.forEach(value => {
                let editBtn = "<button tipe='edit' userid='"+ value.id +"' class='btn btn-primary btn-sm mr-1'>"+
                                "<i class='fa fa-edit'></i>"+
                            "</button>";
                let deleteBtn = "<button tipe='delete' userid='"+ value.id +"' class='btn btn-danger btn-sm mr-1'>"+
                                    "<i class='fa fa-trash'></i>"+
                                "</button>";
                tbody += "<tr>";
                    tbody += "<td>"+ (num++) +"</td>";
                    tbody += "<td>"+ value.nama +"</td>";
                    tbody += "<td>"+ value.tipe +"</td>";
                    tbody += "<td>"+ value.jurusan +"</td>";
                    tbody += "<td>"+ value.tahun +"</td>";
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

            this.props.history.push('/user/edit/'+el.getAttribute('userid'));

        } else if (el && el.getAttribute('tipe') === "delete") {
            
            this.setState({modalIsOpen: true, userid: el.getAttribute('userid')});

        }
    }

    hideRodal(){
        this.setState({visible: false});
    }
    openModal() {
        this.setState({modalIsOpen: true});
      }
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
      }
     
      closeModal() {
        this.setState({modalIsOpen: false});
      }

    deleteHandle(){
        let data = {'userid': this.state.userid}
        Axios.post('/user/delete', data).then(response => {
            if (response.data.goal == true){
                this.setState({modalIsOpen: false});
                console.log('deleted');
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
                    <div className="panel-heading">
                        <span class="panel-title">Data User</span>
                        <LinkAdd/>
                    </div>
                    <div className="panel-body">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nama</th>
                                    <th>Tipe</th>
                                    <th>Jurusan</th>
                                    <th>Tahun Ajaran</th>
                                    <th>Perusahaan</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody onClick={this.actionClick} dangerouslySetInnerHTML={{__html: this.state.tbody}}/>
                        </table>
                    {/* <Modal isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={{zIndex: '3', top: '50%', left : '50%', right: 'auto', bottom: 'auto',
                      marginRight           : '-50%',
                      transform             : 'translate(-50%, -50%)'
                    }}
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
                    </Modal> */}
                    <Modal isOpen={this.state.modalIsOpen} contentLabel="Modalr" style={customStyles}>
                        <div className="col-md-12">
                            <label>
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