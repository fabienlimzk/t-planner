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
  }
  componentDidMount() {
    // console.log(this.props);
    Geocode.fromLatLng(
      this.props.activity.place.mapPosition.lat,
      this.props.activity.place.mapPosition.lng
      // this.state.place.mapPosition.lat,
      // this.state.place.mapPosition.lng
    ).then(
      (error) => {
        console.error(error);
      }
    );
  }

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={this.props.zoom}
          defaultCenter={{
            lat: this.props.activity.place.mapPosition.lat,
            lng: this.props.activity.place.mapPosition.lng,
          }}
          >
          {/*Marker*/}
          <Marker
            google={this.props.google}
            name={"Dolores park"}
            draggable={false}
            // onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.props.activity.place.mapPosition.lat,
              lng: this.props.activity.place.mapPosition.lng,
            }}
          />
          <Marker />
          
        </GoogleMap>
      ))
    );

    let map;
      map = (
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
      
        </div>
      );

    return map;
  }
}
export default Map;
