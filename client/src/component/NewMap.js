import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./style.css";
import L from "leaflet";
import Weather from "./Weather";
import styled from "styled-components";

const NewMap = ({ coordinate }) => {
  // positions (coordinates) for each hotel + restaurant + activity
  const positions = coordinate;

  // icon for coordinates
  const icon = new L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [20, 31],
  });

  return (
    <div className="map" id="map">
      <MapContainer
        center={positions.length === 2 ? positions : [45.5241, -73.6726]}
        zoom={11}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={positions.length === 2 ? positions : [45.5241, -73.6726]}
          icon={icon}
        ></Marker>
        <WeatherDiv>
          <Weather />
        </WeatherDiv>
      </MapContainer>
    </div>
  );
};

export default NewMap;

const WeatherDiv = styled.div`
  position: absolute;
  top: 0em;
  right: 1em;
  z-index: 1000;
`;
