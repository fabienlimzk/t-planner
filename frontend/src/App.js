import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./component/Home";
import Navigation from "./component/Navigation";
import Axios from "axios";
import AllActivities from "./component/AllActivities";
import Activity from "./component/activities/Activity";
import AddActivity from "./component/activities/AddActivity";
import Trip from "./component/trips/Trip";
import AddTrip from "./component/trips/AddTrip";
import AllPackingLists from "./component/AllPackingLists";
import PackingList from "./component/packingLists/PackingList";
import AddPackingList from "./component/packingLists/AddPackingList";

const URL = process.env.REACT_APP_URL;
export default class App extends Component {
  state = {
    activities: [],
    packingLists: [],
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

  fetchPackingLists = () => {
    Axios.get(`${URL}/packingLists`)
      .then((res) => {
        // console.log(res.data);
        this.setState({ packingLists: res.data.packingLists });
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
    this.fetchPackingLists();
  }

  render() {
    return (
      <Router>
        <Navigation />
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Home trips={this.state.trips} />}
          />
          <Route path="/activities" exact render={() => <AllActivities />} />
          <Route path="/activity/add" exact render={() => <AddActivity />} />
          <Route path="/activity/:id" component={Activity} />

          <Route
            path="/packingLists"
            exact
            render={() => (
              <AllPackingLists packingLists={this.state.packingLists} />
            )}
          />
          <Route
            path="/packingList/add"
            exact
            render={() => <AddPackingList />}
          />
          <Route path="/packingList/:id" component={PackingList} />
          <Route path="/trip/add" exact render={() => <AddTrip />} />
          <Route path="/trip/:id" component={Trip} />
        </Switch>
      </Router>
    );
  }
}

// activities={this.state.activities}
