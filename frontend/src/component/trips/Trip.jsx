import React, { Component } from "react";
import Axios from "axios";
import EditTrip from "./EditTrip";
import { Container, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const URL = process.env.REACT_APP_URL;

export default class Trip extends Component {
  state = {
    trip: null,
    edit: false,
  };

  showEdit = () => {
    this.setState((prevState) => ({ edit: !prevState.edit }));
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

  render() {
    let { trip, edit } = this.state;

    if (this.state.status) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Container>
          <h1>Trip</h1>
          {trip ? (
            <div>
              <div>
                <h3>{trip.title}</h3>
              </div>
              <div>{trip.description}</div>
              <div>{trip.country}</div>
              <div>{trip.start_date}</div>
              <div>{trip.end_date}</div>
              <div>Created By: {trip.createdBy.username}</div>
              <Button onClick={this.showEdit}>Edit Trip</Button>
              {edit && <EditTrip trip={trip} editTrip={this.editTrip} />}
            </div>
          ) : (
            "Loading..."
          )}
        </Container>
      </div>
    );
  }
}
