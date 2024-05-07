import { ChangeEvent, ChangeEventHandler, memo, useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { mutate } from 'swr';

import { toast } from 'react-toastify';

import { MobileContainer } from '@/components/atoms';

import { TransactionReview as TransactionReviewTemplate } from '@/components/templates';

import useFetchTransactionReview from '@/services/review/useFetchTransactionReview';

import useFetchTransactionReviewParticipatorsInfo from '@/services/review/useFetchTransactionReviewParticipatorsInfo';

import { apiService } from '@/services';

export default memo(() => {
  const router = useRouter();

  const { data: info, mutate: mutateInfo } = useFetchTransactionReviewParticipatorsInfo(
    Number(router.query.listingContractID),
  );

  const { data: reviewData } = useFetchTransactionReview(Number(router.query.listingContractID), info?.hasReview);

  const [ratingText, setRatingText] = useState(reviewData?.ratingText ?? '');
  const [recommendations, setRecommendations] = useState<string[]>(() => {
    if (reviewData?.recommendations) return reviewData?.recommendations.split(',');
    return [];
  });
  const [freeFeedback, setFreeFeedback] = useState(reviewData?.freeFeedback ?? '');

  const handleClickRatingText = (text: string) => () => {
    if (info?.hasReview) return;
    setRatingText(text);
  };
  const handleChangeRecommendations = (text: string) => (e: ChangeEvent<HTMLInputElement>) => {
    if (info?.hasReview) return;

    if (e.target.checked) {
      setRecommendations((prev) => [...prev, text]);
    } else {
      setRecommendations((prev) => prev.filter((item) => item !== text));
    }
  };

  const handleChangeFreeFeedback = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((e) => {
    setFreeFeedback(e.target.value);
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  const handleSubmit = async () => {
    const stringTypeRecommendations = recommendations.join(',');
    await apiService.createTransactionReview({
      listingContractID: Number(router.query.listingContractID),
      ratingText,
      recommendations: stringTypeRecommendations,
      freeFeedback,
    });
    await mutateInfo();
    await mutate('/my/listings/participated/detail');
    await mutate('/my/listing/past/detail');
    toast.success('후기를 남겨주셔서 감사합니다.');
    handleGoBack();
  };

  return (
    <MobileContainer>
      <TransactionReviewTemplate
        hasReview={info?.hasReview ?? false}
        agentName={info?.agentName ?? ''}
        userNickname={info?.userNickname ?? ''}
        ratingText={ratingText}
        recommendations={recommendations}
        freeFeedback={freeFeedback}
        onClickRatingText={handleClickRatingText}
        onChangeRecommendations={handleChangeRecommendations}
        onChangeFreeFeedback={handleChangeFreeFeedback}
        onSubmit={handleSubmit}
        onGoBack={handleGoBack}
      />
    </MobileContainer>
  );
});
