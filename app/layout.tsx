"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import "./globals.css";
import Navbar from "./components/navbar";
import ToTopBtn from "./components/toTopBtn";

interface HapticFeedback {
  impactOccurred(type: "light" | "medium" | "heavy"): void;
}

// Define types for Telegram and WebApp
interface TelegramWebApp {
  ready(callback: () => void): void;
  expand(): void;
  disableVerticalSwipes(): void;
  platform: string;
  HapticFeedback: HapticFeedback;
}

interface Telegram {
  WebApp: TelegramWebApp;
}

// Extend the global window object
declare global {
  interface Window {
    Telegram: Telegram;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState<string | null>(null);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;

      setPlatform(webApp.platform);

      webApp.expand();
      webApp.disableVerticalSwipes();
    }

    setLoading(false);
  }, []);

  const setPlatformStyle = () => {
    if (platform === "ios" || platform === "android") {
      return "phn";
    } else {
      return "dsk";
    }
  };

  return (
    <>
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
              strokeWidth="4"
              style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
            ></circle>
            <circle
              cx="16"
              cy="16"
              fill="none"
              r="14"
              strokeWidth="4"
              style={{
                stroke: "rgb(29, 155, 240)",
                strokeDasharray: 80,
                strokeDashoffset: 60,
              }}
            ></circle>
          </svg>
        </div>
      ) : (
        <html lang="en">
          <Head>
            <title>Crackedzone</title>
            <script
              src="https://telegram.org/js/telegram-web-app.js"
              async
            ></script>
          </Head>
          <body>
            <div id="main">
              <div id="mainCon" className={setPlatformStyle()}>
                {children}
                <ToTopBtn />
              </div>
            </div>
            <nav id="navbar" className={setPlatformStyle()}>
              <div className="navgrid"></div>
              <Navbar />
            </nav>
            <Navbar />
          </body>
        </html>
      )}
    </>
  );
}
