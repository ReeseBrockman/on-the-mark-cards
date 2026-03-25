import Link from "next/link";

export default function GiftCardPage() {
  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-black text-3xl font-bold mb-2 border-l-4 border-red-600 pl-4">
          Gift Cards
        </h1>
        <div className="border-t border-red-600 pt-8 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-red-600 text-sm font-bold tracking-widest mb-4">
                  GIFT CARD OPTIONS
                </h2>
                <div className="flex flex-col gap-3">
                  {[25, 50, 100, 150, 200].map((amount) => (
                    <div
                      key={amount}
                      className="flex items-center justify-between border border-gray-200 hover:border-red-600 transition-colors px-4 py-3 rounded"
                    >
                      <p className="text-black text-sm font-bold">
                        ${amount} Gift Card
                      </p>
                      <button className="!bg-red-600 !text-white text-xs font-bold px-4 py-2 border border-red-600 hover:!bg-white hover:!text-red-600 transition-colors rounded-lg">
                        Purchase
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-red-600 text-sm font-bold tracking-widest mb-6">
                  CHECK YOUR BALANCE
                </h2>
                <div className="border border-gray-200 p-6 rounded mb-6">
                  <p className="text-gray-400 text-sm mb-4">
                    Already have a gift card? Check your balance here.
                  </p>
                  <Link
                    href="/account/gift-cards"
                    className="inline-block bg-red-600 text-white font-bold px-6 py-3 border border-red-600 hover:bg-white hover:text-red-600 transition-colors rounded-lg"
                  >
                    Check Balance
                  </Link>
                </div>
              </div>
              <div className="border border-gray-200 p-6 rounded">
                <p className="text-red-600 text-sm font-bold mb-2">
                  Have Questions?
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  Contact us if you have any questions about our gift cards.
                </p>
                <a
                  href="mailto:onthemarq2018@gmail.com"
                  className="text-red-600 hover:underline text-sm"
                >
                  onthemarq2018@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
