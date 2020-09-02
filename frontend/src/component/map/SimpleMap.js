import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 1.3546,
      lng: 103.9500,
    },
    zoom: 18.4,
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
