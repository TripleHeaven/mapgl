// Map.js
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

// Grab the access token from your Mapbox account
// I typically like to store sensitive things like this
// in a .env file
mapboxgl.accessToken =
  "pk.eyJ1IjoiaGVhdmVuaGVhdmVuMzAiLCJhIjoiY2tuYWM3M3k0MTBhcDJ3cW5tNW1qd3B6ciJ9.FqjIcPlBmN7499EeMYsWvw";

export default function App() {
  const mapContainer = useRef();

  // this is where all of our map logic is going to live
  // adding the empty dependency array ensures that the map
  // is only created once

  useEffect(() => {
    // create the map and configure it
    // check out the API reference for more options
    // https://docs.mapbox.com/mapbox-gl-js/api/map/
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v10",
      center: [-119.99959421984575, 38.619551620333496],
      zoom: 17,
      pitch: 60,
    });
    function rotateCamera(timestamp) {
      // clamp the rotation between 0 -360 degrees
      // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
      map.rotateTo((timestamp / 100) % 360, { duration: 0 });
      // Request the next frame of the animation.
      requestAnimationFrame(rotateCamera);
    }
    map.on("load", () => {
      rotateCamera(0);
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxZoom: 16,
      });
      // map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      map.addLayer({
        id: "add-3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 15,
        paint: {
          "fill-extrusion-color": "#aaa",

          // Use an 'interpolate' expression to
          // add a smooth transition effect to
          // the buildings as the user zooms in.
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "height"],
          ],
          "fill-extrusion-base": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "min_height"],
          ],
          "fill-extrusion-opacity": 0.6,
        },
      });
    });

    const test = navigator.geolocation.getCurrentPosition((pos) => {
      map.flyTo({
        center: [-87.62712, 41.89033],
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    });
  }, []);

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: "100%", height: "100vh" }}
    />
  );
}
