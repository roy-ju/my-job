import { Separator } from '@/components/atoms';

import SuggestForm from './SuggestForm';

import NavigationGuide from './NavigationGuide';

import UserGuide from './UserGuide';

export default function Contents() {
  return (
    <main>
      <SuggestForm />
      <NavigationGuide />
      <Separator tw="bg-gray-200 h-2" />
      <UserGuide />
    </main>
  );
}
