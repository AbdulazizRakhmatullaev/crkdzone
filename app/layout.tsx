import "./globals.css";
import { InitDataProvider } from "./contexts/initData";
import LayoutContent from "./components/lytCon";

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Crackedzone',
  
}

export const generateViewport = () => ({
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
});

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