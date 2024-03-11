import tw, { styled } from 'twin.macro';

import { NavigationHeader } from '@/components/molecules';

import useVersionInfo from './hooks/useVersionInfo';

const FlexContents = styled.div`
  ${tw`flex-1 py-16`}
`;

const ColumnCenter = styled.div`
  ${tw`flex flex-col items-center justify-center`}
`;

const ImageContainer = styled.div`
  ${tw`w-[60px] h-[60px] rounded-lg bg-gray-300 mb-3 bg-center bg-no-repeat bg-cover`}
`;

const Title = styled.div`
  ${tw`font-bold text-h3`}
`;

const Version = styled.div`
  ${tw`text-gray-700 text-b2`}
`;

const Message = styled.div`
  ${tw`text-b2 mt-7 whitespace-pre-wrap [text-align: center]`}
`;

/** Only Mobile */
export default function VersionInfo() {
  const { handleClickBack, userUsedVersion, message, imgUrl } = useVersionInfo();

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>버전정보</NavigationHeader.Title>
      </NavigationHeader>

      <FlexContents>
        <ColumnCenter>
          <ImageContainer
            style={{
              backgroundImage: imgUrl,
            }}
          />
          <Title>네고시오</Title>
          <Version>{userUsedVersion}</Version>
          <Message>{message}</Message>
        </ColumnCenter>
      </FlexContents>
    </div>
  );
}
