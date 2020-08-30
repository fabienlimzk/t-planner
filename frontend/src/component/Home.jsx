import React, { Component } from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    console.log(this.props.activities);
    return (
      <div>
        <h1>Home</h1>
        <Container fluid>
          <Row>
            {this.props.activities.map((activity) => (
              <Col key={activity._id} md="3">
                <Card>
                  <Card.Body>
                    {activity.description}
                    <div>
                      <Link to={`/activity/${activity._id}`}>See activity</Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
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
