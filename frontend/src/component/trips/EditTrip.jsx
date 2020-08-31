import React, { Component } from "react";
import { Form, Button, Row } from "react-bootstrap";

class EditTrip extends Component {
  state = {
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    status: false,
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = () => {
    this.props.editTrip(this.state, this.props.trip._id);
  };

  componentDidMount = () => {
    this.setState(this.props.trip);
  };

  render() {
    let { title, description, start_date, end_date } = this.state;

    return (
      <div>
        <h1>Edit Trip</h1>
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
            Start date:
            <Form.Control
              name="start_date"
              value={start_date.split("T")[0]}
              type="date"
              onChange={this.changeHandler}
            />
          </Row>
          <Row>
            End date:
            <Form.Control
              name="end_date"
              value={end_date.split("T")[0]}
              type="date"
              onChange={this.changeHandler}
            />
          </Row>
          <Button onClick={this.submitHandler}>Submit</Button>
        </div>
      </div>
    );
  }
}

export default EditTrip;
