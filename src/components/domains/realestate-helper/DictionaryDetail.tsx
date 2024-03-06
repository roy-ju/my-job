import { useCallback } from 'react';

import { useRouter } from 'next/router';

import tw, { styled } from 'twin.macro';

import Loading from '@/components/atoms/Loading';

import LoadingContainer from '@/components/atoms/LoadingContainer';

import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import useFetchSubHomeGuideDetail from '@/services/sub-home/useFetchSubHomeGuideDetail';

import useHandleClickBack from './dictionary-detail/hooks/useHandleClickBack';

import ShareButton from './dictionary-detail/widget/ShareButton';

import DetailTop from './dictionary-detail/DetailTop';

import DetailMiddle from './dictionary-detail/DetailMiddle';

import DetailBottom from './dictionary-detail/DetailBottom';

const FlexContents = styled.div`
  ${tw`relative flex flex-col flex-1 h-full gap-5 overflow-x-hidden overflow-y-auto`}
`;

export default function DictionaryDetail() {
  const router = useRouter();

  const id = Number(router.query.dictID);

  const { term, relatedTerms, isLoading } = useFetchSubHomeGuideDetail({ code: 'DICT', id });

  const { handleClickBack } = useHandleClickBack();

  const handleClicKShare = useCallback(() => {}, []);

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
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title />
        <ShareButton handleClick={handleClicKShare} />
      </NavigationHeader>
      <FlexContents>
        <DetailTop name={term?.name ?? ''} content={term?.content ?? ''} />
        <DetailMiddle content={term?.additional_explanation ?? ''} />
        <DetailBottom relatedTerms={relatedTerms} />
      </FlexContents>
    </Container>
  );
}
