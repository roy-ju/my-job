import { useState } from 'react';

export default function usePhotoGalleryHandlers({ initialIndex }: { initialIndex: number }) {
  const [index, setIndex] = useState(initialIndex);

  const handleUpdateIndex = (v: number) => {
    setIndex(v);
  };

  const handlePrevIndex = () => {
    setIndex((prev) => prev - 1);
  };

  const handleNextIndex = () => {
    setIndex((prev) => prev + 1);
  };

  return { index, handleNextIndex, handlePrevIndex, handleUpdateIndex };
}
