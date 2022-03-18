import { Stack } from "@fluentui/react";
import CarsList from "./CarsList/CarsList";
import SidebarHeader from "./SidebarHeader";

const cars = [
  { model: "Mercedes", id: 1, locations: [{ lat: 47.4544, lng: 12.4343 }] },
  { model: "BMW", id: 22, locations: [{ lat: 47.4644, lng: 12.4243 }] },
  { model: "Alfa Romeo", id: 55, locations: [{ lat: 47.4444, lng: 12.4443 }] },
  { model: "Tesla", id: 43, locations: [{ lat: 47.4744, lng: 12.4543 }] },
  { model: "Mercedes", id: 59, locations: [{ lat: 47.4844, lng: 12.4643 }] },
];

const Sidebar = () => {
  return (
    <Stack>
      <SidebarHeader title="icar" />
      <CarsList cars={cars} />
    </Stack>
  );
};

export default Sidebar;
