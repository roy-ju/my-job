import { Button, PersistentBottomBar } from '@/components/atoms';

import Container from '@/components/atoms/Container';

import FlexContents from '@/components/atoms/FlexContents';

import NavigationHeader from '@/components/molecules/NavigationHeader';

import useTransactionReviewHandler from './transaction-review/hooks/useTransactionReviewHandler';

import TransactionReviewForm from './transaction-review/TransactionReviewForm';

export default function ListingTranactionReview() {
  const {
    ratingText,
    recommendations,
    freeFeedback,
    hasReview,
    agentName,
    userNickname,
    handleChangeFreeFeedback,
    handleChangeRecommendations,
    handleClickRatingText,
    handleGoBack,
    handleSubmit,
  } = useTransactionReviewHandler();

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleGoBack} />
        <NavigationHeader.Title>{hasReview ? '거래후기 보기' : '거래후기 남기기'}</NavigationHeader.Title>
      </NavigationHeader>
      <FlexContents tw="px-5 py-7">
        <TransactionReviewForm
          hasReview={hasReview}
          agentName={agentName}
          userNickname={userNickname}
          ratingText={ratingText}
          recommendations={recommendations}
          freeFeedback={freeFeedback}
          onClickRatingText={handleClickRatingText}
          onChangeRecommendations={handleChangeRecommendations}
          onChangeFreeFeedback={handleChangeFreeFeedback}
        />
      </FlexContents>
      <PersistentBottomBar>
        <Button
          tw="w-full"
          size="bigger"
          disabled={!hasReview && (!ratingText || recommendations.length === 0)}
          onClick={hasReview ? handleGoBack : handleSubmit}
        >
          {hasReview ? '확인' : '후기 남기기'}
        </Button>
      </PersistentBottomBar>
    </Container>
  );
}
