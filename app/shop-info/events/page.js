import { Calendar } from "lucide-react";
import Image from "next/image";

async function getEvents() {
  const res = await fetch(
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?content_type=event&order=fields.date`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      next: { revalidate: 60 },
    },
  );

  const data = await res.json();

  return (data.items || []).map((item) => {
    const imageAsset = data.includes?.Asset?.find(
      (asset) => asset.sys.id === item.fields.image?.sys?.id,
    );

    return {
      id: item.sys.id,
      title: item.fields.title,
      date: item.fields.date,
      description: item.fields.description,
      location: item.fields.location,
      image: imageAsset ? `https:${imageAsset.fields.file.url}` : null,
    };
  });
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-black text-3xl font-bold mb-2 border-l-4 border-red-600 pl-4">
          Events
        </h1>
        <div className="border-t border-red-600 pt-8 mt-4">
          <p className="text-gray-400 text-sm mb-8">
            Stay up to date with our latest in-store events, tournaments, and
            special releases.
          </p>

          {events.length === 0 ? (
            <div className="border border-gray-200 p-12 text-center rounded">
              <Calendar size={48} className="text-red-600 mx-auto mb-4" />
              <p className="text-black text-lg font-bold mb-2">
                No Upcoming Events
              </p>
              <p className="text-gray-500 text-sm">
                Check back soon for upcoming events and tournaments!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border border-red-600 rounded overflow-hidden bg-red-600 transition-colors"
                >
                  <div className="flex flex-col md:flex-row">
                    {event.image && (
                      <div className="relative w-full md:w-120 h-50 flex-shrink-0">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col justify-center">
                      <p className="text-white text-xs font-bold tracking-widest mb-2">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <h2 className="text-white text-xl font-bold mb-2">
                        {event.title}
                      </h2>
                      {event.description && (
                        <p className="text-white/80 text-sm mb-3">
                          {event.description}
                        </p>
                      )}
                      {event.location && (
                        <p className="text-white/70 text-xs flex items-center gap-1">
                          <Calendar size={12} className="text-white" />
                          {event.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
