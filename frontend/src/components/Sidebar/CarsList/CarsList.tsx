import { Stack } from "@fluentui/react";
import { Cars } from "../../App/App.types";
import CarsListItem from "./CarsListItem";
// import CarsListItem from "./CarsListItem";

const CarsList = ({ cars }: { cars: Cars }) => {
  const filteredCars: number[] = [];
  return (
    <Stack>
      {cars
        .filter((car) => {
          if (filteredCars.includes(car.car_id)) {
            return false;
          } else {
            filteredCars.push(car.car_id);
            return true;
          }
        })
        .map((car) => {
          return <CarsListItem car={car} key={car.car_id} />;
        })}
    </Stack>
  );
};

export default CarsList;
