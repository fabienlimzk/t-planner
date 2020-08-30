import React, { Component } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import Axios from "axios";
const URL = process.env.REACT_APP_URL;

export default class AddPackingList extends Component {
  state = {
    title: "",
    item: "",
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = () => {
    console.log(this.state);
    Axios.post(`${URL}/packingLists`, this.state)
      .then((res) => {
        // console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let {
      title,
      item,
    } = this.state;

    return (
      <div>
        <div>
          <Container>
            <h1>Add Item</h1>
            <Row>
              Title
              <Form.Control
                name="title"
                value={title}
                placeholder="Summer"
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              Item
              <Form.Control
                name="item"
                value={item}
                placeholder="FlipFlops"
                onChange={this.changeHandler}
              />
            </Row>
            <Button onClick={this.submitHandler}>Submit</Button>
          </Container>
        </div>
      </div>
    );
  }
}
