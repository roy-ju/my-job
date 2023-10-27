/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { GetDanjiPhotosResponse } from '@/apis/danji/danjiPhotos';
import React, { useState } from 'react';
import Close from '@/assets/icons/close_18.svg';
import { Button } from '@/components/atoms';
import { MobDanjiPhotoGallery } from '../MobDanjiDetail/Components/MobDanjiPhotoGallery';

export default function MobDanjiPhotos({
  danjiPhotos,
  onClickBack,
}: {
  danjiPhotos?: GetDanjiPhotosResponse;
  onClickBack?: () => void;
}) {
  const [galleryPhotoIndex, setGalleryPhotoIndex] = useState(-1);

  return (
    <>
      <div tw="w-full min-h-[100vh] overflow-y-hidden [z-index: 100] bg-white">
        <div tw="w-[100%] fixed top-0 left-auto right-auto [z-index: 50] bg-white">
          <div tw="flex items-center justify-between py-4 px-5">
            <span tw="text-b1 [line-height: 1] font-bold">
              단지 사진 <span tw="text-nego-1000 font-bold">{danjiPhotos?.danji_photos?.length || 0}</span>
            </span>
            <Button variant="ghost" tw="px-0 py-0 h-[1.5rem]" onClick={onClickBack}>
              <Close />
            </Button>
          </div>
        </div>

        <div tw="w-full fixed h-[calc(100vh - 56px)] overflow-y-auto left-auto right-auto [z-index: 1000] mt-[56px] pb-[7rem] bg-black">
          <div tw="grid [grid-template-columns: repeat(3,1fr)] [grid-gap: 0px]">
            {danjiPhotos?.danji_photos &&
              danjiPhotos.danji_photos.length > 0 &&
              danjiPhotos.danji_photos.map((item, index) => (
                <div key={item.id} tw="w-full [height: 125px]">
                  <img
                    onClick={() => {
                      setGalleryPhotoIndex(index);
                    }}
                    alt=""
                    src={item.full_file_path}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      {galleryPhotoIndex !== -1 && danjiPhotos && (
        <MobDanjiPhotoGallery
          initialIndex={galleryPhotoIndex}
          allPhotos={danjiPhotos}
          onClose={() => setGalleryPhotoIndex(-1)}
        />
      )}
    </>
  );
}
