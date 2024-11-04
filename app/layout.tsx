// app/layout.tsx
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
  username: string | null;
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
  // const [tgId, setTgId] = useState<number | null>(null);
  // const [username, setUsername] = useState<string | null>(null);
  const [initData, setInitData] = useState<string | null>(null);
  const [dataUnsafe, setDataUnsafe] = useState<initDataUnsafe | null>(null);
  const [noUsername, setNoUsername] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;

    script.onload = () => {
      if (window.Telegram?.WebApp) {
        const webApp = window.Telegram?.WebApp; 
        webApp.expand();
        webApp.disableVerticalSwipes();

        const initData = webApp?.initData;
        const dataUnsafe = webApp?.initDataUnsafe;

        if (dataUnsafe.user?.username === null) setNoUsername(null);

        setInitData(initData);
        setDataUnsafe(dataUnsafe)

        // if (initData) {
        //   const params = new URLSearchParams(initData);
        //   const userId = params.get("user") ? JSON.parse(params.get("user")!).id : null;
        //   const username = params.get("user") ? JSON.parse(params.get("user")!).username : null;

        //   setTgId(userId);
        //   setUsername(username);
        // }

        setPlatform(webApp.platform);
      }

      setLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);


  // // Fetch user data when tgId and username are set
  // useEffect(() => {
  //   if (window.Telegram?.WebApp) {
  //     const initializeUser = async () => {
  //       try {
  //         const res = await fetch("/api/check-user", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ tgId, username })
  //         });

  //         if (!res.ok) throw new Error("Error checking or creating user");
  //         const userData = await res.json();
  //         setUser(userData);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     initializeUser();
  //   }

  //   setLoading(false);
  // }, [tgId, username]);

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
                  {initData}
                  -
                  {dataUnsafe?.user?.first_name} - {dataUnsafe?.user?.last_name} <br />
                  {dataUnsafe?.user?.id} <br />
                  {dataUnsafe?.user?.language_code} <br />
                  {dataUnsafe?.user?.photo_url} <br />

                  {dataUnsafe?.user?.username} - {noUsername} <br />
                  {dataUnsafe?.auth_date} <br />
                  {dataUnsafe?.query_id} <br />
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