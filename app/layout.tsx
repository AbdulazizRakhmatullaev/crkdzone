"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "./components/navbar";
import ToTopBtn from "./components/toTopBtn";
import "./globals.css";
import { UserProvider, useUser } from "./components/user";

const UserInitializer = () => {
  const { setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [tgId, setTgId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;

    script.onload = () => {
      if (window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp;
        webApp.expand();
        webApp.disableVerticalSwipes();

        const initData = webApp?.initData;

        if (initData) {
          const params = new URLSearchParams(initData);
          const userId = params.get("user") ? JSON.parse(params.get("user")!).id : null;
          const username = params.get("user") ? JSON.parse(params.get("user")!).username : null;

          setTgId(userId);
          setUsername(username);
        }
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (tgId && username) {
      const initializeUser = async () => {
        const res = await fetch("/api/check-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tgId, username })
        });

        if (!res.ok) {
          throw new Error("Error checking or creating user");
        }

        const userData = await res.json();
        setUser(userData);
        setLoading(false);
      };

      initializeUser();
    }
  }, [tgId, username, setUser]);

  return loading ? null : null; // Nothing needs to be rendered
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [platform, setPlatform] = useState<string | undefined>("");

  useEffect(() => {
    const setPlatformStyle = () => {
      const platform = window.Telegram?.WebApp?.platform;
      if (platform === "ios" || platform === "android") {
        setPlatform("phn")
      }
      else {
        setPlatform("dsk");
      }
    }

    setPlatformStyle();
  }, [])

  return (
    <UserProvider>
      <UserInitializer />
      <html lang="en">
        <Head>
          <title>Crackedzone</title>
        </Head>
        <body>
          <div id="main">
            <div id="mainCon" className={platform}>
              <UserDisplay />
              {children}
              <ToTopBtn />
            </div>
            <nav id="navbar" className={platform}>
              <div className="navgrid"></div>
              <Navbar />
            </nav>
          </div>
        </body>
      </html>
    </UserProvider>
  );
}

const UserDisplay = () => {
  const { user } = useUser();

  return (
    <>
      {user?.tg_id}
      {user?.username}
      {user?.balance}
      {user?.friends}
      {user?.authDate ? user.authDate.toLocaleDateString() : 'N/A'}
    </>
  );
};
