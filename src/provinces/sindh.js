import React, { Component } from 'react';
import CountUp from 'react-countup';
import {Line} from 'react-chartjs-2';

class PakistanSats extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this.fetchStats(), 5000);
    this.fetchStats();
    
  }

  async fetchStats() {
    fetch("http://localhost:3000/data.json", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          data: result,
        });
    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {
      console.log(error);
      /*this.setState({
        isLoaded: true,
        error
      });*/
    }
    )
  }

  componentWillUnmount() {
      clearInterval(this.intervalId);
  }

  render() {
    const { error, isLoaded, data } = this.state;

    if ( data !== undefined ) {
        var record = data.pop();
        var critical = 0;
        var recovered = 0;
        var deaths = 0;

        if ( record !== undefined ) {

          var critical = record.cases.filter(function (index) {
              if ( index.name === "Critical" ) 
                return index.stat;
          });


          var recovered = record.cases.filter(function (index) {
              if ( index.name === "Recovered" ) 
                return index.stat;
          });

          var deaths = record.cases.filter(function (index) {
              if ( index.name === "Deaths" ) 
                return index.stat;
          });

          var newcases = record.cases.filter(function (index) {
              if ( index.name === "Cases (24 HRS)" ) 
                return index.stat;
          });

          var currentActive = record.total - recovered[0].stat - deaths[0].stat;

          var sindh = record.province.filter(function (index) {
              if ( index.name === "Sindh" ) 
                return index.stat;
          });

          var punjab = record.province.filter(function (index) {
              if ( index.name === "Punjab" ) 
                return index.stat;
          });

          var balochistan = record.province.filter(function (index) {
              if ( index.name === "Balochistan" ) 
                return index.stat;
          });

          var kp = record.province.filter(function (index) {
              if ( index.name === "KP" ) 
                return index.stat;
          });

          var ict = record.province.filter(function (index) {
              if ( index.name === "ICT" ) 
                return index.stat;
          });

          var ajk = record.province.filter(function (index) {
              if ( index.name === "AJK" ) 
                return index.stat;
          });

          var gb = record.province.filter(function (index) {
              if ( index.name === "GB" ) 
                return index.stat;
          });

          var cdata = {
            labels: [
              'Sindh',
              'Punjab',
              'Balochistan',
              'Khyber Pakhtunkhwa',
              'Islamabad',
              'Azad Jammu and Kashmir',
              'Gilgit-Baltistan'
            ],
            datasets: [{
              data: [sindh[0].stat, punjab[0].stat, balochistan[0].stat, kp[0].stat, ict[0].stat, ajk[0].stat, gb[0].stat],
              backgroundColor: [
                '#5b47fb',
                '#f10075',
                '#6f42c1',
                '#0168fa',
                '#10b759',
                '#3b4863',
                '#ffc107',
              ],
              hoverBackgroundColor: [
                '#5b47fb',
                '#f10075',
                '#6f42c1',
                '#0168fa',
                '#10b759',
                '#3b4863',
                '#ffc107',
              ]
            }]
          };

        var linedata = {
            labels: [
                'day', 'cases'
            ],
            datasets: [{
                data: [111, 222]
            }]
        };

          
        }

    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
           <div className="row row-eq-height" key="2232">
              <div className="col-sm mb-2">
                 <div className="card">
                    <div className="card-body">
                       <h3 className="card-title text-left text-uppercase">Total Cases</h3>
                       <p className="card-text text-left" >
                          <CountUp end={record.total} />
                          <small className="tx-color-03"> <span style={{color: 'red'}} >{critical[0].stat}</span> critical </small>
                       </p>
                    </div>
                 </div>
              </div>
              <div className="col-sm mb-2">
                 <div className="card">
                    <div className="card-body">
                       <h3 className="card-title text-left text-uppercase">Active cases</h3>
                       <p className="card-text text-left" >
                          <CountUp end={currentActive} />
                          <small className="tx-color-03"> <span style={{color: 'red'}} >{parseFloat(currentActive*100/record.total).toFixed(2)}%</span> of total cases </small>
                       </p>
                    </div>
                 </div>
              </div>
              <div className="col-sm mb-2">
                 <div className="card">
                    <div className="card-body">
                       <h3 className="card-title text-left text-uppercase">Recovered</h3>
                       <p className="card-text text-left" >
                          <CountUp end={recovered[0].stat} />
                          <small className="tx-color-03"> <span style={{color: 'green'}} >{parseFloat(recovered[0].stat*100/record.total).toFixed(2)}%</span> of total </small>
                       </p>
                    </div>
                 </div>
              </div>
              <div className="col-sm mb-2">
                 <div className="card">
                    <div className="card-body">
                       <h3 className="card-title text-left text-uppercase">Deceased</h3>
                       <p className="card-text text-left" >
                          <CountUp end={deaths[0].stat} />
                          <small className="tx-color-03"> <span style={{color: 'green'}} >{parseFloat(deaths[0].stat*100/record.total).toFixed(2)}%</span> of total </small>
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           <hr className="my-4" />

           <h1 className="mb-4 text-left heading">Provinces</h1>
           <div className="row" key="2232">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-xs-12 col-md-6 mb-2">
                            <div className="card">
                               <div className="card-body">
                                    <h3 className="card-title text-left text-uppercase">Sindh</h3>
                                    <div class="row">
                                        <div class="col-6">
                                            <p className="card-text text-left" >
                                                <CountUp end={sindh[0].stat} />
                                                <small className="tx-color-03"> <span style={{color: 'green'}} >{parseFloat(sindh[0].stat*100/record.total).toFixed(2)}%</span> of total </small>
                                            </p>
                                        </div>
                                        <div class="col-6">
                                            <p className="card-text text-right" >
                                                <Line 
                                                    data={linedata}
                                                    options={{
                                                        title:{
                                                          display:false
                                                        },
                                                        legend:{
                                                          display:false
                                                        }
                                                    }} />
                                            </p>
                                        </div>
                                    </div>
                               </div>
                               <div class="row small-boxes">
                                    <div class="col-12">Tests</div>
                                    <div class="col-4">
                                    <div class=" small-box">
                                      <h4>Perfomred</h4>
                                      <CountUp end={sindh[0].stat} />
                                        </div>
                                      </div>
                                    <div class="col-4">
                                    <div class=" small-box">
                                      <h4>Positive</h4>
                                      <CountUp end={sindh[0].stat} />
                                        </div>
                                      </div>
                                    <div class="col-4">
                                    <div class=" small-box">
                                      <h4>Positive</h4>
                                      <CountUp end={sindh[0].stat} />
                                        </div>
                                      </div>
                               </div> 
                               <div class="row small-boxes">
                                    <div class="col-12">Hospital</div>
                                    <div class="col-4">
                                    <div class=" small-box">
                                      <h4>Admitted</h4>
                                      <CountUp end={sindh[0].stat} />
                                        </div>
                                      </div>
                                    <div class="col-4">
                                    <div class=" small-box">
                                      <h4>Recovered</h4>
                                      <CountUp end={sindh[0].stat} />
                                        </div>
                                      </div>
                                    <div class="col-4">
                                    <div class=" small-box">
                                      <h4>Disceased</h4>
                                      <CountUp end={sindh[0].stat} />
                                        </div>
                                      </div>
                               </div>                             
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-6 mb-2">
                            <div className="card">
                               <div className="card-body">
                                  <h3 className="card-title text-left text-uppercase">Punjab</h3>
                                  <p className="card-text text-left" >
                                     <CountUp end={punjab[0].stat} />
                                     <small className="tx-color-03"> <span style={{color: 'green'}} >{parseFloat(punjab[0].stat*100/record.total).toFixed(2)}%</span> of total </small>
                                  </p>
                               </div>
                               <div class="row small-boxes">
                                    <div class="col-4">
                                    <div class=" small-box">
                                      <h4><span>Tests</span> Perfomred</h4>
                                      <CountUp end={sindh[0].stat} />
                                       <small className="tx-color-03"> <span style={{color: 'green'}} >{parseFloat(sindh[0].stat*100/record.total).toFixed(2)}%</span> of total </small>
                                        </div>
                                      </div>
                                    <div class="col-4">
                                    <div class=" small-box">
                                      <h4><span>Tests</span> Positive</h4>
                                      <CountUp end={sindh[0].stat} />
                                       <small className="tx-color-03"> <span style={{color: 'green'}} >{parseFloat(sindh[0].stat*100/record.total).toFixed(2)}%</span> of total </small>
                                        </div>
                                      </div>
                                    <div class="col-4">
                                    <div class=" small-box">
                                      <h4><span>Tests</span> Positive</h4>
                                      <CountUp end={sindh[0].stat} />
                                       <small className="tx-color-03"> <span style={{color: 'green'}} >{parseFloat(sindh[0].stat*100/record.total).toFixed(2)}%</span> of total </small>
                                        </div>
                                      </div>
                               </div> 
                               <div class="row small-boxes">
                                    <div class="col-4">
                                    <div class=" small-box">
                                      <h4><span>Hospital</span> Admitted</h4>
                                      <CountUp end={sindh[0].stat} />
                                       <small className="tx-color-03"> <span style={{color: 'green'}} >{parseFloat(sindh[0].stat*100/record.total).toFixed(2)}%</span> of total </small>
                                        </div>
                                      </div>
                                    <div class="col-4">
                                    <div class=" small-box">
                                      <h4><span>Hospital</span> Recovered</h4>
                                      <CountUp end={sindh[0].stat} />
                                       <small className="tx-color-03"> <span style={{color: 'green'}} >{parseFloat(sindh[0].stat*100/record.total).toFixed(2)}%</span> of total </small>
                                        </div>
                                      </div>
                                    <div class="col-4">
                                    <div class=" small-box">
                                      <h4><span>Hospital</span> Disceased</h4>
                                      <CountUp end={sindh[0].stat} />
                                       <small className="tx-color-03"> <span style={{color: 'green'}} >{parseFloat(sindh[0].stat*100/record.total).toFixed(2)}%</span> of total </small>
                                        </div>
                                      </div>
                               </div>       
                            </div>
                        </div>
                        
                        <div className="col-xs-12 col-md-6 mb-2">
                            <div className="card">
                               <div className="card-body">
                                  <h3 className="card-title text-left text-uppercase">Balochistan</h3>
                                  <p className="card-text text-left" >
                                     <CountUp end={balochistan[0].stat} />
                                     <small className="tx-color-03"> <span style={{color: 'green'}} >{parseFloat(balochistan[0].stat*100/record.total).toFixed(2)}%</span> of total </small>
                                  </p>
                               </div>
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-6 mb-2">
                            <div className="card">
                               <div className="card-body">
                                  <h3 className="card-title text-left text-uppercase">Khyber Pakhtunkhwa</h3>
                                  <p className="card-text text-left" >
                                     <CountUp end={kp[0].stat} />
                                     <small className="tx-color-03"> <span style={{color: 'green'}} >{parseFloat(kp[0].stat*100/record.total).toFixed(2)}%</span> of total </small>
                                  </p>
                               </div>
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-6 mb-2">
                            <div className="card">
                               <div className="card-body">
                                  <h3 className="card-title text-left text-uppercase">Islamabad Capital Territory</h3>
                                  <p className="card-text text-left" >
                                     <CountUp end={ict[0].stat} />
                                     <small className="tx-color-03"> <span style={{color: 'green'}} >{parseFloat(ict[0].stat*100/record.total).toFixed(2)}%</span> of total </small>
                                  </p>
                               </div>
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-6 mb-2">
                            <div className="card">
                               <div className="card-body">
                                  <h3 className="card-title text-left text-uppercase">Azad Jammu and Kashmir</h3>
                                  <p className="card-text text-left" >
                                     <CountUp end={ajk[0].stat} />
                                     <small className="tx-color-03"> <span style={{color: 'green'}} >{parseFloat(ajk[0].stat*100/record.total).toFixed(2)}%</span> of total </small>
                                  </p>
                               </div>
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-6 mb-2">
                            <div className="card">
                               <div className="card-body">
                                  <h3 className="card-title text-left text-uppercase">Gilgit-Baltistan</h3>
                                  <p className="card-text text-left" >
                                     <CountUp end={gb[0].stat} />
                                     <small className="tx-color-03"> <span style={{color: 'green'}} >{parseFloat(gb[0].stat*100/record.total).toFixed(2)}%</span> of total </small>
                                  </p>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
           
        </div>
      );
    }
  }
}

export default PakistanSats; // Don’t forget to use export default!