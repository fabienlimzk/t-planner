import React, { Component } from "react";
import Axios from "axios";
import { Container, Button, Row, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const URL = process.env.REACT_APP_URL;

export default class AllActivities extends Component {
  state = {
    activities: [],
  };

  fetchActivities = () => {
    let token = localStorage.getItem("token");

    Axios.get(`${URL}/activities`, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        this.setState({ activities: res.data.activities });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteActivity = (e) => {
    const id = e.target.id;
    // console.log(e.target.id);
    Axios.delete(`${URL}/activities/${id}`)
      .then(() => {
        let activities = this.state.activities.filter(
          (activity) => activity._id !== id
        );
        // console.log(activities);
        this.setState({ activities });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    // this.fetchActivities();
    this.setState({ activities: this.props.activities });
  }

  render() {
    // console.log(this.props.activities);
    return (
      <div>
        <h1>Activities</h1>
        <Container fluid>
          <Row>
            {this.state.activities.map((activity) => (
              <Col key={activity._id} md="3">
                <Card>
                  <Card.Body>
                    <div>
                      <Card.Img variant="top" src={activity.image_url} />
                    </div>
                    <div>{activity.title}</div>
                    <div>{activity.description}</div>
                    <div>
                      <Link to={`/activity/${activity._id}`}>View</Link>

                      <Button
                        onClick={this.deleteActivity}
                        variant="danger"
                        id={activity._id}
                        size="sm"
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
