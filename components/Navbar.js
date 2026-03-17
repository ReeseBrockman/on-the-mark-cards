"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navItems = [
  {
    label: "Sports",
    href: "/sports",
    sections: [
      {
        title: "SPORTS CARDS",
        links: [
          { label: "Baseball Singles", href: "/sports?category=Baseball" },
          { label: "Basketball Singles", href: "/sports?category=Basketball" },
          { label: "Football Singles", href: "/sports?category=Football" },
        ],
      },
      {
        title: "SPORTS BOXES",
        links: [
          { label: "Baseball Boxes", href: "/sports?category=Baseball" },
          { label: "Basketball Boxes", href: "/sports?category=Basketball" },
          { label: "Football Boxes", href: "/sports?category=Football" },
          { label: "On Sale Sports", href: "/sports?category=On Sale" },
        ],
      },
      {
        title: "SPORTS SLABS",
        links: [
          { label: "Baseball Slabs", href: "/sports?category=Baseball" },
          { label: "Basketball Slabs", href: "/sports?category=Basketball" },
          { label: "Football Slabs", href: "/sports?category=Football" },
        ],
      },
    ],
  },
  {
    label: "TCG",
    href: "/tcg",
    sections: [
      {
        title: "TCG SINGLES",
        links: [
          { label: "Pokemon Singles", href: "/tcg?category=Pokemon" },
          {
            label: "Magic The Gathering Singles",
            href: "/tcg?category=Magic The Gathering",
          },
          { label: "One Piece Singles", href: "/tcg?category=One Piece" },
          { label: "Lorcana Singles", href: "/tcg?category=Lorcana" },
        ],
      },
      {
        title: "TCG SEALED",
        links: [
          { label: "Pokemon Sealed", href: "/tcg?category=Pokemon" },
          {
            label: "Magic The Gathering Sealed",
            href: "/tcg?category=Magic The Gathering",
          },
          { label: "One Piece Sealed", href: "/tcg?category=One Piece" },
          { label: "Lorcana Sealed", href: "/tcg?category=Lorcana" },
          { label: "On Sale TCG", href: "/tcg?category=On Sale" },
        ],
      },
      {
        title: "TCG SLABS",
        links: [
          { label: "Pokemon Slabs", href: "/tcg?category=Pokemon" },
          {
            label: "Magic The Gathering Slabs",
            href: "/tcg?category=Magic The Gathering",
          },
          { label: "One Piece Slabs", href: "/tcg?category=One Piece" },
          { label: "Lorcana Slabs", href: "/tcg?category=Lorcana" },
        ],
      },
    ],
  },
  {
    label: "Funko",
    href: "/funko",
    sections: [],
  },
  {
    label: "Supplies",
    href: null,
    sections: [
      {
        title: "CARD SUPPLIES",
        links: [
          { label: "Toploaders", href: "/supplies?category=Toploaders" },
          { label: "Card Sleeves", href: "/supplies?category=Card Sleeves" },
          { label: "Binders", href: "/supplies?category=Binders" },
        ],
      },
      {
        title: "TCG SUPPLIES",
        links: [
          { label: "Deck Boxes", href: "/supplies?category=Deck Boxes" },
          { label: "Dice", href: "/supplies?category=Dice" },
          { label: "Playmats", href: "/supplies?category=Playmats" },
        ],
      },
    ],
  },
  {
    label: "Merch",
    href: "/merch",
    sections: [],
  },
  {
    label: "Shop Info",
    href: null,
    sections: [
      {
        title: "VISIT US",
        links: [
          { label: "Location & Hours", href: "/shop-info/location" },
          { label: "Events", href: "/shop-info/events" },
          { label: "Sell Us Your Cards", href: "/shop-info/sell" },
          { label: "Grading Submissions", href: "/shop-info/grading" },
        ],
      },
      {
        title: "MORE INFO",
        links: [
          { label: "Live Selling & Breaking", href: "/shop-info/live-selling" },
          {
            label: "Collectors Corner Gift Card",
            href: "/shop-info/gift-card",
          },
          { label: "FAQ", href: "/shop-info/faq" },
        ],
      },
    ],
  },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const { cartCount } = useCart();
  const searchRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="bg-black text-white w-full">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link
          href="/"
          className="text-yellow-400 font-bold text-xl tracking-wide"
        >
          The Collectors Corner
        </Link>

        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() =>
                item.sections.length > 0 && setOpenDropdown(item.label)
              }
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.sections.length > 0 ? (
                <button className="text-white hover:text-yellow-400 transition-colors text-sm font-medium">
                  {item.label}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="text-white hover:text-yellow-400 transition-colors text-sm font-medium"
                >
                  {item.label}
                </Link>
              )}

              {openDropdown === item.label && item.sections.length > 0 && (
                <div className="absolute top-full left-0 bg-black border border-yellow-400 p-4 flex gap-8 z-50 min-w-max">
                  {item.sections.map((section) => (
                    <div key={section.title}>
                      <p className="text-yellow-400 text-xs font-bold mb-2 tracking-widest">
                        {section.title}
                      </p>
                      <ul className="flex flex-col gap-1">
                        {section.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              href={link.href}
                              className="text-white hover:text-yellow-400 text-sm transition-colors"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center gap-2">
            {searchOpen && (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="bg-gray-900 text-white text-sm px-3 py-1 border border-yellow-400 outline-none w-48"
                  onBlur={() => {
                    if (!searchQuery) setSearchOpen(false);
                  }}
                />
              </form>
            )}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              🔍
            </button>
          </div>

          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("account")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href="/account"
                className="text-white hover:text-yellow-400 text-sm font-medium transition-colors"
              >
                Account
              </Link>
              {openDropdown === "account" && (
                <div className="absolute top-full right-0 bg-black border border-yellow-400 p-4 z-50 min-w-max flex flex-col gap-2">
                  <Link
                    href="/account"
                    className="text-white hover:text-yellow-400 text-sm transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/account/gift-cards"
                    className="text-white hover:text-yellow-400 text-sm transition-colors"
                  >
                    Gift Cards & Credit
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-white hover:text-yellow-400 text-sm font-medium transition-colors"
            >
              Login
            </Link>
          )}

          <Link
            href="/cart"
            className="text-white hover:text-yellow-400 transition-colors relative"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
