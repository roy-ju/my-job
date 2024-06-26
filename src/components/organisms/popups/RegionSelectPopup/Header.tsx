import tw, { theme } from 'twin.macro';

import { NavigationHeader } from '@/components/molecules';

import CloseIcon from '@/assets/icons/icon_x_24_2.svg';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { HeaderContainer } from './widget/RegionSelectWidget';

type HeaderProps = { title?: string; onClickClose?: () => void };

export default function Header({ title = '지역 선택', onClickClose }: HeaderProps) {
  const { platform } = useCheckPlatform();

  return (
    <HeaderContainer css={[platform === 'pc' ? tw`pt-2` : tw`pt-0`]}>
      <NavigationHeader tw="bg-transparent pl-5 gap-5">
        <NavigationHeader.Title tw="pr-0">{title}</NavigationHeader.Title>
        <NavigationHeader.Button onClick={onClickClose}>
          <CloseIcon color={theme`colors.gray.700`} />
        </NavigationHeader.Button>
      </NavigationHeader>
    </HeaderContainer>
  );
}
