import "./map.css";
import GoogleMapReact from "google-map-react";
import env from "react-dotenv";

interface mapProps {
  location: GoogleMapReact.Coords;
  zoomLevel: number;
}

const Map = (props: mapProps) => {
  const { location, zoomLevel } = props;

  return (
    <div className="map">
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: env.MAPS_API_KEY }}
          center={location}
          defaultZoom={zoomLevel}
        ></GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
