"use client";
import NProgress from "nprogress";
import instance from "@/services/instance";
import { ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useLogin } from "@/hooks/use-login";

interface interceptor {
  children: ReactNode;
}

const Interceptor = ({ children }: interceptor) => {
  const { token, isLoggedIn, handleLogout } = useLogin();

  instance.interceptors.request.use((config) => {
    NProgress.start();
    if (isLoggedIn && token)
      Object.assign(config.headers, {
        Authorization: `Bearer ${token}`,
      });

    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      NProgress.done();
      return response;
    },
    (error) => {
      NProgress.done();
      if (error.code === "ERR_NETWORK" && error?.response?.status !== 503) {
        // handleSetNetworkError(true);
        toast.error(error?.message);
        return error;
      }

      if (
        error?.response?.status === 401 &&
        error?.response?.statusText === "Unauthorized"
      ) {
        // toast.error("Authentication failed. Please sign in.");
        handleLogout();
      }

      if (
        error?.response?.status === 401 &&
        error?.config &&
        !error?.config.__isRetryRequest
      ) {
        if (token) {
          // toast.error(error.response.data.message);
          if (
            error?.response?.data?.message ===
              "Authentication failed. Please sign in." ||
            error?.response?.data?.message ===
              "Authentication failed. Please sign in."
          ) {
            // toast.error("Authentication failed. Please sign in.");
            handleLogout();
          }
        }
      }
      if (error.message.includes("ERR_CONNECTION_REFUSED")) {
        toast.error("Failed to connect to the server: Connection refused");
      }
      if (error?.response?.status === 503 && error.code === "ERR_NETWORK") {
        error.response.data.message = "Something went wrong, Please try again!";
        toast.error(error.response.data.message);
      }
      return Promise.reject(error);
    }
  );

  return <>{children}</>;
};

export default Interceptor;
