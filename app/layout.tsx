import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";
import Navy from "./components/navy/Navy";
import CartProvider from "@/providers/CartProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpNav from "./components/nav/SignUpNav";

import { getCurrentUser } from "@/actions/getCurrentUser";
import Frequents from "./components/faqs/Frequents";
import Playstore from "./components/playstore/Play";
import SupportClient from "./components/support/page";

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
        <ToastContainer
          position="top-center"
          className="mr-6"
          autoClose={3000}
          theme="dark"
          closeOnClick
        />

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
            <Navy />
            <Footer />
            <SupportClient currentUser={currentUser} />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
