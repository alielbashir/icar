import { Stack } from "@fluentui/react";
import { Cars } from "../App/App.types";
import CarsList from "./CarsList/CarsList";
import SidebarHeader from "./SidebarHeader";

interface SidebarProps {
  cars: Cars;
}

const Sidebar = (props: SidebarProps) => {
  const { cars } = props;
  return (
    <Stack>
      <SidebarHeader title="icar" />
      <CarsList cars={cars} />
    </Stack>
  );
};

export default Sidebar;
