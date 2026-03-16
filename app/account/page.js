"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-white text-3xl font-bold">My Account</h1>
          <button
            onClick={handleSignOut}
            className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Account Info */}
          <div className="border border-gray-800 p-6">
            <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-4">
              ACCOUNT INFO
            </h2>
            <p className="text-gray-400 text-sm mb-1">Email</p>
            <p className="text-white text-sm mb-6">{user?.email}</p>
            <Link
              href="/account/edit"
              className="text-yellow-400 hover:underline text-sm"
            >
              Edit Profile
            </Link>
          </div>

          {/* Order History */}
          <div className="border border-gray-800 p-6">
            <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-4">
              ORDER HISTORY
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Your past orders will appear here.
            </p>
            <Link
              href="/account/orders"
              className="text-yellow-400 hover:underline text-sm"
            >
              View Orders
            </Link>
          </div>

          {/* Gift Cards */}
          <div className="border border-gray-800 p-6">
            <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-4">
              GIFT CARDS
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Check your gift card balance or purchase a new one.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/account/gift-cards"
                className="text-yellow-400 hover:underline text-sm"
              >
                Check Balance
              </Link>
              <Link
                href="/shop-info/gift-card"
                className="text-yellow-400 hover:underline text-sm"
              >
                Buy a Gift Card
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
