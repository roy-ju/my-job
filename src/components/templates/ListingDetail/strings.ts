import { VisitUserType } from '@/constants/enums';

const UserStatusStrings: Record<
  string,
  {
    title: string;
    body: string;
  }
> = {
  [VisitUserType.SellerGeneral]: {
    title: '거래 중이에요.',
    body: '협의 의사가 있는 제안이 있다면, 중개사님에게 전달해주세요.\n중개사님을 통해 거래조건이나 매물정보 수정도 가능합니다.',
  },
  [VisitUserType.NotLoggedIn]: {
    title: '원하는 가격에 거래를 제안해보세요.',
    body: '매물을 거래하고 싶은 가격과 조건을 제안해보세요.\n중개사님이 제안한 내용을 확인 후 회신해드릴 거에요. ',
  },
  [VisitUserType.BuyerGeneral]: {
    title: '원하는 가격에 거래를 제안해보세요.',
    body: '매물을 거래하고 싶은 가격과 조건을 제안해보세요.\n중개사님이 제안한 내용을 확인 후 회신해드릴 거에요. ',
  },
  [VisitUserType.Submitted]: {
    title: '제안 내용을 확인하고 있어요.',
    body: '중개사님의 회신을 기다리면서도 제안 내용을 수정할 수 있어요.',
  },
  [VisitUserType.Rejected]: {
    title: '다시 제안해보세요.',
    body: '제안한 내용으로 현재는 네고가 진행되기 어려울거 같아요. 제안을 수정해 보거나, 제안했던 내용으로 주변 지역의 다른 매물을 추천받아보세요.',
  },
  [VisitUserType.HasSuggested]: {
    title: '중개사님이 추천한 매물이에요.',
    body: '중개사님과 채팅을 통해 협의해 보고 싶으시다면 네고 협의 버튼을 눌러주세요!',
  },
  [VisitUserType.HasRejectedSuggest]: {
    title: '관심 없다고 하신 메물이에요.',
    body: '다시 관심이 생기셨다면 네고 협의 하기 버튼을 눌러주세요! 중개사님과의 채팅이 가능합니다.',
  },
  [VisitUserType.Accepted]: {
    title: '네고 협의가 진행 중이에요.',
    body: '중개사님과의 채팅으로 상세한 거래 조건을 조율해보세요.',
  },
  [VisitUserType.PreContractSelf]: {
    title: '네고가 성공적으로 완료되었어요!',
    body: '가계약금이 입금되어, 거래가 성사되었어요!\n계약을 마무리해주세요.',
  },
  [VisitUserType.PreContractOthers]: {
    title: '네고가 종료되었어요.',
    body: '다른 제안자와 거래가 성사되어, 네고가 종료되었어요.\n주변 지역에서 원하는 조건으로 매물을 추천 받아보세요.',
  },
};

export default UserStatusStrings;
