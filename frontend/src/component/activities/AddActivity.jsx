import React, { Component } from "react";
import { Form, Button, Row } from "react-bootstrap";
import Axios from "axios";
const URL = process.env.REACT_APP_URL;

export default class AddActivity extends Component {
    state = {
        description: "",
    };

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitHandler = () => {
        console.log(this.state);
        Axios.post(`${URL}/activities`, this.state)
            .then((res) => {
                console.log("done");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        let { description } = this.state;
        return (
            <div>
                <h1>Add Activity</h1>
                <div>
                    <Row>
                        <Form.Control
                            name="description"
                            value={description}
                            onChange={this.changeHandler}
                        />
                    </Row>
                    <Button onClick={this.submitHandler}>Submit</Button>
                </div>
            </div>
        );
    }
}
