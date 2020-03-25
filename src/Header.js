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
    this.setState({
        isLoaded: true,
    });
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
                                Last Updated: 25 March 2020
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