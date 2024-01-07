import { NavigationHeader } from '@/components/molecules';

type HeaderProps = { title: string; handleClickBack?: () => void };

export default function Header({ title, handleClickBack }: HeaderProps) {
  return (
    <NavigationHeader>
      {handleClickBack && <NavigationHeader.BackButton onClick={handleClickBack} />}
      <NavigationHeader.Title>{title}</NavigationHeader.Title>
    </NavigationHeader>
  );
}
