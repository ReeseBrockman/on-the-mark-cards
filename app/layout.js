import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "./context/CartContext";
import Script from "next/script";

export const metadata = {
  title: "On The Marq",
  description: "Shop Sports Cards, TCG, Funko, and Supplies at On The Marq",
  openGraph: {
    title: "On The Marq",
    description: "Shop Sports Cards, TCG, Funko, and Supplies at On The Marq",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    url: "https://tcc-rework.vercel.app",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/yht3vni.css" />
      </head>
      <body className="bg-black min-h-screen flex flex-col">
        <Script
          src="https://sandbox.web.squarecdn.com/v1/square.js"
          strategy="beforeInteractive"
        />
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
      <Script
        src="https://w.behold.so/widget.js"
        type="module"
        strategy="afterInteractive"
      />
    </html>
  );
}
