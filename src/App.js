import "./styles.css";
import React, { useEffect, useState } from "react";
import { Form, Button, Input } from "antd";

export default function App() {
  let [geo, setGeo] = useState({});
  let [live, setLive] = useState(false);

  useEffect(() => {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            setGeo(position.coords);
            console.log(position.coords);
          }
        },
        (error) => console.log(error),
        { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
      );
    }, 1000);
  }, []);

  const onFinish = (values) => {
    if (live) {
      setLive(false);
    } else {
      setLive(true);
    }
    console.log(values);
  };

  const renderLive = () => {
    if (live) {
      return <h1 style={{ color: "green" }}>Live</h1>;
    } else {
      return <h1 style={{ color: "red" }}>Not Live</h1>;
    }
  };

  return (
    <div className="App">
      <h1>GPS Data Xuro Tech</h1>
      {renderLive()}
      <h2>Latitude: {geo.latitude}</h2>
      <h2>Longitude: {geo.longitude}</h2>
      {/* https://www.google.com/maps/search/?api=1&query=36.26577,-92.54324 */}
      <Form onFinish={onFinish}>
        <Form.Item name="unique_id" placeholder="Unique Id">
          <Input></Input>
        </Form.Item>
        <br />
        <Button type="primary" htmlType="submit">
          Set Live
        </Button>
      </Form>
      <br />
      <br />
      <a
        target="_blank"
        href={`https://www.google.com/maps/search/?api=1&query=${geo.latitude},${geo.longitude}`}
      >
        Get to Location
      </a>
    </div>
  );
}
