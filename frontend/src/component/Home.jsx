import React, { Component } from "react";
import Axios from "axios";
import { Container, Button, Row, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const URL = process.env.REACT_APP_URL;
export default class Home extends Component {
  state = {
    trips: [],
  };
  fetchTrips = () => {
    //   // let token = localStorage.getTrip("token");
    Axios.get(
      `${URL}/trips`
      // , {
      //     headers: {
      //       "x-auth-token": token,
      //     },
      // }
    )
      .then((res) => {
        //       // console.log(res.data
        //       // if (this.mounted) {
        this.setState({ activities: res.data.activities });
        //       // }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  deleteTrip = (e) => {
    console.log(e.target.id);
    Axios.delete(`${URL}/trips/${e.target.id}`).then((res) => {
      this.fetchTrips();
    });
  };
  componentDidMount() {
    this.fetchTrips();
  }
  render() {
<<<<<<< HEAD
    console.log(this.props.activities);
=======
    // console.log(this.props.trips);
>>>>>>> 230be8fb23dd5ce077954a8408c74195937389ed
    return (
      <div>
        <h1>Home</h1>
        <Container fluid>
          <Row>
            {this.props.trips.map((trip) => (
              <Col key={trip._id} md="3">
                <Card>
                  <Card.Body>
                    {trip.title}
                    {trip.description}
                    <div>
                      <Link to={`/trip/${trip._id}`}>See trip</Link>
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