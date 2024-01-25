import { NavigationHeader } from '@/components/molecules';

import useBack from '@/hooks/useBack';

export default function Header() {
  const { back } = useBack();

  return (
    <NavigationHeader>
      <NavigationHeader.BackButton onClick={() => back()} />
    </NavigationHeader>
  );
}
