export const generateViewport = () => ({
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
});

import Navbar from "./components/navbar";
import ToTopBtn from "./components/toTopBtn";
import "./globals.css";
import { UserProvider } from "./contexts/user";
import { LayoutProvider } from "./contexts/layoutCon"; // Note: Removed useLayout here

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const fullHeight = useLayout();
  // const [loading, setLoading] = useState(true);
  // const [platform, setPlatform] = useState<string | null>(null);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://telegram.org/js/telegram-web-app.js";
  //   script.async = true;

  //   script.onload = () => {
  //     if (window?.Telegram?.WebApp) {
  //       const webApp = window.Telegram?.WebApp;

  //       webApp.ready();
  //       webApp.expand();
  //       webApp.disableVerticalSwipes();
  //       setPlatform(webApp.platform);
  //     };
  //   };

  //   document.head.appendChild(script);

  //   if (process.env.NODE_ENV === "production") {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1600);
  //   } else {
  //     setLoading(false);
  //   }

  // }, []);

  // const setPlatformStyle = () => {
  //   if (window.Telegram?.WebApp) {
  //     const platform = window.Telegram.WebApp.platform;
  //     return platform === "ios" || platform === "android" ? "phn" : "dsk";
  //   }
  // };

  return (
    <html lang="en">
      <body>
        <div className="grid-top"></div>
        <LayoutProvider>
          <main id="main">
            <UserProvider>
              <div
                id="mainCon"
                className="phn"
              >
                {children}
                <ToTopBtn className="phn" />
              </div>
            </UserProvider>
            <nav id="navbar">
              <Navbar />
            </nav>
          </main>
        </LayoutProvider>
        <div className="grid-bottom"></div>
      </body>
    </html>
  );
}
