import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./component/Home";
import Navigation from "./component/Navigation";
import Axios from "axios";
import Activity from "./component/activities/Activity";
import AddActivity from "./component/activities/AddActivity";
import Trip from "./component/trips/Trip";
import AddTrip from "./component/trips/AddTrip";

const URL = process.env.REACT_APP_URL;
export default class App extends Component {
  state = {
    activities: [],
    trips: [],
  };

  fetchActivities = () => {
    Axios.get(`${URL}/activities`)
      .then((res) => {
        // console.log(res.data);
        this.setState({ activities: res.data.activities });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchTrips = () => {
    Axios.get(`${URL}/trips`)
      .then((res) => {
        // console.log(res.data);
        this.setState({ trips: res.data.trips });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.fetchActivities();
    this.fetchTrips();
  }

  render() {
    return (
      <Router>
        <Navigation />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Home
                activities={this.state.activities}
                trips={this.state.trips}
              />
            )}
          />
          <Route path="/activity/add" exact render={() => <AddActivity />} />
          <Route path="/activity/:id" component={Activity} />
          <Route path="/trip/add" exact render={() => <AddTrip />} />
          <Route path="/trip/:id" component={Trip} />
        </Switch>
      </Router>
    );
  }
}
