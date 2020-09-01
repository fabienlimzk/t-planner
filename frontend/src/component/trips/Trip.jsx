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
        this.setState({ trip: res.data.trip });
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

  // update = (newActivity) => {
  //   this.setState({ activity });
  // };

  render() {
    let { trip, edit, add } = this.state;

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
              <AllActivities />
              <br />
              <Button onClick={this.showAdd}>Add Activity</Button>
              {edit && <EditTrip trip={trip} editTrip={this.editTrip} />}
              {add && <AddActivity addActivity={this.AddActivity} />}
            </div>
          ) : (
            "Loading..."
          )}
        </Container>
      </div>
    );
  }
}
