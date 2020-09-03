import React, { Component } from "react";
import Axios from "axios";
import { Container, Button, Row, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const URL = process.env.REACT_APP_URL;

export default class AllPackingLists extends Component {
  state = {
    packingLists: [],
  };

  fetchPackingLists = () => {
    let token = localStorage.getItem("token");

    Axios.get(`${URL}/packingLists`, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        // console.log(res.data.packingLists);
        this.setState({ packingLists: res.data.packingLists });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deletePackingList = (e) => {
    // console.log(e.target.id);
    Axios.delete(`${URL}/packingLists/${e.target.id}`).then((res) => {
      this.fetchPackingLists();
    });
  };

  componentDidMount() {
    this.fetchPackingLists();
  }

  render() {
    // console.log(this.props.packingLists);
    return (
      <div>
        <h1>Packing List</h1>
        <Container fluid>
          <Row>
            {this.state.packingLists.map((packingList, index) => (
              <Col key={packingList._id} md="3">
                <Card>
                  <Card.Body>
                    <div>
                      {packingList.title}
                      <br />
                    </div>
                    <div>
                      <Link to={`/packingList/${packingList._id}`}>View</Link>
                      <Button
                        onClick={this.deletePackingList}
                        variant="danger"
                        id={packingList._id}
                        size="sm"
                        style={{ float: "right" }}
                      >
                        Delete
                      </Button>
                      {/* {packingList.item} <br /> */}
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

//45.44
// markComplete={this.markComplete}

// markComplete=(id)=>{
// this.setState({packingList: this.state.todos.map(packingList)=>{
//   if(packingList.id === id){
//     packingList.completed = !packingList.conpleted
//   }
//   return packingList
// }})
// }

// const {id, title} = this.props.packingList

// <input type="checkbox" onChange={this.props.markComplete.bind(this.props.items/desctipion)}/> {' '}
// // props packign items

// const btnStyle = {
//   background: "ff0000",
//   color: "#fff",
//   border: "none",
//   padding: "5px 10px",
//   borderRadius: "50%",
//   cursor: "pointer",
//   float: "right",
// };

// style={btnStyle}

// getStyle = () =>{
//   return {
//     textDecoration : this.PaymentResponse.packingList.completed ? 
//     "line-through" :"none"
//   }
// }

// <div style={this.getStyle()}>

// </div>