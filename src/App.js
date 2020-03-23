import React from 'react';
import './App.css';
import History from './History.js'; // Import a component from another file
import Header from './Header.js'; // Import a component from another file
import PakistanSats from './PakistanSats.js'; // Import a component from another file
import AddData from './AddData.js'; // Import a component from another file
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
    <div className="jumbotron jumbotron-fluid " style={{"marginBottom": "0"}} >
      <div className="container">
          <Header />
          
          {/* <div className="row">
            <div className="col-md-12">
              <GlobalStats />
            </div>
          </div>*/}
          
          <Router>
            <Switch>
              <Route path="/add">
                <AddData />
              </Route>
              <Route path="/">
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
              </Route>
            </Switch>
          </Router>

          <footer>
            <hr /> 
            <div className="row">
            <div className="col-md-4 text-left">
              <p className="lead">&copy; Copyright 2020 <br/>
              All rights reserved.</p>
            </div>
            <div className="col-md-8 text-right">
              <small> <p className="lead">A brief report on the current situation of COVID-19 (Corona) Virus in Pakistan. <br/> All of these statistics are generated from <a href="http://www.covid.gov.pk/"> http://www.covid.gov.pk </a></p></small>
              </div> 
            </div>
          </footer>
        </div>
      </div>
      
    </div>
  );
}

export default App;
