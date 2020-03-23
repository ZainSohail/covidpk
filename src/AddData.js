import React, { Component } from 'react';
import CountUp from 'react-countup';
import {Doughnut} from 'react-chartjs-2';
import * as firebase from 'firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class AddData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      saved: false,
      recordDate: null,
      authenticated: false,
      data: [],
      ict: [],
      sindh: [],
      punjab: [],
      ajk: [],
      balochistan: [],
      gb: [],
      kpt: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.islHandleSubmit = this.islHandleSubmit.bind(this);
  }

  componentDidMount() {
    let ref = firebase.database().ref('/');
    ref.on('value', snapshot => {
        const state = snapshot.val();
        this.setState({
            data: state
        });
    });

    
  }

  handleChange(event) {
      let nam = event.target.name;
      let val = event.target.value;
      let province = event.target.getAttribute('province');

      if( nam == 'password' ) {

        if ( val == '123456789' ) {
            this.setState({
                'authenticated': true
            });
        }

      } else if ( nam == 'date' ) {

        this.setState({
            'recordDate': val
        });

      } else {

        if ( ( event.target.value >= 0 ) && ( event.target.value < 1000 ) ) {
        
            var s = this.state[province];
            s[nam] = val;
            s['date'] = this.state.recordDate ? this.state.recordDate.toString() : new Date().toString();

            this.setState({
                [province]: s
            });

          } else {
            alert('Maximum character limit is 999');
          }
      }
      
  }

  islHandleSubmit(event) {
    event.preventDefault();

    this.setState({
        isLoaded: false
    });

    var data = this.state.data;
    var total_cases = 0;
    var total_deaths = 0;
    var total_in_hospital = 0;
    var total_recovered = 0;

    data.countries.pakistan.provinces.sindh.stats.push(this.state.sindh);
    data.countries.pakistan.provinces.ict.stats.push(this.state.ict);
    data.countries.pakistan.provinces.punjab.stats.push(this.state.punjab);
    data.countries.pakistan.provinces.ajk.stats.push(this.state.ajk);
    data.countries.pakistan.provinces.balochistan.stats.push(this.state.balochistan);
    data.countries.pakistan.provinces.gb.stats.push(this.state.gb);
    data.countries.pakistan.provinces.kpt.stats.push(this.state.kpt);

    
    data.countries.pakistan.provinces.sindh.stats.forEach(function(item, index) {
        total_cases += parseInt( item.cumulative_tests_positive );
    });

    data.countries.pakistan.provinces.sindh.stats.forEach(function(item, index) {
        total_deaths += parseInt( item.expired );
    });

    data.countries.pakistan.provinces.sindh.stats.forEach(function(item, index) {
        total_in_hospital += parseInt( item.still_admitted );
    });

    data.countries.pakistan.provinces.sindh.stats.forEach(function(item, index) {
        total_recovered += parseInt( item.discharged );
    });

    data.total_cases = total_cases;
    data.total_deaths = total_deaths;
    data.total_in_hospital = total_in_hospital;
    data.total_recovered = total_recovered;

    firebase.database().ref('/').set(data)
    .then((response) => {
      this.setState({
        isLoaded: true,
        saved: true
      });

    })
    .catch((error) =>{
      this.setState({
        isLoaded: true,
        saved: true
      });
    });

  }

  render() {

    const { error, isLoaded, data, stats, saved, recordDate, authenticated } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (saved) {
      return (
            
            <div>
                <div class="alert alert-success" role="alert">
                   New record has been added.
                </div>
            </div>
        );
    } else if (authenticated) {
      
      return (
        <div>
            <form methpd="post" onSubmit={this.islHandleSubmit}>
                <div className="card mt-2">
                    <div className="card-body">
                        <h5 class="card-title title-bg">Record Date:</h5>
                        <div className="row mt-4">
                            <div className="col-sm">
                                <div class="form-group">
                                    <input type="date" class="form-control form-control-sm" name="date" value={this.state.recordDate !== null ? this.state.recordDate : '' } placeholder="Date" onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-2">
                    <div className="card-body">
                        <h5 class="card-title title-bg">Islamabad</h5>
                        <div className="row mt-4">
                            <div className="col-sm">
                                <div class="form-group">
                                    <label>New (last 24 hrs):</label>
                                    <input type="number" class="form-control form-control-sm" province="ict" name="newcases" value={this.state.ict.newcases !== undefined ? this.state.ict.newcases : '' } placeholder="New (last 24 hrs)" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Cumulative Suspected:</label>
                                    <input type="number" class="form-control form-control-sm" province="ict" name="cumulative_suspected" value={this.state.ict.newcases !== undefined ? this.state.ict.cumulative_suspected : '' } placeholder="Cumulative Suspected" onChange={this.handleChange} required />
                                    
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Cumulative tests performed:</label>
                                    <input type="number" class="form-control form-control-sm" province="ict" name="cumulative_tests" value={this.state.ict.newcases !== undefined ? this.state.ict.cumulative_tests : '' } placeholder="Cumulative tests performed" onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Cumulative Test positive cases:</label>
                                    <input type="number" class="form-control form-control-sm" province="ict" name="cumulative_tests_positive" value={this.state.ict.newcases !== undefined ? this.state.ict.cumulative_tests_positive : '' } placeholder="Cumulative Test positive cases" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Still admitted:</label>
                                    <input type="number" class="form-control form-control-sm" province="ict" name="still_admitted" value={this.state.ict.newcases !== undefined ? this.state.ict.still_admitted : '' } placeholder="Still admitted" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Discharged:</label>
                                    <input type="number" class="form-control form-control-sm" province="ict" name="discharged" value={this.state.ict.newcases !== undefined ? this.state.ict.discharged : '' } placeholder="Discharged" onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Expired:</label>
                                    <input type="number" class="form-control form-control-sm" province="ict" name="expired" value={this.state.ict.newcases !== undefined ? this.state.ict.expired : '' } placeholder="Expired" onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>

                <div className="card mt-2">
                    <div className="card-body">
                        <h5 class="card-title title-bg">Punjab</h5>
                        <div className="row mt-4">
                            <div className="col-sm">
                                <div class="form-group">
                                    <label>New (last 24 hrs):</label>
                                    <input type="number" class="form-control form-control-sm" province="punjab" value={this.state.punjab.newcases !== undefined ? this.state.punjab.newcases : '' } name="newcases" placeholder="New (last 24 hrs)" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Cumulative Suspected:</label>
                                    <input type="number" class="form-control form-control-sm" province="punjab" value={this.state.punjab.newcases !== undefined ? this.state.punjab.cumulative_suspected : '' } name="cumulative_suspected" placeholder="Cumulative Suspected" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Cumulative tests performed:</label>
                                    <input type="number" class="form-control form-control-sm" province="punjab" value={this.state.punjab.newcases !== undefined ? this.state.punjab.cumulative_tests : '' } name="cumulative_tests" placeholder="Cumulative tests performed" onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Cumulative Test positive cases:</label>
                                    <input type="number" class="form-control form-control-sm" province="punjab" value={this.state.punjab.newcases !== undefined ? this.state.punjab.cumulative_tests_positive : ''} name="cumulative_tests_positive" placeholder="Cumulative Test positive cases" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Still admitted:</label>
                                    <input type="number" class="form-control form-control-sm" province="punjab" value={this.state.punjab.newcases !== undefined ? this.state.punjab.still_admitted : ''} name="still_admitted" placeholder="Still admitted" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Discharged:</label>
                                    <input type="number" class="form-control form-control-sm" province="punjab" value={this.state.punjab.newcases !== undefined ? this.state.punjab.discharged : ''} name="discharged" placeholder="Discharged" onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Expired:</label>
                                    <input type="number" class="form-control form-control-sm" province="punjab" value={this.state.punjab.newcases !== undefined ? this.state.punjab.expired : ''} name="expired" placeholder="Expired" onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-2">
                    <div className="card-body">
                        <h5 class="card-title title-bg">Sindh</h5>
                        <div className="row mt-4">
                            <div className="col-sm">
                                <div class="form-group">
                                    <label>New (last 24 hrs):</label>
                                    <input type="number" class="form-control form-control-sm" province="sindh" value={this.state.sindh.newcases !== undefined ? this.state.sindh.newcases : '' } name="newcases" placeholder="New (last 24 hrs)" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Cumulative Suspected:</label>
                                    <input type="number" class="form-control form-control-sm" province="sindh" value={this.state.sindh.newcases !== undefined ? this.state.sindh.cumulative_suspected : '' } name="cumulative_suspected" placeholder="Cumulative Suspected" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Cumulative tests performed:</label>
                                    <input type="number" class="form-control form-control-sm" province="sindh" value={this.state.sindh.newcases !== undefined ? this.state.sindh.cumulative_tests : '' } name="cumulative_tests" placeholder="Cumulative tests performed" onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Cumulative Test positive cases:</label>
                                    <input type="number" class="form-control form-control-sm" province="sindh" value={this.state.sindh.newcases !== undefined ? this.state.sindh.cumulative_tests_positive : ''} name="cumulative_tests_positive" placeholder="Cumulative Test positive cases" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Still admitted:</label>
                                    <input type="number" class="form-control form-control-sm" province="sindh" value={this.state.sindh.newcases !== undefined ? this.state.sindh.still_admitted : ''} name="still_admitted" placeholder="Still admitted" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Discharged:</label>
                                    <input type="number" class="form-control form-control-sm" province="sindh" value={this.state.sindh.newcases !== undefined ? this.state.sindh.discharged : ''} name="discharged" placeholder="Discharged" onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Expired:</label>
                                    <input type="number" class="form-control form-control-sm" province="sindh" value={this.state.sindh.newcases !== undefined ? this.state.sindh.expired : ''} name="expired" placeholder="Expired" onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-2">
                    <div className="card-body">
                        <h5 class="card-title title-bg">Khyber Pakhtunkhwa</h5>
                        <div className="row mt-4">
                            <div className="col-sm">
                                <div class="form-group">
                                    <label>New (last 24 hrs):</label>
                                    <input type="number" class="form-control form-control-sm" province="kpt" value={this.state.kpt.newcases !== undefined ? this.state.kpt.newcases : '' } name="newcases" placeholder="New (last 24 hrs)" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Cumulative Suspected:</label>
                                    <input type="number" class="form-control form-control-sm" province="kpt" value={this.state.kpt.newcases !== undefined ? this.state.kpt.cumulative_suspected : '' } name="cumulative_suspected" placeholder="Cumulative Suspected" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Cumulative tests performed:</label>
                                    <input type="number" class="form-control form-control-sm" province="kpt" value={this.state.kpt.newcases !== undefined ? this.state.kpt.cumulative_tests : '' } name="cumulative_tests" placeholder="Cumulative tests performed" onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Cumulative Test positive cases:</label>
                                    <input type="number" class="form-control form-control-sm" province="kpt" value={this.state.kpt.newcases !== undefined ? this.state.kpt.cumulative_tests_positive : ''} name="cumulative_tests_positive" placeholder="Cumulative Test positive cases" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Still admitted:</label>
                                    <input type="number" class="form-control form-control-sm" province="kpt" value={this.state.kpt.newcases !== undefined ? this.state.kpt.still_admitted : ''} name="still_admitted" placeholder="Still admitted" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Discharged:</label>
                                    <input type="number" class="form-control form-control-sm" province="kpt" value={this.state.kpt.newcases !== undefined ? this.state.kpt.discharged : ''} name="discharged" placeholder="Discharged" onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm">
                                <div class="form-group">
                                    <label>Expired:</label>
                                    <input type="number" class="form-control form-control-sm" province="kpt" value={this.state.kpt.newcases !== undefined ? this.state.kpt.expired : ''} name="expired" placeholder="Expired" onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-2">
                    <div className="card-body">
                            <h5 class="card-title title-bg">Balochistan</h5>
                            <div className="row mt-4">
                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>New (last 24 hrs):</label>
                                        <input type="number" class="form-control form-control-sm" province="balochistan" value={this.state.balochistan.newcases !== undefined ? this.state.balochistan.newcases : '' } name="newcases" placeholder="New (last 24 hrs)" onChange={this.handleChange} required />
                                    </div>
                                </div>

                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>Cumulative Suspected:</label>
                                        <input type="number" class="form-control form-control-sm" province="balochistan" value={this.state.balochistan.newcases !== undefined ? this.state.balochistan.cumulative_suspected : '' } name="cumulative_suspected" placeholder="Cumulative Suspected" onChange={this.handleChange} required />
                                    </div>
                                </div>

                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>Cumulative tests performed:</label>
                                        <input type="number" class="form-control form-control-sm" province="balochistan" value={this.state.balochistan.newcases !== undefined ? this.state.balochistan.cumulative_tests : '' } name="cumulative_tests" placeholder="Cumulative tests performed" onChange={this.handleChange} required />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>Cumulative Test positive cases:</label>
                                        <input type="number" class="form-control form-control-sm" province="balochistan" value={this.state.balochistan.newcases !== undefined ? this.state.balochistan.cumulative_tests_positive : ''} name="cumulative_tests_positive" placeholder="Cumulative Test positive cases" onChange={this.handleChange} required />
                                    </div>
                                </div>

                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>Still admitted:</label>
                                        <input type="number" class="form-control form-control-sm" province="balochistan" value={this.state.balochistan.newcases !== undefined ? this.state.balochistan.still_admitted : ''} name="still_admitted" placeholder="Still admitted" onChange={this.handleChange} required />
                                    </div>
                                </div>

                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>Discharged:</label>
                                        <input type="number" class="form-control form-control-sm" province="balochistan" value={this.state.balochistan.newcases !== undefined ? this.state.balochistan.discharged : ''} name="discharged" placeholder="Discharged" onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>Expired:</label>
                                        <input type="number" class="form-control form-control-sm" province="balochistan" value={this.state.balochistan.newcases !== undefined ? this.state.balochistan.expired : ''} name="expired" placeholder="Expired" onChange={this.handleChange} required />
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>

                <div className="card mt-2">
                    <div className="card-body">
                            <h5 class="card-title title-bg">AZAD JAMMU AND KASHMIR</h5>
                            <div className="row mt-4">
                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>New (last 24 hrs):</label>
                                        <input type="number" class="form-control form-control-sm" province="ajk" value={this.state.ajk.newcases !== undefined ? this.state.ajk.newcases : '' } name="newcases" placeholder="New (last 24 hrs)" onChange={this.handleChange} required />
                                    </div>
                                </div>

                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>Cumulative Suspected:</label>
                                        <input type="number" class="form-control form-control-sm" province="ajk" value={this.state.ajk.newcases !== undefined ? this.state.ajk.cumulative_suspected : '' } name="cumulative_suspected" placeholder="Cumulative Suspected" onChange={this.handleChange} required />
                                    </div>
                                </div>

                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>Cumulative tests performed:</label>
                                        <input type="number" class="form-control form-control-sm" province="ajk" value={this.state.ajk.newcases !== undefined ? this.state.ajk.cumulative_tests : '' } name="cumulative_tests" placeholder="Cumulative tests performed" onChange={this.handleChange} required />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>Cumulative Test positive cases:</label>
                                        <input type="number" class="form-control form-control-sm" province="ajk" value={this.state.ajk.newcases !== undefined ? this.state.ajk.cumulative_tests_positive : ''} name="cumulative_tests_positive" placeholder="Cumulative Test positive cases" onChange={this.handleChange} required />
                                    </div>
                                </div>

                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>Still admitted:</label>
                                        <input type="number" class="form-control form-control-sm" province="ajk" value={this.state.ajk.newcases !== undefined ? this.state.ajk.still_admitted : ''} name="still_admitted" placeholder="Still admitted" onChange={this.handleChange} required />
                                    </div>
                                </div>

                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>Discharged:</label>
                                        <input type="number" class="form-control form-control-sm" province="ajk" value={this.state.ajk.newcases !== undefined ? this.state.ajk.discharged : ''} name="discharged" placeholder="Discharged" onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>Expired:</label>
                                        <input type="number" class="form-control form-control-sm" province="ajk" value={this.state.ajk.newcases !== undefined ? this.state.ajk.expired : ''} name="expired" placeholder="Expired" onChange={this.handleChange} required />
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>

                <div className="card mt-2">
                    <div className="card-body">
                            <h5 class="card-title title-bg">Gilgit Baltistan</h5>
                            <div className="row mt-4">
                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>New (last 24 hrs):</label>
                                        <input type="number" class="form-control form-control-sm" province="gb" value={this.state.gb.newcases !== undefined ? this.state.gb.newcases : '' } name="newcases" placeholder="New (last 24 hrs)" onChange={this.handleChange} required />
                                    </div>
                                </div>

                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>Cumulative Suspected:</label>
                                        <input type="number" class="form-control form-control-sm" province="gb" value={this.state.gb.newcases !== undefined ? this.state.gb.cumulative_suspected : '' } name="cumulative_suspected" placeholder="Cumulative Suspected" onChange={this.handleChange} required />
                                    </div>
                                </div>

                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>Cumulative tests performed:</label>
                                        <input type="number" class="form-control form-control-sm" province="gb" value={this.state.gb.newcases !== undefined ? this.state.gb.cumulative_tests : '' } name="cumulative_tests" placeholder="Cumulative tests performed" onChange={this.handleChange} required />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>Cumulative Test positive cases:</label>
                                        <input type="number" class="form-control form-control-sm" province="gb" value={this.state.gb.newcases !== undefined ? this.state.gb.cumulative_tests_positive : ''} name="cumulative_tests_positive" placeholder="Cumulative Test positive cases" onChange={this.handleChange} required />
                                    </div>
                                </div>

                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>Still admitted:</label>
                                        <input type="number" class="form-control form-control-sm" province="gb" value={this.state.gb.newcases !== undefined ? this.state.gb.still_admitted : ''} name="still_admitted" placeholder="Still admitted" onChange={this.handleChange} required />
                                    </div>
                                </div>

                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>Discharged:</label>
                                        <input type="number" class="form-control form-control-sm" province="gb" value={this.state.gb.newcases !== undefined ? this.state.gb.discharged : ''} name="discharged" placeholder="Discharged" onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm">
                                    <div class="form-group">
                                        <label>Expired:</label>
                                        <input type="number" class="form-control form-control-sm" province="gb" value={this.state.gb.newcases !== undefined ? this.state.gb.expired : ''} name="expired" placeholder="Expired" onChange={this.handleChange} required />
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>

                
                <button type="submit" class="btn btn-primary mt-3">Save</button>
            </form>
        </div>
      );

    } else {

      return (
        <div>
            <form methpd="post" onSubmit={this.islHandleSubmit}>
                <div className="card mt-2">
                    <div className="card-body">
                        <h5 class="card-title title-bg">Authentication</h5>
                        <div className="row mt-4">
                            <div className="col-sm">
                                <div class="form-group">
                                    <input type="password" class="form-control form-control-sm" name="password" placeholder="Enter Password" onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button type="submit" class="btn btn-primary mt-3">Login</button>
            </form>
        </div>
      );
    }
  }
}

export default AddData; // Don’t forget to use export default!