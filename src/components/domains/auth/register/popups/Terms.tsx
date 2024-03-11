import React, { useRef } from 'react';

import { OverlayPresenter, Popup } from '@/components/molecules';

import useOutsideClick from '@/hooks/useOutsideClick';

import useSelectedRegisterTerms from '../hooks/useSelectedRegisterTerms';

import TermsTemplate from '../TermsTemplate';

type TermsPopupProps = {
  type: 'location' | 'service' | 'privacy' | '';
  handleCancel: () => void;
};

export default function TermsPopup({ type, handleCancel }: TermsPopupProps) {
  const popupContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    selectedServiceTerms,
    selectedLocationTerms,
    selectedPrivacyTerms,
    selectedServiceHtmlTerms,
    selectedLocationHtmlTerms,
    selectedPrivacyHtmlTerms,
  } = useSelectedRegisterTerms();

  useOutsideClick({ ref: popupContainerRef, handler: () => handleCancel(), enabled: !!type });

  if (!type) return null;

  return (
    <OverlayPresenter>
      <div ref={popupContainerRef}>
        <Popup type="large">
          <Popup.ContentGroup tw="py-6 gap-2 [max-height: 520px] overflow-y-scroll rounded-lg relative">
            {type === 'service' && <TermsTemplate termDate={selectedServiceTerms} html={selectedServiceHtmlTerms} />}
            {type === 'location' && <TermsTemplate termDate={selectedLocationTerms} html={selectedLocationHtmlTerms} />}
            {type === 'privacy' && <TermsTemplate termDate={selectedPrivacyTerms} html={selectedPrivacyHtmlTerms} />}
          </Popup.ContentGroup>
        </Popup>
      </div>
    </OverlayPresenter>
  );
}
