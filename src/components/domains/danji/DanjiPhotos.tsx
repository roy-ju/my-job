import { useState } from 'react';

import Image from 'next/image';

import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import { DanjiPhotosResponse } from '@/services/danji/types';

import FlexContents from '@/components/atoms/FlexContents';
import ImagePopup from './photos/ImagePopup';

export default function DanjiPhotos({
  danjiName,
  danjiPhotos,
  onClickBack,
}: {
  danjiName?: string;
  danjiPhotos?: DanjiPhotosResponse;
  onClickBack?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const [filePath, setFilePath] = useState('');

  return (
    <Container>
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>
          단지 사진<span tw="text-nego-1000 font-bold">{danjiPhotos?.danji_photos?.length || 0}</span>
        </NavigationHeader.Title>
      </NavigationHeader>

      <FlexContents tw="pb-5">
        {danjiPhotos?.danji_photos &&
          danjiPhotos.danji_photos.length > 0 &&
          danjiPhotos.danji_photos.map((item) => (
            <Image
              onClick={() => {
                setOpen(true);
                setFilePath(item.full_file_path);
              }}
              key={item.id}
              width={380}
              height={256}
              alt=""
              src={item.full_file_path}
              style={{ width: '380px', height: '256px' }}
            />
          ))}
      </FlexContents>

      {open && (
        <ImagePopup
          danjiName={danjiName}
          filePath={filePath}
          handleClose={() => {
            setOpen(false);
          }}
        />
      )}
    </Container>
  );
}
