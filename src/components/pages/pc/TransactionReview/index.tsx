import { ChangeEvent, ChangeEventHandler, memo, useCallback, useEffect, useState } from 'react';

import { mutate } from 'swr';

import { toast } from 'react-toastify';

import { useRouter } from '@/hooks/utils';

import { Panel } from '@/components/atoms';

import { TransactionReview as TransactionReviewTemplate } from '@/components/templates';

import useFetchTransactionReview from '@/services/review/useFetchTransactionReview';

import useFetchTransactionReviewParticipatorsInfo from '@/services/review/useFetchTransactionReviewParticipatorsInfo';

import { apiService } from '@/services';

import Routes from '@/router/routes';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);

  const { data: info, mutate: mutateInfo } = useFetchTransactionReviewParticipatorsInfo(
    Number(router.query.listingContractID),
  );

  const { data: reviewData } = useFetchTransactionReview(Number(router.query.listingContractID), info?.hasReview);

  const [ratingText, setRatingText] = useState('');

  const [recommendations, setRecommendations] = useState<string[]>([]);

  const [freeFeedback, setFreeFeedback] = useState('');

  useEffect(() => {
    if (reviewData?.ratingText) setRatingText(reviewData?.ratingText);
    if (reviewData?.recommendations) setRecommendations(reviewData?.recommendations.split(','));
    if (reviewData?.freeFeedback) setFreeFeedback(reviewData?.freeFeedback);
  }, [reviewData]);

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
    if (router.query.biddingID) {
      router.replace(Routes.ListingDetailHistory, {
        searchParams: {
          tab: `${4}`,
          listingID: router.query.listingID as string,
          biddingID: router.query.biddingID as string,
        },
      });
    } else {
      router.replace(Routes.ListingDetailPassed, {
        searchParams: {
          tab: `${4}`,
          listingID: router.query.listingID as string,
        },
      });
    }
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
    <Panel width={panelWidth}>
      <TransactionReviewTemplate
        hasReview={info?.hasReview ?? false}
        agentName={info?.agentName ?? ''}
        userNickname={info?.userNickname ?? ''}
        ratingText={ratingText ?? ''}
        recommendations={recommendations}
        freeFeedback={freeFeedback ?? ''}
        onClickRatingText={handleClickRatingText}
        onChangeRecommendations={handleChangeRecommendations}
        onChangeFreeFeedback={handleChangeFreeFeedback}
        onSubmit={handleSubmit}
        onGoBack={handleGoBack}
      />
    </Panel>
  );
});
