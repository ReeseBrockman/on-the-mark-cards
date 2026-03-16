export default function SellPage() {
  return (
    <div className="bg-black min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-2">
          Sell Us Your Cards
        </h1>
        <div className="border-t border-yellow-400 pt-8 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left - Info */}
            <div>
              <p className="text-gray-400 text-sm mb-8">
                Looking to sell your collection? We buy singles, lots, and
                collections of all sizes. Bring your cards in store and we'll
                make you an offer on the spot.
              </p>

              <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-4">
                WHAT WE BUY
              </h2>
              <ul className="flex flex-col gap-2 mb-8">
                <li className="text-white text-sm flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> Sports Cards —
                  Singles, Sets, and Lots
                </li>
                <li className="text-white text-sm flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> Pokemon Cards —
                  Singles and Sealed
                </li>
                <li className="text-white text-sm flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> Magic The Gathering
                </li>
                <li className="text-white text-sm flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> One Piece Cards
                </li>
                <li className="text-white text-sm flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> Lorcana Cards
                </li>
                <li className="text-white text-sm flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> Graded Cards (PSA,
                  BGS, SGC)
                </li>
                <li className="text-white text-sm flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> Sealed Boxes and
                  Cases
                </li>
              </ul>

              <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-4">
                HOW IT WORKS
              </h2>
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 font-bold text-lg">1</span>
                  <p className="text-white text-sm">
                    Bring your cards into the store during business hours.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 font-bold text-lg">2</span>
                  <p className="text-white text-sm">
                    Our team will review and evaluate your collection.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 font-bold text-lg">3</span>
                  <p className="text-white text-sm">
                    We'll make you a cash or store credit offer on the spot.
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=2527+W+Kennewick+Ave,+Kennewick,+WA+99336"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-400 text-black font-bold px-6 py-3 hover:bg-yellow-300 transition-colors"
              >
                Get Directions
              </a>
            </div>

            {/* Right - Hours */}
            <div>
              <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-6">
                STORE HOURS
              </h2>
              <div className="flex flex-col gap-2 mb-8">
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <p className="text-white text-sm">Monday - Saturday</p>
                  <p className="text-yellow-400 text-sm">11:00 AM - 6:00 PM</p>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <p className="text-white text-sm">Sunday</p>
                  <p className="text-yellow-400 text-sm">12:00 PM - 4:00 PM</p>
                </div>
              </div>

              <div className="border border-gray-800 p-6 rounded">
                <p className="text-yellow-400 text-sm font-bold mb-2">
                  Have Questions?
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  Contact us before bringing in a large collection and we can
                  help you prepare.
                </p>
                <a
                  href="mailto:hello@thecollectorscorner.com"
                  className="text-yellow-400 hover:underline text-sm"
                >
                  hello@thecollectorscorner.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
