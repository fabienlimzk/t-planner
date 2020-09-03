import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 3.7923,
      lng: 113.4547,
    },
    zoom: 7.4,
  };
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "70vh", width: "90%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}
export default SimpleMap;
