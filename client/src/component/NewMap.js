import React, { useContext, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./style.css";
import L from "leaflet";
import Weather from "./Weather";
import styled from "styled-components";
import { AppContext } from "./Context";

const NewMap = () => {
  // positions (coordinates) for each hotel + restaurant + activity
  const { zoomIn, coordinate } = useContext(AppContext);
  const positions = coordinate;
  const markerRef = useRef(null);

  // icon for coordinates
  const icon = new L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [20, 31],
  });

  // function for zooming in on marker
  const ZoomableMarker = () => {
    const map = useMap();

    useEffect(() => {
      if (zoomIn && markerRef.current) {
        map.flyTo(markerRef.current.getLatLng(), zoomIn);
      }
    }, [zoomIn, map]);

    return (
      <Marker
        ref={markerRef}
        position={positions.length === 2 ? positions : [45.5241, -73.6726]}
        icon={icon}
      />
    );
  };
  console.log(zoomIn);

  return (
    <div className="map" id="map">
      <MapContainer
        center={positions.length === 2 ? positions : [45.5241, -73.6726]}
        zoom={zoomIn}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ZoomableMarker />
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
