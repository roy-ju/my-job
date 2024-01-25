import { OverlayPresenter } from '@/components/molecules';

import { AnimatePresence } from 'framer-motion';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import PcLoginPopup from './PcLoginPopup';

import MobileLoginPopup from './MobileLoginPopup';

export default function GlobalAuthPopup() {
  const { isOpenAuthPopup } = useAuthPopup();

  const { platform } = useCheckPlatform();

  return platform ? (
    platform === 'pc' ? (
      <>
        {isOpenAuthPopup && (
          <OverlayPresenter>
            <PcLoginPopup />
          </OverlayPresenter>
        )}
      </>
    ) : (
      <AnimatePresence>
        {isOpenAuthPopup && (
          <OverlayPresenter>
            <MobileLoginPopup />
          </OverlayPresenter>
        )}
      </AnimatePresence>
    )
  ) : null;
}
