import React, { Component } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";

export default class EditPackingList extends Component {
  state = {
    items: [],
  };

  changeHandler = (e, index) => {
    //allow a re render in packingList.jsx
    this.state.items[index] = e.target.value;
    this.setState({ items: this.state.items });
  };

  removeHandler = (index) => {
    this.state.items.splice(index, 1);
    console.log(this.state.items, "----");
    this.setState({ items: this.state.items });
  };

  submitHandler = () => {
    this.props.editPackingList(this.state, this.props.packingList._id);
  };

  addItem = () => {
    this.setState({ items: [...this.state.items, ""] });
  };

  componentDidMount = () => {
    this.setState(this.props.packingList);
  };

  render() {
    let { items } = this.state;

    console.log(this.state);

    return (
      <div>
        <Container>
          <h1>Edit Item</h1>
          {items.map((item, index) => (
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
