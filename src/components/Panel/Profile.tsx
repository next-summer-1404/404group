"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function ProfilePage() {
  const [avatar, setAvatar] = useState(null);

  const uploadAvatar = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const profileSchema = Yup.object().shape({
    firstName: Yup.string().required("الزامی"),
    lastName: Yup.string().required("الزامی"),
    email: Yup.string().email("ایمیل معتبر نیست").required("الزامی"),
    phone: Yup.string().required("الزامی"),
  });

  const passSchema = Yup.object().shape({
    oldPass: Yup.string().required("الزامی"),
    newPass: Yup.string().required("الزامی"),
    repeatPass: Yup.string()
      .oneOf([Yup.ref("newPass")], "عدم تطابق رمز")
      .required("الزامی"),
  });

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-6 pt-10 pb-20">
      <h3 className="text-lg font-semibold text-right mb-8">اطلاعات فردی</h3>
      <p className="mt-4 text-gray-500 text-sm w-max">
        می‌توانید عکس نمایه خود را تغییر دهید
      </p>
      {/* آواتار */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={avatar || "/placeholder-avatar.png"}
            className="w-36 h-36 rounded-full object-cover bg-gray-200"
          />

          {/* آپلود */}
          <label className="absolute bottom-1 right-1 bg-green-500 w-8 h-8 rounded-full grid place-items-center cursor-pointer text-white shadow-md">
            <input
              type="file"
              className="hidden"
              onChange={uploadAvatar}
              accept="image/*"
            />
            <span className="text-lg">📷</span>
          </label>

          {/* حذف */}
          {avatar && (
            <button
              onClick={() => setAvatar(null)}
              className="absolute bottom-1 left-1 bg-red-500 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md"
            >
              ✖
            </button>
          )}
        </div>
      </div>

      {/* اطلاعات فردی */}
      <div className="mt-16 border-t pt-10">
        <h3 className="text-lg font-semibold text-right mb-8">اطلاعات فردی</h3>

        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", phone: "" }}
          validationSchema={profileSchema}
          onSubmit={(v) => console.log(v)}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-6">
              {/* نام */}
              <div className="flex flex-col text-right">
                <label className="text-gray-600 mb-1 text-sm">نام :</label>
                <Field
                  name="firstName"
                  className="p-3 rounded-xl bg-gray-100 border border-gray-300"
                />
                {errors.firstName && touched.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* نام خانوادگی */}
              <div className="flex flex-col text-right">
                <label className="text-gray-600 mb-1 text-sm">
                  نام خانوادگی :
                </label>
                <Field
                  name="lastName"
                  className="p-3 rounded-xl bg-gray-100 border border-gray-300"
                />
                {errors.lastName && touched.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

              {/* ایمیل */}
              <div className="flex flex-col text-right">
                <label className="text-gray-600 mb-1 text-sm">ایمیل :</label>
                <Field
                  name="email"
                  className="p-3 rounded-xl bg-gray-100 border border-gray-300"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* موبایل */}
              <div className="flex flex-col text-right">
                <label className="text-gray-600 mb-1 text-sm">
                  شماره موبایل :
                </label>
                <Field
                  name="phone"
                  className="p-3 rounded-xl bg-gray-100 border border-gray-300"
                />
                {errors.phone && touched.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* دکمه‌ها */}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-7 py-2 rounded-xl shadow"
                >
                  اعمال تغییرات
                </button>

                <button
                  type="reset"
                  className="bg-gray-300 px-7 py-2 rounded-xl"
                >
                  انصراف
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* امنیت */}
      <div className="mt-16 border-t pt-10">
        <h3 className="text-lg font-semibold text-right mb-8">امنیت</h3>

        <Formik
          initialValues={{ oldPass: "", newPass: "", repeatPass: "" }}
          validationSchema={passSchema}
          onSubmit={(v) => console.log(v)}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-6">
              {/* رمز قبلی */}
              <div className="flex flex-col text-right">
                <label className="text-gray-600 mb-1 text-sm">
                  رمز عبور قبلی :
                </label>
                <Field
                  name="oldPass"
                  type="password"
                  className="p-3 rounded-xl bg-gray-100 border border-gray-300"
                />
                {errors.oldPass && touched.oldPass && (
                  <p className="text-red-500 text-sm mt-1">{errors.oldPass}</p>
                )}
              </div>

              {/* جدید */}
              <div className="flex flex-col text-right">
                <label className="text-gray-600 mb-1 text-sm">
                  رمز عبور جدید :
                </label>
                <Field
                  name="newPass"
                  type="password"
                  className="p-3 rounded-xl bg-gray-100 border border-gray-300"
                />
                {errors.newPass && touched.newPass && (
                  <p className="text-red-500 text-sm mt-1">{errors.newPass}</p>
                )}
              </div>

              {/* تکرار */}
              <div className="flex flex-col text-right">
                <label className="text-gray-600 mb-1 text-sm">
                  تکرار رمز عبور :
                </label>
                <Field
                  name="repeatPass"
                  type="password"
                  className="p-3 rounded-xl bg-gray-100 border border-gray-300"
                />
                {errors.repeatPass && touched.repeatPass && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.repeatPass}
                  </p>
                )}
              </div>

              {/* دکمه‌ها */}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-7 py-2 rounded-xl shadow"
                >
                  اعمال تغییرات
                </button>

                <button
                  type="reset"
                  className="bg-gray-300 px-7 py-2 rounded-xl"
                >
                  انصراف
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
