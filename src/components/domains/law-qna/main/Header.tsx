/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import { theme } from 'twin.macro';

import Button from '@/components/atoms/Button';

import NavigationHeader from '@/components/molecules/NavigationHeader';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import SearchIcon from '@/assets/icons/search.svg';

import useRouterChange from './hooks/useRouterChange';

import QueryResult from './QueryResult';

export default function Header() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const { handleClickSearchButton, handleClickBack, handleClickViewAllItem } = useRouterChange();

  const renderType = useMemo(() => {
    if (router?.query?.q) {
      return 'search';
    }

    return 'none';
  }, [router?.query?.q]);

  const handleClickContainer = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      handleClickSearchButton();
    },
    [handleClickSearchButton],
  );

  const handleClickDeleteButton = useCallback((e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e?.preventDefault();
    e?.stopPropagation();
  }, []);

  if (platform === 'pc') {
    return (
      <NavigationHeader>
        <NavigationHeader.Title>부동산 법률 상담</NavigationHeader.Title>
        <Button variant="ghost" tw="p-0" onClick={handleClickSearchButton}>
          {renderType === 'search' ? (
            <SearchIcon color={theme`colors.nego.800`} width={24} height={24} />
          ) : (
            <SearchIcon color={theme`colors.gray.900`} width={24} height={24} />
          )}
        </Button>
      </NavigationHeader>
    );
  }

  return (
    <NavigationHeader tw="relative">
      <NavigationHeader.BackButton onClick={handleClickBack} title={renderType === 'none' ? '' : ''} />
      {renderType === 'none' ? (
        <>
          <NavigationHeader.Title tw="absolute [left: 38%] text-center">부동산 법률 상담</NavigationHeader.Title>
          <Button variant="ghost" tw="absolute right-4 p-0" onClick={handleClickSearchButton}>
            <SearchIcon />
          </Button>
        </>
      ) : (
        <NavigationHeader.Title tw="text-center">
          <QueryResult
            query={(router?.query?.q as string) ?? ''}
            handleClickContainer={handleClickContainer}
            handleClickDeleteButton={handleClickDeleteButton}
          />
        </NavigationHeader.Title>
      )}
    </NavigationHeader>
  );
}
