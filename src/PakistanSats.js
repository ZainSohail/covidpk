import React, { Component } from 'react';
import CountUp from 'react-countup';
import {Line} from 'react-chartjs-2';
import * as firebase from 'firebase';
import Sindh from './Sindh.js';
import Punjab from './Punjab.js';
import Balochistan from './Balochistan.js';
import Ajk from './Ajk.js';
import Gb from './Gb.js';
import Ict from './Ict.js';
import Kpt from './Kpt.js';


class PakistanSats extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: null
    };
  }

  componentDidMount() {

    let ref = firebase.database().ref('/');
    ref.on('value', snapshot => {
        const state = snapshot.val();
        this.setState({
          isLoaded: true,
          data: state,
        });
    });
  }

  render() {
    const { error, isLoaded, data } = this.state;

    var total_cases = 0;
    var total_deaths = 0;
    var total_in_hospital = 0;
    var total_recovered = 0;
    var total_tests_performed = 0;

    // sindh
    var s_cumulative_suspected = 0;
    var s_cumulative_tests = 0;
    var s_cumulative_tests_positive = 0;
    var s_discharged = 0;
    var s_expired = 0;
    var s_newcases = 0;
    var s_still_admitted = 0;
    var s_negative = 0;

    if ( data !== null ) {
        total_cases = data.total_cases;
        total_deaths = data.total_deaths;
        total_in_hospital = data.total_in_hospital;
        total_recovered = data.total_recovered;

        data.countries.pakistan.provinces.sindh.stats.forEach(function(item, index) {
            s_cumulative_suspected += parseInt( item.cumulative_suspected );
            s_cumulative_tests += parseInt( item.cumulative_tests );
            s_cumulative_tests_positive += parseInt( item.cumulative_tests_positive );
            s_discharged += parseInt( item.discharged );
            s_newcases += parseInt( item.newcases );
            s_still_admitted += parseInt( item.still_admitted );
        });

        s_negative = s_cumulative_tests - s_cumulative_tests_positive;

        total_tests_performed = s_cumulative_tests;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div className="row row-eq-height">
              <div className="col-sm mb-2">
                 <div className="card">
                    <div className="card-body">
                       <h3 className="card-title text-left text-uppercase">Total Positive Cases</h3>
                       <p className="card-text text-left" >
                          <CountUp end={total_cases} />
                          <small className="tx-color-03"> <span style={{color: 'red'}} >+3</span> in 24h </small>
                       </p>
                    </div>
                 </div>
              </div>
              <div className="col-sm mb-2">
                 <div className="card">
                    <div className="card-body">
                       <h3 className="card-title text-left text-uppercase">Tests Performed</h3>
                       <p className="card-text text-left" >
                          <CountUp end={total_tests_performed} />
                          <small className="tx-color-03"> <span style={{color: 'red'}} >+3</span> in 24h </small>
                       </p>
                    </div>
                 </div>
              </div>
              <div className="col-sm mb-2">
                 <div className="card">
                    <div className="card-body">
                       <h3 className="card-title text-left text-uppercase">In hospital</h3>
                       <p className="card-text text-left" >
                          <CountUp end={total_in_hospital } />
                          <small className="tx-color-03"> <span style={{color: 'red'}} >+3</span> in 24h </small>
                       </p>
                    </div>
                 </div>
              </div>
              <div className="col-sm mb-2">
                 <div className="card">
                    <div className="card-body">
                       <h3 className="card-title text-left text-uppercase">Recovered</h3>
                       <p className="card-text text-left" >
                          <CountUp end={total_recovered} />
                          <small className="tx-color-03"> <span style={{color: 'red'}} >+3</span> in 24h </small>
                       </p>
                    </div>
                 </div>
              </div>
              <div className="col-sm mb-2">
                 <div className="card">
                    <div className="card-body">
                       <h3 className="card-title text-left text-uppercase">Deceased</h3>
                       <p className="card-text text-left" >
                          <CountUp end={total_deaths} />
                          <small className="tx-color-03"> <span style={{color: 'red'}} >+3</span> in 24h </small>
                       </p>
                    </div>
                 </div>
              </div>
          </div>

          <hr className="my-4" />
          <h1 className="mb-4 text-left heading">Provinces</h1>
          <div className="row">
              <div className="col-md-12">
                  <div className="row">
                      <Sindh />
                      <Punjab />
                      <Ict />
                      <Balochistan />
                      <Ajk />
                      <Gb />
                      <Kpt />
                  </div>
              </div>
          </div>
        </div>
      );
    }
  }
}

export default PakistanSats; // Don’t forget to use export default!