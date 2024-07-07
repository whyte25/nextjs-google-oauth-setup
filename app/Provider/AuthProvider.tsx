"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function AuthProvider() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [cookie] = useCookies(["token"]);
  const isLoggedIn = !!cookie.token;
  const token = cookie.token;

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    if (!isLoggedIn && !token) {
      router.push(`/login?from=${url}`);
    }
  }, [router, isLoggedIn, token, cookie, pathname, searchParams]);

  return null;
}
