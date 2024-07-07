import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../use-auth";

import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "react-cookie";
import { googleLogin } from "@/services/api/google-login";

export default function useGoogleLogin() {
  const searchParams = useSearchParams();
  const from = searchParams.toString();
  const decodedUrlString = decodeURIComponent(from);
  const filteredRoute = decodedUrlString.replace(/from=/, "");
  const [_, setCookie] = useCookies(["token"]);

  return useMutation({
    mutationFn: googleLogin,
    onSuccess: (result) => {
      const res = result?.data?.data;
      setCookie("token", res.token, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      toast.success(result.data.message);

      if (from) {
        window.location.href = `${filteredRoute}`;
      } else {
        window.location.href = "/dashboard";
      }
    },
    onError: (error) => {
      if (error.response?.data.message) {
        toast.error(`${error.response?.data.message}`);
      }
    },
  });
}
