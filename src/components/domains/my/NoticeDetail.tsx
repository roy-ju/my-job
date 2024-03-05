import React, { useMemo } from 'react';

import { useRouter } from 'next/router';

import tw, { styled } from 'twin.macro';

import useFetchNoticeDetail from '@/services/my/useFetchNoticeDetail';

import LoadingContainer from '@/components/atoms/LoadingContainer';

import Loading from '@/components/atoms/Loading';

import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import useHandleClickBack from './notice-detail/hooks/useHandleClickBack';

import Detail from './notice-detail/Detail';

const DetailWrraper = styled.div`
  ${tw`flex-1 min-h-0 px-5 py-6 overflow-auto`}
`;

export default function NoticeDetail() {
  const router = useRouter();

  const noticeID = useMemo(() => Number(router?.query?.noticeID), [router?.query?.noticeID]);

  const { data, isLoading } = useFetchNoticeDetail({ id: noticeID });

  const { renderBackButtonUI, handleClickBack, handleGoToList } = useHandleClickBack();

  const title = useMemo(() => {
    if (data) {
      if (data.category) {
        return `[${data.category}] ${data.title}`;
      }
      return data.title;
    }
    return '';
  }, [data]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <NavigationHeader>
        {renderBackButtonUI && <NavigationHeader.BackButton onClick={handleClickBack} />}
        <NavigationHeader.Title>{title}</NavigationHeader.Title>
        <NavigationHeader.Button tw="text-info underline" onClick={handleGoToList}>
          목록보기
        </NavigationHeader.Button>
      </NavigationHeader>
      <DetailWrraper>
        <Detail title={title} createdTime={data?.createdTime ?? ''} html={data?.description ?? ''} />
      </DetailWrraper>
    </Container>
  );
}
