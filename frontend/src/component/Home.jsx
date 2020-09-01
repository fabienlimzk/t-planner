import React, { Component } from "react";
import Axios from "axios";
import { Container, Button, Row, Card, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import SimpleMap from "./map/SimpleMap";
import SearchBox from "./map/SearchBox";
import { Marker } from "react-google-maps";
import { InfoWindow } from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import Map from "./map/Map";

const URL = process.env.REACT_APP_URL;

export default class Home extends Component {
  state = {
    trips: [],

    // address: address ? address : "",
    // area: area ? area : "",
    // city: city ? city : "",
    // state: state ? state : "",
    // markerPosition: {
    //   lat: latValue,
    //   lng: lngValue,
    // },
    // mapPosition: {
    //   lat: latValue,
    //   lng: lngValue,
    // },
  };

  fetchTrips = () => {
    let token = localStorage.getItem("token");

    Axios.get(`${URL}/trips`, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        this.setState({ trips: res.data.trips });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteTrip = (e) => {
    const id = e.target.id;
    Axios.delete(`${URL}/trips/${e.target.id}`)
      .then(() => {
        let trips = this.state.trips.filter((trip) => trip._id !== id);
        this.setState({ trips });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.fetchTrips();
  }

  render() {
    // const address = place.formatted_address,
    //   addressArray = place.address_components,
    //   city = this.getCity(addressArray),
    //   area = this.getArea(addressArray),
    //   state = this.getState(addressArray),
    //   latValue = place.geometry.location.lat(),
    //   lngValue = place.geometry.location.lng();
    // Set these values in the state.
    // console.log(this.props.trips);
    return (
      <div>
        <h1>Trips</h1>
        {/* {currentUser == user.id ? ( */}
        <Container fluid>
          <Row>
            {this.state.trips.map((trip) => (
              <Col key={trip._id} md="3">
                <Card>
                  <Card.Body>
                    <div>
                      <h4>{trip.title}</h4>
                    </div>
                    <div>
                      <Badge variant="primary">{trip.country}</Badge>
                    </div>
                    <div>
                      <Badge variant="info">{trip.start_date}</Badge> to
                      <Badge variant="info">{trip.end_date}</Badge>
                    </div>
                    <div>{trip.description}</div>
                    <div>
                      <Link to={`/trip/${trip._id}`}>View</Link>
                      <Button
                        onClick={this.deleteTrip}
                        variant="danger"
                        size="sm"
                        id={trip._id}
                        style={{ float: "right" }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <SearchBox />

          <SimpleMap />

          <Marker
            google={this.props.google}
            name={"Dolores park"}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          />

          <InfoWindow
            onClose={this.onInfoWindowClose}
            position={{
              lat: this.state.markerPosition.lat + 0.0018,
              lng: this.state.markerPosition.lng,
            }}
          >
            <div>
              <span style={{ padding: 0, margin: 0 }}>
                {this.state.address}
              </span>
            </div>
          </InfoWindow>

          <Autocomplete
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "16px",
              marginTop: "2px",
              marginBottom: "100px",
            }}
            onPlaceSelected={this.onPlaceSelected}
            types={["(regions)"]}
          />

          <Map
            google={this.props.google}
            center={{ lat: 18.5204, lng: 73.8567 }}
            height="300px"
            zoom={15}
          />
        </Container>
        {/* ) : (
          "You cannot see this"
        )} */}
      </div>
    );
  }
}
