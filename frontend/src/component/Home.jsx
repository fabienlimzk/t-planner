import React, { Component } from "react";
import Axios from "axios";
import { Container, Button, Row, Card, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import SimpleMap from "./map/SimpleMap";
import SearchBox from "./map/SearchBox";

const URL = process.env.REACT_APP_URL;

export default class Home extends Component {
  state = {
    trips: [],
  };

  fetchTrips = () => {
    let token = localStorage.getItem("token");

    Axios.get(`${URL}/trips`, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        this.setState({ trips: res.data.trips });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteTrip = (e) => {
    const id = e.target.id;
    Axios.delete(`${URL}/trips/${e.target.id}`)
      .then(() => {
        let trips = this.state.trips.filter((trip) => trip._id !== id);
        this.setState({ trips });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.fetchTrips();
  }

  render() {
    return (
      <div>
        <h1>Trips</h1>
        <Container fluid>
          <Row>
            {this.state.trips.map((trip) =>
              trip.createdBy._id === this.props.currentUser._id ? (
                <Col key={trip._id} md="3">
                  <Card>
                    <Card.Body>
                      <div>
                        <h4>{trip.title}</h4>
                      </div>
                      <div>
                        <Badge variant="primary">{trip.country}</Badge>
                      </div>
                      <div>
                        <Badge variant="info">{trip.start_date}</Badge> to
                        <Badge variant="info">{trip.end_date}</Badge>
                      </div>
                      <div>{trip.description}</div>
                      <div>
                        <Link to={`/trip/${trip._id}`}>View</Link>
                        <Button
                          onClick={this.deleteTrip}
                          variant="danger"
                          size="sm"
                          id={trip._id}
                          style={{ float: "right" }}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ) : (
                ""
              )
            )}
          </Row>
          <SearchBox />
          <h4>Scroll around the world</h4>
          <SimpleMap />
        </Container>
      </div>
    );
  }
}
