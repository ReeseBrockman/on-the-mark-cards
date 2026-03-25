import Link from "next/link";

export default function LocationPage() {
  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-black text-3xl font-bold mb-2 border-l-4 border-red-600 pl-4">
          Location & Hours
        </h1>
        <div className="border-t border-red-600 pt-8 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-red-600 text-sm font-bold tracking-widest mb-6">
                STORE INFO
              </h2>
              <div className="mb-8">
                <p className="text-gray-400 text-xs mb-1">ADDRESS</p>
                <p className="text-black text-sm">8390 W Gage Blvd #102</p>
                <p className="text-black text-sm">Kennewick, WA 99336</p>
              </div>
              <div className="mb-8">
                <p className="text-gray-400 text-xs mb-1">PHONE</p>
                <a
                  href="tel:+15097839263"
                  className="text-red-600 text-sm hover:underline"
                >
                  (509) 783-9263
                </a>
              </div>
              <div className="mb-8">
                <p className="text-gray-400 text-xs mb-1">EMAIL</p>
                <a
                  href="mailto:onthemarq2018@gmail.com"
                  className="text-red-600 text-sm hover:underline"
                >
                  onthemarq2018@gmail.com
                </a>
              </div>
              <div className="mb-8">
                <p className="text-gray-400 text-xs mb-2">STORE HOURS</p>
                <div className="flex flex-col gap-2">
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
              <a
                href="https://www.google.com/maps/search/?api=1&query=8390+W+Gage+Blvd+%23102,+Kennewick,+WA+99336"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 text-white font-bold px-6 py-3 border border-red-600 hover:bg-white hover:text-red-600 transition-colors rounded-lg"
              >
                Get Directions
              </a>
            </div>
            <div>
              <h2 className="text-red-600 text-sm font-bold tracking-widest mb-6">
                FIND US
              </h2>
              <div
                className="bg-gray-100 border border-gray-200 rounded overflow-hidden"
                style={{ height: "400px" }}
              >
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=8390+W+Gage+Blvd+%23102,+Kennewick,+WA+99336`}
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
