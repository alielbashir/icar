import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map';



function App() {

  const location = {
    address: 'Stockholm, Sweden',
    lat: 59.315743484542196,
    lng: 18.208967997981468,
  }

  return (
    <div className="App">
      <Map location={location} zoomLevel={11} />
    </div>
  );
}

export default App;
