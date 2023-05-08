/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

import ArrowLeft from '@/assets/icons/arrow_left_black.svg';
import ArrowRight from '@/assets/icons/arrow_right_black.svg';
import styled from '@emotion/styled';

import { GetDanjiPhotosResponse } from '@/apis/danji/danjiPhotos';
import SwipeableViews from 'react-swipeable-views';
import { NavigationHeader } from '@/components/molecules';
import Close from '@/assets/icons/close_18.svg';
import { Button } from '@/components/atoms';
import { FullScreen } from './FullScreen';

const Box = styled('div')({});

const Stack = styled('div')({});

const StyledBox = styled(Box)({
  width: '2.4rem',
  height: '2.4rem',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  alignItems: 'center',
  background: 'white',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  opacity: '0.7',
  cursor: 'pointer',
});

export function MobDanjiPhotoGallery({
  initialIndex = 0,
  allPhotos,
  onClose,
}: {
  initialIndex: number;
  allPhotos: GetDanjiPhotosResponse;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);

  return (
    <FullScreen>
      <NavigationHeader>
        <NavigationHeader.Title tw="absolute [left: 50%]">{`${index + 1}/${
          allPhotos?.danji_photos?.length || 0
        }`}</NavigationHeader.Title>
        <Button variant="ghost" tw="px-0 py-0 h-[1.5rem]" onClick={onClose}>
          <Close />
        </Button>
      </NavigationHeader>
      <Stack
        style={{
          height: 'calc(100vh - 56px)',
          position: 'relative',
          background: 'black',
        }}
      >
        <SwipeableViews
          index={index}
          enableMouseEvents
          style={{
            flex: 1,
            top: '50%',
            position: 'absolute',
            transform: 'translateY(-50%)',
          }}
          containerStyle={{ width: '100%', height: '100%' }}
          onChangeIndex={(i) => setIndex(i)}
        >
          {allPhotos?.danji_photos &&
            allPhotos.danji_photos.map((item) => (
              <div tw="flex justify-center items-center" key={item.id} style={{ height: '100%' }}>
                <img
                  alt=""
                  src={item.full_file_path}
                  style={{
                    width: '100%',
                  }}
                />
              </div>
            ))}
        </SwipeableViews>
        {index !== 0 && (
          <StyledBox
            onClick={() => setIndex((prev) => prev - 1)}
            style={{
              left: 0,
              marginLeft: '8px',
            }}
          >
            <ArrowLeft />
          </StyledBox>
        )}
        {allPhotos?.danji_photos && index !== allPhotos.danji_photos.length - 1 && (
          <StyledBox
            onClick={() => setIndex((prev) => prev + 1)}
            style={{
              right: 0,
              marginRight: '8px',
            }}
          >
            <ArrowRight />
          </StyledBox>
        )}
      </Stack>
    </FullScreen>
  );
}
