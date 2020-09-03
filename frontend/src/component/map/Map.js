
import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";

Geocode.enableDebug();
Geocode.setApiKey(process.env.REACT_APP_API_KEY);

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place: {
        city: "",
        area: "",
        state: "",
        address: "",
        mapPosition: {
          lat: 1.2832,
          lng: 103.8466,
        },
        markerPosition: {
          lat: this.props.center.lat,
          lng: this.props.center.lng,
        },
      },
    };
  }
  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {
    Geocode.fromLatLng(
      this.state.place.markerPosition.lat,
      this.state.place.markerPosition.lng
      // this.state.place.mapPosition.lat,
      // this.state.place.mapPosition.lng
    ).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        // console.log("city", city, area, state);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state != nextState) {
      return true;
    } else if (this.props.center.lat === nextProps.center.lat) {
      return false;
    }
  }
  /**
   * Get the city and set the city input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getCity = (addressArray) => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };
  /**
   * Get the area and set the area input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };
  /**
   * Get the address and set the address input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };
  /**
   * And function for city,state and address input
   @param event
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  /**
   * This Event triggers when the marker window is closed
   *
   @param event
   */
  onInfoWindowClose = (event) => {};
  /**
   * When the user types an address in the search box
   * @param place
   */
  onPlaceSelected = (place) => {
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();

    const newplace = {
      address,
      city,
      area,
      state,
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
    };
    // Set these values in the state.
    this.setState({ place: newplace });
    this.props.updatePlace(newplace);
  };
  /**
   *
   * @param event
   */

  render() {
    console.log("lat", this.state.place.mapPosition.lat);
    console.log("lng", this.state.place.mapPosition.lng);
    // console.log("place", this.state.place.mapPosition);

    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={this.props.zoom}
          defaultCenter={{
            lat: this.state.place.mapPosition.lat,
            lng: this.state.place.mapPosition.lng,
          }}
        >
          {/* For Auto complete Search Box */}
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
          {/*Marker*/}
          <Marker
            google={this.props.google}
            name={"Dolores park"}
            draggable={false}
            // onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.place.markerPosition.lat,
              lng: this.state.place.markerPosition.lng,
            }}
          />
          <Marker />
          {/* InfoWindow on top of marker */}
          {/* <InfoWindow
            onClose={this.onInfoWindowClose}
            position={{
              lat: this.state.place.markerPosition.lat + 0.0018,
              lng: this.state.place.markerPosition.lng,
            }}
          > */}
            {/* <div>
              <span style={{ padding: 0, margin: 0 }}>
                {this.state.address}
              </span>
            </div>
          </InfoWindow> */}
          {this.props.activities.map((point) => (
            <Marker
              key={point._id}
              position={{
                lat: point.place.mapPosition.lat,
                lng: point.place.mapPosition.lng,
              }}
            />
          ))}
          
        </GoogleMap>
      ))
    );

    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <div>
          <div>
            <div className="form-group">
              <AsyncMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: this.props.height }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </div>
            <br />
            <label htmlFor="">City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              onChange={this.onChange}
              readOnly="readOnly"
              value={this.state.place.city}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Area</label>
            <input
              type="text"
              name="area"
              className="form-control"
              onChange={this.onChange}
              readOnly="readOnly"
              value={this.state.place.area}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">State</label>
            <input
              type="text"
              name="state"
              className="form-control"
              onChange={this.onChange}
              readOnly="readOnly"
              value={this.state.place.state}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              onChange={this.onChange}
              readOnly="readOnly"
              value={this.state.place.address}
            />
          </div>
        </div>
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }
    return map;
  }
}
export default Map;

