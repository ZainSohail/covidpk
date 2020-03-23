import React, { Component } from 'react';
import CountUp from 'react-countup';
import * as firebase from 'firebase';
import {Line, Doughnut, Pie} from 'react-chartjs-2';
import Moment from 'moment';

class Kpt extends Component {

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

    var options = '';
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
    var labels = [], cases = [];

    //latest 
    var sl_cumulative_suspected = 0;
    var sl_cumulative_tests = 0;
    var sl_cumulative_tests_positive = 0;
    var sl_discharged = 0;
    var sl_expired = 0;
    var sl_newcases = 0;
    var sl_still_admitted = 0;

    if ( data !== null ) {
        total_cases = data.total_cases;
        total_deaths = data.total_deaths;
        total_in_hospital = data.total_in_hospital;
        total_recovered = data.total_recovered;
        var stats = data.countries.pakistan.provinces.kpt.stats,
            lastStat = stats.pop(),
            maxStats = (stats.length - 1),
            lastResult = stats[maxStats],
            secondLastResult = stats[(maxStats - 1)];

        // get latest stat
        s_cumulative_suspected = parseInt( lastStat.cumulative_suspected );
        s_cumulative_tests = parseInt( lastStat.cumulative_tests );
        s_cumulative_tests_positive = parseInt( lastStat.cumulative_tests_positive );
        s_discharged = parseInt( lastStat.discharged );
        s_expired = parseInt( lastStat.expired );
        s_newcases = parseInt( lastStat.newcases );
        s_still_admitted = parseInt( lastStat.still_admitted );


        // last 24hr report
        sl_cumulative_suspected = parseInt(lastResult.cumulative_suspected) - parseInt(secondLastResult.cumulative_suspected);
        sl_cumulative_tests = parseInt(lastResult.cumulative_tests) - parseInt(secondLastResult.cumulative_tests);
        sl_cumulative_tests_positive = parseInt(lastResult.cumulative_tests_positive) - parseInt(secondLastResult.cumulative_tests_positive);
        sl_discharged = parseInt(lastResult.discharged) - parseInt(secondLastResult.discharged);
        sl_expired = parseInt(lastResult.expired) - parseInt(secondLastResult.expired);

        data.countries.pakistan.provinces.kpt.stats.forEach(function(item, index) {
            labels.push(Moment(item.date).format('D MMM'));
            cases.push(item.cumulative_tests_positive);
        });

        var lineChart = {
          labels: labels,
          datasets: [{
            label: "Total Cases",
            borderColor: "#000",
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.1)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,0.8)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            steppedLine: false,
            data: cases
          }],
        }

        var options = {
          maintainAspectRatio: true,
          fullWidth: true,
          scales: {
          yAxes: [
            {
              display: false, // this will hide vertical lines
            },
          ],
          xAxes: [
            {
              display: true, // this will hide vertical lines
            },
          ],
        },
        }

        var pieData = {
          labels: [
            'Still Admitted',
            'Discharged'
          ],
          datasets: [{
            data: [s_still_admitted, s_discharged],
            backgroundColor: [
            '#FF6384',
            '#36A2EB'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB'
            ]
          }]
        };

        var optionsPie = {
          maintainAspectRatio: true,
          fullWidth: true,
          scales: {
          yAxes: [
            {
              display: false, // this will hide vertical lines
            },
          ],
          xAxes: [
            {
              display: false, // this will hide vertical lines
            },
          ],
        },
        }
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
                    <h3 className="card-title text-left text-uppercase">Khyber Pakhtunkhwa</h3>
                    <div class="row small-boxes">
                          <div class="col col-xs-6">
                            <div class="small-box">
                              <h4>Total Tests</h4>
                              <CountUp end={s_cumulative_tests} />
                              <small className="tx-color-03"> <span style={{color: 'green'}} >+<CountUp end={sl_cumulative_tests} /></span> in 24h </small>
                            </div>
                          </div>

                          <div class="col col-xs-6">
                            <div class=" small-box">
                              <h4>Positive</h4>
                              <CountUp end={s_cumulative_tests_positive} />
                              <small className="tx-color-03"> <span style={{color: 'red'}} >+<CountUp end={sl_cumulative_tests_positive} /></span> in 24h </small>
                            </div>
                          </div>
                          <div class="col col-xs-6">
                            <div class=" small-box">
                              <h4>Deceased</h4>
                              <CountUp end={s_expired} />
                              <small className="tx-color-03"> <span style={{color: 'red'}} >+<CountUp end={sl_expired} /></span> in 24h </small>
                            </div>
                          </div>
                          <div class="col col-xs-6">
                            <div class=" small-box">
                              <h4>Recovered</h4>
                              <CountUp end={s_discharged} />
                              <small className="tx-color-03"> <span style={{color: 'green'}} >+<CountUp end={sl_discharged} /></span> in 24h </small>
                            </div>
                          </div>
                    </div> 
                    <div class="row">
                      <div class="col-12 small-boxes vertical">
                          <Line data={lineChart} fullWidth={true} height={100} options={options} legend={false} tooltips={false} />
                      </div>
                    </div>
               </div>                       
            </div>
        </div>
      );
    }
  }
}

export default Kpt; // Don’t forget to use export default!