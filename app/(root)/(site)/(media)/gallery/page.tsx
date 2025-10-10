/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase/firebaseConfig";

// Lightbox + plugins
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState(-1);
  const folderPath = "9-20-25";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const folderRef = ref(storage, folderPath);
        const { items } = await listAll(folderRef);

        if (items.length === 0) {
          console.warn(`No files found in gs://${folderPath}/`);
          return;
        }

        const urls = await Promise.all(items.map(getDownloadURL));
        setImages(urls);
      } catch (err) {
        console.error("❌ Error listing images:", err);
      }
    };

    fetchImages();
  }, [folderPath]);

  return (
    <div className="min-h-screen w-screen bg-black flex flex-col items-center justify-center">
      {/* 🖼️ Fullscreen grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-full h-full gap-0">
        {images.length === 0 && (
          <p className="col-span-full text-gray-400 text-center mt-10">
            No images found.
          </p>
        )}
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Gallery image ${i + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setIndex(i)}
            loading="lazy"
          />
        ))}
      </div>

      {/* 💡 Lightbox */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={images.map((src) => ({ src }))}
        index={index}
        plugins={[Zoom, Thumbnails]}
      />
    </div>
  );
}
