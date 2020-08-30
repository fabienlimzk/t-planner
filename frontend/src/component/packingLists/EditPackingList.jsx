import React, { Component } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";

export default class EditPackingList extends Component {
  state = {
    title: this.props.packingList.title,
    item: this.props.packingList.item,
  };

  changeHandler = (e) => {
    //allow a re render in packingList.jsx
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = () => {
    this.props.editPackingList(this.state, this.props.packingList._id);
  };

  render() {
    let {
      title,
      item,
    } = this.state;
    return (
      <div>
        <Container>
          <h4>Edit Item</h4>
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
              Item
              <Form.Control
                name="item"
                value={item}
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
