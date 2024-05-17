import tw from 'twin.macro';

import { Label, Button, Checkbox } from '@/components/atoms';

import { TextField } from '@/components/molecules';

import CheckIcon from '@/assets/icons/check.svg';

const Title = tw.div`text-b1 font-bold mb-1`;

const SubTitle = tw.div`text-info text-gray-700 mb-4`;

interface Props {
  hasReview: boolean;
  agentName: string;
  userNickname: string;
  ratingText: string;
  recommendations: string[];
  freeFeedback: string;
  onClickRatingText?: (text: string) => () => void;
  onChangeRecommendations?: (text: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFreeFeedback?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export default function TransactionReviewForm({
  hasReview,
  agentName,
  userNickname,
  ratingText,
  recommendations,
  freeFeedback,
  onClickRatingText,
  onChangeRecommendations,
  onChangeFreeFeedback,
}: Props) {
  return (
    <div>
      <div>
        <Title>
          {userNickname}님,
          <br /> {agentName} 중개사님과 거래는 어떠셨나요?
        </Title>
        <SubTitle>선호도는 중개사님에게 공개되지 않아요.</SubTitle>
        <div tw="flex gap-3">
          <Button
            variant={ratingText?.includes('별로예요') ? 'primary' : 'gray'}
            size="small"
            onClick={onClickRatingText?.('별로예요')}
          >
            <CheckIcon tw="mr-2" css={[!ratingText?.includes('별로예요') && tw`text-gray-600`]} />
            별로예요
          </Button>
          <Button
            variant={ratingText?.includes('추천해요') ? 'primary' : 'gray'}
            size="small"
            onClick={onClickRatingText?.('추천해요')}
          >
            <CheckIcon tw="mr-2 text-gray-600" css={[!ratingText?.includes('추천해요') && tw`text-gray-600`]} />
            추천해요
          </Button>
          <Button
            variant={ratingText?.includes('강력추천') ? 'primary' : 'gray'}
            size="small"
            onClick={onClickRatingText?.('강력추천')}
          >
            <CheckIcon tw="mr-2" css={[!ratingText?.includes('강력추천') && tw`text-gray-600`]} />
            강력추천
          </Button>
        </div>
      </div>
      <div tw="mt-9">
        <Title>어떤 점을 추천하시나요?</Title>
        <SubTitle>해당 사항을 모두 선택해주세요/</SubTitle>
        <div tw="flex flex-col gap-4">
          <Label
            label="적극적으로 네고를 해주세요"
            checked={recommendations?.includes('적극적으로 네고를 해주세요')}
            control={
              <Checkbox onChange={onChangeRecommendations?.('적극적으로 네고를 해주세요')} readOnly={hasReview} />
            }
          />
          <Label
            label="쉽고 자세하게 설명을 해주세요"
            checked={recommendations?.includes('쉽고 자세하게 설명을 해주세요')}
            readOnly={hasReview}
            control={<Checkbox onChange={onChangeRecommendations?.('쉽고 자세하게 설명을 해주세요')} />}
          />
          <Label
            label="응답이 빨라요"
            checked={recommendations?.includes('응답이 빨라요')}
            readOnly={hasReview}
            control={<Checkbox onChange={onChangeRecommendations?.('응답이 빨라요')} />}
          />
          <Label
            label="친절하고 매너가 좋아요"
            checked={recommendations?.includes('친절하고 매너가 좋아요')}
            readOnly={hasReview}
            control={<Checkbox onChange={onChangeRecommendations?.('친절하고 매너가 좋아요')} />}
          />
        </div>
      </div>
      <div tw="mt-9">
        <Title>네고경험을 알려주세요!</Title>
        <SubTitle>더 좋은 서비스를 찾아가는 네고시오가 되겠습니다.</SubTitle>
        <TextField size="medium" variant="outlined">
          <TextField.TextArea
            maxLength={100}
            spellCheck={false}
            value={freeFeedback}
            onChange={onChangeFreeFeedback}
            placeholder={hasReview ? '작성한 내용이 없습니다.' : '자유롭게 작성해주세요. (선택사항)'}
            tw="min-h-[76px]"
            css={[hasReview && tw`bg-gray-100 pointer-events-none`]}
            readOnly={hasReview}
          />
        </TextField>
        <TextField.HelperMessage tw="text-gray-1000">{`${freeFeedback?.length}/100`}</TextField.HelperMessage>
      </div>
    </div>
  );
}
