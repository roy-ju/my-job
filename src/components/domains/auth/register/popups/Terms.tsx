import React, { useRef } from 'react';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { ServiceTerms, LocationTerms, PrivacyPolicy } from '@/components/templates';

import useOutsideClick from '@/hooks/useOutsideClick';

import useRegisterTerms from '../hooks/useRegisterTerms';

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
  } = useRegisterTerms();

  useOutsideClick({ ref: popupContainerRef, handler: () => handleCancel(), enabled: !!type });

  if (!type) return null;

  return (
    <OverlayPresenter>
      <div ref={popupContainerRef}>
        <Popup type="large">
          <Popup.ContentGroup tw="py-6 gap-2 [max-height: 600px] overflow-y-scroll rounded-lg">
            {type === 'service' && <ServiceTerms termDate={selectedServiceTerms} html={selectedServiceHtmlTerms} />}

            {type === 'location' && <LocationTerms termDate={selectedLocationTerms} html={selectedLocationHtmlTerms} />}

            {type === 'privacy' && <PrivacyPolicy termDate={selectedPrivacyTerms} html={selectedPrivacyHtmlTerms} />}
          </Popup.ContentGroup>
        </Popup>
      </div>
    </OverlayPresenter>
  );
}
