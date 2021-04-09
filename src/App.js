import logo from './logo.svg'
import './App.css'
import { useState } from 'react'
// import * as React from 'react'
// import { useState } from 'react'
import ReactMapGL from 'react-map-gl'

function App() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  })

  return (
    <div className="test">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={
          'pk.eyJ1IjoiaGVhdmVuaGVhdmVuMzAiLCJhIjoiY2tuYWM3M3k0MTBhcDJ3cW5tNW1qd3B6ciJ9.FqjIcPlBmN7499EeMYsWvw'
        }
        width="100%"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      />
    </div>
  )
}

export default App
