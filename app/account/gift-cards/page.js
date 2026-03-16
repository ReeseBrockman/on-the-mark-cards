"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default function GiftCardsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [giftCardNumber, setGiftCardNumber] = useState("");
  const [balance, setBalance] = useState(null);
  const [balanceError, setBalanceError] = useState(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function getUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    }
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleCheckBalance = async (e) => {
    e.preventDefault();
    setBalanceLoading(true);
    setBalance(null);
    setBalanceError(null);

    try {
      const res = await fetch(
        `/api/gift-cards?gan=${encodeURIComponent(giftCardNumber)}`,
      );
      const data = await res.json();

      if (data.error) {
        setBalanceError(
          "Gift card not found. Please check the number and try again.",
        );
      } else {
        setBalance(data.balance);
      }
    } catch (err) {
      setBalanceError("Something went wrong. Please try again.");
    } finally {
      setBalanceLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-48 flex-shrink-0">
            <nav className="flex flex-col gap-1">
              <Link
                href="/account"
                className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors ${pathname === "/account" ? "text-yellow-400 font-bold" : "text-gray-400 hover:text-white"}`}
              >
                <span>⌂</span> Dashboard
              </Link>
              <Link
                href="/account/gift-cards"
                className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors ${pathname === "/account/gift-cards" ? "text-yellow-400 font-bold" : "text-gray-400 hover:text-white"}`}
              >
                <span>🎁</span> Gift Cards & Credit
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-red-400 transition-colors text-left mt-8"
              >
                <span>→</span> Sign Out
              </button>
            </nav>
          </div>

          {/* Right Content */}
          <div className="flex-1">
            <h2 className="text-white text-xl font-bold mb-4">
              Gift Cards & Credit
            </h2>
            <div className="border-t border-gray-800 pt-8">
              {/* Check Balance */}
              <div className="border border-gray-800 p-8 rounded mb-6 max-w-md">
                <div className="text-4xl mb-4 text-center">🎁</div>
                <h3 className="text-white text-lg font-bold mb-2 text-center">
                  Check Gift Card Balance
                </h3>
                <p className="text-gray-400 text-sm mb-6 text-center">
                  Enter your gift card number to check your balance.
                </p>

                <form
                  onSubmit={handleCheckBalance}
                  className="flex flex-col gap-3"
                >
                  <input
                    type="text"
                    placeholder="Gift card number"
                    value={giftCardNumber}
                    onChange={(e) => setGiftCardNumber(e.target.value)}
                    required
                    className="w-full bg-gray-900 text-white text-sm px-4 py-3 border border-gray-700 focus:border-yellow-400 outline-none"
                  />
                  <button
                    type="submit"
                    disabled={balanceLoading}
                    className="w-full bg-yellow-400 text-black font-bold py-3 hover:bg-yellow-300 transition-colors disabled:opacity-50"
                  >
                    {balanceLoading ? "Checking..." : "Check Balance"}
                  </button>
                </form>

                {balance !== null && (
                  <div className="mt-4 p-4 border border-yellow-400 text-center">
                    <p className="text-gray-400 text-sm mb-1">
                      Available Balance
                    </p>
                    <p className="text-yellow-400 text-2xl font-bold">
                      ${(parseInt(balance) / 100).toFixed(2)}
                    </p>
                  </div>
                )}

                {balanceError && (
                  <div className="mt-4 bg-red-900 border border-red-500 text-red-200 text-sm px-4 py-3 rounded">
                    {balanceError}
                  </div>
                )}
              </div>

              {/* Buy a Gift Card */}
              <div className="border border-gray-800 p-8 rounded max-w-md">
                <div className="text-4xl mb-4 text-center">🛍️</div>
                <h3 className="text-white text-lg font-bold mb-2 text-center">
                  Buy a Gift Card
                </h3>
                <p className="text-gray-400 text-sm mb-6 text-center">
                  Give someone the perfect gift.
                </p>
                <Link
                  href="/shop-info/gift-card"
                  className="block w-full bg-yellow-400 text-black font-bold py-3 text-center hover:bg-yellow-300 transition-colors"
                >
                  Purchase Gift Card
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
