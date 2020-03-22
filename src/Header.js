import React, { Component } from 'react';
import CountUp from 'react-countup';
import {Doughnut} from 'react-chartjs-2';
import Moment from 'moment';

class Header extends Component {

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
    fetch("https://corona.onx.digital/data.json", {
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
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
        <header>
            <div className="row">
                <div className="col-md-6 text-left"><p class="lead"><strong>COVID-19 in Pakistan</strong></p> </div>
                <div className="col-md-6 text-right">
                    <p class="lead mb-0"><small class="tx-color-03"><strong>Last Updated:</strong></small></p>
                    <p class="lead"><small class="tx-color-03">{Moment(record.date).format('Do MMMM HH:mm a')}</small></p>
                </div>
            </div>
            <hr />
        </header>
        </div>
      );
    }
  }
}

export default Header; // Don’t forget to use export default!