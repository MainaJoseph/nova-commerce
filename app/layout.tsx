import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";
import Navy from "./components/navy/Navy";
import CartProvider from "@/providers/CartProvider";
//import toast, { Toaster } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Nova",
  description: "Shop with us beyond borders",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Navy />
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
