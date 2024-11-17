"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Loading from "./components/loading";
import Navbar from "./components/navbar";
import ToTopBtn from "./components/toTopBtn";
import "./globals.css";
import { UserProvider } from "./contexts/user";
import { LayoutProvider, useLayout } from "./contexts/layoutCon"; // Note: Removed useLayout here

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
      const webApp = window.Telegram?.WebApp;
      const pF = webApp.platform;

      webApp.expand();
      webApp.disableVerticalSwipes();

      if (pF === "ios" || pF === "android") {
        webApp.requestFullscreen();
      }

      setPlatform(pF);
    };

    document.head.appendChild(script);

    setTimeout(() => {
      setLoading(false);
    }, 500);

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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <body>
        {loading ? (
          <Loading />
        ) : (
            <UserProvider>
            <LayoutProvider>
              <Content setPlatformStyle={setPlatformStyle}>{children}</Content>
            </LayoutProvider>
          </UserProvider>
        )}
      </body>
    </html>
  );
}

function Content({
  setPlatformStyle,
  children,
}: {
  setPlatformStyle: () => string;
  children: React.ReactNode;
}) {
  const { fullHeight } = useLayout();

  return (
    <main id="main">
      <nav id="navbar" className={setPlatformStyle()}>
        <Navbar />
      </nav>
      <div
        id="mainCon"
        className={`${setPlatformStyle()}${fullHeight ? " h-full" : ""}`}
      >
        {children}
        <ToTopBtn className={setPlatformStyle()} />
      </div>
    </main>
  );
}
