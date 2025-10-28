{videos.map((v) => (
  <div key={v.src} className="rounded-2xl shadow-lg overflow-hidden">
    <video
      key={v.src}
      src={v.src.startsWith("/cards/") ? v.src : `/cards/${v.src}`}
      className="w-full h-48 object-cover rounded-t-2xl bg-black"
      muted
      loop
      playsInline
      autoPlay
      onError={(e) => {
        e.target.poster = "/placeholder.png"; // fallback si no carga el video
      }}
    />
    <div className="p-2 text-center">
      <h3 className="font-semibold">{v.title}</h3>
      <p className="text-sm text-gray-500">
        {v.category} · {v.subcategory}
      </p>
    </div>
  </div>
))}
