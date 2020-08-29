import React, { Component } from "react";
import Axios from "axios";
import EditActivity from "./EditActivity";
import { Container, Button } from "react-bootstrap";

const URL = process.env.REACT_APP_URL;

export default class Activity extends Component {
  state = {
    activity: null,
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

  // fetchActivities = () => {
  //   // let token = localStorage.getItem("token");
  //   Axios.get(`${URL}/activities`, {
  //     // headers: {
  //       // "x-auth-token": token,
  //     // },
  //   })
  //     .then((res) => {
  //       // console.log(res.data);
  //       // if (this.mounted) {
  //       this.setState({ items: res.data.items });
  //       // }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  deleteActivity = (e) => {
    console.log("trying to delete"); 
    Axios.delete(`${URL}/activities/${e.target.id}`).then((res) => {
      console.log("deleted"); 
      // this.fetchActivities();
    });
  };

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
    let { activity } = this.state;
    return (
      <div>
        <Container>
          {activity ? (
            <div>
              {/* IF DONT NEED, CAN DELETE - THANKS BOSS */
              /* <div>Title: {activity.title} </div>
              <div>Start Date: {activity.start_date} </div>
              <div>End Date: {activity.end_date} </div>
              <div>Duration: {activity.duration} </div>
              <div>Address: {activity.address} </div>
              <div>Description: {activity.description} </div>
            <div>Image: <a href={activity.image_url}></a> </div> <br /> */}
              <EditActivity
                activity={activity}
                editActivity={this.editActivity}
              />
            </div>
          ) : (
            "testing testing"
          )}
          <Button
            variant="danger"
            // id={activity._id}
            onClick={this.deleteActivity}
          >
            Delete Activity
          </Button>
        </Container>
      </div>
    );
  }
}

const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  // borderRadius: "50%",
  cursor: "pointer",
  // float: "right",
};
