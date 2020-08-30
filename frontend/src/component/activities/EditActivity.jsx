import React, { Component } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";

export default class EditActivity extends Component {
  state = {
    title: this.props.activity.title,
    duration: this.props.activity.duration,
    address: this.props.activity.address,
    description: this.props.activity.description,
  };

  changeHandler = (e) => {
    //allow a re render in activity.jsx
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = () => {
    this.props.editActivity(this.state, this.props.activity._id);
  };

  render() {
    let {
      title,
      start_date,
      end_date,
      duration,
      address,
      description,
      image_url,
    } = this.state;
    return (
      <div>
        <Container>
          <h4>Edit Activity</h4>
          <div>
            <Row>
              Title
              <Form.Control
                name="title"
                value={title}
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
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              Address
              <Form.Control
                name="address"
                value={address}
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              Description
              <Form.Control
                name="description"
                value={description}
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              Image
              <Form.Control
                name="image_url"
                value={image_url}
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
