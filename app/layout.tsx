import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "sonner";
import SignUpNav from "./components/nav/SignUpNav";

import { getCurrentUser } from "@/actions/getCurrentUser";
import Frequents from "./components/faqs/Frequents";
import Playstore from "./components/playstore/Play";
import ChatWidget from "./components/support/ChatWidget";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Nova",
  description: "Shop with us beyond borders",
};

export default async function RootLayout({
  children,
  shop,
}: {
  children: React.ReactNode;
  shop: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster position="top-right" theme="light" richColors />

        <CartProvider>
          <div className="flex min-h-screen flex-col">
            {!currentUser && <SignUpNav />}
            <NavBar />
            <main className="flex-grow">
              {shop}
              {children}
            </main>
            <Frequents />
            <Playstore />
            <Footer />
            <ChatWidget currentUser={currentUser} />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
