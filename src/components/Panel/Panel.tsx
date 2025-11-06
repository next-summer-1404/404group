"use client";

import { useState } from "react";
import {
  Home,
  User,
  Heart,
  Bell,
  Wallet,
  Lock,
  Plus,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardHome from "./Dashboard";
import Reservations from "./Reservmange";
import Profile from "./Profile";

const tabs = [
  { id: "dashboard", label: "داشبورد", icon: <Home size={18} /> },
  { id: "profile", label: "اطلاعات کاربری", icon: <User size={18} /> },
  { id: "bookings", label: "مدیریت رزروها", icon: <Plus size={18} /> },
  { id: "favorites", label: "علاقه‌مندی‌ها", icon: <Heart size={18} /> },
  { id: "payments", label: "پرداخت‌ها", icon: <Lock size={18} /> },
  { id: "notifications", label: "اعلان‌ها", icon: <Bell size={18} /> },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-fit bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <aside
        className={`fixed md:static mr-5 my-6 rounded-2xl top-0 right-0  md:w-64 w-64 bg-white dark:bg-gray-800 shadow-lg z-20 transform transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold">دلتا</h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSidebarOpen(false);
              }}
              className={`flex items-center justify-between p-2 rounded-lg transition
                ${
                  activeTab === tab.id
                    ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              <span className="flex items-center gap-2">
                {tab.icon} {tab.label}
              </span>
            </button>
          ))}
        </nav>
        <div className="mt-50 p-4">
          <div className="flex items-center justify-between border-dashed border-1.5 p-3 rounded-xl">
            <div>
              <p className="text-sm font-semibold">کیف پول</p>
              <p className="text-xs text-gray-500">عدم موجودی</p>
            </div>
            <Wallet size={18} />
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 flex flex-col">
        <header className="flex mx-5 mt-6 rounded-2xl items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-center gap-2">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu />
            </button>
            <h2 className="font-bold text-lg">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">امیر محمد ملایی</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 text-center"
            >
              <p>
                {activeTab === "dashboard" && <DashboardHome />}
                {activeTab === "profile" && <Profile />}
                {activeTab === "bookings" && <Reservations />}
              </p>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
