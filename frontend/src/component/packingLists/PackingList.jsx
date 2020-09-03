import React, { Component } from "react";
import Axios from "axios";
import EditPackingList from "./EditPackingList";
import { Container, Button, ListGroup } from "react-bootstrap";

const URL = process.env.REACT_APP_URL;

export default class PackingList extends Component {
  state = {
    packingList: null,
    edit: false,
  };

  showEdit = () => {
    this.setState((prevState) => ({ edit: !prevState.edit }));
  };

  editPackingList = (obj, id) => {
    Axios.put(`${URL}/packingLists/${id}`, obj, {
      headers: { "x-auth-token": localStorage.token },
    })
      .then((res) => {
        this.getPackingList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchPackingLists = () => {
    let token = localStorage.getItem("token");

    Axios.get(`${URL}/packingLists`, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        this.setState({ packingLists: res.data.packingLists });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deletePackingList = (e) => {
    // this.props.deletePackingList(e.target.id);
    // console.log(this.props);
  };

  getPackingList = () => {
    Axios.get(`${URL}/packingLists/${this.props.match.params.id}`, {
      headers: { "x-auth-token": localStorage.token },
    })
      .then((res) => {
        // console.log(res.data);
        this.setState({ packingList: res.data.packingList });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getPackingList();
  }

  render() {
    let { packingList, edit } = this.state;
    return (
      <div>
        <Container>
          <h1>Packing List</h1>
          {packingList ? (
            <div>
              <h3>{packingList.title}</h3>
              {packingList.items.map((item, index) => (
                <div>
                  <ListGroup>
                    <ListGroup.Item as="li" key={index}>
                      {item}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              ))}
              <Button onClick={this.showEdit}>Edit Packing List</Button>
              {edit && (
                <EditPackingList
                  packingList={packingList}
                  editPackingList={this.editPackingList}
                />
              )}
            </div>
          ) : (
            "Loading..."
          )}
        </Container>
      </div>
    );
  }
}


