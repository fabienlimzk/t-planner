import React, { Component } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import Axios from "axios";
// import { Redirect } from "react-router-dom";
import Map from "../map/Map";

const URL = process.env.REACT_APP_URL;

export default class AddActivity extends Component {
  state = {
    title: "",
    start_date: "",
    end_date: "",
    duration: "",
    place: {
      city: "",
      area: "",
      state: "",
      address: "",
      mapPosition: {
        lat: 1.2832,
        lng: 103.8466,
      },
      description: "",
      image_url: "",
      trip_id: this.props.trip_id,
      // status: false,
    },
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updatePlace = (place) => {
    this.setState({ place, trip_id: this.props.trip_id });
  };

  submitHandler = () => {
    console.log(this.state);
    // console.log(this.state);
    Axios.post(`${URL}/activities`, this.state, {
      headers: { "x-auth-token": localStorage.token },
    })
      .then((res) => {
        console.log("done");
        // this.setState({ status: true });
        // for Trip.jsx
        console.log(JSON.stringify(res) + " saved");
        console.log(JSON.stringify(res.data.savedActivity) + " savedddddd");
        this.props.addActivity(res.data.savedActivity);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let {
      title,
      start_date,
      end_date,
      duration,
      // place,
      description,
      image_url,
    } = this.state;

    // if (this.state.status) {
    //   return <Redirect to="/" />;
    // }

    return (
      <div>
        <div>
          <Container>
            <h1>Add Activity</h1>
            <Row>
              Title
              <Form.Control
                name="title"
                value={title}
                placeholder="e.g. Visit local market"
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              Start date
              <Form.Control
                name="start_date"
                value={start_date}
                type="date"
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              End date
              <Form.Control
                name="end_date"
                value={end_date}
                type="date"
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              Duration
              <Form.Control
                name="duration"
                value={duration}
                placeholder="1hr"
                onChange={this.changeHandler}
              />
            </Row>
            {/* <Row>
              Address
              <Form.Control
                name="address"
                value={address}
                placeholder="Blk260 tampines st 21"
                onChange={this.changeHandler}
              />
            </Row> */}
            <Row>
              Description
              <Form.Control
                name="description"
                value={description}
                placeholder="Use the backdoor"
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              Image
              <Form.Control
                name="image_url"
                value={image_url}
                placeholder="url"
                onChange={this.changeHandler}
              />
            </Row>
            <Button onClick={this.submitHandler}>Submit</Button>

            <Map
              google={this.props.google}
              center={{ lat: 1.2832, lng: 103.8466 }}
              height="650px"
              zoom={15}
              // setPlace={this.}
              updatePlace={this.updatePlace}
            />
          </Container>
        </div>
      </div>
    );
  }
}
