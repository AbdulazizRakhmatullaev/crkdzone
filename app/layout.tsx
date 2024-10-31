"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "./components/navbar";
import ToTopBtn from "./components/toTopBtn";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState<string | null>(null);
  const [tgId, setTgId] = useState<number>(0);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Create script element and load it
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

    // Cleanup function to remove script if component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const createUser = async () => {
        try {
          const res = await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tg_id: tgId,
              username: username
            })
          });

          if (!res.ok) {
            throw new Error("Failed to create a user.")
          }

          const data = await res.json();
          console.log(data.message);
        } catch (err) {
          console.error("Failed to create a user", err);
        }
      }

      createUser();
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
        {" "}
        {loading ? (
          <div className="loadcol">
            <svg
              className="spinner"
              height="100%"
              viewBox="0 0 32 32"
              width="100%"
            >
              <circle
                cx="16"
                cy="16"
                fill="none"
                r="14"
                strokeWidth="2"
                style={{ stroke: "rgb(255, 255, 255)", opacity: 0.2 }}
              ></circle>
              <circle
                cx="16"
                cy="16"
                fill="none"
                r="14"
                strokeWidth="2"
                style={{
                  stroke: "rgb(255, 255, 255)",
                  strokeDasharray: 80,
                  strokeDashoffset: 60,
                }}
              ></circle>
            </svg>
          </div>
        ) : (
          <div id="main">
            <div id="mainCon" className={setPlatformStyle()}>
                {tgId}
                {username}
              {children}
              <ToTopBtn />
            </div>
            <nav id="navbar" className={setPlatformStyle()}>
              <div className="navgrid"></div>
              <Navbar />
            </nav>
          </div>
        )}
      </body>
    </html>
  );
}
