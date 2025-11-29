"use client";
import LoadingDots from "../../Loading/loadingOne";
import { useQuery } from "@tanstack/react-query";
import {
  getAllRome,
  IRoomType,
} from "../../../services/api/Admin/chat/getAllRome";
import { getAllChats } from "../../../services/api/Admin/chat/getAllChats";
import { useEffect, useState } from "react";

function ChatContainer() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // دریافت لیست روم ها
  const { data: rome, isLoading: loadingRome } = useQuery({
    queryKey: ["getRome"],
    queryFn: () => getAllRome(),
  });
  useEffect(() => {
    console.log(rome);
  }, [rome]);

  // دریافت چت‌ ها با roomId
  const { data: chats, isLoading: loadingChats } = useQuery({
    queryKey: ["getChat", selectedRoom],
    queryFn: () => getAllChats(selectedRoom as string),
    enabled: !!selectedRoom, // فقط وقتی room انتخاب شد اجرا شود
    select: (response) =>
      response.chats.sort((a: any, b: any) => Number(a.id) - Number(b.id)),
  });

  if (loadingRome) {
    return (
      <div className="w-full flex justify-center py-10">
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className="flex w-full h-[600px]  rounded-xl overflow-hidden bg-gray-50">
      {/* ------- Sidebar روم ها ------- */}
      <div className="w-64 border-l bg-gray-50">
        <h3 className="p-4 font-bold border-b mb-4">روم‌ها</h3>

        <div className="overflow-y-auto h-full mx-2 flex flex-col gap-2">
          {(rome ?? []).map((room: IRoomType) => (
            <div
              key={room.room}
              onClick={() => setSelectedRoom(room.room)}
              className={`p-2 cursor-pointer border border-gray-300 hover:bg-gray-200  rounded-xl
        ${selectedRoom === room.room ? "bg-blue-100 font-semibold" : ""}
      `}
            >
              روم {room.room}
            </div>
          ))}
        </div>
      </div>

      {/* ------- نمایش چت ها ------- */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {!selectedRoom ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            یک روم را انتخاب کنید
          </div>
        ) : loadingChats ? (
          <div className="w-full flex justify-center py-10">
            <LoadingDots />
          </div>
        ) : (
          <div className="p-4 space-y-3 overflow-y-auto h-full bg-gray-50">
            {chats?.length === 0 ? (
              <div className="text-gray-400 text-center mt-20">
                هیچ پیامی برای این روم وجود ندارد.
              </div>
            ) : (
              chats?.map((msg: any) => (
                <div
                  key={msg.id}
                  className="bg-gray-100 p-3 rounded-lg shadow-sm w-fit"
                >
                  <div className="text-sm">{msg.message}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(msg.createdAt).toLocaleString("fa-IR")}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatContainer;
