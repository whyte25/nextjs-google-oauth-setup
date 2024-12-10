# Google OAuth Integration in Next.js

This guide walks you through integrating Google OAuth directly into a Next.js application using @react-oauth/google. It covers setup, implementation, and route protection without using NextAuth.

## Table of Contents

- [Dependencies](#dependencies)
- [Setting Up Google OAuth](#setting-up-google-oauth)
- [API Integration](#api-integration)
- [Creating Hooks](#creating-hooks)
- [Login Page](#login-page)
- [Handling Login and Logout](#handling-login-and-logout)
- [Middleware for Route Protection](#middleware-for-route-protection)

## Dependencies

First, install the necessary dependencies:

```bash
npm install @react-oauth/google react-query react-cookie js-cookie jose
```

## Setting Up Google OAuth

### Configuring Google Cloud Console

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to "APIs & Services" > "Credentials".
4. Click "Create Credentials" and select "OAuth client ID".
5. Choose "Web application" as the application type.
6. Add authorized JavaScript origins (e.g., http://localhost:3000 for development).
7. Add authorized redirect URIs (e.g., http://localhost:3000/api/auth/callback/google).
8. Note down the Client ID and Client Secret.

### Wrapping the App with GoogleOAuthProvider

In your `_app.tsx` or a layout component, wrap your app with the `GoogleOAuthProvider`:

```tsx
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      {children}
    </GoogleOAuthProvider>
  );
}
```

## API Integration

### Setting Up the Endpoint

Define the endpoint for Google OAuth login in your API routes:

```typescript
// pages/api/auth/google-login.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { token } = req.body;
    // Verify the token with Google
    // If valid, create a session or JWT for your app
    // Return the session token or JWT
    res.status(200).json({ message: 'Login successful', token: 'your_app_token' })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method \${req.method} Not Allowed`)
  }
}
```

### Creating the API Request Function

```typescript
// services/api/google-login.ts
import axios from 'axios';

export const googleLogin = (payload: { token: string }) => {
  return axios.post('/api/auth/google-login', payload);
};
```

## Creating Hooks

Create a hook to handle Google login:

```typescript
// hooks/useGoogleLogin.ts
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { googleLogin } from "@/services/api/google-login";
import { toast } from "sonner";

export default function useGoogleLogin() {
  const router = useRouter();
  const [_, setCookie] = useCookies(["token"]);

  return useMutation({
    mutationFn: googleLogin,
    onSuccess: (result) => {
      const { token } = result.data;
      setCookie("token", token, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      toast.success("Login successful");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
}
```

## Login Page

Set up the login page with Google login functionality:

```tsx
// pages/login.tsx
import { GoogleLogin } from "@react-oauth/google";
import useGoogleLogin from "@/hooks/useGoogleLogin";

const LoginPage = () => {
  const { mutate: googleLoginMutate } = useGoogleLogin();

  const handleGoogleSuccess = (credentialResponse: any) => {
    googleLoginMutate({ token: credentialResponse.credential });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
};

export default LoginPage;
```

## Handling Login and Logout

Create a hook for handling login state and logout:

```typescript
// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { useRouter } from 'next/router';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token", {
      path: "/",
      secure: true,
      sameSite: "strict",
    });
    setIsLoggedIn(false);
    router.push('/login');
  };

  return {
    isLoggedIn,
    handleLogout,
  };
};
```

## Middleware for Route Protection

Set up middleware to protect routes:

```typescript
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verify the token (this is a simplified example, adjust according to your token structure)
    const decoded = jose.decodeJwt(token.value);
    if (!decoded || decoded.exp! * 1000 < Date.now()) {
      throw new Error('Token expired');
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
```

This middleware checks for the presence and validity of the token, redirecting to the login page if necessary.

## Customization

Feel free to modify the code to suit your specific requirements. Replace placeholder paths, endpoints, and any specific logic to match your application's needs.

By following these steps, you can integrate Google OAuth directly into your Next.js application, manage authentication state with cookies, and protect your routes using middleware.
```
