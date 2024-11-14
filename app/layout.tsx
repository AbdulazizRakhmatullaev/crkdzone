"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Loading from './components/loading';
import Navbar from "./components/navbar";
import ToTopBtn from "./components/toTopBtn";
import "./globals.css";
import { UserProvider } from "./components/user"

interface WebAppUser {
  id: number;
  username: string | undefined;
  first_name: string;
  last_name?: string;
  photo_url?: string;
  language_code?: string;
}

interface initDataUnsafe {
  user?: WebAppUser;
  query_id?: string;
  auth_date?: number;
  hash?: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState<string | null>(null);
  const [initDataUnsafe, setInitDataUnsafe] = useState<initDataUnsafe | null>(null);
  const [tgId, setTgId] = useState<number | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;

    script.onload = () => {
      if (window.Telegram?.WebApp) {
        const webApp = window.Telegram?.WebApp; 
        const initDataUnsafe = webApp.initDataUnsafe;
        const initData = webApp.initData;
        
        webApp.expand();

        if (initData) {
          const params = new URLSearchParams(initData);
          const tg_id = params.get("user") ? JSON.parse(params.get("user")!).id : null;

          setTgId(tg_id);
        }

        webApp.disableVerticalSwipes();

        setInitDataUnsafe(initDataUnsafe);
        setPlatform(webApp.platform);
      }
    };

    setLoading(false);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    }
  }, []);

  const setPlatformStyle = () => {
    return platform === "ios" || platform === "android" ? "phn" : "dsk";
  };


  return (
    <UserProvider>
      <html lang="en">
        <body>
          {loading ? (
            <Loading />
          ) : (
              <div id="main">
                <div id="mainCon" className={setPlatformStyle()}>
                  name: {initDataUnsafe?.user?.first_name} {initDataUnsafe?.user?.last_name} <br />
                  tg_id: {initDataUnsafe?.user?.id} <br />
                  username: {initDataUnsafe?.user?.username} <br />
                  tg_id_initData: {tgId}
                  {children}
                  <ToTopBtn className={setPlatformStyle()} />
                </div>
                <nav id="navbar" className={setPlatformStyle()}>
                  <Navbar />
                </nav>
              </div>
          )}
        </body>
      </html>
    </UserProvider>
  );
}