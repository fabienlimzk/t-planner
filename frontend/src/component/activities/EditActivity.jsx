import React, { Component } from "react";
import { Form, Button, Row } from "react-bootstrap";

export default class EditActivity extends Component {
    state = {
        description: this.props.activity.description,
    };

    changeHandler = (e) => {
        //allow a re render in activity.jsx
        this.setState({ [e.target.name]: e.target.value });
    };

    submitHandler = () => {
        this.props.editActivity(this.state, this.props.activity._id);
    };

    render() {
        let { description } = this.state;
        return (
            <div>
                <h1>Edit Activity</h1>
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
