import React from 'react'
import {Leaflet, TileLayer } from "react-leaflet";
const Map = ({center, zoom}) => {
  return (
    <div className='map'>
      <Leaflet center={center} zoom={zoom} >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Leaflet>
    </div>
  )
}

export default Map