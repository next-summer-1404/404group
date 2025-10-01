import { cookies } from "next/headers";

export const getTokenAcc = async () => {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("accounts")?.value;

  if (!tokenCookie) return null;

  try {
    const obj = JSON.parse(tokenCookie);
    const data = obj.find((item: any) => item.isSelected === true);
    return data?.token ?? null;
  } catch (error) {
    console.error("خطا در خواندن کوکی:", error);
    return null;
  }
};
