import { useRouter } from 'next/router';

import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

import Loading from '@/components/atoms/Loading';

import LoadingContainer from '@/components/atoms/LoadingContainer';

import Container from '@/components/atoms/Container';

import { NavigationHeader, OverlayPresenter } from '@/components/molecules';

import useFetchSubHomeGuideDetail from '@/services/sub-home/useFetchSubHomeGuideDetail';

import SharePopup from '@/components/organisms/SharePopup';

import useIosWebkitNoneApplySafeArea from '@/hooks/useIosWebkitNoneApplySafeArea';

import ShareButton from './dictionary-detail/widget/ShareButton';

import DetailTop from './dictionary-detail/DetailTop';

import DetailMiddle from './dictionary-detail/DetailMiddle';

import DetailBottom from './dictionary-detail/DetailBottom';

import useShareHandler from './dictionary-detail/hooks/useShareHandler';

import useHandleClickBack from './dictionary-detail/hooks/useHandleClickBack';

import makeContents from './dictionary-detail/utils/makeContents';

import { contentsVariants } from './dictionary-detail/constants/animations';

import useRecenltyDictionaryName from './dictionary-detail/hooks/useRecenltyDictionaryName';

const FlexContents = styled(motion.div)`
  ${tw`relative flex flex-col flex-1 h-full gap-5 overflow-x-hidden overflow-y-auto`}
`;

export default function DictionaryDetail() {
  const router = useRouter();

  const id = Number(router.query.dictID);

  const { handleClickBack } = useHandleClickBack();

  const { term, relatedTerms, isLoading } = useFetchSubHomeGuideDetail({ code: 'DICT', id });

  const { openSharePopup, handleOpenSharePopup, handleCopyUrl, handleShareViaKakao, handleCloseSharePopup } =
    useShareHandler();

  useRecenltyDictionaryName({ name: term?.name });

  useIosWebkitNoneApplySafeArea();

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  return (
    <>
      <Container>
        <NavigationHeader>
          <NavigationHeader.BackButton onClick={handleClickBack} />
          <NavigationHeader.Title />
          <ShareButton handleClick={handleOpenSharePopup} />
        </NavigationHeader>
        <FlexContents initial="hidden" animate="visible" variants={contentsVariants}>
          <DetailTop name={term?.name ?? ''} content={makeContents(term?.content, term?.additional_explanation)} />
          <DetailMiddle content={term?.tip ?? ''} />
          <DetailBottom relatedTerms={relatedTerms} />
        </FlexContents>
      </Container>

      {openSharePopup && (
        <OverlayPresenter>
          <SharePopup
            onClickCopyUrl={handleCopyUrl}
            onClickShareViaKakao={handleShareViaKakao}
            onClickOutside={handleCloseSharePopup}
          />
        </OverlayPresenter>
      )}
    </>
  );
}
