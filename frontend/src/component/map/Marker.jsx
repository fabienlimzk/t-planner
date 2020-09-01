import { Marker } from "react-google-maps";

{
  /*Marker*/
}
<div>
  {" "}
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
  <Marker />
</div>;
export default Marker;
