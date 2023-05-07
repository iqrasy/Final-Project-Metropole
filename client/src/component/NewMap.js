import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./style.css";
import L from "leaflet";
import Weather from "./Weather";
import styled from "styled-components";

const NewMap = ({ coordinate, hotels, resto, activities }) => {
  const [zoom, setZoom] = useState(11);

  // positions (coordinates) for each hotel + restaurant + activity
  const positions = coordinate;

  // icon for coordinates
  const icon = new L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [20, 31],
  });

  const mapRef = useRef(null);

  // zoom on icon when a place is selected
  const handleClick = (e) => {
    e.preventDefault();
    setZoom(15);
    mapRef.current.setView(positions, 15);
  };

  return (
    <div className="map" id="map">
      <WeatherDiv>
        <Weather />
      </WeatherDiv>
      <MapContainer
        center={positions.length === 2 ? positions : [45.5241, -73.6726]}
        zoom={zoom}
        scrollWheelZoom={true}
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={positions.length === 2 ? positions : [45.5241, -73.6726]}
          // zoom={zoom}
          icon={icon}
          onClick={handleClick}
        ></Marker>
      </MapContainer>
    </div>
  );
};

export default NewMap;

const WeatherDiv = styled.div`
  position: absolute;
  right: 7.7em;
  top: 1.5em;
  z-index: 3;
`;
