import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-yellow-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Store Info */}
        <div>
          <h3 className="text-yellow-400 font-bold text-lg mb-4">
            The Collectors Corner
          </h3>
          <p className="text-sm text-gray-400 mb-2">2527 W Kennewick Ave,</p>
          <p className="text-sm text-gray-400 mb-2">Kennewick, WA 99336</p>
          <p className="text-sm text-gray-400 mb-2">(509) 579-0282</p>
          <p className="text-sm text-gray-400">hello@thecollectorscorner.com</p>
        </div>

        {/* Collections */}
        <div>
          <h3 className="text-yellow-400 font-bold text-sm tracking-widest mb-4">
            COLLECTIONS
          </h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/products/sports"
                className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
              >
                Sports Cards & Boxes
              </Link>
            </li>
            <li>
              <Link
                href="/products/tcg"
                className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
              >
                TCG Cards & Boxes
              </Link>
            </li>
            <li>
              <Link
                href="/funko"
                className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
              >
                Funko
              </Link>
            </li>
            <li>
              <Link
                href="/products/supplies"
                className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
              >
                Supplies
              </Link>
            </li>
            <li>
              <Link
                href="/merch"
                className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
              >
                Merch
              </Link>
            </li>
            <li>
              <Link
                href="/shop-info/gift-card"
                className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
              >
                Gift Cards
              </Link>
            </li>
          </ul>
        </div>

        {/* Shop Info */}
        <div>
          <h3 className="text-yellow-400 font-bold text-sm tracking-widest mb-4">
            SHOP INFO
          </h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/shop-info/location"
                className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
              >
                Location & Hours
              </Link>
            </li>
            <li>
              <Link
                href="/shop-info/events"
                className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/shop-info/sell"
                className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
              >
                Sell Us Your Cards
              </Link>
            </li>
            <li>
              <Link
                href="/shop-info/grading"
                className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
              >
                Grading Submissions
              </Link>
            </li>
            <li>
              <Link
                href="/shop-info/live-selling"
                className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
              >
                Live Selling & Breaking
              </Link>
            </li>
            <li>
              <Link
                href="/shop-info/faq"
                className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h3 className="text-yellow-400 font-bold text-sm tracking-widest mb-4">
            STAY CONNECTED
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Get notified about new releases, sales, and special events.
          </p>
          <div className="flex gap-2 mb-6">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-gray-900 text-white text-sm px-3 py-2 border border-gray-700 focus:border-yellow-400 outline-none flex-1"
            />
            <button className="bg-yellow-400 text-black text-sm font-bold px-4 py-2 hover:bg-yellow-300 transition-colors">
              Sign Up
            </button>
          </div>
          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-gray-600 text-xs">
            © 2026 The Collectors Corner. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/policies/refund"
              className="text-gray-600 hover:text-yellow-400 text-xs transition-colors"
            >
              Refund Policy
            </Link>
            <Link
              href="/policies/privacy"
              className="text-gray-600 hover:text-yellow-400 text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/policies/terms"
              className="text-gray-600 hover:text-yellow-400 text-xs transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
