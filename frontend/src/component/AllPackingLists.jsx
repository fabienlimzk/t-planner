import React, { Component } from "react";
import Axios from "axios";
import { Container, Button, Row, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const URL = process.env.REACT_APP_URL;

export default class AllPackingLists extends Component {
  state = {
    packingLists: [],
  };

  fetchPackingLists = () => {
    let token = localStorage.getItem("token");

    Axios.get(`${URL}/packingLists`, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        // console.log(res.data.packingLists);
        this.setState({ packingLists: res.data.packingLists });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deletePackingList = (e) => {
    // console.log(e.target.id);
    Axios.delete(`${URL}/packingLists/${e.target.id}`).then((res) => {
      this.fetchPackingLists();
    });
  };

  componentDidMount() {
    this.fetchPackingLists();
  }

  render() {
    // console.log(this.props.packingLists);
    return (
      <div>
        <h1>Packing List</h1>
        <Container fluid>
          <Row>
            {this.state.packingLists.map((packingList, index) => (
              <Col key={packingList._id} md="3">
                <Card>
                  <Card.Body>
                    <div>
                      {packingList.title}
                      <br />
                    </div>
                    <div>
                      <Link to={`/packingList/${packingList._id}`}>View</Link>
                      <Button
                        onClick={this.deletePackingList}
                        variant="danger"
                        id={packingList._id}
                        size="sm"
                        style={{ float: "right" }}
                      >
                        Delete
                      </Button>
                      {/* {packingList.item} <br /> */}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}
