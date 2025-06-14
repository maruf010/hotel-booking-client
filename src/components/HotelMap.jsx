import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const HotelMap = ({ lat, lng, hotelName }) => {
  return (
    <div style={{ height: '250px', width: '100%' }}>
      <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} style={{borderRadius:'12px', height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[lat, lng]} icon={markerIcon}>
          <Popup>{hotelName}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default HotelMap;
