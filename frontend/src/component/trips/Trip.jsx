import React, { Component } from "react";
import Axios from "axios";
import EditTrip from "./EditTrip";
import AddActivity from "../activities/AddActivity";
import { Container, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import AllActivities from "../AllActivities";

const URL = process.env.REACT_APP_URL;

export default class Trip extends Component {
  state = {
    trip: null,
    trip_id: "",
    activity: {
      title: "",
      start_date: "",
      end_date: "",
      duration: "",
      address: "",
      description: "",
      image_url: "",
    },
    activities: [],
    edit: false,
    add: false,
  };

  showEdit = () => {
    this.setState((prevState) => ({ edit: !prevState.edit }));
  };

  showAdd = () => {
    this.setState((prevState) => ({ add: !prevState.add }));
  };

  editTrip = (obj, id) => {
    Axios.put(`${URL}/trips/${id}`, obj, {
      headers: { "x-auth-token": localStorage.token },
    })
      .then((res) => {
        // console.log("done");
        //call method to call a re-render
        this.getTrip();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchTrips = () => {
    let token = localStorage.getTrip("token");

    Axios.get(`${URL}/trips`, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        // console.log(res.data);
        // if (this.mounted) {
        this.setState({ trips: res.data.trips });
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTrip = () => {
    Axios.get(`${URL}/trips/${this.props.match.params.id}`, {
      headers: { "x-auth-token": localStorage.token },
    })
      .then((res) => {
        console.log(res.data);
        this.setState({
          trip: res.data.trip,
          activities: res.data.trip.activities,
          trip_id: res.data.trip._id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getTrip();
  }

  // activity
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = () => {
    console.log(this.state);
    Axios.post(`${URL}/activities`, this.state, {
      headers: { "x-auth-token": localStorage.token },
    })
      .then((res) => {
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addActivity = (activity) => {
    this.setState({ activities: [...this.state.activities, activity] });
    console.log(
      "activities added to trip.state.activities " + JSON.stringify(activity)
    );
  };

  render() {
    let { trip, edit, add, activities } = this.state;

    return (
      <div>
        <Container>
          {trip ? (
            <div>
              <div>
                <h1>Trip</h1>
                <div>
                  <h3>{trip.title}</h3>
                </div>
                <div>{trip.description}</div>
                <div>{trip.country}</div>
                <div>{trip.start_date}</div>
                <div>{trip.end_date}</div>
                <div>Created By: {trip.createdBy.username}</div>
              </div>
              <Button onClick={this.showEdit}>Edit Trip</Button>
              <br />
              {edit && <EditTrip trip={trip} editTrip={this.editTrip} />}
              <br />
              <AllActivities activities={activities} />
              <br />
              <Button onClick={this.showAdd}>Add More Activity</Button>
              <br />
              {add && (
                <AddActivity
                  addActivity={this.addActivity}
                  trip_id={this.state.trip_id}
                />
              )}
            </div>
          ) : (
            "Loading..."
          )}
        </Container>
      </div>
    );
  }
}
