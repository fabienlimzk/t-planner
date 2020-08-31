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
    //   // let token = localStorage.getActivity("token");
    Axios.get(
      `${URL}/activities`
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

  deleteActivity = (e) => {
    const id = e.target.id 
    // console.log(e.target.id);
    Axios.delete(`${URL}/activities/${id}`).then(() => {
      let activities = this.state.activities.filter(activity => activity._id !== id)
      // console.log(activities);
      this.setState({activities});
    })
    .catch((err)=>{
      console.log(err);
    })
    ;
  };

  componentDidMount() {
    this.fetchActivities();
  }

  render() {
    // console.log(this.props.activities);
    return (
      <div>
        <h1>Activity</h1>
        <Container fluid>
          <Row>
            {this.state.activities.map((activity) => (
              <Col key={activity._id} md="3">
                <Card>
                  <Card.Body>
                    <Card.Img variant="top" src={activity.image_url} />
                    <div>
                      <Link to={`/activity/${activity._id}`}>
                        {activity.title}
                        <br />
                      </Link>
                        <Button
                          onClick={this.deleteActivity}
                          variant="danger"
                          id={activity._id}
                          style={{ float: "right" }}
                        >
                          Delete
                        </Button>
                      {activity.description} <br />
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
