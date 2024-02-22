import { useState, useEffect } from 'react';

import { styled } from 'twin.macro';

import ButtonV2 from '@/components/atoms/ButtonV2';

import PersistentBottomBarV2 from '@/components/atoms/PersistentBottomBarV2';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import GOOGLE_TAG_BUTTON_ID from '@/constants/gtag_id';

type CtaProps = {
  isRenderCta: boolean;
  title: string;
  isLoading: boolean;
  disabled: boolean;
  handleClick: () => void;
};

const CtaWrraper = styled.div``;

export default function Cta({ isRenderCta, title, isLoading, disabled, handleClick }: CtaProps) {
  const { platform } = useCheckPlatform();

  const [bottom, setBottom] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window?.visualViewport && platform === 'mobile') {
      const handleViewportResize = () => {
        const newHeight: number = window.visualViewport.height;

        setBottom(window.innerHeight - newHeight);
      };

      window.visualViewport.addEventListener('resize', handleViewportResize);

      return () => {
        window.visualViewport.removeEventListener('resize', handleViewportResize);
      };
    }
  }, [platform]);

  if (!isRenderCta) return null;

  return platform === 'mobile' ? (
    <CtaWrraper style={{ position: 'fixed', bottom: `${bottom}px`, width: '100%' }}>
      {bottom < 1 ? (
        <PersistentBottomBarV2 tw="shadow-none">
          <ButtonV2
            isLoading={isLoading}
            disabled={disabled}
            tw="w-full"
            size="bigger"
            onClick={handleClick}
            id={GOOGLE_TAG_BUTTON_ID.REGISTER_CTA}
          >
            {title}
          </ButtonV2>
        </PersistentBottomBarV2>
      ) : (
        <PersistentBottomBarV2 tw="px-0 py-0 shadow-none [border-radius: 0px]">
          <ButtonV2
            isLoading={isLoading}
            disabled={disabled}
            tw="w-full"
            size="bigger"
            radius="none"
            onClick={handleClick}
            id={GOOGLE_TAG_BUTTON_ID.REGISTER_CTA}
          >
            {title}
          </ButtonV2>
        </PersistentBottomBarV2>
      )}
    </CtaWrraper>
  ) : (
    <CtaWrraper>
      <PersistentBottomBarV2 tw="shadow-none">
        <ButtonV2
          isLoading={isLoading}
          disabled={disabled}
          tw="w-full"
          size="bigger"
          onClick={handleClick}
          id={GOOGLE_TAG_BUTTON_ID.REGISTER_CTA}
        >
          {title}
        </ButtonV2>
      </PersistentBottomBarV2>
    </CtaWrraper>
  );
}
