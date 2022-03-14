import { Car } from "../App.types";
import { Text } from "@fluentui/react";

const CarsListItem = (props: { car: Car }) => {
  const { car } = props;
  return (
    <Text>
      Car number {car.id}{" "}
      {car.locations.length > 0
        ? ` lat: ${car.locations[car.locations.length - 1].lat.toFixed(
            5
          )}, lng: ${car.locations[car.locations.length - 1].lng}`
        : ""}
    </Text>
  );
};

export default CarsListItem;
