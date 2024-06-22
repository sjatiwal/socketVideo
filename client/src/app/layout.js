"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { useSelector } from "react-redux";
import Loginsignup from "@/pages/loginsignup";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className={inter.className}>
      {isAuthenticated ? (
        <>
          <Header />
          <div>{children}</div>
        </>
      ) : (
        <Loginsignup />
      )}
    </div>
  );
}
