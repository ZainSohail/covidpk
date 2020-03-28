import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import Moment from 'moment';
import { FaCircle } from 'react-icons/fa';
import { IconContext } from "react-icons";

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
    fetch("https://covid19.com.pk/data.json", {
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

    var dateData = cdata.filter(function (index, i) {
          var prev = i - 1;
          var cdate = new Date(index.date);
          var pdate = new Date(cdata[(i > 0 ? prev : 0)].date);
          
          return cdate.getTime() >= pdate.getTime();
    });

    var labels = [], cases = [];

    if ( dateData.length !== undefined ) {

      for (let i = 0; i < dateData.length; i++) {
        labels.push(Moment(dateData[i].date).format('Do HH:mm'));
        cases.push(dateData[i].total.replace(",", ""));
      }

    }

    var data = {
        labels: labels,
        datasets: [{
          label: "Total Cases",
          borderColor: "#000",
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(255,0,0,0.1)',
          borderColor: 'rgba(255,0,0,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(255,0,0,1)',
          pointBackgroundColor: 'rgba(255,0,0,1)',
          pointBorderWidth: 3,
          pointHoverRadius: 3,
          pointHoverBackgroundColor: 'rgba(255,0,0,1)',
          pointHoverBorderColor: 'rgba(255,0,0,1)',
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
              display: false, // this will hide vertical lines
            },
          ],
        },
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div className="mb-5">
            <h5 className="card-title text-uppercase text-center">
               <IconContext.Provider value={{ color: "red", 'size': ".8em", style: { marginTop: '-4px' } }}>
                    <FaCircle /> Live heartbeat 
                </IconContext.Provider>
            </h5>
            <Line data={data} fullWidth={false} height={50} options={options} legend={false} tooltips={false}/>
          </div>
          <hr/>
        </div>
      );
    }
  }
}

export default History; // Don’t forget to use export default!