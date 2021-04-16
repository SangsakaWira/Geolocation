import "./styles.css";
import React, { useEffect, useState } from "react";
import { Form, Button, Input } from "antd";

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

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="App">
      <h1>GPS Data Xuro Tech</h1>
      <h1 style={{ color: "red" }}>Not Live</h1>
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
