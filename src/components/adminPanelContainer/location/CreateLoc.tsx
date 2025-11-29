import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { createLocationByAdmin } from "../../../services/api/Admin/location/createLoc/createLocation";
import toast from "react-hot-toast";
import { AreaItem } from "../../../types/adminPanel/loc";
import { updateLocationByAdmin } from "../../../services/api/Admin/location/updateLoc/updateLoc";
interface ICreateLocProps {
  refetch: () => void;
  onOpenChange: () => void;
  selectedLocation: AreaItem | null;
  inEdit: boolean;
}
function CreateLoc({
  refetch,
  onOpenChange,
  selectedLocation,
  inEdit,
}: ICreateLocProps) {
  const [newName, setNewName] = useState(selectedLocation?.area_name || "");
  const [newPosition, setNewPosition] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const initialCenter: [number, number] = [
    Number(selectedLocation?.lat) || 35.7,
    Number(selectedLocation?.lng) || 51.4,
  ];

  function SelectableMarker({
    position,
    setPosition,
  }: {
    position: [number, number] | null;
    setPosition: (pos: [number, number]) => void;
  }) {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return position ? <Marker position={position}></Marker> : null;
  }
  const createLocMutation = useMutation({
    mutationFn: (data: any) => createLocationByAdmin(data),

    onSuccess: () => {
      setIsLoading(false);
      refetch?.();
      onOpenChange();
      setNewName("");
      setNewPosition(null);
      toast.success("عملیات با موفقیت انجام شد ");
    },

    onError: (error) => {
      toast.error("مشکلی پیش آمده است ");
    },
  });
  const updateLocMutation = useMutation({
    mutationFn: (data: any) =>
      updateLocationByAdmin(selectedLocation!.id, data),

    onSuccess: () => {
      setIsLoading(false);
      refetch?.();
      onOpenChange();
      setNewName("");
      setNewPosition(null);
      toast.success("عملیات با موفقیت انجام شد ");
    },

    onError: (error) => {
      toast.error("مشکلی پیش آمده است ");
    },
  });
  const handleAddSubmit = () => {
    setIsLoading(true);
    const data = {
      area_name: newName,
      lat: newPosition?.[0],
      lng: newPosition?.[1],
    };

    if (inEdit) {
      updateLocMutation.mutate(data);
    } else {
      createLocMutation.mutate(data);
    }
  };
  return (
    <>
      <Input
        placeholder="نام مقصد"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />

      <div className="h-[350px] w-full">
        <MapContainer
          center={initialCenter}
          zoom={5}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <SelectableMarker
            position={newPosition}
            setPosition={setNewPosition}
          />
        </MapContainer>
      </div>

      <Button
        color="primary"
        onPress={handleAddSubmit}
        className="rounded-full"
        isLoading={isLoading}
      >
        ثبت
      </Button>
    </>
  );
}

export default CreateLoc;
