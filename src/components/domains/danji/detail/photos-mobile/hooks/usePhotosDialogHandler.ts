import { useState } from 'react';

export default function usePhotosDialogHandler() {
  const [galleryPhotoIndex, setGalleryPhotoIndex] = useState(-1);

  const handleCloseGallery = () => {
    setGalleryPhotoIndex(-1);
  };

  const handleUpdateIndex = (v: number) => {
    setGalleryPhotoIndex(v);
  };

  return { galleryPhotoIndex, handleUpdateIndex, handleCloseGallery };
}
