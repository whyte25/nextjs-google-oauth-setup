import "regenerator-runtime/runtime";
import type { Metadata } from "next";
import "./globals.css";
import "@/styles/nprogress.css";
import "react-circular-progressbar/dist/styles.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import NProgress from "nprogress";
import AppProvider from "./Provider/Provider";
import Interceptor from "./Provider/interceptor";
import Script from "next/script";
import { siteConfig } from "@/constant/site";

export const metadata: Metadata = {
  title: {
    template: `%s - ${siteConfig.name}`,
    default: siteConfig.name,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: {
      template: `%s - ${siteConfig.name}`,
      default: siteConfig.name,
    },
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.name.toLocaleLowerCase()}`,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  // manifest: `${siteConfig.url}/site.webmanifest`,
};

NProgress.configure({
  easing: "ease",
  speed: 500,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://accounts.google.com/gsi/client" async defer />
      <body className="!bg-white">
        <AppProvider>
          <Interceptor>{children}</Interceptor>
        </AppProvider>
      </body>
    </html>
  );
}
