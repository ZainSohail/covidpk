import React, { Component } from 'react';
import CountUp from 'react-countup';

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
      var recordDate = new Date(record.record_date);
      var totalCases = record.total_cases;
      var newCases = record.new_cases;
      var totalDeaths = record.total_deaths;
      var totalRecovered = record.total_recovered;
    } else {
      var recordDate = '';
      var totalCases = 0;
      var newCases = 0;
      var totalDeaths = 0;
      var totalRecovered = 0;
    }

   

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <hr className="my-4" />
          <div className="row" key="2232">
            <div className="col"> <strong class="lead" style={{color: "#000"}}> Pakistan <br/> {recordDate.toISOString().split('T')[0]} </strong> </div>
            <div className="col"> <p class="lead" style={{color: "#333"}}> Total: <CountUp end={totalCases} /> </p> </div>
            <div className="col"> <p class="lead" style={{color: "#333"}}> New: <CountUp end={newCases} /> </p> </div>
            <div className="col"> <p class="lead" style={{color: "green"}}> Recovered: <CountUp end={totalRecovered} /> </p> </div>
            <div className="col"> <p class="lead" style={{color: "red"}}> Deaths: <CountUp end={totalDeaths} /> </p> </div>
          </div
>        </div>
      );
    }
  }
}

export default PakistanSats; // Don’t forget to use export default!