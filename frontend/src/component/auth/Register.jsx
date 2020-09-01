import React, { Component } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";

export default class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  registerHandler = () => {
    //login here
    this.props.register(this.state);
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <div>
          <Container>
            <Row>
              First Name:
              <Form.Control
                name="firstname"
                type="text"
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              Last Name:
              <Form.Control
                name="lastname"
                type="text"
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              Username:
              <Form.Control
                name="username"
                type="text"
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              Email Address:
              <Form.Control
                name="email"
                type="email"
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              Password:
              <Form.Control
                name="password"
                type="password"
                onChange={this.changeHandler}
              />
            </Row>
            <Button variant="primary" block onClick={this.registerHandler}>
              Register
            </Button>
          </Container>
        </div>
      </div>
    );
  }
}
