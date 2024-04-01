import tw, { styled, theme } from 'twin.macro';

import OutsideClick from '@/components/atoms/OutsideClick';

import KakaoLogoIcon from '@/assets/icons/kakao_logo.svg';

import CopyIcon from '@/assets/icons/icon_copy_24_2.svg';

const Container = styled.div`
  ${tw`[width: 295px] flex [padding-inline: 67.5px] [padding-block: 37px] bg-white px-14 rounded-2xl gap-12`}
`;

const Button = styled.button`
  ${tw`w-[56px] flex flex-col items-center justify-center`}
`;

const DivText = styled.div`
  ${tw`text-gray-800 text-body_02`}
`;

const IconWrraper = styled.div`
  ${tw`mb-2 w-[56px] h-[56px] rounded-full flex items-center justify-center`}
`;

interface Props {
  onClickOutside?: () => void;
  onClickShareViaKakao?: () => void;
  onClickCopyUrl?: () => void;
}

export default function SharePopup({ onClickOutside, onClickShareViaKakao, onClickCopyUrl }: Props) {
  return (
    <OutsideClick onOutsideClick={onClickOutside}>
      <Container>
        <Button onClick={onClickCopyUrl}>
          <IconWrraper tw="bg-gray-200">
            <CopyIcon color={theme`colors.gray.700`} />
          </IconWrraper>
          <DivText>URL 복사</DivText>
        </Button>

        <Button onClick={onClickShareViaKakao}>
          <IconWrraper tw="bg-yellow-kakao">
            <KakaoLogoIcon />
          </IconWrraper>
          <DivText>카카오톡</DivText>
        </Button>
      </Container>
    </OutsideClick>
  );
}
