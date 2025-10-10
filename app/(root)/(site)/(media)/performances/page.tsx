export default function Performances() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center
                      min-h-screen p-8 sm:p-20 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      {/* Video List - One per row */}
      <div className="flex flex-col items-center w-full max-w-4xl space-y-8">
        <div className="w-full aspect-video">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/aFcgOrHLOqU"
            title="Testimony 1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="w-full aspect-video">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/7spT4tWtMII"
            title="Testimony 2"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
