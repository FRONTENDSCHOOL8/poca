import { useEffect } from 'react';
import { useState } from 'react';

export default function WaterMark() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsLoaded(true);
    };
    img.src = '/shoong_watermark.webp';
  }, []);
  return (
    <>
      {isLoaded && (
        <div className="pointer-events-none absolute top-0 size-full bg-[url('/shoong_watermark.webp')] bg-cover opacity-30"></div>
      )}
    </>
  );
}
