import { Button } from '@/components/atoms';
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
  photoPath?: string;
  itemSize?: number;
}

export default function PhotoHero({ itemSize = 0 }: PhotoHeroProps) {
  return (
    <Container>
      <Button size="none" tw="rounded-bubble h-5 text-[10px] text-white px-2 bg-gray-1000/50 absolute bottom-3 right-5">
        1 / {itemSize} 모두보기
      </Button>
    </Container>
  );
}
