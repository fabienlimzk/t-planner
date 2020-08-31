import React, { Component } from "react";
import Axios from "axios";
import EditPackingList from "./EditPackingList";
import { Container, Button } from "react-bootstrap";

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
    Axios.put(`${URL}/packingLists/${id}`, obj)
      .then((res) => {
        this.getPackingList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // fetchPackingLists = () => {
  //   // let token = localStorage.getPackingList("token");
  //   Axios.get(
  //     `${URL}/packingLists`
  //     // , {
  //     // headers: {
  //     // "x-auth-token": token,
  //     // },
  //     // }
  //   )
  //     .then((res) => {
  //       // console.log(res.data);
  //       // if (this.mounted) {
  //       this.setState({ packingLists: res.data.packingLists });
  //       // }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
    let { packingList, edit } = this.state;
    return (
      <div>
        <Container>
          <h1>Packing List</h1>
          {packingList ? (
            <div>
              {packingList.items.map((item, index) => (
                <li key={index}>{item}</li>
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
