markdown
Copy code

# Google OAuth Integration in Next.js with NextAuth

## Dependencies

First, install the necessary dependencies:

```bash
npm install jose react-cookie js-cookie
Setting Up Google OAuth
Wrapping the App with GoogleOAuthProvider
We start by wrapping our app with the GoogleOAuthProvider, providing the Google Client ID.

typescript
Copy code
import type { Metadata } from "next";
import "../globals.css";
import "@/styles/nprogress.css";
import { NavBar } from "./_components/NavBar";
import { BottomBar } from "./_components/BottomBar";
import { siteConfig } from "@/constant/site";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        {children}
      </GoogleOAuthProvider>
      <BottomBar />
    </div>
  );
}
Setting Up the Endpoint and Request
Define the endpoint for Google OAuth login:

typescript
Copy code
// AUTH
export const GOOGLE_LOGIN = "/auth/login/google";
Next, create the POST request for the Google login. Here, we use react-query for making the request, but you can use any fetch library of your choice (like Axios, Fetch API, etc.):

typescript
Copy code
import { GOOGLE_LOGIN } from "../endpoints";
import { instance } from "../instance";

export const googleLogin = (payload) => {
  return instance.post(GOOGLE_LOGIN, payload);
};
Creating the Hook
Create a hook to handle Google login:

typescript
Copy code
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "react-cookie";
import { googleLogin } from "@/services/api/google-login";
import { toast } from "sonner";

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
This hook stores the token in cookies upon successful login and redirects the user to their intended page or the dashboard.

Login Page
Set up the login page with Google login functionality:

typescript
Copy code
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

const CreateAcc = () => {
  const formOptions = { resolver: yupResolver(schema) };
  const { register, formState: { errors }, handleSubmit } = useForm(formOptions);

  const submitSignupForm = (data) => {
    mutate(data);
  };

  const googleSuccess = async (credentialResponse) => {
    googleMutate({ token: credentialResponse?.credential });
  };

  const googleError = () => {
    toast.error("Google auth failed", { toastId: toastID });
  };

  return (
    <div style={{ backgroundColor: "#051E68" }} className="auth px-8 lg:px-0">
      <div className="pt-8">
        <form onSubmit={handleSubmit(submitSignupForm)} method="post" className="text-left py-20">
          <span className="flex justify-center text-white my-10">
            <span className="border border-white rounded-xl cursor-pointer p-4">
              <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
            </span>
          </span>
        </form>
      </div>
    </div>
  );
};

export default CreateAcc;
This component uses the Google login button, and upon successful login, it retrieves the user's credentials, including the token.

Handling Login and Logout
Create a hook for handling login state and logout:

typescript
Copy code
import Cookies from "js-cookie";
import { toast } from "sonner";

export const useLogin = () => {
  const token = Cookies.get("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    Cookies.remove("token", {
      path: "/",
      secure: true,
      sameSite: "strict",
    });
    window.location.reload();
  };

  return {
    isLoggedIn,
    handleLogout,
    token,
  };
};
This hook manages the token and provides a logout function that clears the token and reloads the page.

Middleware for Route Protection
Set up middleware to protect routes:

typescript
Copy code
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); // Ensure the correct method to get cookies

  // Check if token is not present
  if (!token) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
    );
  }

  // Decode the token
  const decoded = jose.decodeJwt(token?.value);

  // Check if the token is invalid or expired
  if (!decoded || decoded.exp! * 1000 < Date.now()) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     */
    "/((?!api|_next/static|_next/image|favicon.ico|privacy-policy|terms-of-service|login|signup|jobs/:path).*)",
  ],
};
Middleware Explanation
Token Check: The middleware checks if a token is present in the cookies.
Redirection: If no token is found, it redirects the user to the login page, including the current path in the query string (from parameter) so that the user can be redirected back after logging in.
Token Validation: The middleware decodes the token to check its validity and expiration. If the token is invalid or expired, the user is redirected to the login page.
Matcher Configuration: The matcher ensures that the middleware runs for all paths except for specified routes like API routes, static files, and public pages such as login, signup, etc.
Customization
Feel free to modify the code to suit your own scenario and setup. Replace placeholder paths, endpoints, and any specific logic to match your application's requirements.

By following these steps, you can integrate Google OAuth into your Next.js application, manage authentication state with cookies, and protect your routes using middleware.

```
