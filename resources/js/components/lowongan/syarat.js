import React, { Component } from 'react';
import Axios from 'axios';

export default class Syarat extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            num: 0
        }

        this.handleChange = this.handleChange.bind(this)
        this.removeSyarat = this.removeSyarat.bind(this)
    }

    componentWillMount() {
        this.setState({
            value: this.props.value,
            num: this.props.num
        })
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        })
        this.props.change(e.target.value, this.state.num);
    }

    removeSyarat() {
        this.props.remove(this.state.num)
    }

    render() {
        let num = this.state.num;
        let value = this.state.value;

        return (
            <div id={"syarat-"+num} className="col-md-12 p-0 mb-1" key={num}>
                <div className="col-md-1 p-0 mt-2 d-flex justify-content-center align-items-center">
                    <i className="fas fa-dot-circle"></i>
                </div>
                <div className="col-md-9 p-0">
                    <input name='input_syarat' className="form-control" placeholder="Pekerja Keras" value={value} onChange={(e)=>this.handleChange(e)}/>
                </div>
                <div className="col-md-2 pt-1"><button type="button" className="btn btn-danger" onClick={this.removeSyarat}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
        )
    }
}