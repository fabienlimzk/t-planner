
//  AIzaSyBXtcOE6arcwH0cfCad4ae3wkRLGKW9nQs API KEY

import React, { Component } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Axios from "axios";
import Home from "./component/Home";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import Navigation from "./component/Navigation";
import { SimpleMap } from "./component/map/SimpleMap";

import AllActivities from "./component/AllActivities";
import Activity from "./component/activities/Activity";
import AddActivity from "./component/activities/AddActivity";

import Trip from "./component/trips/Trip";
import AddTrip from "./component/trips/AddTrip";
import AllPackingLists from "./component/AllPackingLists";
import PackingList from "./component/packingLists/PackingList";
import AddPackingList from "./component/packingLists/AddPackingList";
import { decode } from "jsonwebtoken";
import PrivateRoute from "./component/PrivateRoute";
import { Alert } from "react-bootstrap";

const URL = process.env.REACT_APP_URL;

export default class App extends Component {
  state = {
    // activities: [],
    // packingLists: [],
    trips: [],
    errorMessage: null,
    isAuth: false,
    user: null,
  };

  // fetchActivities = () => {
  //   Axios.get(`${URL}/activities`)
  //     .then((res) => {
  //       // console.log(res.data);
  //       this.setState({ activities: res.data.activities });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // fetchTrips = () => {
  //   Axios.get(`${URL}/trips`)
  //     .then((res) => {
  //       // console.log(res.data);
  //       this.setState({ trips: res.data.trips });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // fetchPackingLists = () => {
  //   Axios.get(`${URL}/packingLists`)
  //     .then((res) => {
  //       // console.log(res.data);
  //       this.setState({ packingLists: res.data.packingLists });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // auth
  getUserProfile = (token) => {
    Axios.get(`${URL}/auth/user`, {
      headers: { "x-auth-token": token },
    })
      .then((res) => {
        console.log(res.data);

        this.setState({
          isAuth: true,
          user: res.data.user,
        });
      })
      .catch((err) => {
        // console.log(err);
        // this.setState({
        //   isAuth: false
        // });
      });
  };

  loginHandler = (credentials) => {
    //login here
    Axios.post(`${URL}/auth/login`, credentials)
      .then((res) => {
        console.log(res.data);

        localStorage.setItem("token", res.data.token);
        this.getUserProfile(res.data.token); //get uptodate user information

        this.setState({
          isAuth: true,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isAuth: false,
          errorMessage: err.response.data.message,
        });
      });
  };

  registerHandler = (credentials) => {
    //login here
    Axios.post(`${URL}/auth/register`, credentials)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        this.setState({
          isAuth: true,
        });
      })
      .catch((err) => {
        // console.log(err);
        this.setState({
          isAuth: false,
        });
      });
  };

  logoutHandler = (e) => {
    e.preventDefault();
    console.log("User logged out");
    this.setState({
      items: [],
      errorMessage: null,
      isAuth: false,
      user: null,
    });

    localStorage.removeItem("token");
  };

  componentDidMount() {
    let token = localStorage.getItem("token");

    if (!(token == null)) {
      let decodedToken = decode(token);

      if (!decodedToken) {
        localStorage.removeItem("token");
      } else {
        this.getUserProfile(token);
        // this.setState({
        //   isAuth: true,
        // });
      }
    }
    // this.fetchActivities();
    // this.fetchTrips();
    // this.fetchPackingLists();
  }

  render() {
    let { isAuth, user, errorMessage } = this.state;

    return (
      <Router>
        <Navigation user={user} logout={this.logoutHandler} />
        {errorMessage && <Alert>{errorMessage}</Alert>}
        <Switch>
          <Route
            path="/register"
            exact
            render={() => <Register register={this.registerHandler} />}
          />
          <Route path="/activities" exact render={() => <AllActivities />} />
          <Route path="/activity/add" exact render={() => <AddActivity />} />
          <Route path="/activity/:id" component={Activity} />
          <MapContainer />
          <Route
            path="/login"
            exact
            render={() =>
              isAuth ? <Redirect to="/" /> : <Login login={this.loginHandler} />
            }
          />
          <PrivateRoute exact path="/" isAuth={isAuth} component={Home} />
          <PrivateRoute
            exact
            path="/trip/add"
            isAuth={isAuth}
            component={AddTrip}
          />
          <PrivateRoute
            exact
            path="/trip/:id"
            isAuth={isAuth}
            component={Trip}
          />
          <PrivateRoute
            exact
            path="/activities"
            isAuth={isAuth}
            component={AllActivities}
          />
          <PrivateRoute
            exact
            path="/activity/add"
            isAuth={isAuth}
            component={AddActivity}
          />
          <PrivateRoute
            exact
            path="/activity/:id"
            isAuth={isAuth}
            component={Activity}
          />
          <PrivateRoute
            exact
            path="/packingLists"
            isAuth={isAuth}
            component={AllPackingLists}
          />
          <PrivateRoute
            exact
            path="/packingList/add"
            isAuth={isAuth}
            component={AddPackingList}
          />
          <PrivateRoute
            exact
            path="/packingList/:id"
            isAuth={isAuth}
            component={PackingList}
          />
        </Switch>
      </Router>
    );
  }
}
