import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';


class CountryPie extends Component {

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
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=Pakistan", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "OdCHBwGU6jmshugiwvTI5OYm49usp1fePOwjsnZwIVAWoTE6oI"
      }
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
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
    //var lastestStat = data.stat_by_country[data.stat_by_country.length];

    var countryStat = data.stat_by_country;

    if ( countryStat !== undefined ) {
      var record = countryStat.pop();
      var totalCases = record.total_cases;
      var totalDeaths = record.total_deaths;
      var totalRecovered = record.total_recovered;
    } else {
      var totalCases = 0;
      var totalDeaths = 0;
      var totalRecovered = 0;
    }

    var cdata = {
          labels: [
            'Total',
            'Recovered',
            'Deaths'
          ],
          datasets: [{
            data: [totalCases, totalRecovered, totalDeaths],
            backgroundColor: [
            '#333',
            'green',
            'red'
            ],
            hoverBackgroundColor: [
            '#333',
            'green',
            'red'
            ]
          }]
        };

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Pie data={cdata} />
        </div>
      );
    }
  }
}

export default CountryPie; // Don’t forget to use export default!