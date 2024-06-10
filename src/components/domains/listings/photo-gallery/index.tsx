import tw, { styled } from 'twin.macro';

import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

interface Props {
  headerTitle?: string;
  photoPaths?: string[];
  onClickBack?: () => void;
}

const ImagesWrraper = styled.div`
  ${tw`flex flex-col flex-1 gap-0.5 overflow-auto`}
`;

const ImageBox = styled.div`
  ${tw`w-full h-[254px] bg-no-repeat bg-center bg-cover shrink-0`}
`;

export default function PhotoGallery({ headerTitle, photoPaths, onClickBack }: Props) {
  return (
    <Container>
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>
          {headerTitle} <span tw="font-bold text-nego">{photoPaths?.length}</span>
        </NavigationHeader.Title>
      </NavigationHeader>
      <ImagesWrraper>
        {photoPaths?.map((path) => (
          <ImageBox
            key={path}
            style={{
              backgroundImage: `url('${path}')`,
            }}
          />
        ))}
      </ImagesWrraper>
    </Container>
  );
}
