import { useCallback } from 'react';
import tw, { styled } from 'twin.macro';

import ArrowLeft from '@/assets/icons/chevron_left_24.svg';
import Close from '@/assets/icons/close_24.svg';
import { Button } from '@/components/atoms';
import { useRouter } from 'next/router';

const AppBar = styled.div`
  ${tw`[box-shadow: none] fixed top-0 left-auto right-auto [width: 100%] max-w-mobile [margin: 0 auto] bg-white [border-bottom: 1px solid #F0F0F6]`}
`;

const Toolbar = styled.div`
  ${tw`flex items-center relative px-[1.125rem] min-h-[3.5rem] bg-white [color: black] overflow-hidden w-full max-w-mobile [margin: 0 auto]`}
`;

const AppBarTitle = styled.span`
  ${tw`absolute left-[50%] -translate-x-1/2 [width: calc(100%-17rem)] overflow-hidden [text-align: center] [font-size: 0.9375rem] [line-height: 1.5] [font-weight: 500] whitespace-nowrap [text-overflow: ellipsis]`}
`;

export type HeaderProps = {
  title?: string | React.ReactNode;
  hideBackButton?: boolean;
  closeButton?: boolean;
  isEndClose?: boolean;
  startComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
};

export function MobGlobalHeader({
  title,
  hideBackButton = false,
  closeButton = false,
  isEndClose = false,
  endComponent,
  startComponent,
}: HeaderProps) {
  const router = useRouter();

  const handleGoBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const navigationIndex = window.history.state?.idx;
      const canGoBack = navigationIndex !== 0;

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  return (
    <AppBar id="negocio-header">
      <Toolbar>
        {!isEndClose && !hideBackButton && !closeButton && (
          <Button
            variant="ghost"
            onClick={() => {
              handleGoBack();
            }}
            tw="p-0 h-[1.5rem]"
          >
            <ArrowLeft
              style={{
                width: '1.5rem',
                height: '1.5rem',
              }}
            />
          </Button>
        )}

        {!isEndClose && closeButton && (
          <Button variant="ghost" tw="p-0 h-[1.5rem]">
            <Close style={{ width: '1.125rem', height: '1.125rem' }} />
          </Button>
        )}

        {startComponent && <div tw="ml-2">{startComponent}</div>}

        <AppBarTitle>{title}</AppBarTitle>

        <div tw="ml-auto">{endComponent}</div>

        {isEndClose && closeButton && (
          <Button variant="ghost" tw="p-0 h-[1.5rem]">
            <Close style={{ width: '1.125rem', height: '1.125rem' }} />
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
