import { NavigationHeader } from '@/components/molecules';

import useBackButtonHandler from './form/hooks/useBackButtonHandler';

type HeaderProps = { title: string; depth?: number };

export default function Header({ title, depth }: HeaderProps) {
  const { handleClickBack } = useBackButtonHandler({ depth });

  return (
    <NavigationHeader>
      <NavigationHeader.BackButton onClick={handleClickBack} />
      <NavigationHeader.Title>{title}</NavigationHeader.Title>
    </NavigationHeader>
  );
}
