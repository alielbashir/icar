import { Stack } from "@fluentui/react";
import { Cars } from "../App.types";
import CarsListItem from "./CarsListItem";

const CarsList = ({ cars }: { cars: Cars }) => {
  return (
    <Stack>
      {cars.map((car) => (
        <CarsListItem car={car} key={car.id} />
      ))}
    </Stack>
  );
};

export default CarsList;
