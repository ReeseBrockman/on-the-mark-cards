export default function SellPage() {
  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-black text-3xl font-bold mb-2 border-l-4 border-red-600 pl-4">
          Sell Us Your Cards
        </h1>
        <div className="border-t border-red-600 pt-8 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-red-600 text-sm font-bold tracking-widest mb-4">
                  WHAT WE BUY
                </h2>
                <ul className="flex flex-col gap-2 mb-8">
                  <li className="text-black text-sm flex items-center gap-2">
                    <span className="text-red-600">✓</span> Sports Cards —
                    Singles, Sets, and Lots
                  </li>
                  <li className="text-black text-sm flex items-center gap-2">
                    <span className="text-red-600">✓</span> Graded Cards (PSA,
                    BGS, SGC)
                  </li>
                  <li className="text-black text-sm flex items-center gap-2">
                    <span className="text-red-600">✓</span> Sealed Boxes and
                    Cases
                  </li>
                </ul>
                <h2 className="text-red-600 text-sm font-bold tracking-widest mb-4">
                  HOW IT WORKS
                </h2>
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-lg">1</span>
                    <p className="text-black text-sm">
                      Bring your cards into the store during business hours.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-lg">2</span>
                    <p className="text-black text-sm">
                      Our team will review and evaluate your collection.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-lg">3</span>
                    <p className="text-black text-sm">
                      We'll make you a cash or store credit offer on the spot.
                    </p>
                  </div>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=8390+W+Gage+Blvd+%23102,+Kennewick,+WA+99336"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 text-white font-bold px-6 py-3 border border-red-600 hover:bg-white hover:text-red-600 transition-colors rounded-lg w-fit"
              >
                Get Directions
              </a>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-red-600 text-sm font-bold tracking-widest mb-6">
                  STORE HOURS
                </h2>
                <div className="flex flex-col gap-2 mb-8">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <p className="text-black text-sm">Monday - Friday</p>
                    <p className="text-red-600 text-sm">10:00 AM - 6:00 PM</p>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <p className="text-black text-sm">Saturday</p>
                    <p className="text-red-600 text-sm">11:00 AM - 6:00 PM</p>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <p className="text-black text-sm">Sunday</p>
                    <p className="text-red-600 text-sm">11:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 p-6 rounded">
                <p className="text-red-600 text-sm font-bold mb-2">
                  Have Questions?
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  Contact us before bringing in a large collection and we can
                  help you prepare.
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
