import { Button } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { TransactionReviewForm } from '@/components/organisms';

interface Props {
  hasReview: boolean;
  agentName: string;
  userNickname: string;
  ratingText: string;
  recommendations: string[];
  freeFeedback: string;
  onClickRatingText: (text: string) => () => void;
  onChangeRecommendations: (text: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFreeFeedback: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit: () => void;
  onGoBack: () => void;
}

export default function TransactionReview({
  hasReview,
  agentName,
  userNickname,
  ratingText,
  recommendations,
  freeFeedback,
  onClickRatingText,
  onChangeRecommendations,
  onChangeFreeFeedback,
  onSubmit,
  onGoBack,
}: Props) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onGoBack} />
        <NavigationHeader.Title>{hasReview ? '거래후기 보기' : '거래후기 남기기'}</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 px-5 py-7 min-h-0 overflow-y-auto">
        <TransactionReviewForm
          hasReview={hasReview}
          agentName={agentName}
          userNickname={userNickname}
          ratingText={ratingText}
          recommendations={recommendations}
          freeFeedback={freeFeedback}
          onClickRatingText={onClickRatingText}
          onChangeRecommendations={onChangeRecommendations}
          onChangeFreeFeedback={onChangeFreeFeedback}
        />
      </div>
      <div tw="px-5 py-4 w-full bg-white shadow-persistentBottomBar">
        <Button
          disabled={!hasReview && (!ratingText || recommendations.length === 0)}
          onClick={hasReview ? onGoBack : onSubmit}
          size="bigger"
          tw="w-full"
        >
          {hasReview ? '확인' : '후기 남기기'}
        </Button>
      </div>
    </div>
  );
}
