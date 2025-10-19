"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import marker from "@/assets/houseReserve/marker.svg";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

export default function HouseReserveMap() {
  const searchParams = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const customDivIcon = new L.DivIcon({
    className: "custom-marker", // می‌توانی این کلاس را با Tailwind یا CSS استایل دهی کنی
    html: `
      <div class="group relative w-[48px] h-[48px] flex justify-center items-center">
        <img 
          src="/markers/marker.svg"
          alt="marker"
          width="36"
          height="36"
          class="z-10 relative"
        />      
        <div class=" size-[48px] rounded-full -top-2 right-0 overflow-hidden absolute z-50">
          <img src="/markers/HouseReserveImageItems.png" alt="marker" fill class="block w-[48px] h-[68px] rounded-full object-cover" />
        </div>
        <!-- Tooltip -->
      <!--  <div class="absolute bottom-[10%] z-100 left-1/2 -translate-x-1/2 bg-[#7575FE] text-black text-[12px] font-bold px-3 py-2 rounded-lg  opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-[140px] text-center">
          ویلای ساحلی
          <br/>
          <span class="text-[11px] text-gray-500">قیمت: ۲,۵۰۰,۰۰۰ تومان</span>
          <img src="/markers/HouseReserveImageItems.png" class="w-[100px] h-[60px] object-cover rounded-md mt-1" />
        </div> -->
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
  });
  const center = useMemo<[number, number]>(() => {
    if (lat && lng && !isNaN(Number(lat)) && !isNaN(Number(lng))) {
      return [Number(lat), Number(lng)];
    }
    return [35.6892, 51.389];
  }, [lat, lng]);

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
      key={center.join(",")}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} icon={customDivIcon}>
        <Popup>مکان انتخاب شده</Popup>
      </Marker>
    </MapContainer>
  );
}
