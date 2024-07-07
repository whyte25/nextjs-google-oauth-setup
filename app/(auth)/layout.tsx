
import { GoogleOAuthProvider } from "@react-oauth/google";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-screen">
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        {children}
         </QueryClientProvider>
        <BottomBar />
      </div>
    </>
  );
}
