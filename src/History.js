import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import Moment from 'moment';

class History extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      cdata: []
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
          cdata: result,
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

  render() {
    const { error, isLoaded, cdata } = this.state;

    var labels = [], cases = [];

    if ( cdata.length !== undefined ) {

      for (let i = 0; i < cdata.length; i++) {
        labels.push(Moment(cdata[i].date).format('MMM Do'));
        cases.push(cdata[i].total.replace(",", ""));
      }

    }

    var data = {
        labels: labels,
        datasets: [{
          label: "Total Cases",
          borderColor: "#000",
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: cases,
        }],
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h4>History</h4>
          <br/>
          <Line data={data} />
        </div>
      );
    }
  }
}

export default History; // Don’t forget to use export default!