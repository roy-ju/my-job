import { useCallback } from 'react';
import tw, { styled } from 'twin.macro';

import ArrowLeft from '@/assets/icons/chevron_left_24.svg';
import Close from '@/assets/icons/close_24.svg';
import { Button } from '@/components/atoms';
import { useRouter } from 'next/router';

const AppBar = styled.div`
  ${tw`[box-shadow: none] fixed top-0 left-auto right-auto [width: 100%] max-w-mobile [margin: 0 auto] bg-white z-[300]`}
`;

const Toolbar = styled.div`
  ${tw`flex items-center px-[1rem] py-[1rem] min-h-[3.5rem] bg-white [color: black] overflow-hidden w-full max-w-mobile [margin: 0 auto]`}
`;

const AppBarTitle = tw.div`flex-1 min-w-0 overflow-hidden whitespace-nowrap text-ellipsis text-b1 text-gray-1000 font-bold pt-px pr-1`;

export type HeaderProps = {
  title?: string | React.ReactNode;
  hideBackButton?: boolean;
  closeButton?: boolean;
  isEndClose?: boolean;
  startComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
  onClickBack?: () => void;
};

export default function MobGlobalHeader({
  title,
  hideBackButton = false,
  closeButton = false,
  isEndClose = false,
  endComponent,
  startComponent,
  onClickBack,
}: HeaderProps) {
  const router = useRouter();

  const handleGoBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const navigationIndex = window.history.state?.idx;
      const canGoBack = navigationIndex !== 0;

      if (onClickBack) {
        onClickBack();
        return;
      }

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [onClickBack, router]);

  return (
    <AppBar id="negocio-header">
      <Toolbar>
        {!isEndClose && !hideBackButton && !closeButton && (
          <Button
            variant="ghost"
            onClick={() => {
              handleGoBack();
            }}
            tw="p-0 h-[1.5rem] mr-3"
          >
            <ArrowLeft />
          </Button>
        )}

        {!isEndClose && closeButton && (
          <Button variant="ghost" tw="p-0 h-[1.5rem]">
            <Close style={{ width: '1.5rem', height: '1.5rem' }} />
          </Button>
        )}

        {startComponent && <div tw="ml-2">{startComponent}</div>}

        <AppBarTitle>{title}</AppBarTitle>

        <div tw="ml-auto">{endComponent}</div>

        {isEndClose && closeButton && (
          <Button variant="ghost" tw="p-0 h-[1.5rem]">
            <Close style={{ width: '1.5rem', height: '1.5rem' }} />
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}