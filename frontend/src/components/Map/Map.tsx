import "./map.css";
import GoogleMapReact from "google-map-react";
import env from "react-dotenv";
import { Cars } from "../App/App.types";
import LocationPin from "./LocationPin";
import { colors } from "../../utils";

interface mapProps {
  location: GoogleMapReact.Coords;
  zoomLevel: number;
  cars: Cars;
}

const Map = (props: mapProps) => {
  const { cars, location, zoomLevel } = props;

  return (
    <div className="map">
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: env.MAPS_API_KEY }}
          center={location}
          defaultZoom={zoomLevel}
        >
          {cars.map((car, index) =>
            car.locations.map((location) => (
              <LocationPin
                color={colors[index]}
                lat={location.lat}
                lng={location.lng}
              />
            ))
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
