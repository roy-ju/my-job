import { Button } from '@/components/atoms';
import Paths from '@/constants/paths';
import { styled } from 'twin.macro';

const Container = styled.div`
  position: relative;
  height: 256px;
  background-color: gray;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export interface PhotoHeroProps {
  defaultPhotoPath?: string;
  handlePhotos?: () => void;
  photoPath?: string;
  itemSize?: number;
}

export default function PhotoHero({
  photoPath,
  handlePhotos,
  defaultPhotoPath = Paths.DEFAULT_APARTMENT_IMAGE_LG_PATH,
  itemSize = 0,
}: PhotoHeroProps) {
  const imgPath = photoPath ?? defaultPhotoPath;

  return (
    <Container
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${imgPath}')`,
      }}
    >
      <Button
        onClick={handlePhotos}
        size="none"
        tw="rounded-bubble h-5 text-[10px] text-white px-2 bg-gray-1000/50 absolute bottom-3 right-5"
      >
        1 / {itemSize} 모두보기
      </Button>
    </Container>
  );
}
