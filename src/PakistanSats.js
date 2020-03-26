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
import { FaArrowUp } from 'react-icons/fa';


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

    totalgrowthRateCalc(present, past, n, in_perc) {
        var base = (present / past)
        var exponent = (1 / (n - 1) );
        var calc = parseFloat( Math.pow(base, exponent) ) - 1;
        var perc = calc * 100;
        var calcsign = <FaArrowUp style={{fontSize: "0.4em"}}/>;
        var prsign = '%';
        if (in_perc) {
            return perc.toFixed(2);
        } else {
            return calc.toFixed(2) + calcsign;
        }
    }

    daygrowthRateCalc(present, past) {
        var base = ( (present - past) / past );
        return base.toFixed(2);
    }

  render() {
    const { error, isLoaded, data } = this.state;

    var total_cases = 0;
    var total_deaths = 0;
    var total_in_hospital = 0;
    var total_recovered = 0;
    var total_tests_performed = 0;
    var total_population = 0;

    // sindh
    var cumulative_suspected = 0;
    var cumulative_tests = 0;
    var cumulative_testpositive = 0;
    var discharged = 0;
    var expired = 0;
    var newcases = 0;
    var still_admitted = 0;
    var negative = 0;

    //latest 
    var l_total_tests_performed = 0;
    var l_total_cases = 0;
    var l_total_deaths = 0;
    var l_total_in_hospital = 0;
    var l_total_recovered = 0;

    var growthRate = 0;
    var affected_percent_population = 0;
    var future_predic = 0;
    var dayGrowthRate = 0;
    var sl_total_cases = 0;

    if ( data !== null ) {
        
        var sindhStat = data.countries.pakistan.provinces.sindh.stats,
            sindhMaxStats = (sindhStat.length - 1),
            sindhLastStat = sindhStat[sindhMaxStats],
            sindhSecondLastResult = sindhStat[(sindhMaxStats - 1)],


            punjabStat = data.countries.pakistan.provinces.punjab.stats,
            punjabMaxStats = (punjabStat.length - 1),
            punjabLastStat = punjabStat[punjabMaxStats],
            punjabSecondLastResult = punjabStat[(punjabMaxStats - 1)],

            ictStat = data.countries.pakistan.provinces.ict.stats,
            ictMaxStats = (ictStat.length - 1),
            ictLastStat = ictStat[ictMaxStats],
            ictSecondLastResult = ictStat[(ictMaxStats - 1)],

            ajkStat = data.countries.pakistan.provinces.ajk.stats,
            ajkMaxStats = (ajkStat.length - 1),
            ajkLastStat = ajkStat[ajkMaxStats],
            ajkSecondLastResult = ajkStat[(ajkMaxStats - 1)],

            balochistanStat = data.countries.pakistan.provinces.balochistan.stats,
            balochistanMaxStats = (balochistanStat.length - 1),
            balochistanLastStat = balochistanStat[balochistanMaxStats],
            balochistanSecondLastResult = balochistanStat[(balochistanMaxStats - 1)],

            gbStat = data.countries.pakistan.provinces.gb.stats,
            gbMaxStats = (gbStat.length - 1),
            gbLastStat = gbStat[gbMaxStats],
            gbSecondLastResult = gbStat[(gbMaxStats - 1)],

            kptStat = data.countries.pakistan.provinces.kpt.stats,
            kptMaxStats = (kptStat.length - 1),
            kptLastStat = kptStat[kptMaxStats],
            kptSecondLastResult = kptStat[(kptMaxStats - 1)];
        
            // current
            total_tests_performed = parseInt(sindhLastStat.cumulative_tests) + 
                                    parseInt(punjabLastStat.cumulative_tests) + 
                                    parseInt(ictLastStat.cumulative_tests) + 
                                    parseInt(ajkLastStat.cumulative_tests) + 
                                    parseInt(balochistanLastStat.cumulative_tests) + 
                                    parseInt(gbLastStat.cumulative_tests) + 
                                    parseInt(kptLastStat.cumulative_tests); 

            total_cases           = parseInt(sindhLastStat.cumulative_tests_positive) + 
                                    parseInt(punjabLastStat.cumulative_tests_positive) + 
                                    parseInt(ictLastStat.cumulative_tests_positive) + 
                                    parseInt(ajkLastStat.cumulative_tests_positive) + 
                                    parseInt(balochistanLastStat.cumulative_tests_positive) + 
                                    parseInt(gbLastStat.cumulative_tests_positive) + 
                                    parseInt(kptLastStat.cumulative_tests_positive);

            total_deaths          = parseInt(sindhLastStat.expired) + 
                                    parseInt(punjabLastStat.expired) + 
                                    parseInt(ictLastStat.expired) + 
                                    parseInt(ajkLastStat.expired) + 
                                    parseInt(balochistanLastStat.expired) + 
                                    parseInt(gbLastStat.expired) + 
                                    parseInt(kptLastStat.expired)

            total_in_hospital     = parseInt(sindhLastStat.still_admitted) + 
                                    parseInt(punjabLastStat.still_admitted) + 
                                    parseInt(ictLastStat.still_admitted) + 
                                    parseInt(ajkLastStat.still_admitted) + 
                                    parseInt(balochistanLastStat.still_admitted) + 
                                    parseInt(gbLastStat.still_admitted) + 
                                    parseInt(kptLastStat.still_admitted); 

            total_recovered       = parseInt(sindhLastStat.discharged) + 
                                    parseInt(punjabLastStat.discharged) + parseInt(ictLastStat.discharged) + parseInt(ajkLastStat.discharged) + parseInt(balochistanLastStat.discharged) + parseInt(gbLastStat.discharged) + parseInt(kptLastStat.discharged);

            
            // last 24 
            l_total_tests_performed = (parseInt(sindhLastStat.cumulative_tests) - parseInt(sindhSecondLastResult.cumulative_tests))
                                       + (parseInt(punjabLastStat.cumulative_tests) - parseInt(punjabSecondLastResult.cumulative_tests))
                                       + (parseInt(ictLastStat.cumulative_tests) - parseInt(ictSecondLastResult.cumulative_tests)) 
                                       + (parseInt(ajkLastStat.cumulative_tests) - parseInt(ajkSecondLastResult.cumulative_tests))
                                       + (parseInt(balochistanLastStat.cumulative_tests) - parseInt(balochistanSecondLastResult.cumulative_tests))
                                       + (parseInt(gbLastStat.cumulative_tests) - parseInt(gbSecondLastResult.cumulative_tests))
                                       + (parseInt(kptLastStat.cumulative_tests) - parseInt(kptSecondLastResult.cumulative_tests));

            l_total_cases = (parseInt(sindhLastStat.cumulative_tests_positive) - parseInt(sindhSecondLastResult.cumulative_tests_positive))
                             + (parseInt(punjabLastStat.cumulative_tests_positive) - parseInt(punjabSecondLastResult.cumulative_tests_positive))
                             + (parseInt(ictLastStat.cumulative_tests_positive) - parseInt(ictSecondLastResult.cumulative_tests_positive)) 
                             + (parseInt(ajkLastStat.cumulative_tests_positive) - parseInt(ajkSecondLastResult.cumulative_tests_positive))
                             + (parseInt(balochistanLastStat.cumulative_tests_positive) - parseInt(balochistanSecondLastResult.cumulative_tests_positive))
                             + (parseInt(gbLastStat.cumulative_tests_positive) - parseInt(gbSecondLastResult.cumulative_tests_positive))
                             + (parseInt(kptLastStat.cumulative_tests_positive) - parseInt(kptSecondLastResult.cumulative_tests_positive));

            l_total_deaths = (parseInt(sindhLastStat.expired) - parseInt(sindhSecondLastResult.expired))
                             + (parseInt(punjabLastStat.expired) - parseInt(punjabSecondLastResult.expired))
                             + (parseInt(ictLastStat.expired) - parseInt(ictSecondLastResult.expired)) 
                             + (parseInt(ajkLastStat.expired) - parseInt(ajkSecondLastResult.expired))
                             + (parseInt(balochistanLastStat.expired) - parseInt(balochistanSecondLastResult.expired))
                             + (parseInt(gbLastStat.expired) - parseInt(gbSecondLastResult.expired))
                             + (parseInt(kptLastStat.expired) - parseInt(kptSecondLastResult.expired));

            l_total_in_hospital = (parseInt(sindhLastStat.still_admitted) - parseInt(sindhSecondLastResult.still_admitted))
                                 + (parseInt(punjabLastStat.still_admitted) - parseInt(punjabSecondLastResult.still_admitted))
                                 + (parseInt(ictLastStat.still_admitted) - parseInt(ictSecondLastResult.still_admitted)) 
                                 + (parseInt(ajkLastStat.still_admitted) - parseInt(ajkSecondLastResult.still_admitted))
                                 + (parseInt(balochistanLastStat.still_admitted) - parseInt(balochistanSecondLastResult.still_admitted))
                                 + (parseInt(gbLastStat.still_admitted) - parseInt(gbSecondLastResult.still_admitted))
                                 + (parseInt(kptLastStat.still_admitted) - parseInt(kptSecondLastResult.still_admitted));

            l_total_recovered = (parseInt(sindhLastStat.discharged) - parseInt(sindhSecondLastResult.discharged))
                                 + (parseInt(punjabLastStat.discharged) - parseInt(punjabSecondLastResult.discharged))
                                 + (parseInt(ictLastStat.discharged) - parseInt(ictSecondLastResult.discharged)) 
                                 + (parseInt(ajkLastStat.discharged) - parseInt(ajkSecondLastResult.discharged))
                                 + (parseInt(balochistanLastStat.discharged) - parseInt(balochistanSecondLastResult.discharged))
                                 + (parseInt(gbLastStat.discharged) - parseInt(gbSecondLastResult.discharged))
                                 + (parseInt(kptLastStat.discharged) - parseInt(kptSecondLastResult.discharged));


            // growth rate

            l_total_cases = (parseInt(sindhLastStat.cumulative_tests_positive) - parseInt(sindhSecondLastResult.cumulative_tests_positive))
                             + (parseInt(punjabLastStat.cumulative_tests_positive) - parseInt(punjabSecondLastResult.cumulative_tests_positive))
                             + (parseInt(ictLastStat.cumulative_tests_positive) - parseInt(ictSecondLastResult.cumulative_tests_positive)) 
                             + (parseInt(ajkLastStat.cumulative_tests_positive) - parseInt(ajkSecondLastResult.cumulative_tests_positive))
                             + (parseInt(balochistanLastStat.cumulative_tests_positive) - parseInt(balochistanSecondLastResult.cumulative_tests_positive))
                             + (parseInt(gbLastStat.cumulative_tests_positive) - parseInt(gbSecondLastResult.cumulative_tests_positive))
                             + (parseInt(kptLastStat.cumulative_tests_positive) - parseInt(kptSecondLastResult.cumulative_tests_positive));

            var ev = total_cases,
                bv =  parseInt(sindhStat[0].cumulative_tests_positive) + 
                      parseInt(punjabStat[0].cumulative_tests_positive) + 
                      parseInt(ictStat[0].cumulative_tests_positive) + 
                      parseInt(ajkStat[0].cumulative_tests_positive) + 
                      parseInt(balochistanStat[0].cumulative_tests_positive) + 
                      parseInt(gbStat[0].cumulative_tests_positive) + 
                      parseInt(kptStat[0].cumulative_tests_positive);

            //Second last total cases 
            sl_total_cases = total_cases - l_total_cases;

            total_population = data.countries.pakistan.population_size;
            growthRate = this.totalgrowthRateCalc(ev, bv, sindhStat.length, true);

            dayGrowthRate = this.daygrowthRateCalc(total_cases, sl_total_cases);
            future_predic = ((dayGrowthRate * total_cases) + total_cases).toFixed(0);

    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div className="row row-eq-height">
            <div className="col-md-12 col-xs-12">
              <div className="row row-eq-height">

                <div className="col-md-4 col-xs-12 mb-4">
                   <div className="card">
                      <div className="card-body">
                         <h3 className="card-title text-left text-uppercase">Tests Performed</h3>
                         <p className="card-text text-left" >
                            <CountUp end={total_tests_performed} />
                            <small className="tx-color-03"> <span style={{color: 'green'}} >+{l_total_tests_performed}</span> in 24h </small>
                         </p>
                      </div>
                   </div>
                </div>
                <div className="col-md-4 col-xs-12 mb-4">
                   <div className="card">
                      <div className="card-body">
                         <h3 className="card-title text-left text-uppercase">Total Positive Cases</h3>
                         <p className="card-text text-left" >
                            <CountUp end={total_cases} />
                            <small className="tx-color-03"> <span style={{color: 'red'}} >+{l_total_cases}</span> in 24h </small>
                         </p>
                      </div>
                   </div>
                </div>
                <div className="col-md-4 col-xs-12 mb-4">
                   <div className="card">
                      <div className="card-body">
                         <h3 className="card-title text-left text-uppercase">In hospital</h3>
                         <p className="card-text text-left" >
                            <CountUp end={total_in_hospital } />
                            <small className="tx-color-03"> <span style={{color: 'red'}} >+{l_total_in_hospital}</span> in 24h </small>
                         </p>
                      </div>
                   </div>
                </div>
                <div className="col-md-4 col-xs-12 mb-4">
                   <div className="card">
                      <div className="card-body">
                         <h3 className="card-title text-left text-uppercase">Recovered</h3>
                         <p className="card-text text-left" >
                            <CountUp end={total_recovered} />
                            <small className="tx-color-03"> <span style={{color: 'green'}} >+{l_total_recovered}</span> in 24h </small>
                         </p>
                      </div>
                   </div>
                </div>
                <div className="col-md-4 col-xs-12 mb-4">
                   <div className="card">
                      <div className="card-body">
                         <h3 className="card-title text-left text-uppercase">Deceased</h3>
                         <p className="card-text text-left" >
                            <CountUp end={total_deaths} />
                            <small className="tx-color-03"> <span style={{color: 'red'}} >+{l_total_deaths}</span> in 24h </small>
                         </p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-4" />
          <h1 className="mb-4 text-left heading">Predictive</h1>
          <div className="row">
              <div className="col-md-12">
              <ul>
                <li>With the current growth rate of <strong>{growthRate}%</strong> total positive cases are expected to be <strong>{future_predic}</strong> in the next 24 Hours.</li>
              </ul>
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