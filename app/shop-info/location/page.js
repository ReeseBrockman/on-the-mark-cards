import Link from "next/link";

export default function LocationPage() {
  return (
    <div className="bg-black min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-2">Location & Hours</h1>
        <div className="border-t border-yellow-400 pt-8 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left - Info */}
            <div>
              <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-6">
                STORE INFO
              </h2>

              <div className="mb-8">
                <p className="text-gray-400 text-xs mb-1">ADDRESS</p>
                <p className="text-white text-sm">2527 W Kennewick Ave</p>
                <p className="text-white text-sm">Kennewick, WA 99336</p>
              </div>

              <div className="mb-8">
                <p className="text-gray-400 text-xs mb-1">PHONE</p>
                <a
                  href="tel:+1XXXXXXXXXX"
                  className="text-yellow-400 text-sm hover:underline"
                >
                  (000) 000-0000
                </a>
              </div>

              <div className="mb-8">
                <p className="text-gray-400 text-xs mb-1">EMAIL</p>
                <a
                  href="mailto:hello@thecollectorscorner.com"
                  className="text-yellow-400 text-sm hover:underline"
                >
                  hello@thecollectorscorner.com
                </a>
              </div>

              <div className="mb-8">
                <p className="text-gray-400 text-xs mb-2">STORE HOURS</p>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <p className="text-white text-sm">Monday - Saturday</p>
                    <p className="text-yellow-400 text-sm">
                      11:00 AM - 6:00 PM
                    </p>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <p className="text-white text-sm">Sunday</p>
                    <p className="text-yellow-400 text-sm">
                      12:00 PM - 4:00 PM
                    </p>
                  </div>
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

            {/* Right - Map placeholder */}
            <div>
              <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-6">
                FIND US
              </h2>
              <div
                className="bg-gray-900 border border-gray-800 rounded overflow-hidden"
                style={{ height: "400px" }}
              >
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=2527+W+Kennewick+Ave,+Kennewick,+WA+99336`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
