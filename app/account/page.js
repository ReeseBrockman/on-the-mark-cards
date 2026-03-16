"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orderSearch, setOrderSearch] = useState("");
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

  const filteredOrders = orderSearch
    ? orders.filter((order) =>
        order.lineItems?.some((item) =>
          item.name?.toLowerCase().includes(orderSearch.toLowerCase()),
        ),
      )
    : orders;

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const memberSince = new Date(user?.created_at).getFullYear();

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
            {/* Account Info + Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Account Info */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white text-xl font-bold">Account Info</h2>
                </div>
                <div className="border-t border-gray-800 pt-4">
                  <p className="text-white text-sm mb-1">
                    Email: {user?.email}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Member since {memberSince}
                  </p>
                </div>
              </div>

              {/* Default Address */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white text-xl font-bold">
                    Default Address
                  </h2>
                </div>
                <div className="border-t border-gray-800 pt-4">
                  <p className="text-gray-500 text-sm">
                    You don't have any saved addresses.
                  </p>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div>
              <h2 className="text-white text-xl font-bold mb-4">
                Order History
              </h2>
              <div className="border-t border-gray-800 pt-4">
                <input
                  type="text"
                  placeholder="Search orders by product..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full bg-transparent text-white text-sm px-4 py-3 border border-gray-700 focus:border-yellow-400 outline-none mb-6"
                />

                {ordersLoading && (
                  <div className="flex flex-col gap-3">
                    {[1, 2].map((i) => (
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

                {!ordersLoading && filteredOrders.length === 0 && (
                  <p className="text-gray-500 text-sm">
                    No matching orders found.
                  </p>
                )}

                {!ordersLoading && filteredOrders.length > 0 && (
                  <div className="flex flex-col gap-4">
                    {filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-gray-900 border border-gray-800 p-6 rounded"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-gray-400 text-xs mb-1">
                              ORDER ID
                            </p>
                            <p className="text-white text-sm font-mono">
                              {order.id}
                            </p>
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
                                      parseInt(item.totalMoney?.amount || 0) /
                                      100
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
        </div>
      </div>
    </div>
  );
}
