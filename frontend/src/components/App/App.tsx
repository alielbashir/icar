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
import { useState } from "react";

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

// const setToken = (userToken: string) => {
//   sessionStorage.setItem("token", JSON.stringify(userToken));
// };

// const getToken = () => {};

function App() {
  const [token, setToken] = useState("");

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <Stack horizontal styles={stackStyles}>
        <StackItem grow>
          <Sidebar />
        </StackItem>
        <Stack.Item grow={6}>
          <Map location={location} zoomLevel={11} />
        </Stack.Item>
      </Stack>
    </div>
  );
}

export default App;
