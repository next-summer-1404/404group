"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Progress } from "@heroui/progress";
import {
  Heart,
  CalendarDays,
  FileCheck2,
  CreditCard,
  CheckCircle2,
  EllipsisVertical,
} from "lucide-react";

export default function DashboardHome() {
  const topCards = [
    {
      id: 1,
      title: "کل رزروها",
      icon: <CalendarDays size={22} />,
      color: "text-blue-500",
    },
    {
      id: 2,
      title: "رزروهای فعال",
      icon: <FileCheck2 size={22} />,
      color: "text-green-500",
    },
    {
      id: 3,
      title: "رزروهای پرداخت شده",
      icon: <CreditCard size={22} />,
      color: "text-amber-500",
    },
    {
      id: 4,
      title: "علاقه‌مندی‌ها",
      icon: <Heart size={22} />,
      color: "text-rose-500",
    },
  ];

  const reservations = [
    {
      id: 1,
      hotel: "هتل سروان نابین رشت",
      date: "12 مرداد 1401 / 12:33",
      price: "8,000,000 تومان",
      status: "تایید شده",
    },
    {
      id: 2,
      hotel: "هتل سروان نابین رشت",
      date: "12 مرداد 1401 / 12:33",
      price: "8,000,000 تومان",
      status: "تایید شده",
    },
    {
      id: 3,
      hotel: "هتل سروان نابین رشت",
      date: "12 مرداد 1401 / 12:33",
      price: "8,000,000 تومان",
      status: "تایید شده",
    },
    {
      id: 4,
      hotel: "هتل سروان نابین رشت",
      date: "12 مرداد 1401 / 12:33",
      price: "8,000,000 تومان",
      status: "تایید شده",
    },
  ];

  return (
    <div className="space-y-6">
      {/* --- Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topCards.map((item) => (
          <Card
            key={item.id}
            className="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition"
          >
            <CardHeader className="flex items-center justify-between border-dashed border-b-1 border-gray-400">
              <span className={`${item.color}`}>{item.icon}</span>
              <button className="text-xs text-gray-500 dark:text-gray-400">
                مشاهده
              </button>
            </CardHeader>
            <CardBody className="flex flex-col items-center justify-center py-6">
              <h3 className="font-semibold text-sm sm:text-base">
                {item.title}
              </h3>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="rounded-2xl border border-gray-200 dark:border-gray-700">
          <CardHeader className="font-semibold text-base sm:text-lg border-dashed border-b-1 border-gray-400">
            نمودار رزروهای شما
          </CardHeader>
          <CardBody></CardBody>
        </Card>

        <Card className="rounded-2xl border border-gray-200 dark:border-gray-700">
          <CardHeader className="font-semibold text-base sm:text-lg border-dashed border-b-1 border-gray-400">
            وضعیت پروفایل شما
          </CardHeader>
          <CardBody>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="text-center sm:text-right -mt-10">
                <p>40%</p>
                <p className="text-sm mb-2">
                  برای اینکه اکانت شما تایید شود، پروفایل باید حداقل 70٪ تکمیل
                  شده باشد.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  آخرین تغییرات: 3 دقیقه پیش
                </p>
              </div>
              <div className="w-28 h-28 relative">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    className="text-gray-200 dark:text-gray-700"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-green-500"
                    strokeWidth="3.8"
                    strokeDasharray="40, 100"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="rounded-2xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="flex items-center justify-between border-dashed border-b-1 border-gray-400">
          <h3 className="font-semibold text-base sm:text-lg">رزروهای اخیر</h3>
          <button className="text-xs text-blue-600 hover:underline">
            مشاهده همه
          </button>
        </CardHeader>

        <CardBody>
          <div className="overflow-x-auto">
            <Table aria-label="لیست رزروها">
              <TableHeader>
                <TableColumn className="text-right">نام اقامتگاه</TableColumn>
                <TableColumn className="text-right">تاریخ رزرو</TableColumn>
                <TableColumn className="text-right">قیمت</TableColumn>
                <TableColumn className="text-right">وضعیت</TableColumn>
                <TableColumn></TableColumn>
              </TableHeader>
              <TableBody>
                {reservations.map((res) => (
                  <TableRow key={res.id}>
                    <TableCell>{res.hotel}</TableCell>
                    <TableCell>{res.date}</TableCell>
                    <TableCell>{res.price}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle2 size={16} /> {res.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-400 text-left">
                      <EllipsisVertical size={16} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
