import Image from 'next/image';

import { useAnimation } from 'framer-motion';

import { DanjiPhotoItem } from '@/services/danji/types';

import {
  Container,
  BackGround,
  DefaultContainer,
  ViewAllButton,
  DragMotion,
  ImageWrraper,
} from './widget/PhotoHeroWidget';

import { transition, variants } from './constants/animations';

import usePhotoHeroHandler from './hooks/usePhotoHeroHandler';

type PhotoHeroProps = {
  photoPaths: DanjiPhotoItem[];
  defaultPhotoPath: string | null;
  onClickViewPhotos?: () => void;
};

export default function PhotoHero({ photoPaths, defaultPhotoPath, onClickViewPhotos }: PhotoHeroProps) {
  const animation = useAnimation();

  const { ref, page, itemSize, handleDragEnd } = usePhotoHeroHandler({ photoPaths, defaultPhotoPath, animation });

  if (!itemSize && defaultPhotoPath) {
    return (
      <DefaultContainer>
        <BackGround />
        <Image priority quality={100} alt="기본 부동산 이미지" fill src={defaultPhotoPath} />
      </DefaultContainer>
    );
  }

  return (
    <Container>
      <DragMotion
        key={page}
        ref={ref}
        drag={itemSize > 1 ? 'x' : undefined}
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        animate={animation}
        variants={variants as unknown as any}
        transition={transition}
      >
        <ImageWrraper>
          <BackGround />
          <Image priority fill src={photoPaths[page].full_file_path} alt="단지 사진" quality={75} tw="flex-1" />
        </ImageWrraper>
      </DragMotion>

      <ViewAllButton onClick={onClickViewPhotos} size="none">
        {page + 1} / {itemSize} 모두보기
      </ViewAllButton>
    </Container>
  );
}
