import React, { Component } from 'react';
import Axios from 'axios';
import Skin from '../skin';

export default class Tiket extends Component {
    constructor() {
        super();
        this.state = {
            tiket: []
        }

        this.renderData = this.renderData.bind(this);
    }

    componentWillMount() {
        this.renderData();
    }

    renderData() {
        Axios.post('/tiket/table').then((response) => {
            this.setState({
                tiket: response.data.tiket
            })
        }).catch((error) => console.error())
    }

    render() {
        return (
            <span>
                <Skin/>
                <div className="contents">
                            <div className="row">
                {this.state.tiket.map(function(data, i) {
                        return (
                            <div className="col-md-4" key={i}>
                                <div className="tile">
                                    <div className="tile-header">
                                        <h1><b>{data.posisi}</b></h1>
                                        <ul className="controls">
                                            <li>
                                                <a className="hv-danger"><i className="fa fa-trash"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tile-widget">
                                        {data.perusahaan}
                                    </div>
                                    <div className="tile-footer">
                                        <div className="float-right">
                                            Tanggal Rekrutmen : {data.tgl_rekrutmen}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </span>
        )
    }
}