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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

import LoadingDots from "../../Loading/loadingOne";
import { MapPin, MoreVertical, Pencil } from "lucide-react";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { createLocationByAdmin } from "../../../services/api/Admin/location/createLoc/createLocation";
import toast from "react-hot-toast";
import CreateLoc from "./CreateLoc";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function FlyToLocation({ position }: { position: [number, number] | null }) {
  const map = useMapEvents({});
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 1.2 });
    }
  }, [position]);

  return null;
}
function LocationContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);
  const [selectedLocation, setSelectedLocation] = useState<AreaItem | null>(
    null
  );
  const {
    isOpen: isCreateModal,
    onOpen: onCreateModal,
    onOpenChange: onCreateModalChange,
  } = useDisclosure();
  const {
    isOpen: isEditModal,
    onOpen: onEditModal,
    onOpenChange: onEditModalChange,
  } = useDisclosure();

  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
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

  const totalPages = data ? Math.ceil(data.totalCount / 5) : 0;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`);
  };

  if (isLoadingData) {
    return (
      <div className="w-full flex justify-center py-10">
        <LoadingDots />
      </div>
    );
  }

  const initialCenter: [number, number] = data?.locs.length
    ? [Number(data.locs[0].lat), Number(data.locs[0].lng)]
    : [35.7, 51.4];

  return (
    <div className="w-full overflow-x-auto pb-10 space-y-5">
      {/* نقشه اصلی بالای جدول */}
      <div
        className={`h-[400px] w-full transition-all duration-300 ${
          isCreateModal ? "bg-gray-300" : ""
        }`}
      >
        {!isCreateModal && !isEditModal && (
          <MapContainer
            center={initialCenter}
            zoom={5}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <FlyToLocation position={mapCenter} />

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
        <Button color="primary" onPress={() => onCreateModal()}>
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
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="light" className="px-2 min-w-unit-10">
                      <MoreVertical size={18} />
                    </Button>
                  </DropdownTrigger>

                  <DropdownMenu aria-label="actions">
                    <DropdownItem
                      key="show_map"
                      startContent={<MapPin size={16} />}
                      onPress={() => {
                        // setSelectedLocation(item);
                        setMapCenter([Number(item.lat), Number(item.lng)]);
                      }}
                    >
                      مشاهده روی نقشه
                    </DropdownItem>

                    <DropdownItem
                      key="edit"
                      startContent={<Pencil size={16} />}
                      onPress={() => {
                        setSelectedLocation(item);
                        onEditModal();
                      }}
                    >
                      ویرایش
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
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
      <Modal isOpen={isCreateModal} onOpenChange={onCreateModalChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>اضافه کردن مقصد جدید</ModalHeader>
              <ModalBody className="space-y-3 h-[500px] pb-4">
                <CreateLoc
                  selectedLocation={selectedLocation}
                  refetch={refetch}
                  onOpenChange={onClose}
                  inEdit={false}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* مودال برای ویرایش کردن مقصد  */}
      <Modal isOpen={isEditModal} onOpenChange={onEditModalChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>ویرایش کردن مقصد جدید</ModalHeader>
              <ModalBody className="space-y-3 h-[500px] pb-4">
                <CreateLoc
                  selectedLocation={selectedLocation}
                  refetch={refetch}
                  onOpenChange={onClose}
                  inEdit={true}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default LocationContainer;
