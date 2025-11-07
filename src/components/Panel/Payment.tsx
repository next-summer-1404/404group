"use client";

export default function Payments() {
  const rows = [
    {
      id: 1,
      type: "شارژ کیف پول",
      status: "تایید شده",
      statusColor: "bg-[#6FD86F]",
      amount: "1,250,000",
      track: "1343567891346789",
      date: "۱۲ مرداد ۱۴۰۱",
    },
    {
      id: 2,
      type: "رزرو",
      status: "لغو شده",
      statusColor: "bg-[#FF9B9B]",
      amount: "850,000",
      track: "9874567891346789",
      date: "۱۲ مرداد ۱۴۰۱",
    },
    {
      id: 3,
      type: "شارژ کیف پول",
      status: "در انتظار",
      statusColor: "bg-[#FFD569]",
      amount: "1,000,000",
      track: "7254567891346789",
      date: "۱۲ مرداد ۱۴۰۱",
    },
  ];

  return (
    <div className="w-full px-6 py-6">
      <h2 className="text-right text-lg font-semibold mb-6">
        لیست تراکنش های شما
      </h2>
      {/* فیلترها */}
      <div className="flex flex-wrap  justify-end gap-3 mb-4">
        <select className="px-4 py-2 bg-gray-100 border rounded-xl">
          <option>نوع تراکنش</option>
        </select>

        <select className="px-4 py-2 bg-gray-100 border rounded-xl">
          <option>وضعیت پرداخت</option>
        </select>
      </div>

      {/* جدول */}
      <div className="w-full overflow-auto">
        <table className="w-full border-separate border-spacing-y-4">
          <thead className=" w-full">
            <tr className=" bg-gray-200">
              {" "}
              <th className="p-3 rounded-r-xl">تاریخ</th>
              <th className="p-3">شماره پیگیری</th>
              <th className="p-3">مبلغ</th>
              <th className="p-3">وضعیت پرداخت</th>
              <th className="p-3">نوع تراکنش</th>
              <th className="p-3 rounded-l-xl"></th>
            </tr>
          </thead>

          <tbody>
            {rows.map((item) => (
              <tr
                key={item.id}
                className="bg-white text-right text-sm shadow-[0_2px_6px_rgba(0,0,0,0.12)] rounded-xl"
              >
                <td className="p-4 rounded-l-xl">{item.date}</td>
                <td className="p-4">{item.track}</td>
                <td className="p-4">{item.amount}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs text-white ${item.statusColor}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-4">{item.type}</td>
                <td className="p-4 rounded-r-xl text-blue-600 cursor-pointer">
                  مشاهده رسید
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
