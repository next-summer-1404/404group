"use client";

import { useEffect } from "react";
import { useAccessToken } from "../utils/hooks/getAccessToken";
import { setClientToken } from "../services/api/interceptor/interceptor";

export default function AxiosProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAccessToken();

  useEffect(() => {
    setClientToken(token || null);
  }, [token]);

  return <>{children}</>;
}
