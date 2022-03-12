import './App.css';
import Map from './components/Map';
import { DefaultPalette, IStackItemStyles, IStackStyles, Stack } from '@fluentui/react';


// Styles definition
const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
  },
};


const location = {
  address: 'Stockholm, Sweden',
  lat: 59.315743484542196,
  lng: 18.208967997981468,
}

function App() {
  return (
    <div className="App">
      <Stack horizontal styles={stackStyles}>
        <Stack.Item grow={2} >
          <Map location={location} zoomLevel={11} />
        </Stack.Item>
      </Stack>
    </div >
  );
}

export default App;
