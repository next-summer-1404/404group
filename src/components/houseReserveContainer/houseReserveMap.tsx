"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
// import { useEffect } from "react";

// رفع مشکل icon در Leaflet بدون leaflet-defaulticon-compatibility
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

export default function HouseReserveMap() {
  return (
    <MapContainer
      center={[35.6892, 51.389]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[35.6892, 51.389]}>
        <Popup>sdsfs </Popup>
      </Marker>
    </MapContainer>
  );
}
