"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { X, ChevronRight } from "lucide-react";

type NavItem = { title: string; href: string; w: string; icon: any };
import { Home, FileText, Info, Building, Bolt } from "lucide-react";

export default function MobileMenuModal({
  isOpen,
  onClose,
  navItems,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  user?: any;
}) {
  const backdrop = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const slide: Variants = {
    closed: {
      opacity: 0,
      y: -40,
      scale: 0.98,
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 26,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.97,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdrop}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            key="panel"
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={slide}
            className="fixed left-1/2 top-6 z-50 w-[92%] max-w-md -translate-x-1/2 
              rounded-3xl bg-white/95 dark:bg-gray-900/90 shadow-xl backdrop-blur-xl 
              border border-white/20 dark:border-gray-800/40"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-semibold dark:text-white">
                منوی دلتا
              </h3>

              <div className="flex items-center gap-2">
                <ThemeToggle />

                <button
                  aria-label="Close menu"
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X size={22} className="text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-4 flex flex-col gap-5">
              {/* Nav Items */}
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive =
                    typeof window !== "undefined" &&
                    window.location.pathname === item.href;

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between px-4 py-3 
                        rounded-xl border border-gray-200/60 dark:border-gray-800
                        hover:bg-gray-50 dark:hover:bg-gray-800/60 transition "
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
                          whileHover={{
                            x: -6,
                            scale: 1.05,
                            transition: {
                              type: "spring",
                              stiffness: 300,
                              damping: 15,
                            },
                          }}
                        >
                          {item.icon}
                        </motion.div>

                        <div className="dark:text-white font-medium">
                          {item.title}
                        </div>
                      </div>

                      {isActive ? (
                        <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                      ) : (
                        <ChevronRight className="opacity-40 group-hover:opacity-70 transition" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* User Section */}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                {!user ? (
                  <Link href="/login" onClick={onClose}>
                    <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition">
                      ورود / ثبت‌نام
                    </button>
                  </Link>
                ) : (
                  <Link
                    href={`/dashboard/${user.role}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <img
                      src={user.avatar || "/avatar-default.png"}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-medium dark:text-white">
                        {user.fullName || user.username}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        مشاهده داشبورد
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
