export default function EventsPage() {
  return (
    <div className="bg-black min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-2">Events</h1>
        <div className="border-t border-yellow-400 pt-8 mt-4">
          <p className="text-gray-400 text-sm mb-8">
            Stay up to date with our latest in-store events, tournaments, and
            special releases.
          </p>

          {/* Placeholder - events will be added by client */}
          <div className="border border-gray-800 p-12 text-center rounded">
            <p className="text-4xl mb-4">📅</p>
            <p className="text-white text-lg font-bold mb-2">
              No Upcoming Events
            </p>
            <p className="text-gray-500 text-sm">
              Check back soon for upcoming events and tournaments!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
