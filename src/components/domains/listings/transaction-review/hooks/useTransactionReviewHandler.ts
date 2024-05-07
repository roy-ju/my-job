import { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { mutate } from 'swr';

import { toast } from 'react-toastify';

import useFetchTransactionReview from '@/services/review/useFetchTransactionReview';

import useFetchTransactionReviewParticipatorsInfo from '@/services/review/useFetchTransactionReviewParticipatorsInfo';

import { apiService } from '@/services';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useTransactionReviewHandler() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const { data: info, mutate: mutateInfo } = useFetchTransactionReviewParticipatorsInfo(
    Number(router.query.listingContractID),
  );

  const { data: reviewData } = useFetchTransactionReview(Number(router.query.listingContractID), info?.hasReview);

  const [ratingText, setRatingText] = useState('');

  const [recommendations, setRecommendations] = useState<string[]>([]);

  const [freeFeedback, setFreeFeedback] = useState('');

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
    if (platform === 'pc') {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (router.query.biddingID) {
        if (depth1 && depth2) {
          router.replace({
            pathname: `/${depth1}/${Routes.ListingDetailHistory}`,
            query: {
              ...query,
              tab: `${4}`,
              listingID: router.query.listingID as string,
              biddingID: router.query.biddingID as string,
            },
          });
        } else {
          router.replace({
            pathname: `/${Routes.ListingDetailHistory}`,
            query: {
              ...query,
              tab: `${4}`,
              listingID: router.query.listingID as string,
              biddingID: router.query.biddingID as string,
            },
          });
        }
      } else if (depth1 && depth2) {
        router.replace({
          pathname: `/${depth1}/${Routes.ListingDetailPassed}`,
          query: {
            ...query,
            tab: `${4}`,
            listingID: router.query.listingID as string,
          },
        });
      } else {
        router.replace({
          pathname: `/${Routes.ListingDetailPassed}`,
          query: {
            ...query,
            tab: `${4}`,
            listingID: router.query.listingID as string,
          },
        });
      }
    } else {
      router.back();
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

  useEffect(() => {
    if (reviewData?.ratingText) setRatingText(reviewData?.ratingText);
    if (reviewData?.recommendations) setRecommendations(reviewData?.recommendations.split(','));
    if (reviewData?.freeFeedback) setFreeFeedback(reviewData?.freeFeedback);
  }, [reviewData]);

  return {
    ratingText,
    recommendations,
    freeFeedback,
    hasReview: info?.hasReview ?? false,
    agentName: info?.agentName ?? '',
    userNickname: info?.userNickname ?? '',
    handleChangeFreeFeedback,
    handleChangeRecommendations,
    handleClickRatingText,
    handleGoBack,
    handleSubmit,
  };
}
