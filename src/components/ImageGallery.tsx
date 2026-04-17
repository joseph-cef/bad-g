import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const goTo = (index: number) => {
    setIsLoaded(false);
    setActiveIndex(index);
  };

  const goPrev = () => goTo(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  const goNext = () => goTo(activeIndex === images.length - 1 ? 0 : activeIndex + 1);

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div className="relative aspect-[4/5] md:aspect-square rounded-2xl lg:rounded-3xl overflow-hidden bg-gray-100 dark:bg-dark-card group">
        {/* Shimmer placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-dark-card dark:via-dark-hover dark:to-dark-card shimmer-bg" />
        )}
        
        <img
          key={activeIndex}
          src={images[activeIndex]}
          alt={`${alt} - ${activeIndex + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
          onLoad={() => setIsLoaded(true)}
        />

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm flex items-center justify-center text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-all hover:bg-white dark:hover:bg-dark-card shadow-lg hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm flex items-center justify-center text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-all hover:bg-white dark:hover:bg-dark-card shadow-lg hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image counter badge */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto thumbnail-scroll pb-1 px-0.5">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                activeIndex === index
                  ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-dark-bg scale-100 opacity-100'
                  : 'opacity-50 hover:opacity-80 ring-1 ring-gray-200 dark:ring-dark-border'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
