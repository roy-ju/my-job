import { Button } from '@/components/atoms';

import { DanjiPhotoItem } from '@/services/danji/types';

import Close from '@/assets/icons/close_18.svg';

import PhotoGallery from './PhotoGallery';

import {
  Container,
  DialogBodyContentsWrraper,
  DialogBodyWrraper,
  DialogHeaderContentsWrraper,
  DialogHeaderWrraper,
  ImageWrraper,
  Image,
  Title,
} from './widget/PhotosDialogWidget';

import usePhotosDialogHandler from './hooks/usePhotosDialogHandler';

type PhotosDialogProps = {
  paths: DanjiPhotoItem[];
  onClickBack: () => void;
};

export default function PhotosDialog({ paths, onClickBack }: PhotosDialogProps) {
  const { galleryPhotoIndex, handleUpdateIndex, handleCloseGallery } = usePhotosDialogHandler();

  return (
    <>
      <Container>
        <DialogHeaderWrraper>
          <DialogHeaderContentsWrraper>
            <Title>
              단지 사진 <span>{paths.length}</span>
            </Title>
            <Button variant="ghost" tw="px-0 py-0 h-[1.5rem]" onClick={onClickBack}>
              <Close />
            </Button>
          </DialogHeaderContentsWrraper>
        </DialogHeaderWrraper>

        <DialogBodyWrraper>
          <DialogBodyContentsWrraper>
            {paths.map((item, index) => (
              <ImageWrraper key={item.id}>
                <Image onClick={() => handleUpdateIndex(index)} alt="단지 사진" src={item.full_file_path} />
              </ImageWrraper>
            ))}
          </DialogBodyContentsWrraper>
        </DialogBodyWrraper>
      </Container>

      {galleryPhotoIndex !== -1 && paths && (
        <PhotoGallery initialIndex={galleryPhotoIndex} paths={paths} onClose={handleCloseGallery} />
      )}
    </>
  );
}
