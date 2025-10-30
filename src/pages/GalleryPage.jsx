import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import useInfiniteScroll from "../hooks/InfiniteScroll";
import LoadSpinner from "../components/LoadingSpinner";
import EndImages from "../components/EndBox";

const breakpointColumnsObj = {
  default: 4,
  1200: 3,
  800: 2,
  500: 1,
};

export default function Gallery() {
  const { images, hasMore, loadMoreImages } = useInfiniteScroll();

  useEffect(() => {
    loadMoreImages();
  }, [loadMoreImages]);

  return (
    <div className="p-6">
      <InfiniteScroll
        dataLength={images?.length || 0}
        next={loadMoreImages}
        hasMore={hasMore}
        loader={<LoadSpinner />}
        endMessage={<EndImages />}
        style={{ overflow: "visible" }}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-column"
        >
          {images.map((image) => (
            <Link key={image.id} to={`/photos/${image.id}`} state={{ photo: image }}>
              <div className="relative mb-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
                <img
                  src={image.download_url}
                  className="w-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  alt={image.author || 'photo'}
                />
                <div className="author-overlay">
                  {image.author || "Unknown"}
                </div>
              </div>
            </Link>
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
}
