// app/layout.tsx
"use client";

import React, { createContext, useState, useEffect } from "react";
import Head from "next/head";
import Loading from './components/loading';
import Navbar from "./components/navbar";
import ToTopBtn from "./components/toTopBtn";
import "./globals.css";

interface User {
  id: number;
  tg_id: number;
  username: string;
  balance: number;
  friends: number;
  authDate: Date;
}

export const UserContext = createContext<User | null>(null);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState<string | null>(null);
  const [tgId, setTgId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

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

        if (initData) {
          const params = new URLSearchParams(initData);
          const userId = params.get("user") ? JSON.parse(params.get("user")!).id : null;
          const username = params.get("username") ? JSON.parse(params.get("username")!) : null;

          setTgId(userId);
          setUsername(username);
        }

        setPlatform(webApp.platform);
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Fetch user data when tgId and username are set
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const initializeUser = async () => {
        try {
          const res = await fetch("/api/check-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tgId, username })
          });

          if (!res.ok) throw new Error("Error checking or creating user");
          const userData = await res.json();
          setUser(userData);
        } catch (error) {
          console.error(error);
        }
      };

      initializeUser();
    }

    setLoading(false);
  }, [tgId, username]);

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
            <div id="main">
              <div id="mainCon" className={setPlatformStyle()}>
                <UserContext.Provider value={user}>
                  {children}
                </UserContext.Provider>
                <ToTopBtn />
              </div>
              <nav id="navbar" className={setPlatformStyle()}>
                <Navbar />
              </nav>
            </div>
        )}
        </body>
    </html>
  );
}