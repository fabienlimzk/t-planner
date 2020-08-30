import React, { Component } from "react";
import Axios from "axios";
import EditTrip from "./EditTrip";
import { Container, Button } from "react-bootstrap";

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
    Axios.put(`${URL}/trips/${id}`, obj)
      .then((res) => {
        // console.log("done");
        //call method to call a re-render
        this.getTrip();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTrip = () => {
    Axios.get(`${URL}/trips/${this.props.match.params.id}`)
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
    return (
      <div>
        <h1>Trip</h1>
        {trip ? (
          <div>
            <div>
              <h3>{trip.title}</h3>
            </div>
            <div>{trip.description}</div>
            <div>{trip.start_date}</div>
            <div>{trip.end_date}</div>
            <Button onClick={this.showEdit}>Edit Trip</Button>
            {edit && <EditTrip trip={trip} editTrip={this.editTrip} />}
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}
