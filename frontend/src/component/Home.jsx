import React, { Component } from "react";
import { Container, Button, Row, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";

export default class Home extends Component {
  // fetchActivities = () => {
  //   // let token = localStorage.getActivity("token");

  //   Axios.get(`${URL}/activities`, {
  //     headers: {
  //       "x-auth-token": token,
  //     },
  //   })
  //     .then((res) => {
  //       // console.log(res.data
  //       // if (this.mounted) {
  //       this.setState({ activities: res.data.activities });
  //       // }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  deleteActivity = (e) => {
    console.log(e.target.id);
    Axios.delete(`${URL}/activities/${e.target.id}`).then((res) => {
      // this.fetchActivities();
    });
  };

  // componentDidMount() {
  //   this.fetchActivities();
  // }

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
                    <div>
                      <Link to={`/activity/${activity._id}`}>
                        {activity.title}
                        <br />
                      </Link>
                      {activity.description} <br />
                      <Button
                        onClick={this.deleteActivity}
                        variant="danger"
                        id={activity._id}
                        style={{ float: "right" }}
                      >
                        Delete
                      </Button>
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
