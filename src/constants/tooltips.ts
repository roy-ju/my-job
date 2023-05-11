export type TooltipType = 'debtSuccessions' | 'rentArea' | 'collaterals' | 'jeonsaeLoan' | 'depositLoan';

const Tooltips: Record<
  TooltipType,
  {
    title: string;
    body: string;
  }
> = {
  debtSuccessions: {
    title: '채무승계 희망금액',
    body: '전세금, 임차보증금 등 매수인에게 자동승계가 되거나 승계하기를 희망하는 채무가 있을 경우 기입합니다.',
  },
  rentArea: {
    title: '임대할 부분',
    body: '매물 전체가 아닌 부분을 임대하고 싶으시다면 해당부분을 기입합니다.\n다가구 주택의 경우, 임대할 부분(호수, 면적 등)을 반드시 입력하셔야 합니다. ',
  },
  collaterals: {
    title: '선순위 담보권',
    body: '등기된 압류, 가압류, 근저당권 및 피담보채무액 등 상대방의 전세권보다 우선되는 담보권입니다.',
  },
  jeonsaeLoan: {
    title: '전세자금 대출',
    body: '임차인이 전세금 마련을 위해 금융기관 대출 희망 시, 임대인의 동의 여부를 의미합니다.\n매물등록 신청 시, 대출 관련 등기부 기재 사항이나, 관련 기관 문서의 제출은 요구되지 않습니다.',
  },
  depositLoan: {
    title: '보증금 대출',
    body: '임차인의 보증금 마련을 위한 금융기관 대출 희망시 동의여부를 의미합니다.\n대출 관련 등기부 기재사항이나, 관련기관 제출 문서는 없습니다.',
  },
};

export default Tooltips;
