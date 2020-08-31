import React, { Component } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import Axios from "axios";
const URL = process.env.REACT_APP_URL;

export default class AddPackingList extends Component {
  state = {
    items: [],
  };

  changeHandler = (e, index) => {
    // this.setState({ [e.target.name]: e.target.value });
    this.state.items[index] = e.target.value;
    this.setState({ items: this.state.items });
  };

  removeHandler = (index) => {
    this.state.items.splice(index, 1);
    console.log(this.state.items, "----");
    this.setState({ items: this.state.items });
  };

  submitHandler = (e) => {
    console.log(this.state);
    Axios.post(`${URL}/packingLists`, this.state)
      .then((res) => {
        // console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addItem = () => {
    this.setState({ items: [...this.state.items, ""] });
  };

  render() {
    return (
      <div>
        <Container>
          <h1>Add Item</h1>
          {this.state.items.map((item, index) => (
            <Row key={index}>
              <Form.Control
                name="items"
                value={item}
                placeholder="FlipFlops"
                onChange={(e) => this.changeHandler(e, index)}
              />
              <Button
                variant="danger"
                onClick={() => this.removeHandler(index)}
              >
                Remove
              </Button>
            </Row>
          ))}

          <Button onClick={(e) => this.addItem(e)}>Add more item</Button>
          <Button onClick={this.submitHandler}>Submit</Button>
        </Container>
      </div>
    );
  }
}
