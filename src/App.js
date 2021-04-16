import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
  let [geo, setGeo] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeo(position.coords);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
    );
  }, []);

  return (
    <div className="App">
      <h1>GPS Data Xuro Tech</h1>
      <h2>Latitude: {geo.latitude}</h2>
      <h2>Longitude: {geo.longitude}</h2>
      {/* https://www.google.com/maps/search/?api=1&query=36.26577,-92.54324 */}
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${geo.latitude},${geo.longitude}`}
      >
        Get to Location
      </a>
    </div>
  );
}
