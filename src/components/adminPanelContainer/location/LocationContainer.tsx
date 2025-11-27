"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllLocationByAdmin } from "../../../services/api/Admin/location/getAllLocation";
import { AreasResponse, AreaItem } from "../../../types/adminPanel/loc";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  useDisclosure,
} from "@heroui/react";

import LoadingDots from "../../Loading/loadingOne";
import { MapPin } from "lucide-react";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { createLocationByAdmin } from "../../../services/api/Admin/location/createLoc/createLocation";
import toast from "react-hot-toast";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

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

function LocationContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);

  const [selectedLocation, setSelectedLocation] = useState<AreaItem | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newName, setNewName] = useState("");
  const [newPosition, setNewPosition] = useState<[number, number] | null>(null);

  const {
    data,
    isLoading: isLoadingData,
    refetch,
  } = useQuery({
    queryKey: ["getLoc", currentPage],
    queryFn: () =>
      getAllLocationByAdmin({
        page: currentPage,
        limit: 5,
      }),
    select: (response: AreasResponse) => ({
      locs: response.data,
      totalCount: response.totalCount,
    }),
  });
  const createLocMutation = useMutation({
    mutationFn: (data: any) => createLocationByAdmin(data),

    onSuccess: () => {
      setIsLoading(false);
      refetch?.();
      onOpenChange(false); // <-- این مودال را می‌بندد
      setNewName("");
      setNewPosition(null);
      toast.success("عملیات با موفقیت انجام شد ");
    },

    onError: (error) => {
      toast.error("مشکلی پیش آمده است ");
    },
  });
  const totalPages = data ? Math.ceil(data.totalCount / 5) : 0;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-10">
        <LoadingDots />
      </div>
    );
  }

  const initialCenter: [number, number] = data?.locs.length
    ? [Number(data.locs[0].lat), Number(data.locs[0].lng)]
    : [35.7, 51.4];

  const handleAddSubmit = () => {
    setIsLoading(true);
    const data = {
      area_name: newName,
      lat: newPosition?.[0],
      lng: newPosition?.[1],
    };
    createLocMutation.mutate(data);
  };

  return (
    <div className="w-full overflow-x-auto pb-10 space-y-5">
      {/* نقشه اصلی بالای جدول */}
      <div
        className={`h-[400px] w-full transition-all duration-300 ${
          isOpen ? "bg-gray-300" : ""
        }`}
      >
        {!isOpen && (
          <MapContainer
            center={initialCenter}
            zoom={5}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {data?.locs.map((loc) => (
              <Marker
                key={loc.id}
                position={[Number(loc.lat), Number(loc.lng)]}
              />
            ))}
          </MapContainer>
        )}
      </div>

      <div className="flex justify-end">
        <Button color="primary" onPress={() => onOpen()}>
          اضافه کردن مقصد +
        </Button>
      </div>

      {/* جدول */}
      <Table aria-label="لیست مناطق" removeWrapper>
        <TableHeader>
          <TableColumn>شناسه</TableColumn>
          <TableColumn>نام منطقه</TableColumn>
          <TableColumn>عرض جغرافیایی</TableColumn>
          <TableColumn>طول جغرافیایی</TableColumn>
          <TableColumn>عملیات</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"موردی یافت نشد"}>
          {(data?.locs ?? []).map((item: AreaItem) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <Chip color="secondary" size="sm">
                  {item.area_name}
                </Chip>
              </TableCell>
              <TableCell>{item.lat}</TableCell>
              <TableCell>{item.lng}</TableCell>
              <TableCell>
                <Button
                  onPress={() => setSelectedLocation(item)}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <MapPin size={16} /> مشاهده روی نقشه
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex justify-center pt-5">
          <Pagination
            total={totalPages}
            initialPage={currentPage}
            onChange={handlePageChange}
            variant="bordered"
            showControls
            color="secondary"
            radius="full"
            style={{ direction: "ltr" }}
          />
        </div>
      )}

      {/* مودال اضافه کردن مقصد */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>اضافه کردن مقصد جدید</ModalHeader>
              <ModalBody className="space-y-3 h-[500px] pb-4">
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
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default LocationContainer;
