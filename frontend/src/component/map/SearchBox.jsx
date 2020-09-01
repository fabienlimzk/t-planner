import React from "react";
import ReactDOM from "react-dom";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";

export default class SearchBox extends React.Component {
  constructor (props) {
    super(props);
  }

  static propTypes = {
    placeholder: PropTypes.string,
    onPlacesChanged: PropTypes.func,
  };

  render() {
    return (
    <input ref="input" {...this.props} type="text" />
    );
  }

  onPlacesChanged = () => {
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(this.searchBox.getPlaces());
    }
  };

  componentDidMount() {
    const google = window.google;

    var input = ReactDOM.findDOMNode(this.refs.input);
    this.searchBox = new google.maps.places.SearchBox(input);
    this.searchBox.addListener("places_changed", this.onPlacesChanged);
  }

  componentWillUnmount() {
    this.searchBox.removeListener("places_changed", this.onPlacesChanged);
  }
}