"use client";

import Link from "next/link";

export default function OrderConfirmationPage() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center px-4">
      <div className="border border-yellow-400 p-12 max-w-md w-full text-center">
        <div className="text-yellow-400 text-6xl mb-6">✓</div>
        <h1 className="text-white text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray-400 text-sm mb-8">
          Thank you for your purchase! A confirmation email will be sent to you
          shortly.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/account"
            className="w-full bg-yellow-400 text-black font-bold py-3 hover:bg-yellow-300 transition-colors"
          >
            View Order History
          </Link>
          <Link
            href="/"
            className="w-full border border-gray-700 text-gray-400 font-bold py-3 hover:border-yellow-400 hover:text-yellow-400 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
