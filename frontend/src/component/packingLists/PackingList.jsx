import React, { Component } from "react";
import Axios from "axios";
import EditPackingList from "./EditPackingList";
import { Container, Button } from "react-bootstrap";

const URL = process.env.REACT_APP_URL;

export default class PackingList extends Component {
  state = {
    packingList: null,
  };

  EditPackingList = (obj, id) => {
    Axios.put(`${URL}/packingLists/${id}`, obj)
      .then((res) => {
        this.getPackingList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchPackingLists = () => {
    // let token = localStorage.getPackingList("token");
    Axios.get(
      `${URL}/packingLists`
      // , {
      // headers: {
      // "x-auth-token": token,
      // },
      // }
    )
      .then((res) => {
        // console.log(res.data);
        // if (this.mounted) {
        this.setState({ packingLists: res.data.packingLists });
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deletePackingList = (e) => {
    // this.props.deletePackingList(e.target.id);
    console.log(this.props);
  };
  // deletePackingList = (e) => {
  //   console.log("trying to delete");
  //   Axios.delete(`${URL}/packingLists/${e.target.id}`).then((res) => {
  //     console.log("deleted");
  //     this.fetchPackingLists();
  //   });
  // };

  getPackingList = () => {
    Axios.get(`${URL}/packingLists/${this.props.match.params.id}`)
      .then((res) => {
        console.log(res.data);
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
    let { packingList } = this.state;
    return (
      <div>
        <Container>
          {packingList ? (
            <div>
              <EditPackingList
                packingList={packingList}
                editPackingList={this.editPackingList}
              />
            </div>
          ) : (
            "testing testing"
          )}
          <Button
            variant="danger"
            onClick={this.deletePackingList}
          >
            Delete item
          </Button>
        </Container>
      </div>
    );
  }
}
