import React, { Component } from 'react';
import Moment from 'moment';
import { ReactComponent as Flag } from './flag.svg';

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
                    <div className="col-md-6 text-left">
                        <h1 class="heading">COVID-19 in Pakistan<span class="flag"><Flag/></span></h1>
                    </div>
                    <div className="col-md-6 text-right">
                        <p class="lead mb-0">
                            <small class="tx-color-04">
                                Last Updated: {Moment(record.date).format('Do MMMM HH:mm a')}
                            </small>
                        </p>
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