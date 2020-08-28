import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./component/Home";
import Navigation from "./component/Navigation";
import Axios from "axios";
import Activity from "./component/activities/Activity";
import AddActivity from "./component/activities/AddActivity";

const URL = process.env.REACT_APP_URL;
export default class App extends Component {
    state = {
        activities: [],
    };

    fetchActivities = () => {
        Axios.get(`${URL}/activities`)
            .then((res) => {
                // console.log(res.data);
                this.setState({ activities: res.data.activities });
            })
            .catch((err) => {
                console.log(err);
            })
    };

    componentDidMount() {
        this.fetchActivities();
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
                            <Home activities={this.state.activities} />
                        )}
                    />
                    <Route
                        path="/activity/add"
                        exact
                        render={() => <AddActivity />}
                    />
                    <Route path="/activity/:id" component={Activity} />
                </Switch>
            </Router>
        );
    }
}
