// app/layout.tsx
"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Loading from './components/loading';
import Navbar from "./components/navbar";
import ToTopBtn from "./components/toTopBtn";
import "./globals.css";
import { UserProvider } from "./components/user"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;

    script.onload = () => {
      if (window.Telegram?.WebApp) {
        const webApp = window.Telegram?.WebApp; 
        webApp.expand();
        webApp.disableVerticalSwipes();

        setPlatform(webApp.platform);
      }

      setLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const setPlatformStyle = () => {
    return platform === "ios" || platform === "android" ? "phn" : "dsk";
  };

  return (
      <html lang="en">
        <Head>
        <title>Crackedzone</title>
        </Head>
      <body>
        {loading ? (
          <Loading />
        ) : (
            <UserProvider>
              <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="black" />
                <g fill="white">
                  <circle cx="100" cy="60" r="10" />
                  <rect x="95" y="70" width="10" height="30" />
                  <rect x="70" y="75" width="60" height="5" />
                  <rect x="120" y="70" width="25" height="3" />
                  <rect x="92" y="100" width="5" height="20" />
                  <rect x="103" y="100" width="5" height="20" />
                </g>
              </svg>
            <div id="main">
                <div id="mainCon" className={setPlatformStyle()}>
                  {children}
                <ToTopBtn />
              </div>
              <nav id="navbar" className={setPlatformStyle()}>
                <Navbar />
              </nav>
              </div>
        </UserProvider>
        )}
        </body>
    </html>
  );
}