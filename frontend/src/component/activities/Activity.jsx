import React, { Component } from "react";
import Axios from "axios";
import EditActivity from "./EditActivity";
import { Container, Button } from "react-bootstrap";
import SingleMap from "../map/SingleMap";

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
    Axios.put(`${URL}/activities/${id}`, obj, {
      headers: { "x-auth-token": localStorage.token },
    })
      .then((res) => {
        this.getActivity();
      })
      .catch((err) => {
        console.log(err);
      });
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
    // this.props.deleteActivity(e.target.id);
    // console.log(this.props);
  };

  getActivity = () => {
    Axios.get(`${URL}/activities/${this.props.match.params.id}`, {
      headers: { "x-auth-token": localStorage.token },
    })
      .then((res) => {
        // console.log(res.data);
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
          {activity ? (
            <div>
              <div>
                <h3>{activity.title}</h3>
              </div>
              <div>Start: {activity.start_date ? activity.start_date.split("T")[0] : "" }</div>
              <div>End: {activity.end_date ? activity.end_date.split("T")[0] : "" }</div>
              <div>Duration: {activity.duration}</div>
              <div>Address: {activity.address}</div>
              <div>Description: {activity.description}</div>
              <div>

              <img src={activity.image_url} alt=""/>
              </div>
              <Button onClick={this.showEdit}>Edit Activity</Button>
              {edit && (
                <EditActivity
                  activity={activity}
                  editActivity={this.editActivity}
                  />
                  )}
                <SingleMap
                google={this.props.google}
                height="650px"
                zoom={2}
                // updatePlace={this.updatePlace}
                activity={activity}
                />
  
                
            </div>
          ) : (
            "Loading..."
          )}
        </Container>
      </div>
    );
  }
}
