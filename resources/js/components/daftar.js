import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Select from 'react-select';

export default class Daftar extends Component {
    constructor() {
        super();
        this.state = {
            usr: '',
            psw: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        document.title = "Daftar - BKI SKARIGA";
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    toggleTabs(e){
        let oldLink = document.getElementsByClassName('tab-link current');
        let oldTab = document.getElementsByClassName('tab-content current');
        // console.log(oldLink);
        oldLink[0].classList.remove('current');
        oldTab[0].classList.remove('current');

        let tab = e.target.getAttribute('target');
        e.target.classList.add('current');
        document.getElementById(tab).classList.add('current');
    }

    loginSubmit(e) {
        e.preventDefault();

        axios.post('/api/login', this.state).then(response => {
            console.log(response)
            if (response.data.goal != false) {
                console.log('gud ea')
                // this.setState({
                //     goal: response.data
                // })
                window.location.reload();
            }
        }).catch(error => console.log(error))
    }

    render() {
        return (
            // <div className="container">
            //     <div className='col-md-12 text-center' style={{marginTop: '6%'}}>
            //         <h2>
            //             Daftar <b>BKI SKARIGA</b>
            //         </h2>
            //     </div>
            //     <div id='login-form' className='col-10 col-sm-7 col-md-4 p-0 div-center'>
            //         <div className='col-md-12 p-0'>
            //             <div className='col-md-6 p-0 border'><a data-toggle="tab" href="#home">Home</a></div>
            //             <div className='col-md-6 p-0 border'><a data-toggle="tab" href="#menu1">Menu 1</a></div>
            //         </div>
            //         {/* <li><a data-toggle="tab" href="#menu2">Menu 2</a></li>
            //             <li><a data-toggle="tab" href="#menu3">Menu 3</a></li> */}
            //         <div className='col-md-12'>
            //             <div id="home">
            //                 <h3>HOME</h3>
            //                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            //             </div>
            //             <div id="menu1">
            //                 <h3>Menu 1</h3>
            //                 <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            <div className="container h-100 center-container">
                <div id='login-form' className='col-10 col-sm-8 col-md-5' style={{height: 600}}>
                    <ul className="tabs position-absolute" style={{top: 0, right: 0, left: 0}}>
                        <li className="tab-link current" target="tab-1" onClick={this.toggleTabs.bind(this)}>Alumni</li>
                        <li className="tab-link" target="tab-2" onClick={this.toggleTabs.bind(this)}>Industri</li>
                    </ul>

                    <div id="tab-1" className="tab-content px-0 current">
                        <div className='col-md-12 form-group p-0'>
                            <label className='label-required'>Nama</label>
                            <div className='col-md-12 p-0'>
                                <input type='text' name='nm' className='form-control' onChange={this.handleChange} placeholder='bki user'/>
                            </div>
                        </div>
                        <div className='col-md-12 form-group p-0'>
                            <label className='label-required'>Username</label>
                            <div className='col-md-12 p-0'>
                                <input type='text' name='usr' className='form-control' onChange={this.handleChange} placeholder='bki@skariga.com'/>
                            </div>
                        </div>
                        <div className='col-md-12 form-group p-0'>
                            <label className='label-required'>Password</label>
                            <div className='col-md-12 p-0'>
                                <input type='password' name='psw' className='form-control' onChange={this.handleChange} placeholder='**********'/>
                            </div>
                        </div>
                        <div className='col-md-12 form-group p-0'>
                            <label className='label-required'>Jurusan</label>
                            <div className='col-md-12 p-0'>
                                <Select isClearable={true} name="tipe" options={[{value: '1', label: 'Siswa'}, {value: '2', label: 'Staff'}]}/> 
                            </div>
                        </div>
                        <div className='col-md-12 form-group p-0'>
                            <label className='label-required'>Tahun Ajaran</label>
                            <div className='col-md-12 p-0'>
                                <Select isClearable={true} name="tipe" options={[{value: '1', label: 'Siswa'}, {value: '2', label: 'Staff'}]}/>
                            </div>
                        </div>
                        <div className='col-md-12 p-0'>
                            <button type='submit' className='btn btn-success w-100'>
                                Daftar
                            </button>
                        </div>
                	</div>
                    <div id="tab-2" className="tab-content px-0">
                        <div className='col-md-12 form-group p-0'>
                            <label className='label-required'>Nama</label>
                            <div className='col-md-12 p-0'>
                                <input type='text' name='nm' className='form-control' onChange={this.handleChange} placeholder='bki user'/>
                            </div>
                        </div>
                        <div className='col-md-12 form-group p-0'>
                            <label className='label-required'>Username</label>
                            <div className='col-md-12 p-0'>
                                <input type='text' name='usr' className='form-control' onChange={this.handleChange} placeholder='bki@skariga.com'/>
                            </div>
                        </div>
                        <div className='col-md-12 form-group p-0'>
                            <label className='label-required'>Password</label>
                            <div className='col-md-12 p-0'>
                                <input type='password' name='psw' className='form-control' onChange={this.handleChange} placeholder='**********'/>
                            </div>
                        </div>
                        <div className='col-md-12 form-group p-0'>
                            <label className='label-required'>Perusahaan</label>
                            <div className='col-md-12 p-0'>
                                <input type='text' name='industri' className='form-control' onChange={this.handleChange} placeholder='PT. Indonesia Bersatu'/>
                            </div>
                        </div>
                        <div className='col-md-12 form-group p-0'>
                            <label className='label-required'>Perusahaan</label>
                            <div className='col-md-12 p-0'>
                                <input type='text' name='industri' className='form-control' onChange={this.handleChange} placeholder='PT. Indonesia Bersatu'/>
                            </div>
                        </div>
                	</div>
                </div>
            </div>
        );
    }
}