import Link from "next/link";

export default function GiftCardPage() {
  return (
    <div className="bg-black min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-2">Gift Cards</h1>
        <div className="border-t border-yellow-400 pt-8 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left - Info */}
            <div>
              <p className="text-gray-400 text-sm mb-8">
                Give the gift of choice! The Collectors Corner gift cards can be
                used on anything in store or online.
              </p>

              <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-4">
                GIFT CARD OPTIONS
              </h2>
              <div className="flex flex-col gap-3 mb-8">
                {[25, 50, 100, 150, 200].map((amount) => (
                  <div
                    key={amount}
                    className="flex items-center justify-between border border-gray-800 hover:border-yellow-400 transition-colors px-4 py-3 rounded cursor-pointer"
                  >
                    <p className="text-white text-sm font-bold">
                      ${amount} Gift Card
                    </p>
                    <button className="bg-yellow-400 text-black text-xs font-bold px-4 py-2 hover:bg-yellow-300 transition-colors">
                      Purchase
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-gray-500 text-xs">
                Gift cards are delivered via email and can be used online or in
                store.
              </p>
            </div>

            {/* Right */}
            <div>
              <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-6">
                CHECK YOUR BALANCE
              </h2>
              <div className="border border-gray-800 p-6 rounded mb-6">
                <p className="text-gray-400 text-sm mb-4">
                  Already have a gift card? Check your balance here.
                </p>
                <Link
                  href="/account/gift-cards"
                  className="inline-block bg-yellow-400 text-black font-bold px-6 py-3 hover:bg-yellow-300 transition-colors"
                >
                  Check Balance
                </Link>
              </div>

              <div className="border border-gray-800 p-6 rounded">
                <p className="text-yellow-400 text-sm font-bold mb-2">
                  Have Questions?
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  Contact us if you have any questions about our gift cards.
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
