import React, { Component } from 'react';
import Moment from 'moment';
import { ReactComponent as Flag } from './flag.svg';
import * as firebase from 'firebase';

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
    let ref = firebase.database().ref('/');
    ref.on('value', snapshot => {
        const state = snapshot.val();
        this.setState({
          isLoaded: true,
          data: state,
        });
    });
  }

  render() {
    const { error, isLoaded, data } = this.state;
    var date = '';

    if ( data !== undefined ) {
        console.log(data.last_updated);
        var date = Moment(data.last_updated).format('D MMMM YYYY');
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
                                Last Updated: {date}
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