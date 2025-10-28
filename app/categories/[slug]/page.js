"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CategoryPage() {
  const { slug } = useParams(); // ej. "holidays"
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/videos", { cache: "no-store" });
        const data = await res.json();
        const all = data.videos || [];
        const filtered = all.filter((v) => v.mainSlug === slug);
        setVideos(filtered);
        console.log("✅ Videos para", slug, filtered);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) return <p className="text-center mt-8 text-gray-500">Loading…</p>;

  return (
    <main className="min-h-screen bg-[#fff5f8] text-gray-800 px-4 py-8">
      <button
        onClick={() => router.push("/")}
        className="mb-4 text-pink-600 hover:underline"
      >
        ← Back to Home
      </button>

      <h1 className="text-3xl font-extrabold text-pink-600 mb-6 capitalize">
        {slug.replace(/-/g, " ")}
      </h1>

      {videos.length === 0 ? (
        <p className="text-gray-500">No cards available in this category yet ✨</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map((v, i) => (
            <div key={i} className="bg-white rounded-2xl p-3 border shadow-sm">
              <video
                src={v.src}
                className="w-full h-48 object-cover rounded-xl bg-black"
                muted loop playsInline autoPlay
                onError={(e) => (e.target.poster = "/placeholder.png")}
              />
              <p className="mt-2 text-sm text-gray-600">
                {v.mainEmoji} {v.mainName}
              </p>
              <p className="font-semibold">{v.title}</p>
              <p className="text-xs text-gray-500">
                #{v.category} · {v.subcategory}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
                      }
