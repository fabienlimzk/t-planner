import React, { Component } from "react";
import Axios from "axios";
import EditActivity from "./EditActivity";

const URL = process.env.REACT_APP_URL;

export default class Activity extends Component {
    state = {
        activity: null,
    };

    editActivities = (obj, id) => {
        Axios.put(`${URL}/activities/${id}`, obj)
            .then((res) => {
                this.getActivity();
            })
            .catch((err) => {
                console.log(err);
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
                <h1>Activity</h1>
                {activity ? (
                    <div>
                        <div>{activity.description} </div>
                        <EditActivity
                            activity={activity}
                            editActivity={this.editActivities}
                        />
                    </div>
                ) : (
                    "testing testing"
                )}
            </div>
        );
    }
}
