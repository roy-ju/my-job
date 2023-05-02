import { Panel } from '@/components/atoms';
import { ChangeEvent, ChangeEventHandler, memo, useCallback, useState } from 'react';
import { TransactionReview as TransactionReviewTemplate } from '@/components/templates';
import useAPI_GetTransactionReview from '@/apis/my/getTransactionReview';
import { useRouter } from '@/hooks/utils';
import useAPI_GetTransactionReviewInfo from '@/apis/my/getTransactionReviewInfo';
import Routes from '@/router/routes';
import createTransactionReview from '@/apis/my/createTransactionReview';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);
  const { data: info, mutate: mutateInfo } = useAPI_GetTransactionReviewInfo(Number(router.query.listingContractID));

  const { data: reviewData } = useAPI_GetTransactionReview(Number(router.query.listingContractID), info?.hasReview);

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
    router.replace(Routes.ListingDetailPassed, {
      searchParams: {
        tab: `${4}`,
        listingID: router.query.listingID as string,
      },
    });
  };

  const handleSubmit = async () => {
    const stringTypeRecommendations = recommendations.join(',');
    await createTransactionReview({
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
        ratingText={ratingText}
        recommendations={recommendations}
        freeFeedback={freeFeedback}
        onClickRatingText={handleClickRatingText}
        onChangeRecommendations={handleChangeRecommendations}
        onChangeFreeFeedback={handleChangeFreeFeedback}
        onSubmit={handleSubmit}
        onGoBack={handleGoBack}
      />
    </Panel>
  );
});
