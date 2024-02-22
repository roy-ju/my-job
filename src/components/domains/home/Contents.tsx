import { Separator } from '@/components/atoms';

import SuggestForm from './SuggestForm';

import NavigationGuide from './NavigationGuide';

import UserGuide from './UserGuide';

type ContentsProps = { isInAppBrowser: boolean; handleOpenAppInstallPopup: () => void };

export default function Contents({ isInAppBrowser, handleOpenAppInstallPopup }: ContentsProps) {
  return (
    <main>
      <SuggestForm isInAppBrowser={isInAppBrowser} handleOpenAppInstallPopup={handleOpenAppInstallPopup} />
      <NavigationGuide isInAppBrowser={isInAppBrowser} handleOpenAppInstallPopup={handleOpenAppInstallPopup} />
      <Separator tw="bg-gray-200 h-2" />
      <UserGuide />
    </main>
  );
}
