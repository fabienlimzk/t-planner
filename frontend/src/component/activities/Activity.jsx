import React, { Component } from "react";
import Axios from "axios";
import EditActivity from "./EditActivity";
import { Container, Button } from "react-bootstrap";

const URL = process.env.REACT_APP_URL;

export default class Activity extends Component {
  state = {
    activity: null,
    edit: false,
  };

  showEdit = () => {
    this.setState((prevState) => ({ edit: !prevState.edit }));
  };

  editActivity = (obj, id) => {
    Axios.put(`${URL}/activities/${id}`, obj)
      .then((res) => {
        this.getActivity();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchActivities = () => {
    // let token = localStorage.getActivity("token");
    Axios.get(
      `${URL}/activities`
      // , {
      // headers: {
      // "x-auth-token": token,
      // },
      // }
    )
      .then((res) => {
        // console.log(res.data);
        // if (this.mounted) {
        this.setState({ activities: res.data.activities });
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteActivity = (e) => {
    // this.props.deleteActivity(e.target.id);
    console.log(this.props);
  };

  // deleteActivity = (e) => {
  //   console.log("trying to delete");
  //   Axios.delete(`${URL}/activities/${e.target.id}`).then((res) => {
  //     console.log("deleted");
  //     this.fetchActivities();
  //   });
  // };

  getActivity = () => {
    Axios.get(`${URL}/activities/${this.props.match.params.id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({ activity: res.data.activity });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getActivity();
  }

  render() {
    let { activity, edit } = this.state;
    return (
      <div>
        <Container>
{/* 
          {activity ? (
            <div>
              <EditActivity
                activity={activity}
                editActivity={this.editActivity}
              />
            </div>
          ) : (
            "testing testing"
          )}
          <Button variant="danger" onClick={this.deleteActivity}>
            Delete Activity
          </Button> */}
        
          {activity ? (
            <div>
              <div>
                <h3>{activity.title}</h3>
              </div>
              <div>Start: {activity.start_date.split("T")[0]}</div>
              <div>End: {activity.end_date.split("T")[0]}</div>
              <div>Duration: {activity.duration}</div>
              <div>Address: {activity.address}</div>
              <div>Description: {activity.description}</div>
              <div>{activity.image_url}</div>
              <Button onClick={this.showEdit}>Edit Trip</Button>
              {edit && <EditActivity activity={activity} editActivity={this.editActivity} />}
            </div>
          ) : (
            "Loading..."
          )}

        </Container>
      </div>
    );
  }
}
