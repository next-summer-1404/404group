"use client";

import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Trash2,
  Info,
  CreditCard,
} from "lucide-react";

type Reservation = {
  id: number;
  hotel: string;
  date: string;
  price: string;
  passengers: string;
  status: "تایید شده" | "در انتظار" | "لغو شده";
};

export default function Reservations() {
  const [query, setQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const reservations: Reservation[] = [
    {
      id: 1,
      hotel: "هتل سروان رشت",
      date: "12 مرداد 1401 / 12:33",
      price: "۸,۰۰۰,۰۰۰ تومان",
      passengers: "۲ عدد مسافر",
      status: "تایید شده",
    },
    {
      id: 2,
      hotel: "هتل سروان رشت",
      date: "12 مرداد 1401 / 12:33",
      price: "۸,۰۰۰,۰۰۰ تومان",
      passengers: "۲ عدد مسافر",
      status: "در انتظار",
    },
    {
      id: 3,
      hotel: "هتل سروان رشت",
      date: "12 مرداد 1401 / 12:33",
      price: "۸,۰۰۰,۰۰۰ تومان",
      passengers: "۲ عدد مسافر",
      status: "لغو شده",
    },
    {
      id: 4,
      hotel: "هتل سروان رشت",
      date: "12 مرداد 1401 / 12:33",
      price: "۸,۰۰۰,۰۰۰ تومان",
      passengers: "۲ عدد مسافر",
      status: "تایید شده",
    },
    {
      id: 5,
      hotel: "هتل سروان رشت",
      date: "12 مرداد 1401 / 12:33",
      price: "۸,۰۰۰,۰۰۰ تومان",
      passengers: "۲ عدد مسافر",
      status: "تایید شده",
    },
  ];

  const filtered = reservations.filter(
    (r) =>
      r.hotel.includes(query) ||
      r.date.includes(query) ||
      r.price.includes(query)
  );

  // pagination ساده ساختگی (4 آیتم در هر صفحه)
  const perPage = 4;
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-6">
      {/* Header + filter */}
      <Card className="rounded-2xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6">
          <div className="text-lg font-semibold">لیست رزروها</div>
          <div className="flex-1 flex items-center gap-3 mx-12">
            <div className="relative w-full max-w-xl">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="نام هتل مورد نظر ..... "
                className="w-full pr-10 pl-4 py-3 rounded-full border border-gray-200 dark:border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 dark:focus:ring-green-700"
              />
              <Search className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>
          <button className="px-4 py-2 bg-green-100 text-green-700 rounded-full shadow-sm">
            فیلترها
          </button>
        </CardHeader>

        <CardBody>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableColumn className="text-right">نام اقامتگاه</TableColumn>
                <TableColumn className="text-right">تاریخ رزرو</TableColumn>
                <TableColumn className="text-right">قیمت کل</TableColumn>
                <TableColumn className="text-right">تعداد مسافر</TableColumn>
                <TableColumn className="text-right">وضعیت پرداخت</TableColumn>
                <TableColumn className="w-12"></TableColumn>
              </TableHeader>

              <TableBody>
                {pageItems.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.hotel}</TableCell>
                    <TableCell>{r.date}</TableCell>
                    <TableCell>{r.price}</TableCell>
                    <TableCell>{r.passengers}</TableCell>
                    <TableCell>
                      <StatusBadge status={r.status} />
                    </TableCell>

                    <TableCell className="relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === r.id ? null : r.id)
                        }
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="more"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* dropdown */}
                      {openMenuId === r.id && (
                        <div
                          className="absolute left-0 bottom-0 translate-y-full z-30 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1"
                          onMouseLeave={() => setOpenMenuId(null)}
                        >
                          <MenuItem
                            icon={<CreditCard size={16} />}
                            label="پرداخت"
                            onClick={() => {
                              alert("پرداخت");
                              setOpenMenuId(null);
                            }}
                          />
                          <MenuItem
                            icon={<Info size={16} />}
                            label="جزئیات"
                            onClick={() => {
                              alert("جزئیات");
                              setOpenMenuId(null);
                            }}
                          />
                          <MenuItem
                            icon={<Trash2 size={16} />}
                            label="حذف"
                            onClick={() => {
                              if (confirm("آیا مطمئن هستید؟")) alert("حذف شد");
                              setOpenMenuId(null);
                            }}
                          />
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}

                {pageItems.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-gray-500 py-6"
                    >
                      موردی یافت نشد.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardBody>

        <CardFooter className="flex items-center justify-between p-4">
          <div className="text-sm text-gray-500">
            نمایش {(page - 1) * perPage + 1}-
            {Math.min(page * perPage, filtered.length)} از {filtered.length}{" "}
            مورد
          </div>

          {/* pagination ساده */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
              disabled={page === 1}
            >
              <ChevronLeft />
            </button>

            {/* pages small pill list */}
            <div className="flex items-center gap-2 px-2">
              {Array.from({ length: pages }).map((_, i) => {
                const pn = i + 1;
                return (
                  <button
                    key={pn}
                    onClick={() => setPage(pn)}
                    className={`w-8 h-8 rounded-full ${
                      pn === page
                        ? "bg-green-300 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {pn}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
              disabled={page === pages}
            >
              <ChevronRight />
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
    >
      <span className="text-gray-600 dark:text-gray-200">{icon}</span>
      <span className="flex-1 text-right">{label}</span>
    </button>
  );
}

function StatusBadge({ status }: { status: Reservation["status"] }) {
  if (status === "تایید شده") {
    return (
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
        تایید شده
      </span>
    );
  }
  if (status === "در انتظار") {
    return (
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm">
        در انتظار
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
      لغو شده
    </span>
  );
}
