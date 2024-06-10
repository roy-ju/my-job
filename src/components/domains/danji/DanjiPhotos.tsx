import { useCallback, useState } from 'react';

import Image from 'next/image';

import Container from '@/components/atoms/Container';

import FlexContents from '@/components/atoms/FlexContents';

import { NavigationHeader } from '@/components/molecules';

import { DanjiPhotosResponse } from '@/services/danji/types';

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

  const lengthText = useCallback(
    () => <span tw="text-nego-1000 font-bold ml-1">{danjiPhotos?.danji_photos?.length || 0}</span>,
    [danjiPhotos?.danji_photos?.length],
  );

  return (
    <Container>
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>단지 사진 {lengthText()}</NavigationHeader.Title>
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
