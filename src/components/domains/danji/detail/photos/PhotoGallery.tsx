import { DanjiPhotoItem } from '@/services/danji/types';

import PhotoGalleryHeader from './PhotoGalleryHeader';

import ArrowButton from './ArrowButton';

import { Image, ImageWrraper, Stack, StyledSwipeableView } from './widget/PhotoGalleryWidget';

import usePhotoGalleryHandlers from './hooks/usePhotoGalleryHandlers';

import FullScreen from '../full-screen';

type PhotoGalleryProps = {
  initialIndex: number;
  paths: DanjiPhotoItem[];
  onClose: () => void;
};

export default function PhotoGallery({ initialIndex = 0, paths, onClose }: PhotoGalleryProps) {
  const { index, handleNextIndex, handlePrevIndex, handleUpdateIndex } = usePhotoGalleryHandlers({ initialIndex });

  return (
    <FullScreen>
      <PhotoGalleryHeader index={index} length={paths.length} handleClose={onClose} />
      <Stack>
        <StyledSwipeableView
          index={index}
          enableMouseEvents
          containerStyle={{ width: '100%', height: '100%' }}
          onChangeIndex={(i) => handleUpdateIndex(i)}
        >
          {paths.map((item) => (
            <ImageWrraper key={item.id}>
              <Image alt="" src={item.full_file_path} />
            </ImageWrraper>
          ))}
        </StyledSwipeableView>

        {index !== 0 && <ArrowButton type="left" handleClick={handlePrevIndex} />}

        {index !== paths.length - 1 && <ArrowButton type="right" handleClick={handleNextIndex} />}
      </Stack>
    </FullScreen>
  );
}
