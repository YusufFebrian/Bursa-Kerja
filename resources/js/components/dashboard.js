import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import Axios from 'axios';
import Select from 'react-dropdown-select';
import Skin from './skin';

export default class Index extends Component {
    constructor() {
        super();
        this.state = {
            collapseClass: "panel-collapse collapse in show",
            options_tahun: [],
            options_prodi: [],
            options_jurusan: [],
            filter_tahun: 0,
            filter_prodi: 0,
            filter_jurusan: 0,
            keterserapan: {
                labels: [''],
                datasets: [{
                    label: 'Data Keterserapan',
                    data: [0],
                    backgroundColor: ['']
                }]
            },
            chartOptions: {
                maintainAspectRatio: false,
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            let label = data['labels'][tooltipItem['index']];
                            let amount = data['datasets'][0]['data'][tooltipItem['index']];
                            let total = data['datasets'][0]['_meta'][0]['total'];
                            let percent = Math.round(amount/total * 100);
                            return label + ': ' + percent + '%';
                        }
                    }
                },
                legend: {
                    position: 'left'
                }
            },
        }

        this.renderChart = this.renderChart.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
    }

    componentWillMount() {
        this.renderChart();
        
        Axios.post('/option/thn_ajaran').then(response => {
            if (response.data.goal == true) {
                this.setState({
                    options_tahun: response.data.option
                })
            }
        }).catch(error => console.error(error));
        
        Axios.post('/option/prodi').then(response => {
            this.setState({
                options_prodi: response.data.option
            })
        }).catch(error => console.log(error));
        
        Axios.post('/option/jurusan').then(response => {
            this.setState({
                options_jurusan: response.data.option
            })
        }).catch(error => console.log(error));
    }

    renderChart(filter, selected) {
        let filter_nm = (filter ? filter : 'nodata');
        let filter_val = (selected && selected.length ? selected[0].value : 0);
        let data = {
            tahun: this.state.filter_tahun,
            prodi: this.state.filter_prodi,
            jurusan: this.state.filter_jurusan,
            [filter_nm]: filter_val
        }
        console.log(data);

        axios.post('/keterserapan', data).then(response => {
            console.log(response.data.sql);
            this.setState({
                keterserapan: {
                    labels: ['Kerja', 'Kuliah', 'Wirausaha', 'Militer', 'Lain-lain'],
                    datasets: [{
                        label: 'Data Keterserapan',
                        data: [response.data.kerja, response.data.kuliah, response.data.militer, response.data.wirausaha, response.data.lain],
                        backgroundColor: ['#ff2f00', '#2196f3', '#ffc107', '#2e7d32']
                    }]
                }
            })
        }).catch(error => console.log(error));
    }

    changeFilter(type, data) {
        let statename = 'filter_'+type;
        let filvalue = (data && data.length ? data[0].value : 0);

        this.setState({
            [statename]: filvalue
        })

        this.renderChart(type, data);
    }

    modal() {
        return (
            <div className="modal splash fade" id="splash" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{display: 'none'}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title custom-font">I'm a modal!</h3>
                        </div>
                        <div className="modal-body">
                            <p>This sure is a fine modal, isn't it?</p>

                            <p>Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-default btn-border">Submit</button>
                            <button className="btn btn-default btn-border" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <span>
                <Skin/>
                <div className="contents">
                    <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                        <div className="panel">
                            <div className="panel-heading" role="tab" id="headingOne">
                                <h4 className="panel-title">
                                    <a id="filter" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne" className="collapsed">
                                        Filter (klik untuk buka/tutup)
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseOne" className={this.state.collapseClass} role="tabpanel" aria-labelledby="headingOne" aria-expanded="false">
                                <div className="panel-body">
                                    <div className="col-md-12 p-0">
                                        <div className="col-md-3 pl-0 mb-3">
                                            <label className="col-md-12 pl-0">Tahun Ajaran</label>
                                            <Select clearable={true} options={this.state.options_tahun} 
                                            onChange={(values) => {this.renderChart('tahun', values); this.changeFilter('tahun', values)}} />
                                        </div>
                                        <div className="col-md-3 pl-0 mb-3">
                                            <label className="col-md-12 pl-0">Departemen</label>
                                            <Select clearable={true} options={this.state.options_prodi} 
                                            onChange={(values) => {this.renderChart('prodi', values); this.changeFilter('prodi', values)}} />
                                        </div>
                                        <div className="col-md-3 pl-0 mb-3">
                                            <label className="col-md-12 pl-0">Jurusan</label>
                                            <Select clearable={true} options={this.state.options_jurusan} 
                                            onChange={(values) => {this.renderChart('jurusan', values); this.changeFilter('jurusan', values)}} />
                                        </div>
                                        <button className="btn btn-primary mb-10 hidden" data-toggle="modal" data-target="#splash">3D Sign</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel-heading">
                            <span className="panel-title">Diagram Keterserapan</span>
                            <button type="submit" className="btn btn-primary float-right" onClick={() => this.props.history.push('/keterserapan/add')}> Data </button>
                            <a href="keterserapan/report" className="btn btn-warning float-right mr-2" target="_blank">
                                <i className="fa fa-print"></i> Print PDF
                            </a>
                        </div>
                        <div className="panel-body">
                            <div className="col-md-12 p-0">
                                <div style={{height: '450px'}}>
                                    <Pie data={this.state.keterserapan} options={this.state.chartOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
}

// if (document.getElementById('target')) {
//     ReactDOM.render(<Index />, document.getElementById('target'));
// }
