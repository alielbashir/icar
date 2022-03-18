import "./App.css";
import Map from "../Map/Map";
import {
  DefaultPalette,
  IStackStyles,
  Stack,
  StackItem,
} from "@fluentui/react";
import Sidebar from "../Sidebar/Sidebar";

import Login from "../Login/Login";
import useToken from "./useToken";
import { useEffect, useState } from "react";
import { getCars } from "../../services/cars";
import { Cars } from "./App.types";

// Styles definition
const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
  },
};

const location = {
  address: "Stockholm, Sweden",
  lat: 59.315743484542196,
  lng: 18.208967997981468,
};

const App = () => {
  const { token, setToken } = useToken();

  const [cars, setCars] = useState<Cars>([]);
  useEffect(() => {
    let mounted = true;
    getCars().then((cars: Cars) => {
      if (mounted) {
        setCars(cars);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <Stack horizontal styles={stackStyles}>
        <StackItem grow>
          <Sidebar cars={cars} />
        </StackItem>
        <Stack.Item grow={6}>
          <Map cars={cars} location={location} zoomLevel={11} />
        </Stack.Item>
      </Stack>
    </div>
  );
};

export default App;
