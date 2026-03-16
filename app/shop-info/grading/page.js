export default function GradingPage() {
  return (
    <div className="bg-black min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-2">
          Grading Submissions
        </h1>
        <div className="border-t border-yellow-400 pt-8 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left - Info */}
            <div>
              <p className="text-gray-400 text-sm mb-8">
                We offer grading submission services through PSA, BGS, and SGC.
                Bring your cards in store and we'll handle the entire submission
                process for you.
              </p>

              <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-4">
                GRADING SERVICES
              </h2>
              <ul className="flex flex-col gap-2 mb-8">
                <li className="text-white text-sm flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> PSA Grading
                </li>
                <li className="text-white text-sm flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> BGS (Beckett)
                  Grading
                </li>
                <li className="text-white text-sm flex items-center gap-2">
                  <span className="text-yellow-400">✓</span> SGC Grading
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
                    We'll help you select the right grading service and tier for
                    your cards.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 font-bold text-lg">3</span>
                  <p className="text-white text-sm">
                    We handle the submission and notify you when your cards are
                    back.
                  </p>
                </div>
              </div>

              <a
                href="mailto:hello@thecollectorscorner.com"
                className="inline-block bg-yellow-400 text-black font-bold px-6 py-3 hover:bg-yellow-300 transition-colors"
              >
                Contact Us About Grading
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
                  Contact us before bringing in cards and we can walk you
                  through the process.
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
