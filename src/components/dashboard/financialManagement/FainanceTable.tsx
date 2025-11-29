"use client";
import React, { useEffect, useState } from "react";
import DynamicTable from "../../common/table/DynamicTable";
import { PaymentsResponse, PaymentType } from "@/types/panel/PaymentType ";
import { getPayments } from "@/services/api/Dash/getPayments";

const FainanceTable = () => {
  const [data, setData] = useState<PaymentType[]>([]);

  const getData = async () => {
    const response: PaymentsResponse = await getPayments();
    setData(response.payments);
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { key: "date", label: "تاریخ" },
    { key: "tracking", label: "شماره پیگیری" },
    { key: "amount", label: "مبلغ" },
    { key: "status", label: "وضعیت پرداخت" },
    { key: "type", label: "نوع تراکنش" },
    { key: "action", label: "مشاهده رسید" },
  ];

  const rows = data.map((payment) => ({
    key: payment.id,
    date: new Date(payment.createdAt).toLocaleDateString("fa-IR"),
    tracking: payment.transactionId ?? "—",
    amount: payment.amount,
    status: payment.status,
    type: payment.description,
    action: (
      <a
        href={payment.paymentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#8CFF45] hover:text-[#aaff6b] font-semibold transition"
      >
        مشاهده رسید
      </a>
    ),
  }));

  return (
    <div className="text-right">
      <DynamicTable
        title="لیست تراکنش‌های مالی"
        columns={columns}
        rows={rows}
        withActions={false}
      />
    </div>
  );
};

export default FainanceTable;
