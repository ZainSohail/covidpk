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
      data: [],
      ict: [],
      sindh: [],

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

      if ( ( event.target.value > 1 ) && ( event.target.value < 1000 ) ) {
        
        var s = this.state[province];
        var date = new Date();
        s[nam] = val;
        s['date'] = date.toString();

        this.setState({
            [province]: s
        });

      } else {
        alert('Maximum character limit is 999');
      }

      
  }

  islHandleSubmit(event) {
    event.preventDefault();

    this.setState({
        isLoaded: false
    });

    var data = this.state.data;
    data.countries.pakistan.provinces.sindh.stats.push(this.state.sindh);
    data.countries.pakistan.provinces.ict.stats.push(this.state.ict);

    firebase.database().ref('/').set(data)
    .then((response) => {
      this.setState({
        isLoaded: true
      });

    })
    .catch((error) =>{
      this.setState({
        isLoaded: true
      });
    });

  }

  render() {

    const { error, isLoaded, data, stats } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
            <form methpd="post" onSubmit={this.islHandleSubmit}>
                <div className="card mt-2">
                    <div className="card-body">
                        <h5 class="card-title title-bg">Islamabad</h5>
                        <div className="row mt-4">
                            <div className="col-sm">
                                <div class="form-group">
                                    <input type="number" class="form-control form-control-sm" province="ict" name="newcases" value={this.state.ict.newcases !== undefined ? this.state.ict.newcases : '' } placeholder="New (last 24 hrs)" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <input type="number" class="form-control form-control-sm" province="ict" name="cumulative_suspected" value={this.state.ict.newcases !== undefined ? this.state.ict.cumulative_suspected : '' } placeholder="Cumulative Suspected" onChange={this.handleChange} required />
                                    
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <input type="number" class="form-control form-control-sm" province="ict" name="cumulative_tests" value={this.state.ict.newcases !== undefined ? this.state.ict.cumulative_tests : '' } placeholder="Cumulative tests performed" onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm">
                                <div class="form-group">
                                    <input type="number" class="form-control form-control-sm" province="ict" name="cumulative_tests_positive" value={this.state.ict.newcases !== undefined ? this.state.ict.cumulative_tests_positive : '' } placeholder="Cumulative Test positive cases" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <input type="number" class="form-control form-control-sm" province="ict" name="still_admitted" value={this.state.ict.newcases !== undefined ? this.state.ict.still_admitted : '' } placeholder="Still admitted" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <input type="number" class="form-control form-control-sm" province="ict" name="discharged" value={this.state.ict.newcases !== undefined ? this.state.ict.discharged : '' } placeholder="Discharged" onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm">
                                <div class="form-group">
                                    <input type="number" class="form-control form-control-sm" province="ict" name="expired" value={this.state.ict.newcases !== undefined ? this.state.ict.expired : '' } placeholder="Expired" onChange={this.handleChange} required />
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
                                    <input type="number" class="form-control form-control-sm" province="sindh" value={this.state.ict.newcases !== undefined ? this.state.sindh.newcases : '' } name="newcases" placeholder="New (last 24 hrs)" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <input type="number" class="form-control form-control-sm" province="sindh" value={this.state.ict.newcases !== undefined ? this.state.sindh.cumulative_suspected : '' } name="cumulative_suspected" placeholder="Cumulative Suspected" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <input type="number" class="form-control form-control-sm" province="sindh" value={this.state.ict.newcases !== undefined ? this.state.sindh.cumulative_tests : '' } name="cumulative_tests" placeholder="Cumulative tests performed" onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm">
                                <div class="form-group">
                                    <input type="number" class="form-control form-control-sm" province="sindh" value={this.state.ict.newcases !== undefined ? this.state.sindh.cumulative_tests_positive : ''} name="cumulative_tests_positive" placeholder="Cumulative Test positive cases" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <input type="number" class="form-control form-control-sm" province="sindh" value={this.state.ict.newcases !== undefined ? this.state.sindh.still_admitted : ''} name="still_admitted" placeholder="Still admitted" onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className="col-sm">
                                <div class="form-group">
                                    <input type="number" class="form-control form-control-sm" province="sindh" value={this.state.ict.newcases !== undefined ? this.state.sindh.discharged : ''} name="discharged" placeholder="Discharged" onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm">
                                <div class="form-group">
                                    <input type="number" class="form-control form-control-sm" province="sindh" value={this.state.ict.newcases !== undefined ? this.state.sindh.expired : ''} name="expired" placeholder="Expired" onChange={this.handleChange} required />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mt-3">Save</button>
            </form>
        </div>
      );
    }
  }
}

export default AddData; // Don’t forget to use export default!