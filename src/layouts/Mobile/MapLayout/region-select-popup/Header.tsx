import { theme } from 'twin.macro';

import { NavigationHeader } from '@/components/molecules';

import CloseIcon from '@/assets/icons/icon_x_24_2.svg';

import { HeaderContainer } from './widget/RegionSelectWidget';

type HeaderProps = { title?: string; handleClick?: () => void };

export default function Header({ title = '지역 선택', handleClick }: HeaderProps) {
  return (
    <HeaderContainer>
      <NavigationHeader tw="bg-transparent pl-5 gap-5">
        <NavigationHeader.Title tw="pr-0">{title}</NavigationHeader.Title>
        <NavigationHeader.Button onClick={handleClick}>
          <CloseIcon color={theme`colors.gray.700`} />
        </NavigationHeader.Button>
      </NavigationHeader>
    </HeaderContainer>
  );
}
