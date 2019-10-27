import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import Axios from 'axios';

const LinkDashboard = withRouter(({ history }) => (
    <div className="menu col-md-12 c-pointer" onClick={() => { history.push('/') }}>
        <i className="fa fa-home"></i>
        <a className="ml-4">Dashboard</a>
    </div>
))

const LinkLowongan = withRouter(({ history }) => (
    <div className="menu col-md-12 c-pointer" onClick={() => { history.push('/lowongan') }}>
        <i className="fa fa-user-tie"></i>
        <a className="ml-4">Lowongan</a>
    </div>
))

const LinkTiket = withRouter(({ history }) => (
    <div className="menu col-md-12 c-pointer" onClick={() => { history.push('/tiket') }}>
        <i className="fa fa-ticket-alt"></i>
        <a className="ml-4">Tiket</a>
    </div>
))

const LinkPrakerin = withRouter(({ history }) => (
    <div className="menu col-md-12 c-pointer" onClick={() => { history.push('/prakerin') }}>
        <i className="fa fa-users-cog"></i>
        <a className="ml-4">Prakerin</a>
    </div>
))

const LinkPerusahaan = withRouter(({ history }) => (
    <div className="menu col-md-12 c-pointer" onClick={() => { history.push('/perusahaan') }}>
        <i className="fa fa-industry"></i>
        <a className="ml-4">Master Perusahaan</a>
    </div>
))

const LinkUser = withRouter(({ history }) => (
    <div className="menu col-md-12 c-pointer" onClick={() => { history.push('/user') }}>
        <div className="col-md-1 p-0">
            <i className="fa fa-user"></i>
        </div>
        <div className="col-md-11">
            <a className="">Master User</a>
        </div>
    </div>
))

const LinkTahun = withRouter(({ history }) => (
    <div className="menu col-md-12 c-pointer" onClick={() => { history.push('/tahun-ajaran') }}>
        <i className="fa fa-home"></i>
        <a className="ml-4">Master Tahun Ajaran</a>
    </div>
))

const LinkAbout = withRouter(({ history }) => (
    <div className="menu col-md-12 c-pointer" onClick={() => { history.push('/about') }}>
        <i className="fa fa-home"></i>
        <a className="ml-4">About</a>
    </div>
))

export default class Skin extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            usertype: '',
            labelUser: '',
        }

        this.actionMenu = this.actionMenu.bind(this);
    }

    componentWillMount() {
        console.log(this.props.match);

        axios.post('/account').then(response=> {
            this.setState({
                name: response.data.nama,
                usertype: response.data.tipenm
            })
        }).catch(error => console.log(error));
        
        this.setState({
            labelUser: (window.innerWidth > 700 ? (
                <div className="float-right h-100 pt-4">
                    <label className="mx-3">Yusuf Ardi...</label>
                    <i className="fa fa-angle-down"></i>
                </div>
            ) : '')
        })
    }

    // componentDidMount() {
    //     window.addEventListener("resize", function(){
    //         if (window.innerWidth > 700){
    //             console.log(window.innerWidth);
    //             this.setState({
    //                 labelUser: (
    //                     <div className="float-right h-100 pt-4">
    //                         <label className="mx-3">Yusuf Ardi...</label>
    //                         <i className="fa fa-angle-down"></i>
    //                     </div>
    //                 )
    //             })
    //         } else {
    //             this.setState({
    //                 labelUser: ''
    //             })
    //         }
    //     }.bind(this));
    // }

    activeMenu() {
        console.log(this.props.match);
        return 'active';
    }

    actionMenu(to) {
        // this.props.history.push(to);
        this.props.history.push('/user/edit/'+1);
    }
    
    logout() {
        Axios.post('logout').then(response => {
            if (response.data.goal != false) {
                window.location.reload();
            }
        }).catch(error => console.log(error))
    }

    render(){
        return (
            <span>
                <div className="header">
                    <div className="float-left h-100 d-flex align-items-center">
                        <img src="/image/logo_skariga.png" height="40" className="float-lefts"/>
                        <b className="float-lefts ml-3" style={{ fontSize: "25px"}}>BKI Skariga</b>
                    </div>
                    <div className="float-right h-100 d-flex align-items-center">
                        <div className="dropdown h-100">
                            <div class="dropdown-toggle h-100 px-2 pt-2 h2 m-0" data-toggle="dropdown" aria-expanded="false">
                                <span class="fa-layers fa-fw">
                                    <i class="fas fa-clipboard-check"></i>
                                    <span class="fa-layers-counter h1 m-0" style={{background:"Tomato"}}>19</span>
                                </span>
                            </div>
                            <div class="dropdown-menu" style={{width: '300px'}}>
                                <div className="dropdown-item">Action</div>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div>
                        <div className="dropdown h-100">
                            <div class="dropdown-toggle h-100 px-2 d-flex align-items-center" data-toggle="dropdown" aria-expanded="false">
                                <img src="/image/default-user.png" height="37" className="img-circle" />
                                <label className="h5 ml-3 mr-1" style={{textOverflow:'ellipsis', overflow:'hidden', width:'130px'}}>
                                    {this.state.name}
                                </label>
                                <i class="fas fa-angle-down"></i>
                            </div>
                            <div class="dropdown-menu" style={{width: '250px'}}>
                                <div className="dropdown-item d-flex justify-content-center">
                                    <img src="/image/default-user.png" height="110" />
                                </div>
                                <div className="dropdown-item col-md-12 p-0" style={{whiteSpace:'unset'}}>
                                    <label className="col-md-3 pr-0">
                                        Nama
                                    </label>
                                    <label className="col-md-9 pl-2">
                                        <b>{this.state.name}</b>
                                    </label>
                                </div>
                                <div className="dropdown-item col-md-12 p-0" style={{whiteSpace:'unset'}}>
                                    <label className="col-md-3 pr-0">
                                        Role
                                    </label>
                                    <label className="col-md-9 pl-2">
                                        <b>{this.state.usertype}</b>
                                    </label>
                                </div>
                                <a className="dropdown-item" href="#">Lihat Profil Lengkap</a>
                                <a className="dropdown-item" onClick={this.logout}>
                                    <i className="fa fa-sign-out-alt"></i>Logout</a>
                            </div>
                        </div>
                    </div>
                    
                    {/* <div className="dropdown">
                        <div className="col-md-2 float-right dropdown-toggle" id="dropuser" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.labelUser}
                            <div className="icons ml-3" style={{ padding: '11px', paddingTop: '5px' }}>
                                <i className="fa fa-user"></i>
                            </div>
                        </div>
                        <div className="dropdown-menu" aria-labelledby="dropuser" style={{left: '-10'}}>
                            <label className="dropdown-item">{this.state.name}</label>
                            <label className="dropdown-item">{this.state.usertype}<br/></label>
                            <button className='btn btn-danger float-right' onClick={this.logout}>logout</button>
                        </div>
                    </div>
                    <div className="dropdown col-md-1 float-right">
                        <div className="icons dropdown-toggle" style={{ padding: '12.5px', paddingTop: '6px'}}
                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-clipboard-check"></i>
                        </div>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div> */}
                </div>
                <div className="sidebar">
                    <LinkDashboard/>
                    <LinkLowongan/>
                    <LinkTiket/>
                    <LinkPrakerin/>
                    <LinkPerusahaan/>
                    <LinkUser/>
                    <LinkTahun/>
                    {/* <LinkAbout/> */}
                </div>
            </span>
        );
    }
}