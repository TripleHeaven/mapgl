import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import MapGL, { GeolocateControl, Marker } from "react-map-gl";
// import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import { useRef, useState } from "react";
import UilReact from "@iconscout/react-unicons/icons/uil-react";

import DeckGL, { GeoJsonLayer } from "deck.gl";
const token = process.env.REACT_APP_TOKEN;

export default function Map() {
  const [themeState, setThemeState] = useState(true);
  const handleThemeView = (logicT) => {
    return logicT
      ? "mapbox://styles/mapbox/dark-v8"
      : "mapbox://styles/mapbox/light-v10";
  };
  const [state, setState] = useState({
    viewport: {
      latitude: 0,
      longitude: 0,
      zoom: 6,
    },
    searchResultLayer: null,
  });
  let mapRef = useRef(null);

  const handleViewportChange = (viewport) => {
    console.log("test");
    console.log(viewport.longitude);
    setState({
      viewport: { ...state.viewport, ...viewport },
    });
  };
  const geolocateStyle = {
    float: "left",
    margin: "50px",
    padding: "10px",
  };
  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = (newviewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return handleViewportChange({
      //   ...state.viewport,
      ...newviewport,
      ...geocoderDefaultOverrides,
    });
  };

  const handleOnResult = (event) => {
    setState({
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10,
      }),
    });
  };
  const token =
    "pk.eyJ1IjoiaGVhdmVuaGVhdmVuMzAiLCJhIjoiY2tuYWM3M3k0MTBhcDJ3cW5tNW1qd3B6ciJ9.FqjIcPlBmN7499EeMYsWvw";
  return (
    //   const { viewport, searchResultLayer} = this.state

    <div style={{ height: "100vh" }}>
      <MapGL
        ref={mapRef}
        {...state.viewport}
        mapStyle={handleThemeView(themeState)}
        // mapStyle={"mapbox://styles/mapbox/dark-v8"}
        width="100%"
        height="110%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={token}
      >
        <Geocoder
          mapRef={mapRef}
          // onResult={handleOnResult}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={token}
          position="top-right"
        />
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        <Marker
          longitude={state.viewport.longitude}
          latitude={state.viewport.latitude}
        >
          <UilReact></UilReact>
        </Marker>
      </MapGL>
      <button
        onClick={() => setThemeState(!themeState)}
        style={{ position: "absolute" }}
      >
        Theme
      </button>
      {/* <DeckGL {...state.viewport} layers={[state.searchResultLayer]} /> */}
    </div>
  );
}

// export default SeaMap;
