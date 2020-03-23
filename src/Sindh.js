import React, { Component } from 'react';
import CountUp from 'react-countup';
import * as firebase from 'firebase';

class Sindh extends Component {

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
        <div className="col-12 col-md-6 mb-2">
            <div className="card">
               <div className="card-body">
                    <h3 className="card-title text-left text-uppercase">Sindh</h3>
                    <div class="row">
                        <div class="col-6">
                            <p className="card-text text-left" >
                                <CountUp end={s_cumulative_tests_positive} />
                                <small className="tx-color-03"> <span style={{color: 'green'}} >{parseFloat(s_cumulative_tests_positive*100/total_cases).toFixed(2)}%</span> of total </small>
                            </p>
                        </div>
                        <div class="col-6">
                            
                        </div>
                    </div>
               </div>
               <div class="row small-boxes">
                    <div class="col-4">
                      <div class="small-box">
                        <h4>Suspected</h4>
                        <CountUp end={s_cumulative_suspected} />
                      </div>
                    </div>

                    <div class="col-4">
                      <div class=" small-box">
                        <h4>Positive</h4>
                        <CountUp end={s_cumulative_tests_positive} />
                      </div>
                    </div>

                    <div class="col-4">
                      <div class=" small-box">
                        <h4>Negative</h4>
                        <CountUp end={s_negative} />
                      </div>
                    </div>
               </div>                        
            </div>
        </div>
      );
    }
  }
}

export default Sindh; // Don’t forget to use export default!