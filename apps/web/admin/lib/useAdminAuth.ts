import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { clearToken, getToken } from "./api";

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }
    setAuthenticated(true);
  }, [router]);

  const logout = () => {
    clearToken();
    router.push("/login");
  };

  return { authenticated, logout };
}
