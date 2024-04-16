import { NavigationHeader } from '@/components/molecules';

import CloseIcon from '@/assets/icons/close_24.svg';

type HeaderProps = { title?: string; onClickClose?: () => void };

export default function Header({ title = '지역 선택', onClickClose }: HeaderProps) {
  return (
    <section>
      <NavigationHeader tw="bg-transparent">
        <NavigationHeader.Title>{title}</NavigationHeader.Title>
        <NavigationHeader.Button onClick={onClickClose}>
          <CloseIcon />
        </NavigationHeader.Button>
      </NavigationHeader>
    </section>
  );
}
