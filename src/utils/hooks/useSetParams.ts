"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const useSetParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setParams(
    key: string,
    value: string | number | boolean | undefined | null
  ) {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== undefined && value !== "" && value !== null) {
      params.set(key, String(value));
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  }
  function getParams(key: string, fullBack: string = "") {
    return searchParams.get(key) ?? fullBack;
  }
  return { setParams, getParams };
};
