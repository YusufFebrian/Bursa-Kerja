// /**
//  * First we will load all of this project's JavaScript dependencies which
//  * includes React and other helpers. It's a great starting point while
//  * building robust, powerful web applications using React + Laravel.
//  */
require('./bootstrap');

// /**
//  * Next, we will create a fresh React component instance and attach it to
//  * the page. Then, you may begin adding components to this application
//  * or customize the JavaScript scaffolding to fit your unique needs.
//  */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider, positions } from "react-alert";
import AlertTemplate from "react-alert-template-oldschool-dark";
import Index from './components/index';
import Login from './components/login';
import Daftar from './components/daftar';
import User from './components/user';
import Formuser from './components/user/formuser';
import Perusahaan from './components/perusahaan/table';
import Formperusahaan from './components/perusahaan/form';
import ThnAjaran from './components/thn_ajaran/table';
import Lowongan from './components/lowongan/view';
import FormLowongan from './components/lowongan/form';
import Prakerin from './components/prakerin/table';
import Formprakerin from './components/prakerin/form';
import Formserap from './components/keterserapan/form';
import Tiket from './components/tiket/view';

export default class Apps extends Component {
    render() {
        const options = {
            timeout: 5000,
            position: positions.TOP_CENTER
        }
        return (
            <Router>
                <Provider template={AlertTemplate} {...options}>
                    <div>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/daftar" exact component={Daftar}/>
                        <Route path="/" exact component={Index}/>

                        <Route path="/user" exact component={User}/>
                        <Route path="/user/add" exact component={Formuser}/>
                        <Route path="/user/edit/:id" exact component={Formuser}/>

                        <Route path="/perusahaan" exact component={Perusahaan}/>
                        <Route path="/perusahaan/add" exact component={Formperusahaan}/>
                        <Route path="/perusahaan/edit/:id" exact component={Formperusahaan}/>

                        <Route path="/tahun-ajaran" exact component={ThnAjaran}/>

                        <Route path="/lowongan" exact component={Lowongan}/>
                        <Route path="/lowongan/add" exact component={FormLowongan}/>
                        <Route path="/lowongan/edit/:id" exact component={FormLowongan}/>
                        
                        <Route path="/prakerin" exact component={Prakerin}/>
                        <Route path="/prakerin/add" exact component={Formprakerin}/>
                        <Route path="/prakerin/edit/:id" exact component={Formprakerin}/>
                        
                        {/* <Route path="/prakerin" exact component={Prakerin}/> */}
                        <Route path="/keterserapan/add" exact component={Formserap}/>
                        {/* <Route path="/prakerin/edit/:id" exact component={Formprakerin}/> */}

                        <Route path="/tiket" exact component={Tiket}/>
                    </div>
            </Provider>
            </Router>
        );
    }
}

if (document.getElementById('target')) {
    ReactDOM.render(<Apps />, document.getElementById('target'));
}