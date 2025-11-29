// // src/services/common/getTokenAcc.server.ts
// import { cookies } from "next/headers";

// export const getTokenAcc = () => {
//   const cookieStore = cookies();
//   const tokenCookie = cookieStore.get("accessToken")?.value;

//   if (!tokenCookie) return null;

//   try {
//     const obj = JSON.parse(tokenCookie);
//     const data = obj.find((item: any) => item.isSelected === true);
//     return data?.token ?? null;
//   } catch (error) {
//     console.error("خطا در خواندن کوکی سمت سرور:", error);
//     return null;
//   }
// };
