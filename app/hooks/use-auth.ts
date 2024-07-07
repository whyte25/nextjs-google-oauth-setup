import Cookies from "js-cookie";
import { toast } from "sonner";

export const useLogin = () => {
  const token = Cookies.get("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    // Removing the token ensures the middleware blocks unauthorized access.
    // see middleware.ts file
    Cookies.remove("token", {
      path: "/",
      secure: true,
      sameSite: "strict",
    });

    // If the user logs out or receives a 401 error, the token is deleted.
    // The middleware only allows requests with a valid token.
    // Reloading the page enforces these changes.
    window.location.reload();
  };

  return {
    isLoggedIn,
    handleLogout,
    token,
  };
};
