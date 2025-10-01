import axios, {
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
// import { getTokenAcc } from "../../common/getTokenAcc"; // تابع شما برای گرفتن توکن اضافی

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL: baseUrl,
});

// اینترسپتور پاسخ
instance.interceptors.response.use(
  (response) => response.data // فقط داده‌ها را برمی‌گرداند

  // (error) => {
  //   if (!error.response && error.message === "Network Error") {
  //     console.error(
  //       "Network Error detected, possibly due to CORS or server down"
  //     );
  //   } else if (error.response) {
  //     console.error(
  //       `HTTP Error: ${error.response.status}`,
  //       error.response.data
  //     );
  //   }
  // return Promise.reject(error);
  // }
);

// اینترسپتور درخواست برای اضافه کردن توکن

// instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   const tokenLocal =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   const tokenAcc = getTokenAcc();
//   const token = tokenLocal || tokenAcc;

//   // اطمینان از وجود headers
//   config.headers = config.headers ?? new AxiosHeaders();

//   if (token) {
//     (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
//   }

//   return config;
// });

export default instance;
