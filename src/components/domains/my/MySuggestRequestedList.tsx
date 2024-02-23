import { Fragment, useCallback, useState, useRef, useEffect } from 'react';

import { useRouter } from 'next/router';

import tw, { styled } from 'twin.macro';

import { InfiniteScroll, Loading } from '@/components/atoms';

import { NavigationHeader, NoDataUI } from '@/components/molecules';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import getPath from '@/utils/getPath';

import Routes from '@/router/routes';

import useFetchMySuggestList from '@/services/my/useFetchMySuggestList';

import useScroll from '@/hooks/useScroll';

import ListItem from './suggest-requested-list/ListItem';

import SuggestCreate from './suggest-requested-list/SuggestCreate';

const Container = styled.div`
  ${tw`relative flex flex-col w-full h-full`}
`;

const FlexContentsWrraper = styled.div`
  ${tw`relative flex flex-col flex-1 min-h-0 py-6 overflow-auto`}
`;

const Contents = styled.div`
  ${tw``}
`;

const ListContainer = styled(InfiniteScroll)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Seperator = styled.div`
  ${tw`w-full [min-height: 1px] bg-gray-200 my-3`}
`;

export default function MySuggestRequestedList() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const { isLoading, data: list, increamentPageNumber } = useFetchMySuggestList();

  const [isScrollingButton, setIsScrollingButton] = useState(false);

  const [render, setRender] = useState(false);

  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const handleClickBack = useCallback(() => {
    if (typeof window === 'undefined') return;

    if (platform === 'pc') {
      router.replace(`/${Routes.My}?default=1`);
    }

    if (platform === 'mobile') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=1`);
      } else {
        router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=1`);
      }
    }
  }, [platform, router]);

  const handleClickSuggestForm = useCallback(() => {
    if (platform === 'pc') {
      const path = getPath({
        depth1: router?.query?.depth1 as NegocioPath,
        depth2: router?.query?.depth2 as NegocioPath,
        targetPath: Routes.SuggestForm as NegocioPath,
      });

      router.push({
        pathname: path,
        query: {
          entry: Routes.SuggestRequestedList,
          ...(router?.query?.danjiID ? { danjiID: `${router.query.danjiID}` } : {}),
          ...(router?.query?.listingID ? { listingID: `${router.query.listingID}` } : {}),
          ...(router?.query?.default ? { default: `${router.query.default}` } : {}),
        },
      });
    }
    if (platform === 'mobile') {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.SuggestForm}`,
        query: { entry: Routes.SuggestRequestedList },
      });
    }
  }, [platform, router]);

  const handleClickSuggestItem = useCallback(
    (id: number) => {
      if (platform === 'pc') {
        const path = getPath({
          depth1: router?.query?.depth1 as NegocioPath,
          depth2: router?.query?.depth2 as NegocioPath,
          targetPath: Routes.MySuggestDetail as NegocioPath,
        });

        router.push({
          pathname: path,
          query: {
            suggestID: `${id}`,
            entry: Routes.SuggestRequestedList,
            ...(router?.query?.danjiID ? { danjiID: `${router.query.danjiID}` } : {}),
            ...(router?.query?.listingID ? { listingID: `${router.query.listingID}` } : {}),
            ...(router?.query?.default ? { default: `${router.query.default}` } : {}),
          },
        });
      }

      if (platform === 'mobile') {
        router.push(`/${Routes.EntryMobile}/${Routes.MySuggestDetail}?suggestID=${id}`);
      }
    },
    [platform, router],
  );

  useScroll(scrollContainer, ({ scrollY }) => {
    setIsScrollingButton(scrollY > 0);
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRender(true);
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div tw="py-20">
        <Loading />
      </div>
    );
  }

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>나의 구해요 목록</NavigationHeader.Title>
      </NavigationHeader>

      <FlexContentsWrraper ref={scrollContainer}>
        <Contents>
          {list && list?.length > 0 ? (
            <ListContainer onNext={increamentPageNumber}>
              {list.map((item, index) => (
                <Fragment key={item.suggest_id}>
                  <ListItem key={item.suggest_id} item={item} handleClick={handleClickSuggestItem} />
                  {index !== list.length - 1 && <Seperator />}
                </Fragment>
              ))}
            </ListContainer>
          ) : (
            <NoDataUI
              title="구하는 글이 없습니다."
              body="구하기 글을 작성하고 원하는 곳의 매물을 추천받아보세요."
              buttonText="새로운 매물 구하기"
              onClick={handleClickSuggestForm}
            />
          )}
        </Contents>
      </FlexContentsWrraper>

      {list && list.length > 0 && render && (
        <SuggestCreate isScrollingButton={isScrollingButton} handleClick={handleClickSuggestForm} />
      )}
    </Container>
  );
}
