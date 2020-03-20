import React, { Component } from 'react';
import CountUp from 'react-countup';

class GlobalStats extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      grecordDate: '',
      gtotalCases: 0,
      gnewCases: 0,
      gtotalDeaths: 0,
      gtotalRecovered: 0
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this.fetchStats(), 5000);
    this.fetchStats();
  }

  async fetchStats() {
     fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "OdCHBwGU6jmshugiwvTI5OYm49usp1fePOwjsnZwIVAWoTE6oI"
      }
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          grecordDate: new Date(result.statistic_taken_at),
          gtotalCases: parseInt(result.total_cases.replace(",", "")),
          gnewCases: parseInt(result.new_cases.replace(",", "")),
          gtotalDeaths: parseInt(result.total_deaths.replace(",", "")),
          gtotalRecovered: parseInt(result.total_recovered.replace(",", ""))
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
    const { error, isLoaded, cdata, grecordDate, gtotalCases, gnewCases, gtotalDeaths, gtotalRecovered } = this.state;
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <hr class="my-4" />
          <div className="row">
            <div className="col"> <strong class="lead" style={{color: "#000"}}> Global <br/> {grecordDate.toISOString().split('T')[0]} </strong> </div>
            <div className="col"> <p class="lead" style={{color: "#333"}}> Total: <CountUp end={gtotalCases} decimals={0} decimal="," /> </p> </div>
            <div className="col"> <p class="lead" style={{color: "#333"}}> New: <CountUp end={gnewCases} /> </p> </div>
            <div className="col"> <p class="lead" style={{color: "green"}}> Recovered: <CountUp end={gtotalRecovered} /> </p> </div>
            <div className="col"> <p class="lead" style={{color: "red"}}> Deaths: <CountUp end={gtotalDeaths} /> </p> </div>
          </div>
        </div>
      );
    }
  }
}

export default GlobalStats; // Don’t forget to use export default!