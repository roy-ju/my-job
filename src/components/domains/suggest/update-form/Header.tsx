import { NavigationHeader } from '@/components/molecules';

import useBackButtonHandler from './hooks/useBackButtonHandler';

type HeaderProps = { title: string };

export default function Header({ title }: HeaderProps) {
  const { handleClickBack } = useBackButtonHandler();

  return (
    <NavigationHeader>
      <NavigationHeader.BackButton onClick={handleClickBack} />
      <NavigationHeader.Title>{title}</NavigationHeader.Title>
    </NavigationHeader>
  );
}
