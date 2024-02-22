import dynamic from 'next/dynamic';

import useCheckInAppBrowser from '@/hooks/useCheckInAppBrowser';

import Header from './Header';

import Contents from './Contents';

import Footer from './Footer';

const GlobalAppInstall = dynamic(() => import('../auth/global-app-install'), { ssr: false });

export default function Home() {
  const {
    isInAppBrowser,
    openAppInstallPopup,
    handleClickInstall,
    handleOpenAppInstallPopup,
    handleCloseAppInstallPopup,
  } = useCheckInAppBrowser();

  return (
    <>
      <div tw="h-full flex flex-col">
        <Header isInAppBrowser={isInAppBrowser} handleOpenAppInstallPopup={handleOpenAppInstallPopup} />
        <div tw="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <Contents isInAppBrowser={isInAppBrowser} handleOpenAppInstallPopup={handleOpenAppInstallPopup} />
          <Footer />
        </div>
      </div>

      {openAppInstallPopup && (
        <GlobalAppInstall handleClickConfirm={handleClickInstall} handleClickCancel={handleCloseAppInstallPopup} />
      )}
    </>
  );
}
