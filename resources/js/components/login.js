import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import Axios from 'axios';

const Button = withRouter(({ history }) => (
    <a  className="link-effect link-effect-17 p-0 m-0" data-hover='Daftar' 
        style={{textTransform: 'none', verticalAlign: 'unset', fontSize: 'unset', marginLeft: '0.2rem !important'}} 
        onClick={() => { history.push('/daftar') }}>
        Daftar
    </a>
))

class Login extends Component {
    constructor() {
        super();
        this.state = {
            urlImage: '',
            usr: '',
            psw: '',
            loginMessage: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        document.title = "Login - BKI SKARIGA";
        axios.post('/urlImage').then(response => {
            this.setState({
                urlImage: response.data.url
            })
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    loginSubmit(e) {
        e.preventDefault();

        axios.post('/login_p', this.state).then(response => {
            console.log(response)
            if (response.data.goal != false) {
                window.location.reload();
            } else {
                this.setState({
                    loginMessage: response.data.message
                })
            }
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="container h-100 center-container">
                <div id='login-form' className='col-10 col-sm-8 col-md-5'>
                    <form onSubmit={this.loginSubmit.bind(this)}>
                        <h3 className='mt-0 font-weight-bold mx-auto' >BKI SKARIGA</h3>
                        <div className='col-md-12 form-group p-0'>
                            <label className='label-required'>Username</label>
                            <div className='col-md-12 p-0 input-group'>
                                <span className='input-group-addon'><i className='fa fa-user'></i></span>
                                <input type='text' name='usr' className='form-control input-lg' onChange={this.handleChange} placeholder='bki@skariga.com'/>
                            </div>
                        </div>
                        <div className='col-md-12 form-group p-0'>
                            <label className='label-required'>Password</label>
                            <div className='col-md-12 p-0 input-group'>
                                <span className='input-group-addon'><i className='fa fa-lock'></i></span>
                                <input type='password' name='psw' className='form-control input-lg' onChange={this.handleChange} placeholder='**********'/>
                            </div>
                        </div>
                        <div className='col-md-12 p-0'>
                            <button type='submit' className='btn btn-success btn-lg w-100'> 
                                Log In
                            </button>
                        </div>
                        <label>{this.state.loginMessage}</label>
                        <div className='text-center' style={{ position: "absolute", bottom: 0, right: 0, left: 0}}>
                            <label>Alumni atau Industri? <Button/></label>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default Login;