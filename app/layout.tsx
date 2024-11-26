export const generateViewport = () => ({
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
});

import "./globals.css";
import { InitDataProvider } from "./contexts/initData";
import LayoutContent from "./components/lytCon";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <InitDataProvider>
          <LayoutContent>{children}</LayoutContent>
        </InitDataProvider>
      </body>
    </html>
  );
}