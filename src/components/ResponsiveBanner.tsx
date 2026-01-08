'use client';

import { useState, useEffect } from 'react';

export default function ResponsiveBanner() {
  const [imageSrc, setImageSrc] = useState('/image_640_180.png');

  useEffect(() => {
    const updateImage = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setImageSrc('/Your paragraph text.png');
      } else if (width >= 768) {
        setImageSrc('/image_1024_288.png');
      } else {
        setImageSrc('/image_640_180.png');
      }
    };

    // Set initial image
    updateImage();

    // Update on resize
    window.addEventListener('resize', updateImage);

    return () => {
      window.removeEventListener('resize', updateImage);
    };
  }, []);

  return (
    <img
      src={imageSrc}
      alt="Marketing Banner"
      className="w-full h-full object-contain"
      style={{ 
        objectPosition: 'center', 
        display: 'block',
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%'
      }}
      key={imageSrc} // Force re-render when src changes
    />
  );
}

