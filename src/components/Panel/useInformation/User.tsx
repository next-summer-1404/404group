"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { UpdateUserRequest } from "@/types/panel/UpdateUserType";
import { putUpdateUser } from "@/services/api/Dash/putUpdateUser";

export default function UserForm() {
  const [formData, setFormData] = useState<UpdateUserRequest>({
    email: "",
    fullName: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = Cookies.get("userId");
    if (id) setUserId(id);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!userId) throw new Error("شناسه کاربر یافت نشد ");
    const res = await putUpdateUser(userId, formData);
    setSuccess(true);
  };

  const handleReset = () => {
    setFormData({
      email: "",
      fullName: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    });
    setMessage("");
    setSuccess(null);
  };

  return v;
}
