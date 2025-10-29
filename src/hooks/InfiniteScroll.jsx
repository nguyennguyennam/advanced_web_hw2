import { useCallback, useState, useEffect, useRef } from "react";
import { fetchImages } from "../services/photoApi";

/*
  Custom hook for Infinite Scroll with caching and scroll restoration.
  - Caches loaded images and current page in sessionStorage.
  - Saves and restores scroll position when navigating between routes.
*/

export default function useInfiniteScroll() {
  const CACHE_KEY = "galleryCache";
  const SCROLL_KEY = "galleryScrollY";
  const restored = useRef(false);
  const intervalRef = useRef(null);

  // Load cache if available
  const cached = sessionStorage.getItem(CACHE_KEY);
  const [images, setImages] = useState(cached ? JSON.parse(cached).images : []);
  const [page, setPage] = useState(cached ? JSON.parse(cached).page : 1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Load more images
  const loadMoreImages = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const newImages = await fetchImages(page);
      if (newImages.length === 0) {
        setHasMore(false);
        return;
      }

      const updated = [...images, ...newImages];
      setImages(updated);
      setPage((prev) => prev + 1);
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ images: updated, page: page + 1 })
      );
    } catch (err) {
      console.error("Failed to fetch images:", err);
    }
    setLoading(false);
  }, [page, hasMore, images, loading]);

  //Auto-fetch every 5s
  useEffect(() => {
    if (!hasMore) return;
    intervalRef.current = setInterval(() => {
        loadMoreImages();
    }, 5000);
  })

  // Save scroll position whenever user scrolls
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem(SCROLL_KEY, window.scrollY.toString());
    };
    window.addEventListener("scroll", saveScroll);
    return () => window.removeEventListener("scroll", saveScroll);
  }, []);

  // Restore scroll when Gallery remounts (Back navigation)
  useEffect(() => {
    if (!restored.current) {
      const savedY = sessionStorage.getItem(SCROLL_KEY);
      if (savedY) {
        // Delay ensures images render before scrolling
        setTimeout(() => {
          window.scrollTo({ top: parseFloat(savedY), behavior: "instant" });
        }, 100);
      }
      restored.current = true;
    }
  }, []);

  return { images, hasMore, loadMoreImages };
}
