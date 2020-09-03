import React, { Component } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import Axios from "axios";
import { Redirect } from "react-router-dom";

const URL = process.env.REACT_APP_URL;

class AddTrip extends Component {
  state = {
    title: "",
    description: "",
    country: "",
    start_date: "",
    end_date: "",
    status: false,
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = () => {
    // console.log(this.state);
    Axios.post(`${URL}/trips`, this.state, {
      headers: { "x-auth-token": localStorage.token },
    })
      .then((res) => {
        // console.log("done");
        this.setState({ status: true });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  render() {
    let { title, description, country, start_date, end_date } = this.state;

    if (this.state.status) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Container>
          <h1>Add Trip</h1>
          <div>
            <Row>
              Title of Trip:
              <Form.Control
                name="title"
                value={title}
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              Description:
              <Form.Control
                name="description"
                value={description}
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              Country:
              <Form.Control
                name="country"
                value={country}
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              Start date:
              <Form.Control
                name="start_date"
                value={start_date}
                type="date"
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              End date:
              <Form.Control
                name="end_date"
                value={end_date}
                type="date"
                onChange={this.changeHandler}
              />
            </Row>
            <Button onClick={this.submitHandler}>Submit</Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default AddTrip;
