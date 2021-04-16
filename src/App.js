import "./styles.css";
import React, { useEffect, useState, Option, Select } from "react";
import { Form, Button, Input } from "antd";
import axios from "axios";
import ReactMapGL, { Marker } from "react-map-gl";

export default function App() {
  const [geo, setGeo] = useState({});
  const [live, setLive] = useState(false);
  const [users,setUsers] = useState([])
  const [liveUser,setLiveUser] = useState({
    user_id:"606198867bc961257b80a35e"
  })
  // const {Option, OptGroup} = Select;

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "60vw",
    latitude: -2.971061,
    longitude: 119.6282669,
    zoom: 18
  });

  useEffect(()=>{
    axios.get("https://pimpmyjuul.com/user", {
			headers: {
				'content-type': 'multipart/form-data',
				"Access-Control-Allow-Origin": "*",
        "x-access-token":"secretkeyjwt"
			}
		}).then(doc => {
			console.log(doc.data.doc)
      setUsers(doc.data.doc)
		}).catch(err=>{
			console.log(err)
		})
  },[])

  useEffect(() => {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            setGeo(position.coords);
            console.log(position.coords);
            setViewport({
              ...viewport,
              latitude: parseFloat(position.coords.latitude),
              longitude: parseFloat(position.coords.longitude)
            });
           if(live){
            axios.post("https://pimpmyjuul.com/user/set-location",{
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              id:"606198867bc961257b80a35e"
            },{
              headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "x-access-token":"secretkeyjwt"
              }
            }).then(doc=>{
                console.log(doc)
            }).catch(err=>{
              console.log(err)
            })
           }
          }
        },
        (error) => console.log(error),
        { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
      );
    }, 2000);
  }, []);

  const onFinish = (values) => {
    if (live) {
      setLive(false);
    } else {
      setLive(true);
    }
    console.log(values.user_id);
    setLiveUser({
      ...liveUser,
      user_id:values.user_id
    })
  };

  const renderLive = () => {
    if (live) {
      return <h1 style={{ color: "green" }}>{liveUser.user_id} is Live</h1>;
    } else {
      return <h1 style={{ color: "red" }}>Not Live</h1>;
    }
  };

  return (
    <div className="App">
      <h1>GPS Data Xuro Tech</h1>
      {renderLive()}
      <ReactMapGL
        mapboxApiAccessToken={
          "pk.eyJ1Ijoic2FuZ3Nha2F3aXJhIiwiYSI6ImNqdXBhajZmeTBudXg0NG50YjdhcDF2amUifQ.NmC56k1T54xEKGmlrFOxRA"
        }
        {...viewport}
        width={"100%"}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div style={{ color: "red" }}>You Are Here!</div>
        </Marker>
      </ReactMapGL>
      <h2>Latitude: {geo.latitude}</h2>
      <h2>Longitude: {geo.longitude}</h2>
      {/* https://www.google.com/maps/search/?api=1&query=36.26577,-92.54324 */}
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="user_id" placeholder="User Id">
          <select defaultValue="">
          {users.map(doc=>{
            return(
              <option value={doc._id} >{doc.username} - {doc._id}</option>
            )
          })}
          </select>
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
