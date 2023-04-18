import { Button } from '@/components/atoms';
import { VisitUserType } from '@/constants/enums';

interface CommonProps {
  buttonSize?: 'big' | 'bigger';
  onNavigateToParticipateBidding?: () => void;
  onNavigateToUpdateBidding?: () => void;
}

function BuyerGeneral({ buttonSize = 'bigger', onNavigateToParticipateBidding }: CommonProps) {
  return (
    <div>
      <Button tw="w-full" size={buttonSize} onClick={onNavigateToParticipateBidding}>
        가격 제안하러 가기
      </Button>
    </div>
  );
}

function Submitted({ buttonSize = 'bigger', onNavigateToUpdateBidding }: CommonProps) {
  return (
    <div>
      <Button tw="w-full" size={buttonSize} onClick={onNavigateToUpdateBidding}>
        제안 확인 / 수정
      </Button>
    </div>
  );
}

function Rejected({ buttonSize = 'bigger', onNavigateToUpdateBidding }: CommonProps) {
  return (
    <div>
      <Button tw="w-full" size={buttonSize} onClick={onNavigateToUpdateBidding}>
        제안 확인 / 수정
      </Button>
      <div tw="flex items-center justify-center mt-5">
        <Button size="none" variant="ghost" tw="underline text-info leading-4">
          다른 매물 추천받기
        </Button>
      </div>
    </div>
  );
}

function HasSuggested({ buttonSize = 'bigger' }: CommonProps) {
  return (
    <div tw="flex items-center gap-3">
      <Button variant="outlined" tw="w-full" size={buttonSize}>
        관심없음
      </Button>
      <Button tw="w-full" size={buttonSize}>
        네고 협의
      </Button>
    </div>
  );
}

function HasRejectedSuggest({ buttonSize = 'bigger' }: CommonProps) {
  return (
    <div>
      <Button tw="w-full" size={buttonSize}>
        네고 협의 하기
      </Button>
    </div>
  );
}

function Accepted({ buttonSize = 'bigger' }: CommonProps) {
  return (
    <div>
      <Button tw="w-full" size={buttonSize}>
        중개사 채팅
      </Button>
    </div>
  );
}

function PreContractSelf({ buttonSize = 'bigger' }: CommonProps) {
  return (
    <div>
      <Button tw="w-full" size={buttonSize}>
        중개사 채팅
      </Button>
    </div>
  );
}

function PreContractOthers({ buttonSize = 'bigger' }: CommonProps) {
  return (
    <div>
      <Button tw="w-full" size={buttonSize}>
        다른 매물 추천받기
      </Button>
    </div>
  );
}

function SellerGeneral({ buttonSize = 'bigger' }: CommonProps) {
  return (
    <div>
      <Button tw="w-full" size={buttonSize}>
        중개사 채팅
      </Button>
    </div>
  );
}

function SellerPreContract({ buttonSize = 'bigger' }: CommonProps) {
  return (
    <div>
      <Button tw="w-full" size={buttonSize}>
        중개사 채팅
      </Button>
    </div>
  );
}

function Wrapper({ visitUserType, ...props }: { visitUserType: number } & CommonProps) {
  if (visitUserType === VisitUserType.BuyerGeneral || visitUserType === VisitUserType.NotLoggedIn)
    return <BuyerGeneral {...props} />;
  if (visitUserType === VisitUserType.Submitted) return <Submitted {...props} />;
  if (visitUserType === VisitUserType.Rejected) return <Rejected {...props} />;
  if (visitUserType === VisitUserType.HasSuggested) return <HasSuggested {...props} />;
  if (visitUserType === VisitUserType.HasRejectedSuggest) return <HasRejectedSuggest {...props} />;
  if (visitUserType === VisitUserType.Accepted) return <Accepted {...props} />;
  if (visitUserType === VisitUserType.PreContractSelf) return <PreContractSelf {...props} />;
  if (visitUserType === VisitUserType.PreContractOthers) return <PreContractOthers {...props} />;
  if (visitUserType === VisitUserType.SellerGeneral) return <SellerGeneral {...props} />;
  if (visitUserType === VisitUserType.SellerPreContract) return <SellerPreContract {...props} />;

  return null;
}

export default Object.assign(Wrapper, {
  BuyerGeneral,
  Submitted,
  Rejected,
  HasSuggested,
  HasRejectedSuggest,
  Accepted,
  PreContractSelf,
  PreContractOthers,
  SellerGeneral,
  SellerPreContract,
});
