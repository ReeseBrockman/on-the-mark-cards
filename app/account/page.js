"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
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
        fetchOrders(session.user.email);
      }
      setLoading(false);
    }
    getUser();
  }, []);

  async function fetchOrders(email) {
    setOrdersLoading(true);
    try {
      const res = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setOrdersLoading(false);
    }
  }

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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

          {/* Quick Stats */}
          <div className="border border-gray-800 p-6">
            <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-4">
              OVERVIEW
            </h2>
            <p className="text-gray-400 text-sm mb-1">Total Orders</p>
            <p className="text-white text-2xl font-bold">{orders.length}</p>
          </div>
        </div>

        {/* Order History */}
        <div>
          <h2 className="text-white text-xl font-bold mb-6 border-l-4 border-yellow-400 pl-4">
            Order History
          </h2>

          {ordersLoading && (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-900 border border-gray-800 p-4 rounded animate-pulse"
                >
                  <div className="bg-gray-800 h-4 w-32 rounded mb-2"></div>
                  <div className="bg-gray-800 h-4 w-24 rounded"></div>
                </div>
              ))}
            </div>
          )}

          {!ordersLoading && orders.length === 0 && (
            <div className="border border-gray-800 p-8 text-center">
              <p className="text-gray-500 text-sm mb-4">
                You haven't placed any orders yet.
              </p>
              <Link
                href="/"
                className="bg-yellow-400 text-black font-bold px-6 py-3 hover:bg-yellow-300 transition-colors text-sm"
              >
                Start Shopping
              </Link>
            </div>
          )}

          {!ordersLoading && orders.length > 0 && (
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-gray-900 border border-gray-800 p-6 rounded"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">ORDER ID</p>
                      <p className="text-white text-sm font-mono">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs mb-1">DATE</p>
                      <p className="text-white text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs mb-1">TOTAL</p>
                      <p className="text-yellow-400 text-sm font-bold">
                        $
                        {(
                          parseInt(order.totalMoney?.amount || 0) / 100
                        ).toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs mb-1">STATUS</p>
                      <p className="text-green-400 text-sm font-bold">
                        {order.status}
                      </p>
                    </div>
                  </div>
                  {order.lineItems.length > 0 && (
                    <div className="border-t border-gray-800 pt-4">
                      <p className="text-gray-400 text-xs mb-2">ITEMS</p>
                      <div className="flex flex-col gap-1">
                        {order.lineItems.map((item, i) => (
                          <div key={i} className="flex justify-between">
                            <p className="text-white text-xs">
                              {item.name} x{item.quantity}
                            </p>
                            <p className="text-gray-400 text-xs">
                              $
                              {(
                                parseInt(item.totalMoney?.amount || 0) / 100
                              ).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
