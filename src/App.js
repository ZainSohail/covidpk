import React from 'react';
import logo from './logo.svg';
import './App.css';
import History from './History.js'; // Import a component from another file
import PakistanSats from './PakistanSats.js'; // Import a component from another file
import GlobalStats from './GlobalStats.js'; // Import a component from another file
import CountryPie from './CountryPie.js'; // Import a component from another file


function App() {
  return (
    <div className="App">

    <div class="jumbotron jumbotron-fluid " style={{"margin-bottom": "0"}} >
      <div class="container">
        <h1 class="display-4">COVID-19 in Pakistan</h1>
        <p class="lead">A brief report on the current situation of COVID-19 (Corona) Virus in Pakistan. All of these statistics are generated from <a href="http://www.covid.gov.pk/"> http://www.covid.gov.pk </a></p>

        {/* <div className="row">
          <div className="col-md-12">
            <GlobalStats />
          </div>
        </div>*/}
        
        <div className="row">
          <div className="col-md-12">
            <PakistanSats />
          </div>
        </div>

        <div className="row  mt-5">
          <div className="col-md-12 m-auto">
            <History />
          </div>
        </div>
      </div>
    </div>
      
    </div>
  );
}

export default App;
