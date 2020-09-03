import React, { Component } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import Axios from "axios";
import { Redirect } from "react-router-dom";

const URL = process.env.REACT_APP_URL;

export default class AddPackingList extends Component {
  state = {
    title: "",
    items: [],
    status: false,
  };

  titleChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  itemChangeHandler = (e, index) => {
    this.state.items[index] = e.target.value;
    this.setState({ items: this.state.items });
  };

  removeHandler = (index) => {
    this.state.items.splice(index, 1);
    // console.log(this.state.items, "----");
    this.setState({ items: this.state.items });
  };

  submitHandler = (e) => {
    // console.log(this.state);
    Axios.post(`${URL}/packingLists`, this.state, {
      headers: { "x-auth-token": localStorage.token },
    })
      .then((res) => {
        // console.log("done");
        this.setState({ status: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addItem = () => {
    this.setState({ items: [...this.state.items, ""] });
  };

  render() {
    let { title, items } = this.state;

    if (this.state.status) {
      return <Redirect to="/packingLists" />;
    }

    return (
      <div>
        <Container>
          <h1>Add Item</h1>
          <Row>
            Title:
            <Form.Control
              name="title"
              value={title}
              placeholder="Summer"
              onChange={this.titleChangeHandler}
            />
          </Row>
          <div>
            Items:
            {items.map((item, index) => (
              <Row key={index}>
                <Form.Control
                  name="items"
                  value={item}
                  placeholder="FlipFlops"
                  onChange={(e) => this.itemChangeHandler(e, index)}
                />
                <Button
                  variant="danger"
                  onClick={() => this.removeHandler(index)}
                >
                  Remove
                </Button>
              </Row>
            ))}
          </div>

          <Button onClick={(e) => this.addItem(e)}>Add more item</Button>
          <Button onClick={this.submitHandler}>Submit</Button>
        </Container>
      </div>
    );
  }
}
