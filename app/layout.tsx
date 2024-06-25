import type { Metadata } from "next";
import { K2D } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const k2d = K2D({
  subsets: ["latin"],
  weight: ["100", "200", "300", "500", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={k2d.className}>
        {children}
        <ToastContainer position="bottom-center" theme="dark" hideProgressBar />
      </body>
    </html>
  );
}
