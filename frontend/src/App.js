import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./component/Home";

import Navigation from "./component/Navigation";
import Axios from "axios";

import AllActivities from "./component/AllActivities";
import Activity from "./component/activities/Activity";
import AddActivity from "./component/activities/AddActivity";

import AllPackingLists from "./component/AllPackingLists";
import PackingList from "./component/packingLists/PackingList";
import AddPackingList from "./component/packingLists/AddPackingList";

const URL = process.env.REACT_APP_URL;
export default class App extends Component {
  state = {
    activities: [],
    packingLists: [],
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

  componentDidMount() {
    this.fetchActivities();
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
            render={() => <Home activities={this.state.activities} />}
          />
          <Route
            path="/activities"
            exact
            render={() => <AllActivities activities={this.state.activities} />}
          />
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
        </Switch>
      </Router>
    );
  }
}
