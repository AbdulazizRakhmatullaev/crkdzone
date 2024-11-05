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
            <div id="main">
                <div id="mainCon" className={setPlatformStyle()}>
                  {/* {initData}
                  -
                  {dataUnsafe?.user?.first_name} - {dataUnsafe?.user?.last_name} <br />
                  {dataUnsafe?.user?.id} <br />
                  {dataUnsafe?.user?.language_code} <br />
                  {dataUnsafe?.user?.photo_url} <br />

                  {dataUnsafe?.user?.username} - {noUsername} <br />
                  {dataUnsafe?.auth_date} <br />
                  {dataUnsafe?.query_id} <br /> */}
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