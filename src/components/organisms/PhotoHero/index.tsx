import { Button } from '@/components/atoms';
import tw, { styled } from 'twin.macro';

const Container = styled.div`
  ${tw`bg-gray-100`}
  position: relative;
  height: 256px;
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

export default function PhotoHero({ photoPath, handlePhotos, itemSize = 0 }: PhotoHeroProps) {
  const imgPath = photoPath;

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
