import { Car } from "../../App/App.types";
import { Text } from "@fluentui/react";

const CarsListItem = (props: { car: Car }) => {
  const { car } = props;
  return (
    <Text>
      Car number {car.car_id} lat: {car.lat.toFixed(6)}, lng:{" "}
      {car.lng.toFixed(6)}
    </Text>
  );
};

export default CarsListItem;
