import React, { Component } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import { decode } from "jsonwebtoken";
import Axios from "axios";
import { Redirect } from "react-router-dom";

const URL = process.env.REACT_APP_URL;

export default class Profile extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    status: false,
  };

  getUserProfile = (token) => {
    Axios.get(`${URL}/auth/user`, {
      headers: { "x-auth-token": token },
    })
      .then((res) =>
        this.setState({
          firstname: res.data.user.firstname,
          lastname: res.data.user.lastname,
          username: res.data.user.username,
          email: res.data.user.email,
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = () => {
    //login here
    // this.props.edit(this.state, this.props.user.id);
    let token = localStorage.getItem("token");

    Axios.put(
      `${URL}/auth/user`,
      {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        username: this.state.username,
        email: this.state.email,
      },
      {
        headers: { "x-auth-token": token },
      }
    )
      .then((res) => {
        // console.log("done");
        this.getUserProfile(token);
        this.setState({ status: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    let token = localStorage.getItem("token");

    if (!(token == null)) {
      let decodedToken = decode(token);

      if (!decodedToken) {
        localStorage.removeItem("token");
      } else {
        this.getUserProfile(token);
      }
    }
  };

  render() {
    let { firstname, lastname, username, email } = this.state;
    // console.log(this.state);

    if (this.state.status) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1>Profile</h1>
        <div>
          <Container>
            <Row>
              First Name:
              <Form.Control
                name="firstname"
                type="text"
                value={firstname}
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              Last Name:
              <Form.Control
                name="lastname"
                type="text"
                value={lastname}
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              Username:
              <Form.Control
                name="username"
                type="text"
                value={username}
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              Email Address:
              <Form.Control
                name="email"
                type="email"
                value={email}
                onChange={this.changeHandler}
              />
            </Row>
            {/* <Row>
              Password:
              <Form.Control
                name="password"
                type="password"
                onChange={this.changeHandler}
              />
            </Row> */}
            <Button variant="primary" block onClick={this.submitHandler}>
              Update
            </Button>
          </Container>
        </div>
      </div>
    );
  }
}
