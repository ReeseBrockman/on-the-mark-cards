export default function LiveSellingPage() {
  return (
    <div className="bg-black min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-2">
          Live Selling & Breaking
        </h1>
        <div className="border-t border-yellow-400 pt-8 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left - Info */}
            <div>
              <p className="text-gray-400 text-sm mb-8">
                Join us live for box breaks, pack openings, and special live
                selling events. Watch in real time and purchase spots to get in
                on the action.
              </p>

              <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-4">
                WHAT WE OFFER
              </h2>
              <ul className="flex flex-col gap-2 mb-8">
                <li className="text-white text-sm flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> Live Box Breaks
                </li>
                <li className="text-white text-sm flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> Pack Openings
                </li>
                <li className="text-white text-sm flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> Random Team Breaks
                </li>
                <li className="text-white text-sm flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> Pick Your Team
                  Breaks
                </li>
                <li className="text-white text-sm flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> Live Singles
                  Auctions
                </li>
              </ul>

              <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-4">
                WHERE TO WATCH
              </h2>
              <div className="flex flex-col gap-3 mb-8">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-gray-800 px-4 py-3 hover:border-yellow-400 transition-colors rounded"
                >
                  <span className="text-2xl">▶️</span>
                  <div>
                    <p className="text-white text-sm font-bold">YouTube</p>
                    <p className="text-gray-400 text-xs">
                      Subscribe for live stream notifications
                    </p>
                  </div>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-gray-800 px-4 py-3 hover:border-yellow-400 transition-colors rounded"
                >
                  <span className="text-2xl">📸</span>
                  <div>
                    <p className="text-white text-sm font-bold">Instagram</p>
                    <p className="text-gray-400 text-xs">
                      Follow us for live selling announcements
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right */}
            <div>
              <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-6">
                UPCOMING BREAKS
              </h2>
              <div className="border border-gray-800 p-8 text-center rounded mb-6">
                <p className="text-4xl mb-4">📦</p>
                <p className="text-white text-lg font-bold mb-2">
                  No Upcoming Breaks
                </p>
                <p className="text-gray-500 text-sm">
                  Follow us on social media to get notified about upcoming
                  breaks!
                </p>
              </div>

              <div className="border border-gray-800 p-6 rounded">
                <p className="text-yellow-400 text-sm font-bold mb-2">
                  Want to be notified?
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  Sign up for our newsletter to get notified about upcoming live
                  events.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="flex-1 bg-gray-900 text-white text-sm px-3 py-2 border border-gray-700 focus:border-yellow-400 outline-none"
                  />
                  <button className="bg-yellow-400 text-black text-sm font-bold px-4 py-2 hover:bg-yellow-300 transition-colors">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
